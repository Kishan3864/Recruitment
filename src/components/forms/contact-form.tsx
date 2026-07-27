"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { submitContact } from "@/app/actions/forms";
import { AntiSpamFields, FieldError, FormStatus } from "@/components/forms/form-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validation";
import type { ContactFormCopy } from "@/types/pages";

export function ContactForm({ copy }: { copy: ContactFormCopy }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [pending, setPending] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setPending(true);
    try {
      const formData = new FormData(formRef.current ?? undefined);
      for (const [key, value] of Object.entries(values)) {
        formData.set(key, String(value ?? ""));
      }
      const result = await submitContact(formData);
      setStatus(result.ok ? "success" : "error");
      if (result.ok) reset();
    } catch {
      setStatus("error");
    } finally {
      setPending(false);
    }
  });

  const err = (field: keyof ContactInput) => Boolean(errors[field]);

  if (status === "success") {
    return <FormStatus status="success" messages={copy.messages} />;
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      <AntiSpamFields startedAt={startedAt} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-fullName">{copy.fields.fullName.label}</Label>
          <Input
            id="contact-fullName"
            className="mt-2"
            placeholder={copy.fields.fullName.placeholder}
            autoComplete="name"
            aria-invalid={err("fullName")}
            aria-describedby="contact-fullName-error"
            {...register("fullName")}
          />
          <FieldError
            show={err("fullName")}
            message={copy.messages.fieldInvalid}
            id="contact-fullName-error"
          />
        </div>
        <div>
          <Label htmlFor="contact-email">{copy.fields.email.label}</Label>
          <Input
            id="contact-email"
            type="email"
            className="mt-2"
            placeholder={copy.fields.email.placeholder}
            autoComplete="email"
            aria-invalid={err("email")}
            aria-describedby="contact-email-error"
            {...register("email")}
          />
          <FieldError
            show={err("email")}
            message={copy.messages.fieldInvalid}
            id="contact-email-error"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="contact-subject">{copy.fields.subject.label}</Label>
        <Input
          id="contact-subject"
          className="mt-2"
          placeholder={copy.fields.subject.placeholder}
          aria-invalid={err("subject")}
          aria-describedby="contact-subject-error"
          {...register("subject")}
        />
        <FieldError
          show={err("subject")}
          message={copy.messages.fieldInvalid}
          id="contact-subject-error"
        />
      </div>

      <div>
        <Label htmlFor="contact-message">{copy.fields.message.label}</Label>
        <Textarea
          id="contact-message"
          rows={5}
          className="mt-2"
          placeholder={copy.fields.message.placeholder}
          aria-invalid={err("message")}
          aria-describedby="contact-message-error"
          {...register("message")}
        />
        <FieldError
          show={err("message")}
          message={copy.messages.fieldInvalid}
          id="contact-message-error"
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
    </form>
  );
}
