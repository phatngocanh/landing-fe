import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { adminListProducts, adminGetProduct } from "@/lib/api/admin-server";
import { getCategories } from "@/lib/api/server";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();

  // No "GET admin product by ID" endpoint; resolve id → slug via the list, then
  // fetch the detail by slug. Catalog is small so this is cheap.
  const list = await adminListProducts();
  const summary = list?.items.find((i) => i.id === numericId);
  if (!summary) notFound();

  const [detail, categories] = await Promise.all([
    adminGetProduct(summary.slug),
    getCategories(),
  ]);
  if (!detail) notFound();

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
