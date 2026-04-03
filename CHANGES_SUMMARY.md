# Plan Updates - Key Changes Summary

## What Changed

### 1. **Removed: Combo Section from Homepage**
- ❌ No more "ComboSection" on the homepage
- Reason: Shifting away from individual customer focus to B2B/distribution model
- This simplifies the homepage and keeps focus on company + brands

---

### 2. **Added: Brand Selection Page (`/brands`)**
New route: `/brands`
- When users click "Sản Phẩm" (Products) button on homepage, they now go to `/brands`
- This is a simple selection page showing two brand cards:
  - **ZIFAT999** card → "Explore ZIFAT999 Products" → `/zifat999/products`
  - **SIFA999** card → "Explore SIFA999 Products" → `/sifa999/products`
- Helps users understand the brand differences before browsing
- Also includes link to "/products" for viewing ALL products across both brands

---

### 3. **Updated: /products Page (B2B Focused)**
The main `/products` page now includes:

#### Brand Filtering
- ✅ **Filter sidebar** with "Brand" checkbox filter:
  - All Brands
  - ZIFAT999
  - SIFA999

#### B2B Information Display
Each product card shows:
- **Retail Price**: Standard price
- **Bulk Price**: Discounted price at MOQ
- **MOQ (Minimum Order Quantity)**: e.g., "MOQ: 10 units"
- **Stock Status**: In Stock / Low Stock / Out of Stock

#### B2B CTAs (Right Sidebar)
- "Need Custom Pricing?" → Contact sales for bulk quotes
- "Download Price List (PDF)" for distributor reference
- "Become a Distributor" CTA
- Sales contact info

#### Product Card Example
```
[ZIFAT999 Product]
Retail Price: 45,000 VND
Bulk Price (10+): 38,000 VND ⭐
MOQ: 10 units

[View Details] [Add to Cart]
```

---

### 4. **Updated: Product Data Model**
Added B2B fields to product interface:

```ts
{
  brand: 'ZIFAT999' | 'SIFA999',  // Brand identifier
  moq: 10,                         // Minimum order quantity
  bulkPriceTiers: [                // Tiered pricing
    { minQuantity: 10, price: 38000 },
    { minQuantity: 50, price: 32000 },
    { minQuantity: 100, price: 28000 },
  ],
  isBulkAvailable: true,           // Can be ordered in bulk
}
```

---

### 5. **Updated: Product Detail Page**
Product detail pages now show:
- **Bulk pricing tiers** with percentage discounts
- **MOQ information** prominently
- **"Request Bulk Quote"** button for custom pricing
- **Volume selector** that updates pricing based on quantity
- **Distributor contact info**

---

### 6. **Navigation Behavior Clarified**

| Location | "Sản Phẩm" Button Behavior |
|----------|---------------------------|
| **Homepage** | → `/brands` (brand selection) |
| **Other pages** | → `/products` (all products with filters) or dropdown |
| **Product dropdown** | ZIFAT999 products, SIFA999 products, All Products |

---

## New Sitemap Structure

```
/                     → Company Homepage (no combo section)
├── /brands           → Brand Selection Page (NEW)
│   ├── /zifat999     → ZIFAT999 brand home
│   │   ├── /products (brand-filtered)
│   │   ├── /about
│   │   └── /contact
│   └── /sifa999      → SIFA999 brand home
│       ├── /products (brand-filtered)
│       ├── /about
│       └── /contact
└── /products         → ALL Products (both brands, B2B focused, filters + bulk pricing)
```

---

## Implementation Priority

1. **High Priority** (Core functionality):
   - Add "brand" field to product data
   - Add B2B fields (moq, bulkPriceTiers) to products
   - Create `/brands` selection page
   - Update `/products` page with brand filtering + B2B display
   - Update product detail pages with bulk pricing info

2. **Medium Priority** (Content):
   - Create SIFA999 dummy products with B2B details
   - Create brand pages (/zifat999, /sifa999)

3. **Polish**:
   - Update navigation
   - Add brand-specific footer variants
   - SEO tags and metadata

---

## Key Insight: B2B-First Model

This restructuring positions the company as a **B2B distributor** first, with a secondary consumer angle:
- **Bulk pricing tiers** encourage distributor adoption
- **MOQ requirements** target professional/business buyers
- **Distributor partnership CTAs** on every product page
- **Sales contact info** prominently displayed

This is very different from the original consumer-only focus.
