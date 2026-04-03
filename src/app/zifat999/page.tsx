"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, ChevronRight, Shield, Factory, Award, Star, Phone, Handshake } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import ScrollReveal from "@/components/ScrollReveal";
import BrandLogo from "@/components/BrandLogo";
import { getProductsByBrand } from "@/data/products";
import heroBanner from "@/assets/hero-banner.jpg";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });
const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false });

const categories = [
  { name: "Vệ sinh nhà cửa", desc: "Sạch khuẩn, khử mùi cho mọi bề mặt" },
  { name: "Tẩy rửa công nghiệp", desc: "Đậm đặc, mạnh mẽ cho nhà máy" },
  { name: "Nước giặt & xả", desc: "Bảo vệ vải, giữ hương thơm lâu" },
  { name: "Nước rửa chén", desc: "Sạch dầu mỡ, an toàn cho tay" },
  { name: "Chăm sóc xe", desc: "Bóng sáng, bảo vệ xe toàn diện" },
  { name: "Thông cống & WC", desc: "Thông tắc nhanh, khử mùi triệt để" },
  { name: "Diệt côn trùng", desc: "Tiêu diệt gián, muỗi, mối hiệu quả" },
];

const testimonials = [
  { name: "Anh Tuấn", title: "Quản lý nhà máy", quote: "ZIFAT999 là đối tác tin cậy của chúng tôi suốt 5 năm. Chất lượng ổn định, giá cả hợp lý cho đơn hàng lớn.", rating: 5 },
  { name: "Chị Nga", title: "Chủ chuỗi rửa xe", quote: "Nước rửa xe bọt tuyết ZIFAT999 là sản phẩm bán chạy nhất tại chuỗi của tôi. Khách hàng rất hài lòng.", rating: 5 },
  { name: "Anh Dũng", title: "Giám đốc vệ sinh công nghiệp", quote: "Chất tẩy dầu công nghiệp cực kỳ hiệu quả, tiết kiệm chi phí vận hành cho doanh nghiệp.", rating: 5 },
];

export default function Zifat999Page() {
  const featuredProducts = getProductsByBrand("ZIFAT999").filter(p => p.badge).slice(0, 4);

  return (
    <div className="scroll-smooth">
      <SiteHeader />
      <SiteNav />

      <div className="bg-muted/50 border-b border-border">
        <div className="container py-3 md:py-4">
          <nav className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/brands" className="hover:text-primary transition-colors font-medium">Thương hiệu</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-foreground font-semibold">ZIFAT999</span>
          </nav>
        </div>
      </div>

      <section className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroBanner} alt="ZIFAT999" fill className="object-cover opacity-30" />
        </div>
        <div className="relative container py-16 md:py-24">
          <div className="mb-5 flex items-center gap-4">
            <BrandLogo brand="ZIFAT999" size="lg" className="border-blue-200/70 bg-white/95 ring-blue-200" />
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest">
              ZIFAT999
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight" data-testid="text-zifat999-title">
            Giải Pháp Tẩy Rửa<br />Công Nghiệp Hàng Đầu
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-xl mb-8">
            Hiệu suất chuyên nghiệp cho mọi nhu cầu vệ sinh công nghiệp. Được tin dùng bởi hàng ngàn doanh nghiệp trên toàn quốc.
          </p>
          <Link
            href="/zifat999/products"
            data-testid="link-zifat999-products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:brightness-110 transition-all shadow-xl"
          >
            Xem Sản Phẩm ZIFAT999
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <main className="container py-10 md:py-20">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-24">
            {[
              { icon: Factory, title: "Công Nghiệp Chuyên Dụng", desc: "Công thức đậm đặc dành riêng cho nhà máy, xưởng sản xuất và doanh nghiệp lớn." },
              { icon: Shield, title: "Chất Lượng Đảm Bảo", desc: "Đạt chứng nhận HVNCLC và ISO 9001:2015. Quy trình sản xuất nghiêm ngặt." },
              { icon: Award, title: "12+ Năm Kinh Nghiệm", desc: "Thương hiệu uy tín với hơn 12 năm phục vụ thị trường Việt Nam." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-black text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-blue-600 mb-8">
              Danh Mục Sản Phẩm
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/zifat999/products?category=${encodeURIComponent(cat.name)}`}
                  className="bg-card border border-border rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-blue-400 hover:shadow-md transition-all group"
                >
                  <h3 className="text-sm md:text-base font-bold text-foreground group-hover:text-blue-600 transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{cat.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-8">
              <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-blue-600">
                Sản Phẩm Nổi Bật
              </h2>
              <Link href="/zifat999/products" className="text-[13px] text-muted-foreground font-bold hover:text-blue-600 transition-all flex items-center gap-1.5 group">
                Tất cả <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {featuredProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} data-testid={`product-card-${p.id}`} className="bg-card border border-border p-3 md:p-5 rounded-xl md:rounded-2xl text-center group hover:border-blue-400 hover:shadow-md transition-all">
                  {p.badge && (
                    <div className="text-[8px] md:text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full w-fit mx-auto mb-2">{p.badge}</div>
                  )}
                  <div className="aspect-square bg-muted rounded-lg md:rounded-xl p-3 mb-3 flex items-center justify-center overflow-hidden">
                    <Image src={p.img} alt={p.name} width={200} height={200} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" placeholder="blur" />
                  </div>
                  <h3 className="text-[11px] md:text-sm font-bold text-foreground line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                  <p className="text-blue-600 font-black text-sm md:text-base">{p.price}</p>
                  {p.isBulkAvailable && p.bulkPriceTiers[0] && (
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Sỉ từ {p.bulkPriceTiers[0].minQuantity}+: {p.bulkPriceTiers[0].price.toLocaleString("vi-VN")}đ
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-blue-600 mb-8">
              Khách Hàng Nói Gì
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-card border border-border rounded-2xl p-5 md:p-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">&quot;{t.quote}&quot;</p>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-blue-900 text-white rounded-2xl md:rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Handshake className="w-8 h-8 text-blue-300" />
                <h3 className="text-xl md:text-2xl font-black">Trở Thành Đối Tác Phân Phối</h3>
              </div>
              <p className="text-blue-200 text-sm md:text-base max-w-lg">
                Tham gia mạng lưới phân phối ZIFAT999 với chính sách hấp dẫn, hỗ trợ marketing toàn diện.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/zifat999/contact" className="bg-blue-600 text-white px-6 md:px-8 py-3 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg">
                Liên hệ ngay
              </Link>
              <a href="tel:02862713214" className="flex items-center gap-2 border border-blue-400 text-blue-200 px-6 py-3 rounded-full font-bold text-sm hover:bg-blue-800 transition-all">
                <Phone className="w-4 h-4" /> Gọi tư vấn
              </a>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
