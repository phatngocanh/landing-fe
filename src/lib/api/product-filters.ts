// Pure search/sort/paging helpers, shared by the server (initial render of
// /products) and the client React Query hook (interactive filtering).
import type { Product } from "./types";

export interface ProductsParams {
  category?: string;
  search?: string;
  sort?: "default" | "price-asc" | "price-desc" | "name";
  page?: number;
  pageSize?: number;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const PAGE_SIZE_DEFAULT = 12;

export function applyProductFilters(
  items: Product[],
  params: ProductsParams,
): ProductsResponse {
  const { search = "", sort = "default", page = 1, pageSize = PAGE_SIZE_DEFAULT } = params;

  let all = items;

  if (search.trim()) {
    const q = search.toLowerCase().trim();
    all = all.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q),
    );
  }
  if (sort === "price-asc") all = [...all].sort((a, b) => a.priceRaw - b.priceRaw);
  else if (sort === "price-desc") all = [...all].sort((a, b) => b.priceRaw - a.priceRaw);
  else if (sort === "name") all = [...all].sort((a, b) => a.name.localeCompare(b.name, "vi"));

  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    data: all.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export function paramsEqual(a: ProductsParams, b: ProductsParams): boolean {
  return (
    (a.category ?? "") === (b.category ?? "") &&
    (a.search ?? "") === (b.search ?? "") &&
    (a.sort ?? "default") === (b.sort ?? "default") &&
    (a.page ?? 1) === (b.page ?? 1) &&
    (a.pageSize ?? PAGE_SIZE_DEFAULT) === (b.pageSize ?? PAGE_SIZE_DEFAULT)
  );
}
