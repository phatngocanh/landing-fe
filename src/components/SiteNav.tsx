import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Trang Chủ", href: "#hero" },
  { label: "Giới Thiệu", href: "#about" },
  { label: "Ưu Đãi", href: "#combo" },
  { label: "Kiểm Nghiệm", href: "#" },
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

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
      <div className="container">
        <div className="flex items-center justify-between md:justify-start py-4 gap-10 text-[13px] font-bold uppercase tracking-widest">
          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10 overflow-visible">
            {navLinks.slice(0, 2).map((l) => (
              <a key={l.label} className="hover:text-yellow-300 transition-colors whitespace-nowrap" href={l.href}>
                {l.label}
              </a>
            ))}

            {/* Products dropdown */}
            <div className="group relative py-4 -my-4 cursor-pointer">
              <div className="flex items-center gap-1 hover:text-yellow-300 transition-colors whitespace-nowrap">
                <span>Sản Phẩm</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="hidden group-hover:grid absolute left-0 top-full bg-card text-foreground shadow-2xl rounded-2xl border border-border p-8 grid-cols-2 gap-x-12 gap-y-4 w-[500px] z-50 normal-case font-medium">
                {productCategories.map((cat) => (
                  <a key={cat} className="flex items-center gap-3 hover:text-primary transition-all text-sm" href="#">
                    {cat}
                  </a>
                ))}
                <a className="flex items-center gap-3 font-bold text-primary mt-4 border-t border-border pt-4 col-span-2 text-sm" href="#products">
                  <span>Tất cả sản phẩm</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {navLinks.slice(3).map((l) => (
              <a key={l.label} className="hover:text-yellow-300 transition-colors whitespace-nowrap" href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {navLinks.map((l) => (
              <a key={l.label} className="block py-2 hover:text-yellow-300 transition-colors text-sm font-bold uppercase tracking-widest" href={l.href} onClick={() => setMobileOpen(false)}>
                {l.label}
              </a>
            ))}
            <a className="block py-2 hover:text-yellow-300 transition-colors text-sm font-bold uppercase tracking-widest" href="#products" onClick={() => setMobileOpen(false)}>
              Sản Phẩm
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SiteNav;
