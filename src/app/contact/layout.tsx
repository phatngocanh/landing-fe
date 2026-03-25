import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên Hệ",
  description:
    "Liên hệ Công Ty TNHH Hóa Phẩm Phát Ngọc Anh – ZIFAT 999. Địa chỉ: 430/33 TA 28, Quận 12, TP.HCM. Hotline: 0286.271.3214. Hỗ trợ 24/7.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
