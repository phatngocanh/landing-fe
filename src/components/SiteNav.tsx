"use client";

import { ChevronDown, ArrowRight, Menu, X, Handshake } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileMenu } from "@/context/MobileMenuContext";
import BrandLogo from "./BrandLogo";
import { NAV_LINKS, PRODUCT_CATEGORIES } from "@/data/navigation";

const SiteNav = () => {
  const { mobileOpen, toggleMobile } = useMobileMenu();
  const [activeAnchor, setActiveAnchor] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"brands" | "products" | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProducts = pathname.startsWith("/products") || pathname.startsWith("/product");
  const isBrands = pathname.startsWith("/brands") || pathname.startsWith("/zifat999") || pathname.startsWith("/sifa999");

  const brandsRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for active anchor (home) and shadow (all pages)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      if (!isHome) return;
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

  // Close dropdown on Escape or outside click
  useEffect(() => {
    if (!openDropdown) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        brandsRef.current && !brandsRef.current.contains(target) &&
        productsRef.current && !productsRef.current.contains(target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openDropdown]);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

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
    return pathname === href;
  };

  const ActiveBar = () => (
    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full" />
  );

  const toggleDropdown = (name: "brands" | "products") => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  // Split links: first 2 left, last 2 right (Liên Hệ is now always a link)
  const leftLinks = NAV_LINKS.slice(0, 2);
  const rightLinks = NAV_LINKS.slice(2);

  const renderNavLink = (l: typeof NAV_LINKS[number]) => {
    const useAnchor = isHome && l.anchor !== null;
    const active = useAnchor
      ? activeAnchor === l.anchor
      : isPageLinkActive(l.href);

    if (useAnchor) {
      return (
        <button
          key={l.label}
          onClick={() => smoothScroll(l.anchor!)}
          className={`relative py-1 whitespace-nowrap transition-colors ${active ? "text-yellow-300" : "hover:text-yellow-300"}`}
        >
          {l.label}
          {active && <ActiveBar />}
        </button>
      );
    }

    return (
      <Link
        key={l.label}
        href={l.href}
        className={`relative py-1 whitespace-nowrap transition-colors ${active ? "text-yellow-300" : "hover:text-yellow-300"}`}
      >
        {l.label}
        {active && <ActiveBar />}
      </Link>
    );
  };

  return (
    <nav
      className={`bg-primary text-primary-foreground sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      <div className="container relative">
        <div className="flex items-center justify-between md:justify-start py-4 gap-8 text-[13px] font-bold uppercase tracking-widest">

          {/* Hamburger — mobile */}
          <button
            className="md:hidden p-1"
            onClick={toggleMobile}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            data-testid="button-hamburger"
          >
            <div className="relative w-6 h-6">
              <Menu className={`w-6 h-6 absolute transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
              <X    className={`w-6 h-6 absolute transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 overflow-visible">

            {/* Left links */}
            {leftLinks.map(renderNavLink)}

            {/* Brands dropdown — click + hover */}
            <div
              ref={brandsRef}
              className="group relative py-4 -my-4 cursor-pointer"
              onMouseEnter={() => setOpenDropdown("brands")}
              onMouseLeave={() => { if (openDropdown === "brands") setOpenDropdown(null); }}
            >
              <button
                onClick={() => toggleDropdown("brands")}
                aria-expanded={openDropdown === "brands"}
                aria-haspopup="true"
                className={`flex items-center gap-1 transition-colors whitespace-nowrap ${
                  isBrands ? "text-yellow-300" : "hover:text-yellow-300"
                }`}
              >
                <span>THƯƠNG HIỆU</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "brands" ? "rotate-180" : "group-hover:rotate-180"}`} />
                {isBrands && (
                  <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-yellow-300 rounded-full" />
                )}
              </button>
              <div
                className={`absolute left-0 top-full bg-card text-foreground shadow-2xl rounded-2xl border border-border p-6 w-[360px] z-50 normal-case font-medium transition-all duration-300 ${
                  openDropdown === "brands"
                    ? "visible opacity-100 translate-y-0"
                    : "invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0"
                }`}
                role="menu"
              >
                <div className="space-y-1 mb-4">
                  <Link href="/zifat999" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-teal-50 transition-colors text-sm group/item border-l-2 border-transparent hover:border-teal-500" role="menuitem">
                    <BrandLogo brand="ZIFAT999" size="sm" />
                    <div>
                      <p className="font-bold text-foreground group-hover/item:text-teal-600 transition-colors">ZIFAT999</p>
                      <p className="text-xs text-muted-foreground">Tẩy rửa công nghiệp</p>
                    </div>
                  </Link>
                  <Link href="/sifa999" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors text-sm group/item border-l-2 border-transparent hover:border-green-500" role="menuitem">
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
                    role="menuitem"
                  >
                    <span>Tất cả thương hiệu</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Products dropdown — click + hover */}
            <div
              ref={productsRef}
              className="group relative py-4 -my-4 cursor-pointer"
              onMouseEnter={() => setOpenDropdown("products")}
              onMouseLeave={() => { if (openDropdown === "products") setOpenDropdown(null); }}
            >
              <button
                onClick={() => toggleDropdown("products")}
                aria-expanded={openDropdown === "products"}
                aria-haspopup="true"
                className={`flex items-center gap-1 transition-colors whitespace-nowrap ${
                  isProducts ? "text-yellow-300" : "hover:text-yellow-300"
                }`}
              >
                <span>SẢN PHẨM</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "products" ? "rotate-180" : "group-hover:rotate-180"}`} />
                {isProducts && (
                  <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-yellow-300 rounded-full" />
                )}
              </button>
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full bg-card text-foreground shadow-2xl rounded-2xl border border-border p-8 grid grid-cols-2 gap-x-12 gap-y-4 w-[500px] max-w-[calc(100vw-2rem)] z-50 normal-case font-medium transition-all duration-300 ${
                  openDropdown === "products"
                    ? "visible opacity-100 translate-y-0"
                    : "invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0"
                }`}
                role="menu"
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    className="flex items-center gap-3 hover:text-primary hover:translate-x-1 transition-all text-sm"
                    role="menuitem"
                  >
                    {cat}
                  </Link>
                ))}
                <Link
                  href="/products"
                  className="flex items-center gap-3 font-bold text-primary mt-4 border-t border-border pt-4 col-span-2 text-sm hover:gap-4 transition-all"
                  role="menuitem"
                >
                  <span>Tất cả sản phẩm</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right links */}
            {rightLinks.map(renderNavLink)}

            {/* CTA: Hợp Tác */}
            <Link
              href="/contact?subject=partnership"
              className="flex items-center gap-2 bg-yellow-300 text-primary px-4 py-1.5 rounded-full hover:bg-yellow-200 transition-colors text-[12px] font-extrabold tracking-wider whitespace-nowrap ml-auto"
            >
              <Handshake className="w-4 h-4" />
              <span>HỢP TÁC</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
