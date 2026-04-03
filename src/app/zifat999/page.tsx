import type { Metadata } from "next";
import Zifat999Content from "./Zifat999Content";

export const metadata: Metadata = {
  title: "ZIFAT999 — Giải Pháp Tẩy Rửa Công Nghiệp Hàng Đầu",
  description:
    "ZIFAT999 — thương hiệu tẩy rửa công nghiệp đậm đặc, mạnh mẽ của Phát Ngọc Anh. Chuyên dụng cho nhà máy, xưởng sản xuất, doanh nghiệp. Đạt chuẩn ISO 9001 & HVNCLC.",
  alternates: {
    canonical: "/zifat999",
  },
  openGraph: {
    title: "ZIFAT999 — Giải Pháp Tẩy Rửa Công Nghiệp",
    description:
      "Thương hiệu tẩy rửa công nghiệp hàng đầu của Phát Ngọc Anh. Đậm đặc, hiệu quả, tiết kiệm cho doanh nghiệp.",
    url: "/zifat999",
    images: [{ url: "/zifat999.png", width: 400, height: 400, alt: "ZIFAT999 Logo" }],
  },
};

export default function Zifat999Page() {
  return <Zifat999Content />;
}
