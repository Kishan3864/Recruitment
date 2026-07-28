/**
 * Motion tokens — JS mirror of the CSS custom properties in globals.css
 * (--ease-soft, --duration-*). Framer Motion variants read from here so CSS
 * transitions and JS animations share one vocabulary.
 */
export const EASE_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Seconds (Framer Motion units). CSS mirrors are in milliseconds. */
export const DURATION = {
  micro: 0.18,
  hover: 0.22,
  ui: 0.32,
  reveal: 0.6,
} as const;

/** Section reveal trigger: fire once, at 20% viewport entry. */
export const REVEAL_VIEWPORT = { once: true, amount: 0.2 } as const;

/** Delay between sibling card reveals (90ms). */
export const STAGGER_SIBLINGS = 0.09;
