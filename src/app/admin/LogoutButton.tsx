"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { adminLogout } from "@/lib/api/admin-client";
import { auth } from "@/lib/auth";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={async () => {
        setLoading(true);
        try {
          await adminLogout();
        } finally {
          auth.clear();
          router.replace("/admin/login");
        }
      }}
      disabled={loading}
      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors disabled:opacity-50"
    >
      <LogOut className="w-4 h-4" />
      {loading ? "Đang thoát..." : "Đăng xuất"}
    </button>
  );
}
