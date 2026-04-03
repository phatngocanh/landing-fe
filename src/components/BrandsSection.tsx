import Image from "next/image";
import Link from "next/link";
import { brands } from "@/data/brands";
import ScrollReveal from "./ScrollReveal";

const BrandsSection = () => (
  <section className="scroll-mt-28" id="brands">
    <ScrollReveal>
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-primary">
          Thương Hiệu
        </h2>
        <Link
          className="text-[13px] text-muted-foreground font-bold hover:text-primary transition-all flex items-center gap-1.5 group active:scale-95"
          href="/products"
        >
          Xem sản phẩm{" "}
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </ScrollReveal>

    <div className="grid md:grid-cols-2 gap-6">
      {brands.map((brand, index) => (
        <ScrollReveal
          key={brand.id}
          animation={index === 0 ? "fade-in-left" : "fade-in-right"}
        >
          <Link href={`/${brand.slug}`} className="group block h-full">
            <div
              className={`relative bg-card rounded-2xl border border-border shadow-sm overflow-hidden h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                brand.id === "zifat999"
                  ? "hover:border-emerald-500/50"
                  : "hover:border-sky-500/50"
              }`}
            >
              {/* Background gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-500 ${
                  brand.id === "zifat999"
                    ? "from-emerald-500 to-emerald-700"
                    : "from-sky-500 to-cyan-600"
                }`}
              />

              <div className="relative p-6 md:p-8">
                {/* Brand header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${
                        brand.id === "zifat999"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-sky-100 text-sky-700"
                      }`}
                    >
                      {brand.id === "zifat999" ? "Công Nghiệp" : "Gia Đình"}
                    </span>
                    <h3
                      className={`text-2xl md:text-3xl font-black tracking-tight ${
                        brand.id === "zifat999"
                          ? "text-emerald-600"
                          : "text-sky-600"
                      }`}
                    >
                      {brand.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 font-medium">
                      {brand.taglineShort}
                    </p>
                  </div>
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border border-border shadow-sm shrink-0">
                    <Image
                      src={brand.heroImage}
                      alt={brand.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="80px"
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                  {brand.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {brand.features.slice(0, 4).map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-foreground/80"
                    >
                      <span
                        className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          brand.id === "zifat999"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-sky-100 text-sky-600"
                        }`}
                      >
                        <svg
                          className="w-2.5 h-2.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    {brand.targetMarkets.length}+ thị trường mục tiêu
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all group-hover:gap-2.5 ${
                      brand.id === "zifat999"
                        ? "text-emerald-600"
                        : "text-sky-600"
                    }`}
                  >
                    Khám phá
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
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default BrandsSection;
