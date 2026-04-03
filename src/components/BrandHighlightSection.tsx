"use client";

import Link from "next/link";
import { ArrowRight, Shield, Leaf, Factory, Heart, Sparkles, Users } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const brands = [
  {
    name: "ZIFAT999",
    tagline: "Sức Mạnh Công Nghiệp",
    description: "Giải pháp tẩy rửa chuyên nghiệp, mạnh mẽ cho mọi công trình và doanh nghiệp.",
    color: "bg-blue-600",
    colorLight: "bg-blue-50",
    colorText: "text-blue-600",
    colorBorder: "border-blue-200",
    href: "/zifat999",
    usps: [
      { icon: Factory, text: "Chuyên dụng công nghiệp" },
      { icon: Shield, text: "Hiệu quả vượt trội" },
      { icon: Sparkles, text: "Công thức đậm đặc" },
    ],
  },
  {
    name: "SIFA999",
    tagline: "An Toàn Cho Gia Đình",
    description: "Sản phẩm chăm sóc gia đình dịu nhẹ, an toàn, thân thiện với môi trường.",
    color: "bg-green-600",
    colorLight: "bg-green-50",
    colorText: "text-green-600",
    colorBorder: "border-green-200",
    href: "/sifa999",
    usps: [
      { icon: Heart, text: "An toàn cho trẻ em" },
      { icon: Leaf, text: "Thân thiện môi trường" },
      { icon: Users, text: "Được gia đình tin dùng" },
    ],
  },
];

const BrandHighlightSection = () => (
  <section className="scroll-mt-28" id="brands">
    <ScrollReveal>
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-primary">
          Thương Hiệu Của Chúng Tôi
        </h2>
        <Link
          className="text-[13px] text-muted-foreground font-bold hover:text-primary transition-all flex items-center gap-1.5 group active:scale-95"
          href="/brands"
        >
          Xem tất cả <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </ScrollReveal>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      {brands.map((brand, i) => (
        <ScrollReveal key={brand.name} delay={`${i * 150}ms`}>
          <Link
            href={brand.href}
            data-testid={`brand-card-${brand.name.toLowerCase()}`}
            className={`block bg-card border ${brand.colorBorder} rounded-2xl md:rounded-3xl p-6 md:p-8 group hover:shadow-xl hover:border-primary/40 transition-all duration-300`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`${brand.color} text-white text-xs md:text-sm font-black px-3 py-1.5 rounded-full`}>
                {brand.name}
              </span>
              <span className="text-xs md:text-sm font-bold text-muted-foreground">{brand.tagline}</span>
            </div>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              {brand.description}
            </p>

            <div className="space-y-3 mb-6">
              {brand.usps.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${brand.colorLight} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${brand.colorText}`} />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{text}</span>
                </div>
              ))}
            </div>

            <div className={`flex items-center gap-2 ${brand.colorText} font-bold text-sm group-hover:gap-3 transition-all`}>
              <span>Khám phá {brand.name}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default BrandHighlightSection;
