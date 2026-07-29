import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getFaqCategories } from "@/lib/content/collections";
import { getFaqPage } from "@/lib/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getFaqPage();
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function FaqPage() {
  const [page, categories] = await Promise.all([getFaqPage(), getFaqCategories()]);

  return (
    <>
      <PageHero content={page.hero} />
      <section className="py-16 lg:py-24">
        <Container className="max-w-3xl space-y-12">
          {categories.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.06}>
              <h2 className="mb-4 font-display text-xl font-bold">{group.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {group.items.map((faq) => (
                  <AccordionItem key={faq.question} value={faq.question}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          ))}

          <Reveal>
            <div className="rounded-3xl border bg-surface-sunken p-8 text-center">
              <p className="leading-relaxed text-muted-foreground">{page.contactPrompt.text}</p>
              <Button asChild size="lg" className="mt-5">
                <Link href={page.contactPrompt.cta.href}>
                  {page.contactPrompt.cta.label}
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
