import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProductsByBrand } from "@/data/products";
import BrandLogo from "./BrandLogo";
import ScrollReveal from "./ScrollReveal";

const productGroups = [
  {
    brand: "ZIFAT999",
    title: "Công nghiệp & chuyên dụng",
    href: "/products?brand=ZIFAT999",
    accent: "text-blue-600",
    accentBg: "bg-blue-50",
    accentSolid: "bg-blue-600 hover:bg-blue-700",
    accentBorder: "hover:border-blue-300",
    products: getProductsByBrand("ZIFAT999").slice(0, 4),
  },
  {
    brand: "SIFA999",
    title: "Gia đình & cá nhân",
    href: "/products?brand=SIFA999",
    accent: "text-green-600",
    accentBg: "bg-green-50",
    accentSolid: "bg-green-600 hover:bg-green-700",
    accentBorder: "hover:border-green-300",
    products: getProductsByBrand("SIFA999").slice(0, 4),
  },
] as const;

const ProductsSection = () => (
  <section className="scroll-mt-28" id="products">
    <ScrollReveal>
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4 md:mb-10 md:pb-5">
        <h2 className="section-header-line text-xs font-black uppercase tracking-[0.2em] text-primary md:text-sm md:tracking-[0.25em]">
          Sản Phẩm Nổi Bật
        </h2>
        <Link
          className="hidden items-center gap-1.5 text-[13px] font-bold text-muted-foreground transition-all hover:text-primary md:flex"
          href="/products"
        >
          Tất cả sản phẩm <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </ScrollReveal>

    <div className="space-y-10 md:space-y-14">
      {productGroups.map((group, index) => (
        <ScrollReveal key={group.brand} delay={`${index * 120}ms`}>
          <div>
            {/* Brand header row */}
            <div className="mb-5 flex items-center justify-between md:mb-6">
              <div className="flex items-center gap-3">
                <BrandLogo brand={group.brand} size="sm" />
                <div>
                  <p className={`text-[11px] font-black uppercase tracking-[0.18em] ${group.accent}`}>
                    {group.brand}
                  </p>
                  <p className="text-sm font-bold text-foreground">{group.title}</p>
                </div>
              </div>
              <Link
                href={group.href}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white transition-all ${group.accentSolid}`}
              >
                Xem tất cả
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Product grid — more spacious */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {group.products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className={`group/item flex flex-col rounded-2xl border border-border bg-card p-3 transition-all duration-200 ${group.accentBorder} hover:shadow-md sm:p-4`}
                >
                  <div className={`relative aspect-square overflow-hidden rounded-xl ${group.accentBg} p-3 sm:p-4`}>
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
                    <p className={`mt-1.5 text-sm font-black sm:text-base ${group.accent}`}>{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>

    <div className="mt-8 flex justify-center md:hidden">
      <Link
        className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-bold text-muted-foreground transition-all hover:border-primary hover:text-primary"
        href="/products"
      >
        Xem tất cả sản phẩm
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </section>
);

export default ProductsSection;
