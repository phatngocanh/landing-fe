import { Eye, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import ScrollReveal from "./ScrollReveal";

const displayCombos = products.filter(p => p.category === "Combo ưu đãi").slice(0, 4);

const ComboSection = () => (
  <section className="scroll-mt-28" id="combo">
    <ScrollReveal>
      <div className="flex items-center justify-between border-b border-border pb-4 md:pb-5 mb-5 md:mb-10">
        <h2 className="section-header-line text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-primary">Ưu Đãi Combo</h2>
        <Link
          href="/products?category=Combo+%C6%B0u+%C4%91%C3%A3i"
          className="text-[12px] md:text-[13px] text-muted-foreground font-bold hover:text-primary transition-all flex items-center gap-1.5 group active:scale-95"
        >
          Xem thêm <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </ScrollReveal>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-8">
      {displayCombos.map((c, i) => (
        <ScrollReveal key={c.id} delay={`${i * 100}ms`}>
          <Link href={`/product/${c.id}`} className="bg-card rounded-xl sm:rounded-3xl overflow-hidden product-card group h-full block">
            <div className="relative aspect-square p-2 sm:p-6 bg-muted flex items-center justify-center overflow-hidden">
              <Image className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" src={c.img} alt={c.name} placeholder="blur" width={512} height={512} />
              <div className="absolute top-1.5 left-1.5 sm:top-4 sm:left-4 bg-secondary text-secondary-foreground text-[8px] sm:text-[11px] font-black px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-full shadow-xl">{c.discount}</div>
              {c.badge && (
                <div className="absolute top-1.5 right-1.5 sm:top-4 sm:right-4 bg-primary text-primary-foreground text-[8px] sm:text-[10px] font-black px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-full">{c.badge}</div>
              )}
              {/* Quick action overlay — desktop only */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 hidden sm:flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <button className="w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center text-foreground hover:text-primary hover:scale-110 transition-all translate-y-4 group-hover:translate-y-0 duration-300" aria-label={`Xem nhanh: ${c.name}`}>
                  <Eye className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center text-primary-foreground hover:scale-110 transition-all translate-y-4 group-hover:translate-y-0 duration-500" aria-label={`Thêm vào giỏ: ${c.name}`}>
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-2.5 sm:p-5 lg:p-6 text-center">
              <h3 className="text-[10px] sm:text-[13px] lg:text-[15px] font-bold overflow-hidden mb-1.5 sm:mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">{c.name}</h3>
              <div className="flex flex-col items-center gap-0">
                <span className="text-secondary font-black text-sm sm:text-xl lg:text-2xl">{c.price}</span>
                <span className="text-muted-foreground text-[9px] sm:text-xs line-through">{c.oldPrice}</span>
              </div>
              <button className="mt-2 sm:mt-5 w-full bg-foreground text-card py-2 sm:py-3.5 rounded-full text-[9px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-widest hover:bg-primary hover:text-primary-foreground transition-all active:scale-95 shadow-md hover:shadow-lg" aria-label={`Mua ngay: ${c.name}`}>Mua ngay</button>
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default ComboSection;
