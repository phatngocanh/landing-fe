// Server-only data fetchers for landing-be. Use from React Server Components.
import { apiFetch } from "./client";
import {
  type ApiCategoryListData,
  type ApiProductDetail,
  type ApiProductListData,
  type Product,
  toProductFromDetail,
  toProductFromSummary,
} from "./types";

const REVALIDATE_PRODUCT_LIST = 300; // 5 min
const REVALIDATE_PRODUCT_DETAIL = 300;
const REVALIDATE_CATEGORIES = 600; // 10 min

export interface CategoryDTO {
  id: number;
  slug: string;
  name: string;
  sortOrder: number;
  productCount: number;
}

export async function getCategories(): Promise<CategoryDTO[]> {
  try {
    const data = await apiFetch<ApiCategoryListData>("/api/v1/categories", {
      revalidate: REVALIDATE_CATEGORIES,
    });
    return data?.items ?? [];
  } catch (err) {
    console.error("[getCategories] failed:", err);
    return [];
  }
}

export interface ListProductsOptions {
  categorySlug?: string;
  page?: number;
  pageSize?: number;
}

export async function listProducts(opts: ListProductsOptions = {}): Promise<{
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
}> {
  try {
    const data = await apiFetch<ApiProductListData>("/api/v1/products", {
      query: {
        category: opts.categorySlug,
        status: "active",
        page: opts.page ?? 1,
        pageSize: opts.pageSize ?? 100,
      },
      revalidate: REVALIDATE_PRODUCT_LIST,
    });
    return {
      items: (data?.items ?? []).map(toProductFromSummary),
      total: data?.total ?? 0,
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 0,
    };
  } catch (err) {
    console.error("[listProducts] failed:", err);
    return { items: [], total: 0, page: 1, pageSize: 0 };
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await apiFetch<ApiProductDetail>(`/api/v1/products/${encodeURIComponent(slug)}`, {
      revalidate: REVALIDATE_PRODUCT_DETAIL,
    });
    return data ? toProductFromDetail(data) : null;
  } catch (err) {
    console.error(`[getProductBySlug ${slug}] failed:`, err);
    return null;
  }
}

export async function getRelatedProducts(slug: string, limit = 4): Promise<Product[]> {
  const product = await getProductBySlug(slug);
  if (!product) return [];
  const related = await listProducts({ categorySlug: product.categorySlug, pageSize: limit + 1 });
  return related.items.filter((p) => p.slug !== slug).slice(0, limit);
}
