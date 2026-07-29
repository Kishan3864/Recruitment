"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { getDb, schema } from "@/db/client";
import { requireAdmin } from "@/lib/admin/auth";
import { getCollection, parseFields } from "@/lib/admin/registry";

/** All admin mutations: auth-guarded, then revalidate the whole site (ISR). */

function requireDb() {
  const db = getDb();
  if (!db) throw new Error("DATABASE_URL is not configured");
  return db;
}

export async function saveItem(
  collectionKey: string,
  id: number | null,
  formData: FormData
): Promise<void> {
  await requireAdmin();
  const def = getCollection(collectionKey);
  if (!def) redirect("/admin");
  const db = requireDb();

  const { data, error } = parseFields(def.fields, formData);
  const backTo = `/admin/content/${collectionKey}/${id ?? "new"}`;
  if (error) redirect(`${backTo}?error=${encodeURIComponent(error)}`);

  let failure: string | null = null;
  try {
    if (id) await def.update(db, id, data);
    else await def.create(db, data);
  } catch (err) {
    console.error(`[admin] save ${collectionKey} failed:`, err);
    failure = "Could not save — check that the slug is unique.";
  }
  if (failure) redirect(`${backTo}?error=${encodeURIComponent(failure)}`);

  revalidatePath("/", "layout");
  redirect(`/admin/content/${collectionKey}`);
}

export async function deleteItem(collectionKey: string, id: number): Promise<void> {
  await requireAdmin();
  const def = getCollection(collectionKey);
  if (!def) redirect("/admin");
  const db = requireDb();
  try {
    await def.remove(db, id);
  } catch (err) {
    console.error(`[admin] delete ${collectionKey}#${id} failed:`, err);
  }
  revalidatePath("/", "layout");
  redirect(`/admin/content/${collectionKey}`);
}

export async function setSubmissionStatus(id: number, status: "new" | "handled"): Promise<void> {
  await requireAdmin();
  const db = requireDb();
  await db.update(schema.submissions).set({ status }).where(eq(schema.submissions.id, id));
  revalidatePath("/admin/submissions");
}

export async function deleteSubmission(id: number): Promise<void> {
  await requireAdmin();
  const db = requireDb();
  await db.delete(schema.submissions).where(eq(schema.submissions.id, id));
  revalidatePath("/admin/submissions");
}

export async function saveSettings(formData: FormData): Promise<void> {
  await requireAdmin();
  const db = requireDb();

  const str = (name: string) => String(formData.get(name) ?? "").trim();
  let socialLinks: unknown;
  try {
    const raw = str("socialLinks");
    socialLinks = raw ? JSON.parse(raw) : undefined;
  } catch {
    redirect(`/admin/settings?error=${encodeURIComponent("Social links must be valid JSON.")}`);
  }

  const value = {
    brandName: str("brandName"),
    tagline: str("tagline"),
    description: str("description"),
    phone: str("phone"),
    email: str("email"),
    address: str("address"),
    ctaEmployers: { label: str("ctaEmployersLabel"), href: str("ctaEmployersHref") },
    ctaCandidates: { label: str("ctaCandidatesLabel"), href: str("ctaCandidatesHref") },
    ...(socialLinks ? { socialLinks } : {}),
  };

  await db
    .insert(schema.settings)
    .values({ key: "site", value })
    .onConflictDoUpdate({
      target: schema.settings.key,
      set: { value, updatedAt: new Date() },
    });

  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}
