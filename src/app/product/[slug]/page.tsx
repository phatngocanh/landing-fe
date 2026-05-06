import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import JsonLd from "@/components/seo/JsonLd";
import { getCategories, getProductBySlug, getRelatedProducts } from "@/lib/api/server";
import ProductDetailView from "./ProductDetailView";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"));
const FloatingActions = dynamic(() => import("@/components/FloatingActions"));

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://phatngocanh.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Sản Phẩm Không Tìm Thấy",
      description: "Sản phẩm này không tồn tại hoặc đã được xóa.",
      robots: { index: false, follow: false },
    };
  }

  const description =
    product.description?.slice(0, 200) ||
    `${product.name} – ${product.category}. Thương hiệu ZIFAT 999 – Phát Ngọc Anh.`;
  const ogImage = product.img && product.img.startsWith("http") ? product.img : undefined;
  const title = product.seoTitle || product.name;

  return {
    title,
    description: product.seoDescription || description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} | Phát Ngọc Anh – ZIFAT 999`,
      description,
      type: "website",
      url: `/product/${product.slug}`,
      images: ogImage ? [ogImage] : undefined,
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const [product, related, categories] = await Promise.all([
    getProductBySlug(slug),
    getRelatedProducts(slug, 4),
    getCategories(),
  ]);

  if (!product) notFound();

  const url = `${SITE_URL}/product/${product.slug}`;
  const offerAvailability = product.inStock
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";
  const productImages = product.images
    .map((src) => (src.startsWith("http") ? src : `${SITE_URL}${src}`))
    .filter(Boolean);

  const productSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.seoDescription || product.name,
    sku: product.sku,
    brand: { "@type": "Brand", name: "ZIFAT 999" },
    image: productImages.length > 0 ? productImages : undefined,
    url,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "VND",
      price: product.priceRaw > 0 ? product.priceRaw : undefined,
      availability: offerAvailability,
      seller: { "@type": "Organization", name: "Phát Ngọc Anh" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      ...(product.categorySlug
        ? [{
            "@type": "ListItem",
            position: 2,
            name: product.category,
            item: `${SITE_URL}/products?category=${encodeURIComponent(product.categorySlug)}`,
          }]
        : []),
      {
        "@type": "ListItem",
        position: product.categorySlug ? 3 : 2,
        name: product.name,
        item: url,
      },
    ],
  };

  return (
    <div className="scroll-smooth">
      <SiteHeader />
      <SiteNav categories={categories} />
      <ProductDetailView product={product} related={related} />
      <SiteFooter />
      <FloatingActions />
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
    </div>
  );
}
