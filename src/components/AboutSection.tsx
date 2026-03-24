import aboutImage from "@/assets/about-image.jpg";

const AboutSection = () => (
  <section className="scroll-mt-28" id="about">
    <div className="flex items-center justify-between border-b border-border pb-5 mb-10">
      <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-primary">
        Về Chúng Tôi
      </h2>
      <a className="text-[13px] text-muted-foreground font-bold hover:text-primary transition-all flex items-center gap-1.5" href="#">
        Xem thêm →
      </a>
    </div>
    <div className="bg-card p-10 md:p-14 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row gap-16 items-center">
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-3xl font-black text-foreground uppercase mb-6 leading-tight tracking-tight">
          PHÁT NGỌC ANH CO.,LTD - <span className="text-primary">ZIFAT 999</span>
        </h3>
        <p className="text-base text-muted-foreground leading-loose mb-10">
          Thương hiệu Zifat 999 thuộc Công Ty TNHH Hóa Phẩm Phát Ngọc Anh đã tự hào đạt chứng nhận Hàng Việt Nam chất lượng cao từ năm 2012. Với quy trình sản xuất tiên tiến và kiểm soát khắt khe, chúng tôi mang đến những giải pháp tẩy rửa an toàn, hiệu quả vượt trội cho mọi gia đình Việt.
        </p>
        <button className="bg-primary text-primary-foreground px-12 py-4 rounded-full font-black text-[13px] hover:brightness-110 hover:shadow-xl hover:-translate-y-0.5 transition-all uppercase tracking-widest active:scale-95">
          Tìm hiểu lịch sử
        </button>
      </div>
      <div className="w-64 h-64 bg-muted rounded-3xl flex items-center justify-center p-4 border border-border shadow-inner rotate-3 hover:rotate-0 transition-all duration-700 shrink-0 overflow-hidden">
        <img className="w-full h-full object-cover rounded-2xl" src={aboutImage} alt="Nhà máy sản xuất" loading="lazy" width={512} height={512} />
      </div>
    </div>
  </section>
);

export default AboutSection;
