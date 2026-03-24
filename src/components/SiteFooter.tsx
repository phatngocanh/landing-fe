import { Phone, MapPin, Mail, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  { name: "Chị Hương", loc: "Q.7, TP.HCM", text: "Dùng Zifat 999 hơn 5 năm rồi, chất lượng rất ổn định. Nước lau sàn thơm mà không gây kích ứng da." },
  { name: "Anh Minh", loc: "Bình Dương", text: "Mua combo thông cống giá rẻ mà hiệu quả bất ngờ. Giao hàng nhanh, đóng gói cẩn thận." },
];

const SiteFooter = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-footer-bg pt-24 pb-12 text-footer-foreground scroll-mt-28" id="footer">
      <div className="container">
        {/* Support banner */}
        <ScrollReveal>
          <div className="bg-footer-foreground/5 rounded-3xl p-10 mb-20 flex flex-col md:flex-row items-center justify-between gap-10 border border-footer-foreground/10">
            <div className="flex items-center gap-8">
              <div className="relative w-24 h-24 shrink-0">
                <div className="w-full h-full rounded-full bg-primary/20 border-4 border-footer-foreground/10 shadow-xl flex items-center justify-center">
                  <Phone className="w-10 h-10 text-primary" />
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-footer-bg rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Hỗ Trợ Trực Tuyến 24/7</h3>
                <p className="text-footer-foreground/50 text-sm mt-1">
                  Đội ngũ chuyên gia luôn sẵn sàng tư vấn giải pháp tốt nhất cho bạn.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="text-center md:text-right mr-4">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Hotline tư vấn</p>
                <a href="tel:02862713214" className="text-3xl font-black text-footer-foreground tracking-tighter hover:text-primary transition-colors">0286.271.3214</a>
              </div>
              <div className="flex gap-4">
                <button className="bg-[hsl(210,100%,50%)] text-footer-foreground px-8 py-4 rounded-full text-[13px] font-bold btn-hover-effect flex items-center gap-2 shadow-lg active:scale-95 transition-all">
                  <MessageCircle className="w-5 h-5" /> Chat Zalo
                </button>
                <button className="bg-[hsl(220,89%,52%)] text-footer-foreground px-8 py-4 rounded-full text-[13px] font-bold btn-hover-effect flex items-center gap-2 shadow-lg active:scale-95 transition-all">
                  Fanpage
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 border-b border-footer-foreground/5 pb-20">
          <div className="space-y-10">
            <h4 className="text-2xl font-black uppercase tracking-tighter leading-tight">
              Phát Ngọc Anh <span className="text-primary">Zifat 999</span>
            </h4>
            <ul className="space-y-5 text-[14px] text-footer-foreground/50">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary shrink-0" />
                <span>430/33 TA 28, KP 2, P. Thới An, Q. 12, TP.HCM</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-primary shrink-0" />
                <a href="tel:02862713214" className="font-bold text-footer-foreground text-lg hover:text-primary transition-colors">0286.271.3214</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-primary shrink-0" />
                <a href="mailto:hoaphamphatngocanh@gmail.com" className="hover:text-footer-foreground transition-colors">hoaphamphatngocanh@gmail.com</a>
              </li>
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-primary">Liên Kết Nhanh</h4>
            <ul className="space-y-4 text-[14px] text-footer-foreground/50">
              {["Về thương hiệu Zifat 999", "Chính sách bảo mật", "Chính sách đổi trả", "Hướng dẫn mua hàng"].map((l) => (
                <li key={l}>
                  <a className="hover:text-footer-foreground hover:translate-x-1 inline-block transition-all" href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-primary">Đăng Ký Bản Tin</h4>
            <p className="text-[14px] text-footer-foreground/50 leading-relaxed">
              Nhận ngay thông báo về ưu đãi độc quyền và các sản phẩm mới nhất.
            </p>
            <div className="flex flex-col gap-4">
              <input
                className="bg-footer-foreground/5 border border-footer-foreground/10 text-sm focus:ring-primary focus:border-primary rounded-full px-6 py-4 text-footer-foreground placeholder:text-footer-foreground/30 transition-all"
                placeholder="Địa chỉ email của bạn..."
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="bg-primary text-primary-foreground py-4 rounded-full font-black text-[11px] uppercase tracking-[0.25em] hover:brightness-110 transition-all shadow-lg active:scale-95">
                Gửi Đăng Ký
              </button>
            </div>
          </div>

          {/* Testimonials instead of fake stats */}
          <div className="space-y-10">
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-primary">Khách Hàng Nói Gì</h4>
            <div className="space-y-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-footer-foreground/5 rounded-2xl p-5 border border-footer-foreground/5">
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-[13px] text-footer-foreground/60 leading-relaxed mb-3 line-clamp-3">"{t.text}"</p>
                  <p className="text-[12px] font-bold text-footer-foreground">{t.name} <span className="text-footer-foreground/40 font-normal">— {t.loc}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-[11px] uppercase font-bold tracking-[0.25em] text-footer-foreground/30">
          <p>© 2025 PHÁT NGỌC ANH. KIẾN TẠO CUỘC SỐNG SẠCH.</p>
          <div className="flex gap-10">
            <a className="hover:text-footer-foreground transition-colors" href="#hero">Trang chủ</a>
            <a className="hover:text-footer-foreground transition-colors" href="#products">Sản phẩm</a>
            <a className="hover:text-footer-foreground transition-colors" href="#about">Giới thiệu</a>
            <a className="hover:text-footer-foreground transition-colors" href="#footer">Liên hệ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
