# Phát Ngọc Anh - Chemical Company Website

## Overview
A Vietnamese-language website for CÔNG TY TNHH HÓA PHẨM PHÁT NGỌC ANH, a household cleaning products company based in Ho Chi Minh City. The site showcases products, company info, news, and partners.

## Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (port 5000)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router DOM v6
- **State/Data**: TanStack React Query
- **Forms**: React Hook Form + Zod validation

## Project Structure
- `src/pages/` — Page-level components (Index, NotFound)
- `src/components/` — UI sections (SiteHeader, SiteNav, HeroSection, ProductsSection, etc.)
- `src/components/ui/` — shadcn/ui primitive components
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utility functions
- `public/` — Static assets

## Running the App
```
npm run dev
```
Runs on port 5000, accessible via the Replit webview.

## Build for Production
```
npm run build
```
Outputs to `dist/`. Deployed as a static site.

## Key Notes
- Migrated from Lovable to Replit — `lovable-tagger` dev dependency removed from vite config
- Pure frontend app, no backend server required
- All content is static/hardcoded in components
