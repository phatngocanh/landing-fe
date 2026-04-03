import { useQuery } from "@tanstack/react-query";
import { products, type Product, type Category, type Brand } from "@/data/products";

export interface ProductsParams {
  category?: Category | "Tất cả";
  search?: string;
  sort?: "default" | "price-asc" | "price-desc" | "name";
  page?: number;
  pageSize?: number;
  brand?: Brand | "all";
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchProducts(params: ProductsParams): Promise<ProductsResponse> {
  await delay(350);

  const {
    category = "Tất cả",
    search = "",
    sort = "default",
    page = 1,
    pageSize = 12,
    brand = "all",
  } = params;

  let filtered = [...products];

  if (brand && brand !== "all") {
    filtered = filtered.filter((p) => p.brand === brand);
  }

  if (category && category !== "Tất cả") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.priceRaw - b.priceRaw);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.priceRaw - a.priceRaw);
  } else if (sort === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name, "vi"));
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return { data, total, page: safePage, pageSize, totalPages };
}

async function fetchProductById(id: string): Promise<Product | null> {
  await delay(200);
  return products.find((p) => p.id === id) ?? null;
}

export function useProducts(params: ProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    staleTime: 60_000,
    enabled: !!id,
  });
}
