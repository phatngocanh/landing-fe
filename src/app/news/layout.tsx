import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin Tức & Kiến Thức",
  description:
    "Tin tức mới nhất từ Công Ty TNHH Hóa Phẩm Phát Ngọc Anh – ZIFAT 999. Bí quyết vệ sinh, kiến thức hóa phẩm, khuyến mãi và hoạt động doanh nghiệp.",
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
