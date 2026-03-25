import { Truck, Package, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const badges = [
  { icon: Truck, title: "GIAO HÀNG NHANH", desc: "An toàn tới tay khách hàng toàn quốc" },
  { icon: Package, title: "MIỄN PHÍ VẬN CHUYỂN", desc: "Đơn hàng từ 350.000đ trở lên" },
  { icon: ShieldCheck, title: "CHẤT LƯỢNG CAO CẤP", desc: "Đạt chuẩn kiểm định quốc tế" },
];

const TrustBadges = () => (
  <section className="container mt-6 md:mt-12">
    <div className="grid grid-cols-3 gap-2 md:gap-8">
      {badges.map((b, i) => (
        <ScrollReveal key={b.title} delay={`${i * 100}ms`} className="h-full">
          {/* Mobile card */}
          <div className="md:hidden h-full flex flex-col items-center text-center gap-2 bg-card border border-border rounded-2xl px-2 py-4 shadow-sm">
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <b.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-[9px] tracking-wider uppercase leading-tight">{b.title}</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5 leading-snug">{b.desc}</p>
            </div>
          </div>

          {/* Desktop card */}
          <div className="hidden md:flex h-full flex-col items-center text-center gap-4 bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300 shrink-0">
              <b.icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm tracking-widest uppercase">{b.title}</h3>
              <p className="text-[13px] text-muted-foreground mt-1">{b.desc}</p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default TrustBadges;
