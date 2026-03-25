import { Play, Newspaper, ThumbsUp } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import ScrollReveal from "./ScrollReveal";

const NewsSection = () => (
  <ScrollReveal>
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 bg-card p-5 md:p-14 rounded-2xl md:rounded-3xl border border-border shadow-sm scroll-mt-28" id="news">
      <div className="space-y-4 md:space-y-8">
        <div className="flex items-center gap-3 text-foreground font-black uppercase text-[11px] md:text-[12px] tracking-[0.2em] border-b border-border pb-4 md:pb-5">
          <Play className="w-4 h-4 md:w-5 md:h-5 text-primary" /> Video Hoạt Động
        </div>
        <div className="aspect-video bg-foreground rounded-xl md:rounded-2xl overflow-hidden relative group cursor-pointer shadow-xl">
          <img className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" src={heroBanner.src} alt="Video giới thiệu Phát Ngọc Anh" loading="lazy" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-card/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-500 shadow-2xl border border-card/30">
              <Play className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground fill-current" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 md:space-y-8">
        <div className="flex items-center gap-3 text-foreground font-black uppercase text-[11px] md:text-[12px] tracking-[0.2em] border-b border-border pb-4 md:pb-5">
          <Newspaper className="w-4 h-4 md:w-5 md:h-5 text-primary" /> Tin Tức Mới Nhất
        </div>
        <div className="space-y-4 md:space-y-7">
          <div className="flex gap-4 md:gap-5 group cursor-pointer items-start">
            <img className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg md:rounded-xl shadow-sm border border-border shrink-0 group-hover:shadow-md transition-shadow" src={product1.src} alt="Bí kíp chọn nước lau sàn" loading="lazy" />
            <p className="text-[13px] md:text-[14px] leading-snug font-bold text-foreground/80 group-hover:text-primary transition-colors line-clamp-3">
              7 bí kíp lựa chọn nước lau sàn an toàn cho trẻ nhỏ trong nhà.
            </p>
          </div>
          <div className="flex gap-4 md:gap-5 group cursor-pointer items-start">
            <img className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg md:rounded-xl shadow-sm border border-border shrink-0 group-hover:shadow-md transition-shadow" src={product2.src} alt="Giải pháp tẩy rửa công nghiệp" loading="lazy" />
            <p className="text-[13px] md:text-[14px] leading-snug font-bold text-muted-foreground group-hover:text-primary transition-colors line-clamp-3">
              Giải pháp tẩy rửa công nghiệp quy mô lớn tối ưu chi phí.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 md:space-y-8">
        <div className="flex items-center gap-3 text-foreground font-black uppercase text-[11px] md:text-[12px] tracking-[0.2em] border-b border-border pb-4 md:pb-5">
          <ThumbsUp className="w-4 h-4 md:w-5 md:h-5 text-primary" /> Kết Nối Facebook
        </div>
        <div className="bg-muted border border-border rounded-xl md:rounded-2xl p-5 md:p-8 text-center">
          <p className="text-[14px] md:text-[15px] font-bold mb-1 text-foreground">Công Ty TNHH Phát Ngọc Anh</p>
          <p className="text-xs text-muted-foreground mb-5 md:mb-8">7.2k người theo dõi trang</p>
          <button className="bg-card text-foreground px-6 md:px-8 py-3 md:py-3.5 text-[11px] font-black rounded-full flex items-center gap-2 mx-auto border border-border shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all active:scale-95">
            <ThumbsUp className="w-4 h-4" /> Theo dõi ngay
          </button>
        </div>
      </div>
    </section>
  </ScrollReveal>
);

export default NewsSection;
