import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProductsSection from "@/components/ProductsSection";
import NewsSection from "@/components/NewsSection";
import PartnersSection from "@/components/PartnersSection";
import SiteFooter from "@/components/SiteFooter";
import FloatingActions from "@/components/FloatingActions";

export const metadata: Metadata = {
  title: "Hóa Phẩm Phát Ngọc Anh – ZIFAT 999 | Trang Chủ",
  description:
    "Công Ty TNHH Hóa Phẩm Phát Ngọc Anh – thương hiệu ZIFAT 999. Hơn 50 sản phẩm tẩy rửa, vệ sinh nhà cửa, chăm sóc xe chất lượng cao.",
  alternates: { canonical: "/" },
};

const Index = () => {
  return (
    <div className="scroll-smooth">
      <SiteHeader />
      <SiteNav />
      <HeroSection />
      <TrustBadges />

      <main id="main-content" className="container py-12 md:py-20">
        <div className="space-y-16 md:space-y-28">
          <AboutSection />
          <ProcessSection />
          <ProductsSection />
          <TestimonialsSection />
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
