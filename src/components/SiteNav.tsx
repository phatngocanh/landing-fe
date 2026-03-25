import { ChevronDown, ArrowRight, Menu, X, Phone } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { label: "Trang Chủ", href: "#hero" },
  { label: "Giới Thiệu", href: "#about" },
  { label: "Ưu Đãi", href: "#combo" },
  { label: "Kiểm Nghiệm", href: "#about" },
  { label: "Tin Tức", href: "#news" },
  { label: "Liên Hệ", href: "#footer" },
];

const productCategories = [
  "Chất thông cống, WC",
  "Chất tẩy rửa đa năng",
  "Nước giặt, xả quần áo",
  "Nước rửa chén",
  "Thuốc diệt côn trùng",
  "Dầu làm bóng",
  "Sản phẩm cho ô tô",
];

const SiteNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    // Small delay so the menu closes smoothly before scrolling
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  }, []);

  return (
    <>
      <nav className={`bg-primary text-primary-foreground sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-md"}`}>
        <div className="container relative">
          <div className="flex items-center justify-between md:justify-start py-4 gap-10 text-[13px] font-bold uppercase tracking-widest">
            {/* Mobile toggle */}
            <button
              className="md:hidden p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu className={`w-6 h-6 absolute transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
                <X className={`w-6 h-6 absolute transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-10 overflow-visible">
              {navLinks.slice(0, 2).map((l) => (
                <button
                  key={l.label}
                  onClick={() => handleNavClick(l.href)}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    activeSection === l.href ? "text-yellow-300" : "hover:text-yellow-300"
                  }`}
                >
                  {l.label}
                  {activeSection === l.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full" />
                  )}
                </button>
              ))}

              {/* Products dropdown */}
              <div className="group relative py-4 -my-4 cursor-pointer">
                <div className={`flex items-center gap-1 transition-colors whitespace-nowrap ${
                  activeSection === "#products" ? "text-yellow-300" : "hover:text-yellow-300"
                }`}>
                  <span>Sản Phẩm</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </div>
                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 absolute left-0 top-full bg-card text-foreground shadow-2xl rounded-2xl border border-border p-8 grid grid-cols-2 gap-x-12 gap-y-4 w-[500px] z-50 normal-case font-medium">
                  {productCategories.map((cat) => (
                    <a key={cat} className="flex items-center gap-3 hover:text-primary hover:translate-x-1 transition-all text-sm" href="#">
                      {cat}
                    </a>
                  ))}
                  <button
                    onClick={() => handleNavClick("#products")}
                    className="flex items-center gap-3 font-bold text-primary mt-4 border-t border-border pt-4 col-span-2 text-sm hover:gap-4 transition-all"
                  >
                    <span>Tất cả sản phẩm</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {navLinks.slice(3).map((l) => (
                <button
                  key={l.label}
                  onClick={() => handleNavClick(l.href)}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    activeSection === l.href ? "text-yellow-300" : "hover:text-yellow-300"
                  }`}
                >
                  {l.label}
                  {activeSection === l.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Full-screen mobile menu overlay ===== */}
      <div
        className={`md:hidden fixed inset-0 z-[100] transition-all duration-400 ${
          mobileOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-400 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu panel — slides from top, covers entire screen */}
        <div
          className={`absolute inset-x-0 top-0 bg-primary text-primary-foreground transition-transform duration-400 ease-out flex flex-col ${
            mobileOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ maxHeight: "100dvh" }}
        >
          {/* Menu header with close button */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-primary-foreground/15">
            <span className="text-sm font-black uppercase tracking-widest text-primary-foreground/90">
              Menu
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 -mr-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
              aria-label="Đóng menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 overscroll-contain">
            {/* Main nav links */}
            <div className="px-4 pt-4 pb-2 space-y-0.5">
              {navLinks.map((l, i) => (
                <button
                  key={l.label}
                  onClick={() => handleNavClick(l.href)}
                  className={`flex items-center w-full text-left py-3.5 px-4 rounded-2xl transition-all text-[15px] font-bold uppercase tracking-wider ${
                    activeSection === l.href
                      ? "bg-primary-foreground/15 text-yellow-300"
                      : "hover:bg-primary-foreground/8 hover:text-yellow-300 active:bg-primary-foreground/12"
                  }`}
                  style={{
                    animationDelay: `${i * 50}ms`,
                    animation: mobileOpen ? `slideInFromLeft 0.3s ease-out ${i * 50}ms both` : "none",
                  }}
                >
                  <span>{l.label}</span>
                  {activeSection === l.href && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-yellow-300" />
                  )}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#products")}
                className={`flex items-center w-full text-left py-3.5 px-4 rounded-2xl transition-all text-[15px] font-bold uppercase tracking-wider ${
                  activeSection === "#products"
                    ? "bg-primary-foreground/15 text-yellow-300"
                    : "hover:bg-primary-foreground/8 hover:text-yellow-300 active:bg-primary-foreground/12"
                }`}
                style={{
                  animationDelay: `${navLinks.length * 50}ms`,
                  animation: mobileOpen ? `slideInFromLeft 0.3s ease-out ${navLinks.length * 50}ms both` : "none",
                }}
              >
                <span>Sản Phẩm</span>
                {activeSection === "#products" && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-yellow-300" />
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="mx-6 my-2 border-t border-primary-foreground/15" />

            {/* Product categories */}
            <div className="px-4 pb-4">
              <p className="text-[11px] font-black uppercase tracking-widest text-primary-foreground/40 px-4 pb-3 pt-1">
                Danh mục sản phẩm
              </p>
              <div className="grid grid-cols-1 gap-0.5">
                {productCategories.map((cat, i) => (
                  <a
                    key={cat}
                    href="#"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl hover:bg-primary-foreground/8 transition-all text-sm normal-case font-medium tracking-normal hover:text-yellow-300 active:bg-primary-foreground/12"
                    style={{
                      animation: mobileOpen ? `slideInFromLeft 0.3s ease-out ${(navLinks.length + 1 + i) * 40}ms both` : "none",
                    }}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-primary-foreground/40" />
                    {cat}
                  </a>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="mx-6 my-1 border-t border-primary-foreground/15" />

            {/* Contact CTA */}
            <div className="px-4 pb-8 pt-3">
              <a
                href="tel:02862713214"
                className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-primary-foreground/15 hover:bg-primary-foreground/20 transition-all active:scale-[0.98] border border-primary-foreground/10"
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
