# Phát Ngọc Anh - Chemical Company Website

## Overview
A Vietnamese-language website for CÔNG TY TNHH HÓA PHẨM PHÁT NGỌC ANH, a chemical/cleaning products company based in Ho Chi Minh City. The site is structured as a multi-brand B2B-first platform with two brands: **ZIFAT999** (industrial cleaning) and **SIFA999** (home care).

## Architecture
- **Framework**: Next.js 15 App Router with TypeScript
- **Build Tool**: Next.js dev server (port 5000)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State/Data**: TanStack React Query
- **Forms**: React Hook Form + Zod validation

## Project Structure
- `src/app/` — Next.js App Router pages
  - `src/app/page.tsx` — Company-focused homepage
  - `src/app/brands/page.tsx` — Brand selection page (/brands)
  - `src/app/zifat999/` — ZIFAT999 brand pages (home, products, about, contact)
  - `src/app/sifa999/` — SIFA999 brand pages (home, products, about, contact)
  - `src/app/products/page.tsx` — All products with brand + category filters, B2B sidebar
  - `src/app/product/[id]/page.tsx` — Product detail with bulk pricing tiers
- `src/components/` — UI sections (SiteHeader, SiteNav, HeroSection, BrandHighlightSection, etc.)
  - `src/components/BrandProductsGrid.tsx` — Reusable brand-filtered product grid
  - `src/components/MobileDrawer.tsx` — 3-panel mobile navigation (main/brands/products)
- `src/components/ui/` — shadcn/ui primitive components
- `src/data/products.ts` — Product data with brand, MOQ, bulkPriceTiers fields
- `src/lib/api/products.ts` — Product API layer with brand filtering support
- `src/assets/` — Static images
- `src/context/` — React contexts (MobileMenuContext)

## Multi-Brand Architecture
- **ZIFAT999**: Industrial cleaning brand (blue-600 theme color)
- **SIFA999**: Home care brand (green-600 theme color)
- Products have `brand`, `moq`, `bulkPriceTiers`, `isBulkAvailable` fields
- Navigation has "Thương Hiệu" dropdown with brand cards and "Sản Phẩm" dropdown with categories
- /products page has brand filter sidebar + B2B pricing sidebar widget
- Product detail pages show bulk pricing tiers table for B2B products

## Running the App
```
npm run dev
```
Runs on port 5000, accessible via the Replit webview.

## Key Notes
- Pure frontend app with static product data (no backend API)
- All content is in Vietnamese
- Company: CÔNG TY TNHH HÓA PHẨM PHÁT NGỌC ANH
- Address: 430/33 TA 28, KP 2, P. Thới An, Q.12, TP.HCM
- Phone: 0286.271.3214
