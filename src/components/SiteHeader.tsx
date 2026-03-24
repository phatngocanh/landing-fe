import { Search, ShoppingCart, User, Phone } from "lucide-react";
import { useState } from "react";

const SiteHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-card border-b border-border relative z-[60]">
      <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-extrabold text-[10px] text-center p-2 border-2 border-yellow-400 shadow-sm shrink-0">
            PHÁT NGỌC ANH
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight leading-none uppercase">
              Công Ty TNHH Hóa Phẩm
            </h1>
            <h2 className="text-4xl font-black text-primary tracking-tighter uppercase">
              Phát Ngọc Anh
            </h2>
            <p className="text-xs text-muted-foreground font-medium mt-1">
              430/33 Đường TA 28, P. Thới An, Quận 12, TP.HCM
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-3 text-muted-foreground">
            <span className="text-primary bg-primary/10 p-2 rounded-full">
              <Phone className="w-5 h-5" />
            </span>
            <span className="font-bold text-secondary text-lg">0286.271.3214</span>
          </div>
          <div className="flex bg-muted rounded-full px-5 py-2.5 border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-300">
            <input
              className="bg-transparent border-none focus:outline-none text-sm w-48 lg:w-72"
              placeholder="Tìm kiếm sản phẩm..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 text-muted-foreground hover:text-primary transition-all active:scale-95 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-card" />
            </button>
            <button className="p-2.5 text-muted-foreground hover:text-primary transition-all active:scale-95">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
