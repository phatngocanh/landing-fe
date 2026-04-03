"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Shield, Leaf, Factory, Heart, Sparkles, Users, ChevronRight, CheckCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });
const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false });

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
    productsHref: "/zifat999/products",
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
    productsHref: "/sifa999/products",
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

export default function BrandsPage() {
  return (
    <div className="scroll-smooth">
      <SiteHeader />
      <SiteNav />

      <div className="bg-muted/50 border-b border-border">
        <div className="container py-3 md:py-4">
          <nav className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-foreground font-semibold">Thương hiệu</span>
          </nav>
        </div>
      </div>

      <main className="container py-10 md:py-16">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-2xl md:text-4xl font-black text-foreground mb-4" data-testid="text-brands-title">
            Chọn Thương Hiệu Phù Hợp
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Phát Ngọc Anh tự hào sở hữu hai thương hiệu hóa phẩm hàng đầu, phục vụ mọi nhu cầu từ công nghiệp đến gia đình.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12 md:mb-20">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className={`bg-card border-2 ${brand.colorBorder} ${brand.hoverBorder} rounded-2xl md:rounded-3xl p-6 md:p-10 transition-all duration-300 hover:shadow-2xl group`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`${brand.color} text-white text-sm md:text-base font-black px-4 py-2 rounded-full`}>
                  {brand.name}
                </span>
              </div>

              <h2 className={`text-xl md:text-2xl font-black ${brand.colorText} mb-2`}>
                {brand.tagline}
              </h2>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                {brand.description}
              </p>

              <div className="space-y-3 mb-6">
                {brand.points.map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle className={`w-5 h-5 ${brand.colorText} shrink-0 mt-0.5`} />
                    <span className="text-sm font-medium text-foreground">{point}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {brand.usps.map(({ icon: Icon, text }) => (
                  <div key={text} className={`${brand.colorLight} rounded-xl p-3 text-center`}>
                    <Icon className={`w-5 h-5 ${brand.colorText} mx-auto mb-1.5`} />
                    <span className="text-[10px] md:text-xs font-bold text-foreground">{text}</span>
                  </div>
                ))}
              </div>

              <Link
                href={brand.productsHref}
                data-testid={`link-explore-${brand.name.toLowerCase()}`}
                className={`flex items-center justify-center gap-2 w-full ${brand.color} text-white py-3.5 md:py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg`}
              >
                Khám phá sản phẩm {brand.name}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-muted rounded-2xl md:rounded-3xl p-6 md:p-10 mb-10 md:mb-16">
          <h3 className="text-lg md:text-xl font-black text-foreground text-center mb-6 md:mb-8">
            So Sánh Hai Thương Hiệu
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="py-3 px-4 text-left font-black text-foreground"></th>
                  <th className="py-3 px-4 text-center font-black text-blue-600">ZIFAT999</th>
                  <th className="py-3 px-4 text-center font-black text-green-600">SIFA999</th>
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
