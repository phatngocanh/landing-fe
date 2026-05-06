"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ApiError, deleteProduct } from "@/lib/api/admin-client";

export default function ProductRowActions({ id, name, onDeleted }: { id: number; name: string; onDeleted?: () => void }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/admin/products/${id}/edit`}
        className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        title="Sửa"
      >
        <Pencil className="w-4 h-4" />
      </Link>
      <button
        onClick={() => {
          if (!confirm(`Xóa "${name}"?`)) return;
          startTransition(async () => {
            try {
              await deleteProduct(id);
              toast.success("Đã xóa");
              onDeleted?.();
            } catch (err) {
              if (err instanceof ApiError) toast.error(err.message);
              else toast.error("Xóa thất bại");
            }
          });
        }}
        disabled={pending}
        className="p-1.5 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors disabled:opacity-50"
        title="Xóa"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
