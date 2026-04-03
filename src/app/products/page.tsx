"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  X,
  ArrowUpDown,
  LayoutGrid,
  LayoutList,
  Phone,
  Handshake,
} from "lucide-react";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";
import { useProducts } from "@/lib/api/products";
import { CATEGORIES, BRANDS, type Category, type Brand } from "@/data/products";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });
const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false });

const SORT_OPTIONS = [
  { value: "default", label: "Mặc định" },
  { value: "price-asc", label: "Giá tăng dần" },
  { value: "price-desc", label: "Giá giảm dần" },
  { value: "name", label: "Tên A → Z" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];
const PAGE_SIZE = 12;

function ProductCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl sm:rounded-3xl p-3 sm:p-6 animate-pulse">
      <div className="aspect-square bg-muted rounded-lg sm:rounded-2xl mb-4" />
      <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2" />
      <div className="h-5 bg-muted rounded w-1/2 mx-auto" />
    </div>
  );
}

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState<Category | "Tất cả">(
    (searchParams.get("category") as Category) ?? "Tất cả"
  );
  const [brand, setBrand] = useState<Brand | "all">(
    (searchParams.get("brand") as Brand) ?? "all"
  );
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [searchInput, setSearchInput] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState<SortValue>("default");
  const [page, setPage] = useState(1);
  const [gridCols, setGridCols] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data, isLoading, isFetching } = useProducts({
    category,
    search,
    sort,
    page,
    pageSize: PAGE_SIZE,
    brand,
  });

  const syncUrl = useCallback(
    (cat: string, q: string, b: string) => {
      const params = new URLSearchParams();
      if (cat && cat !== "Tất cả") params.set("category", cat);
      if (q) params.set("q", q);
      if (b && b !== "all") params.set("brand", b);
      const qs = params.toString();
      router.replace(qs ? `/products?${qs}` : "/products", { scroll: false });
    },
    [router]
  );

  const handleCategoryChange = (cat: Category | "Tất cả") => {
    setCategory(cat);
    setPage(1);
    setFiltersOpen(false);
    syncUrl(cat, search, brand);
  };

  const handleBrandChange = (b: Brand | "all") => {
    setBrand(b);
    setPage(1);
    syncUrl(category, search, b);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
    syncUrl(category, searchInput, brand);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
    syncUrl(category, "", brand);
  };

  const handleSortChange = (val: SortValue) => {
    setSort(val);
    setPage(1);
  };

  useEffect(() => {
    const urlCategory = (searchParams.get("category") as Category) ?? "Tất cả";
    const urlSearch = searchParams.get("q") ?? "";
    const urlBrand = (searchParams.get("brand") as Brand) ?? "all";
    if (urlCategory !== category) {
      setCategory(urlCategory as Category | "Tất cả");
      setPage(1);
    }
    if (urlSearch !== search) {
      setSearch(urlSearch);
      setSearchInput(urlSearch);
      setPage(1);
    }
    if (urlBrand !== brand) {
      setBrand(urlBrand as Brand | "all");
      setPage(1);
    }
  }, [searchParams, category, search, brand]);

  const categoryLabel = category === "Tất cả" ? "Tất cả sản phẩm" : category;
  const showingProducts = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  return (
    <div className="scroll-smooth">
      <SiteHeader />
      <SiteNav />

      <div className="bg-muted/50 border-b border-border">
        <div className="container py-3 md:py-4">
          <nav className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors font-medium">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-foreground font-semibold">Sản phẩm</span>
          </nav>
        </div>
      </div>

      <main className="container py-6 md:py-12">
        <div className="mb-6 md:mb-10">
          <h1 className="text-xl md:text-3xl font-black text-foreground">
            {categoryLabel}
          </h1>
          {!isLoading && (
            <p className="text-sm text-muted-foreground mt-1">
              {total} sản phẩm
              {brand !== "all" ? ` — ${brand}` : ""}
              {search ? ` cho "${search}"` : ""}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <>
            {filtersOpen && (
              <div
                className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={() => setFiltersOpen(false)}
              />
            )}

            <aside
              className={`
                fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
                w-72 lg:w-56 xl:w-64 shrink-0
                bg-card lg:bg-transparent border-r lg:border-0 border-border
                transition-transform duration-300 ease-out
                ${filtersOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
                flex flex-col
              `}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border lg:hidden">
                <span className="font-black text-sm uppercase tracking-widest">Bộ lọc</span>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="p-1.5 rounded-full hover:bg-muted transition-colors"
                  aria-label="Đóng bộ lọc"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-5 lg:p-0 space-y-8">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-3">
                    Thương hiệu
                  </p>
                  <ul className="space-y-0.5">
                    <li>
                      <button
                        data-testid="filter-brand-all"
                        onClick={() => handleBrandChange("all")}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          brand === "all"
                            ? "bg-primary/10 text-primary font-bold"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        Tất cả
                      </button>
                    </li>
                    {BRANDS.map((b) => (
                      <li key={b}>
                        <button
                          data-testid={`filter-brand-${b}`}
                          onClick={() => handleBrandChange(b)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                            brand === b
                              ? "bg-primary/10 text-primary font-bold"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black text-white ${b === "ZIFAT999" ? "bg-blue-600" : "bg-green-600"}`}>
                            {b === "ZIFAT999" ? "Z" : "S"}
                          </span>
                          {b}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-3">
                    Danh mục
                  </p>
                  <ul className="space-y-0.5">
                    {CATEGORIES.map((cat) => (
                      <li key={cat}>
                        <button
                          data-testid={`filter-category-${cat}`}
                          onClick={() => handleCategoryChange(cat as Category | "Tất cả")}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                            category === cat
                              ? "bg-primary/10 text-primary font-bold"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[180px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    data-testid="input-search"
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full pl-9 pr-9 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>

              <button
                data-testid="button-open-filters"
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Bộ lọc
                {(category !== "Tất cả" || brand !== "all") && (
                  <span className="w-2 h-2 bg-primary rounded-full" />
                )}
              </button>

              <div className="relative">
                <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 text-sm font-semibold hover:border-primary cursor-pointer transition-colors">
                  <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                  <select
                    data-testid="select-sort"
                    value={sort}
                    onChange={(e) => handleSortChange(e.target.value as SortValue)}
                    className="bg-transparent border-none outline-none cursor-pointer text-sm font-semibold"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1 border border-border rounded-xl p-1">
                <button
                  data-testid="button-grid-view"
                  onClick={() => setGridCols("grid")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    gridCols === "grid"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Dạng lưới"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  data-testid="button-list-view"
                  onClick={() => setGridCols("list")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    gridCols === "list"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Dạng danh sách"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>

            {(category !== "Tất cả" || search || brand !== "all") && (
              <div className="flex flex-wrap gap-2 mb-4">
                {brand !== "all" && (
                  <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${brand === "ZIFAT999" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"}`}>
                    {brand}
                    <button onClick={() => handleBrandChange("all")} className="hover:opacity-60 transition-opacity">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {category !== "Tất cả" && (
                  <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                    {category}
                    <button
                      onClick={() => handleCategoryChange("Tất cả")}
                      className="hover:text-primary/60 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {search && (
                  <span className="flex items-center gap-1.5 bg-muted text-muted-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                    &quot;{search}&quot;
                    <button onClick={handleClearSearch} className="hover:text-foreground transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {isFetching && !isLoading && (
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Đang tải...
              </div>
            )}

            {isLoading ? (
              <div
                className={`grid gap-2.5 sm:gap-5 ${
                  gridCols === "list"
                    ? "grid-cols-1"
                    : "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
                }`}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : showingProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="text-lg font-bold text-foreground">Không tìm thấy sản phẩm</p>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
                </p>
                <button
                  onClick={() => {
                    handleCategoryChange("Tất cả");
                    handleBrandChange("all");
                    handleClearSearch();
                  }}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:brightness-110 transition-all"
                >
                  Xem tất cả sản phẩm
                </button>
              </div>
            ) : (
              <div className={`grid gap-2.5 sm:gap-5 ${
                gridCols === "list"
                  ? "grid-cols-1"
                  : "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
              }`}>
                {showingProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    data-testid={`product-card-${p.id}`}
                    className={`bg-card border border-border p-3 sm:p-5 rounded-xl sm:rounded-3xl text-center group cursor-pointer h-full relative block hover:border-primary/40 hover:shadow-md transition-all ${
                      gridCols === "list" ? "flex gap-4 sm:gap-6 text-left" : ""
                    }`}
                  >
                    {p.badge && gridCols !== "list" && (
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                        {p.badge}
                      </div>
                    )}
                    {gridCols !== "list" && (
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                        <span className={`text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full ${p.brand === "ZIFAT999" ? "bg-blue-600 text-white" : "bg-green-600 text-white"}`}>
                          {p.brand === "ZIFAT999" ? "ZIFAT" : "SIFA"}
                        </span>
                      </div>
                    )}
                    <div className={`${
                      gridCols === "list"
                        ? "w-24 h-24 sm:w-32 sm:h-32 shrink-0"
                        : "aspect-square mb-3 sm:mb-5"
                    } bg-muted rounded-lg sm:rounded-2xl p-3 sm:p-5 flex items-center justify-center overflow-hidden relative`}>
                      {gridCols === "list" && p.badge && (
                        <span className="absolute top-1.5 left-1.5 bg-primary text-primary-foreground text-[8px] font-black px-1.5 py-0.5 rounded-full z-10">
                          {p.badge}
                        </span>
                      )}
                      <Image
                        src={p.img}
                        alt={p.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                        placeholder="blur"
                      />
                    </div>
                    <div className={gridCols === "list" ? "flex flex-col justify-center gap-1 min-w-0" : ""}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full ${p.brand === "ZIFAT999" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"} ${gridCols !== "list" ? "hidden" : ""}`}>
                          {p.brand}
                        </span>
                        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary">
                          {p.category}
                        </p>
                      </div>
                      <h3 className="text-xs sm:text-[13px] font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <div className="mt-2 sm:mt-3 flex items-baseline gap-2 flex-wrap">
                        <span className="text-secondary font-black text-sm sm:text-base">{p.price}</span>
                        {p.oldPrice && (
                          <span className="text-[10px] text-muted-foreground line-through">{p.oldPrice}</span>
                        )}
                      </div>
                      {p.isBulkAvailable && p.bulkPriceTiers[0] && (
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Sỉ ({p.bulkPriceTiers[0].label}): {p.bulkPriceTiers[0].price.toLocaleString("vi-VN")}đ
                        </p>
                      )}
                      {!p.inStock && (
                        <span className="inline-block mt-1 text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          Hết hàng
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!isLoading && totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 md:mt-16 gap-2">
                <button
                  data-testid="button-prev-page"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-sm font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    data-testid={`button-page-${n}`}
                    onClick={() => setPage(n)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all hover:-translate-y-0.5 ${
                      n === page
                        ? "border-2 border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "border border-border text-muted-foreground bg-card hover:border-primary hover:text-primary"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  data-testid="button-next-page"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-sm font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ›
                </button>
              </div>
            )}
          </div>

          <aside className="hidden xl:block w-64 shrink-0 space-y-6">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <h3 className="font-black text-foreground text-sm mb-2">Báo Giá Sỉ / B2B</h3>
              <p className="text-xs text-muted-foreground mb-4">Liên hệ đội ngũ bán hàng để nhận báo giá tốt nhất cho đơn hàng lớn.</p>
              <a href="tel:02862713214" className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-bold text-xs hover:brightness-110 transition-all">
                <Phone className="w-3.5 h-3.5" /> Gọi ngay
              </a>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-black text-foreground text-sm mb-2">Trở Thành Đối Tác</h3>
              <p className="text-xs text-muted-foreground mb-4">Tham gia mạng lưới phân phối Phát Ngọc Anh với chính sách chiết khấu hấp dẫn.</p>
              <Link href="/contact" className="flex items-center justify-center gap-2 w-full border border-border text-foreground py-2.5 rounded-xl font-bold text-xs hover:border-primary hover:text-primary transition-all">
                <Handshake className="w-3.5 h-3.5" /> Tìm hiểu
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
      <FloatingActions />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}
