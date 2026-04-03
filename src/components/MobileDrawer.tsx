"use client";

import { ChevronRight, ChevronLeft, Phone, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileMenu } from "@/context/MobileMenuContext";
import { CATEGORIES, BRANDS } from "@/data/products";

const HOME_LINKS = [
  { label: "Trang Chủ",  anchor: "#hero"   },
  { label: "Giới Thiệu", anchor: "#about"  },
  { label: "Thương Hiệu", anchor: "#brands" },
  { label: "Tin Tức",    anchor: "#news"   },
  { label: "Liên Hệ",   anchor: "#footer" },
];

const PAGE_LINKS = [
  { label: "Trang Chủ",  href: "/"        },
  { label: "Giới Thiệu", href: "/about"   },
  { label: "Tin Tức",    href: "/news"    },
  { label: "Liên Hệ",   href: "/contact" },
];

const BRAND_LINKS = [
  { label: "ZIFAT 999", href: "/zifat999", bgColor: "bg-emerald-600" },
  { label: "SIFA 999",  href: "/sifa999",  bgColor: "bg-sky-600" },
];

const productCategories = CATEGORIES.filter((c) => c !== "Tất cả");

const DRAWER_WIDTH = 280;

export default function MobileDrawer() {
  const { mobileOpen, setMobileOpen } = useMobileMenu();
  const [panel, setPanel] = useState<"main" | "products" | "brands">("main");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProducts = pathname.startsWith("/products") || pathname.startsWith("/product");

  const allLinks = isHome ? HOME_LINKS : PAGE_LINKS;

  // Lock scroll and push page when open
  useEffect(() => {
    const wrap = document.getElementById("page-wrap");
    if (!wrap) return;

    if (mobileOpen) {
      wrap.style.transform = `translateX(${DRAWER_WIDTH}px)`;
      wrap.style.transition = "transform 0.35s cubic-bezier(0.4,0,0.2,1)";
      document.documentElement.style.overflow = "hidden";
    } else {
      wrap.style.transform = "translateX(0)";
      wrap.style.transition = "transform 0.35s cubic-bezier(0.4,0,0.2,1)";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  // Reset to main panel when closed
  useEffect(() => {
    if (!mobileOpen) {
      const t = setTimeout(() => setPanel("main"), 350);
      return () => clearTimeout(t);
    }
  }, [mobileOpen]);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  const close = useCallback(() => setMobileOpen(false), [setMobileOpen]);

  const smoothScroll = useCallback(
    (anchor: string) => {
      close();
      const run = () => {
        if (anchor === "#hero") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
        const el = document.querySelector(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      };
      setTimeout(run, 380);
    },
    [close]
  );

  const isBrandPage = pathname === "/zifat999" || pathname === "/sifa999";

  const isPageActive = (href: string) => {
    if (href === "/") return !isProducts && !isBrandPage && pathname === "/";
    if (href === "/about") return pathname === "/about";
    if (href === "/news") return pathname === "/news";
    if (href === "/contact") return pathname === "/contact";
    return false;
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[150] bg-black/60 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className="md:hidden fixed top-0 left-0 h-full z-[200] bg-primary text-primary-foreground flex flex-col shadow-2xl"
        style={{
          width: DRAWER_WIDTH,
          transform: mobileOpen ? "translateX(0)" : `translateX(-${DRAWER_WIDTH}px)`,
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-primary-foreground/15 flex-shrink-0">
          <span className="text-sm font-black uppercase tracking-widest text-primary-foreground/80">Menu</span>
          <button
            onClick={close}
            className="p-2 -mr-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
            aria-label="Đóng menu"
            data-testid="button-mobile-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sliding inner panels container */}
        <div className="flex-1 overflow-hidden relative">
          {/* ── Main panel ── */}
          <div
            className="absolute inset-0 flex flex-col overflow-y-auto overscroll-contain transition-transform duration-300 ease-in-out"
            style={{ transform: panel === "main" ? "translateX(0)" : `translateX(-${DRAWER_WIDTH}px)` }}
          >
            <nav className="flex-1 pt-2 pb-4">
              {allLinks.map((l) => {
                const active = isHome
                  ? false
                  : isPageActive((l as typeof PAGE_LINKS[number]).href);
                const cls = `flex items-center justify-between w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[14px] font-bold uppercase tracking-wider transition-colors ${
                  active ? "text-yellow-300 bg-primary-foreground/10" : "hover:bg-primary-foreground/10"
                }`;

                return isHome ? (
                  <button
                    key={l.label}
                    onClick={() => smoothScroll((l as typeof HOME_LINKS[number]).anchor)}
                    className={cls}
                    data-testid={`link-mobile-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <span>{l.label}</span>
                  </button>
                ) : (
                  <Link
                    key={l.label}
                    href={(l as typeof PAGE_LINKS[number]).href}
                    onClick={close}
                    className={cls}
                    data-testid={`link-mobile-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <span>{l.label}</span>
                  </Link>
                );
              })}

              {/* Thương Hiệu — opens brands panel */}
              <button
                onClick={() => setPanel("brands")}
                className={`flex items-center justify-between w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[14px] font-bold uppercase tracking-wider transition-colors ${
                  isBrandPage ? "text-yellow-300 bg-primary-foreground/10" : "hover:bg-primary-foreground/10"
                }`}
                data-testid="button-mobile-brands"
              >
                <span>Thương Hiệu</span>
                <ChevronRight className="w-4 h-4 text-primary-foreground/60 flex-shrink-0" />
              </button>

              {/* Sản Phẩm — opens subcategory panel */}
              <button
                onClick={() => setPanel("products")}
                className={`flex items-center justify-between w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[14px] font-bold uppercase tracking-wider transition-colors ${
                  isProducts ? "text-yellow-300 bg-primary-foreground/10" : "hover:bg-primary-foreground/10"
                }`}
                data-testid="button-mobile-products"
              >
                <span>Sản Phẩm</span>
                <ChevronRight className="w-4 h-4 text-primary-foreground/60 flex-shrink-0" />
              </button>
            </nav>

            {/* Phone CTA */}
            <div className="px-4 pb-6 pt-2">
              <a
                href="tel:02862713214"
                className="flex items-center justify-center gap-3 w-full py-3.5 px-5 rounded-2xl bg-primary-foreground/15 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/10"
                data-testid="link-mobile-phone"
              >
                <Phone className="w-4 h-4 text-yellow-300" />
                <span className="font-bold text-sm tracking-wide">0286.271.3214</span>
              </a>
            </div>
          </div>

          {/* ── Brands sub-panel ── */}
          <div
            className="absolute inset-0 flex flex-col overflow-y-auto overscroll-contain transition-transform duration-300 ease-in-out"
            style={{ transform: panel === "brands" ? "translateX(0)" : `translateX(${DRAWER_WIDTH}px)` }}
          >
            {/* Back header */}
            <button
              onClick={() => setPanel("main")}
              className="flex items-center gap-2 px-5 py-3.5 border-b border-primary-foreground/15 hover:bg-primary-foreground/10 transition-colors text-[14px] font-bold uppercase tracking-wider flex-shrink-0 w-full text-left"
              data-testid="button-mobile-brands-back"
            >
              <ChevronLeft className="w-5 h-5 text-primary-foreground/70" />
              <span>Thương Hiệu</span>
            </button>

            <nav className="pt-1 pb-4">
              {BRAND_LINKS.map((brand) => (
                <Link
                  key={brand.label}
                  href={brand.href}
                  onClick={close}
                  className="flex items-center gap-3 w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[14px] font-bold tracking-normal hover:bg-primary-foreground/10 transition-colors"
                  data-testid={`link-mobile-brand-${brand.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <span className={`w-3 h-3 rounded-full ${brand.bgColor}`} />
                  <span>{brand.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Products sub-panel ── */}
          <div
            className="absolute inset-0 flex flex-col overflow-y-auto overscroll-contain transition-transform duration-300 ease-in-out"
            style={{ transform: panel === "products" ? "translateX(0)" : panel === "main" ? `translateX(${DRAWER_WIDTH}px)` : `translateX(${DRAWER_WIDTH * 2}px)` }}
          >
            {/* Back header */}
            <button
              onClick={() => setPanel("main")}
              className="flex items-center gap-2 px-5 py-3.5 border-b border-primary-foreground/15 hover:bg-primary-foreground/10 transition-colors text-[14px] font-bold uppercase tracking-wider flex-shrink-0 w-full text-left"
              data-testid="button-mobile-products-back"
            >
              <ChevronLeft className="w-5 h-5 text-primary-foreground/70" />
              <span>Sản Phẩm</span>
            </button>

            <nav className="pt-1 pb-4">
              {/* All products link */}
              <Link
                href="/products"
                onClick={close}
                className="flex items-center justify-between w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[13px] font-semibold normal-case tracking-normal hover:bg-primary-foreground/10 transition-colors text-yellow-300/80"
                data-testid="link-mobile-all-products"
              >
                <span>Tất Cả Sản Phẩm</span>
              </Link>

              {productCategories.map((cat) => (
                <Link
                  key={cat}
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  onClick={close}
                  className="flex items-center justify-between w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[13px] font-semibold normal-case tracking-normal hover:bg-primary-foreground/10 transition-colors"
                  data-testid={`link-mobile-category-${encodeURIComponent(cat)}`}
                >
                  <span>{cat}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
