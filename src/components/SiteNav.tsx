import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

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

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`bg-primary text-primary-foreground sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-md"}`}>
      <div className="container">
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

        {/* Mobile menu overlay */}
        <div
          className={`md:hidden fixed inset-0 top-[60px] bg-foreground/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Mobile menu panel */}
        <div
          className={`md:hidden fixed left-0 right-0 top-[60px] bg-primary z-50 transition-all duration-300 overflow-hidden ${
            mobileOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container pb-6 pt-2 space-y-1">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNavClick(l.href)}
                className={`block w-full text-left py-3 px-4 rounded-xl transition-all text-sm font-bold uppercase tracking-widest ${
                  activeSection === l.href ? "bg-primary-foreground/10 text-yellow-300" : "hover:bg-primary-foreground/5 hover:text-yellow-300"
                }`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#products")}
              className="block w-full text-left py-3 px-4 rounded-xl hover:bg-primary-foreground/5 transition-all text-sm font-bold uppercase tracking-widest hover:text-yellow-300"
            >
              Sản Phẩm
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
