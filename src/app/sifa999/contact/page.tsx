"use client";

import Link from "next/link";
import { ChevronRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });
const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false });

export default function Sifa999ContactPage() {
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
            <span className="text-foreground font-semibold">Liên hệ</span>
          </nav>
        </div>
      </div>
      <main className="container py-10 md:py-16">
        <h1 className="text-2xl md:text-4xl font-black text-foreground mb-4">Liên Hệ SIFA999</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">Đội ngũ SIFA999 luôn sẵn sàng tư vấn và hỗ trợ bạn tìm sản phẩm chăm sóc gia đình phù hợp nhất.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="space-y-6">
            {[
              { icon: Phone, label: "Hotline", value: "0286.271.3214", href: "tel:02862713214" },
              { icon: Mail, label: "Email", value: "hoaphamphatngocanh@gmail.com", href: "mailto:hoaphamphatngocanh@gmail.com" },
              { icon: MapPin, label: "Địa chỉ", value: "430/33 Đường TA 28, KP 2, P. Thới An, Q. 12, TP.HCM" },
              { icon: Clock, label: "Giờ làm việc", value: "Thứ 2 - Thứ 7: 8:00 - 18:00" },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-bold text-foreground hover:text-green-600 transition-colors">{value}</a>
                  ) : (
                    <p className="text-sm font-bold text-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h2 className="font-black text-foreground text-lg mb-6">Gửi Yêu Cầu Tư Vấn</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Họ tên</label>
                <input className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30" placeholder="Nhập họ tên..." />
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Số điện thoại</label>
                <input className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30" placeholder="Nhập SĐT..." />
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Nội dung</label>
                <textarea rows={4} className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30 resize-none" placeholder="Mô tả nhu cầu của bạn..." />
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all">
                Gửi yêu cầu
              </button>
            </form>
          </div>
        </div>
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
