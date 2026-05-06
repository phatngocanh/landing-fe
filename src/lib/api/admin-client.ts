// Browser-side admin API. Calls landing-be directly with a Bearer token from
// localStorage (set on login) — no cookies, no proxy, no shared-domain tricks.
// Mirrors management-app-frontend's auth pattern.
import type { ApiCategory, ApiEnvelope, ApiProductDetail, ApiProductListData } from "./types";
import { getApiUrl } from "./runtime-config";
import { auth } from "@/lib/auth";

export class ApiError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

interface CallOptions {
  /** When false, do NOT attach Authorization header. Used for /admin/login. */
  authed?: boolean;
}

async function call<T>(
  method: string,
  path: string,
  body?: unknown,
  opts: CallOptions = {},
): Promise<T | null> {
  const base = getApiUrl().replace(/\/?$/, "/");
  const url = new URL(path.replace(/^\//, ""), base);

  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (opts.authed !== false) {
    const token = auth.getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  // 401 means the token is missing or expired — clear local state so the next
  // navigation picks up the redirect from the layout guard. We don't redirect
  // here directly (avoids surprises in mid-form flows).
  if (res.status === 401 && opts.authed !== false) {
    auth.clear();
  }

  if (res.status === 204) return null;
  const env = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;
  if (!res.ok || !env || !env.success) {
    const first = env?.errors?.[0];
    throw new ApiError(first?.message ?? `${res.status} ${res.statusText}`, res.status, first?.code);
  }
  return env.data;
}

// --- Auth ---

export interface LoginData {
  token: string;
  username: string;
}

export async function adminLogin(username: string, password: string): Promise<LoginData> {
  const data = await call<LoginData>("POST", "/api/v1/admin/login", { username, password }, { authed: false });
  if (!data) throw new ApiError("login returned empty response", 500);
  return data;
}
export async function adminLogout() {
  return call<null>("POST", "/api/v1/admin/logout");
}
export async function getMe(): Promise<{ username: string } | null> {
  return call<{ username: string }>("GET", "/api/v1/admin/me");
}

// --- Read-side admin data (browser only, after login) ---

export async function adminListProducts(): Promise<ApiProductListData | null> {
  return call<ApiProductListData>("GET", "/api/v1/products?pageSize=100");
}
export async function adminGetProduct(slug: string): Promise<ApiProductDetail | null> {
  return call<ApiProductDetail>("GET", `/api/v1/products/${encodeURIComponent(slug)}`);
}

// --- Categories ---

export interface CategoryUpsertBody {
  name: string;
  slug?: string;
  sortOrder?: number;
}

export async function createCategory(body: CategoryUpsertBody) {
  return call<ApiCategory>("POST", "/api/v1/admin/categories", body);
}
export async function updateCategory(id: number, body: CategoryUpsertBody) {
  return call<ApiCategory>("PUT", `/api/v1/admin/categories/${id}`, body);
}
export async function deleteCategory(id: number) {
  return call<null>("DELETE", `/api/v1/admin/categories/${id}`);
}

// --- Products ---

export interface ProductImageBody {
  url: string;
  alt?: string;
  sortOrder?: number;
  isPrimary?: boolean;
}

export interface ProductUpsertBody {
  name: string;
  slug?: string;
  categoryId?: number | null;
  priceText?: string;
  priceRaw?: number | null;
  descriptionHtml?: string;
  status?: "active" | "draft";
  seoTitle?: string;
  seoDescription?: string;
  sourceUrl?: string;
  images?: ProductImageBody[];
}

export async function createProduct(body: ProductUpsertBody) {
  return call<ApiProductDetail>("POST", "/api/v1/admin/products", body);
}
export async function updateProduct(id: number, body: ProductUpsertBody) {
  return call<ApiProductDetail>("PUT", `/api/v1/admin/products/${id}`, body);
}
export async function deleteProduct(id: number) {
  return call<null>("DELETE", `/api/v1/admin/products/${id}`);
}

// --- Uploads (S3 presigned PUT) ---

export interface SignedUpload {
  uploadUrl: string;
  publicUrl: string;
  key: string;
  expiresIn: number;
}

export async function requestProductImageUploadUrl(fileName: string, contentType: string) {
  return call<SignedUpload>("POST", "/api/v1/admin/uploads/product-image-url", { fileName, contentType });
}

export async function uploadFileToS3(uploadUrl: string, file: File): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!res.ok) {
    throw new ApiError(`S3 upload failed: ${res.status} ${res.statusText}`, res.status);
  }
}
