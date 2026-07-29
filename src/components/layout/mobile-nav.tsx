"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Dialog } from "radix-ui";

import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";
import { EASE_SOFT } from "@/lib/motion";
import { TINT, tintAt } from "@/lib/tints";
import { cn } from "@/lib/utils";
import type { NavItemContent } from "@/types/content";

interface MobileNavProps {
  brandName: string;
  items: NavItemContent[];
  cta: { label: string; href: string };
  openLabel: string;
  closeLabel: string;
  navLabel: string;
  email?: string;
}

/**
 * Mobile "junction map": the ink band unfurls into a full-screen takeover
 * (clip-path reveal) — a vertical dotted rail draws down the left gutter
 * linking a tint node per route, rows stagger in as display type, the amber
 * CTA + contact email anchor the bottom. Radix Dialog supplies focus trap,
 * Esc, aria-modal and scroll lock; Framer supplies the choreography.
 */
export function MobileNav({
  brandName,
  items,
  cta,
  openLabel,
  closeLabel,
  navLabel,
  email,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label={openLabel}
          className="flex size-10 items-center justify-center rounded-full border border-border bg-white text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          {/* bars + amber dot — the brand glyph, not a generic hamburger */}
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span className="absolute top-0 left-0 h-0.5 w-5 rounded-full bg-foreground" />
            <span className="absolute bottom-0 left-0 h-0.5 w-3.5 rounded-full bg-foreground" />
            <span className="absolute right-0 bottom-0 size-1 rounded-full bg-cta-500" />
          </span>
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content forceMount asChild aria-describedby={undefined}>
              <motion.div
                data-lenis-prevent=""
                className="fixed inset-0 z-50 flex flex-col bg-brand-950 text-white"
                initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
                animate={
                  reduceMotion
                    ? { opacity: 1, transition: { duration: 0.15 } }
                    : {
                        clipPath: "inset(0 0 0% 0)",
                        transition: { duration: 0.4, ease: EASE_SOFT },
                      }
                }
                exit={
                  reduceMotion
                    ? { opacity: 0, transition: { duration: 0.15 } }
                    : {
                        clipPath: "inset(0 0 100% 0)",
                        transition: { duration: 0.22, ease: EASE_SOFT },
                      }
                }
              >
                <Dialog.Title className="sr-only">{navLabel}</Dialog.Title>
                <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
                  <BrandLogo name={brandName} dark />
                  <Dialog.Close asChild>
                    <button
                      aria-label={closeLabel}
                      className="flex size-10 items-center justify-center rounded-sm border border-white/20 text-white outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      <span className="relative block size-4" aria-hidden="true">
                        <span className="absolute top-1/2 left-0 h-0.5 w-4 -translate-y-1/2 rotate-45 rounded-full bg-white" />
                        <span className="absolute top-1/2 left-0 h-0.5 w-4 -translate-y-1/2 -rotate-45 rounded-full bg-white" />
                        <span className="absolute top-1/2 left-1/2 size-1 -translate-1/2 rounded-full bg-cta-400" />
                      </span>
                    </button>
                  </Dialog.Close>
                </div>

                <nav
                  aria-label={navLabel}
                  className="relative flex-1 overflow-y-auto px-6 pt-6 pb-8"
                >
                  {/* vertical dotted rail linking the route nodes */}
                  <motion.div
                    aria-hidden="true"
                    className="absolute top-8 bottom-8 left-[29px] w-0.5 origin-top bg-[radial-gradient(circle,rgb(255_255_255/0.18)_1px,transparent_1.4px)] bg-[length:2px_8px] bg-repeat-y"
                    initial={reduceMotion ? false : { scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: EASE_SOFT }}
                  />
                  <ul className="space-y-1">
                    {items.map((item, i) => {
                      const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                      return (
                        <li key={item.href}>
                          <motion.div
                            {...(reduceMotion
                              ? {}
                              : {
                                  initial: { opacity: 0, x: -12 },
                                  animate: { opacity: 1, x: 0 },
                                  transition: {
                                    duration: 0.22,
                                    delay: 0.12 + i * 0.05,
                                    ease: EASE_SOFT,
                                  },
                                })}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "flex items-center gap-5 rounded-sm py-2.5 font-display text-2xl font-bold outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                                active
                                  ? "text-white"
                                  : "text-neutral-400 transition-colors hover:text-white",
                                TINT[tintAt(i)].node
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={cn(
                                  "relative z-10 size-2.5 shrink-0 rounded-full bg-(--node-accent)",
                                  active
                                    ? "shadow-[0_0_0_2px_#ffffff,0_0_12px_1px_var(--node-accent)]"
                                    : "opacity-40"
                                )}
                              />
                              {item.label}
                            </Link>
                          </motion.div>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <motion.div
                  className="shrink-0 border-t border-white/10 px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
                  {...(reduceMotion
                    ? {}
                    : {
                        initial: { opacity: 0, y: 8 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.32, delay: 0.45, ease: EASE_SOFT },
                      })}
                >
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-cta text-cta-foreground hover:bg-cta/90"
                  >
                    <Link href={cta.href} onClick={() => setOpen(false)}>
                      {cta.label}
                    </Link>
                  </Button>
                  {email && <p className="mt-3 text-center text-sm text-white/70">{email}</p>}
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
