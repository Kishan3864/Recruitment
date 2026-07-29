import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { ShieldCheck } from "lucide-react";

import { PasswordForm, ProfileForm } from "@/components/admin/account-forms";
import { InstallAppCard } from "@/components/admin/install-app-card";
import { getDb, schema } from "@/db/client";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: { absolute: "Account · Admin" } };

/** Account: profile + password self-service for the signed-in admin. */
export default async function AccountPage() {
  const session = await requireAdmin();

  const db = getDb();
  let user: typeof schema.adminUsers.$inferSelect | undefined;
  if (db) {
    try {
      [user] = await db
        .select()
        .from(schema.adminUsers)
        .where(eq(schema.adminUsers.id, session.id));
    } catch (err) {
      console.error("[admin] account query failed:", err);
    }
  }

  const name = user?.name ?? session.name;
  const email = user?.email ?? session.email;
  const initial = (name || email).charAt(0).toUpperCase();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your admin profile and sign-in credentials.
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-lg border border-brand-100 bg-brand-50 p-5">
        <span
          aria-hidden="true"
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-950 font-display text-xl font-bold text-white"
        >
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold">{name}</p>
          <p className="truncate text-sm text-muted-foreground">{email}</p>
          {user && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              Admin since{" "}
              {user.createdAt.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "Asia/Kolkata",
              })}
            </p>
          )}
        </div>
      </div>

      <section className="rounded-lg border bg-white p-5">
        <h2 className="font-display text-lg font-bold">Profile</h2>
        <div className="mt-4">
          <ProfileForm initialName={name} />
        </div>
      </section>

      <section className="rounded-lg border bg-white p-5">
        <h2 className="font-display text-lg font-bold">Change password</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          You&apos;ll stay signed in here; use the new password from your next sign-in.
        </p>
        <div className="mt-4">
          <PasswordForm />
        </div>
      </section>

      <section className="rounded-lg border bg-white p-5">
        <h2 className="font-display text-lg font-bold">Admin app</h2>
        <div className="mt-4">
          <InstallAppCard />
        </div>
      </section>

      <p className="flex items-start gap-2 rounded-lg border border-line-mint bg-tint-mint p-4 text-sm text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-deep-mint" aria-hidden="true" />
        Sessions are signed and expire after 7 days. Changing the password does not sign out other
        devices — their sessions simply lapse when they expire, so sign out there manually if a
        device may be compromised.
      </p>
    </div>
  );
}
