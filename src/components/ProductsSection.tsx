import { Eye, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";

import ScrollReveal from "./ScrollReveal";

const displayProducts = getFeaturedProducts(4);

const ProductsSection = () => (
  <section className="scroll-mt-28" id="products">
    <ScrollReveal>
      <div className="flex items-center justify-between border-b border-border pb-4 md:pb-5 mb-5 md:mb-10">
        <h2 className="section-header-line text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-primary">Sản Phẩm Nổi Bật</h2>
        <Link className="text-[12px] md:text-[13px] text-muted-foreground font-bold hover:text-primary transition-all flex items-center gap-1.5 group" href="/products">
          Tất cả <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </ScrollReveal>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-5 md:gap-8">
      {displayProducts.map((p, i) => (
        <ScrollReveal key={p.id} delay={`${i * 100}ms`}>
          <Link href={`/product/${p.id}`} className="bg-card border border-border p-3 sm:p-6 rounded-xl sm:rounded-3xl text-center product-card group cursor-pointer h-full relative block">
            {p.badge && (
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-primary text-primary-foreground text-[8px] sm:text-[10px] font-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">{p.badge}</div>
            )}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
              <span className={`text-[7px] sm:text-[9px] font-black px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full ${p.brand === "ZIFAT999" ? "bg-blue-600 text-white" : "bg-green-600 text-white"}`}>
                {p.brand === "ZIFAT999" ? "ZIFAT" : "SIFA"}
              </span>
            </div>
            <div className="aspect-square mb-3 sm:mb-6 bg-muted rounded-lg sm:rounded-2xl p-3 sm:p-6 flex items-center justify-center overflow-hidden relative">
              <Image className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" src={p.img} alt={p.name} placeholder="blur" width={512} height={512} />
              <div className="absolute inset-0 hidden sm:flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button className="w-10 h-10 rounded-full bg-card shadow-md flex items-center justify-center text-foreground hover:text-primary hover:scale-110 transition-all translate-y-3 group-hover:translate-y-0 duration-300" aria-label={`Xem nhanh: ${p.name}`}>
                  <Eye className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-primary shadow-md flex items-center justify-center text-primary-foreground hover:scale-110 transition-all translate-y-3 group-hover:translate-y-0 duration-500" aria-label={`Thêm vào giỏ: ${p.name}`}>
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-[11px] sm:text-[14px] font-bold text-foreground h-8 sm:h-11 overflow-hidden line-clamp-2 leading-snug group-hover:text-primary transition-colors">{p.name}</h3>
            <p className="text-secondary font-black text-sm sm:text-lg mt-2 sm:mt-3">{p.price}</p>
            {p.isBulkAvailable && p.bulkPriceTiers[0] && (
              <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-1">
                Sỉ từ {p.bulkPriceTiers[0].minQuantity}+: {p.bulkPriceTiers[0].price.toLocaleString("vi-VN")}đ
              </p>
            )}
          </Link>
        </ScrollReveal>
      ))}
    </div>
    <div className="flex justify-center mt-8 md:mt-16">
      <Link
        href="/brands"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-lg active:scale-95"
      >
        Xem tất cả thương hiệu →
      </Link>
    </div>
  </section>
);

export default ProductsSection;
