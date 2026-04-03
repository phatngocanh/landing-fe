import { CATEGORIES } from "./products";

export const NAV_LINKS = [
  { label: "TRANG CHỦ", href: "/", anchor: "#hero" },
  { label: "GIỚI THIỆU", href: "/about", anchor: "#about" },
  { label: "TIN TỨC", href: "/news", anchor: "#news" },
  { label: "LIÊN HỆ", href: "/contact", anchor: null },
] as const;

export const PRODUCT_CATEGORIES = CATEGORIES.filter((c) => c !== "Tất cả");
