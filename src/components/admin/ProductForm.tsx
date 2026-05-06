"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RichTextEditor from "./RichTextEditor";
import ImageUrlList, { type ImageInput } from "./ImageUrlList";
import {
  ApiError,
  createProduct,
  updateProduct,
  type ProductUpsertBody,
} from "@/lib/api/admin-client";
import type { CategoryDTO } from "@/lib/api/server";

export interface ProductFormInitial {
  id?: number;
  name: string;
  slug: string;
  categoryId: number | null;
  priceText: string;
  priceRaw: number | null;
  descriptionHtml: string;
  status: "active" | "draft";
  seoTitle: string;
  seoDescription: string;
  sourceUrl: string;
  images: ImageInput[];
}

interface Props {
  initial: ProductFormInitial;
  categories: CategoryDTO[];
  mode: "create" | "edit";
}

export default function ProductForm({ initial, categories, mode }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initial.name);
  const [slug, setSlug] = useState(initial.slug);
  const [categoryId, setCategoryId] = useState<number | null>(initial.categoryId);
  const [priceText, setPriceText] = useState(initial.priceText);
  const [priceRaw, setPriceRaw] = useState<string>(initial.priceRaw?.toString() ?? "");
  const [descriptionHtml, setDescriptionHtml] = useState(initial.descriptionHtml);
  const [status, setStatus] = useState<"active" | "draft">(initial.status);
  const [seoTitle, setSeoTitle] = useState(initial.seoTitle);
  const [seoDescription, setSeoDescription] = useState(initial.seoDescription);
  const [sourceUrl, setSourceUrl] = useState(initial.sourceUrl);
  const [images, setImages] = useState<ImageInput[]>(initial.images);
  const [pending, startTransition] = useTransition();

  function buildPayload(): ProductUpsertBody {
    return {
      name,
      slug: slug || undefined,
      categoryId: categoryId,
      priceText: priceText || undefined,
      priceRaw: priceRaw ? Number(priceRaw) : null,
      descriptionHtml,
      status,
      seoTitle: seoTitle || undefined,
      seoDescription: seoDescription || undefined,
      sourceUrl: sourceUrl || undefined,
      images: images.filter((i) => i.url.trim() !== ""),
    };
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Tên sản phẩm là bắt buộc");
      return;
    }
    startTransition(async () => {
      try {
        if (mode === "create") {
          const created = await createProduct(buildPayload());
          toast.success("Đã tạo sản phẩm");
          router.push(`/admin/products/${created!.id}/edit`);
          router.refresh();
        } else {
          await updateProduct(initial.id!, buildPayload());
          toast.success("Đã cập nhật");
          router.refresh();
        }
      } catch (err) {
        if (err instanceof ApiError) toast.error(err.message);
        else toast.error("Lưu thất bại");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5 bg-card border border-border rounded-xl p-6">
          <Field label="Tên sản phẩm *">
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} required />
          </Field>
          <Field label="Slug" hint="Bỏ trống để tự sinh từ tên (có chuyển dấu tiếng Việt sang ASCII)">
            <input value={slug} onChange={(e) => setSlug(e.target.value)} className={inputCls + " font-mono"} />
          </Field>
          <Field label="Mô tả">
            <RichTextEditor value={descriptionHtml} onChange={setDescriptionHtml} />
          </Field>
          <Field label="Ảnh">
            <ImageUrlList value={images} onChange={setImages} />
          </Field>
        </div>

        <div className="space-y-5">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <Field label="Trạng thái">
              <select value={status} onChange={(e) => setStatus(e.target.value as "active" | "draft")} className={inputCls}>
                <option value="active">Hiển thị</option>
                <option value="draft">Bản nháp</option>
              </select>
            </Field>
            <Field label="Danh mục">
              <select
                value={categoryId ?? ""}
                onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)}
                className={inputCls}
              >
                <option value="">— không phân loại —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Giá</p>
            <Field label="Hiển thị" hint='Ví dụ: "85.000 đ" hoặc "Liên hệ"'>
              <input value={priceText} onChange={(e) => setPriceText(e.target.value)} className={inputCls} />
            </Field>
            <Field label="Giá thô (VND)" hint="Số nguyên dùng để sắp xếp; bỏ trống nếu chưa có">
              <input
                type="number"
                inputMode="numeric"
                value={priceRaw}
                onChange={(e) => setPriceRaw(e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">SEO</p>
            <Field label="SEO title">
              <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className={inputCls} />
            </Field>
            <Field label="SEO description">
              <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={3} className={inputCls} />
            </Field>
            <Field label="Source URL" hint="Tham chiếu nguồn (tùy chọn)">
              <input type="url" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} className={inputCls + " font-mono"} />
            </Field>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="px-4 py-2 rounded-lg border border-border text-sm font-semibold hover:bg-muted transition-colors"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:brightness-110 disabled:opacity-50 transition-all"
        >
          {pending ? "Đang lưu..." : mode === "create" ? "Tạo" : "Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-foreground">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}
