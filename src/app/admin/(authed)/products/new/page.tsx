import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { getCategories } from "@/lib/api/server";

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <div className="p-8 space-y-6 max-w-6xl">
      <Link href="/admin/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Sản phẩm
      </Link>
      <h1 className="text-2xl font-black">Tạo sản phẩm</h1>
      <ProductForm
        mode="create"
        categories={categories}
        initial={{
          name: "",
          slug: "",
          categoryId: null,
          priceText: "Liên hệ",
          priceRaw: null,
          descriptionHtml: "",
          status: "active",
          seoTitle: "",
          seoDescription: "",
          sourceUrl: "",
          images: [],
        }}
      />
    </div>
  );
}
