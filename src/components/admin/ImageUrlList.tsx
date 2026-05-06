"use client";

import { useRef, useState } from "react";
import { Plus, Trash2, Star, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  ApiError,
  requestProductImageUploadUrl,
  uploadFileToS3,
} from "@/lib/api/admin-client";

export interface ImageInput {
  url: string;
  alt: string;
  isPrimary: boolean;
}

interface Props {
  value: ImageInput[];
  onChange: (next: ImageInput[]) => void;
}

export default function ImageUrlList({ value, onChange }: Props) {
  const update = (i: number, patch: Partial<ImageInput>) => {
    const next = value.map((v, idx) => (idx === i ? { ...v, ...patch } : v));
    if (patch.isPrimary) {
      next.forEach((v, idx) => { if (idx !== i) v.isPrimary = false; });
    }
    onChange(next);
  };
  const remove = (i: number) => {
    const next = value.filter((_, idx) => idx !== i);
    if (next.length > 0 && !next.some((v) => v.isPrimary)) next[0].isPrimary = true;
    onChange(next);
  };
  const add = () => {
    const next = [...value, { url: "", alt: "", isPrimary: value.length === 0 }];
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {value.map((img, i) => (
        <Row
          key={i}
          img={img}
          onUrlChange={(url) => update(i, { url })}
          onAltChange={(alt) => update(i, { alt })}
          onSetPrimary={() => update(i, { isPrimary: true })}
          onRemove={() => remove(i)}
        />
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <Plus className="w-4 h-4" /> Thêm ảnh
      </button>
    </div>
  );
}

function Row({
  img,
  onUrlChange,
  onAltChange,
  onSetPrimary,
  onRemove,
}: {
  img: ImageInput;
  onUrlChange: (v: string) => void;
  onAltChange: (v: string) => void;
  onSetPrimary: () => void;
  onRemove: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("File phải là ảnh");
      return;
    }
    setUploading(true);
    try {
      const signed = await requestProductImageUploadUrl(file.name, file.type);
      if (!signed) throw new Error("no signed URL");
      await uploadFileToS3(signed.uploadUrl, file);
      onUrlChange(signed.publicUrl);
      toast.success("Đã tải lên S3");
    } catch (err) {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("Tải lên thất bại");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex gap-2 items-start">
      <input
        type="url"
        placeholder="https://… hoặc nhấn Tải lên"
        value={img.url}
        onChange={(e) => onUrlChange(e.target.value)}
        className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
      />
      <input
        type="text"
        placeholder="alt"
        value={img.alt}
        onChange={(e) => onAltChange(e.target.value)}
        className="w-40 bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="p-2 rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
        title="Tải lên S3"
      >
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={onPickFile}
      />
      <button
        type="button"
        title={img.isPrimary ? "Đang là ảnh chính" : "Đặt làm ảnh chính"}
        onClick={onSetPrimary}
        className={`p-2 rounded-lg border transition-colors ${
          img.isPrimary ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
        }`}
      >
        <Star className={`w-4 h-4 ${img.isPrimary ? "fill-current" : ""}`} />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="p-2 rounded-lg border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
        title="Xóa"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
