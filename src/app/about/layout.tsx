import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về Chúng Tôi",
  description:
    "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh — hơn 10 năm đồng hành cùng gia đình và doanh nghiệp Việt với hai thương hiệu ZIFAT999 (tẩy rửa công nghiệp) và SIFA999 (chăm sóc gia đình). Tầm nhìn, sứ mệnh và thành tích nổi bật.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Về Chúng Tôi | Phát Ngọc Anh — ZIFAT999 & SIFA999",
    description:
      "Hơn 10 năm xây dựng thương hiệu ZIFAT999 & SIFA999 — giải pháp hóa phẩm an toàn, hiệu quả, giá cạnh tranh cho hơn 64 tỉnh thành.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
