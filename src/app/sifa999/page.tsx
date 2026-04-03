import type { Metadata } from "next";
import Sifa999Content from "./Sifa999Content";

export const metadata: Metadata = {
  title: "SIFA999 — Sản Phẩm Chăm Sóc Gia Đình An Toàn",
  description:
    "SIFA999 — thương hiệu chăm sóc gia đình an toàn, dịu nhẹ của Phát Ngọc Anh. Kiểm nghiệm da liễu, phân hủy sinh học, phù hợp cho trẻ em và da nhạy cảm.",
  alternates: {
    canonical: "/sifa999",
  },
  openGraph: {
    title: "SIFA999 — Chăm Sóc Gia Đình An Toàn",
    description:
      "Thương hiệu chăm sóc gia đình hàng đầu của Phát Ngọc Anh. Dịu nhẹ, an toàn, thân thiện môi trường.",
    url: "/sifa999",
    images: [{ url: "/sifa999.png", width: 400, height: 400, alt: "SIFA999 Logo" }],
  },
};

export default function Sifa999Page() {
  return <Sifa999Content />;
}
