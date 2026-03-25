"use client";

import { ChevronDown, ArrowRight, Menu, X, Phone } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/data/products";

// Unified nav structure — same items on every page.
// homeHref = smooth-scroll target on /
// pageHref = full-page link from any other page
const NAV_ITEMS = [
  { label: "Trang Chủ",  homeHref: "#hero",   pageHref: "/"        },
  { label: "Giới Thiệu", homeHref: "#about",  pageHref: "/about"   },
  // "Sản Phẩm" is the dropdown — rendered separately between index 1 and 2
  { label: "Ưu Đãi",     homeHref: "#combo",  pageHref: "/#combo"  },
  { label: "Tin Tức",    homeHref: "#news",   pageHref: "/#news"   },
  { label: "Liên Hệ",   homeHref: "#footer", pageHref: "/#footer" },
];

const productCategories = CATEGORIES.filter((c) => c !== "Tất cả");

const SiteNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isProductsActive = pathname.startsWith("/products") || pathname.startsWith("/product");
  const isAboutActive = pathname === "/about";

  // Scroll-spy only on homepage
  useEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = ["footer", "news", "products", "combo", "about", "hero"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Smooth-scroll to a section id on the homepage
  const handleHomeNavClick = useCallback((sectionHref: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.querySelector(sectionHref);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, mobileOpen ? 350 : 0);
  }, [mobileOpen]);

  // Determine active state for a nav item
  const isItemActive = (item: typeof NAV_ITEMS[number]) => {
    if (isHomePage) return activeSection === item.homeHref;
    if (item.pageHref === "/about") return isAboutActive;
    if (item.pageHref === "/") return !isProductsActive && !isAboutActive;
    return false;
  };

  // Render a single nav link — button on homepage, Link on inner pages
  const NavLink = ({
    item,
    className,
    index,
  }: {
    item: typeof NAV_ITEMS[number];
    className?: string;
    index: number;
  }) => {
    const active = isItemActive(item);
    const base = `relative py-1 transition-colors whitespace-nowrap ${
      active ? "text-yellow-300" : "hover:text-yellow-300"
    } ${className ?? ""}`;

    const indicator = active && (
      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full" />
    );

    if (isHomePage) {
      return (
        <button key={item.label} onClick={() => handleHomeNavClick(item.homeHref)} className={base}>
          {item.label}
          {indicator}
        </button>
      );
    }
    return (
      <Link key={item.label} href={item.pageHref} className={base}>
        {item.label}
        {indicator}
      </Link>
    );
  };

  // Items shown BEFORE the Sản Phẩm dropdown (desktop)
  const leftItems = NAV_ITEMS.slice(0, 2);
  // Items shown AFTER the Sản Phẩm dropdown (desktop)
  const rightItems = NAV_ITEMS.slice(2);

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
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu className={`w-6 h-6 absolute transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
                <X    className={`w-6 h-6 absolute transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
              </div>
            </button>

            {/* ===== Desktop nav ===== */}
            <div className="hidden md:flex items-center gap-8 overflow-visible">

              {/* Left items: Trang Chủ, Giới Thiệu */}
              {leftItems.map((item, i) => (
                <NavLink key={item.label} item={item} index={i} />
              ))}

              {/* Sản Phẩm dropdown */}
              <div className="group relative py-4 -my-4 cursor-pointer">
                <Link
                  href="/products"
                  className={`flex items-center gap-1 transition-colors whitespace-nowrap ${
                    isProductsActive ? "text-yellow-300" : "hover:text-yellow-300"
                  }`}
                >
                  <span>Sản Phẩm</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  {isProductsActive && (
                    <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-yellow-300 rounded-full" />
                  )}
                </Link>

                {/* Dropdown panel */}
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

              {/* Right items: Ưu Đãi, Tin Tức, Liên Hệ */}
              {rightItems.map((item, i) => (
                <NavLink key={item.label} item={item} index={i + leftItems.length + 1} />
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Full-screen mobile menu overlay ===== */}
      <div
        className={`md:hidden fixed inset-0 z-[100] transition-all duration-400 ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-400 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`absolute inset-x-0 top-0 bg-primary text-primary-foreground transition-transform duration-400 ease-out flex flex-col ${
            mobileOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ maxHeight: "100dvh" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-primary-foreground/15">
            <span className="text-sm font-black uppercase tracking-widest text-primary-foreground/90">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 -mr-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
              aria-label="Đóng menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 overscroll-contain">
            {/* All nav items */}
            <div className="px-4 pt-4 pb-2 space-y-0.5">
              {NAV_ITEMS.map((item, i) => {
                const active = isItemActive(item);
                const baseClass = `flex items-center w-full text-left py-3.5 px-4 rounded-2xl transition-all text-[15px] font-bold uppercase tracking-wider ${
                  active
                    ? "bg-primary-foreground/15 text-yellow-300"
                    : "hover:bg-primary-foreground/10 hover:text-yellow-300"
                }`;
                const anim = { animation: mobileOpen ? `slideInFromLeft 0.3s ease-out ${i * 50}ms both` : "none" };

                return isHomePage ? (
                  <button
                    key={item.label}
                    onClick={() => handleHomeNavClick(item.homeHref)}
                    className={baseClass}
                    style={anim}
                  >
                    <span>{item.label}</span>
                    {active && <span className="ml-auto w-2 h-2 rounded-full bg-yellow-300" />}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.pageHref}
                    onClick={() => setMobileOpen(false)}
                    className={baseClass}
                    style={anim}
                  >
                    <span>{item.label}</span>
                    {active && <span className="ml-auto w-2 h-2 rounded-full bg-yellow-300" />}
                  </Link>
                );
              })}

              {/* Sản Phẩm link */}
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center w-full text-left py-3.5 px-4 rounded-2xl transition-all text-[15px] font-bold uppercase tracking-wider ${
                  isProductsActive
                    ? "bg-primary-foreground/15 text-yellow-300"
                    : "hover:bg-primary-foreground/10 hover:text-yellow-300"
                }`}
                style={{ animation: mobileOpen ? `slideInFromLeft 0.3s ease-out ${NAV_ITEMS.length * 50}ms both` : "none" }}
              >
                <span>Sản Phẩm</span>
                {isProductsActive && <span className="ml-auto w-2 h-2 rounded-full bg-yellow-300" />}
              </Link>
            </div>

            <div className="mx-6 my-2 border-t border-primary-foreground/15" />

            {/* Product categories */}
            <div className="px-4 pb-4">
              <p className="text-[11px] font-black uppercase tracking-widest text-primary-foreground/40 px-4 pb-3 pt-1">
                Danh mục sản phẩm
              </p>
              <div className="grid grid-cols-1 gap-0.5">
                {productCategories.map((cat, i) => (
                  <Link
                    key={cat}
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl hover:bg-primary-foreground/10 transition-all text-sm normal-case font-medium tracking-normal hover:text-yellow-300"
                    style={{ animation: mobileOpen ? `slideInFromLeft 0.3s ease-out ${(NAV_ITEMS.length + 1 + i) * 40}ms both` : "none" }}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-primary-foreground/40" />
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mx-6 my-1 border-t border-primary-foreground/15" />

            {/* Contact CTA */}
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
