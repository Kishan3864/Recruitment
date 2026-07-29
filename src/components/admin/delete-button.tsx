"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Delete with a native confirm guard; wraps a bound server action. */
export function DeleteButton({ action, label }: { action: () => Promise<void>; label: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(`Delete ${label}? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <Button type="submit" size="icon-sm" variant="destructive" aria-label={`Delete ${label}`}>
        <Trash2 aria-hidden="true" />
      </Button>
    </form>
  );
}
