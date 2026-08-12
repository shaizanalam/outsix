# OUTSIX Website — UI/UX Audit & Improvement Plan

**Site:** https://outsix.vercel.app
**Reviewed on:** Mobile (Chrome, Android) + site structure
**Focus:** Mobile-first responsiveness, hero section, product cards, overall UX

---

## 1. Hero Section

### Problems observed
- On mobile, the hero is a tall empty grid (visible faint grid lines) with **no visual content** — no product shot, model, or graphic — just background.
- Headline "OUTSIDE THE ORDINARY." + "SHOP THE DROP" CTA are crammed at the **very bottom** of the viewport, forcing the user to scroll past a wall of empty space before seeing anything meaningful.
- The floating product cards ("OUTSIDE FLAME TEE", "VOID SKULL TEE") that exist in the desktop layout appear to be **absolutely positioned** for a wide viewport and get pushed off-screen or hidden on mobile instead of reflowing.
- Marquee ticker ("NEW DROP 01 • FREE SHIPPING...") is good, but everything below it is dead space until the very bottom.
- No scroll cue is visible until the last inch of the section (there IS a "SCROLL" label, but it's below the fold along with the headline).

### Why it matters
- First impression = empty black screen. On a streetwear brand, the hero should hit with attitude (imagery, motion, texture) in the **first 100vh**, not 3 grid-lines of nothing.
- High bounce risk: mobile is likely 70-80%+ of traffic for a DTC streetwear brand; a broken hero directly hurts conversion.

### Recommended fixes
- **Rebuild hero mobile layout** (don't just shrink desktop): stack floating product images centered/behind the headline instead of pinned to fixed pixel coordinates. Use `%`/`vw`/`clamp()` positioning or switch to a simple centered composition below `768px`.
- Vertically center the headline block in the viewport (or place it in the upper/middle third) rather than bottom-anchored — use `min-height: 100svh` with `display:flex; align-items:center` (use `svh` not `vh` to avoid mobile browser chrome jump).
- Bring at least one product image/graphic into view above the fold on mobile — even a single large flame/skull graphic behind the text.
- Convert the "SCROLL" indicator into a small animated chevron pinned near the bottom of the *visible* hero (not the whole section), so it's always visible on load.
- Reduce hero height on mobile — a 100vh+ hero with nothing in it feels broken; ~85–90svh with content visible reads as intentional.

---

## 2. Product Card / Product Detail Page (Shark Mark Tee example)

### Problems observed
- **Image gallery is lopsided**: one large image top-left, a tiny second thumbnail beside it with a semi-transparent "1/2 ZOOM" badge awkwardly overlapping the thumbnail text ("BESTS..." badge collides with "ZOOM" label — both are cut off and unreadable).
- Third image sits alone in a second row, breaking the grid rhythm (2 images in row 1, 1 in row 2 = visually unbalanced).
- Price / discount block looks fine, but **"SELECT SIZE" size-chips are cut off** — the row of size buttons is clipped by the sticky bottom bar, so the user can't see which sizes exist without scrolling awkwardly between the sticky CTA and the size selector.
- Sticky bottom bar duplicates "SELECT SIZE" as both a disabled state label and a button, which reads as redundant/confusing until sizes are actually visible.
- No clear indicator of stock/size availability (out-of-stock sizes, etc.).

### Recommended fixes
- **Mobile gallery:** switch to a single full-width swipeable carousel (1 image at a time, dot/line pagination) instead of a broken thumbnail grid. This is the standard, expected pattern (Zara/H&M/most DTC streetwear sites) and immediately fixes the "odd" layout.
- Move zoom into a tap-to-expand (fullscreen lightbox) gesture rather than a text badge overlapping a thumbnail.
- Reorder page so **size selection is visible without scrolling past the fold**: Price → Size selector → Add to Bag, with the sticky bottom bar only holding price + one CTA (no duplicate "select size" text).
- Make unavailable sizes visibly disabled (strikethrough / greyed) rather than absent.
- Add micro-content that streetwear shoppers expect: fabric/GSM, fit (oversized/regular), model height + size worn, delivery estimate by pincode.

---

## 3. Product Grid / Listing Cards (Homepage "NEW DROP", "BEST SELLERS")

### Problems observed
- Cards rely entirely on text labels for status ("DROP 01", "30% OFF", "BESTSELLER") — fine, but no visual hierarchy differentiates a discount badge from a collection badge; they may visually compete for the same corner space.
- "ADD TO BAG" appears directly on every homepage card — on mobile this is risky because tapping near the product image can misfire into "Add to Bag" instead of opening the product page, especially with tees that need size selection first (there's no size picker on the card, so what does Add to Bag actually add?).
- Grid likely forces 2-across on mobile with tight card padding based on the site's dark, minimal styling — verify text isn't touching card edges.

### Recommended fixes
- Clarify "Add to Bag" behavior on listing cards: either (a) open a quick-add size-picker sheet on tap, or (b) relabel the card action "View" / remove it and rely on tapping the card to go to PDP for size selection. Right now it silently assumes a size, which is a common cause of returns/support tickets.
- Standardize badge placement: one badge slot top-left (collection/bestseller) and one top-right (discount %), consistent across every card.
- Increase tap target size/spacing between "ADD TO BAG" and the product title link so mobile taps don't misfire.

---

## 4. Navigation & Header

### Problems observed
- Header (SHOP / COLLECTIONS / ABOUT / wishlist) is presumably collapsed into a hamburger menu (☰) on mobile, per the screenshot — icons present (search, bag, hamburger) but no visible cart item count badge.
- No visible sticky/persistent search, which matters for a catalog site once more products are added.

### Recommended fixes
- Add a cart-count badge on the bag icon (small numeral) so users get feedback after adding items.
- Confirm hamburger menu opens a full-screen mobile nav with clear touch targets (44px minimum height per item) and includes Shop/Collections/About/Wishlist/Contact — don't bury key nav items.
- Persist the marquee/announcement bar OR the header on scroll (currently unclear if header is sticky) — for a shopping site, a sticky header with cart access reduces friction.

---

## 5. Visual & Typographic Consistency

### Observations
- Strong point: bold, oversized display type ("OUTSIDE THE ORDINARY.") fits the Gen-Z streetwear identity well, and the dark theme is on-brand.
- Risk: an all-black background with grey/white text and no imagery (as seen in the empty hero) reads as an *unfinished* page rather than minimal/edgy — the brand's boldness needs to show up in imagery and motion, not just typography.
- Section titles ("NEW DROP", "BEST SELLERS", "SHOP BY CATEGORY") are all-caps and similar weight throughout — fine for consistency, but could use a secondary accent (a color, a hairline rule, or numbering) to help users scan a long homepage faster.

### Recommended fixes
- Introduce one accent color (even used sparingly — e.g., on discount badges, hover states, and the "SHOP THE DROP" CTA) to break up the black/white/grey monotony and guide the eye.
- Add subtle scroll-triggered fade/slide-in on section reveals (already common in this aesthetic) to compensate for the static, image-light layout — but keep it restrained (respect `prefers-reduced-motion`).
- Ensure line-height/letter-spacing on the big hero type doesn't cause overflow/clipping on narrower phones (360px width) — test at that breakpoint specifically, it's still very common in India.

---

## 6. Performance & Technical

### Observations
- Product photography (`bgrem1.png`, `bgrem2.png`, `ed2.jpeg`, `eg1.jpeg`) is reused across sections (e.g., the same "ed2.jpeg"/"eg1.jpeg" images appear in "Featured", "Collections", AND the Instagram grid) — this reads as content-thin and repetitive to a browsing user.
- PNGs for product photography (`bgrem1.png`, `bgrem2.png`) are likely much larger than a WebP/AVIF equivalent — worth checking, since image weight is the #1 mobile speed killer on fashion sites.
- No visible size guide preview, wishlist heart icon on cards, or quick filters (price, size, color) on listing pages — standard e-commerce expectations that are currently missing based on the crawled structure.

### Recommended fixes
- Serve images as responsive `srcset`/AVIF-WebP with explicit width/height to avoid layout shift (CLS), especially important on mid-range Android devices common in India.
- Get distinct photography per section, or at minimum crop/angle-vary the reused shots so the Instagram grid doesn't look like a copy-paste of the Collections section.
- Add a wishlist (heart) icon directly on product cards — you already have a `/wishlist` route, but there's no visible way to add to it from the grid.
- Add basic filter/sort on `/shop` (price, size, category) if not already present.

---

## 7. Priority Action List (Mobile-First)

**P0 — Fix immediately (breaks core experience):**
1. Rebuild hero for mobile: centered content, no empty dead zone, image/graphic visible above the fold.
2. Fix PDP image gallery: replace broken thumbnail grid with a single swipeable carousel.
3. Fix PDP layout so size selector is reachable without scroll conflict with the sticky bar.

**P1 — Fix soon (conversion/usability):**
4. Clarify/fix "Add to Bag" behavior on listing cards (size ambiguity).
5. Add cart-count badge to header bag icon.
6. Standardize badge placement (collection vs. discount) across all cards.

**P2 — Polish (brand & performance):**
7. Introduce one accent color for hierarchy/CTAs.
8. Optimize and diversify imagery (formats + unique shots per section).
9. Add wishlist icon on cards, filters on `/shop`.
10. Restrained scroll-reveal motion respecting `prefers-reduced-motion`.

---

## 8. Quick Mobile CSS Notes (for the hero specifically)

The empty-hero issue is almost certainly caused by desktop-only absolute positioning for the floating product images and a bottom-anchored text block. As a starting point for the fix:

```css
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center; /* was bottom-anchored before */
  padding: 24px;
}

.hero-floating-product {
  position: static;       /* was position: absolute on desktop */
  width: 60%;
  margin: 0 auto 16px;
}

@media (min-width: 768px) {
  .hero-floating-product {
    position: absolute;   /* restore desktop behavior */
    width: auto;
  }
}
```

This is illustrative — the actual fix depends on the current component structure, but the principle is: **don't just scale desktop absolute-positioning down, redesign the mobile layout as its own flow.**

---

*End of audit.*