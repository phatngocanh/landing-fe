import Link from "next/link";
import { adminListProducts } from "@/lib/api/admin-server";
import { getCategories } from "@/lib/api/server";

export default async function AdminDashboardPage() {
  const [productsResp, categories] = await Promise.all([
    adminListProducts(),
    getCategories(),
  ]);
  const products = productsResp?.items ?? [];
  const active = products.filter((p) => p.status === "active").length;
  const draft = products.filter((p) => p.status === "draft").length;

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-black">Tổng quan</h1>
        <p className="text-sm text-muted-foreground mt-1">Quản lý nhanh danh mục và sản phẩm.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
        <Card label="Sản phẩm" value={products.length} href="/admin/products" />
        <Card label="Đang hiển thị" value={active} sublabel={`${draft} bản nháp`} />
        <Card label="Danh mục" value={categories.length} href="/admin/categories" />
      </div>
    </div>
  );
}

function Card({
  label,
  value,
  sublabel,
  href,
}: {
  label: string;
  value: number;
  sublabel?: string;
  href?: string;
}) {
  const inner = (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors">
      <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="text-3xl font-black mt-2">{value}</p>
      {sublabel && <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}
