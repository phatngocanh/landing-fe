import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="container mt-10" id="hero">
      <div className="relative h-[400px] md:h-[540px] rounded-2xl overflow-hidden shadow-2xl group">
        <img
          alt="Sản phẩm hóa phẩm chất lượng cao Phát Ngọc Anh"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          src={heroBanner}
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="absolute bottom-16 left-8 md:left-12 text-primary-foreground max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight italic">
            Chất Lượng Việt
            <br />
            Cho Người Việt
          </h2>
          <p className="text-lg text-primary-foreground/90 font-medium mb-8">
            Đồng hành cùng gia đình Việt trong việc bảo vệ không gian sống sạch khuẩn và an toàn tuyệt đối.
          </p>
          <a
            className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-xl hover:-translate-y-1"
            href="#products"
          >
            Khám phá ngay
          </a>
        </div>
        <div className="absolute bottom-8 right-12 flex gap-4">
          <div className="w-3 h-3 rounded-full bg-primary-foreground shadow-sm cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-primary-foreground/40 shadow-sm cursor-pointer hover:bg-primary-foreground/60 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-primary-foreground/40 shadow-sm cursor-pointer hover:bg-primary-foreground/60 transition-colors" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
