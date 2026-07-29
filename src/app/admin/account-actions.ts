"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { getDb, schema } from "@/db/client";
import { createSession, requireAdmin } from "@/lib/admin/auth";

export interface AccountState {
  error?: string;
  success?: string;
}

/**
 * In-process throttle for current-password verification: max 5 failures per
 * 15 minutes per admin. A timing delay alone is bypassable with parallel
 * requests; this counter is not. (Single-process pm2 deployment.)
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const pwFailures = new Map<number, { count: number; resetAt: number }>();

function throttled(userId: number): boolean {
  const entry = pwFailures.get(userId);
  if (!entry || Date.now() > entry.resetAt) return false;
  return entry.count >= MAX_FAILURES;
}

function recordFailure(userId: number): void {
  const entry = pwFailures.get(userId);
  if (!entry || Date.now() > entry.resetAt) {
    pwFailures.set(userId, { count: 1, resetAt: Date.now() + WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

/** Change the signed-in admin's password after re-verifying the current one. */
export async function changePasswordAction(
  _prev: AccountState,
  formData: FormData
): Promise<AccountState> {
  const session = await requireAdmin();
  const db = getDb();
  if (!db) return { error: "Database is not connected." };

  const current = String(formData.get("currentPassword") ?? "");
  const next = String(formData.get("newPassword") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");

  if (!current || !next || !confirm) return { error: "Fill in all three fields." };
  if (next.length < 8) return { error: "New password must be at least 8 characters." };
  if (next === current) return { error: "New password must be different from the current one." };
  if (next !== confirm) return { error: "New password and confirmation do not match." };

  if (throttled(session.id)) {
    return { error: "Too many incorrect attempts — try again in 15 minutes." };
  }

  try {
    const [user] = await db
      .select()
      .from(schema.adminUsers)
      .where(eq(schema.adminUsers.id, session.id));
    if (!user) return { error: "Account not found." };

    const ok = await bcrypt.compare(current, user.passwordHash);
    if (!ok) {
      recordFailure(session.id);
      await new Promise((r) => setTimeout(r, 600));
      return { error: "Current password is incorrect." };
    }
    pwFailures.delete(session.id);

    const passwordHash = await bcrypt.hash(next, 12);
    await db
      .update(schema.adminUsers)
      .set({ passwordHash })
      .where(eq(schema.adminUsers.id, user.id));
  } catch (err) {
    console.error("[admin] password change failed:", err);
    return { error: "Could not update the password — try again." };
  }

  return { success: "Password updated. Use the new one the next time you sign in." };
}

/** Update the display name shown across the panel (and inside the session). */
export async function updateProfileAction(
  _prev: AccountState,
  formData: FormData
): Promise<AccountState> {
  const session = await requireAdmin();
  const db = getDb();
  if (!db) return { error: "Database is not connected." };

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Name cannot be empty." };
  if (name.length > 60) return { error: "Keep the name under 60 characters." };

  try {
    await db.update(schema.adminUsers).set({ name }).where(eq(schema.adminUsers.id, session.id));
    // Re-issue the session cookie so the shell shows the new name immediately.
    await createSession({ id: session.id, email: session.email, name });
  } catch (err) {
    console.error("[admin] profile update failed:", err);
    return { error: "Could not update the profile — try again." };
  }

  revalidatePath("/admin", "layout"); // topbar + account page pick up the new name
  return { success: "Profile updated." };
}
