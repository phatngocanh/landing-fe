// Product + category data access. Server helpers fetch from landing-be with
// ISR; client hooks use React Query for live filtering on the products page.
"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./client";
import {
  type ApiCategoryListData,
  type ApiProductListData,
  type Product,
  toProductFromSummary,
} from "./types";

export interface ProductsParams {
  category?: string; // category slug (empty = all)
  search?: string;   // free text — applied client-side after fetch
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

const PAGE_SIZE_DEFAULT = 12;

async function fetchProducts(params: ProductsParams): Promise<ProductsResponse> {
  const {
    category = "",
    search = "",
    sort = "default",
    page = 1,
    pageSize = PAGE_SIZE_DEFAULT,
  } = params;

  // Fetch a generous page (BE max 100) so we can do client-side search/sort
  // without paging artifacts. Catalog is small (~36 items) so this is cheap.
  const data = await apiFetch<ApiProductListData>("/api/v1/products", {
    query: {
      category: category && category !== "all" ? category : undefined,
      status: "active",
      page: 1,
      pageSize: 100,
    },
  });
  let all = (data?.items ?? []).map(toProductFromSummary);

  if (search.trim()) {
    const q = search.toLowerCase().trim();
    all = all.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q),
    );
  }
  if (sort === "price-asc") all.sort((a, b) => a.priceRaw - b.priceRaw);
  else if (sort === "price-desc") all.sort((a, b) => b.priceRaw - a.priceRaw);
  else if (sort === "name") all.sort((a, b) => a.name.localeCompare(b.name, "vi"));

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

export function useProducts(params: ProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await apiFetch<ApiCategoryListData>("/api/v1/categories");
      return data?.items ?? [];
    },
    staleTime: 5 * 60_000,
  });
}
