"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Building2,
  ChevronRight,
  Globe,
  MapPin,
  Phone,
  Mail,
  Users,
  TrendingUp,
  ShieldCheck,
  Star,
  Truck,
  Target,
  Heart,
  CheckCircle2,
  ArrowRight,
  Package,
} from "lucide-react";
import aboutImage from "@/assets/about-image.jpg";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import ScrollReveal from "@/components/ScrollReveal";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });
const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false });

const STATS = [
  { value: "2010", label: "Năm thành lập", icon: Building2 },
  { value: "50+", label: "Dòng sản phẩm", icon: Package },
  { value: "64", label: "Tỉnh thành", icon: MapPin },
  { value: "10+", label: "Năm kinh nghiệm", icon: TrendingUp },
];

const CERTIFICATIONS = [
  {
    year: "2010 – 2012",
    title: "Hàng Việt Nam Chất Lượng Cao",
    body: "Bộ Khoa Học và Công Nghệ",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    year: "2012+",
    title: "Thương Hiệu Mạnh & Phát Triển Bền Vững",
    body: "Tiếp tục chứng nhận định kỳ",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  {
    year: "2020",
    title: "Tự Hào Thương Hiệu Việt Vì Cộng Đồng",
    body: "Hiệp hội doanh nghiệp Việt Nam",
    color: "bg-secondary/10 text-secondary border-secondary/20",
  },
];

const MISSIONS = [
  {
    icon: Star,
    title: "Tầm nhìn",
    text: "Tạo ra giá trị thị trường cho toàn bộ nhân viên và hội đồng quản trị công ty từ chính chất lượng sản phẩm.",
  },
  {
    icon: Target,
    title: "Sứ mệnh",
    text: "Tạo ra lợi nhuận thực tế cho các đối tác kinh doanh xứng đáng với thương hiệu hàng Việt Nam chất lượng cao ZIFAT 999.",
  },
  {
    icon: Heart,
    title: "Giá trị cốt lõi",
    text: "Chất lượng là nền tảng cho sự phát triển bền vững. Không ngừng cải tiến sản phẩm ngày một đa dạng và phù hợp thị hiếu người tiêu dùng.",
  },
];

const MARKET_CHANNELS = [
  {
    icon: Building2,
    title: "Horeca",
    desc: "Nhà hàng, khách sạn, quán cà phê, bar và các dịch vụ ăn uống",
  },
  {
    icon: Globe,
    title: "64 Tỉnh thành",
    desc: "Hệ thống đại lý và nhà phân phối trải rộng khắp cả nước",
  },
  {
    icon: Users,
    title: "Kênh bán lẻ",
    desc: "Chiếm khoảng 80% thị trường cửa hàng điện nước toàn quốc",
  },
  {
    icon: Truck,
    title: "Phân phối trực tiếp",
    desc: "Đội ngũ Sales chuyên nghiệp phụ trách từng khu vực địa lý",
  },
];

const GOALS_2025 = [
  { number: "2.000+", label: "Hệ thống siêu thị lớn nhỏ trên toàn quốc" },
  { number: "20.000", label: "Khách hàng mảng Horeca (nhà hàng, khách sạn…)" },
  { number: "50.000", label: "Đại lý bán lẻ trên 64 tỉnh thành" },
  { number: "100", label: "Nhà phân phối vùng miền" },
  { number: "5.000", label: "Cộng tác viên bán hàng online" },
  { number: "5M+", label: "Sản phẩm đến tay người tiêu dùng mỗi năm" },
];

const CRITERIA = [
  "Giá thành thấp hơn đối thủ cùng phân khúc từ 5% – 30%",
  "Bình ổn giá khi thị trường biến động",
  "Mẫu mã đẹp, đa dạng lựa chọn cho từng khu vực",
  "Hỗ trợ đổi trả hàng hết hạn sử dụng",
  "Tặng kèm khuyến mãi, hỗ trợ kệ trưng bày cửa hàng bán lẻ",
  "Thường xuyên tham gia hội chợ lớn trên 64 tỉnh thành",
];

export default function AboutPage() {
  return (
    <div className="scroll-smooth">
      <SiteHeader />
      <SiteNav />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        {/* Decorative rings — span the full section including breadcrumb */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[40px] border-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border-[30px] border-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none" />

        {/* Breadcrumb — sits inside the hero so rings flow through it unclipped */}
        <div className="container relative pt-4 pb-0">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/60">
            <Link href="/" className="hover:text-primary-foreground transition-colors font-medium">Trang chủ</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-foreground/80 font-semibold">Giới Thiệu</span>
          </nav>
        </div>

        <div className="container relative pt-8 pb-14 md:pt-14 md:pb-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-yellow-300" />
              Hàng Việt Nam Chất Lượng Cao
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight uppercase">
              Công Ty TNHH<br />
              Hóa Phẩm<br />
              <span className="text-yellow-300">Phát Ngọc Anh</span>
            </h1>
            <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed max-w-md">
              Hơn 10 năm đồng hành cùng gia đình Việt với thương hiệu <strong className="text-yellow-300">ZIFAT 999</strong> — giải pháp vệ sinh an toàn, hiệu quả, giá cả phải chăng.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-yellow-400 text-foreground px-6 py-3 rounded-full font-black text-sm uppercase tracking-wide hover:brightness-110 active:scale-95 transition-all shadow-lg"
              >
                Xem sản phẩm <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:02862713214"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-white/10 active:scale-95 transition-all"
              >
                <Phone className="w-4 h-4" /> Liên hệ ngay
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
            <Image
              src={aboutImage}
              alt="Nhà máy sản xuất Phát Ngọc Anh"
              fill
              className="object-cover"
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            {/* Floating badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm rounded-2xl p-4 text-foreground">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Địa chỉ nhà máy</p>
              <p className="text-xs font-semibold leading-snug">430/33 Đường TA 28, Khu phố 2, P. Thới An, Quận 12, TP.HCM</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/10">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className={`py-6 px-4 text-center ${i < STATS.length - 1 ? "border-b md:border-b-0 md:border-r border-white/10" : ""} ${i === 1 ? "border-r border-white/10" : ""}`}
                  >
                    <Icon className="w-5 h-5 text-yellow-300 mx-auto mb-2 opacity-80" />
                    <p className="text-2xl md:text-3xl font-black text-yellow-300">{s.value}</p>
                    <p className="text-xs text-primary-foreground/60 font-medium uppercase tracking-wide mt-1">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <main className="container py-14 md:py-24 space-y-20 md:space-y-32">

        {/* ── WELCOME MESSAGE ── */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
              <span className="h-px w-10 bg-primary/30" />
              Kính chào quý khách hàng
              <span className="h-px w-10 bg-primary/30" />
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-foreground leading-tight">
              Đối tác tin cậy trong từng<br />
              <span className="text-primary">giọt hóa phẩm chất lượng</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Công ty TNHH Hóa Phẩm Phát Ngọc Anh chân thành cảm ơn quý khách hàng đã tin tưởng và sử dụng sản phẩm trong thời gian qua. Chúng tôi chuyên sản xuất hơn <strong className="text-foreground">50 mặt hàng hóa phẩm</strong> trên dây chuyền công nghệ hiện đại, quy mô nhà xưởng lớn, đội ngũ công nhân lành nghề — mang đến sản phẩm chất lượng tốt nhất với giá thành phải chăng.
            </p>
          </div>
        </ScrollReveal>

        {/* ── CERTIFICATIONS ── */}
        <ScrollReveal>
          <div>
            <div className="flex items-center gap-4 mb-10">
              <span className="h-px flex-1 bg-border" />
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-primary text-center whitespace-nowrap">
                Chứng nhận & Giải thưởng
              </h2>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {CERTIFICATIONS.map((cert, i) => (
                <ScrollReveal key={cert.title} delay={`${i * 100}ms`}>
                  <div className={`border rounded-2xl p-6 space-y-3 ${cert.color}`}>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 shrink-0" />
                      <span className="text-[11px] font-black uppercase tracking-widest opacity-70">{cert.year}</span>
                    </div>
                    <h3 className="font-black text-base leading-snug">{cert.title}</h3>
                    <p className="text-sm opacity-70 font-medium">{cert.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── VISION & MISSION ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MISSIONS.map((m, i) => {
            const Icon = m.icon;
            return (
              <ScrollReveal key={m.title} delay={`${i * 120}ms`}>
                <div className="bg-card border border-border rounded-2xl md:rounded-3xl p-8 h-full space-y-4 hover:shadow-lg hover:border-primary/30 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-lg font-black text-foreground">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.text}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── MARKET & DISTRIBUTION ── */}
        <ScrollReveal>
          <div className="bg-primary rounded-3xl overflow-hidden">
            <div className="p-8 md:p-14">
              <div className="mb-10 text-center">
                <p className="text-[11px] font-black uppercase tracking-widest text-yellow-300 mb-3">Thị trường tiêu thụ</p>
                <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
                  Phủ sóng <span className="text-yellow-300">64 tỉnh thành</span><br />trên cả nước
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MARKET_CHANNELS.map((ch, i) => {
                  const Icon = ch.icon;
                  return (
                    <ScrollReveal key={ch.title} delay={`${i * 80}ms`}>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-3 border border-white/10 hover:bg-white/15 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-yellow-300" />
                        </div>
                        <h3 className="font-black text-white">{ch.title}</h3>
                        <p className="text-sm text-white/60 leading-relaxed">{ch.desc}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── BUSINESS CRITERIA ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <ScrollReveal animation="fade-in-left">
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-3">Tiêu chí kinh doanh</p>
                <h2 className="text-2xl md:text-3xl font-black text-foreground leading-snug">
                  Cam kết giá trị thực <br />
                  <span className="text-primary">cho từng khách hàng</span>
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Hóa phẩm Phát Ngọc Anh là mặt hàng thiết yếu cho mọi gia đình từ bình dân đến cao cấp. Chúng tôi đặt chất lượng lên hàng đầu với giá thành cạnh tranh vượt trội so với hàng ngoại nhập cùng phân khúc.
              </p>
              <ul className="space-y-3">
                {CRITERIA.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-in-right">
            <div className="space-y-4">
              {[
                { icon: ShieldCheck, label: "Chất lượng được kiểm định", sub: "Đạt tiêu chuẩn Việt Nam và quốc tế" },
                { icon: TrendingUp, label: "Giá cạnh tranh 5%–30%", sub: "So với đối thủ cùng phân khúc trung cấp" },
                { icon: Globe, label: "Phân phối toàn quốc", sub: "Mạng lưới 64 tỉnh thành, luôn đủ hàng" },
                { icon: Users, label: "Đội ngũ bán hàng chuyên nghiệp", sub: "Sale có mặt tại từng địa phương trên cả nước" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.label} delay={`${i * 80}ms`}>
                    <div className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all group">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                        <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* ── GOALS 2025 ── */}
        <ScrollReveal>
          <div className="relative bg-gradient-to-br from-muted to-card border border-border rounded-3xl overflow-hidden p-8 md:p-14">
            {/* Decorative */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary/5 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-primary/5 pointer-events-none" />

            <div className="relative">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest mb-4">
                  <Target className="w-3.5 h-3.5" />
                  Mục tiêu đến 2025
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-foreground leading-tight">
                  Chinh phục thị trường<br />
                  <span className="text-primary">toàn quốc</span>
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {GOALS_2025.map((g, i) => (
                  <ScrollReveal key={g.label} delay={`${i * 80}ms`}>
                    <div className="bg-card border border-border rounded-2xl p-5 md:p-6 text-center hover:border-primary/40 hover:shadow-md transition-all">
                      <p className="text-2xl md:text-3xl font-black text-primary mb-2">{g.number}</p>
                      <p className="text-xs md:text-sm text-muted-foreground leading-snug font-medium">{g.label}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground mt-8 max-w-xl mx-auto leading-relaxed">
                Tạo ra hàng trăm nghìn việc làm trực tiếp và gián tiếp, góp phần thúc đẩy khẩu hiệu{" "}
                <em className="text-primary font-bold not-italic">"Người Việt ưu tiên dùng hàng Việt"</em>.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── CONTACT CARD ── */}
        <ScrollReveal>
          <div className="bg-card border border-border rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 space-y-6">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-3">Liên hệ với chúng tôi</p>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground leading-snug">
                    Sẵn sàng hợp tác &<br />phát triển cùng bạn
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Dù bạn là khách hàng cá nhân, đại lý, hay nhà phân phối — đội ngũ Phát Ngọc Anh luôn sẵn sàng tư vấn và hỗ trợ tận tâm.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Địa chỉ", value: "430/33 Đường TA 28, Khu phố 2, P. Thới An, Quận 12, TP.HCM" },
                    { icon: Phone, label: "Điện thoại", value: "0286.271.3214  –  0945.437.079" },
                    { icon: Mail, label: "Email", value: "hoaphamphatngocanh@gmail.com" },
                    { icon: Globe, label: "Website", value: "phatngocanh.com" },
                  ].map((c) => {
                    const Icon = c.icon;
                    return (
                      <div key={c.label} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{c.label}</p>
                          <p className="text-sm font-semibold text-foreground mt-0.5">{c.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="tel:02862713214"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold text-sm hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Phone className="w-4 h-4" /> Gọi ngay
                  </a>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 border-2 border-border px-6 py-3 rounded-full font-bold text-sm hover:border-primary hover:text-primary active:scale-95 transition-all"
                  >
                    Xem sản phẩm <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* MST info panel */}
              <div className="bg-primary p-8 md:p-12 flex flex-col justify-between text-primary-foreground">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />
                    Thông tin pháp lý
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Tên công ty", value: "CÔNG TY TNHH HÓA PHẨM PHÁT NGỌC ANH" },
                      { label: "Mã số thuế", value: "0313155516" },
                      { label: "Thương hiệu", value: "ZIFAT 999" },
                      { label: "Năm thành lập", value: "2010" },
                    ].map((item) => (
                      <div key={item.label} className="border-b border-white/10 pb-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/50 mb-1">{item.label}</p>
                        <p className="font-bold text-sm">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 p-4 bg-white/10 rounded-2xl border border-white/10 text-center">
                  <p className="text-xs text-primary-foreground/60 font-medium leading-relaxed">
                    "Chất Lượng Việt — Cho Người Việt"<br />
                    <strong className="text-yellow-300 text-base font-black">ZIFAT 999</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </main>

      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
