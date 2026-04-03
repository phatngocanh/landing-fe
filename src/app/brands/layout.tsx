import type { Metadata } from "next";

const BASE_URL = "https://phatngocanh.com";

export const metadata: Metadata = {
  title: "Thương Hiệu ZIFAT999 & SIFA999 — So Sánh & Chọn Sản Phẩm Phù Hợp",
  description:
    "So sánh hai thương hiệu hóa phẩm hàng đầu của Phát Ngọc Anh: ZIFAT999 (tẩy rửa công nghiệp đậm đặc) và SIFA999 (chăm sóc gia đình an toàn). Tìm sản phẩm phù hợp cho doanh nghiệp hoặc gia đình bạn.",
  alternates: {
    canonical: "/brands",
  },
  openGraph: {
    title: "Thương Hiệu ZIFAT999 & SIFA999 — Phát Ngọc Anh",
    description:
      "So sánh ZIFAT999 và SIFA999. Tẩy rửa công nghiệp hay chăm sóc gia đình — chọn thương hiệu phù hợp với nhu cầu của bạn.",
    url: "/brands",
    images: [{ url: "/phatngocanhlogo.jpg", width: 800, height: 800, alt: "Phát Ngọc Anh — ZIFAT999 & SIFA999" }],
  },
};

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Trang chủ",
                item: BASE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Thương hiệu",
                item: `${BASE_URL}/brands`,
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Brand",
              name: "ZIFAT999",
              description:
                "Giải pháp tẩy rửa công nghiệp đậm đặc, mạnh mẽ cho nhà máy, xưởng sản xuất và doanh nghiệp.",
              url: `${BASE_URL}/zifat999`,
              logo: `${BASE_URL}/zifat999.png`,
              parentOrganization: {
                "@type": "Organization",
                name: "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "Brand",
              name: "SIFA999",
              description:
                "Sản phẩm chăm sóc gia đình an toàn, dịu nhẹ, kiểm nghiệm da liễu, thân thiện môi trường.",
              url: `${BASE_URL}/sifa999`,
              logo: `${BASE_URL}/sifa999.png`,
              parentOrganization: {
                "@type": "Organization",
                name: "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh",
              },
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
