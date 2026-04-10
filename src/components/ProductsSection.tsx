import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

import ScrollReveal from "./ScrollReveal";

const displayProducts = products.slice(0, 8);

const ProductsSection = () => (
  <section className="scroll-mt-28" id="products">
    <ScrollReveal>
      <div className="flex items-center justify-between border-b border-border pb-4 md:pb-5 mb-5 md:mb-10">
        <h2 className="section-header-line text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-primary">Danh Mục ZIFAT 999</h2>
        <Link className="text-[12px] md:text-[13px] text-muted-foreground font-bold hover:text-primary transition-all flex items-center gap-1.5 group" href="/products">
          Tất cả <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </ScrollReveal>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
      {displayProducts.map((p, i) => (
        <ScrollReveal key={p.id} delay={`${i * 50}ms`}>
          <Link href={`/product/${p.id}`} className="bg-card border border-border p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl text-center product-card group cursor-pointer h-full relative block">
            {p.badge && (
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-10 bg-primary text-primary-foreground text-[10px] sm:text-[11px] font-black px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full">{p.badge}</div>
            )}
            <div className="aspect-square mb-1.5 sm:mb-2 bg-muted rounded-md sm:rounded-lg p-1.5 sm:p-2 flex items-center justify-center overflow-hidden relative">
              <Image className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" src={p.img} alt={p.name} placeholder="blur" width={400} height={400} />
            </div>
            <h3 className="text-[11px] sm:text-xs md:text-[13px] font-bold text-foreground h-7 sm:h-8 overflow-hidden line-clamp-2 leading-snug group-hover:text-primary transition-colors">{p.name}</h3>
            <p className="text-secondary font-black text-xs sm:text-sm md:text-base mt-1 sm:mt-1.5">{p.price}</p>
          </Link>
        </ScrollReveal>
      ))}
    </div>
    <div className="flex justify-center mt-8 md:mt-16">
      <Link
        className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-bold text-muted-foreground transition-all hover:border-primary hover:text-primary active:scale-95"
        href="/products"
      >
        Xem tất cả sản phẩm
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </section>
);

export default ProductsSection;
