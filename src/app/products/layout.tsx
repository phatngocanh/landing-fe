import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tất Cả Sản Phẩm",
  description:
    "Khám phá hơn 50 sản phẩm hóa phẩm ZIFAT 999: nước rửa chén, nước lau sàn, nước giặt, tẩy rửa công nghiệp, chăm sóc xe, thông cống và diệt côn trùng. Chất lượng cao, giá cạnh tranh.",
  openGraph: {
    title: "Tất Cả Sản Phẩm | Phát Ngọc Anh – ZIFAT 999",
    description:
      "Khám phá hơn 50 sản phẩm hóa phẩm ZIFAT 999 – giải pháp vệ sinh toàn diện cho gia đình và doanh nghiệp.",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
