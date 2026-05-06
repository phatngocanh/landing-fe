// Bearer-token auth (mirrors management-app-frontend). The token is returned
// by POST /api/v1/admin/login and stored in localStorage. Every authed request
// adds `Authorization: Bearer <token>`. No cookies, no cross-domain concerns.
const TOKEN_KEY = "pna_admin_token";
const USERNAME_KEY = "pna_admin_username";

export const auth = {
  setSession(token: string, username: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, username);
  },
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  getUsername(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(USERNAME_KEY);
  },
  clear() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
  },
  isAuthenticated(): boolean {
    return !!auth.getToken();
  },
};
