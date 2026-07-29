"use client";

import { useEffect, useState } from "react";
import { MonitorDown, MoreVertical, Share, X } from "lucide-react";

import { Button } from "@/components/ui/button";

/*
 * Install popup for the admin panel — shown after login on EVERY device
 * until the app is installed. Unlike the site's card (which only appears
 * when the browser volunteers beforeinstallprompt), this one always shows:
 * with the real install prompt when available, otherwise with exact
 * per-platform steps. "Not now" hides it for the current session only.
 */

const SESSION_DISMISS_KEY = "admin-install-dismissed-session";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  ("standalone" in navigator && (navigator as { standalone?: boolean }).standalone === true);

const sessionDismissed = () => {
  try {
    return sessionStorage.getItem(SESSION_DISMISS_KEY) === "1";
  } catch {
    return false;
  }
};

export function AdminPwaSetup() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (isStandalone()) return;

    setIsIos(/iPhone|iPad|iPod/.test(navigator.userAgent));

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      // Stash for late-mounting surfaces (Account page's install card) —
      // beforeinstallprompt fires once, early, and never again on SPA navs.
      (window as unknown as { __adminInstallPrompt?: Event }).__adminInstallPrompt = e;
      window.dispatchEvent(new Event("admin-install-available"));
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    const onInstalled = () => {
      setInstallEvent(null);
      setVisible(false);
      (window as unknown as { __adminInstallPrompt?: Event | null }).__adminInstallPrompt = null;
      window.dispatchEvent(new Event("admin-app-installed"));
    };
    window.addEventListener("appinstalled", onInstalled);

    // Always surface the popup (slight delay so the page lands first) —
    // even when the browser never fires beforeinstallprompt.
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!sessionDismissed()) {
      timer = setTimeout(() => setVisible(true), 900);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(SESSION_DISMISS_KEY, "1");
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
      className="fixed inset-x-3 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-50 rounded-lg border border-brand-100 bg-white p-4 shadow-card-hover motion-safe:animate-rise sm:inset-x-auto sm:right-4 sm:w-96 lg:bottom-4"
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
              ? "Your command center on this device — full-screen, its own icon, Inbox and New-job shortcuts."
              : isIos
                ? "Open full-screen with its own icon — takes ten seconds:"
                : "Open full-screen with its own icon — install it from the browser menu:"}
          </p>

          {!installEvent && (
            <p className="mt-2 flex items-start gap-2 rounded-sm border border-brand-100 bg-brand-50 p-2.5 text-xs">
              {isIos ? (
                <>
                  <Share className="mt-0.5 size-3.5 shrink-0 text-brand-700" aria-hidden="true" />
                  <span>
                    Tap <span className="font-semibold">Share</span> →{" "}
                    <span className="font-semibold">“Add to Home Screen”</span>
                  </span>
                </>
              ) : (
                <>
                  <MoreVertical
                    className="mt-0.5 size-3.5 shrink-0 text-brand-700"
                    aria-hidden="true"
                  />
                  <span>
                    Browser menu <span className="font-semibold">⋮</span> →{" "}
                    <span className="font-semibold">“Install app”</span>
                    <span className="hidden sm:inline">
                      {" "}
                      (on a PC: the install icon in the address bar)
                    </span>
                  </span>
                </>
              )}
            </p>
          )}

          <div className="mt-3 flex items-center gap-2">
            {installEvent && (
              <Button
                size="sm"
                onClick={install}
                className="bg-cta text-cta-foreground hover:bg-cta/90"
              >
                <MonitorDown data-icon="inline-start" aria-hidden="true" />
                Install app
              </Button>
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
