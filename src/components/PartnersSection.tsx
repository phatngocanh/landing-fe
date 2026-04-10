import { Building2, Store, GraduationCap, Hotel, Factory, Car, Handshake, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const partnerTypes = [
  { icon: Factory, label: "Nhà máy sản xuất" },
  { icon: Building2, label: "Tòa nhà văn phòng" },
  { icon: Store, label: "Chuỗi bán lẻ" },
  { icon: Hotel, label: "Khách sạn & Resort" },
  { icon: GraduationCap, label: "Trường học" },
  { icon: Car, label: "Gara & Rửa xe" },
];

const PartnersSection = () => (
  <section className="container py-12 md:py-20 border-t border-border">
    <ScrollReveal>
      <div className="text-center mb-8 md:mb-12">
        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-3">
          Đối Tác & Khách Hàng Chiến Lược
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Phát Ngọc Anh tự hào đồng hành cùng hàng trăm doanh nghiệp và đại lý trên toàn quốc.
        </p>
      </div>
    </ScrollReveal>

    <ScrollReveal>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-6">
        {partnerTypes.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2.5 py-4 md:py-6 px-3 rounded-2xl bg-muted/50 border border-border/50 hover:border-primary/20 hover:bg-primary/5 transition-all"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-card flex items-center justify-center shadow-sm">
              <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <span className="text-[11px] md:text-xs font-bold text-muted-foreground text-center leading-tight">
              {label}
            </span>
          </div>
        ))}
      </div>
    </ScrollReveal>

    <ScrollReveal>
      <div className="text-center mt-8 md:mt-12">
        <Link
          href="/contact?subject=partnership"
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base hover:brightness-110 transition-all active:scale-95 shadow-lg group"
        >
          <Handshake className="w-5 h-5" />
          <span>Trở Thành Đại Lý / Đối Tác</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <p className="text-xs text-muted-foreground mt-3">
          Liên hệ ngay để nhận báo giá sỉ và chính sách đại lý hấp dẫn
        </p>
      </div>
    </ScrollReveal>
  </section>
);

export default PartnersSection;
