import { Search, Phone, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const SiteHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

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
            <h1 className="text-base md:text-xl font-extrabold text-foreground tracking-tight leading-none uppercase">
              Công Ty TNHH Hóa Phẩm
            </h1>
            <h2 className="text-2xl md:text-4xl font-black text-primary tracking-tighter uppercase">
              Phát Ngọc Anh
            </h2>
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
          <div className={`hidden sm:flex bg-muted rounded-full px-4 md:px-5 py-2 md:py-2.5 border transition-all duration-300 ${searchFocused ? "border-primary ring-2 ring-primary/10 w-56 md:w-80" : "border-border w-44 md:w-64 lg:w-72"}`}>
            <input
              ref={searchRef}
              className="bg-transparent border-none focus:outline-none text-sm flex-1 min-w-0"
              placeholder="Tìm kiếm... (/)"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchQuery ? (
              <button aria-label="Xóa tìm kiếm" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => { setSearchQuery(""); searchRef.current?.focus(); }}>
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button aria-label="Tìm kiếm" className="text-muted-foreground hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>
          {/* Mobile search icon */}
          <button aria-label="Mở tìm kiếm" className="sm:hidden p-2 text-muted-foreground hover:text-primary rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-xs hover:brightness-110 transition-all uppercase tracking-wider active:scale-95"
          >
            Trở Thành Đại Lý
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
