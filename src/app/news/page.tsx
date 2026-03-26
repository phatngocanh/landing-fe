"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Tag, ArrowRight, Play, Search, ChevronRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import FloatingActions from "@/components/FloatingActions";
import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import product3 from "@/assets/product3.jpg";
import product4 from "@/assets/product4.jpg";
import heroBanner from "@/assets/hero-banner.jpg";
import combo1 from "@/assets/combo1.jpg";

const CATEGORIES = ["Tất cả", "Bí quyết vệ sinh", "Kiến thức hóa phẩm", "Tin công ty", "Khuyến mãi"];

const articles = [
  {
    id: 1,
    title: "7 bí kíp lựa chọn nước lau sàn an toàn cho trẻ nhỏ trong nhà",
    excerpt: "Trẻ nhỏ thường xuyên tiếp xúc với sàn nhà, vì vậy việc chọn nước lau sàn an toàn, không kích ứng da và không có hóa chất độc hại là điều vô cùng quan trọng với mỗi gia đình.",
    category: "Bí quyết vệ sinh",
    date: "15/03/2026",
    readTime: "5 phút đọc",
    img: product1,
    featured: true,
  },
  {
    id: 2,
    title: "Giải pháp tẩy rửa công nghiệp quy mô lớn – tối ưu chi phí hiệu quả",
    excerpt: "Các doanh nghiệp, nhà máy và khách sạn ngày càng chú trọng đến giải pháp tẩy rửa công nghiệp vừa hiệu quả vừa tiết kiệm chi phí vận hành.",
    category: "Kiến thức hóa phẩm",
    date: "10/03/2026",
    readTime: "7 phút đọc",
    img: product2,
    featured: false,
  },
  {
    id: 3,
    title: "ZIFAT 999 ra mắt dòng sản phẩm nước rửa chén sinh học mới",
    excerpt: "Công ty TNHH Hóa Phẩm Phát Ngọc Anh chính thức ra mắt dòng nước rửa chén sinh học ZIFAT 999 Bio – an toàn tuyệt đối, phân hủy sinh học 100%.",
    category: "Tin công ty",
    date: "05/03/2026",
    readTime: "4 phút đọc",
    img: product3,
    featured: false,
  },
  {
    id: 4,
    title: "Combo vệ sinh toàn diện – tiết kiệm đến 15% cho đơn hàng lớn",
    excerpt: "Nhân dịp kỷ niệm 13 năm thành lập, Phát Ngọc Anh triển khai chương trình combo đặc biệt với mức giảm giá hấp dẫn cho khách hàng thân thiết.",
    category: "Khuyến mãi",
    date: "01/03/2026",
    readTime: "3 phút đọc",
    img: combo1,
    featured: false,
  },
  {
    id: 5,
    title: "Bí quyết vệ sinh nhà bếp sạch bóng chỉ trong 15 phút",
    excerpt: "Nhà bếp là nơi tích tụ dầu mỡ và vi khuẩn nhiều nhất trong nhà. Với những mẹo đơn giản và sản phẩm ZIFAT 999, bạn có thể làm sạch toàn bộ bếp chỉ trong 15 phút.",
    category: "Bí quyết vệ sinh",
    date: "20/02/2026",
    readTime: "6 phút đọc",
    img: product4,
    featured: false,
  },
  {
    id: 6,
    title: "Phát Ngọc Anh đạt danh hiệu Hàng Việt Nam Chất Lượng Cao lần thứ 12",
    excerpt: "Năm 2025, thương hiệu ZIFAT 999 tiếp tục được người tiêu dùng bình chọn là Hàng Việt Nam Chất Lượng Cao – khẳng định vị thế hàng đầu trong ngành hóa phẩm nội địa.",
    category: "Tin công ty",
    date: "15/02/2026",
    readTime: "5 phút đọc",
    img: heroBanner,
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  "Bí quyết vệ sinh": "bg-green-100 text-green-700",
  "Kiến thức hóa phẩm": "bg-blue-100 text-blue-700",
  "Tin công ty": "bg-primary/10 text-primary",
  "Khuyến mãi": "bg-red-100 text-red-700",
};

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchesCategory = selectedCategory === "Tất cả" || a.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featured = filteredArticles.find((a) => a.featured) ?? filteredArticles[0] ?? null;
  const rest = filteredArticles.filter((a) => a !== featured);

  return (
    <div>
      <SiteHeader />
      <SiteNav />

      {/* Page header strip */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container py-3 md:py-4">
          <nav className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-foreground font-semibold">Tin tức</span>
          </nav>
        </div>
      </div>

      <div className="container py-6 md:py-10">
        {/* Page header */}
        <div className="mb-8 md:mb-14">
          <h1 className="text-2xl md:text-4xl font-black text-foreground mb-2">Tin Tức & Kiến Thức</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Bí quyết vệ sinh, kiến thức hóa phẩm và tin tức mới nhất từ ZIFAT 999
          </p>
        </div>

        {/* Category filter + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-12">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all active:scale-95 ${
                  cat === selectedCategory
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-muted border border-border rounded-full px-4 py-2 w-full sm:w-64 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              className="bg-transparent border-none outline-none text-sm flex-1 min-w-0 placeholder:text-muted-foreground"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* No results state */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg font-semibold mb-2">Không tìm thấy bài viết nào</p>
            <p className="text-muted-foreground text-sm">Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.</p>
          </div>
        )}

        {/* Featured article */}
        {featured && (
        <div className="mb-10 md:mb-16 bg-card rounded-2xl md:rounded-3xl overflow-hidden border border-border shadow-sm group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-video md:aspect-auto md:min-h-[340px] overflow-hidden">
              <Image
                src={featured.img}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
              {featured.featured && (
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Nổi bật
              </span>
              )}
            </div>
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full mb-4 w-fit ${categoryColors[featured.category]}`}>
                <Tag className="w-3 h-3" /> {featured.category}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                {featured.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                </div>
                <span className="flex items-center gap-1.5 text-primary font-bold text-sm group-hover:gap-2.5 transition-all">
                  Đọc thêm <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Article grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mb-10 md:mb-16">
          {rest.map((article) => (
            <div
              key={article.id}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={article.img}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                />
              </div>
              <div className="p-5 md:p-6">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full mb-3 w-fit ${categoryColors[article.category]}`}>
                  <Tag className="w-3 h-3" /> {article.category}
                </span>
                <h3 className="text-[14px] md:text-[15px] font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{article.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video section */}
        <div className="bg-card rounded-2xl md:rounded-3xl border border-border p-6 md:p-10 mb-10 md:mb-16">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
              <Play className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-sm md:text-base font-black uppercase tracking-widest text-foreground">Video Hoạt Động</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[heroBanner, combo1, product1].map((img, i) => (
              <div
                key={i}
                className="relative aspect-video rounded-xl overflow-hidden bg-foreground group cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`Video ${i + 1}`}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-card/25 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-card/30 shadow-xl">
                    <Play className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-[11px] font-bold line-clamp-1">
                    {i === 0 ? "Giới thiệu thương hiệu ZIFAT 999" : i === 1 ? "Quy trình sản xuất tại nhà máy" : "Hướng dẫn sử dụng sản phẩm"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
