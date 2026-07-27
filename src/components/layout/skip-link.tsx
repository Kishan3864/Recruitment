/**
 * Keyboard-accessibility: first focusable element on every page.
 * Visually hidden until focused.
 */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main-content"
      className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
    >
      {label}
    </a>
  );
}
