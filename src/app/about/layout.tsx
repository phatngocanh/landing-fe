import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về Chúng Tôi",
  description:
    "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh thành lập năm 2012, hơn 10 năm đồng hành cùng gia đình Việt với thương hiệu ZIFAT 999. Tầm nhìn, sứ mệnh và thành tích nổi bật.",
  openGraph: {
    title: "Về Chúng Tôi | Phát Ngọc Anh – ZIFAT 999",
    description:
      "Hơn 10 năm xây dựng thương hiệu ZIFAT 999 – giải pháp hóa phẩm an toàn, hiệu quả, giá cạnh tranh cho hơn 64 tỉnh thành.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
