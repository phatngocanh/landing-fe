import { redirect } from "next/navigation";
import Link from "next/link";
import { getMe } from "@/lib/api/admin-server";
import LogoutButton from "../LogoutButton";

const NAV_ITEMS = [
  { href: "/admin", label: "Tổng quan" },
  { href: "/admin/products", label: "Sản phẩm" },
  { href: "/admin/categories", label: "Danh mục" },
];

export default async function AuthedAdminLayout({ children }: { children: React.ReactNode }) {
  const me = await getMe();
  if (!me) redirect("/admin/login");

  return (
    <div className="min-h-dvh flex">
      <aside className="w-60 shrink-0 bg-card border-r border-border flex flex-col">
        <div className="px-5 py-5 border-b border-border">
          <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">PNA Admin</p>
          <p className="text-sm font-bold text-foreground mt-1">{me.username}</p>
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
