import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Clock, Mail, MapPin, Phone } from "lucide-react";

import officePhoto from "../../../../public/images/office.jpg";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { getContactPage } from "@/lib/content/pages";
import { getSiteSettings } from "@/lib/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getContactPage(), getSiteSettings()]);

  return (
    <>
      <PageHero content={page.hero} />

      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
          {/* Direct contact info */}
          <Reveal>
            <h2 className="text-display-xs">{page.reachUs.heading}</h2>
            <ul className="mt-7 space-y-5">
              <li className="flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {page.reachUs.phoneLabel}
                  </p>
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="font-medium transition-colors hover:text-brand-700"
                  >
                    {settings.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {page.reachUs.emailLabel}
                  </p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="font-medium transition-colors hover:text-brand-700"
                  >
                    {settings.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {page.reachUs.addressLabel}
                  </p>
                  <p className="font-medium">{settings.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700">
                  <Clock className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {page.reachUs.hoursLabel}
                  </p>
                  <p className="font-medium">{page.reachUs.hours}</p>
                </div>
              </li>
            </ul>
            <p className="mt-8 rounded-2xl border border-brand-200 bg-brand-50/70 p-4 text-sm leading-relaxed text-brand-800">
              {page.reachUs.responsePromise}
            </p>
            <div className="relative mt-8 hidden overflow-hidden rounded-3xl border-4 border-white shadow-lg lg:block">
              <Image
                src={officePhoto}
                alt=""
                sizes="380px"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-xl font-semibold">{page.form.title}</h2>
              <p className="mt-1.5 mb-7 text-sm text-muted-foreground">{page.form.subtitle}</p>
              <ContactForm copy={page.form} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Offices */}
      <section className="border-t bg-surface-sunken py-16 lg:py-24">
        <Container>
          <SectionHeading eyebrow={page.offices.eyebrow} heading={page.offices.heading} />
          <div className="grid gap-6 md:grid-cols-3">
            {page.offices.locations.map((office, i) => (
              <Reveal key={office.city} delay={(i % 3) * 0.08}>
                <div className="card-lift h-full rounded-2xl border bg-card p-7 shadow-xs">
                  <span className="mb-5 flex size-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700">
                    <Building2 className="size-5.5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{office.city}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {office.address}
                  </p>
                  <div className="mt-4 space-y-1.5 border-t pt-4 text-sm">
                    <a
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="block font-medium transition-colors hover:text-brand-700"
                    >
                      {office.phone}
                    </a>
                    <a
                      href={`mailto:${office.email}`}
                      className="block text-muted-foreground transition-colors hover:text-brand-700"
                    >
                      {office.email}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
