import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { SubmitButton } from "@/components/admin/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CollectionDef, Row } from "@/lib/admin/registry";
import { cn } from "@/lib/utils";

const selectClass =
  "h-8 w-full rounded-sm border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

/**
 * Registry-driven create/edit form. Server component: plain form posting to a
 * bound server action — works before hydration, zero client JS besides the
 * pending submit button.
 */
export function EntityForm({
  def,
  item,
  action,
  error,
}: {
  def: CollectionDef;
  item?: Row;
  action: (formData: FormData) => Promise<void>;
  error?: string;
}) {
  return (
    <form action={action} className="grid max-w-3xl gap-5 sm:grid-cols-2">
      {error && (
        <p className="flex items-center gap-2 rounded-sm border border-line-blush bg-tint-blush p-3 text-sm text-deep-blush sm:col-span-2">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {def.fields.map((field) => {
        const value = item?.[field.name];
        const wrap = cn("space-y-1.5", !field.half && "sm:col-span-2");
        const id = `f-${field.name}`;

        if (field.type === "boolean") {
          return (
            <label key={field.name} className={cn(wrap, "flex items-center gap-2.5 space-y-0")}>
              <input
                id={id}
                name={field.name}
                type="checkbox"
                defaultChecked={Boolean(value)}
                className="size-4 accent-brand-600"
              />
              <span className="text-sm font-medium">{field.label}</span>
            </label>
          );
        }

        return (
          <div key={field.name} className={wrap}>
            <label htmlFor={id} className="text-sm font-semibold">
              {field.label}
              {field.required && <span className="text-deep-blush"> *</span>}
            </label>

            {field.type === "textarea" && (
              <Textarea id={id} name={field.name} rows={3} defaultValue={String(value ?? "")} />
            )}
            {field.type === "lines" && (
              <Textarea
                id={id}
                name={field.name}
                rows={5}
                defaultValue={Array.isArray(value) ? (value as string[]).join("\n") : ""}
              />
            )}
            {field.type === "json" && (
              <Textarea
                id={id}
                name={field.name}
                rows={8}
                className="font-mono text-xs"
                defaultValue={value ? JSON.stringify(value, null, 2) : ""}
              />
            )}
            {field.type === "select" && (
              <select
                id={id}
                name={field.name}
                defaultValue={String(value ?? field.options?.[0] ?? "")}
                className={selectClass}
              >
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
            {(field.type === "text" || field.type === "number" || field.type === "date") && (
              <Input
                id={id}
                name={field.name}
                type={field.type === "text" ? "text" : field.type}
                required={field.required}
                defaultValue={value === undefined || value === null ? "" : String(value)}
              />
            )}

            {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
          </div>
        );
      })}

      <div className="flex items-center gap-3 border-t border-border pt-5 sm:col-span-2">
        <SubmitButton>Save {def.singular.toLowerCase()}</SubmitButton>
        <Button asChild variant="ghost">
          <Link href={`/admin/content/${def.key}`}>Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
