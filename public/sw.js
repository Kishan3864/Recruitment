/*
 * Service worker: offline fallback + repeat-visit speed.
 * - Navigations: network-first, falling back to the cached page, then /offline.
 * - Hashed immutable assets (/_next/static, fonts, images): cache-first.
 * - Versioned cache, old versions cleaned on activate.
 */
const VERSION = "rec-v2";
const OFFLINE_URL = "/offline";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(VERSION)
      .then((cache) => cache.addAll([OFFLINE_URL]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const CACHE_FIRST = [/^\/_next\/static\//, /^\/fonts\//, /^\/images\//, /^\/icons\//, /^\/_next\/image/];

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Admin panel: never cache (fresh, authed data only). Navigations still get
  // the offline fallback; everything else goes straight to the network.
  if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) {
    if (request.mode === "navigate") {
      event.respondWith(
        fetch(request).catch(() =>
          caches.match(OFFLINE_URL).then((cached) => cached || Response.error())
        )
      );
    }
    return;
  }

  // App navigations: network-first with offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(VERSION).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match(OFFLINE_URL))
            .then((cached) => cached || Response.error())
        )
    );
    return;
  }

  // Immutable/static assets: cache-first.
  if (CACHE_FIRST.some((re) => re.test(url.pathname))) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(VERSION).then((cache) => cache.put(request, copy));
            }
            return response;
          })
      )
    );
  }
});
