import Image from "next/image";
import aboutImage from "@/assets/about-image.jpg";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: "2012", label: "Thành lập" },
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "HVNCLC", label: "Chứng nhận chất lượng" },
];

const AboutSection = () => (
  <section className="scroll-mt-28" id="about">
    <ScrollReveal>
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-primary">Về Chúng Tôi</h2>
        <a className="text-[13px] text-muted-foreground font-bold hover:text-primary transition-all flex items-center gap-1.5" href="#">Xem thêm →</a>
      </div>
    </ScrollReveal>

    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image column */}
        <ScrollReveal animation="fade-in-left" className="md:w-72 shrink-0">
          <div className="h-52 md:h-full w-full overflow-hidden relative">
            <Image
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              src={aboutImage}
              placeholder="blur"
              alt="Nhà máy sản xuất Phát Ngọc Anh"
              fill
              sizes="(max-width: 768px) 100vw, 288px"
            />
          </div>
        </ScrollReveal>

        {/* Content column */}
        <ScrollReveal animation="fade-in-right" className="flex-1">
          <div className="p-6 md:p-8 flex flex-col items-center text-center justify-between h-full gap-5">
            <div>
              <h3 className="text-lg md:text-xl font-black text-foreground uppercase leading-tight tracking-tight mb-3">
                PHÁT NGỌC ANH CO.,LTD — <span className="text-primary">ZIFAT 999</span>
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Thương hiệu Zifat 999 đạt chứng nhận Hàng Việt Nam chất lượng cao từ năm 2012. Quy trình sản xuất tiên tiến mang đến giải pháp tẩy rửa an toàn, hiệu quả cho mọi gia đình Việt.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4 border-t border-border pt-4 w-full">
              {stats.map((s) => (
                <div key={s.label} className="flex-1 text-center">
                  <p className="text-base font-black text-primary">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide leading-tight mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-bold text-xs hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 transition-all uppercase tracking-widest active:scale-95"
            >
              Tìm hiểu lịch sử →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default AboutSection;
