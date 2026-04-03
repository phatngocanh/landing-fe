import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { MobileMenuProvider } from "@/context/MobileMenuContext";
import MobileDrawer from "@/components/MobileDrawer";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_NAME = "Phát Ngọc Anh — ZIFAT999 & SIFA999";
const BASE_URL = "https://phatngocanh.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Hóa Phẩm Phát Ngọc Anh — ZIFAT999 & SIFA999 | Chất Lượng Việt Cho Người Việt",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh — sở hữu hai thương hiệu ZIFAT999 (tẩy rửa công nghiệp) và SIFA999 (chăm sóc gia đình). Hơn 50 sản phẩm chất lượng cao, phân phối toàn quốc.",
  keywords: [
    "hóa phẩm",
    "ZIFAT999",
    "SIFA999",
    "nước tẩy rửa",
    "nước rửa chén",
    "nước lau sàn",
    "thông cống",
    "Phát Ngọc Anh",
    "hóa phẩm Việt Nam",
    "chăm sóc xe",
    "chăm sóc gia đình",
    "tẩy rửa công nghiệp",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: "Hóa Phẩm Phát Ngọc Anh — ZIFAT999 & SIFA999 | Chất Lượng Việt Cho Người Việt",
    description:
      "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh — sở hữu ZIFAT999 và SIFA999. Hơn 50 sản phẩm tẩy rửa và chăm sóc gia đình, phân phối 64 tỉnh thành.",
    images: [{ url: "/phatngocanhlogo.jpg", width: 800, height: 800, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hóa Phẩm Phát Ngọc Anh — ZIFAT999 & SIFA999",
    description:
      "Hơn 50 sản phẩm tẩy rửa và chăm sóc gia đình chất lượng cao, phân phối toàn quốc.",
    images: ["/phatngocanhlogo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={inter.variable} style={{ overflowX: "hidden" }}>
      <body className={inter.className} style={{ overflowX: "hidden" }}>
        <Providers>
          <MobileMenuProvider>
            <MobileDrawer />
            <div id="page-wrap" style={{ position: "relative", minHeight: "100vh" }}>
              {children}
            </div>
          </MobileMenuProvider>
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh",
              alternateName: ["ZIFAT999", "SIFA999"],
              url: BASE_URL,
              logo: `${BASE_URL}/phatngocanhlogo.jpg`,
              description:
                "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh — sở hữu thương hiệu ZIFAT999 (tẩy rửa công nghiệp) và SIFA999 (chăm sóc gia đình)",
              address: {
                "@type": "PostalAddress",
                streetAddress: "430/33 Đường TA 28, Khu phố 2, P. Thới An",
                addressLocality: "Quận 12",
                addressRegion: "TP. Hồ Chí Minh",
                addressCountry: "VN",
              },
              telephone: "+84-28-6271-3214",
              email: "hoaphamphatngocanh@gmail.com",
            }),
          }}
        />
      </body>
    </html>
  );
}
