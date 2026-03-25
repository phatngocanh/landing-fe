"use client";

import { ChevronDown, ArrowRight, Menu, X, Phone } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/data/products";

// On the homepage every item smooth-scrolls to a section.
// "Sản Phẩm" is always a page-level link (even from the homepage).
const HOME_LINKS = [
  { label: "Trang Chủ",  anchor: "#hero"   },
  { label: "Giới Thiệu", anchor: "#about"  },
  { label: "Ưu Đãi",     anchor: "#combo"  },
  { label: "Tin Tức",    anchor: "#news"   },
  { label: "Liên Hệ",   anchor: "#footer" },
];

// On every other page all items navigate to their dedicated pages.
const PAGE_LINKS = [
  { label: "Trang Chủ",  href: "/"                                          },
  { label: "Giới Thiệu", href: "/about"                                     },
  { label: "Ưu Đãi",     href: "/products?category=Combo+%C6%B0u+%C4%91%C3%A3i" },
  { label: "Tin Tức",    href: "/news"                                      },
  { label: "Liên Hệ",   href: "/contact"                                   },
];

const productCategories = CATEGORIES.filter((c) => c !== "Tất cả");

const SiteNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProducts = pathname.startsWith("/products") || pathname.startsWith("/product");

  // Scroll-spy — only active on the homepage
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      for (const id of ["footer", "news", "combo", "about", "hero"]) {
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

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const smoothScroll = useCallback((anchor: string) => {
    setMobileOpen(false);
    const run = () => {
      if (anchor === "#hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.querySelector(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    // Give the mobile menu time to close before scrolling
    setTimeout(run, mobileOpen ? 350 : 0);
  }, [mobileOpen]);

  // Determine the active state for a PAGE_LINKS item
  const isPageLinkActive = (href: string) => {
    if (href === "/") return !isProducts && pathname === "/";
    if (href === "/about") return pathname === "/about";
    if (href.startsWith("/products?category=Combo")) return isProducts && typeof window !== "undefined" && window.location.search.includes("Combo");
    if (href === "/news") return pathname === "/news";
    if (href === "/contact") return pathname === "/contact";
    return false;
  };

  // Shared underline indicator
  const ActiveBar = () => (
    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full" />
  );

  // Desktop: left of Sản Phẩm (indices 0-1)
  const leftLinks = isHome ? HOME_LINKS.slice(0, 2) : PAGE_LINKS.slice(0, 2);
  // Desktop: right of Sản Phẩm (indices 2-4)
  const rightLinks = isHome ? HOME_LINKS.slice(2) : PAGE_LINKS.slice(2);
  // Mobile: all links (smooth-scroll or page)
  const allLinks = isHome ? HOME_LINKS : PAGE_LINKS;

  return (
    <>
      <nav
        className={`bg-primary text-primary-foreground sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-lg" : "shadow-md"
        }`}
      >
        <div className="container relative">
          <div className="flex items-center justify-between md:justify-start py-4 gap-8 text-[13px] font-bold uppercase tracking-widest">

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu className={`w-6 h-6 absolute transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
                <X    className={`w-6 h-6 absolute transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
              </div>
            </button>

            {/* ===== Desktop nav ===== */}
            <div className="hidden md:flex items-center gap-8 overflow-visible">

              {/* Left items */}
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

              {/* Sản Phẩm dropdown — always a page link */}
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

              {/* Right items */}
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

      {/* ===== Mobile menu overlay ===== */}
      <div
        className={`md:hidden fixed inset-0 z-[100] transition-all duration-400 ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-400 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-0 bg-primary text-primary-foreground transition-transform duration-400 ease-out flex flex-col ${mobileOpen ? "translate-y-0" : "-translate-y-full"}`}
          style={{ maxHeight: "100dvh" }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-primary-foreground/15">
            <span className="text-sm font-black uppercase tracking-widest text-primary-foreground/90">Menu</span>
            <button onClick={() => setMobileOpen(false)} className="p-2 -mr-2 rounded-full hover:bg-primary-foreground/10 transition-colors" aria-label="Đóng menu">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 overscroll-contain">
            <div className="px-4 pt-4 pb-2 space-y-0.5">
              {/* All nav items */}
              {allLinks.map((l, i) => {
                const active = isHome
                  ? activeAnchor === (l as typeof HOME_LINKS[number]).anchor
                  : isPageLinkActive((l as typeof PAGE_LINKS[number]).href);
                const cls = `flex items-center w-full text-left py-3.5 px-4 rounded-2xl transition-all text-[15px] font-bold uppercase tracking-wider ${active ? "bg-primary-foreground/15 text-yellow-300" : "hover:bg-primary-foreground/10 hover:text-yellow-300"}`;
                const anim = { animation: mobileOpen ? `slideInFromLeft 0.3s ease-out ${i * 50}ms both` : "none" };
                return isHome ? (
                  <button key={l.label} onClick={() => smoothScroll((l as typeof HOME_LINKS[number]).anchor)} className={cls} style={anim}>
                    <span>{l.label}</span>
                    {active && <span className="ml-auto w-2 h-2 rounded-full bg-yellow-300" />}
                  </button>
                ) : (
                  <Link key={l.label} href={(l as typeof PAGE_LINKS[number]).href} onClick={() => setMobileOpen(false)} className={cls} style={anim}>
                    <span>{l.label}</span>
                    {active && <span className="ml-auto w-2 h-2 rounded-full bg-yellow-300" />}
                  </Link>
                );
              })}

              {/* Sản Phẩm — always a page link */}
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center w-full text-left py-3.5 px-4 rounded-2xl transition-all text-[15px] font-bold uppercase tracking-wider ${isProducts ? "bg-primary-foreground/15 text-yellow-300" : "hover:bg-primary-foreground/10 hover:text-yellow-300"}`}
                style={{ animation: mobileOpen ? `slideInFromLeft 0.3s ease-out ${allLinks.length * 50}ms both` : "none" }}
              >
                <span>Sản Phẩm</span>
                {isProducts && <span className="ml-auto w-2 h-2 rounded-full bg-yellow-300" />}
              </Link>
            </div>

            <div className="mx-6 my-2 border-t border-primary-foreground/15" />

            {/* Product categories */}
            <div className="px-4 pb-4">
              <p className="text-[11px] font-black uppercase tracking-widest text-primary-foreground/40 px-4 pb-3 pt-1">Danh mục sản phẩm</p>
              <div className="grid grid-cols-1 gap-0.5">
                {productCategories.map((cat, i) => (
                  <Link
                    key={cat}
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl hover:bg-primary-foreground/10 transition-all text-sm normal-case font-medium tracking-normal hover:text-yellow-300"
                    style={{ animation: mobileOpen ? `slideInFromLeft 0.3s ease-out ${(allLinks.length + 1 + i) * 40}ms both` : "none" }}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-primary-foreground/40" />
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mx-6 my-1 border-t border-primary-foreground/15" />

            <div className="px-4 pb-8 pt-3">
              <a
                href="tel:02862713214"
                className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-primary-foreground/15 hover:bg-primary-foreground/20 transition-all border border-primary-foreground/10"
              >
                <Phone className="w-5 h-5 text-yellow-300" />
                <span className="font-bold text-base tracking-wide">0286.271.3214</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteNav;
