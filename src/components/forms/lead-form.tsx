"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { submitLead } from "@/app/actions/forms";
import { AntiSpamFields, FieldError, FormStatus } from "@/components/forms/form-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { leadSchema, type LeadInput } from "@/lib/validation";
import type { LeadFormCopy } from "@/types/pages";

/** Employer enquiry form. */
export function LeadForm({ copy }: { copy: LeadFormCopy }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [pending, setPending] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({ resolver: zodResolver(leadSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setPending(true);
    try {
      const formData = new FormData(formRef.current ?? undefined);
      for (const [key, value] of Object.entries(values)) {
        formData.set(key, String(value ?? ""));
      }
      const result = await submitLead(formData);
      setStatus(result.ok ? "success" : "error");
      if (result.ok) reset();
    } catch {
      setStatus("error");
    } finally {
      setPending(false);
    }
  });

  const err = (field: keyof LeadInput) => Boolean(errors[field]);

  if (status === "success") {
    return <FormStatus status="success" messages={copy.messages} />;
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      <AntiSpamFields startedAt={startedAt} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="lead-company">{copy.fields.company.label}</Label>
          <Input
            id="lead-company"
            className="mt-2"
            placeholder={copy.fields.company.placeholder}
            autoComplete="organization"
            aria-invalid={err("company")}
            aria-describedby="lead-company-error"
            {...register("company")}
          />
          <FieldError
            show={err("company")}
            message={copy.messages.fieldInvalid}
            id="lead-company-error"
          />
        </div>
        <div>
          <Label htmlFor="lead-fullName">{copy.fields.fullName.label}</Label>
          <Input
            id="lead-fullName"
            className="mt-2"
            placeholder={copy.fields.fullName.placeholder}
            autoComplete="name"
            aria-invalid={err("fullName")}
            aria-describedby="lead-fullName-error"
            {...register("fullName")}
          />
          <FieldError
            show={err("fullName")}
            message={copy.messages.fieldInvalid}
            id="lead-fullName-error"
          />
        </div>
        <div>
          <Label htmlFor="lead-email">{copy.fields.email.label}</Label>
          <Input
            id="lead-email"
            type="email"
            className="mt-2"
            placeholder={copy.fields.email.placeholder}
            autoComplete="email"
            aria-invalid={err("email")}
            aria-describedby="lead-email-error"
            {...register("email")}
          />
          <FieldError
            show={err("email")}
            message={copy.messages.fieldInvalid}
            id="lead-email-error"
          />
        </div>
        <div>
          <Label htmlFor="lead-phone">{copy.fields.phone.label}</Label>
          <Input
            id="lead-phone"
            type="tel"
            className="mt-2"
            placeholder={copy.fields.phone.placeholder}
            autoComplete="tel"
            aria-invalid={err("phone")}
            aria-describedby="lead-phone-error"
            {...register("phone")}
          />
          <FieldError
            show={err("phone")}
            message={copy.messages.fieldInvalid}
            id="lead-phone-error"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
        <div>
          <Label htmlFor="lead-hiringFor">{copy.fields.hiringFor.label}</Label>
          <Input
            id="lead-hiringFor"
            className="mt-2"
            placeholder={copy.fields.hiringFor.placeholder}
            aria-invalid={err("hiringFor")}
            aria-describedby="lead-hiringFor-error"
            {...register("hiringFor")}
          />
          <FieldError
            show={err("hiringFor")}
            message={copy.messages.fieldInvalid}
            id="lead-hiringFor-error"
          />
        </div>
        <div>
          <Label htmlFor="lead-headcount">{copy.fields.headcount.label}</Label>
          <Controller
            control={control}
            name="headcount"
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger
                  id="lead-headcount"
                  className="mt-2 w-full"
                  aria-invalid={err("headcount")}
                  aria-describedby="lead-headcount-error"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {copy.headcountOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError
            show={err("headcount")}
            message={copy.messages.fieldInvalid}
            id="lead-headcount-error"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="lead-message">{copy.fields.message.label}</Label>
        <Textarea
          id="lead-message"
          rows={4}
          className="mt-2"
          placeholder={copy.fields.message.placeholder}
          {...register("message")}
        />
      </div>

      <FormStatus status={status} messages={copy.messages} />

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="w-full bg-cta text-cta-foreground hover:bg-cta/90 sm:w-auto"
      >
        {pending && (
          <Loader2 className="animate-spin" data-icon="inline-start" aria-hidden="true" />
        )}
        {pending ? copy.messages.submitting : copy.messages.submit}
      </Button>

      <p className="text-xs leading-relaxed text-muted-foreground">{copy.consent}</p>
    </form>
  );
}
