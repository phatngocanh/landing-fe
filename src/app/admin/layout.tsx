import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Bare admin layout. Auth check + sidebar live in (authed)/layout.tsx so
// /admin/login is reachable even without a session (otherwise the auth check
// triggers an infinite redirect loop).
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-muted/40">
      <Toaster position="top-right" richColors />
      {children}
    </div>
  );
}
