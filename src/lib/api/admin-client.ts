// Browser-side admin API calls. Routed through the same-origin /api/v1/*
// proxy so the pna_session cookie is set on (and sent from) this Next.js host
// directly — no cross-subdomain cookie sharing required. Server-side admin
// calls live in admin-server.ts and forward cookies via next/headers.
import type { ApiCategory, ApiEnvelope, ApiProductDetail } from "./types";

export class ApiError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function call<T>(method: string, path: string, body?: unknown): Promise<T | null> {
  const res = await fetch(path.startsWith("/") ? path : `/${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (res.status === 204) return null;
  const env = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;
  if (!res.ok || !env || !env.success) {
    const first = env?.errors?.[0];
    throw new ApiError(first?.message ?? `${res.status} ${res.statusText}`, res.status, first?.code);
  }
  return env.data;
}

// --- Auth ---

export async function adminLogin(username: string, password: string) {
  return call<{ username: string }>("POST", "/api/v1/admin/login", { username, password });
}
export async function adminLogout() {
  return call<null>("POST", "/api/v1/admin/logout");
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
