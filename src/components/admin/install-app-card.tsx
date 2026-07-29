"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, MonitorDown, MoreVertical, Share } from "lucide-react";

import { Button } from "@/components/ui/button";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const getStashedPrompt = () =>
  (window as unknown as { __adminInstallPrompt?: BeforeInstallPromptEvent | null })
    .__adminInstallPrompt ?? null;

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  ("standalone" in navigator && (navigator as { standalone?: boolean }).standalone === true);

/**
 * Always-available install entry point on the Account page. Uses the real
 * Chrome/Edge install prompt when the browser offers one; otherwise shows
 * exact per-platform steps, so the option is never simply "missing".
 */
export function InstallAppCard() {
  const [ready, setReady] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [canPrompt, setCanPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());
    setCanPrompt(Boolean(getStashedPrompt()));
    setIsIos(/iPhone|iPad|iPod/.test(navigator.userAgent));
    setReady(true);

    const onAvailable = () => setCanPrompt(true);
    const onInstalled = () => {
      setCanPrompt(false);
      setInstalled(true);
    };
    window.addEventListener("admin-install-available", onAvailable);
    window.addEventListener("admin-app-installed", onInstalled);
    return () => {
      window.removeEventListener("admin-install-available", onAvailable);
      window.removeEventListener("admin-app-installed", onInstalled);
    };
  }, []);

  const install = async () => {
    const prompt = getStashedPrompt();
    if (!prompt) return;
    await prompt.prompt();
    const choice = await prompt.userChoice;
    if (choice.outcome === "accepted") setCanPrompt(false);
  };

  if (!ready) {
    return <div className="skeleton h-24 rounded-md" aria-hidden="true" />;
  }

  if (installed) {
    return (
      <p className="flex items-center gap-2 rounded-md border border-line-mint bg-tint-mint p-4 text-sm text-deep-mint">
        <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
        You&apos;re using the installed Admin app — full-screen, with home-screen shortcuts.
      </p>
    );
  }

  if (canPrompt) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Put the admin panel on this device as its own app — full-screen, its own icon, and
          long-press shortcuts for Inbox and New job.
        </p>
        <Button onClick={install} className="bg-cta text-cta-foreground hover:bg-cta/90">
          <MonitorDown data-icon="inline-start" aria-hidden="true" />
          Install Admin app
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3 text-sm">
      <p className="text-muted-foreground">
        Install from the browser menu — the app then opens full-screen with its own icon:
      </p>
      {isIos ? (
        <p className="flex items-start gap-2 rounded-md border border-brand-100 bg-brand-50 p-3">
          <Share className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden="true" />
          <span>
            Tap the <span className="font-semibold">Share</span> button, then{" "}
            <span className="font-semibold">“Add to Home Screen”</span>.
          </span>
        </p>
      ) : (
        <p className="flex items-start gap-2 rounded-md border border-brand-100 bg-brand-50 p-3">
          <MoreVertical className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden="true" />
          <span>
            Open the browser menu (<span className="font-semibold">⋮</span>) and choose{" "}
            <span className="font-semibold">“Install app”</span> — on a PC, you can also use the
            install icon at the right end of the address bar.
          </span>
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        Tip: if the main site is already installed as an app on this device, the browser may hide
        this prompt — uninstall the site app once, install Admin, then reinstall the site app.
      </p>
    </div>
  );
}
