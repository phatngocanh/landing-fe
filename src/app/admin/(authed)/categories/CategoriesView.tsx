"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { toast } from "sonner";
import {
  ApiError,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/api/admin-client";
import type { CategoryDTO } from "@/lib/api/server";

interface Props {
  initial: CategoryDTO[];
}

export default function CategoriesView({ initial }: Props) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newSort, setNewSort] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editSort, setEditSort] = useState(0);
  const [pending, startTransition] = useTransition();

  function startEdit(cat: CategoryDTO) {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
    setEditSort(cat.sortOrder);
  }
  function cancelEdit() { setEditingId(null); }

  function onCreate() {
    if (!newName.trim()) {
      toast.error("Tên danh mục là bắt buộc");
      return;
    }
    startTransition(async () => {
      try {
        await createCategory({ name: newName, slug: newSlug || undefined, sortOrder: newSort });
        toast.success("Đã tạo");
        setCreating(false); setNewName(""); setNewSlug(""); setNewSort(0);
        router.refresh();
      } catch (err) {
        if (err instanceof ApiError) toast.error(err.message);
        else toast.error("Lưu thất bại");
      }
    });
  }
  function onUpdate(id: number) {
    if (!editName.trim()) { toast.error("Tên là bắt buộc"); return; }
    startTransition(async () => {
      try {
        await updateCategory(id, { name: editName, slug: editSlug || undefined, sortOrder: editSort });
        toast.success("Đã cập nhật");
        setEditingId(null);
        router.refresh();
      } catch (err) {
        if (err instanceof ApiError) toast.error(err.message);
        else toast.error("Lưu thất bại");
      }
    });
  }
  function onDelete(cat: CategoryDTO) {
    if (cat.productCount > 0) {
      toast.error(`Không thể xóa: còn ${cat.productCount} sản phẩm`);
      return;
    }
    if (!confirm(`Xóa "${cat.name}"?`)) return;
    startTransition(async () => {
      try {
        await deleteCategory(cat.id);
        toast.success("Đã xóa");
        router.refresh();
      } catch (err) {
        if (err instanceof ApiError) toast.error(err.message);
        else toast.error("Xóa thất bại");
      }
    });
  }

  return (
    <div className="space-y-4">
      {!creating ? (
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" /> Tạo mới
        </button>
      ) : (
        <div className="bg-card border border-primary/40 rounded-xl p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Tên" className={inputCls} />
            <input value={newSlug} onChange={(e) => setNewSlug(e.target.value)} placeholder="slug (tự sinh nếu trống)" className={inputCls + " font-mono"} />
            <input type="number" value={newSort} onChange={(e) => setNewSort(Number(e.target.value))} placeholder="thứ tự" className={inputCls} />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <button onClick={() => setCreating(false)} className="px-3 py-1.5 rounded-lg border border-border text-sm font-semibold hover:bg-muted">Hủy</button>
            <button disabled={pending} onClick={onCreate} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:brightness-110 disabled:opacity-50">
              Tạo
            </button>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3 w-20">Thứ tự</th>
              <th className="px-4 py-3 w-24">Số SP</th>
              <th className="px-4 py-3 w-24"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {initial.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">Chưa có danh mục.</td></tr>
            )}
            {initial.map((cat) =>
              editingId === cat.id ? (
                <tr key={cat.id} className="bg-muted/30">
                  <td className="px-4 py-2"><input value={editName} onChange={(e) => setEditName(e.target.value)} className={inputCls} /></td>
                  <td className="px-4 py-2"><input value={editSlug} onChange={(e) => setEditSlug(e.target.value)} className={inputCls + " font-mono"} /></td>
                  <td className="px-4 py-2"><input type="number" value={editSort} onChange={(e) => setEditSort(Number(e.target.value))} className={inputCls} /></td>
                  <td className="px-4 py-2 text-muted-foreground">{cat.productCount}</td>
                  <td className="px-4 py-2 text-right">
                    <button onClick={() => onUpdate(cat.id)} disabled={pending} className="p-1.5 rounded-md text-primary hover:bg-primary/10 disabled:opacity-50" title="Lưu">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={cancelEdit} className="p-1.5 rounded-md text-muted-foreground hover:bg-muted" title="Hủy">
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={cat.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-bold">{cat.name}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{cat.slug}</td>
                  <td className="px-4 py-3 text-muted-foreground">{cat.sortOrder}</td>
                  <td className="px-4 py-3 text-muted-foreground">{cat.productCount}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => startEdit(cat)} className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" title="Sửa">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(cat)} disabled={pending} className="p-1.5 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-50" title="Xóa">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputCls =
  "w-full bg-muted border border-border rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";
