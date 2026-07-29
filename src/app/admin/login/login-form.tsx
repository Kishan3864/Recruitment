"use client";

import { useActionState } from "react";
import { AlertCircle, LogIn } from "lucide-react";

import { loginAction, type LoginState } from "@/app/admin/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <form action={action} className="mt-6 space-y-4">
      {state.error && (
        <p className="flex items-center gap-2 rounded-sm border border-line-blush bg-tint-blush p-3 text-sm text-deep-blush">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      )}
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <Input id="email" name="email" type="email" autoComplete="username" required />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-primary text-primary-foreground"
      >
        <LogIn data-icon="inline-start" aria-hidden="true" />
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
