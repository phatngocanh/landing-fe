"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface MobileMenuContextType {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  toggleMobile: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType>({
  mobileOpen: false,
  setMobileOpen: () => {},
  toggleMobile: () => {},
});

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((v) => !v);

  return (
    <MobileMenuContext.Provider value={{ mobileOpen, setMobileOpen, toggleMobile }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu() {
  return useContext(MobileMenuContext);
}
