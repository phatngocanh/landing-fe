// Server- and client-callable fetch helpers for landing-be.
//
// On the server, set API_URL (e.g. http://landing-be:8080) for the internal
// network; falls back to NEXT_PUBLIC_API_URL or http://localhost:8080.
// In the browser, getApiUrl() reads window.__RUNTIME_CONFIG__ first so the
// same image can be redeployed across envs without rebuilding (start.sh
// writes that file from $NEXT_PUBLIC_API_URL on container boot).
// ISR controlled via `revalidate` (in seconds) — defaults to 5 min.
import type { ApiEnvelope } from "./types";
import { getApiUrl, getServerApiUrl } from "./runtime-config";

function baseUrl(): string {
  return typeof window === "undefined" ? getServerApiUrl() : getApiUrl();
}

export interface ApiFetchOptions {
  query?: Record<string, string | number | boolean | undefined>;
  /** ISR revalidate seconds when called from a server component. Ignored on the client. */
  revalidate?: number;
  /** When true (server only), skip cache entirely. */
  noCache?: boolean;
  /** Extra cookies / headers (used by admin login flow). */
  init?: RequestInit;
}

export async function apiFetch<T>(path: string, opts: ApiFetchOptions = {}): Promise<T | null> {
  const url = new URL(path.replace(/^\//, ""), baseUrl().replace(/\/?$/, "/"));
  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v !== undefined && v !== "" && v !== false) {
        url.searchParams.set(k, String(v));
      }
    }
  }

  const init: RequestInit = {
    ...opts.init,
    headers: { Accept: "application/json", ...(opts.init?.headers || {}) },
  };

  if (typeof window === "undefined") {
    const next: { revalidate?: number; tags?: string[] } = {};
    if (opts.noCache) {
      (init as RequestInit & { cache?: RequestCache }).cache = "no-store";
    } else {
      next.revalidate = opts.revalidate ?? 300;
      (init as RequestInit & { next?: typeof next }).next = next;
    }
  }

  const res = await fetch(url, init);
  if (res.status === 404) return null;
  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const body = (await res.json()) as ApiEnvelope<unknown>;
      const first = body.errors?.[0];
      if (first) msg = `${first.code}: ${first.message}`;
    } catch { /* ignore */ }
    throw new ApiError(msg, res.status);
  }

  const body = (await res.json()) as ApiEnvelope<T>;
  if (!body.success) {
    const first = body.errors?.[0];
    throw new ApiError(first?.message ?? "request failed", res.status);
  }
  return body.data;
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}
