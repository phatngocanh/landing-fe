import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import AboutSection from "@/components/AboutSection";
import ComboSection from "@/components/ComboSection";
import ProductsSection from "@/components/ProductsSection";
import NewsSection from "@/components/NewsSection";
import PartnersSection from "@/components/PartnersSection";
import SiteFooter from "@/components/SiteFooter";
import FloatingActions from "@/components/FloatingActions";

const Index = () => {
  return (
    <div className="scroll-smooth">
      <SiteHeader />
      <SiteNav />
      <HeroSection />
      <TrustBadges />

      <main className="container py-10 md:py-20">
        <div className="space-y-12 md:space-y-24">
          <AboutSection />
          <ComboSection />
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
