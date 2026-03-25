import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import combo1 from "@/assets/combo1.jpg";
import combo2 from "@/assets/combo2.jpg";

const slides = [
  {
    img: heroBanner,
    title: <>Chất Lượng Việt<br />Cho Người Việt</>,
    desc: "Đồng hành cùng gia đình Việt trong việc bảo vệ không gian sống sạch khuẩn và an toàn tuyệt đối.",
    cta: "Khám phá ngay",
    href: "#products",
  },
  {
    img: combo1,
    title: <>Ưu Đãi Combo<br />Tiết Kiệm Hơn</>,
    desc: "Mua combo tiết kiệm lên đến 15% — dọn sạch mọi ngóc ngách chỉ với một lần đặt hàng.",
    cta: "Xem combo",
    href: "#combo",
  },
  {
    img: combo2,
    title: <>Thương Hiệu<br />Được Tin Dùng</>,
    desc: "Hơn 12 năm đạt danh hiệu Hàng Việt Nam Chất Lượng Cao — sự lựa chọn hàng đầu.",
    cta: "Tìm hiểu thêm",
    href: "#about",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="container mt-4 md:mt-10" id="hero">
      <div className="relative h-[280px] sm:h-[360px] md:h-[540px] rounded-2xl overflow-hidden shadow-2xl group">
        {/* Slides */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-all duration-700 ease-in-out"
            style={{
              opacity: i === current ? 1 : 0,
              transform: i === current ? "scale(1)" : "scale(1.05)",
              zIndex: i === current ? 1 : 0,
            }}
          >
            <img
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover"
              src={slide.img}
              width={1920}
              height={800}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent z-[2]" />

        {/* Text — responsive sizing */}
        <div
          className="absolute bottom-10 sm:bottom-14 md:bottom-16 left-5 sm:left-8 md:left-12 text-primary-foreground max-w-[85%] sm:max-w-lg md:max-w-2xl z-[3] transition-all duration-500"
          key={current}
          style={{ animation: "heroTextIn 0.6s ease-out forwards" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-black mb-3 sm:mb-4 md:mb-6 leading-tight tracking-tight italic">
            {slides[current].title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90 font-medium mb-4 sm:mb-6 md:mb-8 line-clamp-2 sm:line-clamp-none">
            {slides[current].desc}
          </p>
          <a
            className="inline-block bg-primary text-primary-foreground px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full font-bold uppercase tracking-widest text-[11px] sm:text-xs md:text-sm hover:brightness-110 transition-all shadow-xl hover:-translate-y-1"
            href={slides[current].href}
          >
            {slides[current].cta}
          </a>
        </div>

        {/* Arrows — hidden on mobile for cleaner UX, swipe is intuitive */}
        <button
          onClick={prev}
          className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-[4] w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-all hover:bg-card/40 active:scale-90"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-[4] w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-all hover:bg-card/40 active:scale-90"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 right-5 sm:right-8 md:right-12 flex gap-2 md:gap-3 z-[4]">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 md:h-3 rounded-full shadow-sm transition-all duration-300 ${
                i === current
                  ? "w-6 md:w-8 bg-primary-foreground"
                  : "w-2.5 md:w-3 bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-primary-foreground/10 z-[4]">
          <div
            className="h-full bg-primary transition-none"
            style={{
              animation: `heroProgress 5s linear infinite`,
              width: "100%",
              transformOrigin: "left",
            }}
            key={`progress-${current}`}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
