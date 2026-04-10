"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone, MapPin, Mail, Clock, MessageCircle,
  Send, CheckCircle, ChevronRight,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import FloatingActions from "@/components/FloatingActions";

const INFO_CARDS = [
  {
    icon: Phone,
    label: "Hotline",
    value: "0286.271.3214",
    sub: "Hỗ trợ 24/7",
    href: "tel:02862713214",
    color: "bg-green-50 text-green-700",
    iconBg: "bg-green-100",
  },
  {
    icon: MapPin,
    label: "Địa chỉ",
    value: "430/33 TA 28, KP 2, P. Thới An, Q. 12, TP.HCM",
    sub: "Mở cửa Thứ 2 – Thứ 7",
    href: "https://maps.google.com/?q=430/33+TA+28+Thoi+An+Quan+12",
    color: "bg-blue-50 text-blue-700",
    iconBg: "bg-blue-100",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hoaphamphatngocanh@gmail.com",
    sub: "Phản hồi trong 24 giờ",
    href: "mailto:hoaphamphatngocanh@gmail.com",
    color: "bg-orange-50 text-orange-700",
    iconBg: "bg-orange-100",
  },
  {
    icon: Clock,
    label: "Giờ làm việc",
    value: "Thứ 2 – Thứ 7: 7:00 – 17:30",
    sub: "Chủ nhật: 8:00 – 12:00",
    href: null,
    color: "bg-purple-50 text-purple-700",
    iconBg: "bg-purple-100",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div id="main-content">
      <SiteHeader />
      <SiteNav />

      {/* Page header strip */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container py-3 md:py-4">
          <nav className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-foreground font-semibold">Liên hệ</span>
          </nav>
        </div>
      </div>

      <div className="container py-6 md:py-10">
        {/* Page header */}
        <div className="mb-8 md:mb-14">
          <h1 className="text-2xl md:text-4xl font-black text-foreground mb-2">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Đội ngũ tư vấn luôn sẵn sàng hỗ trợ bạn — gọi trực tiếp hoặc gửi yêu cầu dưới đây.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
          {INFO_CARDS.map((card) => {
            const Wrapper = card.href ? "a" : "div";
            return (
              <Wrapper
                key={card.label}
                {...(card.href
                  ? { href: card.href, target: card.href.startsWith("http") ? "_blank" : undefined, rel: card.href.startsWith("http") ? "noopener noreferrer" : undefined }
                  : {})}
                className={`flex flex-col gap-4 p-5 md:p-6 rounded-2xl border border-border bg-card hover:shadow-md transition-all group ${card.href ? "cursor-pointer" : ""}`}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                  <card.icon className={`w-5 h-5 md:w-6 md:h-6 ${card.color.split(" ")[1]}`} />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-1">{card.label}</p>
                  <p className={`text-[13px] md:text-sm font-bold leading-snug ${card.href ? "group-hover:text-primary transition-colors" : ""} text-foreground`}>
                    {card.value}
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-1">{card.sub}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>

        {/* Main grid: Form + Map + Socials */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10 mb-10 md:mb-16">

          {/* Contact form */}
          <div className="lg:col-span-3 bg-card rounded-2xl md:rounded-3xl border border-border p-6 md:p-10">
            <h2 className="text-lg md:text-xl font-black text-foreground mb-1">Gửi Yêu Cầu</h2>
            <p className="text-sm text-muted-foreground mb-6 md:mb-8">
              Điền thông tin và chúng tôi sẽ liên hệ lại trong vòng 24 giờ.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-black text-foreground">Đã gửi thành công!</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Cảm ơn bạn đã liên hệ. Đội ngũ chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", subject: "", message: "" }); }}
                  className="mt-2 text-primary font-bold text-sm hover:underline"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1.5 uppercase tracking-wider">Họ và tên <span className="text-secondary">*</span></label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1.5 uppercase tracking-wider">Số điện thoại <span className="text-secondary">*</span></label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="0901 234 567"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5 uppercase tracking-wider">Chủ đề</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  >
                    <option value="">-- Chọn chủ đề --</option>
                    <option>Tư vấn sản phẩm</option>
                    <option>Đặt hàng sỉ / đại lý</option>
                    <option>Hỗ trợ sau mua hàng</option>
                    <option>Hợp tác kinh doanh</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5 uppercase tracking-wider">Nội dung <span className="text-secondary">*</span></label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    placeholder="Mô tả nhu cầu của bạn..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Đang gửi...</span>
                  ) : (
                    <><Send className="w-4 h-4" /> Gửi yêu cầu</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right panel: Map + Quick contact */}
          <div className="lg:col-span-2 flex flex-col gap-5 md:gap-6">
            {/* Map embed placeholder */}
            <div className="bg-card rounded-2xl md:rounded-3xl border border-border overflow-hidden flex-1 min-h-[240px] md:min-h-[300px] relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.787168706507!2d106.66388!3d10.87138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529fd8e9aff89%3A0x5e1f6c7d3b2a8e4!2zNDMwLzMzIFRBIDI4LCBQLiBUaMOC-aSXaSBBbiwgUS4gMTIsIFRQLkhDTQ!5e0!3m2!1svi!2svn!4v1234567890"
                className="w-full h-full min-h-[240px] md:min-h-[300px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ Phát Ngọc Anh"
              />
            </div>

            {/* Quick contact buttons */}
            <div className="bg-card rounded-2xl border border-border p-5 md:p-6 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Liên hệ nhanh</h3>
              <a
                href="tel:02862713214"
                className="flex items-center gap-3 w-full py-3.5 px-5 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:brightness-110 transition-all active:scale-95"
              >
                <Phone className="w-5 h-5" />
                <span>Gọi ngay: 0286.271.3214</span>
              </a>
              <a
                href="https://zalo.me/02862713214"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full py-3.5 px-5 bg-zalo text-white rounded-xl font-bold text-sm hover:brightness-110 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Nhắn tin Zalo</span>
              </a>
              <a
                href="mailto:hoaphamphatngocanh@gmail.com"
                className="flex items-center gap-3 w-full py-3.5 px-5 bg-muted border border-border text-foreground rounded-xl font-bold text-sm hover:border-primary hover:text-primary transition-all active:scale-95"
              >
                <Mail className="w-5 h-5" />
                <span>Gửi Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Distributor CTA */}
        <div className="bg-primary rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-primary-foreground text-center md:text-left">
            <h2 className="text-lg md:text-2xl font-black mb-1 uppercase tracking-tight">Muốn trở thành đại lý?</h2>
            <p className="text-primary-foreground/80 text-sm md:text-base">
              Chính sách chiết khấu hấp dẫn, hỗ trợ marketing và đào tạo bán hàng.
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 bg-primary-foreground text-primary px-6 md:px-8 py-3 md:py-4 rounded-full font-black text-sm uppercase tracking-widest whitespace-nowrap hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
          >
            Xem sản phẩm <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
