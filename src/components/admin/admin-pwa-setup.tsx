"use client";

import { useEffect, useState } from "react";
import { MonitorDown, Share, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const DISMISS_KEY = "admin-pwa-install-dismissed";
const DISMISS_DAYS = 14;

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
 * Admin PWA plumbing: registers the shared service worker and offers an
 * "install the admin app" card. The admin pages link their own manifest
 * (start_url /admin), so installing from here creates a separate Admin app
 * with its own icon. No consent gating — this surface is for the site owner.
 */
export function AdminPwaSetup() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (isStandalone() || recentlyDismissed()) return;

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

    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua) && !/CriOS|FxiOS/.test(ua)) setShowIosHint(true);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  useEffect(() => {
    if (!installEvent && !showIosHint) return;
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, [installEvent, showIosHint]);

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
    <aside
      role="dialog"
      aria-label="Install the admin app"
      className="fixed right-4 bottom-20 left-4 z-50 rounded-lg border border-brand-100 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-card-hover sm:left-auto sm:w-96 lg:bottom-4"
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-md bg-brand-950"
        >
          <span className="relative flex size-5 items-center justify-center rounded-full bg-cta-400 ring-3 ring-white">
            <span className="size-1.5 rounded-full bg-white" />
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-bold">Install the Admin app</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {installEvent
              ? "Your command center on the home screen — full-screen, fast, with Inbox and New-job shortcuts."
              : "Tap the Share button, then “Add to Home Screen” for the full-screen admin app."}
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
    </aside>
  );
}
