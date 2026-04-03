"use client";

import Image from "next/image";
import Link from "next/link";
import { getBrandBySlug } from "@/data/brands";
import { getProductsByBrand } from "@/data/products";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import MobileDrawer from "@/components/MobileDrawer";
import FloatingActions from "@/components/FloatingActions";
import DistributorCTA from "@/components/DistributorCTA";
import ScrollReveal from "@/components/ScrollReveal";

const brand = getBrandBySlug("zifat999")!;
const products = getProductsByBrand("ZIFAT 999").slice(0, 8);

const testimonials = [
  {
    name: "Anh Minh Tuấn",
    role: "Giám đốc Gara Oto Minh Tuấn",
    content:
      "Sản phẩm ZIFAT 999 giúp gara chúng tôi tiết kiệm đáng kể chi phí vệ sinh. Chất lượng tẩy rửa vượt trội, đặc biệt với dầu mỡ công nghiệp.",
  },
  {
    name: "Chị Hồng Nhung",
    role: "Quản lý Khách sạn Grand Plaza",
    content:
      "Đã 5 năm sử dụng ZIFAT 999 cho toàn bộ hệ thống khách sạn. Độ bền, hiệu quả và giá thành rất cạnh tranh.",
  },
  {
    name: "Ông Văn Hùng",
    role: "Chủ xưởng sản xuất cơ khí",
    content:
      "Nước tẩy máy ZIFAT 999 xử lý được cả những vết dầu mỡ cứng đầu nhất trên máy móc. Rất hài lòng với chất lượng sản phẩm.",
  },
];

export default function Zifat999Page() {
  return (
    <div className="scroll-smooth">
      <MobileDrawer />
      <div id="page-wrap">
        <SiteHeader />
        <SiteNav />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
          <div className="container relative py-16 md:py-24">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block px-4 py-1.5 bg-emerald-500/30 text-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                  Thương hiệu Công Nghiệp
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4">
                  <span className="text-emerald-400">{brand.name}</span>
                </h1>
                <p className="text-xl md:text-2xl font-medium text-emerald-100 mb-6">
                  {brand.tagline}
                </p>
                <p className="text-emerald-200/80 max-w-xl mx-auto md:mx-0 mb-8">
                  {brand.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <Link
                    href="/products?brand=ZIFAT+999"
                    className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-emerald-400 transition-all uppercase tracking-wider active:scale-95"
                  >
                    Xem Sản Phẩm
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-4 rounded-full font-bold text-sm hover:bg-white/20 transition-all border border-white/20 active:scale-95"
                  >
                    Liên Hệ Báo Giá
                  </Link>
                </div>
              </div>
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 shrink-0">
                <div className="absolute inset-0 bg-emerald-500/30 rounded-3xl rotate-6" />
                <div className="absolute inset-0 bg-white rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={brand.heroImage}
                    alt={brand.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 320px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  Tính Năng Nổi Bật
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-foreground tracking-tight">
                  Vì Sao Chọn ZIFAT 999?
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {brand.features.map((feature, index) => (
                <ScrollReveal
                  key={index}
                  animation="fade-in-up"
                  delay={index * 0.1}
                >
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all h-full">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-foreground font-semibold">{feature}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Target Markets */}
        <section className="py-16 md:py-24">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  Thị Trường Mục Tiêu
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-foreground tracking-tight">
                  Phục Vụ Đa Dạng Ngành Nghề
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {brand.targetMarkets.map((market, index) => (
                <ScrollReveal
                  key={index}
                  animation="fade-in-up"
                  delay={index * 0.05}
                >
                  <div className="bg-emerald-50 rounded-xl p-4 text-center hover:bg-emerald-100 transition-colors">
                    <p className="text-emerald-800 font-semibold text-sm">
                      {market}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Products Preview */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    Sản Phẩm Tiêu Biểu
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black text-foreground tracking-tight">
                    Sản Phẩm ZIFAT 999
                  </h2>
                </div>
                <Link
                  href="/products?brand=ZIFAT+999"
                  className="hidden sm:inline-flex items-center gap-2 text-emerald-600 font-bold text-sm hover:gap-3 transition-all"
                >
                  Xem tất cả
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ScrollReveal
                  key={product.id}
                  animation="fade-in-up"
                  delay={index * 0.05}
                >
                  <Link href={`/product/${product.id}`} className="group block">
                    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                      <div className="relative aspect-square bg-muted">
                        <Image
                          src={product.img}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        {product.badge && (
                          <span className="absolute top-3 left-3 px-2 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase rounded-full">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-emerald-600 font-bold">
                          {product.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link
                href="/products?brand=ZIFAT+999"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold text-sm active:scale-95 transition-all"
              >
                Xem tất cả sản phẩm
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  Đánh Giá Từ Đối Tác
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-foreground tracking-tight">
                  Khách Hàng Nói Gì Về Chúng Tôi
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <ScrollReveal
                  key={index}
                  animation="fade-in-up"
                  delay={index * 0.1}
                >
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-sm h-full">
                    <div className="flex items-center gap-1 text-emerald-500 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div>
                      <p className="font-bold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Distributor CTA */}
        <section className="container pb-16 md:pb-24">
          <DistributorCTA variant="compact" />
        </section>

        <SiteFooter />
        <FloatingActions />
      </div>
    </div>
  );
}
