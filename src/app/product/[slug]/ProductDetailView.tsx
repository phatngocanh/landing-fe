"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Phone,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Package,
  Eye,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import type { Product } from "@/lib/api/types";

const REVIEWS = [
  { name: "Nguyễn Thị Lan", rating: 5, date: "12/03/2025", comment: "Sản phẩm rất tốt, mùi thơm dễ chịu, dùng xong sàn nhà sạch bóng. Sẽ tiếp tục mua ủng hộ shop." },
  { name: "Trần Văn Minh", rating: 5, date: "05/03/2025", comment: "Hàng chất lượng, đúng như mô tả. Giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng!" },
  { name: "Lê Thị Hoa", rating: 4, date: "28/02/2025", comment: "Hiệu quả tẩy rửa tốt, giá hợp lý. Tuy nhiên mùi hơi nồng một chút lúc mới mở." },
];

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailView({ product, related }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);
  const mainGalleryImage = product.images[activeImg] ?? product.images[0];

  return (
    <main id="main-content" className="container py-6 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground mb-6 md:mb-10 flex-wrap">
        <Link href="/" className="hover:text-primary transition-colors font-medium">Trang chủ</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        {product.categorySlug ? (
          <Link href={`/products?category=${encodeURIComponent(product.categorySlug)}`} className="hover:text-primary transition-colors font-medium">{product.category}</Link>
        ) : (
          <span className="font-medium">{product.category}</span>
        )}
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-foreground font-semibold line-clamp-1">{product.name}</span>
      </nav>

      {/* Main product layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 mb-14 md:mb-24">
        {/* Image gallery */}
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="bg-card border border-border rounded-2xl md:rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-6 md:p-12 relative group">
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-[11px] font-black px-3 py-1 rounded-full shadow">{product.badge}</span>
            )}
            {product.discount && (
              <span className="absolute top-4 right-4 z-10 bg-secondary text-secondary-foreground text-[11px] font-black px-3 py-1 rounded-full shadow">{product.discount}</span>
            )}
            <img src={mainGalleryImage} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Ảnh trước"
                  onClick={() => setActiveImg((i) => (i - 1 + product.images.length) % product.images.length)}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border border-border rounded-full p-2 shadow-md transition md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Ảnh tiếp theo"
                  onClick={() => setActiveImg((i) => (i + 1) % product.images.length)}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border border-border rounded-full p-2 shadow-md transition md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100"
                >
                  <ChevronRight className="size-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-background/80 border border-border rounded-full px-3 py-1 text-xs font-medium tabular-nums md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100 transition">
                  {activeImg + 1} / {product.images.length}
                </div>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 md:gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  data-testid={`thumb-img-${i}`}
                  onClick={() => setActiveImg(i)}
                  className={`flex-1 aspect-square bg-card border-2 rounded-xl md:rounded-2xl overflow-hidden flex items-center justify-center p-2 md:p-4 transition-all ${
                    activeImg === i ? "border-primary shadow-md" : "border-border hover:border-primary/50"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[11px] md:text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">{product.category}</span>
            <span className="text-[11px] text-muted-foreground font-medium">SKU: {product.sku}</span>
          </div>

          <h1 className="text-xl md:text-3xl font-black text-foreground leading-tight">{product.name}</h1>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${s <= Math.round(Number(avgRating)) ? "fill-yellow-400 text-yellow-400" : "text-border"}`} />
              ))}
            </div>
            <span className="text-sm font-bold text-foreground">{avgRating}</span>
            <span className="text-sm text-muted-foreground">({REVIEWS.length} đánh giá)</span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">Đã bán: <b className="text-foreground">1.2k+</b></span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl md:text-4xl font-black text-secondary">{product.price}</span>
            {product.oldPrice && (
              <>
                <span className="text-base md:text-lg text-muted-foreground line-through">{product.oldPrice}</span>
                {product.discount && (
                  <span className="text-sm font-black text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">{product.discount}</span>
                )}
              </>
            )}
          </div>

          <div className="h-px bg-border" />

          {product.volumes.length > 0 && (
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
                      selectedVolume === i ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                    }`}
                  >
                    {vol}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <p className="text-sm font-bold text-foreground">Số lượng:</p>
            <div className="flex items-center border-2 border-border rounded-xl overflow-hidden">
              <button data-testid="qty-decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors font-bold text-lg">−</button>
              <span data-testid="qty-value" className="w-12 text-center font-black text-foreground">{qty}</span>
              <button data-testid="qty-increase" onClick={() => setQty((q) => q + 1)} className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors font-bold text-lg">+</button>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.inStock ? (
                <span className="text-primary font-bold flex items-center gap-1"><Check className="w-4 h-4" /> Còn hàng</span>
              ) : (
                <span className="text-secondary font-bold">Hết hàng</span>
              )}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button data-testid="button-buy-now" className="flex-1 bg-primary text-primary-foreground py-3.5 md:py-4 rounded-2xl font-black uppercase tracking-wider text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20">Mua Ngay</button>
            <button data-testid="button-add-to-cart" onClick={handleAddToCart} className={`flex-1 flex items-center justify-center gap-2 py-3.5 md:py-4 rounded-2xl font-black uppercase tracking-wider text-sm border-2 transition-all active:scale-95 ${addedToCart ? "border-primary bg-primary/10 text-primary" : "border-foreground text-foreground hover:border-primary hover:text-primary hover:bg-primary/5"}`}>
              {addedToCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
              {addedToCart ? "Đã thêm vào giỏ" : "Thêm vào giỏ"}
            </button>
          </div>

          <a href="tel:02862713214" data-testid="link-phone" className="flex items-center justify-center gap-2.5 py-3 rounded-2xl border border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all font-semibold text-sm">
            <Phone className="w-4 h-4" /> Gọi tư vấn: <span className="font-black text-secondary">0286.271.3214</span>
          </a>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 pt-1">
            {[
              { icon: ShieldCheck, label: "Hàng chính hãng" },
              { icon: Truck, label: "Giao hàng toàn quốc" },
              { icon: RotateCcw, label: "Đổi trả 7 ngày" },
              { icon: Package, label: "Đóng gói cẩn thận" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 bg-muted rounded-xl md:rounded-2xl py-3 px-2 text-center">
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-[11px] md:text-xs font-bold text-foreground leading-tight">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
            <Share2 className="w-4 h-4" />
            <span className="font-medium">Chia sẻ:</span>
            {["Facebook", "Zalo", "Twitter"].map((s) => (
              <button key={s} data-testid={`share-${s.toLowerCase()}`} className="px-3 py-1 rounded-full border border-border text-xs font-bold hover:border-primary hover:text-primary transition-colors">{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Description + Specs + Reviews */}
      <ScrollReveal>
        <div className="mb-14 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="section-header-line text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-primary mb-5 md:mb-8">Mô tả sản phẩm</h2>
                {product.descriptionHtml ? (
                  <article
                    className="prose prose-neutral max-w-none prose-headings:font-black prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary"
                    // descriptionHtml is server-sanitized via bluemonday in landing-be.
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                ) : (
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{product.description || "Chưa có mô tả."}</p>
                )}

                {product.uses.length > 0 && (
                  <>
                    <h3 className="font-black text-sm md:text-base text-foreground mb-3 mt-5">Công dụng nổi bật:</h3>
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
                  </>
                )}
              </div>

              <div>
                <h2 className="section-header-line text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-primary mb-5 md:mb-8">Đánh giá khách hàng</h2>
                <div className="flex items-center gap-6 mb-6 bg-muted rounded-2xl p-5">
                  <div className="text-center">
                    <p className="text-5xl font-black text-primary">{avgRating}</p>
                    <div className="flex justify-center mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-4 h-4 ${s <= Math.round(Number(avgRating)) ? "fill-yellow-400 text-yellow-400" : "text-border"}`} />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{REVIEWS.length} đánh giá</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = REVIEWS.filter((r) => r.rating === star).length;
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs">
                          <span className="w-3 text-right text-muted-foreground">{star}</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 shrink-0" />
                          <div className="flex-1 bg-border rounded-full h-1.5 overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${(count / REVIEWS.length) * 100}%` }} />
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
                          {[1, 2, 3, 4, 5].map((s) => (
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

            {product.specs.length > 0 && (
              <div>
                <h2 className="section-header-line text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-primary mb-5 md:mb-8">Thông số kỹ thuật</h2>
                <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex items-start px-4 md:px-5 py-3 md:py-3.5 gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground font-medium w-28 shrink-0 pt-0.5">{spec.label}</span>
                      <span className="text-xs md:text-sm font-bold text-foreground flex-1">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>

      {related.length > 0 && (
        <ScrollReveal>
          <div>
            <div className="flex items-center justify-between border-b border-border pb-4 md:pb-5 mb-5 md:mb-10">
              <h2 className="section-header-line text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-primary">Sản Phẩm Liên Quan</h2>
              <Link href="/products" className="text-[12px] md:text-[13px] text-muted-foreground font-bold hover:text-primary transition-all flex items-center gap-1.5 group">
                Tất cả <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-5 md:gap-8">
              {related.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} data-testid={`related-product-${p.id}`} className="bg-card border border-border p-3 sm:p-6 rounded-xl sm:rounded-3xl text-center product-card group cursor-pointer h-full relative block">
                  {p.badge && (
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-primary text-primary-foreground text-[11px] sm:text-[11px] font-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">{p.badge}</div>
                  )}
                  <div className="aspect-square mb-3 sm:mb-6 bg-muted rounded-lg sm:rounded-2xl p-3 sm:p-6 flex items-center justify-center overflow-hidden relative">
                    <img className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" src={p.img} alt={p.name} loading="lazy" />
                    <div className="absolute inset-0 hidden sm:flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="w-10 h-10 rounded-full bg-card shadow-md flex items-center justify-center text-foreground translate-y-3 group-hover:translate-y-0 duration-300"><Eye className="w-4 h-4" /></span>
                      <span className="w-10 h-10 rounded-full bg-primary shadow-md flex items-center justify-center text-primary-foreground translate-y-3 group-hover:translate-y-0 duration-500"><ShoppingCart className="w-4 h-4" /></span>
                    </div>
                  </div>
                  <h5 className="text-[11px] sm:text-[14px] font-bold text-foreground h-8 sm:h-11 overflow-hidden line-clamp-2 leading-snug group-hover:text-primary transition-colors">{p.name}</h5>
                  <p className="text-secondary font-black text-sm sm:text-lg mt-2 sm:mt-3">{p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}
    </main>
  );
}
