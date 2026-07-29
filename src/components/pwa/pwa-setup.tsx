"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MonitorDown, Share, X } from "lucide-react";

import { BrandMark } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";
import { EASE_SOFT } from "@/lib/motion";

const DISMISS_KEY = "pwa-install-dismissed";
const DISMISS_DAYS = 7;
const CONSENT_KEY = "cookie-consent-v1";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  ("standalone" in navigator && (navigator as { standalone?: boolean }).standalone === true);

const recentlyDismissed = () => {
  try {
    const ts = Number(localStorage.getItem(DISMISS_KEY) || 0);
    return Date.now() - ts < DISMISS_DAYS * 864e5;
  } catch {
    return false;
  }
};

/**
 * PWA plumbing: registers the service worker (production only) and shows a
 * branded install card — Chrome/Edge get the real install prompt
 * (beforeinstallprompt), iOS Safari gets Add-to-Home-Screen guidance.
 * Never shown inside the installed app, after a recent dismissal, or while
 * the cookie-consent banner is still unanswered.
 */
export function PwaSetup({ brandName }: { brandName: string }) {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [consentDone, setConsentDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (isStandalone() || recentlyDismissed()) return;

    const checkConsent = () => {
      try {
        if (localStorage.getItem(CONSENT_KEY)) setConsentDone(true);
      } catch {
        setConsentDone(true);
      }
    };
    checkConsent();
    window.addEventListener("consentchange", checkConsent);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    const onInstalled = () => {
      setInstallEvent(null);
      setVisible(false);
    };
    window.addEventListener("appinstalled", onInstalled);

    // iOS Safari has no install prompt — offer Add-to-Home-Screen guidance.
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua) && !/CriOS|FxiOS/.test(ua)) setShowIosHint(true);

    return () => {
      window.removeEventListener("consentchange", checkConsent);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // Reveal shortly after both signals are in, so it never fights the consent banner.
  useEffect(() => {
    if (!consentDone || (!installEvent && !showIosHint)) return;
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, [consentDone, installEvent, showIosHint]);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* storage unavailable */
    }
  };

  const install = async () => {
    if (!installEvent) return;
    setVisible(false);
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome !== "accepted") dismiss();
    setInstallEvent(null);
  };

  if (!visible) return null;

  return (
    <motion.aside
      role="dialog"
      aria-label={`Install ${brandName}`}
      className="fixed right-4 bottom-4 left-4 z-50 rounded-lg border border-brand-100 bg-white p-4 shadow-card-hover sm:left-auto sm:w-96"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: EASE_SOFT }}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-brand-50">
          <BrandMark className="size-8" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-bold">Install {brandName}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {installEvent
              ? "One-tap access from your device — opens full-screen and keeps working offline."
              : "Tap the Share button, then “Add to Home Screen” for the full-screen app."}
          </p>
          <div className="mt-3 flex items-center gap-2">
            {installEvent ? (
              <Button
                size="sm"
                onClick={install}
                className="bg-cta text-cta-foreground hover:bg-cta/90"
              >
                <MonitorDown data-icon="inline-start" aria-hidden="true" />
                Install app
              </Button>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-700">
                <Share className="size-3.5" aria-hidden="true" />
                Share → Add to Home Screen
              </span>
            )}
            <Button size="sm" variant="ghost" onClick={dismiss}>
              Not now
            </Button>
          </div>
        </div>
        <button
          aria-label="Dismiss"
          onClick={dismiss}
          className="rounded-xs p-1 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </motion.aside>
  );
}
