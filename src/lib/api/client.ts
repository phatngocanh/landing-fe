// Browser + RSC fetch helper for landing-be.
//
// On the server: hits landing-be directly via API_URL / NEXT_PUBLIC_API_URL.
//   Uses Next.js fetch caching (`next.revalidate` / `next.tags`) so
//   `/api/revalidate` can bust by tag from the admin UI or backend webhook.
//
// In the browser: hits same-origin paths (e.g. `/api/v1/products`).
//   The catch-all Route Handler at `app/api/v1/[...path]/route.ts` proxies
//   to landing-be, sidestepping CORS/mixed-content/runtime-config entirely.
import type { ApiEnvelope } from "./types";
import { getServerApiUrl } from "./runtime-config";

function baseUrl(): string {
  if (typeof window === "undefined") return getServerApiUrl();
  return ""; // same-origin
}

function buildUrl(path: string, query?: ApiFetchOptions["query"]): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const search = new URLSearchParams();
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== "" && v !== false) search.set(k, String(v));
    }
  }
  const qs = search.toString();
  const base = baseUrl();
  const url = base ? `${base.replace(/\/$/, "")}${cleanPath}` : cleanPath;
  return qs ? `${url}?${qs}` : url;
}

export interface ApiFetchOptions {
  query?: Record<string, string | number | boolean | undefined>;
  /** ISR revalidate seconds when called from a server component. Ignored in the browser. */
  revalidate?: number;
  /** Cache tags for on-demand `revalidateTag` busting. Server only. */
  tags?: string[];
  /** When true (server only), skip cache entirely. */
  noCache?: boolean;
  /** Extra cookies / headers (used by admin login flow). */
  init?: RequestInit;
}

export async function apiFetch<T>(path: string, opts: ApiFetchOptions = {}): Promise<T | null> {
  const url = buildUrl(path, opts.query);

  const init: RequestInit = {
    ...opts.init,
    headers: { Accept: "application/json", ...(opts.init?.headers || {}) },
  };

  if (typeof window === "undefined") {
    if (opts.noCache) {
      (init as RequestInit & { cache?: RequestCache }).cache = "no-store";
    } else {
      const next: { revalidate?: number; tags?: string[] } = {
        revalidate: opts.revalidate ?? 300,
      };
      if (opts.tags?.length) next.tags = opts.tags;
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
