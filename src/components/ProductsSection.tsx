import { ShoppingCart, Eye } from "lucide-react";
import Image from "next/image";
import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import product3 from "@/assets/product3.jpg";
import product4 from "@/assets/product4.jpg";
import ScrollReveal from "./ScrollReveal";

const products = [
  { img: product1, name: "Bóng Vỏ Xe Siêu Đặc ZIFAT 999", price: "100.000đ", badge: null },
  { img: product2, name: "Nước Tẩy Máy Cao Cấp ZIFAT 999", price: "60.000đ", badge: "Mới" },
  { img: product3, name: "Nước Tẩy Gạch Men & Đồ Sứ", price: "38.000đ", badge: null },
  { img: product4, name: "Nước Lau Sàn Kháng Khuẩn", price: "45.000đ", badge: "Bán chạy" },
];

const ProductsSection = () => (
  <section className="scroll-mt-28" id="products">
    <ScrollReveal>
      <div className="flex items-center justify-between border-b border-border pb-4 md:pb-5 mb-5 md:mb-10">
        <h2 className="section-header-line text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-primary">Danh Mục ZIFAT 999</h2>
        <a className="text-[12px] md:text-[13px] text-muted-foreground font-bold hover:text-primary transition-all flex items-center gap-1.5 group" href="#">
          Tất cả <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </ScrollReveal>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-5 md:gap-8">
      {products.map((p, i) => (
        <ScrollReveal key={p.name} delay={`${i * 100}ms`}>
          <div className="bg-card border border-border p-3 sm:p-6 rounded-xl sm:rounded-3xl text-center product-card group cursor-pointer h-full relative">
            {p.badge && (
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-primary text-primary-foreground text-[8px] sm:text-[10px] font-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">{p.badge}</div>
            )}
            <div className="aspect-square mb-3 sm:mb-6 bg-muted rounded-lg sm:rounded-2xl p-3 sm:p-6 flex items-center justify-center overflow-hidden relative">
              <Image className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" src={p.img} alt={p.name} placeholder="blur" width={512} height={512} />
              {/* Hover actions — desktop only */}
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
          </div>
        </ScrollReveal>
      ))}
    </div>
    <div className="flex justify-center mt-8 md:mt-16 gap-2 md:gap-3">
      {[1, 2, 3].map((n) => (
        <button
          key={n}
          aria-label={`Trang ${n}`}
          className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-all hover:-translate-y-1 ${
            n === 1
              ? "border-2 border-primary bg-primary text-primary-foreground shadow-lg"
              : "border border-border text-muted-foreground bg-card hover:border-primary hover:text-primary"
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  </section>
);

export default ProductsSection;
