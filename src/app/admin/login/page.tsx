"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminLogin, ApiError } from "@/lib/api/admin-client";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/admin";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await adminLogin(username, password);
      router.replace(redirectTo);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) setError(err.message || "Đăng nhập thất bại.");
      else setError("Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-sm p-8 space-y-5">
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">PNA Admin</p>
          <h1 className="text-xl font-black mt-1">Đăng nhập</h1>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="username" className="text-xs font-bold text-foreground">Tên đăng nhập</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-xs font-bold text-foreground">Mật khẩu</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        {error && <p className="text-xs font-bold text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:brightness-110 disabled:opacity-50 transition-all"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
