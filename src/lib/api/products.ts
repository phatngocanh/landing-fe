// React Query client hooks for /products interactive filtering.
// Server-side initial render lives in app/products/page.tsx; the search/sort/
// paging logic is shared via lib/api/product-filters.ts.
"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./client";
import {
  type ApiCategoryListData,
  type ApiProductListData,
  toProductFromSummary,
} from "./types";
import {
  type ProductsParams,
  type ProductsResponse,
  applyProductFilters,
} from "./product-filters";

export type { ProductsParams, ProductsResponse } from "./product-filters";

async function fetchProducts(params: ProductsParams): Promise<ProductsResponse> {
  // Fetch a generous page (BE max 100) so search/sort/paging happens
  // client-side without paging artifacts. Catalog is small (~36 items).
  const data = await apiFetch<ApiProductListData>("/api/v1/products", {
    query: {
      category: params.category && params.category !== "all" ? params.category : undefined,
      status: "active",
      page: 1,
      pageSize: 100,
    },
  });
  const items = (data?.items ?? []).map(toProductFromSummary);
  return applyProductFilters(items, params);
}

export function useProducts(params: ProductsParams, initialData?: ProductsResponse) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    placeholderData: (prev) => prev,
    staleTime: 60_000,
    initialData,
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
