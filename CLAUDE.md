# CLAUDE.md — Phat Ngoc Anh Landing Website

## About the Company

**Công Ty TNHH Hóa Phẩm Phát Ngọc Anh** is a Vietnamese chemical products manufacturer based in Ho Chi Minh City. The company produces cleaning and household care products sold nationwide (64 provinces).

- **Address:** 430/33 Đường TA 28, Khu phố 2, P. Thới An, Quận 12, TP.HCM
- **Phone:** 028 6271 3214
- **Email:** hoaphamphatngocanh@gmail.com
- **Website:** https://phatngocanh.com

## Brands

### ZIFAT999 — Industrial Cleaning
- Heavy-duty, concentrated cleaning solutions for factories, workshops, and businesses
- Color identity: **Blue** (#2563EB)
- Certifications: ISO 9001, HVNCLC (Vietnamese High-Quality Goods)
- Products: industrial degreasers, floor cleaners, tile cleaners, car care, drain cleaners, pest control
- Target: B2B — factories, manufacturing plants, garages, commercial buildings

### SIFA999 — Family Care
- Safe, gentle household care products, dermatologically tested
- Color identity: **Green** (#16A34A)
- Certifications: ISO, Dermatological testing, Biodegradable
- Products: baby wash, hand wash, laundry detergent, dish soap, floor cleaner, bathroom cleaner
- Target: B2C — families, especially those with children and sensitive skin

## Target Audiences

1. **End consumers** — People searching Google for cleaning/household products they can trust. They need to see product quality, certifications, and safety before purchasing.
2. **Distributors / Partners** — Businesses interested in becoming distributors or wholesale partners. They need to see the brand portfolio, product range, pricing tiers (MOQ, bulk pricing), and a clear way to contact for partnership.

## Website Purpose & Goals

- **SEO-driven**: Users find us via Google search for product keywords (e.g., "nước tẩy rửa công nghiệp", "nước rửa chén an toàn")
- **Trust building**: Showcase certifications, testimonials, and product quality so end-users trust our brands
- **Distributor acquisition**: Make it easy for potential distributors to understand our product lines and contact us
- **Brand differentiation**: Clearly separate ZIFAT999 (industrial/B2B) from SIFA999 (family/B2C)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4 + shadcn/ui (Radix primitives)
- **Icons:** Lucide React (SVG, no emojis as icons)
- **State:** React Query (@tanstack/react-query)
- **Font:** Inter with Vietnamese subset
- **Package manager:** pnpm

## Project Conventions

- Language of all user-facing content: **Vietnamese**
- All pages use `SiteHeader` + `SiteNav` at top, `SiteFooter` + `FloatingActions` at bottom
- Brand pages use `"use client"` content components wrapped by server-component pages that export metadata
- ZIFAT999 pages use blue color scheme, SIFA999 uses green
- Product data is static in `src/data/products.ts` (not from an API)
- Dynamic imports for non-critical components (`SiteFooter`, `FloatingActions`)

## Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage with hero, trust badges, brand highlights, featured products |
| `/brands` | Brand comparison — side-by-side ZIFAT999 vs SIFA999 |
| `/zifat999` | ZIFAT999 brand landing page |
| `/sifa999` | SIFA999 brand landing page |
| `/products` | Full product catalog with search & filters |
| `/product/[id]` | Individual product detail page |
| `/about` | Company story, mission, certifications |
| `/contact` | Contact form + company info |
| `/news` | News/blog articles |

## Important: Both Brands Must Be Represented

When writing or editing any page content, metadata, or descriptions, **always mention both ZIFAT999 and SIFA999**. The company owns two brands — never present it as a single-brand company. This applies to:
- Page metadata (title, description, OG tags)
- Hero sections and about text
- Legal/company info sections
- Mission/vision statements
- Any marketing copy

Previously the About page only mentioned ZIFAT999 — this was a bug and has been fixed.

## SEO Notes

- Root layout has Organization JSON-LD schema
- Each brand page has dedicated metadata (title, description, OG tags)
- Brands page has BreadcrumbList + Brand JSON-LD schemas
- Product pages have dynamic metadata from product data
- Currently a demo site — `robots.txt` blocks indexing (change to `Allow: /` when going live)
- No sitemap yet — add `src/app/sitemap.ts` before production launch

## Development

```bash
pnpm dev      # Start dev server
pnpm build    # Production build
pnpm lint     # ESLint
pnpm test     # Vitest
```
