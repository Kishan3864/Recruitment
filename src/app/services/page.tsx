import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import workspacePhoto from "../../../public/images/workspace.jpg";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { ServiceCard } from "@/components/shared/service-card";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/content/collections";
import { getServicesPage } from "@/lib/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicesPage();
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([getServicesPage(), getServices()]);

  return (
    <>
      <PageHero content={page.hero} />
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.08}>
                <ServiceCard service={service} learnMore={page.learnMore} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16">
            <div className="section-navy relative grid overflow-hidden rounded-3xl lg:grid-cols-[1fr_360px]">
              <div className="p-8 text-center sm:p-12 lg:text-left">
                <h2 className="text-display-xs text-white">{page.ctaBanner.heading}</h2>
                <p className="mt-3 max-w-xl leading-relaxed text-brand-100/85">
                  {page.ctaBanner.description}
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mt-7 bg-cta text-cta-foreground hover:bg-cta/90"
                >
                  <Link href={page.ctaBanner.cta.href}>
                    {page.ctaBanner.cta.label}
                    <ArrowRight data-icon="inline-end" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
              <div className="relative hidden lg:block">
                <Image
                  src={workspacePhoto}
                  alt=""
                  fill
                  sizes="360px"
                  className="object-cover opacity-90"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-brand-950/70 to-transparent"
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
