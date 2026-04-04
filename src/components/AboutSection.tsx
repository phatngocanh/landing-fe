import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import aboutImage from "@/assets/about-image.jpg";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: "2012", label: "Thành lập" },
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "2", label: "Thương hiệu" },
  { value: "HVNCLC", label: "Chứng nhận" },
];

const AboutSection = () => (
  <section className="scroll-mt-28" id="about">
    <ScrollReveal>
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-primary">Về Chúng Tôi</h2>
        <Link className="text-[13px] text-muted-foreground font-bold hover:text-primary transition-all flex items-center gap-1.5 group active:scale-95" href="/about">Xem thêm <span className="group-hover:translate-x-1 transition-transform">→</span></Link>
      </div>
    </ScrollReveal>

    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row">
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

        <ScrollReveal animation="fade-in-right" className="flex-1">
          <div className="p-6 md:p-8 flex flex-col items-center text-center justify-between h-full gap-5">
            <div>
              <h3 className="text-lg md:text-xl font-black text-foreground uppercase leading-tight tracking-tight mb-3">
                Công Ty TNHH Hóa Phẩm<br /><span className="text-primary">Phát Ngọc Anh</span>
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Phát Ngọc Anh tự hào sở hữu hai thương hiệu hóa phẩm hàng đầu: <strong className="text-blue-600">ZIFAT999</strong> cho giải pháp công nghiệp và <strong className="text-green-600">SIFA999</strong> cho chăm sóc gia đình. Đạt chứng nhận Hàng Việt Nam chất lượng cao từ năm 2012.
              </p>
            </div>

            <div className="flex gap-4 border-t border-border pt-4 w-full">
              {stats.map((s) => (
                <div key={s.label} className="flex-1 text-center">
                  <p className="text-base font-black text-primary">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide leading-tight mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold text-xs hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 transition-all uppercase tracking-widest active:scale-95 md:px-7 md:py-3 md:text-sm"
            >
              Tìm hiểu thêm
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 md:h-4 md:w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default AboutSection;
