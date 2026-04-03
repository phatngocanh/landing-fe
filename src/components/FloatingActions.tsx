"use client";

import { Phone, ArrowUp, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const FloatingActions = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handler = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col gap-2 md:gap-3">
      {/* Zalo */}
      <a
        className="w-12 h-12 md:w-14 md:h-14 bg-[hsl(210,100%,50%)] text-primary-foreground rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        href="https://zalo.me/02862713214"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        title="Chat Zalo"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
      </a>
      {/* Phone */}
      <a
        className="w-12 h-12 md:w-14 md:h-14 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        href="tel:02862713214"
        aria-label="Gọi ngay"
        title="Gọi ngay"
      >
        <Phone className="w-5 h-5 md:w-6 md:h-6" />
      </a>
      {/* Back to top */}
      <button
        className={`w-12 h-12 md:w-14 md:h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Về đầu trang"
      >
        <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>
  );
};

export default FloatingActions;
