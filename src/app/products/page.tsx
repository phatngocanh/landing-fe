import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getCategories, listProducts } from "@/lib/api/server";
import {
  applyProductFilters,
  PAGE_SIZE_DEFAULT,
  type ProductsParams,
} from "@/lib/api/product-filters";
import ProductsView from "./ProductsView";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"));
const FloatingActions = dynamic(() => import("@/components/FloatingActions"));

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://phatngocanh.com";

// Soft fallback; `revalidateTag("products"|"categories")` from /api/revalidate
// is the primary cache-busting mechanism after an admin write.
export const revalidate = 300;

interface PageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
    q?: string;
    sort?: string;
  }>;
}

function normalizeSort(s: string | undefined): ProductsParams["sort"] {
  return s === "price-asc" || s === "price-desc" || s === "name" ? s : "default";
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const categories = await getCategories();
  const cat = sp.category ? categories.find((c) => c.slug === sp.category) : null;

  const title = cat
    ? `${cat.name} – Sản Phẩm ZIFAT 999`
    : "Sản Phẩm Hóa Phẩm – ZIFAT 999";
  const description = cat
    ? `Khám phá sản phẩm ${cat.name} thương hiệu ZIFAT 999 từ Công Ty TNHH Hóa Phẩm Phát Ngọc Anh. Chất lượng cao, giá cạnh tranh, phân phối toàn quốc.`
    : "Toàn bộ sản phẩm hóa phẩm Phát Ngọc Anh – thương hiệu ZIFAT 999. Nước rửa chén, lau sàn, tẩy rửa, thông cống và nhiều hơn nữa.";
  const canonical = sp.category
    ? `/products?category=${encodeURIComponent(sp.category)}`
    : "/products";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: `${SITE_URL}${canonical}`,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const initialParams: ProductsParams = {
    category: sp.category ?? "",
    search: sp.q ?? "",
    sort: normalizeSort(sp.sort),
    page: Math.max(1, parseInt(sp.page ?? "1", 10) || 1),
    pageSize: PAGE_SIZE_DEFAULT,
  };

  const [categories, productsData] = await Promise.all([
    getCategories(),
    listProducts({
      categorySlug:
        initialParams.category && initialParams.category !== "all"
          ? initialParams.category
          : undefined,
      pageSize: 100,
    }),
  ]);

  const initialData = applyProductFilters(productsData.items, initialParams);

  return (
    <div className="scroll-smooth">
      <ProductsView
        categories={categories}
        initialParams={initialParams}
        initialData={initialData}
      />
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
