import { Quote, Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    name: "Chị Lan Anh",
    role: "Nội trợ",
    location: "Q.Bình Thạnh, TP.HCM",
    text: "Dùng nước lau sàn ZIFAT 999 cho nhà có trẻ nhỏ, rất yên tâm vì không gây kích ứng. Sàn sạch bóng, thơm nhẹ mà giá cả phải chăng.",
    rating: 5,
  },
  {
    name: "Anh Vũ Khoa",
    role: "Quản lý Khách sạn Sunrise",
    location: "Vũng Tàu",
    text: "Khách sạn chúng tôi dùng toàn bộ dòng tẩy rửa công nghiệp của ZIFAT 999. Hiệu quả vượt trội, tiết kiệm chi phí hơn 20% so với hàng nhập khẩu.",
    rating: 5,
  },
  {
    name: "Cô Thanh Hà",
    role: "Khách hàng thân thiết",
    location: "Biên Hòa, Đồng Nai",
    text: "Gắn bó với ZIFAT 999 hơn 8 năm rồi. Từ nước rửa chén đến nước giặt, sản phẩm nào cũng chất lượng. Giới thiệu cho cả xóm dùng!",
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section className="scroll-mt-28" id="testimonials">
    <ScrollReveal>
      <div className="flex items-end justify-between border-b border-border pb-4 mb-8 md:mb-12">
        <div>
          <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-primary">
            Khách Hàng Nói Gì
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1.5">
            Hàng ngàn gia đình và doanh nghiệp tin dùng ZIFAT 999 mỗi ngày.
          </p>
        </div>
      </div>
    </ScrollReveal>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
      {testimonials.map((t, i) => (
        <ScrollReveal key={t.name} delay={`${i * 100}ms`}>
          <div className="relative bg-card rounded-xl sm:rounded-2xl border border-border p-5 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
            <Quote className="w-8 h-8 text-primary/15 mb-3" />

            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
              &ldquo;{t.text}&rdquo;
            </p>

            <div className="border-t border-border pt-4">
              <p className="text-sm font-bold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">
                {t.role} &middot; {t.location}
              </p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
