import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import AboutSection from "@/components/AboutSection";
import BrandHighlightSection from "@/components/BrandHighlightSection";
import ProductsSection from "@/components/ProductsSection";
import NewsSection from "@/components/NewsSection";
import PartnersSection from "@/components/PartnersSection";
import ProcessSection from "@/components/ProcessSection";
import SiteFooter from "@/components/SiteFooter";
import FloatingActions from "@/components/FloatingActions";

const BASE_URL = "https://phatngocanh.com";

export const metadata: Metadata = {
  title: "Hóa Phẩm Phát Ngọc Anh | ZIFAT999 & SIFA999 cho công nghiệp và gia đình",
  description:
    "Khám phá hai thương hiệu chủ lực của Phát Ngọc Anh: ZIFAT999 cho giải pháp tẩy rửa công nghiệp và SIFA999 cho chăm sóc gia đình an toàn, chất lượng cao.",
  alternates: {
    canonical: "/",
  },
};

const Index = () => {
  return (
    <div className="scroll-smooth">
      <SiteHeader />
      <SiteNav />
      <HeroSection />
      <TrustBadges />
      <Script
        id="home-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Hóa Phẩm Phát Ngọc Anh",
            url: BASE_URL,
            description:
              "Trang giới thiệu chính thức của Phát Ngọc Anh với hai thương hiệu ZIFAT999 và SIFA999.",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "ZIFAT999",
                  url: `${BASE_URL}/zifat999`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "SIFA999",
                  url: `${BASE_URL}/sifa999`,
                },
              ],
            },
          }),
        }}
      />

      <main id="main-content" className="container py-12 md:py-20">
        <div className="space-y-16 md:space-y-28">
          <AboutSection />
          <ProcessSection />
          <BrandHighlightSection />
          <ProductsSection />
          <NewsSection />
        </div>
      </main>

      <PartnersSection />
      <SiteFooter />
      <FloatingActions />
    </div>
  );
};

export default Index;
