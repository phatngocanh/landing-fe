"use client";

import { useState, useEffect, useCallback, useMemo, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  ArrowUpDown,
  ChevronRight,
  ChevronDown,
  X,
  LayoutGrid,
  LayoutList,
  Phone,
  Handshake,
} from "lucide-react";
import { useProducts } from "@/lib/api/products";
import type { ProductsParams, ProductsResponse } from "@/lib/api/product-filters";
import { paramsEqual } from "@/lib/api/product-filters";
import type { CategoryDTO } from "@/lib/api/server";
import { buildCategoryTree, findCategoryPath } from "@/lib/api/categories-tree";

const SORT_OPTIONS = [
  { value: "default", label: "Mặc định" },
  { value: "price-asc", label: "Giá tăng dần" },
  { value: "price-desc", label: "Giá giảm dần" },
  { value: "name", label: "Tên A → Z" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];
const PAGE_SIZE = 12;
const ALL_SLUG = "";

function ProductCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl sm:rounded-3xl p-3 sm:p-6 animate-pulse">
      <div className="aspect-square bg-muted rounded-lg sm:rounded-2xl mb-4" />
      <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2" />
      <div className="h-5 bg-muted rounded w-1/2 mx-auto" />
    </div>
  );
}

interface Props {
  categories: CategoryDTO[];
  initialParams: ProductsParams;
  initialData: ProductsResponse;
}

function Content({ categories, initialParams, initialData }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categorySlug, setCategorySlug] = useState<string>(initialParams.category ?? ALL_SLUG);
  const [search, setSearch] = useState(initialParams.search ?? "");
  const [searchInput, setSearchInput] = useState(initialParams.search ?? "");
  const [sort, setSort] = useState<SortValue>(
    (initialParams.sort ?? "default") as SortValue,
  );
  const [page, setPage] = useState(initialParams.page ?? 1);
  const [gridCols, setGridCols] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const params: ProductsParams = {
    category: categorySlug,
    search,
    sort,
    page,
    pageSize: PAGE_SIZE,
  };
  // Hand React Query the server-rendered payload only on the very first render
  // (when params still match initialParams). After any filter change the key
  // changes and React Query fetches fresh — keeping SSR HTML and live data in
  // sync without hydration mismatches.
  const { data, isLoading, isFetching } = useProducts(
    params,
    paramsEqual(params, initialParams) ? initialData : undefined,
  );

  // Categories tree + auto-expand path of the active selection so parent
  // accordions open when user lands on a sub-category URL directly.
  const categoryTree = useMemo(() => buildCategoryTree(categories), [categories]);
  const activeCategoryAncestors = useMemo(() => {
    if (!categorySlug || categorySlug === ALL_SLUG) return new Set<number>();
    return new Set(findCategoryPath(categories, categorySlug).map((c) => c.id));
  }, [categories, categorySlug]);
  const [parentExpanded, setParentExpanded] = useState<Set<number>>(new Set());
  const toggleParentExpanded = useCallback((id: number) => {
    setParentExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Anchor for "scroll to first product on page change". Targets the top of
  // the product grid column so users land just above the new page's items —
  // not all the way at the page header.
  const gridTopRef = useRef<HTMLDivElement>(null);

  const syncUrl = useCallback(
    (catSlug: string, q: string, sortVal: SortValue, p: number) => {
      const params = new URLSearchParams();
      if (catSlug) params.set("category", catSlug);
      if (q) params.set("q", q);
      if (sortVal !== "default") params.set("sort", sortVal);
      if (p > 1) params.set("page", String(p));
      const qs = params.toString();
      router.replace(qs ? `/products?${qs}` : "/products", { scroll: false });
    },
    [router]
  );

  const handleCategoryChange = (slug: string) => {
    setCategorySlug(slug);
    setPage(1);
    setFiltersOpen(false);
    syncUrl(slug, search, sort, 1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
    syncUrl(categorySlug, searchInput, sort, 1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
    syncUrl(categorySlug, "", sort, 1);
  };

  const handleSortChange = (val: SortValue) => {
    setSort(val);
    setPage(1);
    syncUrl(categorySlug, search, val, 1);
  };

  const handlePageChange = (n: number) => {
    const next = Math.min(Math.max(1, n), totalPages);
    if (next === page) return;
    setPage(next);
    syncUrl(categorySlug, search, sort, next);
    // Wait one frame so the new product slice renders before scrolling.
    requestAnimationFrame(() => {
      const el = gridTopRef.current;
      if (!el) return;
      // Account for the sticky-ish header (~80px) so the first row isn't
      // clipped under it.
      const headerOffset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  };

  useEffect(() => {
    const urlCategory = searchParams.get("category") ?? ALL_SLUG;
    const urlSearch = searchParams.get("q") ?? "";
    const urlSort = (searchParams.get("sort") as SortValue | null) ?? "default";
    const urlPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
    if (urlCategory !== categorySlug) setCategorySlug(urlCategory);
    if (urlSearch !== search) {
      setSearch(urlSearch);
      setSearchInput(urlSearch);
    }
    if (urlSort !== sort) setSort(urlSort);
    if (urlPage !== page) setPage(urlPage);
  }, [searchParams, categorySlug, search, sort, page]);

  const currentCategory = categories.find((c) => c.slug === categorySlug);
  const categoryLabel = categorySlug === ALL_SLUG ? "Tất cả sản phẩm" : currentCategory?.name ?? "Sản phẩm";
  const showingProducts = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  return (
    <>
      <div className="bg-muted/50 border-b border-border">
        <div className="container py-3 md:py-4">
          <nav className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-foreground font-semibold">Sản phẩm</span>
          </nav>
        </div>
      </div>

      <main id="main-content" className="container py-6 md:py-12">
        <div className="mb-6 md:mb-10">
          <h1 className="text-xl md:text-3xl font-black text-foreground">{categoryLabel}</h1>
          {!isLoading && (
            <p className="text-sm text-muted-foreground mt-1">
              {total} sản phẩm{search ? ` cho "${search}"` : ""}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <>
            {filtersOpen && (
              <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
            )}

            <aside
              className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-72 lg:w-56 xl:w-64 shrink-0 bg-card lg:bg-transparent border-r lg:border-0 border-border transition-transform duration-300 ease-out ${
                filtersOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
              } flex flex-col`}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border lg:hidden">
                <span className="font-black text-sm uppercase tracking-widest">Bộ lọc</span>
                <button onClick={() => setFiltersOpen(false)} className="p-1.5 rounded-full hover:bg-muted transition-colors" aria-label="Đóng bộ lọc">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-5 lg:p-0 space-y-8">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-3">Danh mục</p>
                  <ul className="space-y-0.5">
                    <li>
                      <button
                        data-testid="filter-category-all"
                        onClick={() => handleCategoryChange(ALL_SLUG)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          categorySlug === ALL_SLUG ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        Tất cả
                      </button>
                    </li>
                    {categoryTree.map((parent) => {
                      const parentActive = categorySlug === parent.slug;
                      const inThisBranch = activeCategoryAncestors.has(parent.id);
                      const expanded = parent.children.length > 0 && (inThisBranch || parentExpanded.has(parent.id));
                      return (
                        <li key={parent.id}>
                          <div className="flex items-stretch">
                            <button
                              data-testid={`filter-category-${parent.slug}`}
                              onClick={() => handleCategoryChange(parent.slug)}
                              className={`flex-1 text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                parentActive ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                            >
                              {parent.name}
                            </button>
                            {parent.children.length > 0 && (
                              <button
                                type="button"
                                onClick={() => toggleParentExpanded(parent.id)}
                                aria-expanded={expanded}
                                aria-label={expanded ? "Thu gọn" : "Mở rộng"}
                                className="px-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors"
                              >
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
                              </button>
                            )}
                          </div>
                          {expanded && (
                            <ul className="mt-0.5 ml-2 pl-3 border-l border-border space-y-0.5">
                              {parent.children.map((sub) => {
                                const subActive = categorySlug === sub.slug;
                                return (
                                  <li key={sub.id}>
                                    <button
                                      data-testid={`filter-category-${sub.slug}`}
                                      onClick={() => handleCategoryChange(sub.slug)}
                                      className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                                        subActive ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                      }`}
                                    >
                                      {sub.name}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </aside>
          </>

          <div ref={gridTopRef} className="flex-1 min-w-0 scroll-mt-24">
            <div className="lg:hidden flex gap-2 mb-4">
              <a href="tel:02862713214" className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl font-bold text-xs hover:brightness-110 transition-all">
                <Phone className="w-3.5 h-3.5" /> Báo giá sỉ
              </a>
              <Link href="/contact?subject=partnership" className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary py-2.5 rounded-xl font-bold text-xs hover:bg-primary/10 transition-all">
                <Handshake className="w-3.5 h-3.5" /> Hợp tác
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[180px]">
                <div className="relative">
                  <label htmlFor="products-search" className="sr-only">Tìm kiếm sản phẩm</label>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="products-search"
                    data-testid="input-search"
                    type="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full pl-9 pr-9 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  {searchInput && (
                    <button type="button" onClick={handleClearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
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
                {categorySlug !== ALL_SLUG && <span className="w-2 h-2 bg-primary rounded-full" />}
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
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1 border border-border rounded-xl p-1">
                <button
                  data-testid="button-grid-view"
                  onClick={() => setGridCols("grid")}
                  className={`p-1.5 rounded-lg transition-colors ${gridCols === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="Dạng lưới"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  data-testid="button-list-view"
                  onClick={() => setGridCols("list")}
                  className={`p-1.5 rounded-lg transition-colors ${gridCols === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="Dạng danh sách"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>

            {(categorySlug !== ALL_SLUG || search) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categorySlug !== ALL_SLUG && currentCategory && (
                  <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                    {currentCategory.name}
                    <button onClick={() => handleCategoryChange(ALL_SLUG)} className="hover:text-primary/60 transition-colors">
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

            <div className="relative">
              {isFetching && !isLoading && (
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center pt-4">
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur border border-border shadow-sm text-xs font-semibold text-muted-foreground">
                    <span className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Đang tải...
                  </span>
                </div>
              )}
              <div
                className={`transition-opacity duration-200 ease-out ${
                  isFetching && !isLoading ? "opacity-50" : "opacity-100"
                }`}
              >
            {isLoading ? (
              <div className={`grid gap-2.5 sm:gap-5 ${gridCols === "list" ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3"}`}>
                {Array.from({ length: 8 }).map((_, i) => (<ProductCardSkeleton key={i} />))}
              </div>
            ) : showingProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="text-lg font-bold text-foreground">Không tìm thấy sản phẩm</p>
                <p className="text-sm text-muted-foreground max-w-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
                <button
                  onClick={() => { handleCategoryChange(ALL_SLUG); handleClearSearch(); }}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:brightness-110 transition-all"
                >
                  Xem tất cả sản phẩm
                </button>
              </div>
            ) : gridCols === "list" ? (
              <div className="space-y-3">
                {showingProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    data-testid={`product-card-${p.slug}`}
                    className="flex gap-4 sm:gap-6 bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-5 group hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-muted rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden relative">
                      {p.badge && (
                        <span className="absolute top-1.5 left-1.5 bg-primary text-primary-foreground text-[11px] font-black px-1.5 py-0.5 rounded-full z-10">{p.badge}</span>
                      )}
                      <img src={p.img} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex flex-col justify-center gap-1 min-w-0">
                      <span className="text-[11px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full w-fit">
                        {p.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">{p.name}</h3>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-secondary font-black text-base sm:text-lg">{p.price}</span>
                        {p.oldPrice && <span className="text-xs text-muted-foreground line-through">{p.oldPrice}</span>}
                        {p.discount && (
                          <span className="text-xs font-black text-secondary bg-secondary/10 px-1.5 py-0.5 rounded-full">{p.discount}</span>
                        )}
                      </div>
                      {!p.inStock && <span className="text-xs font-bold text-muted-foreground">Hết hàng</span>}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
                {showingProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    data-testid={`product-card-${p.slug}`}
                    className="bg-card border border-border p-3 sm:p-4 rounded-xl sm:rounded-2xl group cursor-pointer h-full relative flex flex-col hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    {p.badge && (
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-primary text-primary-foreground text-[10px] sm:text-xs font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">{p.badge}</div>
                    )}
                    {p.discount && (
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-secondary text-secondary-foreground text-[10px] sm:text-xs font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">{p.discount}</div>
                    )}
                    <div className="aspect-square mb-3 sm:mb-4 rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden relative">
                      <img src={p.img} alt={p.name} className="w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-300" />
                      <div className="absolute inset-x-0 bottom-0 px-2 pb-2 hidden sm:flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">
                          Xem chi tiết <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                    <span className="block text-[10px] sm:text-[11px] font-semibold tracking-wide text-muted-foreground mb-1.5 whitespace-nowrap overflow-hidden [mask-image:linear-gradient(to_right,black_90%,transparent)]">{p.category}</span>
                    <h3 className="text-[13px] sm:text-sm font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">{p.name}</h3>
                    <div className="mt-auto pt-2 sm:pt-3 flex items-baseline gap-2 flex-wrap">
                      {p.price === "Liên hệ" ? (
                        <span className="inline-flex items-center gap-1 text-foreground font-bold text-sm sm:text-base group-hover:text-primary transition-colors">
                          Liên hệ <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <>
                          <span className="text-secondary font-black text-sm sm:text-base">{p.price}</span>
                          {p.oldPrice && <span className="text-[11px] text-muted-foreground line-through">{p.oldPrice}</span>}
                        </>
                      )}
                    </div>
                    {!p.inStock && (
                      <span className="inline-block mt-1 text-[11px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full w-fit">Hết hàng</span>
                    )}
                  </Link>
                ))}
              </div>
            )}
              </div>
            </div>

            {!isLoading && totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 md:mt-16 gap-2">
                <button
                  data-testid="button-prev-page"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-sm font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Trang trước"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    data-testid={`button-page-${n}`}
                    onClick={() => handlePageChange(n)}
                    aria-label={`Trang ${n}`}
                    aria-current={n === page ? "page" : undefined}
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all hover:-translate-y-0.5 ${
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
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-sm font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Trang tiếp"
                >
                  ›
                </button>
              </div>
            )}
          </div>

          <aside className="hidden lg:flex flex-col gap-5 w-56 xl:w-64 shrink-0 sticky top-24 self-start">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-black text-foreground text-sm mb-2">Báo giá sỉ</h3>
              <p className="text-xs text-muted-foreground mb-4">Liên hệ đội ngũ bán hàng để nhận báo giá tốt nhất cho đơn hàng lớn.</p>
              <a href="tel:02862713214" className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-bold text-xs hover:brightness-110 transition-all">
                <Phone className="w-3.5 h-3.5" /> Gọi ngay
              </a>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-black text-foreground text-sm mb-2">Trở thành đối tác</h3>
              <p className="text-xs text-muted-foreground mb-4">Tham gia mạng lưới phân phối Phát Ngọc Anh với chính sách chiết khấu hấp dẫn.</p>
              <Link href="/contact?subject=partnership" className="flex items-center justify-center gap-2 w-full border border-border text-foreground py-2.5 rounded-xl font-bold text-xs hover:border-primary hover:text-primary transition-all">
                <Handshake className="w-3.5 h-3.5" /> Tìm hiểu
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default function ProductsView({ categories, initialParams, initialData }: Props) {
  return (
    <Suspense>
      <Content categories={categories} initialParams={initialParams} initialData={initialData} />
    </Suspense>
  );
}
