"use server";

import {
  applicationSchema,
  contactSchema,
  leadSchema,
  RESUME_MAX_BYTES,
  RESUME_TYPES,
} from "@/lib/validation";

/**
 * Form Server Actions.
 *
 * Anti-spam on every action, server-side:
 *  - honeypot field ("website") must be empty — bots fill it
 *  - timestamp check: submissions faster than 3s after render are rejected
 * All inputs re-validated with zod regardless of client validation.
 *
 * Persistence note: submissions are currently logged only — the Prisma
 * Application/Lead tables and email notification arrive with the DB phase.
 * The action contract (FormData in, ActionResult out) will not change.
 */

export interface ActionResult {
  ok: boolean;
}

const MIN_FILL_MS = 3000;

function isSpam(formData: FormData): boolean {
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.length > 0) return true;
  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) return true;
  return false;
}

function fields(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") out[key] = value;
  }
  return out;
}

export async function submitApplication(formData: FormData): Promise<ActionResult> {
  if (isSpam(formData)) return { ok: true }; // pretend success; give bots nothing

  const parsed = applicationSchema.safeParse(fields(formData));
  if (!parsed.success) return { ok: false };

  const resume = formData.get("resume");
  if (
    !(resume instanceof File) ||
    resume.size === 0 ||
    resume.size > RESUME_MAX_BYTES ||
    !RESUME_TYPES.includes(resume.type)
  ) {
    return { ok: false };
  }

  console.info(
    `[application] ${parsed.data.fullName} <${parsed.data.email}> → ${parsed.data.jobSlug || "talent-network"} (resume: ${resume.name}, ${resume.size} bytes)`
  );
  return { ok: true };
}

export async function submitLead(formData: FormData): Promise<ActionResult> {
  if (isSpam(formData)) return { ok: true };

  const parsed = leadSchema.safeParse(fields(formData));
  if (!parsed.success) return { ok: false };

  console.info(`[lead] ${parsed.data.company} — ${parsed.data.fullName} <${parsed.data.email}>`);
  return { ok: true };
}

export async function submitContact(formData: FormData): Promise<ActionResult> {
  if (isSpam(formData)) return { ok: true };

  const parsed = contactSchema.safeParse(fields(formData));
  if (!parsed.success) return { ok: false };

  console.info(`[contact] ${parsed.data.fullName} <${parsed.data.email}>: ${parsed.data.subject}`);
  return { ok: true };
}
