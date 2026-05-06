"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getMe } from "@/lib/api/admin-client";
import LogoutButton from "../LogoutButton";

const NAV_ITEMS = [
  { href: "/admin", label: "Tổng quan" },
  { href: "/admin/products", label: "Sản phẩm" },
  { href: "/admin/categories", label: "Danh mục" },
];

export default function AuthedAdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = auth.getToken();
    if (!token) {
      router.replace(`/admin/login?redirect=${encodeURIComponent(pathname || "/admin")}`);
      return;
    }
    // Verify the token against /admin/me. If invalid, the call clears auth on
    // 401 and we bounce to login.
    getMe()
      .then((me) => {
        if (!me) {
          router.replace("/admin/login");
          return;
        }
        setUsername(me.username);
        setChecked(true);
      })
      .catch(() => {
        auth.clear();
        router.replace("/admin/login");
      });
  }, [router, pathname]);

  if (!checked) {
    return (
      <div className="min-h-dvh flex items-center justify-center text-sm text-muted-foreground">
        Đang kiểm tra phiên đăng nhập...
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex">
      <aside className="w-60 shrink-0 bg-card border-r border-border flex flex-col">
        <div className="px-5 py-5 border-b border-border">
          <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">PNA Admin</p>
          <p className="text-sm font-bold text-foreground mt-1">{username}</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-border">
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-x-auto">{children}</main>
    </div>
  );
}
