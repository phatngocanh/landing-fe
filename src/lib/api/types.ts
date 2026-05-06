// Shared API contract types matching landing-be JSON shapes.
// Source of truth: go-be `internal/domain/model/*.go`.

export interface ApiEnvelope<T> {
  success: boolean;
  data: T | null;
  errors: Array<{ message: string; code: string; field: string }> | null;
}

export interface ApiCategory {
  id: number;
  parentId: number | null;
  slug: string;
  name: string;
  sortOrder: number;
  productCount: number;
}

export interface ApiCategoryRef {
  id: number;
  slug: string;
  name: string;
}

export interface ApiProductImage {
  url: string;
  alt: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ApiProductSummary {
  id: number;
  slug: string;
  name: string;
  category: ApiCategoryRef | null;
  priceText: string;
  priceRaw: number | null;
  primaryImage: ApiProductImage | null;
  status: "active" | "draft";
}

export interface ApiProductDetail extends ApiProductSummary {
  descriptionHtml: string;
  descriptionText: string;
  seoTitle: string;
  seoDescription: string;
  sourceUrl: string;
  images: ApiProductImage[];
}

export interface ApiCategoryListData {
  items: ApiCategory[];
}

export interface ApiProductListData {
  items: ApiProductSummary[];
  page: number;
  pageSize: number;
  total: number;
}

// FE-side display Product shape. Adapter `toProduct` converts ApiProductDetail
// or ApiProductSummary to this shape so existing UI components keep working.
export interface Product {
  id: string;          // BE numeric id, stringified
  slug: string;
  name: string;
  category: string;          // category display name (or "Khác")
  categorySlug: string;
  sku: string;               // synthesized: "ZF-<id>"
  price: string;
  priceRaw: number;
  oldPrice?: string;
  oldPriceRaw?: number;
  discount?: string;
  badge?: string | null;
  description: string;       // plaintext description
  descriptionHtml: string;   // sanitized HTML for prose rendering
  uses: string[];
  volumes: string[];
  specs: { label: string; value: string }[];
  inStock: boolean;
  img: string;               // primary image URL (always present; placeholder fallback)
  images: string[];          // all image URLs (at least 1)
  seoTitle?: string;
  seoDescription?: string;
}

const PLACEHOLDER_IMG = "/placeholder.svg";

export function toProductFromSummary(s: ApiProductSummary): Product {
  return {
    id: String(s.id),
    slug: s.slug,
    name: s.name,
    category: s.category?.name ?? "Khác",
    categorySlug: s.category?.slug ?? "",
    sku: `ZF-${s.id}`,
    price: s.priceText,
    priceRaw: s.priceRaw ?? 0,
    badge: null,
    description: "",
    descriptionHtml: "",
    uses: [],
    volumes: [],
    specs: [],
    inStock: s.status === "active",
    img: s.primaryImage?.url || PLACEHOLDER_IMG,
    images: s.primaryImage ? [s.primaryImage.url] : [PLACEHOLDER_IMG],
  };
}

export function toProductFromDetail(d: ApiProductDetail): Product {
  const summary = toProductFromSummary(d);
  const imgs = d.images.length > 0 ? d.images.map((i) => i.url) : [PLACEHOLDER_IMG];
  return {
    ...summary,
    description: d.descriptionText,
    descriptionHtml: d.descriptionHtml,
    img: d.images.find((i) => i.isPrimary)?.url ?? imgs[0],
    images: imgs,
    seoTitle: d.seoTitle || undefined,
    seoDescription: d.seoDescription || undefined,
  };
}
