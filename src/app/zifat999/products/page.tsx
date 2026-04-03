"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import BrandProductsGrid from "@/components/BrandProductsGrid";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });
const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false });

export default function Zifat999ProductsPage() {
  return (
    <div className="scroll-smooth">
      <SiteHeader />
      <SiteNav />

      <div className="bg-muted/50 border-b border-border">
        <div className="container py-3 md:py-4">
          <nav className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/zifat999" className="hover:text-primary transition-colors font-medium">ZIFAT999</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-foreground font-semibold">Sản phẩm</span>
          </nav>
        </div>
      </div>

      <Suspense>
        <BrandProductsGrid brand="ZIFAT999" brandColor="blue" />
      </Suspense>

      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
