import { getCategories } from "@/lib/api/server";
import CategoriesView from "./CategoriesView";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black">Danh mục</h1>
        <p className="text-sm text-muted-foreground mt-1">{categories.length} danh mục</p>
      </div>
      <CategoriesView initial={categories} />
    </div>
  );
}
