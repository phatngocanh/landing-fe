import type { StaticImageData } from "next/image";
import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import product3 from "@/assets/product3.jpg";
import product4 from "@/assets/product4.jpg";

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

export const CATEGORIES = [
  "Tất cả",
  "Vệ sinh nhà cửa",
  "Tẩy rửa công nghiệp",
  "Nước giặt & xả",
  "Nước rửa chén",
  "Chăm sóc xe",
  "Thông cống & WC",
  "Diệt côn trùng",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const products: Product[] = [
  // ── Vệ sinh nhà cửa ──────────────────────────────────────────────
  {
    id: "nuoc-lau-san-khang-khuan",
    img: product4,
    images: [product4, product2, product3],
    name: "Nước Lau Sàn Kháng Khuẩn ZIFAT 999",
    price: "45.000đ",
    priceRaw: 45000,
    badge: "Bán chạy",
    category: "Vệ sinh nhà cửa",
    sku: "ZF-004",
    description:
      "Nước Lau Sàn Kháng Khuẩn ZIFAT 999 với công thức kháng khuẩn tiên tiến, giúp tiêu diệt 99,9% vi khuẩn và virus có hại. Mùi hương dịu nhẹ, không gây kích ứng, phù hợp cho cả gia đình có trẻ nhỏ và người già.",
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
    id: "nuoc-tay-gach-men",
    img: product3,
    images: [product3, product4, product1],
    name: "Nước Tẩy Gạch Men & Đồ Sứ ZIFAT 999",
    price: "38.000đ",
    priceRaw: 38000,
    badge: null,
    category: "Vệ sinh nhà cửa",
    sku: "ZF-003",
    description:
      "Nước Tẩy Gạch Men & Đồ Sứ ZIFAT 999 là giải pháp hoàn hảo để làm sạch các vết ố vàng, cặn khoáng và mốc trên gạch men, bồn cầu, chậu rửa và các bề mặt sứ.",
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
    id: "xit-phong-khu-khuan",
    img: product1,
    images: [product1, product3, product4],
    name: "Xịt Phòng Kháng Khuẩn Hương Thảo Mộc",
    price: "52.000đ",
    priceRaw: 52000,
    badge: "Mới",
    category: "Vệ sinh nhà cửa",
    sku: "ZF-011",
    description:
      "Xịt Phòng Kháng Khuẩn ZIFAT 999 với hương thảo mộc tự nhiên giúp tiêu diệt vi khuẩn trong không khí, khử mùi ẩm mốc, tạo không gian sống trong lành và thoải mái.",
    uses: [
      "Khử khuẩn không khí trong phòng kín",
      "Khử mùi hôi phòng ngủ, phòng khách",
      "Tạo hương thơm dễ chịu kéo dài 8 giờ",
      "An toàn cho trẻ em và người già",
    ],
    volumes: ["300ml", "500ml"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Dạng sản phẩm", value: "Dạng xịt" },
      { label: "Hương thơm", value: "Thảo mộc" },
      { label: "Hạn sử dụng", value: "24 tháng" },
      { label: "Bảo quản", value: "Tránh nhiệt độ cao, xa tầm tay trẻ em" },
    ],
    inStock: true,
  },
  {
    id: "nuoc-tay-kinh",
    img: product2,
    images: [product2, product1, product4],
    name: "Nước Lau Kính & Gương Siêu Sạch",
    price: "32.000đ",
    priceRaw: 32000,
    badge: null,
    category: "Vệ sinh nhà cửa",
    sku: "ZF-012",
    description:
      "Nước Lau Kính ZIFAT 999 cho bề mặt kính, gương sáng bóng không vết, không lem sau mỗi lần lau. Công thức đặc biệt chống bám bụi và hơi nước lâu dài.",
    uses: [
      "Lau kính cửa sổ, cửa kính trong vắt",
      "Làm sạch gương phòng tắm, phòng ngủ",
      "Tẩy vết tay, vết nước trên kính",
      "Chống bám bụi sau khi lau",
    ],
    volumes: ["300ml", "500ml", "1 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Dạng sản phẩm", value: "Dạng xịt" },
      { label: "pH", value: "6 - 7 (trung tính)" },
      { label: "Hạn sử dụng", value: "24 tháng" },
      { label: "Bảo quản", value: "Nơi thoáng mát" },
    ],
    inStock: true,
  },
  {
    id: "javel-dam-dac",
    img: product3,
    images: [product3, product1, product2],
    name: "Javel Đậm Đặc Tẩy Trắng Mạnh",
    price: "28.000đ",
    priceRaw: 28000,
    oldPrice: "35.000đ",
    oldPriceRaw: 35000,
    discount: "-20%",
    badge: "Hot",
    category: "Vệ sinh nhà cửa",
    sku: "ZF-013",
    description:
      "Javel Đậm Đặc ZIFAT 999 với nồng độ Clo cao giúp tẩy trắng và khử trùng mạnh mẽ trên nhiều bề mặt. Hiệu quả tức thì trong việc loại bỏ nấm mốc, vi khuẩn và virus.",
    uses: [
      "Tẩy trắng bề mặt gạch men nhà tắm",
      "Khử trùng bồn cầu, bồn rửa",
      "Tẩy mốc tường và trần nhà",
      "Khử khuẩn dụng cụ nhà bếp",
    ],
    volumes: ["500ml", "1 lít", "2 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Hoạt chất", value: "Sodium Hypochlorite 5-8%" },
      { label: "Hạn sử dụng", value: "12 tháng" },
      { label: "Bảo quản", value: "Tránh ánh nắng, xa tầm tay trẻ em" },
    ],
    inStock: true,
  },

  // ── Tẩy rửa công nghiệp ──────────────────────────────────────────
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
      "Nước Tẩy Máy Cao Cấp ZIFAT 999 được thiết kế đặc biệt để làm sạch các bề mặt kim loại, động cơ và máy móc công nghiệp. Công thức đậm đặc giúp loại bỏ dầu mỡ, gỉ sét và bụi bẩn cứng đầu.",
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
    id: "chat-tay-dau-cong-nghiep",
    img: product4,
    images: [product4, product2, product3],
    name: "Chất Tẩy Dầu Công Nghiệp Siêu Mạnh",
    price: "85.000đ",
    priceRaw: 85000,
    badge: null,
    category: "Tẩy rửa công nghiệp",
    sku: "ZF-021",
    description:
      "Chất Tẩy Dầu Công Nghiệp ZIFAT 999 chuyên dùng cho xưởng sản xuất, gara ô tô, nhà máy. Khả năng tẩy dầu mỡ vượt trội, an toàn với kim loại và hầu hết các loại bề mặt công nghiệp.",
    uses: [
      "Tẩy dầu mỡ nặng trong xưởng sản xuất",
      "Vệ sinh sàn gara, sàn kho bãi",
      "Làm sạch băng chuyền, máy móc nặng",
      "Tẩy cặn dầu trong đường ống công nghiệp",
    ],
    volumes: ["1 lít", "5 lít", "20 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Dạng sản phẩm", value: "Dung dịch đậm đặc" },
      { label: "Pha loãng", value: "1:5 đến 1:20 tùy mức độ bẩn" },
      { label: "Hạn sử dụng", value: "36 tháng" },
      { label: "Bảo quản", value: "Nơi thoáng mát, tránh lửa" },
    ],
    inStock: true,
  },
  {
    id: "chat-tay-ri-set",
    img: product1,
    images: [product1, product3, product2],
    name: "Dung Dịch Tẩy Rỉ Sét & Vôi Bám",
    price: "72.000đ",
    priceRaw: 72000,
    badge: "Bán chạy",
    category: "Tẩy rửa công nghiệp",
    sku: "ZF-022",
    description:
      "Dung Dịch Tẩy Rỉ Sét ZIFAT 999 nhanh chóng loại bỏ rỉ sét, vôi bám, cặn khoáng trên bề mặt kim loại, gạch đá, thiết bị vệ sinh. Không ăn mòn bề mặt, an toàn sử dụng.",
    uses: [
      "Tẩy rỉ sét trên kim loại, ốc vít",
      "Loại bỏ cặn vôi bám trên đường ống",
      "Tẩy cáu cặn thiết bị vệ sinh inox",
      "Làm sạch máy bơm, bình nước nóng",
    ],
    volumes: ["500ml", "1 lít", "5 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Thành phần chính", value: "Axit phosphoric, chất hoạt động bề mặt" },
      { label: "pH", value: "1 - 3 (axit mạnh)" },
      { label: "Hạn sử dụng", value: "24 tháng" },
      { label: "Bảo quản", value: "Xa tầm tay trẻ em, tránh nhiệt độ cao" },
    ],
    inStock: true,
  },

  // ── Nước giặt & xả ───────────────────────────────────────────────
  {
    id: "nuoc-giat-huong-nang",
    img: product2,
    images: [product2, product4, product1],
    name: "Nước Giặt Hương Nắng Mới ZIFAT 999",
    price: "55.000đ",
    priceRaw: 55000,
    badge: "Bán chạy",
    category: "Nước giặt & xả",
    sku: "ZF-031",
    description:
      "Nước Giặt Hương Nắng Mới ZIFAT 999 với công thức enzym sinh học tiên tiến, giúp loại bỏ hiệu quả các vết bẩn cứng đầu, trả lại màu sắc tươi sáng cho quần áo và để lại mùi hương dịu nhẹ.",
    uses: [
      "Giặt sạch vải cotton, linen, polyester",
      "Loại bỏ vết bẩn dầu mỡ, thức ăn",
      "Bảo vệ màu sắc quần áo không bạc màu",
      "Phù hợp giặt tay và giặt máy",
    ],
    volumes: ["750ml", "1.5 lít", "3 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Công thức", value: "Enzym sinh học" },
      { label: "Hương thơm", value: "Nắng mới" },
      { label: "Hạn sử dụng", value: "24 tháng" },
      { label: "Bảo quản", value: "Nơi thoáng mát" },
    ],
    inStock: true,
  },
  {
    id: "nuoc-giat-trang-dau",
    img: product3,
    images: [product3, product2, product4],
    name: "Nước Giặt Đặc Biệt Cho Vải Trắng",
    price: "62.000đ",
    priceRaw: 62000,
    badge: "Mới",
    category: "Nước giặt & xả",
    sku: "ZF-032",
    description:
      "Nước Giặt Vải Trắng ZIFAT 999 chứa chất tẩy quang học giúp áo trắng luôn trắng sáng, loại bỏ vết ố vàng do mồ hôi và thức ăn, giữ vải mềm mại và không bị xù lông.",
    uses: [
      "Giặt trắng áo sơ mi, đồng phục",
      "Tẩy vết ố vàng do mồ hôi",
      "Duy trì độ trắng sáng vải sau nhiều lần giặt",
      "An toàn cho vải cotton và vải pha",
    ],
    volumes: ["750ml", "1.5 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Tính năng đặc biệt", value: "Chất tẩy quang học OBA" },
      { label: "Hạn sử dụng", value: "24 tháng" },
      { label: "Bảo quản", value: "Nơi thoáng mát, tránh ánh nắng" },
    ],
    inStock: true,
  },
  {
    id: "nuoc-xa-vai-huong-hoa",
    img: product1,
    images: [product1, product2, product3],
    name: "Nước Xả Vải Hương Hoa Anh Đào",
    price: "42.000đ",
    priceRaw: 42000,
    badge: null,
    category: "Nước giặt & xả",
    sku: "ZF-033",
    description:
      "Nước Xả Vải Hương Hoa Anh Đào ZIFAT 999 làm mềm sợi vải, giảm tĩnh điện, giữ hương thơm lâu đến 72 giờ. Phù hợp cho cả quần áo người lớn và trẻ em.",
    uses: [
      "Làm mềm vải sau khi giặt",
      "Khử mùi hôi quần áo triệt để",
      "Giữ hương thơm lâu trên vải",
      "Giảm tĩnh điện, dễ ủi",
    ],
    volumes: ["500ml", "1 lít", "2 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Hương thơm", value: "Hoa anh đào" },
      { label: "Thời gian lưu hương", value: "Lên đến 72 giờ" },
      { label: "Hạn sử dụng", value: "24 tháng" },
      { label: "Bảo quản", value: "Nơi thoáng mát" },
    ],
    inStock: true,
  },

  // ── Nước rửa chén ────────────────────────────────────────────────
  {
    id: "nuoc-rua-chen-chanh",
    img: product4,
    images: [product4, product3, product1],
    name: "Nước Rửa Chén Hương Chanh ZIFAT 999",
    price: "25.000đ",
    priceRaw: 25000,
    badge: "Bán chạy",
    category: "Nước rửa chén",
    sku: "ZF-041",
    description:
      "Nước Rửa Chén Hương Chanh ZIFAT 999 với công thức siêu đặc sạch dầu mỡ ngay từ lần rửa đầu tiên. Hương chanh tươi mát, dưỡng ẩm tay, ít tạo bọt nhưng hiệu quả rửa sạch vượt trội.",
    uses: [
      "Rửa sạch bát đĩa, nồi chảo dầu mỡ",
      "Rửa trái cây, rau củ an toàn",
      "Vệ sinh nhà bếp, bếp nấu",
      "An toàn cho da tay nhạy cảm",
    ],
    volumes: ["400ml", "800ml", "1.5 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Hương thơm", value: "Chanh tươi" },
      { label: "Dạng sản phẩm", value: "Dung dịch đặc" },
      { label: "Hạn sử dụng", value: "24 tháng" },
      { label: "Bảo quản", value: "Nơi thoáng mát" },
    ],
    inStock: true,
  },
  {
    id: "nuoc-rua-chen-thao-moc",
    img: product1,
    images: [product1, product4, product3],
    name: "Nước Rửa Chén Thảo Mộc Dưỡng Da",
    price: "35.000đ",
    priceRaw: 35000,
    badge: null,
    category: "Nước rửa chén",
    sku: "ZF-042",
    description:
      "Nước Rửa Chén Thảo Mộc ZIFAT 999 bổ sung chiết xuất lô hội và trà xanh giúp dưỡng ẩm và bảo vệ da tay trong khi rửa. Loại bỏ dầu mỡ hiệu quả, an toàn cho người dùng thường xuyên.",
    uses: [
      "Rửa sạch mọi loại bát đĩa",
      "Dưỡng ẩm da tay khi rửa chén",
      "Kháng khuẩn tự nhiên từ chiết xuất thảo mộc",
      "Phân hủy sinh học, thân thiện môi trường",
    ],
    volumes: ["400ml", "800ml"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Thành phần đặc biệt", value: "Chiết xuất lô hội, trà xanh" },
      { label: "Hạn sử dụng", value: "24 tháng" },
      { label: "Bảo quản", value: "Nơi thoáng mát, tránh ánh nắng" },
    ],
    inStock: true,
  },
  {
    id: "nuoc-rua-chen-cho-may",
    img: product2,
    images: [product2, product1, product4],
    name: "Nước Rửa Chén Chuyên Dụng Cho Máy",
    price: "68.000đ",
    priceRaw: 68000,
    badge: "Mới",
    category: "Nước rửa chén",
    sku: "ZF-043",
    description:
      "Nước Rửa Chén Máy ZIFAT 999 được thiết kế đặc biệt cho máy rửa chén, tạo ít bọt, ngăn ngừa cặn khoáng trên bát đĩa và bảo vệ thiết bị máy rửa chén dài lâu.",
    uses: [
      "Chuyên dùng cho máy rửa chén tất cả loại",
      "Ngăn cặn khoáng, mốc trên bát đĩa",
      "Làm sáng bóng thủy tinh, sứ sau rửa",
      "Bảo vệ tuổi thọ máy rửa chén",
    ],
    volumes: ["750ml", "1.5 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Loại", value: "Chuyên dụng máy rửa chén" },
      { label: "Công thức", value: "Ít bọt, tự tráng" },
      { label: "Hạn sử dụng", value: "24 tháng" },
      { label: "Bảo quản", value: "Nơi thoáng mát" },
    ],
    inStock: false,
  },

  // ── Chăm sóc xe ──────────────────────────────────────────────────
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
      "Bóng Vỏ Xe Siêu Đặc ZIFAT 999 là dòng sản phẩm cao cấp giúp làm bóng và bảo vệ vỏ xe ô tô, xe máy. Công thức đặc biệt tạo lớp màng bảo vệ bền vững, chống bám bụi và chống tia UV.",
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
    id: "nuoc-rua-xe-dam-dac",
    img: product3,
    images: [product3, product1, product4],
    name: "Nước Rửa Xe Đậm Đặc Bọt Tuyết",
    price: "78.000đ",
    priceRaw: 78000,
    badge: "Bán chạy",
    category: "Chăm sóc xe",
    sku: "ZF-051",
    description:
      "Nước Rửa Xe Bọt Tuyết ZIFAT 999 tạo bọt dày đặc bao phủ toàn bộ bề mặt xe, thấm sâu và nâng bụi bẩn lên mà không làm xước sơn. Công thức trung tính an toàn cho mọi loại sơn xe.",
    uses: [
      "Rửa xe ô tô, xe máy, xe tải",
      "Tẩy bùn đất, phấn hoa bám trên xe",
      "Không để lại vết sau khi rửa",
      "Phù hợp rửa bằng tay và máy rửa xe",
    ],
    volumes: ["500ml", "1 lít", "5 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Dạng sản phẩm", value: "Dung dịch tạo bọt" },
      { label: "pH", value: "6.5 - 7.5 (trung tính)" },
      { label: "Pha loãng", value: "1:50 đến 1:100" },
      { label: "Hạn sử dụng", value: "24 tháng" },
      { label: "Bảo quản", value: "Nơi thoáng mát" },
    ],
    inStock: true,
  },
  {
    id: "dung-dich-rua-kinh-xe",
    img: product4,
    images: [product4, product3, product2],
    name: "Dung Dịch Rửa Kính Xe Chống Mờ",
    price: "48.000đ",
    priceRaw: 48000,
    badge: null,
    category: "Chăm sóc xe",
    sku: "ZF-052",
    description:
      "Dung Dịch Rửa Kính Xe ZIFAT 999 làm sạch nhanh kính lái, kính hậu, tẩy sạch vết côn trùng, nhựa cây và vết nước mưa. Tạo lớp màng kỵ nước giúp tầm nhìn rõ hơn trong trời mưa.",
    uses: [
      "Làm sạch kính lái, kính hậu",
      "Tẩy vết côn trùng, nhựa cây trên kính",
      "Tạo lớp kỵ nước chống mờ kính",
      "Dùng cho bình chứa nước rửa kính",
    ],
    volumes: ["500ml", "1 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Tính năng", value: "Chống mờ, kỵ nước" },
      { label: "Hạn sử dụng", value: "24 tháng" },
      { label: "Bảo quản", value: "Tránh đóng băng và nhiệt cao" },
    ],
    inStock: true,
  },

  // ── Thông cống & WC ───────────────────────────────────────────────
  {
    id: "nuoc-thong-cong-triet-de",
    img: product2,
    images: [product2, product3, product1],
    name: "Nước Thông Cống Triệt Để ZIFAT 999",
    price: "48.000đ",
    priceRaw: 48000,
    badge: "Bán chạy",
    category: "Thông cống & WC",
    sku: "ZF-061",
    description:
      "Nước Thông Cống Triệt Để ZIFAT 999 phân hủy nhanh các chất gây tắc như tóc, mỡ, xà phòng cặn và các vật chất hữu cơ khác chỉ trong 30 phút. Hiệu quả với cả cống nghẹt nặng.",
    uses: [
      "Thông cống bồn rửa bếp, nhà tắm",
      "Khơi thông đường ống thoát nước WC",
      "Phân hủy tóc, mỡ bám trong cống",
      "Ngăn ngừa tắc cống định kỳ",
    ],
    volumes: ["500ml", "1 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Thành phần chính", value: "NaOH đậm đặc, chất hoạt động bề mặt" },
      { label: "Thời gian tác dụng", value: "15 - 30 phút" },
      { label: "Hạn sử dụng", value: "24 tháng" },
      { label: "Bảo quản", value: "Xa tầm tay trẻ em, tránh tiếp xúc da" },
    ],
    inStock: true,
  },
  {
    id: "bot-vi-sinh-khu-mui",
    img: product4,
    images: [product4, product2, product3],
    name: "Bột Vi Sinh Khử Mùi Đường Ống",
    price: "55.000đ",
    priceRaw: 55000,
    badge: null,
    category: "Thông cống & WC",
    sku: "ZF-062",
    description:
      "Bột Vi Sinh ZIFAT 999 chứa hàng tỷ vi sinh vật có lợi giúp phân hủy chất hữu cơ, khử mùi hôi thối từ đường ống thoát nước, hầm tự hoại và bể phốt. An toàn, thân thiện môi trường.",
    uses: [
      "Khử mùi hôi cống rãnh, hầm cầu",
      "Làm sạch bể phốt tự nhiên",
      "Phân hủy sinh học chất thải hữu cơ",
      "Duy trì vi sinh vật có lợi trong đường ống",
    ],
    volumes: ["200g", "500g", "1kg"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Dạng sản phẩm", value: "Bột vi sinh" },
      { label: "Mật độ vi sinh", value: "5 tỷ CFU/g" },
      { label: "Hạn sử dụng", value: "18 tháng" },
      { label: "Bảo quản", value: "Nơi khô ráo, thoáng mát" },
    ],
    inStock: true,
  },
  {
    id: "nuoc-khu-mui-wc",
    img: product3,
    images: [product3, product4, product1],
    name: "Nước Khử Mùi & Diệt Khuẩn WC",
    price: "35.000đ",
    priceRaw: 35000,
    badge: "Mới",
    category: "Thông cống & WC",
    sku: "ZF-063",
    description:
      "Nước Khử Mùi WC ZIFAT 999 diệt khuẩn tức thì, khử mùi hôi bồn cầu và giúp nhà vệ sinh luôn sạch sẽ, thơm tho. Công thức dạng gel bám lâu, hiệu quả kéo dài đến 7 ngày.",
    uses: [
      "Khử mùi bồn cầu tức thì",
      "Diệt khuẩn E.coli, Salmonella",
      "Vệ sinh bồn cầu mỗi lần xả nước",
      "Ngăn ngừa vết ố vàng bồn cầu",
    ],
    volumes: ["300ml", "500ml"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Dạng sản phẩm", value: "Dạng gel lỏng" },
      { label: "Thời gian hiệu quả", value: "7 ngày / lần sử dụng" },
      { label: "Hạn sử dụng", value: "24 tháng" },
      { label: "Bảo quản", value: "Xa tầm tay trẻ em" },
    ],
    inStock: true,
  },

  // ── Diệt côn trùng ───────────────────────────────────────────────
  {
    id: "thuoc-diet-gian-muoi",
    img: product1,
    images: [product1, product2, product4],
    name: "Thuốc Diệt Gián & Muỗi ZIFAT 999",
    price: "65.000đ",
    priceRaw: 65000,
    badge: "Bán chạy",
    category: "Diệt côn trùng",
    sku: "ZF-071",
    description:
      "Thuốc Diệt Gián & Muỗi ZIFAT 999 với hoạt chất Cypermethrin tác dụng nhanh, tiêu diệt gián, muỗi, kiến và nhiều loại côn trùng gây hại khác trong 24 giờ. Hiệu lực kéo dài đến 3 tháng.",
    uses: [
      "Diệt gián, muỗi, kiến trong nhà",
      "Phun ngoài hàng rào, vườn tược",
      "Phòng chống côn trùng theo mùa",
      "Xử lý khu vực ẩm ướt dễ côn trùng",
    ],
    volumes: ["100ml", "250ml", "500ml"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Hoạt chất", value: "Cypermethrin 5%" },
      { label: "Hiệu lực", value: "Lên đến 3 tháng" },
      { label: "Hạn sử dụng", value: "24 tháng" },
      { label: "Bảo quản", value: "Xa thực phẩm, xa tầm tay trẻ em" },
    ],
    inStock: true,
  },
  {
    id: "thuoc-diet-moi",
    img: product2,
    images: [product2, product1, product3],
    name: "Thuốc Diệt Mối Chuyên Dụng",
    price: "120.000đ",
    priceRaw: 120000,
    badge: null,
    category: "Diệt côn trùng",
    sku: "ZF-072",
    description:
      "Thuốc Diệt Mối Chuyên Dụng ZIFAT 999 sử dụng công nghệ lan truyền sinh học, tiêu diệt toàn bộ tổ mối kể cả mối chúa chỉ sau 1-3 tuần. Không cần đục phá công trình.",
    uses: [
      "Diệt mối trong tường, sàn gỗ",
      "Xử lý mối cho công trình xây dựng",
      "Phòng ngừa mối tấn công đồ gỗ",
      "An toàn với con người và vật nuôi",
    ],
    volumes: ["250ml", "500ml", "1 lít"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Hoạt chất", value: "Fipronil 0.06%" },
      { label: "Cơ chế", value: "Lan truyền sinh học" },
      { label: "Hạn sử dụng", value: "36 tháng" },
      { label: "Bảo quản", value: "Nơi khô ráo, thoáng mát" },
    ],
    inStock: true,
  },
  {
    id: "xit-con-trung-tu-nhien",
    img: product3,
    images: [product3, product4, product2],
    name: "Xịt Côn Trùng Thảo Mộc Thiên Nhiên",
    price: "55.000đ",
    priceRaw: 55000,
    badge: "Mới",
    category: "Diệt côn trùng",
    sku: "ZF-073",
    description:
      "Xịt Côn Trùng Thảo Mộc ZIFAT 999 chiết xuất hoàn toàn từ tinh dầu sả, bạc hà và đinh hương, đuổi và tiêu diệt muỗi, kiến, ruồi hiệu quả mà an toàn tuyệt đối với người và thú cưng.",
    uses: [
      "Đuổi muỗi, kiến, ruồi tự nhiên",
      "Phun quanh giường ngủ, phòng em bé",
      "Sử dụng trong nhà bếp an toàn",
      "Thân thiện với thú cưng",
    ],
    volumes: ["100ml", "250ml"],
    specs: [
      { label: "Thương hiệu", value: "ZIFAT 999" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Thành phần", value: "Tinh dầu sả, bạc hà, đinh hương" },
      { label: "An toàn", value: "Không hóa chất độc hại" },
      { label: "Hạn sử dụng", value: "18 tháng" },
      { label: "Bảo quản", value: "Tránh nhiệt độ cao, tránh lửa" },
    ],
    inStock: true,
  },

];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getRelatedProducts = (id: string, limit = 4): Product[] =>
  products.filter((p) => p.id !== id).slice(0, limit);
