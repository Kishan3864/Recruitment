"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";

import { GridPattern } from "@/components/graphics/grid-pattern";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

/**
 * Route error boundary: branded, calm, recoverable. Mirrors the 404 page's
 * composition so failures still feel like the same site.
 */
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="bg-hero-wash relative overflow-hidden">
      <GridPattern />
      <Container className="relative flex flex-col items-center py-28 text-center lg:py-40">
        <p className="font-display text-7xl font-bold text-brand-200">500</p>
        <h1 className="mt-4 text-display-xs text-balance">Something went wrong on our side</h1>
        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
          A temporary glitch stopped this page from loading. It&rsquo;s not you — try again, or head
          back to the homepage.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={reset}>
            <RotateCcw data-icon="inline-start" aria-hidden="true" />
            Try again
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
