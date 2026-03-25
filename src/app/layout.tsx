import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "PHÁT NGỌC ANH | Hóa Phẩm Chất Lượng Cao - ZIFAT 999",
  description: "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh - Thương hiệu Zifat 999, sản phẩm tẩy rửa chất lượng cao cho gia đình Việt",
  openGraph: {
    title: "PHÁT NGỌC ANH | Hóa Phẩm Chất Lượng Cao - ZIFAT 999",
    description: "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh - Thương hiệu Zifat 999, sản phẩm tẩy rửa chất lượng cao cho gia đình Việt",
    type: "website",
    url: "https://pna-test.lovable.app/",
    images: [{
      url: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/87c9bdc9-4d20-4278-9b4b-3e17267fce01/id-preview-9370c030--701cd2fc-c1fa-4c6a-aeee-72ee4af73196.lovable.app-1774368676052.png"
    }]
  },
  twitter: {
    card: "summary_large_image",
    site: "@Lovable",
    title: "PHÁT NGỌC ANH | Hóa Phẩm Chất Lượng Cao - ZIFAT 999",
    description: "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh - Thương hiệu Zifat 999, sản phẩm tẩy rửa chất lượng cao cho gia đình Việt",
    images: ["https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/87c9bdc9-4d20-4278-9b4b-3e17267fce01/id-preview-9370c030--701cd2fc-c1fa-4c6a-aeee-72ee4af73196.lovable.app-1774368676052.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          {children}
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh",
              "url": "https://pna-test.lovable.app",
              "logo": "https://pna-test.lovable.app/favicon.ico",
              "description": "Thương hiệu Zifat 999 - Sản phẩm tẩy rửa chất lượng cao cho gia đình Việt",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "430/33 Đường TA 28, P. Thới An",
                "addressLocality": "Quận 12",
                "addressRegion": "TP. Hồ Chí Minh",
                "addressCountry": "VN"
              },
              "telephone": "+84-28-6271-3214",
              "email": "hoaphamphatngocanh@gmail.com"
            })
          }}
        />
      </body>
    </html>
  );
}
