import type { Metadata } from "next";
import { getProductById } from "@/data/products";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Sản Phẩm Không Tìm Thấy",
      description: "Sản phẩm này không tồn tại hoặc đã được xóa.",
    };
  }

  const description = `${product.description?.slice(0, 140) ?? product.name} – ${product.category}. Giá ${product.price}. Thương hiệu ZIFAT 999 – Phát Ngọc Anh.`;

  return {
    title: product.name,
    description,
    openGraph: {
      title: `${product.name} | Phát Ngọc Anh – ZIFAT 999`,
      description,
    },
  };
}

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
