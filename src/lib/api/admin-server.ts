// Server-side admin fetchers. Forward the session cookie from the incoming
// request so RSC pages can call admin endpoints (e.g. /admin/me, /admin
// dashboard counts).
import "server-only";
import { cookies } from "next/headers";
import type { ApiEnvelope, ApiProductDetail, ApiProductListData } from "./types";
import { getServerApiUrl } from "./runtime-config";

async function authedFetch<T>(path: string): Promise<T | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("pna_session");
  const cookieHeader = session ? `pna_session=${session.value}` : "";
  const base = getServerApiUrl();
  const url = new URL(path.replace(/^\//, ""), base.replace(/\/?$/, "/"));
  const res = await fetch(url, {
    headers: { Accept: "application/json", Cookie: cookieHeader },
    cache: "no-store",
  });
  if (res.status === 401 || res.status === 404) return null;
  if (!res.ok) {
    console.error(`[admin-server] ${path} → ${res.status}`);
    return null;
  }
  const env = (await res.json()) as ApiEnvelope<T>;
  return env.success ? env.data : null;
}

export async function getMe(): Promise<{ username: string } | null> {
  return authedFetch<{ username: string }>("/api/v1/admin/me");
}

export async function adminListProducts(): Promise<ApiProductListData | null> {
  return authedFetch<ApiProductListData>("/api/v1/products?pageSize=100");
}

export async function adminGetProduct(slug: string): Promise<ApiProductDetail | null> {
  return authedFetch<ApiProductDetail>(`/api/v1/products/${encodeURIComponent(slug)}`);
}
