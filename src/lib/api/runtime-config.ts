// Resolve the landing-be API URL. On the server we read process.env directly
// (Next.js inlines NEXT_PUBLIC_* at build time, but we still get them at SSR).
// In the browser we prefer window.__RUNTIME_CONFIG__ so the same image can be
// deployed across envs without rebuilding — start.sh writes it on container
// boot from $NEXT_PUBLIC_API_URL.
const FALLBACK = "http://localhost:8080";

interface RuntimeConfig {
  NEXT_PUBLIC_API_URL?: string;
}

// Defense against an HTTP URL leaking into the bundle / runtime config when
// the page is served over HTTPS — modern browsers refuse mixed-content fetches
// silently, and a `default-src 'self' https:` CSP also blocks it. Upgrade in
// place so admin / direct cross-origin calls don't break.
function upgradeIfMixed(url: string): string {
  if (typeof window === "undefined") return url;
  if (window.location.protocol !== "https:") return url;
  if (url.startsWith("http://")) return "https://" + url.slice("http://".length);
  return url;
}

export function getApiUrl(): string {
  if (typeof window !== "undefined") {
    const cfg = (window as unknown as { __RUNTIME_CONFIG__?: RuntimeConfig }).__RUNTIME_CONFIG__;
    if (cfg?.NEXT_PUBLIC_API_URL) return upgradeIfMixed(cfg.NEXT_PUBLIC_API_URL);
  }
  return upgradeIfMixed(process.env.NEXT_PUBLIC_API_URL || FALLBACK);
}

// Server-side override: when running inside Docker, set API_URL to the internal
// service address (e.g. http://landing-be:8080) for faster RSC calls. Falls
// back to NEXT_PUBLIC_API_URL so a single env var works for simple deploys.
export function getServerApiUrl(): string {
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || FALLBACK;
}
