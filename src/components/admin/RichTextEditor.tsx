"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";
import {
  Bold, Italic, Underline as UnderlineIcon,
  Heading2, Heading3, List, ListOrdered, Link as LinkIcon, Quote,
} from "lucide-react";

// Tiptap is intentionally configured to emit ONLY tags that the BE whitelist
// (bluemonday in landing-be/internal/utils/sanitize) allows. Anything outside
// this set will be stripped server-side regardless.
//   <p>, <strong>, <em>, <u>, <ul>, <ol>, <li>, <h2>, <h3>, <h4>,
//   <blockquote>, <a href title>, <br>

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener", target: "_blank" },
      }),
    ],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[200px] px-4 py-3",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // Keep editor in sync if parent prop changes (e.g. switching from create to edit).
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) {
    return <div className="border border-border rounded-lg min-h-[240px] bg-card animate-pulse" />;
  }

  const Btn = ({
    onClick, active, children, label,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    label: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`p-1.5 rounded transition-colors ${
        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1.5 bg-muted/30">
        <Btn label="Đậm" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="w-4 h-4" /></Btn>
        <Btn label="Nghiêng" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="w-4 h-4" /></Btn>
        <Btn label="Gạch chân" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon className="w-4 h-4" /></Btn>
        <span className="w-px h-5 bg-border mx-1" />
        <Btn label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="w-4 h-4" /></Btn>
        <Btn label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="w-4 h-4" /></Btn>
        <span className="w-px h-5 bg-border mx-1" />
        <Btn label="Danh sách" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="w-4 h-4" /></Btn>
        <Btn label="Danh sách số" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="w-4 h-4" /></Btn>
        <Btn label="Trích dẫn" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="w-4 h-4" /></Btn>
        <span className="w-px h-5 bg-border mx-1" />
        <Btn
          label="Liên kết"
          active={editor.isActive("link")}
          onClick={() => {
            const url = window.prompt("URL:");
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().unsetLink().run();
            } else {
              editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
            }
          }}
        >
          <LinkIcon className="w-4 h-4" />
        </Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
