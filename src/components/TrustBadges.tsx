import { Truck, Package, ShieldCheck } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "GIAO HÀNG NHANH CHÓNG",
    desc: "Tiện lợi và an toàn tới tay khách hàng toàn quốc",
  },
  {
    icon: Package,
    title: "MIỄN PHÍ VẬN CHUYỂN",
    desc: "Dành cho đơn hàng giá trị từ 350.000đ trở lên",
  },
  {
    icon: ShieldCheck,
    title: "CHẤT LƯỢNG CAO CẤP",
    desc: "Sản phẩm đạt chuẩn kiểm định an toàn quốc tế",
  },
];

const TrustBadges = () => (
  <section className="container mt-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {badges.map((b) => (
        <div key={b.title} className="bg-card p-8 rounded-2xl flex items-center gap-6 border border-border shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
            <b.icon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-sm tracking-widest uppercase">{b.title}</h4>
            <p className="text-[13px] text-muted-foreground mt-1">{b.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TrustBadges;
