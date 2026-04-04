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
    accent: "text-teal-600",
    accentBg: "bg-teal-50",
    accentBorder: "border-teal-200",
    accentTopBorder: "border-t-teal-600",
    accentHoverBorder: "hover:border-teal-400",
    accentSolid: "bg-teal-600 hover:bg-teal-700",
    productCardHover: "hover:border-teal-300",
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
              <div className="sm:flex sm:items-center sm:justify-between sm:gap-4">
                {/* Mobile: logo + brand inline, tagline + desc below */}
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <BrandLogo brand={group.brand} size="md" />
                      <p className={`text-lg font-black tracking-tight ${group.accent} md:text-xl`}>
                        {group.brand}
                      </p>
                    </div>
                    <Link
                      href={group.brandHref}
                      className={`inline-flex shrink-0 items-center gap-1 text-xs font-bold transition-all sm:hidden ${group.accent}`}
                    >
                      Khám phá
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <p className={`mt-2 text-sm font-bold ${group.accent} sm:mt-1`}>
                    {group.tagline}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {group.description}
                  </p>
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
              <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                {group.usps.map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className={`inline-flex items-center gap-1.5 rounded-full ${group.accentBg} px-3 py-1 text-xs font-semibold text-foreground sm:gap-2 sm:px-3.5 sm:py-1.5 sm:text-sm`}
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
                    className={`group/item flex flex-col rounded-2xl border border-border bg-background p-3 transition-all duration-200 ${group.productCardHover} hover:-translate-y-1 hover:shadow-lg sm:p-4`}
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
                      <span className={`absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm transition-all duration-200 group-hover/item:opacity-100 sm:h-8 sm:w-8 ${group.accent}`}>
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </span>
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

              {/* Footer CTA */}
              <div className="mt-5 md:mt-6">
                <Link
                  href={group.productsHref}
                  className={`group/cta inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95 sm:justify-start sm:px-6 sm:text-sm ${group.accentSolid}`}
                >
                  Xem tất cả sản phẩm
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover/cta:translate-x-0.5 sm:h-4 sm:w-4" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>

    <ScrollReveal>
      <div className="mt-8 flex justify-center md:mt-12">
        <Link
          className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 md:px-10 md:py-4 md:text-base"
          href="/products"
        >
          Khám phá tất cả sản phẩm
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5" />
        </Link>
      </div>
    </ScrollReveal>
  </section>
);

export default BrandProductsSection;
