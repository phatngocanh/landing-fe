"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Factory,
  Heart,
  Leaf,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import BrandLogo from "./BrandLogo";
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
    colorTint: "from-blue-600/12 via-blue-600/4 to-transparent",
    badgeTone: "bg-blue-600/10 text-blue-700 ring-blue-100",
    ctaSurface: "bg-blue-600/8",
    href: "/zifat999",
    audience: "Nhà máy, xưởng sản xuất, gara và đối tác B2B",
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
    colorTint: "from-green-600/12 via-green-600/4 to-transparent",
    badgeTone: "bg-green-600/10 text-green-700 ring-green-100",
    ctaSurface: "bg-green-600/8",
    href: "/sifa999",
    audience: "Gia đình, trường học và không gian sống hàng ngày",
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
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-4">
        <div className="space-y-2">
          <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-primary">
            Thương Hiệu Của Chúng Tôi
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Hai định hướng rõ ràng để khách hàng chọn nhanh hơn: mạnh mẽ cho công nghiệp và dịu nhẹ cho gia đình.
          </p>
        </div>
        <Link
          className="hidden items-center gap-1.5 text-[13px] font-bold text-muted-foreground transition-all hover:text-primary md:flex"
          href="/brands"
        >
          Xem tất cả <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </ScrollReveal>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
      {brands.map((brand, i) => (
        <ScrollReveal key={brand.name} delay={`${i * 150}ms`}>
          <Link
            href={brand.href}
            data-testid={`brand-card-${brand.name.toLowerCase()}`}
            className={`group relative block overflow-hidden rounded-2xl border ${brand.colorBorder} bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl md:rounded-3xl md:p-8`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${brand.colorTint} opacity-80 transition-opacity duration-300 group-hover:opacity-100`} />
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

            <div className="relative flex h-full flex-col">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <BrandLogo brand={brand.name} size="md" className="mt-0.5" />
                  <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className={`${brand.color} rounded-full px-3 py-1.5 text-xs font-black text-white shadow-sm md:text-sm`}>
                      {brand.name}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold ring-1 ${brand.badgeTone}`}>
                      {brand.tagline}
                    </span>
                  </div>
                  <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
                    {brand.description}
                  </p>
                </div>
                </div>
                <div className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${brand.colorLight} shadow-sm transition-transform duration-300 group-hover:scale-105 md:flex`}>
                  <ArrowRight className={`h-5 w-5 ${brand.colorText}`} />
                </div>
              </div>

              <div className="mb-5 rounded-2xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm">
                <p className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Phù hợp cho
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {brand.audience}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {brand.usps.map(({ icon: Icon, text }) => (
                  <div key={text} className="rounded-2xl border border-black/5 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
                    <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${brand.colorLight}`}>
                      <Icon className={`h-4 w-4 ${brand.colorText}`} />
                    </div>
                    <span className="text-sm font-semibold leading-snug text-foreground">{text}</span>
                  </div>
                ))}
              </div>

              <div className={`mt-5 flex items-center justify-between rounded-2xl px-4 py-3 ${brand.ctaSurface}`}>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CheckCircle2 className={`h-4 w-4 ${brand.colorText}`} />
                  <span>Đi tới trang thương hiệu</span>
                </div>
                <div className={`flex items-center gap-2 text-sm font-bold ${brand.colorText} transition-all group-hover:gap-3`}>
                  <span>Khám phá</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
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
          Xem tất cả <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </ScrollReveal>
  </section>
);

export default BrandHighlightSection;
