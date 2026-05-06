import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import { getCategories } from "@/lib/api/server";
import ProductsView from "./ProductsView";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"));
const FloatingActions = dynamic(() => import("@/components/FloatingActions"));

export default async function ProductsPage() {
  const categories = await getCategories();
  return (
    <div className="scroll-smooth">
      <SiteHeader />
      <SiteNav categories={categories} />
      <ProductsView categories={categories} />
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
