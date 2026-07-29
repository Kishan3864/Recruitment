import { CheckCircle2 } from "lucide-react";

import { saveSettings } from "@/app/admin/content-actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSiteSettings } from "@/lib/content/site";

/** Site settings editor — brand, contact, CTAs, social links. */
export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const s = await getSiteSettings();

  const field = (label: string, name: string, value: string, half = true) => (
    <div className={half ? "space-y-1.5" : "space-y-1.5 sm:col-span-2"}>
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <Input id={name} name={name} defaultValue={value} />
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Site settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Brand, contact and CTA details shown across the site.
        </p>
      </div>

      {saved && (
        <p className="flex max-w-3xl items-center gap-2 rounded-sm border border-line-mint bg-tint-mint p-3 text-sm text-deep-mint">
          <CheckCircle2 className="size-4" aria-hidden="true" />
          Settings saved — the site has been updated.
        </p>
      )}
      {error && (
        <p className="max-w-3xl rounded-sm border border-line-blush bg-tint-blush p-3 text-sm text-deep-blush">
          {error}
        </p>
      )}

      <form action={saveSettings} className="grid max-w-3xl gap-5 sm:grid-cols-2">
        {field("Brand name", "brandName", s.brandName)}
        {field("Tagline", "tagline", s.tagline)}
        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="description" className="text-sm font-semibold">
            Description
          </label>
          <Textarea id="description" name="description" rows={3} defaultValue={s.description} />
        </div>
        {field("Phone", "phone", s.phone)}
        {field("Email", "email", s.email)}
        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="address" className="text-sm font-semibold">
            Address
          </label>
          <Textarea id="address" name="address" rows={2} defaultValue={s.address} />
        </div>
        {field("Employer CTA label", "ctaEmployersLabel", s.ctaEmployers.label)}
        {field("Employer CTA link", "ctaEmployersHref", s.ctaEmployers.href)}
        {field("Candidate CTA label", "ctaCandidatesLabel", s.ctaCandidates.label)}
        {field("Candidate CTA link", "ctaCandidatesHref", s.ctaCandidates.href)}
        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="socialLinks" className="text-sm font-semibold">
            Social links
          </label>
          <Textarea
            id="socialLinks"
            name="socialLinks"
            rows={6}
            className="font-mono text-xs"
            defaultValue={JSON.stringify(s.socialLinks, null, 2)}
          />
          <p className="text-xs text-muted-foreground">
            JSON list: {"{"}&quot;icon&quot;: &quot;linkedin&quot;, &quot;label&quot;: …,
            &quot;href&quot;: …{"}"} — icons: linkedin, twitter, facebook, instagram, youtube.
          </p>
        </div>
        <div className="border-t border-border pt-5 sm:col-span-2">
          <SubmitButton>Save settings</SubmitButton>
        </div>
      </form>
    </div>
  );
}
