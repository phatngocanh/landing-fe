"use client";

import Link from "next/link";
import { ArrowRight, Factory, Heart, Leaf, Shield, Sparkles, Users } from "lucide-react";
import BrandLogo from "./BrandLogo";
import ScrollReveal from "./ScrollReveal";

const brands = [
  {
    name: "ZIFAT999",
    tagline: "Sức Mạnh Công Nghiệp",
    description: "Tẩy rửa chuyên nghiệp cho nhà máy, xưởng sản xuất và doanh nghiệp.",
    colorText: "text-teal-600",
    colorBg: "bg-teal-50",
    colorBorder: "border-teal-200",
    topBorder: "border-t-teal-600",
    hoverBorder: "hover:border-teal-400",
    ctaBg: "bg-teal-600 hover:bg-teal-700",
    href: "/zifat999",
    usps: [
      { icon: Factory, text: "Công nghiệp chuyên dụng" },
      { icon: Shield, text: "Đậm đặc, hiệu quả" },
      { icon: Sparkles, text: "Tiết kiệm chi phí" },
    ],
  },
  {
    name: "SIFA999",
    tagline: "An Toàn Cho Gia Đình",
    description: "Chăm sóc gia đình dịu nhẹ, kiểm nghiệm da liễu, thân thiện môi trường.",
    colorText: "text-green-600",
    colorBg: "bg-green-50",
    colorBorder: "border-green-200",
    topBorder: "border-t-green-600",
    hoverBorder: "hover:border-green-400",
    ctaBg: "bg-green-600 hover:bg-green-700",
    href: "/sifa999",
    usps: [
      { icon: Heart, text: "An toàn cho trẻ em" },
      { icon: Leaf, text: "Phân hủy sinh học" },
      { icon: Users, text: "Gia đình tin dùng" },
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
        <ScrollReveal key={brand.name} delay={`${i * 120}ms`} className="h-full">
          <Link
            href={brand.href}
            data-testid={`brand-card-${brand.name.toLowerCase()}`}
            className={`group relative flex h-full flex-col rounded-2xl border border-t-4 ${brand.colorBorder} ${brand.topBorder} ${brand.hoverBorder} bg-card shadow-sm transition-all duration-300 hover:shadow-lg md:rounded-3xl`}
          >
            <div className="flex flex-1 flex-col p-5 md:p-7">
              {/* Header: logo + brand info */}
              <div className="mb-4 flex items-center gap-3.5">
                <BrandLogo brand={brand.name} size="md" />
                <div className="min-w-0 flex-1">
                  <p className={`text-lg font-black tracking-tight ${brand.colorText} md:text-xl`}>
                    {brand.name} — {brand.tagline}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {brand.description}
                  </p>
                </div>
              </div>

              {/* USPs — vertical list with brand-colored icons */}
              <div className={`mb-5 flex-1 space-y-2.5 rounded-xl ${brand.colorBg} p-4`}>
                {brand.usps.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 shrink-0 ${brand.colorText}`} />
                    <span className="text-sm font-semibold text-foreground">{text}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className={`flex items-center justify-center gap-2 rounded-xl ${brand.ctaBg} px-5 py-3 text-sm font-bold text-white transition-all duration-200 group-hover:gap-3`}>
                Khám phá {brand.name}
                <ArrowRight className="h-4 w-4" />
              </div>
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
