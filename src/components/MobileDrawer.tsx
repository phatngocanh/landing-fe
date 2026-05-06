"use client";

import { ChevronRight, ChevronLeft, ChevronDown, Phone, X, Handshake } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileMenu } from "@/context/MobileMenuContext";
import type { CategoryDTO } from "@/lib/api/server";
import { buildCategoryTree, type CategoryNode } from "@/lib/api/categories-tree";

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

const DRAWER_WIDTH = 280;

interface Props {
  categories?: CategoryDTO[];
}

export default function MobileDrawer({ categories = [] }: Props) {
  const { mobileOpen, setMobileOpen } = useMobileMenu();
  const [panel, setPanel] = useState<"main" | "products">("main");
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<Set<number>>(new Set());
  const tree = useMemo(() => buildCategoryTree(categories), [categories]);
  const toggleExpanded = useCallback((id: number) => {
    setExpandedCategoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProducts = pathname.startsWith("/products") || pathname.startsWith("/product");

  const allLinks = isHome ? HOME_LINKS : PAGE_LINKS;

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
    if (href === "/") return !isProducts && pathname === "/";
    if (href === "/about") return pathname === "/about";
    if (href === "/news") return pathname === "/news";
    if (href === "/contact") return pathname === "/contact";
    return false;
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

              <button
                onClick={() => setPanel("products")}
                className={`flex items-center justify-between w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[14px] font-bold uppercase tracking-wider transition-colors ${
                  isProducts ? "text-yellow-300 bg-primary-foreground/10" : "hover:bg-primary-foreground/10"
                }`}
                data-testid="button-mobile-products"
              >
                <span>Sản phẩm</span>
                <ChevronRight className="w-4 h-4 text-primary-foreground/60 flex-shrink-0" />
              </button>
            </nav>

            <div className="px-4 pt-2">
              <Link
                href="/contact?subject=partnership"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl bg-yellow-400 text-foreground font-bold text-sm tracking-wide hover:brightness-110 transition-all"
              >
                <Handshake className="w-4 h-4" />
                Hợp tác đại lý
              </Link>
            </div>

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
              <span>Sản phẩm</span>
            </button>

            <nav className="pt-1 pb-4">
              <Link
                href="/products"
                onClick={close}
                className="flex items-center justify-between w-full text-left py-3.5 px-5 border-b border-primary-foreground/10 text-[13px] font-semibold normal-case tracking-normal hover:bg-primary-foreground/10 transition-colors text-yellow-300/80"
                data-testid="link-mobile-all-products"
              >
                <span>Tất cả sản phẩm</span>
              </Link>

              {tree.map((parent: CategoryNode) => {
                const expanded = expandedCategoryIds.has(parent.id);
                const hasChildren = parent.children.length > 0;
                return (
                  <div key={parent.id} className="border-b border-primary-foreground/10">
                    <div className="flex items-stretch">
                      <Link
                        href={`/products?category=${encodeURIComponent(parent.slug)}`}
                        onClick={close}
                        className="flex-1 py-3.5 px-5 text-[13px] font-semibold normal-case tracking-normal hover:bg-primary-foreground/10 transition-colors"
                        data-testid={`link-mobile-category-${parent.slug}`}
                      >
                        {parent.name}
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => toggleExpanded(parent.id)}
                          aria-expanded={expanded}
                          aria-label={expanded ? "Thu gọn" : "Mở rộng"}
                          className="px-4 hover:bg-primary-foreground/10 transition-colors flex items-center"
                          data-testid={`button-mobile-expand-${parent.slug}`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                          />
                        </button>
                      )}
                    </div>
                    {hasChildren && expanded && (
                      <ul className="bg-primary-foreground/5">
                        {parent.children.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={`/products?category=${encodeURIComponent(sub.slug)}`}
                              onClick={close}
                              className="flex items-center w-full py-2.5 pl-9 pr-5 text-[12.5px] font-medium normal-case tracking-normal text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors"
                              data-testid={`link-mobile-category-${sub.slug}`}
                            >
                              <span className="text-primary-foreground/50 mr-2">—</span>
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
