# Multi-Brand Website Restructuring Plan

## 1. NEW SITEMAP

```
/                                      → Company Homepage (new)
├── /about                             → Company Overview (refactored)
├── /contact                           → General Contact (refactored)
├── /news                              → Company News/Resources (refactored)
│
├── /brands                            → Brand Selection Landing (NEW)
│   │                                    "Choose Your Brand" page
│   │                                    Shows: ZIFAT999 card + SIFA999 card
│   │                                    CTAs: "Explore [Brand]" buttons
│   │
│   ├── /zifat999                      → ZIFAT999 Brand Home (NEW)
│   │   ├── /zifat999/about            → ZIFAT999 Brand Story
│   │   ├── /zifat999/products         → ZIFAT999 Product Catalog (brand-filtered)
│   │   ├── /zifat999/products?cat=X   → ZIFAT999 Filtered by Category
│   │   └── /zifat999/contact          → ZIFAT999 Contact Form
│   │
│   └── /sifa999                       → SIFA999 Brand Home (NEW)
│       ├── /sifa999/about             → SIFA999 Brand Story
│       ├── /sifa999/products          → SIFA999 Product Catalog (brand-filtered)
│       ├── /sifa999/products?cat=X    → SIFA999 Filtered by Category
│       └── /sifa999/contact           → SIFA999 Contact Form
│
├── /products                          → All Products (company-wide, B2B focused)
│   │                                    Filters: Brand (ZIFAT999/SIFA999) + Category
│   │                                    Shows: Bulk pricing, MOQ, B2B info
│   │
│   └── /product/[id]                  → Product Detail (with brand context + B2B details)
│
└── [existing routes remain...]
```

---

## 2. HOMEPAGE STRUCTURE (Company-Focused)

### Purpose
- Introduce the company (Phát Ngọc Anh)
- Establish authority and trustworthiness
- Showcase BOTH brands equally
- Navigate users to brand-specific pages or products

### New Homepage Layout

```tsx
<SiteHeader />
<SiteNav />

<HeroSection>
  // Hero: "Leading Chemical Solutions Provider"
  // CTA: "Explore Our Brands" (→ /brands or brand selection modal)
</HeroSection>

<CompanyOverviewSection>
  // Short intro: Company mission, reach, years in business
  // 3-4 key stats (distribution reach, customers, etc.)
</CompanyOverviewSection>

<BrandHighlightSection>
  // Grid of 2 cards (ZIFAT999 + SIFA999)
  // Each card has:
  //   - Brand logo/name
  //   - Tagline / positioning
  //   - 2-3 key USPs
  //   - "Explore [Brand]" CTA button → /zifat999 or /sifa999
  //   - Brand icon/image
</BrandHighlightSection>

<FeaturedProductsSection>
  // Top 4-6 products (mix from both brands)
  // Show brand badge for each product
  // "Browse All Products" link → /products (with brand filters)
</FeaturedProductsSection>

<CustomersAndReachSection>
  // Distribution map / partner logos
  // "Available across Vietnam"
</CustomersAndReachSection>

<ResourcesSection>
  // Links to company news, guides, FAQs
  // Not brand-specific, company-wide content
</ResourcesSection>

<SiteFooter />
<FloatingActions />
```

**Key Change**: Removed `ComboSection` - no longer focusing on combo offers for individual customers.

### Key Content Changes
- ❌ Remove: "ZIFAT 999" as the main brand identity
- ✅ Add: Company name "Phát Ngọc Anh" as primary identity
- ✅ Add: Brand cards for ZIFAT999 and SIFA999
- ✅ Keep: Trust badges, customer reach, distribution network
- ✅ Keep: Featured products (but agnostic to brand)

---

## 2.5. BRAND SELECTION PAGE (`/brands`) - NEW

### Purpose
Simple, visual landing page to direct users to choose between ZIFAT999 and SIFA999 product catalogs.

### Route: `/brands`

```
<SiteHeader />
<SiteNav />

<BrandSelectionHero>
  Headline: "Choose Your Brand"
  Subheadline: "Select the right chemical solution for your needs"
</BrandSelectionHero>

<BrandSelectionGrid>
  // Two large, clickable brand cards

  [Card 1: ZIFAT999]
  - Large brand logo
  - Tagline: "Industrial-Strength Performance"
  - 3 key points
  - Visual brand color (blue)
  - Big CTA button: "Explore ZIFAT999 Products" → /zifat999/products

  [Card 2: SIFA999]
  - Large brand logo
  - Tagline: "Safe & Accessible Daily Care"
  - 3 key points
  - Visual brand color (green)
  - Big CTA button: "Explore SIFA999 Products" → /sifa999/products
</BrandSelectionGrid>

<BrandComparisonSection>
  // Optional: Simple comparison table (who is each brand for?)

  |             | ZIFAT999              | SIFA999                |
  |-------------|----------------------|----------------------|
  | **Focus**   | Industrial strength   | Family safety        |
  | **Best For**| Professional cleaners | Everyday household   |
  | **Use Case**| Heavy-duty jobs       | Daily care           |
</BrandComparisonSection>

<QuickLinkSection>
  - "View All Products" → /products (shows both brands with filter)
  - "Back to Home" → /
</QuickLinkSection>

<SiteFooter />
<FloatingActions />
```

---

## 3. ZIFAT999 PAGE STRUCTURE (Refined)

### Route: `/zifat999`

```
<SiteHeader />
<SiteNav />

<BrandHeroSection>
  // Headline: "ZIFAT999 - Industrial-Strength Cleaning Solutions"
  // Subheadline: "Professional Performance for High-Demand Cleaning"
  // CTA: "Shop ZIFAT999 Products"
  // Brand color: Keep existing (strong industrial blue/teal)
</BrandHeroSection>

<BrandStorySection>
  // History: How ZIFAT999 was developed
  // Philosophy: Focus on performance, reliability, industrial use
  // Certifications and standards
</BrandStorySection>

<ProductCategoriesSection>
  // 6-8 product category cards
  // Categories: household, industrial, car care, drain, insect control, etc.
  // Each links to /zifat999/products?category=X
</ProductCategoriesSection>

<KeyProductsSection>
  // 4 featured ZIFAT999 products with detailed cards
  // Highlighting "strength" and "performance"
</KeyProductsSection>

<ZifatUseCasesSection>
  // Use cases focusing on heavy-duty, industrial applications
  // "Professional kitchens", "Factory cleaning", "Heavy industrial use"
</ZifatUseCasesSection>

<TestimonialsSection>
  // 3-4 testimonials from industrial/B2B customers
  // Focus: reliability, performance, durability
</TestimonialsSection>

<DistributorCTA>
  // "Become a Distributor"
  // Target B2B buyers
  // Contact form link
</DistributorCTA>

<SiteFooter />  // Brand-specific footer (ZIFAT999 contact)
<FloatingActions />
```

### Route: `/zifat999/products`
- Same layout as `/products` but filtered to ZIFAT999 only
- Show "ZIFAT999" badge on all products
- Include B2B details (bulk pricing, MOQ)
- Breadcrumb: Home > ZIFAT999 > Products
- Brand-focused contact CTA for bulk orders

### Route: `/zifat999/about`
- Similar to current `/about` page
- Focus on brand history and credentials
- Link back to main brand page

### Route: `/zifat999/contact`
- ZIFAT999-specific contact form
- Phone/email for ZIFAT999 inquiries
- Address remains: 430/33 Đường TA 28, Quận 12, TP.HCM

---

## 4. SIFA999 PAGE STRUCTURE (With Full Dummy Content)

### Positioning Strategy
- **ZIFAT999**: "Industrial-Strength Performance" (professional, heavy-duty, B2B)
- **SIFA999**: "Safe & Accessible Daily Care" (family-friendly, safety-focused, retail + B2B)

---

### Route: `/sifa999`

```
<SiteHeader />
<SiteNav />

<BrandHeroSection>
  Headline: "SIFA999 - Safe, Trusted Care for Every Home"
  Subheadline: "Premium Chemical Solutions Designed for Family Safety and Everyday Use"
  CTA: "Shop SIFA999 Products"
  Brand color: Warm, approachable green (vs. ZIFAT999's industrial blue)
</BrandHeroSection>

<BrandStorySection>
  Story: "SIFA999 was born from a simple belief: household and personal care 
          products should be powerful AND safe. We focus on gentle formulations 
          that deliver results without compromising on safety or environmental 
          responsibility."
  
  Key Values:
  - Safety First: All products dermatologically tested
  - Family Trusted: Used in over 500,000 Vietnamese homes
  - Eco-Conscious: Biodegradable formulations
  - Affordable Quality: Premium care at fair prices
  
  Certifications:
  - GMP Certified Manufacturing
  - ISO 9001:2015 Quality Management
  - Dermatologically Tested
  - Eco-Friendly Ingredients
</BrandStorySection>

<SafetyHighlightSection>
  3-column highlight cards:
  
  [Card 1]
  Icon: Checkmark shield
  Title: "Dermatologically Tested"
  Content: "Every SIFA999 product is tested for skin safety and gentle enough 
           for family use, including kids and sensitive skin."
  
  [Card 2]
  Icon: Leaf
  Title: "Eco-Conscious Formulas"
  Content: "Made with biodegradable ingredients that work effectively while 
           being gentle on the environment."
  
  [Card 3]
  Icon: Family
  Title: "Family Approved"
  Content: "Trusted by Vietnamese families for daily household and personal care, 
           because safety and quality matter."
</SafetyHighlightSection>

<ProductCategoriesSection>
  6 category cards (slightly different mix from ZIFAT999):
  
  1. Hand & Body Care
     "Gentle, moisturizing formulas for everyday care"
  
  2. Home Cleaning (Gentle)
     "Effective household cleaning that's safe for families"
  
  3. Laundry Care
     "Soft on fabrics, tough on stains"
  
  4. Dish Care
     "Grease-cutting power that's safe for hands"
  
  5. Baby & Kids Range
     "Specially formulated for sensitive young skin"
  
  6. Personal Hygiene
     "Trusted daily hygiene for the whole family"
  
  Each links to /sifa999/products?category=X
</ProductCategoriesSection>

<FeaturedProductsSection>
  4 hero product cards with rich dummy content:
  
  [Product 1]
  Name: SIFA999 Baby Wash - Gentle & Safe
  Image: (placeholder image)
  Price: 45,000 VND
  USPs:
    • 0% harsh chemicals - safe from day 1
    • Hypoallergenic formula
    • Dermatologist tested
    • Trusted by 200,000+ families
  Description: "Our bestselling baby wash is specially formulated to cleanse 
               newborn and infant skin without irritation. Gentle on the most 
               sensitive skin, tough on germs."
  Volume Options: 250ml, 500ml, 1L
  Specs:
    - Type: Gentle liquid wash
    - pH: 5.5 (skin-neutral)
    - Ingredients: Plant-based surfactants, aloe vera extract
    - Shelf Life: 24 months
  Badge: "BESTSELLER"
  
  [Product 2]
  Name: SIFA999 Hand Sanitizer - Advanced Protection
  Image: (placeholder)
  Price: 35,000 VND
  USPs:
    • 75% alcohol content (WHO standard)
    • Moisturizing aloe vera
    • Fast-drying formula
    • Kills 99.9% of germs
  Description: "Portable hand sanitizer that provides hospital-grade protection 
               with a moisturizing touch. Perfect for on-the-go families."
  Volume Options: 100ml, 250ml, 500ml
  Specs:
    - Type: Gel sanitizer
    - Effectiveness: 99.9% germ elimination
    - Ingredients: Ethanol, aloe vera, glycerin
    - Application: Rub hands together until dry
  Badge: "NEW"
  
  [Product 3]
  Name: SIFA999 Eco Laundry Liquid - Tough on Stains, Kind to Fabrics
  Image: (placeholder)
  Price: 55,000 VND
  USPs:
    • 100% biodegradable
    • Works in cold water (eco-friendly)
    • Removes tough stains naturally
    • Fresh, natural scent
  Description: "Powerful laundry detergent that cleans effectively while being 
               safe for the environment and your family's skin. Suitable for 
               all fabrics."
  Volume Options: 500ml, 1L, 2L
  Specs:
    - Type: Liquid detergent
    - Biodegradability: 100%
    - Water Temperature: Works in 20°C+
    - Scent: Natural lemongrass extract
  Badge: "ECO-FRIENDLY"
  
  [Product 4]
  Name: SIFA999 Multi-Surface Cleaner - Daily Fresh Homes
  Image: (placeholder)
  Price: 38,000 VND
  USPs:
    • Safe for families and pets
    • Non-toxic, plant-based formula
    • Cuts through grease and grime
    • Leaves surfaces streak-free
  Description: "Gentle yet powerful multi-surface cleaner perfect for kitchens, 
               bathrooms, and living spaces. Safe enough to use around kids and pets."
  Volume Options: 500ml, 1L, 1.5L
  Specs:
    - Type: Spray cleaner
    - Active Ingredients: Plant-derived cleaners
    - Surface Compatibility: Glass, tile, wood, plastic
    - Safety: Non-toxic, biodegradable
    - Scent: Neutral / Eucalyptus
  Badge: "FAMILY SAFE"
</FeaturedProductsSection>

<UsesCasesSection>
  "How Families Use SIFA999"
  
  [Use Case 1]
  "Morning Routine"
  Image: Family in bathroom
  Content: "SIFA999 Hand Wash and Body Care products are the first choice for 
           morning freshness. Gentle on skin, perfect for the whole family."
  
  [Use Case 2]
  "Keeping Home Clean & Safe"
  Image: Parent cleaning kitchen
  Content: "Whether it's wiping down kitchen surfaces or cleaning bathrooms, 
           SIFA999 cleaners work effectively while keeping your home safe for 
           kids and pets."
  
  [Use Case 3]
  "Baby & Kids Care"
  Image: Baby being washed
  Content: "SIFA999's baby and kids range is specifically formulated for tender 
           skin. Parents trust SIFA999 because safety comes first."
  
  [Use Case 4]
  "Everyday Hygiene"
  Image: Person using sanitizer
  Content: "From hand sanitizers to personal hygiene products, SIFA999 protects 
           your family with effective, trusted daily care."
</UsesCasesSection>

<SafetyAndCertificationsSection>
  Display certifications and compliance:
  
  ✓ GMP Certified Manufacturing Facility
  ✓ ISO 9001:2015 Quality Management System
  ✓ Dermatologically Tested
  ✓ Biodegradable Formula (meets OECD 301 standards)
  ✓ Tested for Heavy Metals & Toxins
  ✓ Safe for Kids & Sensitive Skin
  
  Text: "Every SIFA999 product undergoes rigorous safety testing to ensure it 
        meets international standards. Your family's safety is our priority."
</SafetyAndCertificationsSection>

<TestimonialsSection>
  4 dummy testimonials focused on trust, safety, and everyday use:
  
  [Testimonial 1]
  Name: Nguyễn Thị Hương
  Title: Mother of 2
  Quote: "I've been using SIFA999 products for 3 years now. I trust them with my 
         kids' skin because they're gentle yet effective. This brand really 
         understands what families need."
  Rating: ⭐⭐⭐⭐⭐
  
  [Testimonial 2]
  Name: Phạm Văn Minh
  Title: Small Business Owner (café)
  Quote: "SIFA999's commercial cleaning products are safe for food preparation 
         areas and work brilliantly. My staff loves them, and customers appreciate 
         the eco-friendly approach."
  Rating: ⭐⭐⭐⭐⭐
  
  [Testimonial 3]
  Name: Lê Thị Linh
  Title: Teacher
  Quote: "As a teacher responsible for classroom hygiene, SIFA999 hand sanitizers 
         and disinfectants give me peace of mind. They're effective and safe for 
         kids to use daily."
  Rating: ⭐⭐⭐⭐⭐
  
  [Testimonial 4]
  Name: Trần Quốc Sơn
  Title: Retail Store Owner
  Quote: "SIFA999 products move fast in my store. Customers ask for them by name. 
         The quality-to-price ratio is unbeatable, and the eco-friendly positioning 
         resonates with younger families."
  Rating: ⭐⭐⭐⭐⭐
</TestimonialsSection>

<RetailAndDistributorCTA>
  Two-column CTA:
  
  [Column 1]
  "For Retail Customers"
  Icon: Shopping bag
  Text: "Shop SIFA999 products online or find us at your local store. Safe, 
        trusted care delivered to your home."
  Button: "Shop Now"
  
  [Column 2]
  "For Retailers & Distributors"
  Icon: Handshake
  Text: "Interested in carrying SIFA999 in your store? We offer competitive 
        margins and full marketing support."
  Button: "Become a Partner"
</RetailAndDistributorCTA>

<SiteFooter />  // Brand-specific footer (SIFA999 contact)
<FloatingActions />
```

### Route: `/sifa999/products`
- Same layout as `/products` but filtered to SIFA999 only
- Show "SIFA999" badge on all products
- Breadcrumb: Home > SIFA999 > Products

### Route: `/sifa999/about`
- Brand story and credentials
- Safety certifications
- Team/company information (can share with company)
- Link back to main brand page

### Route: `/sifa999/contact`
- SIFA999-specific contact form
- Phone/email for SIFA999 inquiries
- Address: Same as ZIFAT999 (Phát Ngọc Anh office) or separate if needed

---

## 4.5. ALL PRODUCTS PAGE (`/products`) - B2B FOCUSED

### Purpose
Unified product catalog showing products from both brands with B2B-focused information and filtering.

### Route: `/products`

```
<SiteHeader />
<SiteNav />

<PageHeader>
  Headline: "Complete Product Catalog"
  Subheadline: "Browse all products from ZIFAT999 and SIFA999 | Bulk pricing & distributor info available"
</PageHeader>

<FilterSidebar>
  // Left column - Filters

  [Filter 1: Brand]
  ☐ All Brands
  ☐ ZIFAT999
  ☐ SIFA999

  [Filter 2: Category]
  ☐ All Categories
  ☐ Vệ sinh nhà cửa
  ☐ Nước giặt & xả
  ☐ ... (other categories)

  [Filter 3: Price Range]
  Slider: 0 VND - 500,000 VND

  [Filter 4: Stock Status]
  ☐ In Stock
  ☐ Low Stock
  ☐ Out of Stock (show availability)

  [Filter 5: Pricing Type]
  ☐ Show Retail Prices
  ☐ Show Bulk Prices
  ☐ Show Both
</FilterSidebar>

<ProductGrid>
  // Main product listing with B2B enhancements

  Each Product Card shows:
  ┌─────────────────────────────────┐
  │ [Product Image]                 │
  │ ZIFAT999 [Brand Badge]          │
  │                                 │
  │ Product Name                    │
  │                                 │
  │ Retail Price: 45,000 VND        │
  │ Bulk Price (10+): 38,000 VND ⭐ │
  │ MOQ: 10 units                   │
  │                                 │
  │ [View Details] [Add to Cart]    │
  └─────────────────────────────────┘

  Sorting Options:
  - Newest
  - Best Sellers
  - Price: Low to High
  - Price: High to Low
  - A-Z

  View Options:
  - Grid view (current)
  - List view (more details)
  - Wholesale view (MOQ + bulk pricing prominent)
</ProductGrid>

<B2BSidebar>
  // Right column (optional, sticky)

  ┌─ BULK ORDER INQUIRY ─────────┐
  │                              │
  │ "Need Custom Pricing?"       │
  │                              │
  │ Get quotes for large         │
  │ quantities or special orders │
  │                              │
  │ [Contact Sales Team]         │
  │ [Download Price List (PDF)]  │
  │                              │
  └──────────────────────────────┘

  ┌─ BECOME A DISTRIBUTOR ───────┐
  │                              │
  │ "Grow Your Business"         │
  │                              │
  │ Join our partner network     │
  │ and access distributor rates │
  │                              │
  │ [Learn More]                 │
  │                              │
  └──────────────────────────────┘

  ┌─ CONTACT INFO ───────────────┐
  │                              │
  │ Sales Team:                  │
  │ Phone: [number]              │
  │ Email: sales@...             │
  │ Hours: Mon-Fri, 8am-6pm      │
  │                              │
  └──────────────────────────────┘
</B2BSidebar>

<SiteFooter />
<FloatingActions />
```

### Product Card B2B Details
Each product now displays:
- **Retail Price**: Standard retail pricing
- **Bulk Price**: Price at MOQ or higher quantities
- **MOQ (Minimum Order Quantity)**: Clear labeling (e.g., "MOQ: 10 units")
- **Stock Status**: In Stock / Low Stock / Available to Order
- **Brand Badge**: ZIFAT999 or SIFA999 clearly marked

### Search/Filter Behavior
- URL params: `?brand=ZIFAT999&category=...&price_min=...&price_max=...`
- Results update in real-time as filters change
- Filter state persists in URL for bookmarking

### Product Detail Page Updates
Each product detail page also includes:
- Bulk pricing tiers (e.g., 1-9 units: 45,000 VND | 10-49 units: 38,000 VND | 50+ units: 32,000 VND)
- MOQ information prominently displayed
- "Request Bulk Quote" button for custom pricing
- Volume selector with pricing breakdown
- Distributor contact info

---

## 5. BRAND DIFFERENTIATION STRATEGY

### Visual Differentiation

| Aspect | ZIFAT999 | SIFA999 |
|--------|----------|--------|
| **Primary Color** | Strong Blue (#1e40af) | Warm Green (#16a34a) |
| **Secondary Color** | Industrial Gray | Soft Cream |
| **Typography Tone** | Bold, confident | Approachable, friendly |
| **Imagery** | Professional, industrial scenes | Family, home, daily life |
| **Product Photography** | Clean, technical specs visible | Lifestyle, use-in-context |

### Positioning Differences

#### ZIFAT999: "Industrial-Strength Performance"
- **Target**: B2B, professional cleaners, heavy-duty users
- **Key Message**: Reliability, performance, durability
- **Use Cases**: Factories, commercial kitchens, industrial cleaning
- **Tone**: Professional, technical, results-driven
- **Product Focus**: Heavy-duty formulas, large volumes, bulk options
- **Certifications Emphasized**: Industrial standards, durability, safety specs
- **USPs**: 
  - "Powerful formula for tough jobs"
  - "Professional-grade performance"
  - "Trusted by industries nationwide"

#### SIFA999: "Safe & Accessible Daily Care"
- **Target**: Families, retail consumers, small businesses
- **Key Message**: Safety, trust, accessibility, eco-consciousness
- **Use Cases**: Families, homes, small cafés, personal hygiene
- **Tone**: Warm, trustworthy, family-oriented
- **Product Focus**: Gentle formulas, sustainable ingredients, smaller convenient sizes
- **Certifications Emphasized**: Dermatological testing, biodegradability, safety for kids
- **USPs**:
  - "Safe for families and sensitive skin"
  - "Eco-conscious without compromising quality"
  - "Trusted by 500,000+ Vietnamese families"

### Content Differentiation

**ZIFAT999 Homepage Section Copy Example:**
> "ZIFAT999 delivers professional-grade cleaning solutions for demanding industrial applications. From factory floors to commercial kitchens, ZIFAT999 professionals trust our products for reliable, powerful performance."

**SIFA999 Homepage Section Copy Example:**
> "SIFA999 brings safe, effective daily care to families across Vietnam. From baby products to household cleaning, we combine powerful performance with peace of mind, so you can trust what you bring home."

---

## 6. HOMEPAGE (COMPANY-LEVEL) - DETAILED CONTENT

### Section 1: Hero Section
**Headline**: "Phát Ngọc Anh: Vietnam's Trusted Chemical Solutions Partner"

**Subheadline**: "Delivering quality, safety, and innovation across two leading brands for over 15 years"

**CTA Buttons**: 
- "Explore ZIFAT999" (blue)
- "Explore SIFA999" (green)

**Background**: Company facility or chemical products in use

---

### Section 2: Company Overview
**Headline**: "About Phát Ngọc Anh"

**Content Grid** (3 columns):

[Column 1]
**15+ Years of Excellence**
"Since our founding, we've been committed to delivering quality chemical solutions that meet the highest standards."

[Column 2]
**2 Trusted Brands**
"ZIFAT999 for industrial strength. SIFA999 for family safety. Both backed by decades of expertise."

[Column 3]
**National Reach**
"Available in 50+ provinces across Vietnam with a network of 1,000+ retailers and distributors."

---

### Section 3: Brand Highlight (NEW - KEY SECTION)
**Headline**: "Our Brands"

**Two-Brand Card Grid**:

#### Card 1: ZIFAT999
- **Brand Logo**: [Logo image]
- **Headline**: "ZIFAT999 - Industrial-Strength Performance"
- **Tagline**: "Professional solutions for demanding applications"
- **Key Points**:
  ✓ Professional-grade formulas
  ✓ Trusted by industries nationwide
  ✓ Proven durability and reliability
- **CTA Button**: "Explore ZIFAT999" → `/zifat999`
- **Badge**: "Industrial Partner"

#### Card 2: SIFA999
- **Brand Logo**: [Logo image]
- **Headline**: "SIFA999 - Safe & Accessible Daily Care"
- **Tagline**: "Premium care for families, by families"
- **Key Points**:
  ✓ Dermatologically tested
  ✓ Eco-conscious formulations
  ✓ Trusted by 500,000+ families
- **CTA Button**: "Explore SIFA999" → `/sifa999`
- **Badge**: "Family Trusted"

---

### Section 4: Featured Products (Multi-Brand)
**Headline**: "Popular Products from Both Brands"

**Grid Layout**: 6 products (3 ZIFAT999 + 3 SIFA999)

Each product card shows:
- Product image
- Brand badge (ZIFAT999 or SIFA999)
- Product name
- Price
- "View Details" link

---

### Section 5: Distribution & Reach
**Headline**: "Available Nationwide"

**Content**: 
- Map visualization of Vietnam with distribution points
- Text: "Our products are available across 50+ provinces through 1,000+ retail partners and distributors."
- Placeholder for partner logos (5-8 major retailer logos)

---

### Section 6: Why Choose Phát Ngọc Anh
**Headline**: "Why Trust Us"

**4-Column Grid**:

[1] **Quality First**
"All products meet international standards and rigorous quality controls."

[2] **Innovation-Driven**
"Continuous R&D ensures our formulas stay ahead of market needs."

[3] **Customer Support**
"Dedicated support for retailers, distributors, and consumers."

[4] **Sustainable Growth**
"Eco-conscious, scalable solutions for a growing market."

---

### Section 7: Call-to-Action
**Content**: Two prominent CTAs side-by-side

[Left CTA]
**Headline**: "Are You a Retailer or Distributor?"
**Text**: "Join our nationwide network and grow your business with our trusted brands."
**Button**: "Become a Partner" → `/contact`

[Right CTA]
**Headline**: "Find Your Product**
**Text**: "Browse our complete catalog of solutions for every need."
**Button**: "Shop All Products" → `/products`

---

## 7. IMPLEMENTATION ROADMAP

### Phase 1: Data & Infrastructure
1. Add "brand" field to product data model
2. Create brand configuration file (colors, metadata, copy)
3. Create reusable brand sections/components
4. Set up dynamic routing for `/[brand]/*` pages

### Phase 2: Refactor Existing Content
1. Update `/about` to be company-focused
2. Update `/contact` to be company-focused (but with brand selector)
3. Update `/news` to be company-focused
4. Refactor homepage to new company-level structure
5. Create brand utility functions for filtering/context

### Phase 3: Create Brand Pages
1. Create `/brands` brand selection page
2. Create `/zifat999` brand home page
3. Create `/zifat999/about`, `/zifat999/products`, `/zifat999/contact`
4. Create `/sifa999` brand home page
5. Create `/sifa999/about`, `/sifa999/products`, `/sifa999/contact`
6. Add brand context/provider

### Phase 4: Add Dummy Content & Polish
1. Add 8-12 SIFA999 products to product data
2. Create dummy testimonials (SIFA999)
3. Add brand-specific images/logos
4. Update navigation to show brand context
5. Add breadcrumb navigation

### Phase 5: Internal Linking & SEO
1. Update footer links across all pages
2. Add cross-brand linking where appropriate
3. Update meta tags for each brand page
4. Add brand-specific JSON-LD schema
5. Update sitemap.xml

---

## 8. PRODUCT DATA STRUCTURE (Updated)

### Updated Product Interface
```ts
export interface Product {
  id: string;
  brand: 'ZIFAT999' | 'SIFA999';           // NEW FIELD - Brand identifier
  img: StaticImageData;
  images: StaticImageData[];
  name: string;
  price: string;                           // Retail price
  priceRaw: number;                        // Retail price (numeric)
  category: string;
  // Existing fields...

  // NEW B2B FIELDS:
  moq?: number;                            // Minimum Order Quantity (e.g., 10)
  bulkPriceTiers?: Array<{                // Bulk pricing structure
    minQuantity: number;                   // e.g., 10, 50, 100
    maxQuantity?: number;                  // e.g., 49, 99
    price: number;                         // Price per unit at this tier
    discountPercent?: number;              // e.g., 15% off retail
  }>;
  isBulkAvailable?: boolean;               // Can be ordered in bulk
  distributor?: {                          // Distributor contact info
    name?: string;
    phone?: string;
    email?: string;
  };
}
```

**Example usage:**
```ts
{
  id: 'zifat-001',
  brand: 'ZIFAT999',
  name: 'ZIFAT999 Industrial Cleaner',
  price: '45,000 VND',
  priceRaw: 45000,
  moq: 10,
  bulkPriceTiers: [
    { minQuantity: 10, maxQuantity: 49, price: 38000 },      // 15% off
    { minQuantity: 50, maxQuantity: 99, price: 32000 },      // 29% off
    { minQuantity: 100, price: 28000 },                       // 38% off
  ],
  isBulkAvailable: true,
  // ... other fields
}
```

### Category Strategy
**Shared Categories** (appear on both brands):
- Nước rửa chén (Dish wash)
- Nước tẩy vệ sinh (Cleaning spray)
- Chăm sóc xe (Car care)
- Thông cống & WC (Drain & WC)

**ZIFAT999-Exclusive Categories**:
- Tẩy rửa công nghiệp (Industrial cleaning)
- Diệt côn trùng (Insect control)

**SIFA999-Exclusive Categories**:
- Hand & Body Care
- Baby & Kids Range
- Personal Hygiene
- Laundry Care

---

## 9. NAVIGATION UPDATES

### Desktop Navigation Changes
- "Sản Phẩm" (Products) button in header:
  - On homepage: Links to `/brands` (brand selection page showing ZIFAT999 and SIFA999 cards with CTAs)
  - On other pages: Shows dropdown with brand options or links to `/products` with brand filter
- On company pages (/about, /contact): standard nav
- On brand pages (/zifat999/*, /sifa999/*): show brand context in nav
- Product dropdown: Show "All Products" + "ZIFAT999" + "SIFA999" options

### Mobile Navigation Changes
- "Sản Phẩm" button triggers similar behavior to desktop
- Add "Our Brands" section in drawer with both brands listed
- List ZIFAT999 and SIFA999 with direct links to their product pages
- Keep existing nav structure for backward compatibility

### /products Page Updates (Main Product Listing)
- **Brand Filter** (in sidebar): Checkbox filters for ZIFAT999, SIFA999, or both
- **B2B Information Display**:
  - Show bulk pricing tiers for each product
  - Display "Minimum Order Quantity" (MOQ)
  - Add "Distributor Info" panel: contact for distributor partnerships
  - Include "Bulk Order" vs "Retail Price" toggle
- **Filter Categories**:
  - Brand (ZIFAT999, SIFA999)
  - Category (existing product categories)
  - Price range
  - Stock status

---

## 10. SEO CONSIDERATIONS

### Meta Tags by Page

**Homepage** (/)
- Title: "Phát Ngọc Anh - Vietnam's Leading Chemical Solutions"
- Description: "Trusted chemical products from ZIFAT999 and SIFA999. Professional solutions and daily care for families."

**ZIFAT999 Home** (/zifat999)
- Title: "ZIFAT999 - Industrial-Strength Cleaning & Chemical Solutions"
- Description: "Professional-grade chemical products trusted by industries nationwide. From industrial cleaning to commercial use."

**SIFA999 Home** (/sifa999)
- Title: "SIFA999 - Safe Daily Care Products for Families"
- Description: "Dermatologically tested, eco-conscious products trusted by 500,000+ Vietnamese families. Safe care for everyday use."

### Schema Markup
- Organization schema on homepage (company level)
- LocalBusiness schema on both brand pages (local presence)
- Product schema on product pages (with brand context)
- BreadcrumbList on all navigable pages

---

## 11. REUSABLE COMPONENTS CHECKLIST

### New Components to Create
- `BrandHighlightCard` - Used on homepage
- `BrandHeroSection` - Used on /zifat999 and /sifa999
- `BrandStorySection` - Brand-specific story
- `ProductCategoryGrid` - Brand product categories
- `SafetyHighlightSection` - SIFA999-specific
- `UsesCasesSection` - Can be reused
- `TestimonialsSection` - Can be reused (already exists)
- `CTASection` - Flexible CTA blocks

### Existing Components to Update
- `SiteNav` - Add brand context
- `SiteFooter` - Add brand-specific variants
- `SiteHeader` - Add brand selector/context
- `ProductCard` - Show brand badge
- `ProductsPage` - Support brand filtering

---

## 12. CONTENT TRANSLATION / LOCALIZATION NOTES

All dummy content should be:
- In Vietnamese (to match existing site language)
- Professional yet accessible
- Brand-appropriate in tone
- Realistic for chemical product industry

Example copywriting templates are included above for SIFA999; apply similar approach to ZIFAT999 messaging.

---

## 13. TIMELINE & EFFORT ESTIMATE (Information Only)

This restructuring involves:
- ~8-10 new/refactored page components
- ~5-6 new reusable components
- ~1 new data structure field (brand)
- ~20-30 new product dummy entries
- Navigation refactoring
- SEO/metadata updates

**Effort**: Medium complexity, high visibility impact.

---

## Summary

This plan creates:
1. ✅ Clear multi-brand architecture
2. ✅ Company-level homepage (SEO & credibility)
3. ✅ Two distinct brand identities with clear differentiation
4. ✅ Scalable structure for future brands
5. ✅ Backward compatibility with existing routes
6. ✅ SEO-friendly sitemap and internal linking
7. ✅ Rich dummy content for SIFA999 (ready to implement)

Ready to proceed with implementation?
