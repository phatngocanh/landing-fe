import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const benefits = [
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Chiết khấu cao",
    description: "Chính sách giá sỉ hấp dẫn, chiết khấu theo số lượng",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Hỗ trợ marketing",
    description: "Tài liệu bán hàng, banner, POSM miễn phí",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
    title: "Đổi trả linh hoạt",
    description: "Chính sách đổi trả hàng không đạt chất lượng",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "Đào tạo miễn phí",
    description: "Hướng dẫn sản phẩm và kỹ năng bán hàng",
  },
];

interface DistributorCTAProps {
  variant?: "default" | "compact";
}

const DistributorCTA = ({ variant = "default" }: DistributorCTAProps) => {
  if (variant === "compact") {
    return (
      <div className="bg-gradient-to-r from-primary to-emerald-700 rounded-2xl p-6 md:p-8 text-primary-foreground">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-black tracking-tight mb-2">
              Trở Thành Đại Lý Phân Phối
            </h3>
            <p className="text-primary-foreground/80 text-sm">
              Hợp tác cùng Phát Ngọc Anh - Nhà sản xuất uy tín với hơn 10 năm
              kinh nghiệm
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-bold text-sm hover:bg-primary-foreground hover:shadow-lg transition-all uppercase tracking-wider whitespace-nowrap active:scale-95"
          >
            Liên Hệ Ngay
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="scroll-mt-28" id="distributor">
      <ScrollReveal>
        <div className="bg-gradient-to-br from-foreground via-foreground to-foreground/95 rounded-2xl overflow-hidden">
          <div className="relative p-8 md:p-12">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className="relative">
              {/* Header */}
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  Cơ Hội Kinh Doanh
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-primary-foreground tracking-tight mb-4">
                  Trở Thành Đại Lý Phân Phối
                </h2>
                <p className="text-primary-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
                  Hợp tác cùng Phát Ngọc Anh - Nhà sản xuất hàng đầu với hơn 10
                  năm kinh nghiệm trong ngành hóa mỹ phẩm và chứng nhận Hàng
                  Việt Nam Chất Lượng Cao
                </p>
              </div>

              {/* Benefits grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
                {benefits.map((benefit, index) => (
                  <ScrollReveal
                    key={index}
                    animation="fade-in-up"
                    delay={index * 0.1}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all group">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        {benefit.icon}
                      </div>
                      <h4 className="text-primary-foreground font-bold text-sm mb-1.5">
                        {benefit.title}
                      </h4>
                      <p className="text-primary-foreground/60 text-xs leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-bold text-sm hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 transition-all uppercase tracking-wider active:scale-95"
                >
                  Đăng Ký Làm Đại Lý
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="tel:0913189238"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-primary-foreground px-6 py-3.5 rounded-full font-bold text-sm hover:bg-white/20 transition-all border border-white/20 active:scale-95"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  0913 189 238
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default DistributorCTA;
