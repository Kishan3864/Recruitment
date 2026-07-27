import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Icon registry: content stores icon names as strings; this resolves them to
 * components while keeping tree-shaking intact (no `import *`).
 *
 * Social/brand glyphs are hand-authored inline SVGs (lucide-react v1 removed
 * brand icons). Generic icons come from lucide. Extend both maps as content
 * needs new icons.
 */

type Glyph = { viewBox: string; path: React.ReactNode };

const socialGlyphs: Record<string, Glyph> = {
  linkedin: {
    viewBox: "0 0 24 24",
    path: (
      <path
        fill="currentColor"
        d="M6.5 8.7H4.1V20h2.4V8.7ZM5.3 4a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1ZM13 8.7h-2.3V20H13v-5.9c0-1.7.7-2.7 2-2.7 1.3 0 1.9.9 1.9 2.7V20h2.4v-6.5c0-3-1.5-4.5-3.7-4.5-1.6 0-2.3.8-2.6 1.4V8.7Z"
      />
    ),
  },
  twitter: {
    viewBox: "0 0 24 24",
    path: (
      <path
        fill="currentColor"
        d="M4.2 4.5h4.3l4 5.4 4.6-5.4h2.5l-6 7 6.2 8h-4.3l-4.3-5.7-4.9 5.7H3.8l6.3-7.3-5.9-7.7Z"
      />
    ),
  },
  facebook: {
    viewBox: "0 0 24 24",
    path: (
      <path
        fill="currentColor"
        d="M13.6 20.5v-6.9h2.3l.4-2.7h-2.7V9.2c0-.8.3-1.4 1.4-1.4h1.4V5.4c-.5-.1-1.3-.2-2.1-.2-2.2 0-3.6 1.3-3.6 3.7v2h-2.3v2.7h2.3v6.9h2.9Z"
      />
    ),
  },
  instagram: {
    viewBox: "0 0 24 24",
    path: (
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      </g>
    ),
  },
  youtube: {
    viewBox: "0 0 24 24",
    path: (
      <g>
        <rect
          x="2.5"
          y="5.5"
          width="19"
          height="13"
          rx="3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path fill="currentColor" d="m10.2 9.3 5 2.7-5 2.7V9.3Z" />
      </g>
    ),
  },
};

const lucideIcons: Record<string, LucideIcon> = {
  mail: Mail,
  "map-pin": MapPin,
  phone: Phone,
};

export function ContentIcon({ name, className }: { name: string; className?: string }) {
  const glyph = socialGlyphs[name];
  if (glyph) {
    return (
      <svg
        viewBox={glyph.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className={cn("size-4", className)}
        aria-hidden="true"
      >
        {glyph.path}
      </svg>
    );
  }
  const Icon = lucideIcons[name];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}
