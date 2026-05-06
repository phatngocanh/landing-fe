"use client";

import { ChevronDown, ArrowRight, Menu, X, Handshake } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileMenu } from "@/context/MobileMenuContext";
import type { CategoryDTO } from "@/lib/api/server";
import { buildCategoryTree } from "@/lib/api/categories-tree";

const HOME_LINKS = [
  { label: "Trang chủ",  anchor: "#hero"   },
  { label: "Giới thiệu", anchor: "#about"  },
  { label: "Tin tức",    anchor: "#news"   },
  { label: "Liên hệ",   anchor: "#footer" },
];

const PAGE_LINKS = [
  { label: "Trang chủ",  href: "/"        },
  { label: "Giới thiệu", href: "/about"  },
  { label: "Tin tức",    href: "/news"   },
  { label: "Liên hệ",   href: "/contact"},
];

interface Props {
  categories?: CategoryDTO[];
}

const SiteNav = ({ categories = [] }: Props) => {
  const { mobileOpen, toggleMobile } = useMobileMenu();
  const [activeAnchor, setActiveAnchor] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProducts = pathname.startsWith("/products") || pathname.startsWith("/product");

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      for (const id of ["footer", "news", "about", "hero"]) {
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
    if (href === "/") return !isProducts && pathname === "/";
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
                  className={`relative py-1 whitespace-nowrap uppercase transition-colors ${active ? "text-yellow-300" : "hover:text-yellow-300"}`}
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

            <CategoriesMegaMenu categories={categories} isProducts={isProducts} />

            {rightLinks.map((l) => {
              const active = isHome
                ? activeAnchor === (l as typeof HOME_LINKS[number]).anchor
                : isPageLinkActive((l as typeof PAGE_LINKS[number]).href);
              return isHome ? (
                <button
                  key={l.label}
                  onClick={() => smoothScroll((l as typeof HOME_LINKS[number]).anchor)}
                  className={`relative py-1 whitespace-nowrap uppercase transition-colors ${active ? "text-yellow-300" : "hover:text-yellow-300"}`}
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

            <Link
              href="/contact?subject=partnership"
              className="ml-auto flex items-center gap-1.5 bg-yellow-400 text-foreground px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all"
            >
              <Handshake className="w-3.5 h-3.5" />
              Hợp tác
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;

interface MegaMenuProps {
  categories: CategoryDTO[];
  isProducts: boolean;
}

// Single-view mega menu (desktop only). All top-level categories are visible
// at once in a 2-column auto-balanced grid; sub-categories are inline under
// their parent so the user never has to hover individual rows to discover
// what's available. CSS columns + break-inside-avoid keeps the parent-with-
// children block intact while balancing visual height across the two columns.
function CategoriesMegaMenu({ categories, isProducts }: MegaMenuProps) {
  const tree = useMemo(() => buildCategoryTree(categories), [categories]);
  const totalProducts = useMemo(
    () => tree.reduce((sum, t) => sum + t.totalProductCount, 0),
    [tree],
  );

  // State-driven visibility instead of pure CSS :hover so we can dismiss the
  // dropdown the instant the user clicks a category link. Pure CSS hover
  // leaves the panel open after click because the cursor is still over it.
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Close on route change too — covers Link clicks, programmatic nav, browser back/forward.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div
      className="relative py-4 -my-4"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) setOpen(false);
      }}
    >
      <Link
        href="/products"
        className={`flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer ${
          isProducts ? "text-yellow-300" : "hover:text-yellow-300"
        }`}
      >
        <span>Sản phẩm</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
        {isProducts && <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-yellow-300 rounded-full" />}
      </Link>

      {tree.length > 0 && (
        <div
          className={`absolute left-0 top-full pt-3 z-50 normal-case font-medium transition-all duration-200 ${
            open
              ? "visible opacity-100 translate-y-0 pointer-events-auto"
              : "invisible opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="bg-card text-foreground shadow-2xl rounded-2xl border border-border w-[640px] overflow-hidden">
            {/* Header strip — brand color, sets context */}
            <div className="flex items-center justify-between px-5 py-3 bg-primary text-primary-foreground">
              <p className="text-[10px] font-black uppercase tracking-[0.22em]">
                Khám phá danh mục
              </p>
              <span className="text-[11px] font-semibold opacity-90">
                {totalProducts} sản phẩm
              </span>
            </div>

            {/* Auto-balanced 2-col grid; cards never split mid-block */}
            <div className="columns-2 gap-x-2 p-2">
              {tree.map((parent) => {
                const hasKids = parent.children.length > 0;
                return (
                  <div
                    key={parent.id}
                    className="break-inside-avoid mb-1 rounded-xl p-3 hover:bg-muted/60 transition-colors"
                  >
                    <Link
                      href={`/products?category=${encodeURIComponent(parent.slug)}`}
                      className="flex items-start justify-between gap-3 group/parent"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[13.5px] font-bold text-foreground line-clamp-1 group-hover/parent:text-primary transition-colors">
                          {parent.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {parent.totalProductCount} sản phẩm
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 mt-1 text-muted-foreground/50 group-hover/parent:text-primary group-hover/parent:translate-x-0.5 transition-all" />
                    </Link>
                    {hasKids && (
                      <ul className="mt-2 pl-3 border-l-2 border-primary/20 space-y-0.5">
                        {parent.children.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={`/products?category=${encodeURIComponent(sub.slug)}`}
                              className="flex items-center justify-between gap-3 py-1 text-[12.5px] text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all"
                            >
                              <span>{sub.name}</span>
                              <span className="text-[10.5px] text-muted-foreground/70 group-hover/sub:opacity-100">
                                {sub.productCount}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA — subtle tinted bar, full-width clickable */}
            <Link
              href="/products"
              className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-border bg-primary/5 hover:bg-primary/10 transition-colors text-sm font-bold text-primary"
            >
              <span>Xem tất cả sản phẩm</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
