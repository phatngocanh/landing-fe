"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { adminListProducts } from "@/lib/api/admin-client";
import type { ApiProductSummary } from "@/lib/api/types";
import ProductRowActions from "./ProductRowActions";

export default function AdminProductsPage() {
  const [items, setItems] = useState<ApiProductSummary[]>([]);
  const [loading, setLoading] = useState(true);

  async function reload() {
    setLoading(true);
    try {
      const data = await adminListProducts();
      setItems(data?.items ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Sản phẩm</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {loading ? "Đang tải..." : `${items.length} sản phẩm`}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" /> Tạo mới
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Danh mục</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  Chưa có sản phẩm nào.
                </td>
              </tr>
            )}
            {items.map((p) => (
              <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/admin/products/${p.id}/edit`} className="font-bold text-foreground hover:text-primary">
                    {p.name}
                  </Link>
                  <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{p.slug}</p>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.category?.name ?? "—"}</td>
                <td className="px-4 py-3">{p.priceText}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-black uppercase tracking-widest ${
                    p.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {p.status === "active" ? "Hiển thị" : "Nháp"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <ProductRowActions id={p.id} name={p.name} onDeleted={reload} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
