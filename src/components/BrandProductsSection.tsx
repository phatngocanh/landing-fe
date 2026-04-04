"use client";

import { ArrowRight, Factory, Heart, Leaf, Shield, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProductsByBrand } from "@/data/products";
import BrandLogo from "./BrandLogo";
import ScrollReveal from "./ScrollReveal";

import type { LucideIcon } from "lucide-react";

interface Usp {
  icon: LucideIcon;
  text: string;
}

const brandGroups = [
  {
    brand: "ZIFAT999" as const,
    tagline: "Sức Mạnh Công Nghiệp",
    description: "Tẩy rửa chuyên nghiệp cho nhà máy, xưởng sản xuất và doanh nghiệp.",
    brandHref: "/zifat999",
    productsHref: "/products?brand=ZIFAT999",
    accent: "text-blue-600",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-200",
    accentTopBorder: "border-t-blue-600",
    accentHoverBorder: "hover:border-blue-400",
    accentSolid: "bg-blue-600 hover:bg-blue-700",
    productCardHover: "hover:border-blue-300",
    usps: [
      { icon: Factory, text: "Công nghiệp chuyên dụng" },
      { icon: Shield, text: "Đậm đặc, hiệu quả" },
      { icon: Sparkles, text: "Tiết kiệm chi phí" },
    ] as Usp[],
    products: getProductsByBrand("ZIFAT999").slice(0, 4),
  },
  {
    brand: "SIFA999" as const,
    tagline: "An Toàn Cho Gia Đình",
    description: "Chăm sóc gia đình dịu nhẹ, kiểm nghiệm da liễu, thân thiện môi trường.",
    brandHref: "/sifa999",
    productsHref: "/products?brand=SIFA999",
    accent: "text-green-600",
    accentBg: "bg-green-50",
    accentBorder: "border-green-200",
    accentTopBorder: "border-t-green-600",
    accentHoverBorder: "hover:border-green-400",
    accentSolid: "bg-green-600 hover:bg-green-700",
    productCardHover: "hover:border-green-300",
    usps: [
      { icon: Heart, text: "An toàn cho trẻ em" },
      { icon: Leaf, text: "Phân hủy sinh học" },
      { icon: Users, text: "Gia đình tin dùng" },
    ] as Usp[],
    products: getProductsByBrand("SIFA999").slice(0, 4),
  },
];

const BrandProductsSection = () => (
  <section className="scroll-mt-28" id="brands">
    <ScrollReveal>
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-4 md:mb-10 md:pb-5">
        <h2 className="section-header-line text-xs font-black uppercase tracking-[0.2em] text-primary md:text-sm md:tracking-[0.25em]">
          Thương Hiệu & Sản Phẩm
        </h2>
        <Link
          className="hidden items-center gap-1.5 text-[13px] font-bold text-muted-foreground transition-all hover:text-primary md:flex"
          href="/brands"
        >
          So sánh thương hiệu <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </ScrollReveal>

    <div className="space-y-8 md:space-y-12">
      {brandGroups.map((group, index) => (
        <ScrollReveal key={group.brand} delay={`${index * 120}ms`}>
          <div
            className={`rounded-2xl border border-t-4 ${group.accentBorder} ${group.accentTopBorder} bg-card shadow-sm md:rounded-3xl`}
          >
            {/* Brand header */}
            <div className="p-5 pb-0 md:p-7 md:pb-0">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                  <BrandLogo brand={group.brand} size="md" />
                  <div className="min-w-0">
                    <p className={`text-lg font-black tracking-tight ${group.accent} md:text-xl`}>
                      {group.brand} — {group.tagline}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {group.description}
                    </p>
                  </div>
                </div>
                <Link
                  href={group.brandHref}
                  className={`hidden shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all sm:inline-flex ${group.accentSolid}`}
                >
                  Khám phá {group.brand}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* USP pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {group.usps.map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className={`inline-flex items-center gap-2 rounded-full ${group.accentBg} px-3.5 py-1.5 text-xs font-semibold text-foreground sm:text-sm`}
                  >
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${group.accent}`} />
                    {text}
                  </span>
                ))}
              </div>
            </div>

            {/* Product grid */}
            <div className="p-5 md:p-7">
              <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                {group.products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className={`group/item flex flex-col rounded-2xl border border-border bg-background p-3 transition-all duration-200 ${group.productCardHover} hover:shadow-md sm:p-4`}
                  >
                    <div
                      className={`relative aspect-square overflow-hidden rounded-xl ${group.accentBg} p-3 sm:p-4`}
                    >
                      <Image
                        src={product.img}
                        alt={product.name}
                        width={200}
                        height={200}
                        placeholder="blur"
                        className="h-full w-full object-contain transition-transform duration-300 group-hover/item:scale-105"
                      />
                    </div>
                    <div className="mt-3 flex flex-1 flex-col sm:mt-4">
                      <h3 className="line-clamp-2 min-h-[2.5rem] text-[13px] font-bold leading-snug text-foreground sm:min-h-[2.75rem] sm:text-sm">
                        {product.name}
                      </h3>
                      <p className={`mt-1.5 text-sm font-black sm:text-base ${group.accent}`}>
                        {product.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Footer CTAs */}
              <div className="mt-5 flex items-center justify-between">
                <Link
                  href={group.productsHref}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white transition-all ${group.accentSolid}`}
                >
                  Xem tất cả sản phẩm
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={group.brandHref}
                  className={`inline-flex items-center gap-1.5 text-[13px] font-bold transition-all sm:hidden ${group.accent}`}
                >
                  Khám phá {group.brand}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>

    <ScrollReveal>
      <div className="mt-6 flex justify-center gap-4">
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-bold text-muted-foreground transition-all hover:border-primary hover:text-primary"
          href="/products"
        >
          Tất cả sản phẩm
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          className="hidden items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-bold text-muted-foreground transition-all hover:border-primary hover:text-primary md:hidden"
          href="/brands"
        >
          So sánh thương hiệu
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </ScrollReveal>
  </section>
);

export default BrandProductsSection;
