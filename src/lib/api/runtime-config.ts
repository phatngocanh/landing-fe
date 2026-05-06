// Resolve the landing-be API URL. On the server we read process.env directly
// (Next.js inlines NEXT_PUBLIC_* at build time, but we still get them at SSR).
// In the browser we prefer window.__RUNTIME_CONFIG__ so the same image can be
// deployed across envs without rebuilding — start.sh writes it on container
// boot from $NEXT_PUBLIC_API_URL.
const FALLBACK = "http://localhost:8080";

interface RuntimeConfig {
  NEXT_PUBLIC_API_URL?: string;
}

export function getApiUrl(): string {
  if (typeof window !== "undefined") {
    const cfg = (window as unknown as { __RUNTIME_CONFIG__?: RuntimeConfig }).__RUNTIME_CONFIG__;
    if (cfg?.NEXT_PUBLIC_API_URL) return cfg.NEXT_PUBLIC_API_URL;
  }
  return process.env.NEXT_PUBLIC_API_URL || FALLBACK;
}

// Server-side override: when running inside Docker, set API_URL to the internal
// service address (e.g. http://landing-be:8080) for faster RSC calls. Falls
// back to NEXT_PUBLIC_API_URL so a single env var works for simple deploys.
export function getServerApiUrl(): string {
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || FALLBACK;
}
