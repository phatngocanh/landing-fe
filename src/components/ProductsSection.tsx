import { ShoppingCart } from "lucide-react";
import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import product3 from "@/assets/product3.jpg";
import product4 from "@/assets/product4.jpg";

const products = [
  { img: product1, name: "Bóng Vỏ Xe Siêu Đặc ZIFAT 999", price: "100.000đ" },
  { img: product2, name: "Nước Tẩy Máy Cao Cấp ZIFAT 999", price: "60.000đ" },
  { img: product3, name: "Nước Tẩy Gạch Men & Đồ Sứ", price: "38.000đ" },
  { img: product4, name: "Nước Lau Sàn Kháng Khuẩn", price: "45.000đ" },
];

const ProductsSection = () => (
  <section className="scroll-mt-28" id="products">
    <div className="flex items-center justify-between border-b border-border pb-5 mb-10">
      <h2 className="section-header-line text-sm font-black uppercase tracking-[0.25em] text-primary">
        Danh Mục ZIFAT 999
      </h2>
      <a className="text-[13px] text-muted-foreground font-bold hover:text-primary transition-all flex items-center gap-1.5" href="#">
        Tất cả sản phẩm →
      </a>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
      {products.map((p) => (
        <div key={p.name} className="bg-card border border-border p-6 rounded-3xl text-center product-card group cursor-pointer">
          <div className="aspect-square mb-6 bg-muted rounded-2xl p-6 flex items-center justify-center overflow-hidden">
            <img className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" src={p.img} alt={p.name} loading="lazy" width={512} height={512} />
          </div>
          <h5 className="text-[14px] font-bold text-foreground h-11 overflow-hidden line-clamp-2 leading-snug">
            {p.name}
          </h5>
          <p className="text-secondary font-black text-lg mt-3">{p.price}</p>
          <button className="mt-6 w-12 h-12 rounded-full bg-muted text-primary hover:bg-primary hover:text-primary-foreground transition-all inline-flex items-center justify-center border border-border shadow-sm active:scale-90">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
    <div className="flex justify-center mt-16 gap-4">
      <button className="w-11 h-11 rounded-full border-2 border-primary bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg hover:-translate-y-1 transition-all">1</button>
      <button className="w-11 h-11 rounded-full border border-border text-muted-foreground flex items-center justify-center font-bold text-sm bg-card hover:border-primary hover:text-primary transition-all hover:-translate-y-1">2</button>
      <button className="w-11 h-11 rounded-full border border-border text-muted-foreground flex items-center justify-center font-bold text-sm bg-card hover:border-primary hover:text-primary transition-all hover:-translate-y-1">3</button>
    </div>
  </section>
);

export default ProductsSection;
