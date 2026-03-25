import { Truck, Package, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const badges = [
  { icon: Truck, title: "GIAO HÀNG NHANH", desc: "An toàn tới tay khách hàng toàn quốc" },
  { icon: Package, title: "MIỄN PHÍ VẬN CHUYỂN", desc: "Đơn hàng từ 350.000đ trở lên" },
  { icon: ShieldCheck, title: "CHẤT LƯỢNG CAO CẤP", desc: "Đạt chuẩn kiểm định quốc tế" },
];

const TrustBadges = () => (
  <section className="container mt-6 md:mt-12">
    {/* Mobile: horizontal scroll strip */}
    <div className="flex md:hidden gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 pb-2 justify-center">
      {badges.map((b) => (
        <div
          key={b.title}
          className="bg-card px-4 py-3 rounded-xl flex flex-col items-center text-center gap-2 border border-border shadow-sm shrink-0 snap-start min-w-[260px]"
        >
          <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
            <b.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-[11px] tracking-wider uppercase leading-tight">{b.title}</h4>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{b.desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Desktop: grid */}
    <div className="hidden md:grid grid-cols-3 gap-8">
      {badges.map((b, i) => (
        <ScrollReveal key={b.title} delay={`${i * 100}ms`}>
          <div className="bg-card p-8 rounded-2xl flex flex-col items-center text-center gap-4 border border-border shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center">
              <b.icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm tracking-widest uppercase">{b.title}</h4>
              <p className="text-[13px] text-muted-foreground mt-1">{b.desc}</p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default TrustBadges;
