"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

/** Submit button with pending state — for admin server-action forms. */
export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-primary text-primary-foreground">
      {pending ? "Saving…" : children}
    </Button>
  );
}
