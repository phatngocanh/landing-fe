import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import combo1 from "@/assets/combo1.jpg";
import combo2 from "@/assets/combo2.jpg";

const SLIDE_DURATION = 5000; // ms per slide

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
  // progressKey is bumped every time a new slide cycle starts,
  // which forces the CSS animation to restart in perfect sync.
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Swipe / Drag state
  const dragStartX = useRef<number | null>(null);
  const dragEndX = useRef<number | null>(null);

  const goTo = useCallback((index: number, fromAutoplay = false) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    // Restart the progress bar animation
    setProgressKey((k) => k + 1);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const next = useCallback(() => {
    setCurrent((prev) => {
      const nextIndex = (prev + 1) % slides.length;
      return nextIndex;
    });
    setProgressKey((k) => k + 1);
  }, []);

  const prev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgressKey((k) => k + 1);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  // Single autoplay timer: uses setTimeout chained, not setInterval,
  // so each cycle is exactly SLIDE_DURATION after the progress bar starts.
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      next();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // progressKey change = new slide cycle started → schedule next auto-advance
  }, [progressKey, next]);

  const handleDragStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if ("touches" in e) {
      dragStartX.current = e.touches[0].clientX;
    } else {
      dragStartX.current = (e as React.MouseEvent).clientX;
    }
    dragEndX.current = null;
  }, []);

  const handleDragMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartX.current === null) return;
    if ("touches" in e) {
      dragEndX.current = e.touches[0].clientX;
    } else {
      dragEndX.current = (e as React.MouseEvent).clientX;
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    if (dragStartX.current === null || dragEndX.current === null) {
      dragStartX.current = null;
      return;
    }

    const distance = dragStartX.current - dragEndX.current;
    const SWIPE_THRESHOLD = 50; // pixels to trigger a swipe

    if (distance > SWIPE_THRESHOLD) {
      next(); // Swiped left → Next slide
    } else if (distance < -SWIPE_THRESHOLD) {
      prev(); // Swiped right → Previous slide
    }

    dragStartX.current = null;
    dragEndX.current = null;
  }, [next, prev]);

  return (
    <section className="container mt-4 md:mt-10" id="hero">
      <div 
        className="relative h-[240px] sm:h-[360px] md:h-[500px] lg:h-[580px] xl:h-[640px] md:max-h-[calc(100svh-200px)] rounded-2xl overflow-hidden shadow-2xl group select-none cursor-grab active:cursor-grabbing touch-pan-y"
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
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
            <Image
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover"
              src={slide.img}
              placeholder="blur"
              priority={i === 0}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
              quality={85}
              draggable={false}
            />
          </div>
        ))}

        {/* Overlay — left-side darkening anchors the text, bottom fade adds depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[2]" />

        {/* Text — responsive sizing */}
        <div
          className="absolute bottom-10 sm:bottom-14 md:bottom-16 left-5 sm:left-8 md:left-12 max-w-[85%] sm:max-w-lg md:max-w-2xl z-[3] transition-all duration-500"
          key={current}
          style={{ animation: "heroTextIn 0.6s ease-out forwards" }}
        >
          <span className="inline-block mb-3 md:mb-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">
            ZIFAT 999 — Hàng Việt Chất Lượng Cao
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-black mb-3 sm:mb-4 md:mb-5 leading-tight tracking-tight italic text-emerald-400 drop-shadow-lg">
            {slides[current].title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium mb-4 sm:mb-6 md:mb-8 line-clamp-2 sm:line-clamp-none drop-shadow">
            {slides[current].desc}
          </p>
          <a
            className="inline-block bg-primary text-primary-foreground px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full font-bold uppercase tracking-widest text-[11px] sm:text-xs md:text-sm hover:brightness-110 transition-all shadow-xl hover:-translate-y-1"
            href={slides[current].href}
            aria-label={`Khám phá ngay: ${slides[current].desc}`}
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
          onClick={() => goTo((current + 1) % slides.length)}
          className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-[4] w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-all hover:bg-card/40 active:scale-90"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 right-5 sm:right-8 md:right-12 flex gap-1 sm:gap-2 z-[4]">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-0 m-0 group outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 rounded-full"
            >
              <div
                className={`h-2.5 md:h-3 rounded-full shadow-sm transition-all duration-300 ${
                  i === current
                    ? "w-6 md:w-8 bg-primary-foreground"
                    : "w-2.5 md:w-3 bg-primary-foreground/40 group-hover:bg-primary-foreground/60"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Progress bar — animation restarts in sync with each slide via progressKey */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-primary-foreground/10 z-[4]">
          <div
            key={progressKey}
            className="h-full bg-primary"
            style={{
              animation: `heroProgress ${SLIDE_DURATION}ms linear forwards`,
              width: "100%",
              transformOrigin: "left",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
