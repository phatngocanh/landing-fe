"use client";

import Link from "next/link";
import { ArrowRight, Factory, Heart, Leaf, Shield, Sparkles, Users } from "lucide-react";
import BrandLogo from "./BrandLogo";
import ScrollReveal from "./ScrollReveal";

const brands = [
  {
    name: "ZIFAT999",
    tagline: "Sức Mạnh Công Nghiệp",
    description: "Tẩy rửa chuyên nghiệp cho nhà máy, xưởng sản xuất và doanh nghiệp B2B.",
    color: "bg-blue-600",
    colorLight: "bg-blue-50",
    colorText: "text-blue-600",
    colorBorder: "border-blue-200",
    hoverBorder: "hover:border-blue-400",
    href: "/zifat999",
    usps: [
      { icon: Factory, text: "Công nghiệp" },
      { icon: Shield, text: "Đậm đặc" },
      { icon: Sparkles, text: "Tiết kiệm" },
    ],
  },
  {
    name: "SIFA999",
    tagline: "An Toàn Cho Gia Đình",
    description: "Chăm sóc gia đình dịu nhẹ, kiểm nghiệm da liễu, thân thiện môi trường.",
    color: "bg-green-600",
    colorLight: "bg-green-50",
    colorText: "text-green-600",
    colorBorder: "border-green-200",
    hoverBorder: "hover:border-green-400",
    href: "/sifa999",
    usps: [
      { icon: Heart, text: "An toàn" },
      { icon: Leaf, text: "Sinh học" },
      { icon: Users, text: "Gia đình" },
    ],
  },
];

const BrandHighlightSection = () => (
  <section className="scroll-mt-28" id="brands">
    <ScrollReveal>
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-4">
        <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-primary">
          Thương Hiệu Của Chúng Tôi
        </h2>
        <Link
          className="hidden items-center gap-1.5 text-[13px] font-bold text-muted-foreground transition-all hover:text-primary md:flex"
          href="/brands"
        >
          So sánh chi tiết <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </ScrollReveal>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      {brands.map((brand, i) => (
        <ScrollReveal key={brand.name} delay={`${i * 120}ms`}>
          <Link
            href={brand.href}
            data-testid={`brand-card-${brand.name.toLowerCase()}`}
            className={`group relative block rounded-2xl border-2 ${brand.colorBorder} ${brand.hoverBorder} bg-card p-5 transition-all duration-300 hover:shadow-lg md:rounded-3xl md:p-7`}
          >
            {/* Header: logo + name + tagline */}
            <div className="mb-4 flex items-center gap-3.5">
              <BrandLogo brand={brand.name} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className={`${brand.color} rounded-full px-3 py-1 text-xs font-black text-white`}>
                    {brand.name}
                  </span>
                  <span className={`text-sm font-bold ${brand.colorText}`}>
                    {brand.tagline}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {brand.description}
                </p>
              </div>
            </div>

            {/* USPs row */}
            <div className="mb-4 flex gap-2">
              {brand.usps.map(({ icon: Icon, text }) => (
                <div key={text} className={`flex flex-1 items-center gap-2 rounded-xl ${brand.colorLight} px-3 py-2.5`}>
                  <Icon className={`h-4 w-4 shrink-0 ${brand.colorText}`} />
                  <span className="text-xs font-bold text-foreground">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={`flex items-center justify-between rounded-xl ${brand.color} px-4 py-3 text-white`}>
              <span className="text-sm font-bold">Khám phá {brand.name}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>

    <ScrollReveal>
      <div className="mt-4 flex justify-end md:hidden">
        <Link
          className="flex items-center gap-1.5 text-[13px] font-bold text-muted-foreground transition-all hover:text-primary"
          href="/brands"
        >
          So sánh chi tiết <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </ScrollReveal>
  </section>
);

export default BrandHighlightSection;
