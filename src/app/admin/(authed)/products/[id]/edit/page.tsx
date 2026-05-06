"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { adminListProducts, adminGetProduct } from "@/lib/api/admin-client";
import type { ApiProductDetail } from "@/lib/api/types";
import type { CategoryDTO } from "@/lib/api/server";
import { getApiUrl } from "@/lib/api/runtime-config";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: Props) {
  const { id } = use(params);
  const numericId = Number(id);
  const [detail, setDetail] = useState<ApiProductDetail | null>(null);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    if (!Number.isFinite(numericId)) {
      setStatus("missing");
      return;
    }
    (async () => {
      const list = await adminListProducts();
      const summary = list?.items.find((i) => i.id === numericId);
      if (!summary) {
        setStatus("missing");
        return;
      }
      const base = getApiUrl().replace(/\/?$/, "/");
      const [d, catsEnv] = await Promise.all([
        adminGetProduct(summary.slug),
        fetch(new URL("api/v1/categories", base)).then((r) => r.json()).catch(() => null),
      ]);
      if (!d) {
        setStatus("missing");
        return;
      }
      setDetail(d);
      setCategories((catsEnv?.success && catsEnv.data?.items) || []);
      setStatus("ready");
    })();
  }, [numericId]);

  if (status === "missing") notFound();
  if (status === "loading" || !detail) {
    return <div className="p-8 text-sm text-muted-foreground">Đang tải...</div>;
  }

  return (
    <div className="p-8 space-y-6 max-w-6xl">
      <Link href="/admin/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Sản phẩm
      </Link>
      <div>
        <h1 className="text-2xl font-black">{detail.name}</h1>
        <p className="text-sm text-muted-foreground mt-1 font-mono">{detail.slug}</p>
      </div>
      <ProductForm
        mode="edit"
        categories={categories}
        initial={{
          id: detail.id,
          name: detail.name,
          slug: detail.slug,
          categoryId: detail.category?.id ?? null,
          priceText: detail.priceText,
          priceRaw: detail.priceRaw,
          descriptionHtml: detail.descriptionHtml,
          status: detail.status,
          seoTitle: detail.seoTitle,
          seoDescription: detail.seoDescription,
          sourceUrl: detail.sourceUrl,
          images: detail.images.map((i) => ({ url: i.url, alt: i.alt, isPrimary: i.isPrimary })),
        }}
      />
    </div>
  );
}
