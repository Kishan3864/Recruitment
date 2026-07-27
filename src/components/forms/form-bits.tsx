"use client";

import { CircleAlert, CircleCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import type { FormMessages } from "@/types/pages";

/** Hidden anti-spam fields: honeypot + render timestamp (checked server-side). */
export function AntiSpamFields({ startedAt }: { startedAt: number }) {
  return (
    <div aria-hidden="true" className="hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
      <input type="hidden" name="startedAt" value={startedAt} />
    </div>
  );
}

/** Success / error banner with aria-live announcement. */
export function FormStatus({
  status,
  messages,
}: {
  status: "idle" | "success" | "error";
  messages: FormMessages;
}) {
  return (
    <div aria-live="polite">
      {status !== "idle" && (
        <div
          className={cn(
            "flex items-start gap-3 rounded-xl border p-4 text-sm",
            status === "success"
              ? "border-success/30 bg-success-foreground text-success"
              : "border-destructive/30 bg-destructive/5 text-destructive"
          )}
        >
          {status === "success" ? (
            <CircleCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          ) : (
            <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          )}
          <div>
            <p className="font-semibold">
              {status === "success" ? messages.successTitle : messages.errorTitle}
            </p>
            <p className="mt-1 leading-relaxed">
              {status === "success" ? messages.successBody : messages.errorBody}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function FieldError({ show, message, id }: { show: boolean; message: string; id: string }) {
  if (!show) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-destructive">
      {message}
    </p>
  );
}
