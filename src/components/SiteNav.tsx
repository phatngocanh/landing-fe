"use client";

import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileMenu } from "@/context/MobileMenuContext";
import BrandLogo from "./BrandLogo";

const HOME_LINKS = [
  { label: "Trang Chủ",  anchor: "#hero"   },
  { label: "Giới Thiệu", anchor: "#about"  },
  { label: "Tin Tức",    anchor: "#news"   },
  { label: "Liên Hệ",   anchor: "#footer" },
];

const PAGE_LINKS = [
  { label: "Trang Chủ",  href: "/"       },
  { label: "Giới Thiệu", href: "/about"  },
  { label: "Tin Tức",    href: "/news"   },
  { label: "Liên Hệ",   href: "/contact" },
];

import { CATEGORIES } from "@/data/products";
const productCategories = CATEGORIES.filter((c) => c !== "Tất cả");

const SiteNav = () => {
  const { mobileOpen, toggleMobile } = useMobileMenu();
  const [activeAnchor, setActiveAnchor] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProducts = pathname.startsWith("/products") || pathname.startsWith("/product");
  const isBrands = pathname.startsWith("/brands") || pathname.startsWith("/zifat999") || pathname.startsWith("/sifa999");

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      for (const id of ["footer", "news", "brands", "about", "hero"]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveAnchor(`#${id}`);
          return;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const smoothScroll = useCallback((anchor: string) => {
    const run = () => {
      if (anchor === "#hero") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
      const el = document.querySelector(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    setTimeout(run, 0);
  }, []);

  const isPageLinkActive = (href: string) => {
    if (href === "/") return !isProducts && !isBrands && pathname === "/";
    if (href === "/about") return pathname === "/about";
    if (href === "/news") return pathname === "/news";
    if (href === "/contact") return pathname === "/contact";
    return false;
  };

  const ActiveBar = () => (
    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full" />
  );

  const leftLinks = isHome ? HOME_LINKS.slice(0, 2) : PAGE_LINKS.slice(0, 2);
  const rightLinks = isHome ? HOME_LINKS.slice(2) : PAGE_LINKS.slice(2);

  return (
    <nav
      className={`bg-primary text-primary-foreground sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      <div className="container relative">
        <div className="flex items-center justify-between md:justify-start py-4 gap-8 text-[13px] font-bold uppercase tracking-widest">

          <button
            className="md:hidden p-1"
            onClick={toggleMobile}
            aria-label="Toggle menu"
            data-testid="button-hamburger"
          >
            <div className="relative w-6 h-6">
              <Menu className={`w-6 h-6 absolute transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
              <X    className={`w-6 h-6 absolute transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8 overflow-visible">

            {leftLinks.map((l) => {
              const active = isHome
                ? activeAnchor === (l as typeof HOME_LINKS[number]).anchor
                : isPageLinkActive((l as typeof PAGE_LINKS[number]).href);
              return isHome ? (
                <button
                  key={l.label}
                  onClick={() => smoothScroll((l as typeof HOME_LINKS[number]).anchor)}
                  className={`relative py-1 whitespace-nowrap transition-colors ${active ? "text-yellow-300" : "hover:text-yellow-300"}`}
                >
                  {l.label}
                  {active && <ActiveBar />}
                </button>
              ) : (
                <Link
                  key={l.label}
                  href={(l as typeof PAGE_LINKS[number]).href}
                  className={`relative py-1 whitespace-nowrap transition-colors ${active ? "text-yellow-300" : "hover:text-yellow-300"}`}
                >
                  {l.label}
                  {active && <ActiveBar />}
                </Link>
              );
            })}

            <div className="group relative py-4 -my-4 cursor-pointer">
              <Link
                href="/brands"
                className={`flex items-center gap-1 transition-colors whitespace-nowrap ${
                  isBrands ? "text-yellow-300" : "hover:text-yellow-300"
                }`}
              >
                <span>Thương Hiệu</span>
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                {isBrands && (
                  <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-yellow-300 rounded-full" />
                )}
              </Link>
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 absolute left-0 top-full bg-card text-foreground shadow-2xl rounded-2xl border border-border p-6 w-[360px] z-50 normal-case font-medium">
                <div className="space-y-1 mb-4">
                  <Link href="/zifat999" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors text-sm group/item">
                    <BrandLogo brand="ZIFAT999" size="sm" />
                    <div>
                      <p className="font-bold text-foreground group-hover/item:text-blue-600 transition-colors">ZIFAT999</p>
                      <p className="text-xs text-muted-foreground">Tẩy rửa công nghiệp</p>
                    </div>
                  </Link>
                  <Link href="/sifa999" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors text-sm group/item">
                    <BrandLogo brand="SIFA999" size="sm" />
                    <div>
                      <p className="font-bold text-foreground group-hover/item:text-green-600 transition-colors">SIFA999</p>
                      <p className="text-xs text-muted-foreground">Chăm sóc gia đình</p>
                    </div>
                  </Link>
                </div>
                <div className="border-t border-border pt-3">
                  <Link
                    href="/brands"
                    className="flex items-center gap-2 font-bold text-primary text-sm hover:gap-3 transition-all px-3"
                  >
                    <span>Tất cả thương hiệu</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative py-4 -my-4 cursor-pointer">
              <Link
                href="/products"
                className={`flex items-center gap-1 transition-colors whitespace-nowrap ${
                  isProducts ? "text-yellow-300" : "hover:text-yellow-300"
                }`}
              >
                <span>Sản Phẩm</span>
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                {isProducts && (
                  <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-yellow-300 rounded-full" />
                )}
              </Link>
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 absolute left-0 top-full bg-card text-foreground shadow-2xl rounded-2xl border border-border p-8 grid grid-cols-2 gap-x-12 gap-y-4 w-[500px] z-50 normal-case font-medium">
                {productCategories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    className="flex items-center gap-3 hover:text-primary hover:translate-x-1 transition-all text-sm"
                  >
                    {cat}
                  </Link>
                ))}
                <Link
                  href="/products"
                  className="flex items-center gap-3 font-bold text-primary mt-4 border-t border-border pt-4 col-span-2 text-sm hover:gap-4 transition-all"
                >
                  <span>Tất cả sản phẩm</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {rightLinks.map((l) => {
              const active = isHome
                ? activeAnchor === (l as typeof HOME_LINKS[number]).anchor
                : isPageLinkActive((l as typeof PAGE_LINKS[number]).href);
              return isHome ? (
                <button
                  key={l.label}
                  onClick={() => smoothScroll((l as typeof HOME_LINKS[number]).anchor)}
                  className={`relative py-1 whitespace-nowrap transition-colors ${active ? "text-yellow-300" : "hover:text-yellow-300"}`}
                >
                  {l.label}
                  {active && <ActiveBar />}
                </button>
              ) : (
                <Link
                  key={l.label}
                  href={(l as typeof PAGE_LINKS[number]).href}
                  className={`relative py-1 whitespace-nowrap transition-colors ${active ? "text-yellow-300" : "hover:text-yellow-300"}`}
                >
                  {l.label}
                  {active && <ActiveBar />}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
