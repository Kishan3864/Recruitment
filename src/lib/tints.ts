/**
 * Static Tailwind class lookup for the six card tints. Classes must stay
 * literal strings so Tailwind's scanner sees them — never concatenate names.
 */
export type Tint = "cream" | "lavender" | "blush" | "sage" | "mint" | "peach";

/** Cycle order for zig-zag card sequences. */
export const TINT_ORDER: readonly Tint[] = ["cream", "lavender", "blush", "sage", "mint", "peach"];

export const TINT: Record<
  Tint,
  {
    /** Pastel card surface + its hairline border */
    surface: string;
    /** Hairline border alone */
    border: string;
    /** Accent-colored text / icon stroke — decoration on white only */
    text: string;
    /** Deep accent text/icon — AA-safe for small text on the pale tint */
    deep: string;
    /** Solid accent fill (node badges, decorative chips) */
    fill: string;
    /** Deep accent fill — AA-safe under white text (e.g. number dots) */
    fillDeep: string;
    /** Soft accent wash (icon chip backgrounds) */
    wash: string;
    /** Sets --node-accent so .node-badge glows in this accent */
    node: string;
  }
> = {
  cream: {
    surface: "bg-tint-cream border-line-cream",
    border: "border-line-cream",
    text: "text-accent-cream",
    deep: "text-deep-cream",
    fill: "bg-accent-cream",
    fillDeep: "bg-deep-cream",
    wash: "bg-accent-cream/10",
    node: "[--node-accent:var(--color-accent-cream)]",
  },
  lavender: {
    surface: "bg-tint-lavender border-line-lavender",
    border: "border-line-lavender",
    text: "text-accent-lavender",
    deep: "text-deep-lavender",
    fill: "bg-accent-lavender",
    fillDeep: "bg-deep-lavender",
    wash: "bg-accent-lavender/10",
    node: "[--node-accent:var(--color-accent-lavender)]",
  },
  blush: {
    surface: "bg-tint-blush border-line-blush",
    border: "border-line-blush",
    text: "text-accent-blush",
    deep: "text-deep-blush",
    fill: "bg-accent-blush",
    fillDeep: "bg-deep-blush",
    wash: "bg-accent-blush/10",
    node: "[--node-accent:var(--color-accent-blush)]",
  },
  sage: {
    surface: "bg-tint-sage border-line-sage",
    border: "border-line-sage",
    text: "text-accent-sage",
    deep: "text-deep-sage",
    fill: "bg-accent-sage",
    fillDeep: "bg-deep-sage",
    wash: "bg-accent-sage/10",
    node: "[--node-accent:var(--color-accent-sage)]",
  },
  mint: {
    surface: "bg-tint-mint border-line-mint",
    border: "border-line-mint",
    text: "text-accent-mint",
    deep: "text-deep-mint",
    fill: "bg-accent-mint",
    fillDeep: "bg-deep-mint",
    wash: "bg-accent-mint/10",
    node: "[--node-accent:var(--color-accent-mint)]",
  },
  peach: {
    surface: "bg-tint-peach border-line-peach",
    border: "border-line-peach",
    text: "text-accent-peach",
    deep: "text-deep-peach",
    fill: "bg-accent-peach",
    fillDeep: "bg-deep-peach",
    wash: "bg-accent-peach/10",
    node: "[--node-accent:var(--color-accent-peach)]",
  },
};

/** Tint for the nth card in a sequence. */
export const tintAt = (i: number): Tint => TINT_ORDER[i % TINT_ORDER.length];
