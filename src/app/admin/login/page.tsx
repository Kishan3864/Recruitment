import type { Metadata } from "next";

import { AdminLogo } from "@/components/admin/admin-logo";
import { GridPattern } from "@/components/graphics/grid-pattern";
import { NodeBadge } from "@/components/shared/node-badge";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: { absolute: "Admin sign in" },
  robots: { index: false, follow: false },
};

/** Admin login: centered card in the site's visual language. */
export default function AdminLoginPage() {
  return (
    <div className="bg-hero-wash relative flex min-h-svh items-center justify-center overflow-hidden px-4">
      <GridPattern />
      <div className="relative w-full max-w-sm rounded-lg border border-brand-100 bg-white p-7 shadow-card">
        <NodeBadge tint="sage" className="absolute -top-4 left-8" />
        <AdminLogo />
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to manage the site&rsquo;s content.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
