import type { StaticImageData } from "next/image";
import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import product3 from "@/assets/product3.jpg";
import product4 from "@/assets/product4.jpg";

export interface Brand {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  taglineShort: string;
  description: string;
  positioning: string;
  color: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  features: string[];
  targetMarkets: string[];
  heroImage: StaticImageData;
}

export const brands: Brand[] = [
  {
    id: "zifat999",
    name: "ZIFAT 999",
    slug: "zifat999",
    tagline: "Sức Mạnh Công Nghiệp - Hiệu Quả Tức Thì",
    taglineShort: "Sức Mạnh Công Nghiệp",
    description:
      "ZIFAT 999 là thương hiệu hàng đầu về các sản phẩm tẩy rửa công nghiệp với hiệu quả vượt trội. Được tin dùng bởi hàng nghìn doanh nghiệp, nhà máy và cơ sở kinh doanh trên toàn quốc, ZIFAT 999 mang đến giải pháp làm sạch mạnh mẽ cho mọi thách thức vệ sinh.",
    positioning: "Industrial Strength / Professional Performance",
    color: {
      primary: "#059669", // emerald-600
      secondary: "#047857", // emerald-700
      accent: "#10b981", // emerald-500
      gradient: "from-emerald-600 to-emerald-800",
    },
    features: [
      "Công thức đậm đặc, hiệu quả gấp 3 lần",
      "Chuyên dụng cho công nghiệp và thương mại",
      "Tẩy sạch vết bẩn cứng đầu nhất",
      "Được chứng nhận an toàn công nghiệp",
    ],
    targetMarkets: [
      "Nhà máy sản xuất",
      "Gara ô tô & trung tâm rửa xe",
      "Khách sạn & nhà hàng",
      "Khu công nghiệp",
      "Bệnh viện & cơ sở y tế",
    ],
    heroImage: product1,
  },
  {
    id: "sifa999",
    name: "SIFA 999",
    slug: "sifa999",
    tagline: "An Toàn Cho Mọi Nhà - Thân Thiện Môi Trường",
    taglineShort: "An Toàn Cho Mọi Nhà",
    description:
      "SIFA 999 là dòng sản phẩm tẩy rửa thế hệ mới, được phát triển với công thức dịu nhẹ từ thiên nhiên. Đặc biệt an toàn cho gia đình có trẻ nhỏ và thú cưng, SIFA 999 cam kết bảo vệ sức khỏe người dùng và môi trường sống.",
    positioning: "Safety / Eco-Friendly / Daily Accessibility",
    color: {
      primary: "#0284c7", // sky-600
      secondary: "#0369a1", // sky-700
      accent: "#0ea5e9", // sky-500
      gradient: "from-sky-500 to-cyan-600",
    },
    features: [
      "100% nguồn gốc thực vật",
      "An toàn cho trẻ em và thú cưng",
      "Không chứa hóa chất độc hại",
      "Phân hủy sinh học hoàn toàn",
    ],
    targetMarkets: [
      "Gia đình có trẻ nhỏ",
      "Dịch vụ spa & salon",
      "Trường học & nhà trẻ",
      "Văn phòng xanh",
      "Cửa hàng hữu cơ & organic",
    ],
    heroImage: product2,
  },
];

export const getBrandById = (id: string): Brand | undefined =>
  brands.find((b) => b.id === id);

export const getBrandBySlug = (slug: string): Brand | undefined =>
  brands.find((b) => b.slug === slug);

export type BrandId = "ZIFAT 999" | "SIFA 999";
