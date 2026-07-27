"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { submitApplication } from "@/app/actions/forms";
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
import {
  applicationSchema,
  RESUME_MAX_BYTES,
  RESUME_TYPES,
  type ApplicationInput,
} from "@/lib/validation";
import type { ApplyFormCopy } from "@/types/pages";

/**
 * Candidate application / registration form.
 * Client-side validation via RHF + zod; the Server Action re-validates
 * everything including the resume file. Resume input is uncontrolled (files
 * can't live in RHF state) and checked separately.
 */
export function ApplyForm({ copy, jobSlug }: { copy: ApplyFormCopy; jobSlug?: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [pending, setPending] = useState(false);
  const [resumeError, setResumeError] = useState(false);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const resumeRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { jobSlug: jobSlug ?? "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    const resume = resumeRef.current?.files?.[0];
    const resumeOk =
      resume &&
      resume.size > 0 &&
      resume.size <= RESUME_MAX_BYTES &&
      RESUME_TYPES.includes(resume.type);
    setResumeError(!resumeOk);
    if (!resumeOk) return;

    setPending(true);
    try {
      const formData = new FormData(formRef.current ?? undefined);
      for (const [key, value] of Object.entries(values)) {
        formData.set(key, String(value ?? ""));
      }
      const result = await submitApplication(formData);
      setStatus(result.ok ? "success" : "error");
      if (result.ok) {
        reset({ jobSlug: jobSlug ?? "" });
        if (resumeRef.current) resumeRef.current.value = "";
        setResumeName(null);
      }
    } catch {
      setStatus("error");
    } finally {
      setPending(false);
    }
  });

  const err = (field: keyof ApplicationInput) => Boolean(errors[field]);

  if (status === "success") {
    return <FormStatus status="success" messages={copy.messages} />;
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      <AntiSpamFields startedAt={startedAt} />
      <input type="hidden" {...register("jobSlug")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="apply-fullName">{copy.fields.fullName.label}</Label>
          <Input
            id="apply-fullName"
            className="mt-2"
            placeholder={copy.fields.fullName.placeholder}
            autoComplete="name"
            aria-invalid={err("fullName")}
            aria-describedby="apply-fullName-error"
            {...register("fullName")}
          />
          <FieldError
            show={err("fullName")}
            message={copy.messages.fieldInvalid}
            id="apply-fullName-error"
          />
        </div>
        <div>
          <Label htmlFor="apply-email">{copy.fields.email.label}</Label>
          <Input
            id="apply-email"
            type="email"
            className="mt-2"
            placeholder={copy.fields.email.placeholder}
            autoComplete="email"
            aria-invalid={err("email")}
            aria-describedby="apply-email-error"
            {...register("email")}
          />
          <FieldError
            show={err("email")}
            message={copy.messages.fieldInvalid}
            id="apply-email-error"
          />
        </div>
        <div>
          <Label htmlFor="apply-phone">{copy.fields.phone.label}</Label>
          <Input
            id="apply-phone"
            type="tel"
            className="mt-2"
            placeholder={copy.fields.phone.placeholder}
            autoComplete="tel"
            aria-invalid={err("phone")}
            aria-describedby="apply-phone-error"
            {...register("phone")}
          />
          <FieldError
            show={err("phone")}
            message={copy.messages.fieldInvalid}
            id="apply-phone-error"
          />
        </div>
        <div>
          <Label htmlFor="apply-location">{copy.fields.location.label}</Label>
          <Input
            id="apply-location"
            className="mt-2"
            placeholder={copy.fields.location.placeholder}
            aria-invalid={err("location")}
            aria-describedby="apply-location-error"
            {...register("location")}
          />
          <FieldError
            show={err("location")}
            message={copy.messages.fieldInvalid}
            id="apply-location-error"
          />
        </div>
        <div>
          <Label htmlFor="apply-experience">{copy.fields.experienceYears.label}</Label>
          <Input
            id="apply-experience"
            type="number"
            min={0}
            max={50}
            className="mt-2"
            placeholder={copy.fields.experienceYears.placeholder}
            aria-invalid={err("experienceYears")}
            aria-describedby="apply-experience-error"
            {...register("experienceYears")}
          />
          <FieldError
            show={err("experienceYears")}
            message={copy.messages.fieldInvalid}
            id="apply-experience-error"
          />
        </div>
        <div>
          <Label htmlFor="apply-currentRole">{copy.fields.currentRole.label}</Label>
          <Input
            id="apply-currentRole"
            className="mt-2"
            placeholder={copy.fields.currentRole.placeholder}
            autoComplete="organization-title"
            aria-invalid={err("currentRole")}
            aria-describedby="apply-currentRole-error"
            {...register("currentRole")}
          />
          <FieldError
            show={err("currentRole")}
            message={copy.messages.fieldInvalid}
            id="apply-currentRole-error"
          />
        </div>
        <div>
          <Label htmlFor="apply-salary">{copy.fields.expectedSalary.label}</Label>
          <Input
            id="apply-salary"
            className="mt-2"
            placeholder={copy.fields.expectedSalary.placeholder}
            aria-invalid={err("expectedSalary")}
            aria-describedby="apply-salary-error"
            {...register("expectedSalary")}
          />
          <FieldError
            show={err("expectedSalary")}
            message={copy.messages.fieldInvalid}
            id="apply-salary-error"
          />
        </div>
        <div>
          <Label htmlFor="apply-notice">{copy.fields.noticePeriod.label}</Label>
          <Controller
            control={control}
            name="noticePeriod"
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger
                  id="apply-notice"
                  className="mt-2 w-full"
                  aria-invalid={err("noticePeriod")}
                  aria-describedby="apply-notice-error"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {copy.noticePeriodOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError
            show={err("noticePeriod")}
            message={copy.messages.fieldInvalid}
            id="apply-notice-error"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="apply-linkedin">{copy.fields.linkedin.label}</Label>
        <Input
          id="apply-linkedin"
          className="mt-2"
          placeholder={copy.fields.linkedin.placeholder}
          {...register("linkedin")}
        />
      </div>

      <div>
        <Label htmlFor="apply-resume">{copy.fields.resume.label}</Label>
        <label
          htmlFor="apply-resume"
          className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-input bg-surface-sunken px-4 py-4 transition-colors hover:border-brand-400"
        >
          <Upload className="size-5 text-brand-600" aria-hidden="true" />
          <span className={resumeName ? "text-sm font-medium" : "text-sm text-muted-foreground"}>
            {resumeName ?? copy.fields.resume.help}
          </span>
        </label>
        <input
          ref={resumeRef}
          id="apply-resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          aria-describedby="apply-resume-error"
          onChange={(e) => {
            setResumeError(false);
            setResumeName(e.target.files?.[0]?.name ?? null);
          }}
        />
        <FieldError
          show={resumeError}
          message={copy.messages.resumeInvalid}
          id="apply-resume-error"
        />
      </div>

      <div>
        <Label htmlFor="apply-note">{copy.fields.coverNote.label}</Label>
        <Textarea
          id="apply-note"
          rows={4}
          className="mt-2"
          placeholder={copy.fields.coverNote.placeholder}
          {...register("coverNote")}
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
