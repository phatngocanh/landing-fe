"use client";

import Link from "next/link";
import { ArrowRight, Shield, Leaf, Factory, Heart, Sparkles, Users, ChevronRight, CheckCircle, Award, Handshake, Phone } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import BrandLogo from "@/components/BrandLogo";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });
const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false });

import dynamic from "next/dynamic";

const brands = [
  {
    name: "ZIFAT999",
    tagline: "Sức Mạnh Công Nghiệp",
    description: "Giải pháp tẩy rửa chuyên nghiệp, mạnh mẽ cho mọi công trình, nhà máy và doanh nghiệp. Được tin dùng bởi hàng ngàn đối tác B2B trên toàn quốc.",
    color: "bg-blue-600",
    colorLight: "bg-blue-50",
    colorText: "text-blue-600",
    colorBorder: "border-blue-200",
    hoverBorder: "hover:border-blue-400",
    href: "/zifat999",
    productsHref: "/products?brand=ZIFAT999",
    points: [
      "Công thức đậm đặc, hiệu quả vượt trội",
      "Chuyên dụng cho công nghiệp nặng",
      "Phân phối toàn quốc, MOQ linh hoạt",
    ],
    usps: [
      { icon: Factory, text: "Công nghiệp chuyên dụng" },
      { icon: Shield, text: "Hiệu quả mạnh mẽ" },
      { icon: Sparkles, text: "Đậm đặc, tiết kiệm" },
    ],
    focus: "Tẩy rửa công nghiệp",
    bestFor: "Nhà máy, xưởng sản xuất",
    useCase: "Tẩy rửa nặng, vệ sinh công nghiệp",
  },
  {
    name: "SIFA999",
    tagline: "An Toàn Cho Gia Đình",
    description: "Sản phẩm chăm sóc gia đình an toàn, dịu nhẹ, được kiểm nghiệm da liễu. Thân thiện với môi trường, phù hợp cho gia đình có trẻ nhỏ.",
    color: "bg-green-600",
    colorLight: "bg-green-50",
    colorText: "text-green-600",
    colorBorder: "border-green-200",
    hoverBorder: "hover:border-green-400",
    href: "/sifa999",
    productsHref: "/products?brand=SIFA999",
    points: [
      "Kiểm nghiệm da liễu, an toàn tuyệt đối",
      "100% phân hủy sinh học",
      "Giá cả phải chăng, chất lượng cao",
    ],
    usps: [
      { icon: Heart, text: "An toàn cho trẻ em" },
      { icon: Leaf, text: "Thân thiện môi trường" },
      { icon: Users, text: "Gia đình tin dùng" },
    ],
    focus: "Chăm sóc gia đình",
    bestFor: "Gia đình, trường học",
    useCase: "Vệ sinh hàng ngày",
  },
];

const trustBadges = [
  { icon: Award, label: "ISO 9001" },
  { icon: Shield, label: "HVNCLC" },
  { icon: CheckCircle, label: "Kiểm nghiệm da liễu" },
  { icon: Leaf, label: "Phân hủy sinh học" },
];

export default function BrandsPage() {
  return (
    <div className="scroll-smooth">
      <SiteHeader />
      <SiteNav />

      <div className="bg-muted/50 border-b border-border">
        <div className="container py-3 md:py-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="text-foreground font-semibold" aria-current="page">Thương hiệu</span>
          </nav>
        </div>
      </div>

      <main className="container py-10 md:py-16">
        {/* Page Header */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-2xl md:text-4xl font-black text-foreground mb-4" data-testid="text-brands-title">
            Chọn Thương Hiệu Phù Hợp
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Phát Ngọc Anh tự hào sở hữu hai thương hiệu hóa phẩm hàng đầu, phục vụ mọi nhu cầu từ công nghiệp đến gia đình.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-10 md:mb-16">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 bg-muted/80 rounded-full px-4 py-2 text-sm font-semibold text-foreground">
              <Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
              {label}
            </div>
          ))}
        </div>

        {/* Brand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12 md:mb-20">
          {brands.map((brand) => (
            <article
              key={brand.name}
              className={`bg-card border-2 ${brand.colorBorder} ${brand.hoverBorder} rounded-2xl md:rounded-3xl p-6 md:p-10 transition-all duration-300 hover:shadow-2xl group`}
            >
              <div className="mb-5 flex items-center gap-4">
                <BrandLogo brand={brand.name} size="lg" />
                <div>
                  <span className={`${brand.color} inline-flex text-white text-sm md:text-base font-black px-4 py-2 rounded-full mb-2`}>
                    {brand.name}
                  </span>
                  <h2 className={`text-xl md:text-2xl font-black ${brand.colorText}`}>
                    {brand.tagline}
                  </h2>
                </div>
              </div>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                {brand.description}
              </p>

              <ul className="space-y-3 mb-6" aria-label={`Ưu điểm ${brand.name}`}>
                {brand.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <CheckCircle className={`w-5 h-5 ${brand.colorText} shrink-0 mt-0.5`} aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {brand.usps.map(({ icon: Icon, text }) => (
                  <div key={text} className={`${brand.colorLight} rounded-xl p-3 text-center`}>
                    <Icon className={`w-5 h-5 ${brand.colorText} mx-auto mb-1.5`} aria-hidden="true" />
                    <span className="text-[11px] md:text-xs font-bold text-foreground">{text}</span>
                  </div>
                ))}
              </div>

              <Link
                href={brand.productsHref}
                data-testid={`link-explore-${brand.name.toLowerCase()}`}
                aria-label={`Khám phá sản phẩm ${brand.name} — ${brand.tagline}`}
                className={`flex items-center justify-center gap-2 w-full ${brand.color} text-white py-3.5 md:py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg`}
              >
                Khám phá sản phẩm {brand.name}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-muted rounded-2xl md:rounded-3xl p-6 md:p-10 mb-10 md:mb-16">
          <h3 className="text-lg md:text-xl font-black text-foreground text-center mb-6 md:mb-8">
            So Sánh Hai Thương Hiệu
          </h3>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm" role="table">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="py-3 px-4 text-left font-black text-foreground" scope="col">Tiêu chí</th>
                  <th className="py-3 px-4 text-center font-black text-blue-600" scope="col">ZIFAT999</th>
                  <th className="py-3 px-4 text-center font-black text-green-600" scope="col">SIFA999</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { label: "Định hướng", z: "Công nghiệp mạnh mẽ", s: "An toàn gia đình" },
                  { label: "Phù hợp cho", z: "Nhà máy, xưởng, gara", s: "Gia đình, trường học" },
                  { label: "Ứng dụng", z: "Tẩy rửa nặng, công nghiệp", s: "Vệ sinh hàng ngày" },
                  { label: "Đặc điểm", z: "Đậm đặc, hiệu quả tức thì", s: "Dịu nhẹ, thân thiện" },
                  { label: "Chứng nhận", z: "ISO 9001, HVNCLC", s: "ISO, Kiểm nghiệm da liễu" },
                ].map((row) => (
                  <tr key={row.label}>
                    <td className="py-3 px-4 font-bold text-foreground">{row.label}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.z}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Distributor / Partnership CTA */}
        <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/20 rounded-2xl md:rounded-3xl p-6 md:p-10 mb-10 md:mb-16 text-center">
          <Handshake className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-4" aria-hidden="true" />
          <h3 className="text-lg md:text-2xl font-black text-foreground mb-3">
            Trở Thành Nhà Phân Phối
          </h3>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
            Bạn là nhà phân phối, đại lý hoặc doanh nghiệp muốn hợp tác? Phát Ngọc Anh luôn sẵn sàng đồng hành cùng bạn với chính sách giá tốt, hỗ trợ marketing và giao hàng toàn quốc.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg"
            >
              <Handshake className="w-4 h-4" aria-hidden="true" />
              Liên hệ hợp tác
            </Link>
            <a
              href="tel:+842862713214"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3.5 rounded-full font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              028 6271 3214
            </a>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            data-testid="link-all-products"
            className="px-8 py-3 border-2 border-primary text-primary rounded-full font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Xem tất cả sản phẩm
          </Link>
          <Link
            href="/"
            className="px-8 py-3 border border-border text-muted-foreground rounded-full font-bold text-sm hover:border-primary hover:text-primary transition-all"
          >
            Về trang chủ
          </Link>
        </div>
      </main>

      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
