import { Container } from "@/components/shared/container";

/** Global route-transition skeleton: shimmering hero-shaped placeholders. */
export default function Loading() {
  return (
    <div role="status" aria-label="Loading">
      <Container className="grid items-center gap-14 py-16 lg:grid-cols-2 lg:gap-8 lg:py-24">
        <div>
          <div className="skeleton h-8 w-56 rounded-full" />
          <div className="mt-7 space-y-3.5">
            <div className="skeleton h-12 w-full max-w-xl" />
            <div className="skeleton h-12 w-4/5 max-w-lg" />
          </div>
          <div className="mt-7 space-y-2.5">
            <div className="skeleton h-4 w-full max-w-lg" />
            <div className="skeleton h-4 w-3/4 max-w-md" />
          </div>
          <div className="mt-9 flex gap-3">
            <div className="skeleton h-10 w-36" />
            <div className="skeleton h-10 w-32" />
          </div>
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-6">
            <div className="skeleton h-16" />
            <div className="skeleton h-16" />
            <div className="skeleton h-16" />
          </div>
        </div>
        <div className="mx-auto w-full max-w-md lg:max-w-lg">
          <div className="skeleton aspect-[4/5] w-full rounded-lg" />
        </div>
      </Container>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
