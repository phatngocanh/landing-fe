"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center space-y-4">
        <p className="text-8xl font-black text-primary">404</p>
        <h1 className="text-2xl font-bold text-foreground">Trang không tìm thấy</h1>
        <p className="text-muted-foreground">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all active:scale-95"
        >
          ← Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
