"use client";

import { useActionState, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, KeyRound, UserRound } from "lucide-react";

import {
  changePasswordAction,
  updateProfileAction,
  type AccountState,
} from "@/app/admin/account-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function StateBanner({ state }: { state: AccountState }) {
  if (state.error) {
    return (
      <p
        role="alert"
        className="flex items-center gap-2 rounded-sm border border-line-blush bg-tint-blush p-3 text-sm text-deep-blush"
      >
        <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
        {state.error}
      </p>
    );
  }
  if (state.success) {
    return (
      <p
        role="status"
        className="flex items-center gap-2 rounded-sm border border-line-mint bg-tint-mint p-3 text-sm text-deep-mint"
      >
        <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
        {state.success}
      </p>
    );
  }
  return null;
}

export function ProfileForm({ initialName }: { initialName: string }) {
  const [state, action, pending] = useActionState<AccountState, FormData>(updateProfileAction, {});

  return (
    <form action={action} className="space-y-4">
      <StateBanner state={state} />
      <div className="space-y-1.5">
        <label htmlFor="profile-name" className="text-sm font-semibold">
          Display name
        </label>
        <Input
          id="profile-name"
          name="name"
          defaultValue={initialName}
          maxLength={60}
          required
          autoComplete="name"
        />
        <p className="text-xs text-muted-foreground">Shown in the top bar and on this page.</p>
      </div>
      <Button type="submit" disabled={pending} className="bg-primary text-primary-foreground">
        <UserRound data-icon="inline-start" aria-hidden="true" />
        {pending ? "Saving…" : "Save profile"}
      </Button>
    </form>
  );
}

export function PasswordForm() {
  const [state, action, pending] = useActionState<AccountState, FormData>(changePasswordAction, {});
  const [show, setShow] = useState(false);
  // Controlled fields: React 19 resets uncontrolled forms after EVERY action,
  // which would wipe all three inputs on a validation error. Controlled values
  // survive the reset; we clear them ourselves only on success.
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const type = show ? "text" : "password";

  useEffect(() => {
    if (state.success) {
      setCurrent("");
      setNext("");
      setConfirm("");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <StateBanner state={state} />
      <div className="space-y-1.5">
        <label htmlFor="pw-current" className="text-sm font-semibold">
          Current password
        </label>
        <Input
          id="pw-current"
          name="currentPassword"
          type={type}
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="pw-new" className="text-sm font-semibold">
            New password
          </label>
          <Input
            id="pw-new"
            name="newPassword"
            type={type}
            value={next}
            onChange={(e) => setNext(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="pw-confirm" className="text-sm font-semibold">
            Confirm new password
          </label>
          <Input
            id="pw-confirm"
            name="confirmPassword"
            type={type}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        At least 8 characters — a mix of words and numbers works well.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending} className="bg-primary text-primary-foreground">
          <KeyRound data-icon="inline-start" aria-hidden="true" />
          {pending ? "Updating…" : "Update password"}
        </Button>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground select-none">
          <input
            type="checkbox"
            checked={show}
            onChange={(e) => setShow(e.target.checked)}
            className="size-4 accent-brand-600"
          />
          Show passwords
        </label>
      </div>
    </form>
  );
}
