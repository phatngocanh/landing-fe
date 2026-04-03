"use client";

import { ChevronRight, ChevronLeft, Phone, X, Handshake } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileMenu } from "@/context/MobileMenuContext";
import BrandLogo from "./BrandLogo";
import { NAV_LINKS, PRODUCT_CATEGORIES } from "@/data/navigation";

const DRAWER_WIDTH = 280;

export default function MobileDrawer() {
  const { mobileOpen, setMobileOpen } = useMobileMenu();
  const [panel, setPanel] = useState<"main" | "products" | "brands">("main");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProducts = pathname.startsWith("/products") || pathname.startsWith("/product");
  const isBrands = pathname.startsWith("/brands") || pathname.startsWith("/zifat999") || pathname.startsWith("/sifa999");

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

  useEffect(() => {
    if (!mobileOpen) {
      const t = setTimeout(() => setPanel("main"), 350);
      return () => clearTimeout(t);
    }
  }, [mobileOpen]);

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

  const isPageActive = (href: string) => {
    if (href === "/") return !isProducts && !isBrands && pathname === "/";
    return pathname === href;
  };

  return (
    <>
      <div
        className={`md:hidden fixed inset-0 z-[150] bg-black/60 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        className="md:hidden fixed top-0 left-0 h-full z-[200] bg-primary text-primary-foreground flex flex-col shadow-2xl"
        style={{
          width: DRAWER_WIDTH,
          transform: mobileOpen ? "translateX(0)" : `translateX(-${DRAWER_WIDTH}px)`,
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu điều hướng"
      >
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

        <div className="flex-1 overflow-hidden relative">
          {/* Main panel */}
          <div
            className="absolute inset-0 flex flex-col overflow-y-auto overscroll-contain transition-transform duration-300 ease-in-out"
            style={{ transform: panel === "main" ? "translateX(0)" : `translateX(-${DRAWER_WIDTH}px)` }}
          >
            {/* Phone CTA — top of drawer for conversion */}
            <div className="px-4 pt-4 pb-2">
              <a
                href="tel:02862713214"
                className="flex items-center justify-center gap-3 w-full py-3.5 px-5 rounded-2xl bg-primary-foreground/15 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/10"
                data-testid="link-mobile-phone"
              >
                <Phone className="w-4 h-4 text-yellow-300" />
                <span className="font-bold text-sm tracking-wide">0286.271.3214</span>
              </a>
            </div>

            <nav className="flex-1 pt-2 pb-4">
              {NAV_LINKS.map((l) => {
                const useAnchor = isHome && l.anchor !== null;
                const active = useAnchor
                  ? false
                  : isPageActive(l.href);
                const cls = `flex items-center justify-between w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[14px] font-bold uppercase tracking-wider transition-colors ${
                  active ? "text-yellow-300 bg-primary-foreground/10" : "hover:bg-primary-foreground/10"
                }`;

                return useAnchor ? (
                  <button
                    key={l.label}
                    onClick={() => smoothScroll(l.anchor!)}
                    className={cls}
                    data-testid={`link-mobile-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <span>{l.label}</span>
                  </button>
                ) : (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={close}
                    className={cls}
                    data-testid={`link-mobile-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <span>{l.label}</span>
                  </Link>
                );
              })}

              <button
                onClick={() => setPanel("brands")}
                className={`flex items-center justify-between w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[14px] font-bold uppercase tracking-wider transition-colors ${
                  isBrands ? "text-yellow-300 bg-primary-foreground/10" : "hover:bg-primary-foreground/10"
                }`}
                data-testid="button-mobile-brands"
              >
                <span>THƯƠNG HIỆU</span>
                <ChevronRight className="w-4 h-4 text-primary-foreground/60 flex-shrink-0" />
              </button>

              <button
                onClick={() => setPanel("products")}
                className={`flex items-center justify-between w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[14px] font-bold uppercase tracking-wider transition-colors ${
                  isProducts ? "text-yellow-300 bg-primary-foreground/10" : "hover:bg-primary-foreground/10"
                }`}
                data-testid="button-mobile-products"
              >
                <span>SẢN PHẨM</span>
                <ChevronRight className="w-4 h-4 text-primary-foreground/60 flex-shrink-0" />
              </button>

              {/* Partnership CTA */}
              <Link
                href="/contact?subject=partnership"
                onClick={close}
                className="flex items-center gap-3 mx-4 mt-4 py-3.5 px-5 rounded-2xl bg-yellow-300/15 border border-yellow-300/30 text-yellow-300 text-[14px] font-bold uppercase tracking-wider hover:bg-yellow-300/25 transition-colors"
                data-testid="link-mobile-partnership"
              >
                <Handshake className="w-5 h-5 flex-shrink-0" />
                <span>HỢP TÁC ĐẠI LÝ</span>
              </Link>
            </nav>
          </div>

          {/* Brands sub-panel */}
          <div
            className="absolute inset-0 flex flex-col overflow-y-auto overscroll-contain transition-transform duration-300 ease-in-out"
            style={{ transform: panel === "brands" ? "translateX(0)" : `translateX(${DRAWER_WIDTH}px)` }}
          >
            <button
              onClick={() => setPanel("main")}
              className="flex items-center gap-2 px-5 py-3.5 border-b border-primary-foreground/15 hover:bg-primary-foreground/10 transition-colors text-[14px] font-bold uppercase tracking-wider flex-shrink-0 w-full text-left"
              data-testid="button-mobile-brands-back"
            >
              <ChevronLeft className="w-5 h-5 text-primary-foreground/70" />
              <span>THƯƠNG HIỆU</span>
            </button>

            <nav className="pt-1 pb-4">
              <Link
                href="/brands"
                onClick={close}
                className="flex items-center justify-between w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[13px] font-semibold normal-case tracking-normal hover:bg-primary-foreground/10 transition-colors text-yellow-300/80"
                data-testid="link-mobile-all-brands"
              >
                <span>Tất Cả Thương Hiệu</span>
              </Link>

              <Link
                href="/zifat999"
                onClick={close}
                className="flex items-center gap-3 w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[13px] font-semibold normal-case tracking-normal hover:bg-primary-foreground/10 transition-colors border-l-2 border-l-blue-400"
                data-testid="link-mobile-zifat999"
              >
                <BrandLogo brand="ZIFAT999" size="sm" />
                <div>
                  <p className="font-bold text-blue-300">ZIFAT999</p>
                  <p className="text-[11px] text-primary-foreground/60">Tẩy rửa công nghiệp</p>
                </div>
              </Link>

              <Link
                href="/products?brand=ZIFAT999"
                onClick={close}
                className="flex items-center w-full text-left py-3 px-5 pl-14 border-b border-primary-foreground/10 text-[12px] font-semibold normal-case tracking-normal hover:bg-primary-foreground/10 transition-colors text-primary-foreground/80"
                data-testid="link-mobile-zifat999-products"
              >
                Sản phẩm ZIFAT999
              </Link>

              <Link
                href="/sifa999"
                onClick={close}
                className="flex items-center gap-3 w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[13px] font-semibold normal-case tracking-normal hover:bg-primary-foreground/10 transition-colors border-l-2 border-l-green-400"
                data-testid="link-mobile-sifa999"
              >
                <BrandLogo brand="SIFA999" size="sm" />
                <div>
                  <p className="font-bold text-green-300">SIFA999</p>
                  <p className="text-[11px] text-primary-foreground/60">Chăm sóc gia đình</p>
                </div>
              </Link>

              <Link
                href="/products?brand=SIFA999"
                onClick={close}
                className="flex items-center w-full text-left py-3 px-5 pl-14 border-b border-primary-foreground/10 text-[12px] font-semibold normal-case tracking-normal hover:bg-primary-foreground/10 transition-colors text-primary-foreground/80"
                data-testid="link-mobile-sifa999-products"
              >
                Sản phẩm SIFA999
              </Link>
            </nav>
          </div>

          {/* Products sub-panel */}
          <div
            className="absolute inset-0 flex flex-col overflow-y-auto overscroll-contain transition-transform duration-300 ease-in-out"
            style={{ transform: panel === "products" ? "translateX(0)" : `translateX(${DRAWER_WIDTH}px)` }}
          >
            <button
              onClick={() => setPanel("main")}
              className="flex items-center gap-2 px-5 py-3.5 border-b border-primary-foreground/15 hover:bg-primary-foreground/10 transition-colors text-[14px] font-bold uppercase tracking-wider flex-shrink-0 w-full text-left"
              data-testid="button-mobile-products-back"
            >
              <ChevronLeft className="w-5 h-5 text-primary-foreground/70" />
              <span>SẢN PHẨM</span>
            </button>

            <nav className="pt-1 pb-4">
              <Link
                href="/products"
                onClick={close}
                className="flex items-center justify-between w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[13px] font-semibold normal-case tracking-normal hover:bg-primary-foreground/10 transition-colors text-yellow-300/80"
                data-testid="link-mobile-all-products"
              >
                <span>Tất Cả Sản Phẩm</span>
              </Link>

              {PRODUCT_CATEGORIES.map((cat) => (
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
