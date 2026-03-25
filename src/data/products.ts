import type { StaticImageData } from "next/image";
import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import product3 from "@/assets/product3.jpg";
import product4 from "@/assets/product4.jpg";
import combo1 from "@/assets/combo1.jpg";
import combo2 from "@/assets/combo2.jpg";
import combo3 from "@/assets/combo3.jpg";

export interface Product {
  id: string;
  img: StaticImageData;
  images: StaticImageData[];
  name: string;
  price: string;
  priceRaw: number;
  oldPrice?: string;
  oldPriceRaw?: number;
  discount?: string;
  badge?: string | null;
  category: string;
  sku: string;
  description: string;
  uses: string[];
  volumes: string[];
  specs: { label: string; value: string }[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "bong-vo-xe-zifat-999",
    img: product1,
    images: [product1, product2, product3],
    name: "Bóng Vỏ Xe Siêu Đặc ZIFAT 999",
    price: "100.000đ",
    priceRaw: 100000,
    badge: null,
    category: "Chăm sóc xe",
    sku: "ZF-001",
    description:
      "Bóng Vỏ Xe Siêu Đặc ZIFAT 999 là dòng sản phẩm cao cấp giúp làm bóng và bảo vệ vỏ xe ô tô, xe máy. Công thức đặc biệt tạo lớp màng bảo vệ bền vững, chống bám bụi và chống tia UV cực kỳ hiệu quả. Sản phẩm an toàn cho tất cả loại bề mặt nhựa, cao su và sơn xe.",
    uses: [
      "Làm bóng vỏ xe ô tô, xe máy",
      "Bảo vệ bề mặt nhựa, cao su khỏi tia UV",
      "Chống bám bụi và nước mưa",
      "Khử mùi hôi trong xe hiệu quả",
    ],
    volumes: ["250ml", "500ml", "1 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Dạng sản phẩm", value: "Dung dịch lỏng" },
      { label: "Hương thơm", value: "Cam tươi" },
      { label: "Hạn sử dụng", value: "24 tháng kể từ ngày sản xuất" },
      { label: "Bảo quản", value: "Nơi thoáng mát, tránh ánh nắng trực tiếp" },
    ],
    inStock: true,
  },
  {
    id: "nuoc-tay-may-zifat-999",
    img: product2,
    images: [product2, product1, product4],
    name: "Nước Tẩy Máy Cao Cấp ZIFAT 999",
    price: "60.000đ",
    priceRaw: 60000,
    badge: "Mới",
    category: "Tẩy rửa công nghiệp",
    sku: "ZF-002",
    description:
      "Nước Tẩy Máy Cao Cấp ZIFAT 999 được thiết kế đặc biệt để làm sạch các bề mặt kim loại, động cơ và máy móc công nghiệp. Công thức đậm đặc giúp loại bỏ dầu mỡ, gỉ sét và bụi bẩn cứng đầu chỉ trong vài phút. An toàn cho người dùng và thân thiện với môi trường.",
    uses: [
      "Tẩy dầu mỡ bám trên động cơ xe",
      "Làm sạch máy móc công nghiệp",
      "Tẩy gỉ sét trên bề mặt kim loại",
      "Vệ sinh thiết bị nhà bếp công nghiệp",
    ],
    volumes: ["500ml", "1 lít", "5 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Dạng sản phẩm", value: "Dung dịch đậm đặc" },
      { label: "pH", value: "9 - 11 (kiềm nhẹ)" },
      { label: "Hạn sử dụng", value: "36 tháng kể từ ngày sản xuất" },
      { label: "Bảo quản", value: "Nơi thoáng mát, tránh ánh nắng trực tiếp" },
    ],
    inStock: true,
  },
  {
    id: "nuoc-tay-gach-men",
    img: product3,
    images: [product3, product4, product1],
    name: "Nước Tẩy Gạch Men & Đồ Sứ",
    price: "38.000đ",
    priceRaw: 38000,
    badge: null,
    category: "Vệ sinh nhà cửa",
    sku: "ZF-003",
    description:
      "Nước Tẩy Gạch Men & Đồ Sứ ZIFAT 999 là giải pháp hoàn hảo để làm sạch các vết ố vàng, cặn khoáng và mốc trên gạch men, bồn cầu, chậu rửa và các bề mặt sứ. Công thức axit nhẹ an toàn, hiệu quả cao, không làm hư hại bề mặt sứ và men gạch.",
    uses: [
      "Tẩy vết ố vàng trên gạch men nhà tắm",
      "Làm sạch bồn cầu, chậu rửa mặt",
      "Tẩy cặn khoáng và vôi bám trên vòi nước",
      "Khử mùi nhà vệ sinh hiệu quả",
    ],
    volumes: ["250ml", "500ml", "1 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Dạng sản phẩm", value: "Dung dịch lỏng" },
      { label: "pH", value: "2 - 4 (axit nhẹ)" },
      { label: "Hạn sử dụng", value: "24 tháng kể từ ngày sản xuất" },
      { label: "Bảo quản", value: "Nơi thoáng mát, tránh trẻ em" },
    ],
    inStock: true,
  },
  {
    id: "nuoc-lau-san-khang-khuan",
    img: product4,
    images: [product4, product2, product3],
    name: "Nước Lau Sàn Kháng Khuẩn",
    price: "45.000đ",
    priceRaw: 45000,
    badge: "Bán chạy",
    category: "Vệ sinh nhà cửa",
    sku: "ZF-004",
    description:
      "Nước Lau Sàn Kháng Khuẩn ZIFAT 999 với công thức kháng khuẩn tiên tiến, giúp tiêu diệt 99,9% vi khuẩn và virus có hại. Mùi hương dịu nhẹ, không gây kích ứng, phù hợp cho cả gia đình có trẻ nhỏ và người già. Bề mặt sàn sau khi lau sáng bóng, không để lại vết ố.",
    uses: [
      "Lau sạch sàn nhà gỗ, gạch men, đá hoa cương",
      "Kháng khuẩn, khử virus trên sàn nhà",
      "Khử mùi hôi ẩm mốc hiệu quả",
      "An toàn cho trẻ em và thú cưng",
    ],
    volumes: ["500ml", "1 lít", "2 lít", "5 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Dạng sản phẩm", value: "Dung dịch lỏng" },
      { label: "Hương thơm", value: "Hoa nhài" },
      { label: "Hiệu quả kháng khuẩn", value: "99,9% vi khuẩn và virus" },
      { label: "Hạn sử dụng", value: "24 tháng kể từ ngày sản xuất" },
      { label: "Bảo quản", value: "Nơi thoáng mát, tránh ánh nắng trực tiếp" },
    ],
    inStock: true,
  },
  {
    id: "combo-thong-cong",
    img: combo1,
    images: [combo1, combo2, combo3],
    name: "Combo Thông Cống Triệt Để + Bột Vi Sinh Khử Mùi",
    price: "99.000đ",
    priceRaw: 99000,
    oldPrice: "110.000đ",
    oldPriceRaw: 110000,
    discount: "-10%",
    badge: "Bán chạy",
    category: "Combo ưu đãi",
    sku: "ZF-C001",
    description:
      "Bộ combo tiết kiệm gồm Nước Thông Cống Triệt Để ZIFAT 999 và Bột Vi Sinh Khử Mùi, mang đến giải pháp toàn diện cho đường ống tắc nghẽn và mùi hôi khó chịu trong nhà. Tiết kiệm 10% so với mua lẻ.",
    uses: [
      "Thông cống bồn rửa chén, nhà tắm bị tắc",
      "Khử mùi hôi trong đường ống thoát nước",
      "Tiêu diệt vi khuẩn trong đường ống",
      "Ngăn ngừa tắc cống tái phát",
    ],
    volumes: ["Bộ tiêu chuẩn", "Bộ gia đình (x2)"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Nội dung", value: "Nước thông cống 500ml + Bột vi sinh 200g" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Hạn sử dụng", value: "24 tháng" },
    ],
    inStock: true,
  },
  {
    id: "combo-lau-san-xit-phong",
    img: combo2,
    images: [combo2, combo1, combo3],
    name: "Combo Nước Lau Sàn Hương Hoa + Xịt Phòng Kháng Khuẩn",
    price: "120.000đ",
    priceRaw: 120000,
    oldPrice: "135.000đ",
    oldPriceRaw: 135000,
    discount: "-11%",
    badge: "Mới",
    category: "Combo ưu đãi",
    sku: "ZF-C002",
    description:
      "Combo tiết kiệm gồm Nước Lau Sàn Hương Hoa ZIFAT 999 và Xịt Phòng Kháng Khuẩn. Bộ đôi hoàn hảo giúp không gian sống luôn sạch sẽ, thơm tho và được bảo vệ tối ưu khỏi vi khuẩn gây hại.",
    uses: [
      "Lau sàn sạch bóng với hương hoa dịu nhẹ",
      "Xịt phòng khử khuẩn không khí trong nhà",
      "Khử mùi ẩm mốc trong phòng kín",
      "Phù hợp cho gia đình có trẻ nhỏ",
    ],
    volumes: ["Bộ tiêu chuẩn", "Bộ gia đình (x2)"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Nội dung", value: "Nước lau sàn 1L + Xịt phòng 300ml" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Hạn sử dụng", value: "24 tháng" },
    ],
    inStock: true,
  },
  {
    id: "combo-javel-nuoc-giat",
    img: combo3,
    images: [combo3, combo1, combo2],
    name: "Combo Javel Đậm Đặc + Nước Giặt Hương Nắng",
    price: "85.000đ",
    priceRaw: 85000,
    oldPrice: "90.000đ",
    oldPriceRaw: 90000,
    discount: "-6%",
    badge: null,
    category: "Combo ưu đãi",
    sku: "ZF-C003",
    description:
      "Combo tiết kiệm gồm Javel Đậm Đặc ZIFAT 999 và Nước Giặt Hương Nắng. Bộ đôi giúp quần áo trắng sáng, thơm tho và sạch khuẩn ngay từ lần giặt đầu tiên.",
    uses: [
      "Tẩy trắng quần áo bị ố vàng",
      "Giặt sạch vết bẩn cứng đầu",
      "Khử mùi hôi trên quần áo",
      "An toàn cho vải cotton, polyester",
    ],
    volumes: ["Bộ tiêu chuẩn", "Bộ gia đình (x2)"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Nội dung", value: "Javel 1L + Nước giặt 750ml" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Hạn sử dụng", value: "24 tháng" },
    ],
    inStock: true,
  },
  {
    id: "combo-nuoc-rua-chen-tay-bep",
    img: combo1,
    images: [combo1, combo3, combo2],
    name: "Combo Nước Rửa Chén + Tẩy Nhà Bếp Đa Năng",
    price: "75.000đ",
    priceRaw: 75000,
    oldPrice: "88.000đ",
    oldPriceRaw: 88000,
    discount: "-15%",
    badge: "Hot",
    category: "Combo ưu đãi",
    sku: "ZF-C004",
    description:
      "Combo tiết kiệm nhất gồm Nước Rửa Chén và Tẩy Nhà Bếp Đa Năng ZIFAT 999. Bộ đôi không thể thiếu trong mỗi căn bếp, giúp làm sạch bát đĩa, bếp nấu và mặt bếp hiệu quả.",
    uses: [
      "Rửa sạch bát đĩa, nồi chảo dầu mỡ",
      "Tẩy sạch mặt bếp, bếp từ, bếp gas",
      "Khử mùi tanh, hôi trong bếp",
      "An toàn cho da tay",
    ],
    volumes: ["Bộ tiêu chuẩn", "Bộ gia đình (x2)"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Nội dung", value: "Nước rửa chén 500ml + Tẩy bếp 400ml" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Hạn sử dụng", value: "24 tháng" },
    ],
    inStock: true,
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getRelatedProducts = (id: string, limit = 4): Product[] =>
  products.filter((p) => p.id !== id).slice(0, limit);
