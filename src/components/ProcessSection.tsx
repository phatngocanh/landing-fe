import { FlaskConical, Factory, ClipboardCheck, Truck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: FlaskConical,
    number: "01",
    title: "Nghiên Cứu & Phát Triển",
    desc: "Đội ngũ R&D phát triển công thức tiên tiến, an toàn và hiệu quả cho từng dòng sản phẩm.",
  },
  {
    icon: Factory,
    number: "02",
    title: "Sản Xuất",
    desc: "Nhà máy đạt chuẩn GMP với dây chuyền hiện đại, kiểm soát chất lượng nghiêm ngặt.",
  },
  {
    icon: ClipboardCheck,
    number: "03",
    title: "Kiểm Nghiệm",
    desc: "Mỗi lô sản phẩm qua kiểm nghiệm đa tầng: vi sinh, hóa lý, da liễu theo chuẩn quốc tế.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Phân Phối",
    desc: "Hệ thống phân phối phủ sóng 64 tỉnh thành, giao hàng nhanh chóng đến tay khách hàng.",
  },
];

const ProcessSection = () => (
  <section className="scroll-mt-28">
    <ScrollReveal>
      <div className="flex items-end justify-between border-b border-border pb-4 mb-8 md:mb-12">
        <div>
          <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-primary">
            Quy Trình Sản Xuất
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1.5">
            Từ phòng nghiên cứu đến tay người dùng — chất lượng được đảm bảo ở mỗi bước.
          </p>
        </div>
      </div>
    </ScrollReveal>

    <div className="relative">
      {/* Connecting line — desktop only */}
      <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
        {steps.map((step, i) => (
          <ScrollReveal key={step.number} delay={`${i * 120}ms`}>
            <div className="relative flex flex-col items-center text-center group">
              <div className="relative z-10 mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/5 border-2 border-primary/20 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 transition-all duration-300">
                  <step.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                </div>
              </div>

              <h4 className="text-xs md:text-sm font-bold text-foreground mb-1.5 uppercase tracking-wide">
                {step.title}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
