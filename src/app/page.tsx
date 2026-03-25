"use client";

import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";

const AboutSection = dynamic(() => import("@/components/AboutSection"), { ssr: false });
const ComboSection = dynamic(() => import("@/components/ComboSection"), { ssr: false });
const ProductsSection = dynamic(() => import("@/components/ProductsSection"), { ssr: false });
const NewsSection = dynamic(() => import("@/components/NewsSection"), { ssr: false });
const PartnersSection = dynamic(() => import("@/components/PartnersSection"), { ssr: false });
const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });
const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false });

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
