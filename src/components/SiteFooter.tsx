import { Phone, MapPin, Mail, MessageCircle, Star, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  { name: "Chị Hương", loc: "Q.7, TP.HCM", text: "Dùng Zifat 999 hơn 5 năm rồi, chất lượng rất ổn định. Nước lau sàn thơm mà không gây kích ứng da." },
  { name: "Anh Minh", loc: "Bình Dương", text: "Sản phẩm SIFA999 dịu nhẹ, an toàn cho con nhỏ mà vẫn tẩy sạch hiệu quả. Rất yên tâm." },
];

const SiteFooter = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-footer-bg pt-12 md:pt-24 pb-8 md:pb-12 text-footer-foreground scroll-mt-28" id="footer">
      <div className="container">
        <ScrollReveal>
          <div className="bg-footer-foreground/5 rounded-2xl md:rounded-3xl p-6 md:p-10 mb-10 md:mb-20 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 border border-footer-foreground/10">
            <div className="flex items-center gap-4 md:gap-8">
              <div className="relative w-14 h-14 md:w-24 md:h-24 shrink-0">
                <div className="w-full h-full rounded-full bg-emerald-400/20 border-2 md:border-4 border-footer-foreground/10 shadow-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 md:w-10 md:h-10 text-emerald-400" />
                </div>
                <div className="absolute bottom-0 right-0 md:bottom-1 md:right-1 w-4 h-4 md:w-6 md:h-6 bg-emerald-500 border-2 md:border-4 border-footer-bg rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="text-base md:text-2xl font-black uppercase tracking-tight text-white">Hỗ Trợ 24/7</h3>
                <p className="text-footer-foreground/70 text-xs md:text-sm mt-0.5 md:mt-1">
                  Đội ngũ luôn sẵn sàng tư vấn cho bạn.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-6 w-full md:w-auto">
              <a href="tel:02862713214" className="text-xl md:text-3xl font-black text-footer-foreground tracking-tighter hover:text-emerald-400 transition-colors">0286.271.3214</a>
              <div className="flex gap-2 md:gap-4 w-full sm:w-auto">
                <button aria-label="Nhắn qua Zalo" className="flex-1 sm:flex-none bg-[hsl(210,100%,40%)] text-white px-5 md:px-8 py-3 md:py-4 rounded-full text-[12px] md:text-[13px] font-bold btn-hover-effect flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 min-h-[44px]">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" /> Zalo
                </button>
                <button aria-label="Trang Fanpage" className="flex-1 sm:flex-none bg-[hsl(220,89%,35%)] text-white px-5 md:px-8 py-3 md:py-4 rounded-full text-[12px] md:text-[13px] font-bold btn-hover-effect flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 min-h-[44px]">
                  Fanpage
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-10 md:mb-20 border-b border-footer-foreground/5 pb-10 md:pb-20">
          <div className="space-y-6 md:space-y-10 col-span-2 md:col-span-1">
            <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight text-white">
              Phát Ngọc Anh
            </h4>
            <ul className="space-y-3 md:space-y-5 text-[13px] md:text-[14px] text-footer-foreground/80">
              <li className="flex items-start gap-3 md:gap-4">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 shrink-0" />
                <span>430/33 TA 28, KP 2, P. Thới An, Q. 12, TP.HCM</span>
              </li>
              <li className="flex items-center gap-3 md:gap-4">
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 shrink-0" />
                <a href="tel:02862713214" className="font-bold text-footer-foreground text-base md:text-lg hover:text-emerald-400 transition-colors">0286.271.3214</a>
              </li>
              <li className="flex items-center gap-3 md:gap-4">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 shrink-0" />
                <a href="mailto:hoaphamphatngocanh@gmail.com" className="hover:text-white transition-colors break-all text-[12px] md:text-[14px] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none">hoaphamphatngocanh@gmail.com</a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-2 text-[12px] md:text-[13px] font-bold text-emerald-400 hover:text-white group transition-colors"
            >
              Gửi yêu cầu liên hệ
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-6 md:space-y-10">
            <h4 className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] text-emerald-400">Thương Hiệu</h4>
            <ul className="space-y-3 md:space-y-4 text-[13px] md:text-[14px] text-footer-foreground/80">
              <li><Link className="hover:text-white hover:translate-x-1 inline-block transition-all" href="/brands">Tất cả thương hiệu</Link></li>
              <li><Link className="hover:text-white hover:translate-x-1 inline-block transition-all" href="/zifat999">ZIFAT999 — Công nghiệp</Link></li>
              <li><Link className="hover:text-white hover:translate-x-1 inline-block transition-all" href="/sifa999">SIFA999 — Gia đình</Link></li>
              <li><Link className="hover:text-white hover:translate-x-1 inline-block transition-all" href="/products">Tất cả sản phẩm</Link></li>
              <li><Link className="hover:text-white hover:translate-x-1 inline-block transition-all" href="/about">Về chúng tôi</Link></li>
            </ul>
          </div>

          <div className="space-y-6 md:space-y-10 col-span-2 md:col-span-1">
            <h4 className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] text-emerald-400">Đăng Ký Bản Tin</h4>
            <p className="text-[13px] md:text-[14px] text-footer-foreground/80 leading-relaxed">
              Nhận ưu đãi độc quyền và sản phẩm mới nhất.
            </p>
            <div className="flex gap-2 md:flex-col md:gap-4">
              <input
                className="flex-1 bg-footer-foreground/10 border border-footer-foreground/20 text-sm focus:ring-emerald-400 focus:border-emerald-400 rounded-full px-4 md:px-6 py-3 md:py-4 text-footer-foreground placeholder:text-footer-foreground/50 transition-all outline-none"
                placeholder="Email của bạn..."
                aria-label="Địa chỉ email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button aria-label="Xác nhận đăng ký" className="bg-emerald-700 text-white px-5 md:px-0 py-3 md:py-4 rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.25em] hover:brightness-125 transition-all shadow-lg active:scale-95 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 min-h-[44px]">
                Đăng Ký
              </button>
            </div>
          </div>

          <div className="hidden md:block space-y-10">
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-emerald-400">Khách Hàng Nói Gì</h4>
            <div className="space-y-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-footer-foreground/10 rounded-2xl p-5 border border-footer-foreground/10">
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-[13px] text-footer-foreground/90 leading-relaxed mb-3 line-clamp-3">&quot;{t.text}&quot;</p>
                  <p className="text-[12px] font-bold text-white">{t.name} <span className="text-footer-foreground/60 font-normal">— {t.loc}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-10 text-[10px] md:text-[11px] uppercase font-bold tracking-[0.15em] md:tracking-[0.25em] text-footer-foreground/60">
          <p>© 2025 PHÁT NGỌC ANH</p>
          <div className="flex gap-4 md:gap-10">
            <Link className="hover:text-white transition-colors" href="/">Trang chủ</Link>
            <Link className="hover:text-white transition-colors" href="/brands">Thương hiệu</Link>
            <Link className="hover:text-white transition-colors" href="/products">Sản phẩm</Link>
            <Link className="hover:text-white transition-colors" href="/about">Giới thiệu</Link>
            <Link className="hover:text-white transition-colors" href="/contact">Liên hệ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
