"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ShoppingCart,
  Phone,
  Share2,
  ChevronRight,
  Check,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Package,
  Eye,
} from "lucide-react";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import ScrollReveal from "@/components/ScrollReveal";
import { getProductById, getRelatedProducts } from "@/data/products";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });
const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false });

const REVIEWS = [
  { name: "Nguyễn Thị Lan", rating: 5, date: "12/03/2025", comment: "Sản phẩm rất tốt, mùi thơm dễ chịu, dùng xong sàn nhà sạch bóng. Sẽ tiếp tục mua ủng hộ shop." },
  { name: "Trần Văn Minh", rating: 5, date: "05/03/2025", comment: "Hàng chất lượng, đúng như mô tả. Giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng!" },
  { name: "Lê Thị Hoa", rating: 4, date: "28/02/2025", comment: "Hiệu quả tẩy rửa tốt, giá hợp lý. Tuy nhiên mùi hơi nồng một chút lúc mới mở." },
];

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const product = getProductById(id);
  const related = getRelatedProducts(id);

  const [activeImg, setActiveImg] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <SiteNav />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-24">
          <p className="text-4xl font-black text-muted-foreground">404</p>
          <p className="text-lg text-muted-foreground">Không tìm thấy sản phẩm.</p>
          <Link href="/" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:brightness-110 transition-all">
            Về trang chủ
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  const mainGalleryImage =
    product.images[activeImg] ?? product.images[0];

  return (
    <div className="scroll-smooth">
      <SiteHeader />
      <SiteNav />

      <main id="main-content" className="container py-6 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground mb-6 md:mb-10 flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href={`/products?brand=${encodeURIComponent(product.brand)}`} className="hover:text-primary transition-colors font-medium">{product.brand}</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href={`/products?brand=${encodeURIComponent(product.brand)}&category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors font-medium">{product.category}</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-foreground font-semibold line-clamp-1">{product.name}</span>
        </nav>

        {/* Main product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 mb-14 md:mb-24">
          {/* Image gallery */}
          <div className="flex flex-col gap-3 md:gap-4">
              <div className="bg-card border border-border rounded-2xl md:rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-6 md:p-12 relative group">
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-[11px] font-black px-3 py-1 rounded-full shadow">
                    {product.badge}
                  </span>
                )}
                {product.discount && (
                  <span className="absolute top-4 right-4 z-10 bg-secondary text-secondary-foreground text-[11px] font-black px-3 py-1 rounded-full shadow">
                    {product.discount}
                  </span>
                )}
                <img
                  src={mainGalleryImage.src}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 md:gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    data-testid={`thumb-img-${i}`}
                    onClick={() => setActiveImg(i)}
                    className={`flex-1 aspect-square bg-card border-2 rounded-xl md:rounded-2xl overflow-hidden flex items-center justify-center p-2 md:p-4 transition-all ${
                      activeImg === i
                        ? "border-primary shadow-md"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={img.src} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-4 md:gap-6">
              {/* Brand + Category + SKU */}
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={product.brand === "ZIFAT999" ? "/zifat999" : "/sifa999"}
                  className={`text-[11px] md:text-xs font-black px-3 py-1 rounded-full text-white ${product.brand === "ZIFAT999" ? "bg-teal-600 hover:bg-teal-700" : "bg-green-600 hover:bg-green-700"} transition-colors`}
                  data-testid="link-product-brand"
                >
                  {product.brand}
                </Link>
                <span className="text-[11px] md:text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-[11px] text-muted-foreground font-medium">
                  SKU: {product.sku}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-xl md:text-3xl font-black text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= Math.round(Number(avgRating)) ? "fill-yellow-400 text-yellow-400" : "text-border"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-foreground">{avgRating}</span>
                <span className="text-sm text-muted-foreground">({REVIEWS.length} đánh giá)</span>
                <span className="hidden sm:inline text-border">|</span>
                <span className="text-sm text-muted-foreground hidden sm:inline">Đã bán: <b className="text-foreground">1.2k+</b></span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-black text-secondary">{product.price}</span>
                {product.oldPrice && (
                  <>
                    <span className="text-base md:text-lg text-muted-foreground line-through">{product.oldPrice}</span>
                    <span className="text-sm font-black text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">{product.discount}</span>
                  </>
                )}
              </div>

              <div className="h-px bg-border" />

              {/* Volume selector */}
              <div>
                <p className="text-sm font-bold text-foreground mb-2.5">
                  Dung tích / Quy cách:
                  <span className="text-primary ml-2">{product.volumes[selectedVolume]}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.volumes.map((vol, i) => (
                    <button
                      key={vol}
                      data-testid={`volume-btn-${i}`}
                      onClick={() => setSelectedVolume(i)}
                      className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                        selectedVolume === i
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-foreground">Số lượng:</p>
                <div className="flex items-center border-2 border-border rounded-xl overflow-hidden">
                  <button
                    data-testid="qty-decrease"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors font-bold text-lg"
                  >
                    −
                  </button>
                  <span data-testid="qty-value" className="w-12 text-center font-black text-foreground">
                    {qty}
                  </span>
                  <button
                    data-testid="qty-increase"
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.inStock ? (
                    <span className="text-primary font-bold flex items-center gap-1">
                      <Check className="w-4 h-4" /> Còn hàng
                    </span>
                  ) : (
                    <span className="text-secondary font-bold">Hết hàng</span>
                  )}
                </span>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  data-testid="button-buy-now"
                  className="flex-1 bg-primary text-primary-foreground py-3.5 md:py-4 rounded-2xl font-black uppercase tracking-wider text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                  Mua Ngay
                </button>
                <button
                  data-testid="button-add-to-cart"
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 md:py-4 rounded-2xl font-black uppercase tracking-wider text-sm border-2 transition-all active:scale-95 ${
                    addedToCart
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-foreground text-foreground hover:border-primary hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {addedToCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                  {addedToCart ? "Đã thêm vào giỏ" : "Thêm vào giỏ"}
                </button>
              </div>

              {/* Contact CTA */}
              <a
                href="tel:02862713214"
                data-testid="link-phone"
                className="flex items-center justify-center gap-2.5 py-3 rounded-2xl border border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all font-semibold text-sm"
              >
                <Phone className="w-4 h-4" />
                Gọi tư vấn: <span className="font-black text-secondary">0286.271.3214</span>
              </a>

              {/* Trust strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 pt-1">
                {[
                  { icon: ShieldCheck, label: "Hàng chính hãng" },
                  { icon: Truck, label: "Giao hàng toàn quốc" },
                  { icon: RotateCcw, label: "Đổi trả 7 ngày" },
                  { icon: Package, label: "Đóng gói cẩn thận" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 bg-muted rounded-xl md:rounded-2xl py-3 px-2 text-center"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-[11px] md:text-xs font-bold text-foreground leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                <Share2 className="w-4 h-4" />
                <span className="font-medium">Chia sẻ:</span>
                {["Facebook", "Zalo", "Twitter"].map((s) => (
                  <button
                    key={s}
                    data-testid={`share-${s.toLowerCase()}`}
                    className="px-3 py-1 rounded-full border border-border text-xs font-bold hover:border-primary hover:text-primary transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
          </div>
        </div>

        {/* Description + Specs + Reviews */}
        <ScrollReveal>
          <div className="mb-14 md:mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {/* Description + Reviews */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h2 className="section-header-line text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-primary mb-5 md:mb-8">
                    Mô tả sản phẩm
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                    {product.description}
                  </p>
                  <h3 className="font-black text-sm md:text-base text-foreground mb-3">Công dụng nổi bật:</h3>
                  <ul className="space-y-2">
                    {product.uses.map((use) => (
                      <li key={use} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </span>
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reviews */}
                <div>
                  <h2 className="section-header-line text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-primary mb-5 md:mb-8">
                    Đánh giá khách hàng
                  </h2>
                  <div className="flex items-center gap-6 mb-6 bg-muted rounded-2xl p-5">
                    <div className="text-center">
                      <p className="text-5xl font-black text-primary">{avgRating}</p>
                      <div className="flex justify-center mt-1">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} className={`w-4 h-4 ${s <= Math.round(Number(avgRating)) ? "fill-yellow-400 text-yellow-400" : "text-border"}`} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{REVIEWS.length} đánh giá</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5,4,3,2,1].map((star) => {
                        const count = REVIEWS.filter(r => r.rating === star).length;
                        return (
                          <div key={star} className="flex items-center gap-2 text-xs">
                            <span className="w-3 text-right text-muted-foreground">{star}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 shrink-0" />
                            <div className="flex-1 bg-border rounded-full h-1.5 overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full"
                                style={{ width: `${(count / REVIEWS.length) * 100}%` }}
                              />
                            </div>
                            <span className="w-4 text-muted-foreground">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {REVIEWS.map((r, i) => (
                      <div key={i} className="bg-card border border-border rounded-2xl p-4 md:p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-bold text-sm text-foreground">{r.name}</p>
                            <p className="text-xs text-muted-foreground">{r.date}</p>
                          </div>
                          <div className="flex">
                            {[1,2,3,4,5].map((s) => (
                              <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? "fill-yellow-400 text-yellow-400" : "text-border"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specs sidebar */}
              <div className="space-y-8">
                <div>
                  <h2 className="section-header-line text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-primary mb-5 md:mb-8">
                    Thông số kỹ thuật
                  </h2>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="flex items-start px-4 md:px-5 py-3 md:py-3.5 gap-3">
                        <span className="text-xs md:text-sm text-muted-foreground font-medium w-28 shrink-0 pt-0.5">{spec.label}</span>
                        <span className="text-xs md:text-sm font-bold text-foreground flex-1">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {product.isBulkAvailable && product.bulkPriceTiers.length > 0 && (
                  <div>
                    <h2 className="section-header-line text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-primary mb-5 md:mb-8">
                      Bảng Giá Sỉ / B2B
                    </h2>
                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                      <div className="grid grid-cols-3 bg-muted px-4 py-2.5 text-[11px] md:text-xs font-black uppercase tracking-widest text-muted-foreground">
                        <span>Số lượng</span>
                        <span className="text-center">Đơn giá</span>
                        <span className="text-right">Tiết kiệm</span>
                      </div>
                      <div className="divide-y divide-border">
                        {product.bulkPriceTiers.map((tier, i) => {
                          const retailPrice = parseInt(product.price.replace(/[^\d]/g, ""));
                          const savings = retailPrice > 0 ? Math.round((1 - tier.price / retailPrice) * 100) : 0;
                          return (
                            <div key={i} className="grid grid-cols-3 px-4 py-3 items-center text-sm">
                              <span className="font-bold text-foreground">{tier.label}</span>
                              <span className="text-center font-black text-secondary">{tier.price.toLocaleString("vi-VN")}đ</span>
                              <span className="text-right">
                                {savings > 0 && (
                                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">-{savings}%</span>
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {product.moq && (
                      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-primary" />
                        Đặt hàng tối thiểu: <b className="text-foreground">{product.moq} sản phẩm</b>
                      </p>
                    )}
                    <a
                      href="tel:02862713214"
                      className="flex items-center justify-center gap-2 w-full mt-4 py-3 rounded-xl bg-primary/10 text-primary font-bold text-xs hover:bg-primary/20 transition-all"
                      data-testid="link-bulk-pricing-call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Liên hệ báo giá sỉ
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Related products */}
        <ScrollReveal>
          <div>
            <div className="flex items-center justify-between border-b border-border pb-4 md:pb-5 mb-5 md:mb-10">
              <h2 className="section-header-line text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-primary">
                Sản Phẩm Liên Quan
              </h2>
              <Link
                href="/products"
                className="text-[12px] md:text-[13px] text-muted-foreground font-bold hover:text-primary transition-all flex items-center gap-1.5 group"
              >
                Tất cả <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-5 md:gap-8">
              {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    data-testid={`related-product-${p.id}`}
                    className="bg-card border border-border p-3 sm:p-6 rounded-xl sm:rounded-3xl text-center product-card group cursor-pointer h-full relative block"
                  >
                    {p.badge && (
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-primary text-primary-foreground text-[11px] sm:text-xs font-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                        {p.badge}
                      </div>
                    )}
                    {p.discount && (
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-secondary text-secondary-foreground text-[11px] sm:text-xs font-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                        {p.discount}
                      </div>
                    )}
                    <div className="aspect-square mb-3 sm:mb-6 bg-muted rounded-lg sm:rounded-2xl p-3 sm:p-6 flex items-center justify-center overflow-hidden relative">
                      <img
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        src={p.img.src}
                        alt={p.name}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 hidden sm:flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="w-10 h-10 rounded-full bg-card shadow-md flex items-center justify-center text-foreground translate-y-3 group-hover:translate-y-0 duration-300">
                          <Eye className="w-4 h-4" />
                        </span>
                        <span className="w-10 h-10 rounded-full bg-primary shadow-md flex items-center justify-center text-primary-foreground translate-y-3 group-hover:translate-y-0 duration-500">
                          <ShoppingCart className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                    <h5 className="text-[11px] sm:text-[14px] font-bold text-foreground h-8 sm:h-11 overflow-hidden line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {p.name}
                    </h5>
                    <p className="text-secondary font-black text-sm sm:text-lg mt-2 sm:mt-3">{p.price}</p>
                  </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </main>

      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
