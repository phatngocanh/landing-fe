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
    accentSolid: "bg-blue-600 hover:bg-blue-700",
    products: getProductsByBrand("ZIFAT999").slice(0, 4),
  },
  {
    brand: "SIFA999",
    title: "Gia đình & cá nhân",
    href: "/products?brand=SIFA999",
    accent: "text-green-600",
    accentSolid: "bg-green-600 hover:bg-green-700",
    products: getProductsByBrand("SIFA999").slice(0, 4),
  },
] as const;

const ProductsSection = () => (
  <section className="scroll-mt-28" id="products">
    <ScrollReveal>
      <div className="mb-5 flex items-center justify-between border-b border-border pb-4 md:mb-10 md:pb-5">
        <div>
          <h2 className="section-header-line text-xs font-black uppercase tracking-[0.2em] text-primary md:text-sm md:tracking-[0.25em]">
            Sản Phẩm Theo Thương Hiệu
          </h2>
        </div>
        <Link
          className="hidden items-center gap-1.5 text-[12px] font-bold text-muted-foreground transition-all hover:text-primary md:flex"
          href="/products"
        >
          Tất cả <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </ScrollReveal>

    <div className="divide-y divide-border">
      {productGroups.map((group, index) => (
        <ScrollReveal key={group.brand} delay={`${index * 120}ms`}>
          <div className="py-8 first:pt-2 last:pb-2">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
              <div className="flex shrink-0 items-center gap-4 lg:w-[min(220px,100%)] lg:flex-col lg:items-stretch">
                <BrandLogo brand={group.brand} size="sm" className="lg:self-start" />
                <div className="min-w-0 flex-1">
                  <p className={`text-[11px] font-black uppercase tracking-[0.18em] ${group.accent}`}>
                    {group.brand}
                  </p>
                  <p className="mt-1 text-sm font-bold text-foreground">{group.title}</p>
                  <Link
                    href={group.href}
                    className={`mt-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold text-white transition-all ${group.accentSolid}`}
                  >
                    Xem danh mục
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid min-w-0 flex-1 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {group.products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group/item flex flex-col rounded-xl border border-border/80 bg-card/50 p-2.5 transition-all hover:border-primary/25 hover:bg-card hover:shadow-sm sm:p-3"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/60 p-2 sm:p-2.5">
                      <Image
                        src={product.img}
                        alt={product.name}
                        width={200}
                        height={200}
                        placeholder="blur"
                        className="h-full w-full object-contain transition-transform duration-300 group-hover/item:scale-105"
                      />
                    </div>
                    <h3 className="mt-2 line-clamp-2 min-h-[2.5rem] text-xs font-bold leading-snug text-foreground sm:text-[13px] sm:min-h-[2.75rem]">
                      {product.name}
                    </h3>
                    <p className={`mt-1 text-xs font-black sm:text-[13px] ${group.accent}`}>{product.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>

    <div className="mt-6 flex justify-end md:hidden">
      <Link
        className="flex items-center gap-1.5 text-[12px] font-bold text-muted-foreground transition-all hover:text-primary"
        href="/products"
      >
        Tất cả <span className="group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </div>
  </section>
);

export default ProductsSection;
