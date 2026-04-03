"use client";

import Link from "next/link";
import { ChevronRight, Shield, Award, Factory, Users } from "lucide-react";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });
const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false });

export default function Zifat999AboutPage() {
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
            <span className="text-foreground font-semibold">Giới thiệu</span>
          </nav>
        </div>
      </div>
      <main className="container py-10 md:py-16">
        <h1 className="text-2xl md:text-4xl font-black text-foreground mb-6">Về Thương Hiệu ZIFAT999</h1>
        <div className="prose prose-sm md:prose-base max-w-3xl text-muted-foreground space-y-4 mb-12">
          <p>ZIFAT999 là thương hiệu hàng đầu trong lĩnh vực tẩy rửa công nghiệp, được phát triển bởi Công Ty TNHH Hóa Phẩm Phát Ngọc Anh từ năm 2012. Với hơn 12 năm kinh nghiệm, ZIFAT999 đã trở thành lựa chọn tin cậy của hàng ngàn doanh nghiệp trên toàn quốc.</p>
          <p>Triết lý của ZIFAT999 là mang đến hiệu suất vượt trội, độ bền cao và giá thành cạnh tranh cho mọi nhu cầu vệ sinh công nghiệp. Từ nhà máy, xưởng sản xuất đến chuỗi dịch vụ vệ sinh chuyên nghiệp.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {[
            { icon: Factory, value: "50+", label: "Sản phẩm" },
            { icon: Users, value: "5.000+", label: "Đối tác B2B" },
            { icon: Award, value: "HVNCLC", label: "Chứng nhận" },
            { icon: Shield, value: "ISO 9001", label: "Tiêu chuẩn" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-5 text-center">
              <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-xl font-black text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
        <Link href="/zifat999" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:brightness-110 transition-all">
          ← Về trang ZIFAT999
        </Link>
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
