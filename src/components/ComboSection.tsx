import { Eye, ShoppingBag } from "lucide-react";
import combo1 from "@/assets/combo1.jpg";
import combo2 from "@/assets/combo2.jpg";
import combo3 from "@/assets/combo3.jpg";
import ScrollReveal from "./ScrollReveal";

const combos = [
  { img: combo1, title: "Combo Thông Cống Triệt Để + Bột Vi Sinh Khử Mùi", price: "99.000đ", oldPrice: "110.000đ", discount: "-10%", tag: "Bán chạy" },
  { img: combo2, title: "Combo Nước Lau Sàn Hương Hoa + Xịt Phòng Kháng Khuẩn", price: "120.000đ", oldPrice: "135.000đ", discount: "-11%", tag: "Mới" },
  { img: combo3, title: "Combo Javel Đậm Đặc + Nước Giặt Hương Nắng", price: "85.000đ", oldPrice: "90.000đ", discount: "-6%", tag: null },
];

const ComboSection = () => (
  <section className="scroll-mt-28" id="combo">
    <ScrollReveal>
      <div className="flex items-center justify-between border-b border-border pb-5 mb-10">
        <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-primary">Ưu Đãi Combo</h2>
        <a className="text-[13px] text-muted-foreground font-bold hover:text-primary transition-all flex items-center gap-1.5 group" href="#">
          Xem thêm <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </ScrollReveal>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {combos.map((c, i) => (
        <ScrollReveal key={c.title} delay={`${i * 150}ms`}>
          <div className="bg-card rounded-3xl overflow-hidden product-card group h-full">
            <div className="relative aspect-square p-8 bg-muted flex items-center justify-center overflow-hidden">
              <img className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" src={c.img} alt={c.title} loading="lazy" width={512} height={512} />
              <div className="absolute top-6 left-6 bg-secondary text-secondary-foreground text-[11px] font-black px-4 py-2 rounded-full shadow-xl">{c.discount}</div>
              {c.tag && (
                <div className="absolute top-6 right-6 bg-primary text-primary-foreground text-[10px] font-black px-3 py-1.5 rounded-full">{c.tag}</div>
              )}
              {/* Quick action overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <button className="w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center text-foreground hover:text-primary hover:scale-110 transition-all translate-y-4 group-hover:translate-y-0 duration-300" aria-label="Xem nhanh">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center text-primary-foreground hover:scale-110 transition-all translate-y-4 group-hover:translate-y-0 duration-500" aria-label="Thêm vào giỏ">
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-8 text-center">
              <h4 className="text-[15px] font-bold h-12 overflow-hidden mb-4 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-relaxed">{c.title}</h4>
              <div className="flex flex-col items-center gap-1">
                <span className="text-secondary font-black text-2xl">{c.price}</span>
                <span className="text-muted-foreground text-xs line-through">{c.oldPrice}</span>
              </div>
              <button className="mt-8 w-full bg-foreground text-card py-4 rounded-full text-[12px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all active:scale-95 shadow-md hover:shadow-lg">Mua ngay</button>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default ComboSection;
