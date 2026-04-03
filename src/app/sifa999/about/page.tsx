"use client";

import Link from "next/link";
import { ChevronRight, Shield, Heart, Leaf, Users } from "lucide-react";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });
const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false });

export default function Sifa999AboutPage() {
  return (
    <div className="scroll-smooth">
      <SiteHeader />
      <SiteNav />
      <div className="bg-muted/50 border-b border-border">
        <div className="container py-3 md:py-4">
          <nav className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/sifa999" className="hover:text-primary transition-colors font-medium">SIFA999</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-foreground font-semibold">Giới thiệu</span>
          </nav>
        </div>
      </div>
      <main className="container py-10 md:py-16">
        <h1 className="text-2xl md:text-4xl font-black text-foreground mb-6">Về Thương Hiệu SIFA999</h1>
        <div className="prose prose-sm md:prose-base max-w-3xl text-muted-foreground space-y-4 mb-12">
          <p>SIFA999 ra đời từ niềm tin rằng sản phẩm chăm sóc gia đình phải vừa hiệu quả VỪA an toàn. Chúng tôi tập trung vào công thức dịu nhẹ, đã được kiểm nghiệm da liễu, mang đến kết quả mà không ảnh hưởng đến sức khỏe gia đình hay môi trường.</p>
          <p>Với hơn 500.000 gia đình Việt tin dùng, SIFA999 là minh chứng cho cam kết về an toàn, chất lượng và trách nhiệm với cộng đồng. Mọi sản phẩm đều được sản xuất tại nhà máy đạt chuẩn GMP với quy trình kiểm soát chất lượng ISO 9001:2015.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {[
            { icon: Heart, value: "500K+", label: "Gia đình tin dùng" },
            { icon: Users, value: "20+", label: "Sản phẩm" },
            { icon: Leaf, value: "100%", label: "Phân hủy sinh học" },
            { icon: Shield, value: "GMP", label: "Nhà máy đạt chuẩn" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-5 text-center">
              <Icon className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-xl font-black text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
        <Link href="/sifa999" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:brightness-110 transition-all">
          ← Về trang SIFA999
        </Link>
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
