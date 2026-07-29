"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Cookie, ShieldCheck, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EASE_SOFT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CONSENT_KEY = "cookie-consent-v1";

type Consent = { necessary: true; analytics: boolean; marketing: boolean; ts: number };

const save = (analytics: boolean, marketing: boolean) => {
  const consent: Consent = { necessary: true, analytics, marketing, ts: Date.now() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent("consentchange", { detail: consent }));
};

/**
 * Cookie consent banner: accept all / reject all / customize (per-category
 * toggles). Choice persists in localStorage and is broadcast via a
 * `consentchange` event for future analytics wiring. Non-modal (the page
 * stays usable), keyboard accessible, static under reduced motion.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY)) return;
    } catch {
      return;
    }
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  const decide = (a: boolean, m: boolean) => {
    save(a, m);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <motion.section
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 z-50 max-w-[calc(100vw-2rem)] rounded-lg border border-brand-100 bg-white p-5 shadow-card-hover sm:max-w-xl"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_SOFT }}
    >
      <div className="flex items-start gap-3.5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-tint-lavender text-deep-lavender">
          <Cookie className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-base font-bold">We value your privacy</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            We use cookies to make the site work, understand traffic, and personalize content. You
            can accept all, reject all, or choose what you&rsquo;re comfortable with.
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-deep-mint">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Your data is protected and secure
          </p>
        </div>
      </div>

      {customize && (
        <div className="mt-4 space-y-2 border-t border-border pt-4">
          {[
            {
              id: "necessary",
              label: "Essential",
              desc: "Required for the site to work. Always on.",
              checked: true,
              disabled: true,
              onChange: () => {},
            },
            {
              id: "analytics",
              label: "Analytics",
              desc: "Helps us understand traffic and improve.",
              checked: analytics,
              disabled: false,
              onChange: () => setAnalytics((v) => !v),
            },
            {
              id: "marketing",
              label: "Marketing",
              desc: "Personalized content and campaigns.",
              checked: marketing,
              disabled: false,
              onChange: () => setMarketing((v) => !v),
            },
          ].map((item) => (
            <label
              key={item.id}
              htmlFor={`consent-${item.id}`}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-sm border border-border p-3",
                item.disabled && "cursor-default opacity-70"
              )}
            >
              <input
                id={`consent-${item.id}`}
                type="checkbox"
                checked={item.checked}
                disabled={item.disabled}
                onChange={item.onChange}
                aria-label={item.label}
                className="mt-0.5 size-4 accent-brand-600"
              />
              <span>
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className="block text-xs text-muted-foreground">{item.desc}</span>
              </span>
            </label>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        {customize ? (
          <Button
            size="sm"
            onClick={() => decide(analytics, marketing)}
            className="bg-primary text-primary-foreground"
          >
            Save preferences
          </Button>
        ) : (
          <>
            <Button size="sm" onClick={() => decide(true, true)}>
              Accept all
            </Button>
            <Button size="sm" variant="outline" onClick={() => decide(false, false)}>
              Reject all
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setCustomize(true)}>
              <Settings2 data-icon="inline-start" aria-hidden="true" />
              Customize
            </Button>
          </>
        )}
        <Link
          href="/privacy-policy"
          className="ml-auto text-xs text-muted-foreground underline-offset-2 hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </motion.section>
  );
}
