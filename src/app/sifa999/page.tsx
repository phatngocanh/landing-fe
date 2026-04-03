"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, ChevronRight, Heart, Leaf, Users, Shield, Star, ShoppingBag, Handshake, Phone } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import ScrollReveal from "@/components/ScrollReveal";
import { getProductsByBrand } from "@/data/products";
import heroBanner from "@/assets/hero-banner.jpg";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });
const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false });

const categories = [
  { name: "Chăm sóc em bé", desc: "Dịu nhẹ, an toàn cho da nhạy cảm" },
  { name: "Chăm sóc cá nhân", desc: "Dưỡng ẩm, bảo vệ da hàng ngày" },
  { name: "Vệ sinh gia dụng", desc: "Sạch sẽ, an toàn cho cả nhà" },
  { name: "Nước giặt & xả", desc: "Mềm vải, thơm lâu, thân thiện" },
  { name: "Nước rửa chén", desc: "Sạch dầu mỡ, dưỡng da tay" },
  { name: "Vệ sinh nhà cửa", desc: "Hiệu quả mà dịu nhẹ" },
];

const safetyHighlights = [
  { icon: Shield, title: "Kiểm Nghiệm Da Liễu", desc: "Mọi sản phẩm SIFA999 đều được kiểm nghiệm an toàn cho da, kể cả da nhạy cảm của trẻ em." },
  { icon: Leaf, title: "Công Thức Sinh Học", desc: "Thành phần phân hủy sinh học, thân thiện với môi trường và an toàn cho hệ sinh thái." },
  { icon: Users, title: "Gia Đình Tin Dùng", desc: "Được hơn 500.000 gia đình Việt tin dùng hàng ngày cho vệ sinh và chăm sóc cá nhân." },
];

const useCases = [
  { title: "Buổi Sáng Tươi Mới", desc: "Sữa tắm và nước rửa tay SIFA999 cho buổi sáng tươi mới, dịu nhẹ cho cả gia đình." },
  { title: "Nhà Sạch An Toàn", desc: "Lau sàn, rửa chén với SIFA999 - sạch sẽ mà không lo hóa chất độc hại cho trẻ và thú cưng." },
  { title: "Chăm Sóc Bé Yêu", desc: "Dòng sản phẩm cho bé SIFA999 với pH 5.5, không kích ứng da, an toàn từ ngày đầu đời." },
  { title: "Vệ Sinh Hàng Ngày", desc: "Nước rửa tay kháng khuẩn và sản phẩm vệ sinh cá nhân bảo vệ gia đình mỗi ngày." },
];

const testimonials = [
  { name: "Nguyễn Thị Hương", title: "Mẹ 2 con", quote: "Tôi dùng SIFA999 cho con được 3 năm rồi. Tin tưởng vì sản phẩm dịu nhẹ mà hiệu quả, đúng như cam kết.", rating: 5 },
  { name: "Phạm Văn Minh", title: "Chủ quán cà phê", quote: "Sản phẩm vệ sinh SIFA999 an toàn cho khu vực chế biến thức ăn, nhân viên và khách hàng đều hài lòng.", rating: 5 },
  { name: "Lê Thị Linh", title: "Giáo viên", quote: "Nước rửa tay SIFA999 dùng cho lớp học rất yên tâm - an toàn cho các em nhỏ sử dụng hàng ngày.", rating: 5 },
  { name: "Trần Quốc Sơn", title: "Chủ cửa hàng bán lẻ", quote: "Sản phẩm SIFA999 bán rất chạy trong cửa hàng. Khách hàng trẻ đặc biệt thích dòng eco-friendly.", rating: 5 },
];

const certifications = [
  "GMP Certified - Nhà máy đạt chuẩn GMP",
  "ISO 9001:2015 - Hệ thống quản lý chất lượng",
  "Kiểm nghiệm da liễu - An toàn cho da nhạy cảm",
  "Phân hủy sinh học - Đạt tiêu chuẩn OECD 301",
  "An toàn cho trẻ em - Không chứa hóa chất độc hại",
];

export default function Sifa999Page() {
  const featuredProducts = getProductsByBrand("SIFA999").slice(0, 4);

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
            <span className="text-foreground font-semibold">SIFA999</span>
          </nav>
        </div>
      </div>

      <section className="relative bg-green-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroBanner} alt="SIFA999" fill className="object-cover opacity-20" />
        </div>
        <div className="relative container py-16 md:py-24">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-green-600 text-white text-[11px] font-black uppercase tracking-widest">
            SIFA999
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight" data-testid="text-sifa999-title">
            An Toàn, Tin Cậy<br />Cho Mọi Gia Đình
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-xl mb-8">
            Giải pháp hóa phẩm cao cấp được thiết kế đặc biệt cho sự an toàn của gia đình và trách nhiệm với môi trường.
          </p>
          <Link
            href="/sifa999/products"
            data-testid="link-sifa999-products"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:brightness-110 transition-all shadow-xl"
          >
            Xem Sản Phẩm SIFA999
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <main className="container py-10 md:py-20">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              SIFA999 ra đời từ niềm tin: sản phẩm chăm sóc gia đình phải vừa hiệu quả VỪA an toàn. Chúng tôi tập trung vào công thức dịu nhẹ, đạt kết quả mà không ảnh hưởng đến sức khỏe hay môi trường.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-24">
            {safetyHighlights.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-black text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-green-600 mb-8">
              Danh Mục Sản Phẩm
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/sifa999/products?category=${encodeURIComponent(cat.name)}`}
                  className="bg-card border border-border rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-green-400 hover:shadow-md transition-all group"
                >
                  <h3 className="text-sm md:text-base font-bold text-foreground group-hover:text-green-600 transition-colors mb-1">
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
              <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-green-600">
                Sản Phẩm Nổi Bật
              </h2>
              <Link href="/sifa999/products" className="text-[13px] text-muted-foreground font-bold hover:text-green-600 transition-all flex items-center gap-1.5 group">
                Tất cả <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {featuredProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} data-testid={`product-card-${p.id}`} className="bg-card border border-border p-3 md:p-5 rounded-xl md:rounded-2xl text-center group hover:border-green-400 hover:shadow-md transition-all">
                  {p.badge && (
                    <div className="text-[8px] md:text-[10px] font-black bg-green-600 text-white px-2 py-0.5 rounded-full w-fit mx-auto mb-2">{p.badge}</div>
                  )}
                  <div className="aspect-square bg-muted rounded-lg md:rounded-xl p-3 mb-3 flex items-center justify-center overflow-hidden">
                    <Image src={p.img} alt={p.name} width={200} height={200} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" placeholder="blur" />
                  </div>
                  <h3 className="text-[11px] md:text-sm font-bold text-foreground line-clamp-2 mb-1 group-hover:text-green-600 transition-colors">{p.name}</h3>
                  <p className="text-green-600 font-black text-sm md:text-base">{p.price}</p>
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
            <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-green-600 mb-8">
              Gia Đình Sử Dụng SIFA999
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {useCases.map((uc) => (
                <div key={uc.title} className="bg-green-50 rounded-2xl p-5 md:p-6">
                  <h3 className="font-bold text-foreground mb-2 text-sm">{uc.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16 md:mb-24 bg-green-50 rounded-2xl md:rounded-3xl p-6 md:p-10">
            <h2 className="text-lg md:text-xl font-black text-foreground text-center mb-6">
              Chứng Nhận & An Toàn
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3">
                  <Shield className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-sm font-medium text-foreground">{cert}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-6">
              Mọi sản phẩm SIFA999 đều trải qua quy trình kiểm nghiệm an toàn nghiêm ngặt theo tiêu chuẩn quốc tế.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-green-600 mb-8">
              Khách Hàng Nói Gì
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">&quot;{t.quote}&quot;</p>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center">
              <ShoppingBag className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="font-black text-foreground text-lg mb-2">Khách Hàng Lẻ</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Mua sản phẩm SIFA999 trực tuyến hoặc tại cửa hàng gần bạn. Giao hàng nhanh, an toàn.
              </p>
              <Link href="/sifa999/products" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:brightness-110 transition-all">
                Mua ngay <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center">
              <Handshake className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="font-black text-foreground text-lg mb-2">Đại Lý & Nhà Phân Phối</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Quan tâm đến việc phân phối SIFA999? Chính sách chiết khấu hấp dẫn và hỗ trợ marketing.
              </p>
              <Link href="/sifa999/contact" className="inline-flex items-center gap-2 border-2 border-green-600 text-green-600 px-6 py-3 rounded-full font-bold text-sm hover:bg-green-600 hover:text-white transition-all">
                Trở thành đối tác <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
