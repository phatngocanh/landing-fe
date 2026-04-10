"use client";

import { Search, Package, Phone, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const SiteHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/products?q=${encodeURIComponent(q)}`);
      setSearchQuery("");
      searchRef.current?.blur();
      setMobileSearchOpen(false);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !searchFocused) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape" && searchFocused) {
        searchRef.current?.blur();
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [searchFocused]);

  return (
    <header className="bg-card border-b border-border relative z-[60]">
      <div className="container py-3 md:py-5 flex items-center justify-between gap-3 md:gap-6">
        {/* Logo — compact on mobile */}
        <Link href="/" className="flex items-center gap-3 md:gap-5 group shrink-0">
          <Image
            src="/phatngocanhlogo.jpg"
            alt="PHÁT NGỌC ANH — logo công ty"
            width={80}
            height={80}
            className="h-12 w-auto md:h-20 object-contain shrink-0 group-hover:scale-105 transition-transform"
            priority
          />
          <div className="hidden sm:block">
            <p className="text-base md:text-xl font-extrabold text-foreground tracking-tight leading-none uppercase">
              Công Ty TNHH Hóa Phẩm
            </p>
            <p className="text-2xl md:text-4xl font-black text-primary tracking-tighter uppercase">
              Phát Ngọc Anh
            </p>
            <p className="text-xs text-muted-foreground font-medium mt-1 hidden md:block">
              430/33 Đường TA 28, P. Thới An, Quận 12, TP.HCM
            </p>
          </div>
          {/* Mobile brand name */}
          <div className="sm:hidden">
            <p className="text-xs font-extrabold text-foreground uppercase leading-tight">Hóa Phẩm</p>
            <p className="text-base font-black text-primary uppercase tracking-tight leading-tight">Phát Ngọc Anh</p>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-8">
          <a href="tel:02862713214" className="hidden lg:flex items-center gap-3 text-muted-foreground group">
            <span className="text-primary bg-primary/10 p-2 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Phone className="w-5 h-5" />
            </span>
            <span className="font-bold text-secondary text-lg group-hover:underline">0286.271.3214</span>
          </a>
          {/* Search — hidden on small mobile, shown from sm+ */}
          <form onSubmit={handleSearchSubmit} className={`hidden sm:flex bg-muted rounded-full px-4 md:px-5 py-2 md:py-2.5 border transition-all duration-300 ${searchFocused ? "border-primary ring-2 ring-primary/10 w-56 md:w-80" : "border-border w-44 md:w-64 lg:w-72"}`}>
            <label htmlFor="desktop-search" className="sr-only">Tìm kiếm sản phẩm</label>
            <input
              id="desktop-search"
              ref={searchRef}
              className="bg-transparent border-none focus:outline-none text-sm flex-1 min-w-0"
              placeholder="Tìm kiếm... (/)"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchQuery ? (
              <button type="button" aria-label="Xóa tìm kiếm" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => { setSearchQuery(""); searchRef.current?.focus(); }}>
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button type="submit" aria-label="Tìm kiếm" className="text-muted-foreground hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            )}
          </form>
          {/* Mobile search icon */}
          <button
            aria-label="Mở tìm kiếm"
            className="sm:hidden p-2 text-muted-foreground hover:text-primary rounded-full transition-colors"
            onClick={() => {
              setMobileSearchOpen((v) => !v);
              setTimeout(() => mobileSearchRef.current?.focus(), 100);
            }}
          >
            <Search className="w-5 h-5" />
          </button>
          <Link href="/products" aria-label="Xem sản phẩm" className="p-2 md:p-2.5 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all active:scale-95">
            <Package className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Mobile search bar */}
      {mobileSearchOpen && (
        <div className="sm:hidden border-t border-border px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="flex bg-muted rounded-full px-4 py-2.5 border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <label htmlFor="mobile-search" className="sr-only">Tìm kiếm sản phẩm</label>
            <input
              id="mobile-search"
              ref={mobileSearchRef}
              className="bg-transparent border-none focus:outline-none text-sm flex-1 min-w-0"
              placeholder="Tìm kiếm sản phẩm..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <button type="button" aria-label="Xóa" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => { setSearchQuery(""); mobileSearchRef.current?.focus(); }}>
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button type="submit" aria-label="Tìm kiếm" className="text-muted-foreground hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            )}
          </form>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
