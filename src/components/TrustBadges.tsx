import { Truck, Package, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const badges = [
  { icon: Truck, title: "GIAO HÀNG NHANH", desc: "An toàn tới tay khách hàng toàn quốc" },
  { icon: Package, title: "MIỄN PHÍ VẬN CHUYỂN", desc: "Đơn hàng từ 350.000đ trở lên" },
  { icon: ShieldCheck, title: "CHẤT LƯỢNG CAO CẤP", desc: "Đạt chuẩn kiểm định quốc tế" },
];

const TrustBadges = () => (
  <section className="mt-6 md:mt-12 md:container">
    {/* Mobile: horizontal scroll strip */}
    <div className="relative md:hidden">
      {/* Fade hint on right edge */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 pb-2">
        {badges.map((b) => (
          <div
            key={b.title}
            className="bg-card px-4 py-4 rounded-xl flex flex-row items-center gap-3 border border-border shadow-sm shrink-0 snap-start"
            style={{ width: "78vw", maxWidth: "300px" }}
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <b.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-foreground text-[11px] tracking-wider uppercase leading-tight">{b.title}</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{b.desc}</p>
            </div>
          </div>
        ))}
        {/* Trailing spacer so last card isn't flush against edge */}
        <div className="shrink-0 w-4" />
      </div>
      {/* Scroll dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {badges.map((b, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-primary/30 inline-block" />
        ))}
      </div>
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
