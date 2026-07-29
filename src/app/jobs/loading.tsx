import { Container } from "@/components/shared/container";

/** Jobs listing skeleton: shimmering filter bar + card grid. */
export default function Loading() {
  return (
    <div role="status" aria-label="Loading jobs">
      <Container className="py-16">
        <div className="skeleton h-8 w-40 rounded-full" />
        <div className="skeleton mt-6 h-12 w-full max-w-xl" />
        <div className="skeleton mt-8 h-16 w-full max-w-4xl rounded-lg" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="rounded-lg border bg-card p-6">
              <div className="skeleton h-3.5 w-24" />
              <div className="skeleton mt-3 h-6 w-3/4" />
              <div className="mt-4 space-y-2">
                <div className="skeleton h-3.5 w-full" />
                <div className="skeleton h-3.5 w-5/6" />
              </div>
              <div className="mt-5 flex gap-4">
                <div className="skeleton h-4 w-20" />
                <div className="skeleton h-4 w-16" />
                <div className="skeleton h-4 w-24" />
              </div>
              <div className="skeleton mt-5 h-9 w-full" />
            </div>
          ))}
        </div>
      </Container>
      <span className="sr-only">Loading jobs…</span>
    </div>
  );
}
