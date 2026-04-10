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

const SITE_NAME = "Phát Ngọc Anh – ZIFAT 999";
const BASE_URL = "https://phatngocanh.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Hóa Phẩm Phát Ngọc Anh – ZIFAT 999 | Chất Lượng Việt Cho Người Việt",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh – thương hiệu ZIFAT 999. Hơn 50 sản phẩm tẩy rửa, vệ sinh nhà cửa, chăm sóc xe chất lượng cao, giá cạnh tranh, phân phối toàn quốc.",
  keywords: [
    "hóa phẩm",
    "ZIFAT 999",
    "nước tẩy rửa",
    "nước rửa chén",
    "nước lau sàn",
    "thông cống",
    "Phát Ngọc Anh",
    "hóa phẩm Việt Nam",
    "chăm sóc xe",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: "Hóa Phẩm Phát Ngọc Anh – ZIFAT 999 | Chất Lượng Việt Cho Người Việt",
    description:
      "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh – thương hiệu ZIFAT 999. Hơn 50 sản phẩm tẩy rửa chất lượng cao, phân phối 64 tỉnh thành.",
    images: [{ url: "/phatngocanhlogo.jpg", width: 800, height: 800, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hóa Phẩm Phát Ngọc Anh – ZIFAT 999",
    description:
      "Hơn 50 sản phẩm tẩy rửa chất lượng cao thương hiệu ZIFAT 999, phân phối toàn quốc.",
    images: ["/phatngocanhlogo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className={`${inter.className} overflow-x-clip`}>
        <Providers>
          <MobileMenuProvider>
            <MobileDrawer />
            <div id="page-wrap" className="relative min-h-dvh">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:z-[999] focus:top-2 focus:left-2 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold"
              >
                Chuyển đến nội dung chính
              </a>
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
              alternateName: "ZIFAT 999",
              url: BASE_URL,
              logo: `${BASE_URL}/phatngocanhlogo.jpg`,
              description:
                "Thương hiệu ZIFAT 999 – sản phẩm tẩy rửa chất lượng cao cho gia đình Việt",
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
