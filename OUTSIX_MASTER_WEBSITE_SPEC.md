OUTSIX --- Master Website Build Specification

Gen-Z Streetwear E-Commerce Experience · Dark · Experimental · Fast · Premium

Project: OUTSIXGoal: Build a production-quality, highly interactive streetweare-commerce website for outsix.in, inspired by the brand's currentvisual language: black garments, aggressive graphic prints,underground/street culture, high contrast, editorial photography, anda bold shark-inspired identity.

Build environment: Antigravity / Google AntigravityUI foundation: Use the already-installed @vudovn/ag-kit /Antigravity Kit wherever appropriate. Do not recreate componentsthat the kit already provides. Inspect the installed kit and reuse itsprimitives, patterns, utilities, and conventions.

Important: This document is the single source of truth for theentire build. Do not treat the homepage as the whole product. Buildthe complete shopping workflow: discovery → product → wishlist/cart →checkout → order confirmation → account/order history.

1. PRODUCT VISION

OUTSIX should feel like a real Gen-Z streetwear brand, not anAI-generated fashion template.

The experience should sit somewhere between:

underground streetwear

fashion editorial

music/culture website

premium DTC commerce

experimental digital magazine

The website must feel confident, raw, slightly rebellious, minimalwhere it matters, and extremely intentional.

Core emotional reaction

When a visitor lands on OUTSIX:

"This looks like a real streetwear label."

Not:

"This looks like an AI ecommerce demo."

2. VISUAL DIRECTION

Primary Theme

Dark-first / near-black / monochrome

Base visual language:

near-black backgrounds

washed blacks

charcoal

off-white

dirty white

subtle grey

restrained electric blue only where interaction feedback requires it

occasional red/orange accents derived from product photography,never as a generic website accent

Do not make the entire website neon.

Color tokens

--background: #070707;
--surface: #0D0D0D;
--surface-elevated: #131313;
--surface-hover: #191919;

--text-primary: #F5F5F0;
--text-secondary: #A1A1A1;
--text-muted: #666666;

--border: rgba(255,255,255,0.10);
--border-strong: rgba(255,255,255,0.18);

--white: #FFFFFF;
--black: #000000;

--accent: #FFFFFF;
--accent-inverse: #000000;

Use CSS variables/design tokens rather than scattering hex valuesthrough components.

3. DESIGN RULES

Typography

Typography should feel editorial and fashion-oriented.

Use a strong grotesk/sans-serif display face for:

hero headlines

collection names

prices

product names

navigation emphasis

Use a clean readable sans-serif for:

body copy

descriptions

forms

checkout

account pages

Recommended hierarchy:

Display XL: 72–120px
Display L: 48–72px
Heading: 32–48px
Subheading: 20–28px
Body: 15–18px
Small: 11–13px
Micro: 9–11px

Desktop typography may be oversized.

Mobile typography must remain intentional and readable.

Avoid:

generic Inter-everywhere feeling

excessive rounded UI fonts

bubbly startup typography

unnecessary gradients

giant text on every section

4. BRAND LANGUAGE

OUTSIX copy should be:

short

confident

direct

culturally aware

slightly mysterious

never corporate

Examples of tone:

NO RULES. JUST FORM.

BUILT FOR THE OUTSIDE.

NEW DROP.

LOW STOCK.

THE NEXT UNIFORM.

NOT FOR EVERYONE.

DROP 01.

OUTSIDE THE ORDINARY.

Do not overuse slang.

Do not use fake marketing phrases such as:

"Elevate your style"

"Unleash your fashion"

"Discover timeless elegance"

"Step into the future"

5. INFORMATION ARCHITECTURE

Build the following routes.

Public

/
 /shop
 /shop/[category]
 /product/[slug]
 /collections
 /collections/[slug]
 /search
 /wishlist
 /cart
 /checkout
 /checkout/success
 /about
 /contact
 /size-guide
 /shipping
 /returns
 /faq

Account

/account
/account/orders
/account/orders/[id]
/account/profile
/account/addresses
/account/settings

If authentication is implemented later, keep the architecture ready forit.

6. GLOBAL NAVIGATION

Desktop navigation should be minimal and premium.

Suggested structure:

OUTSIX                         SHOP   COLLECTIONS   ABOUT
                              SEARCH   ♡   BAG

Possible secondary navigation:

NEW DROP
TEES
HOODIES
BOTTOMS
ACCESSORIES
SALE

Header behavior

At top:

transparent or visually integrated with hero

logo prominent

minimal controls

On scroll:

sticky

compact

subtle backdrop/blur

thin bottom border

smooth transition

Do not make the header oversized.

7. MOBILE NAVIGATION

Mobile is a first-class experience.

Use:

OUTSIX                         BAG

with a menu trigger.

Menu should open as a full-screen editorial overlay.

Example:

SHOP
  NEW DROP
  TEES
  HOODIES
  BOTTOMS

COLLECTIONS

ABOUT

SEARCH

ACCOUNT

Use large typography and generous spacing.

Animate menu items into position.

8. HOMEPAGE EXPERIENCE

The homepage must feel like a campaign, not a standard ecommercegrid.

SECTION 01 --- HERO

Full viewport campaign visual.

Possible structure:

[full-screen product/editorial image or video]

OUTSIX

DROP 01

SHOP THE DROP →

Hero should support:

image

video

subtle grain

subtle parallax

cursor interaction on desktop

mobile-safe crop

Do not use a generic gradient hero.

Hero interaction

As user moves pointer:

background shifts very slightly

typography may respond subtly

CTA gets micro interaction

Keep it restrained.

9. NEW DROP SECTION

Large editorial section.

Example:

NEW DROP
DROP 01

[large product]
[large product]

Use asymmetric composition rather than every product having identicalcards.

Possible layouts:

2-column editorial

3-column grid

featured product + smaller products

horizontal product rail

10. PRODUCT CARD SYSTEM

Create one reusable ProductCard.

Must support:

product image

secondary image on hover

product name

price

sale price

badge

wishlist button

quick add

size selector

stock state

hover animation

Example:

┌─────────────────────────┐
│                     ♡   │
│                         │
│       PRODUCT IMAGE     │
│                         │
│                  QUICK  │
│                  ADD    │
└─────────────────────────┘

PRODUCT NAME
₹599

S / M / L / XL

Hover

Desktop:

image changes to second product image

image slightly scales

quick-add appears

wishlist icon becomes visible

product metadata remains stable

Do not make cards jump around.

11. SHOP PAGE

Shop page should provide real ecommerce functionality.

Top:

SHOP
ALL PRODUCTS

[Search] [Filter] [Sort]

Filters:

category

size

price

color

availability

collection

Sort:

featured

newest

price low → high

price high → low

best selling

Desktop:

filter sidebar or expandable filter bar

Mobile:

bottom-sheet filter UI

Product grid:

Desktop: - 4 columns preferred - 3 columns when visual breathing roomrequires it

Tablet: - 2--3 columns

Mobile: - 2 columns

12. PRODUCT DETAIL PAGE

This is one of the most important screens.

Desktop layout

┌──────────────────────┬─────────────────────────────┐
│                      │ PRODUCT NAME                │
│                      │ ₹599                        │
│  IMAGE               │                             │
│                      │ DESCRIPTION                 │
│  IMAGE               │                             │
│                      │ SIZE                        │
│  IMAGE               │ [S] [M] [L] [XL]           │
│                      │                             │
│                      │ SIZE GUIDE                  │
│                      │                             │
│                      │ [ ADD TO BAG ]              │
│                      │ [ ♡ WISHLIST ]              │
│                      │                             │
│                      │ SHIPPING / RETURNS           │
└──────────────────────┴─────────────────────────────┘

Product page requirements

Include:

image gallery

zoom

product name

price

compare-at price if applicable

discount

description

material

fit

size selector

size guide

quantity

add to bag

buy now

wishlist

stock state

delivery estimate

shipping info

returns info

related products

recently viewed products

Product image interaction

Desktop:

vertical image gallery

large primary image

hover zoom

Mobile:

swipe gallery

image counter

sticky purchase bar

13. SIZE SELECTOR

Size selection must be visually obvious.

SELECT SIZE

S    M    L    XL    XXL

Unavailable:

disabled

reduced opacity

no misleading interaction

If user clicks Add to Bag without a size:

show an inline error / focus the size selector.

Do not use an annoying browser alert.

14. CART SYSTEM

Cart should feel premium.

Desktop:

Use a slide-over cart drawer.

Mobile:

Full-screen cart.

Cart contents:

PRODUCT
SIZE
QUANTITY
PRICE
REMOVE

Actions:

increase quantity

decrease quantity

remove

move to wishlist

continue shopping

checkout

Show:

Subtotal
Shipping
Discount
Total

CTA:

CHECKOUT →

15. CART MICROINTERACTIONS

When adding an item:

button changes to loading state

product enters cart

cart count updates

cart drawer opens

subtle confirmation animation

Example:

ADDED TO BAG ✓

Do not overdo confetti.

Streetwear brand ≠ casino website.

16. WISHLIST

Wishlist must be a real working flow.

Users can:

add product

remove product

see saved products

move product to bag

choose size before moving to bag

Empty state:

NOTHING SAVED YET.

KEEP LOOKING.

[ SHOP THE DROP ]

17. SEARCH

Search should feel fast.

Desktop:

Search overlay.

Mobile:

Full-screen search.

Features:

instant search

product suggestions

recent searches

popular searches

empty state

no-results recommendations

Example:

SEARCH OUTSIX

Popular:
TEES
HOODIES
DROP 01
GRAPHIC

18. CHECKOUT

Build a clean, distraction-free checkout.

Do not make checkout visually experimental to the point of hurtingusability.

Structure:

CONTACT
EMAIL

DELIVERY
FULL NAME
PHONE
ADDRESS
CITY
STATE
PINCODE

PAYMENT

ORDER SUMMARY

Support architecture for:

UPI

card

net banking

wallet

cash on delivery if business rules allow

Do not implement fake payment success logic if a real payment gateway isnot connected.

For prototype mode, clearly isolate mock payment behavior.

19. ORDER SUCCESS

After successful checkout:

Large confirmation.

ORDER CONFIRMED.

THANK YOU FOR BEING OUTSIDE.

ORDER #OSX-0001

[ VIEW ORDER ]
[ CONTINUE SHOPPING ]

Add a subtle animated confirmation.

20. ACCOUNT EXPERIENCE

Account dashboard:

WELCOME BACK.

ORDERS
WISHLIST
PROFILE
ADDRESSES
SETTINGS

Orders:

ORDER #OSX-0001
DATE
STATUS
TOTAL

VIEW ORDER →

Order detail:

products

sizes

quantities

delivery address

payment

status timeline

21. COLLECTIONS PAGE

Treat collections like editorial campaigns.

Instead of:

Collection 1
Collection 2
Collection 3

use:

DROP 01

OUTSIDE THE ORDINARY

[large visual]

EXPLORE →

---

DROP 02

[large visual]

Use oversized imagery.

22. ABOUT PAGE

Avoid corporate "Our Mission" blocks.

Build an editorial story.

Possible structure:

OUTSIX

FOR THE ONES WHO
DON'T FIT THE FRAME.

[image]

THE BRAND

[short story]

THE CULTURE

[image / typography]

OUTSIDE THE ORDINARY.

Use visual rhythm.

23. FOOTER

Footer should be simple.

OUTSIX

SHOP
NEW DROP
TEES
HOODIES
BOTTOMS

HELP
SHIPPING
RETURNS
SIZE GUIDE
FAQ

COMPANY
ABOUT
CONTACT

SOCIAL
INSTAGRAM
...

Bottom:

© 2026 OUTSIX
ALL RIGHTS RESERVED.

24. MOTION SYSTEM

Use motion intentionally.

Preferred technologies:

Framer Motion / Motion

GSAP only where truly beneficial

CSS transitions for simple states

existing Antigravity Kit motion utilities/components where available

Do not animate everything.

Motion principles

Page entrance

opacity

translateY

slight blur → sharp

Product images

scale 1 → 1.03

image transition

no excessive rotation

Buttons

subtle translation

background transition

icon movement

Navigation

smooth slide

staggered menu items

Cart

slide-in

product confirmation

Scroll

Use subtle:

parallax

reveal

scale

image movement

25. THREE.JS / WEBGL

Use 3D only where it adds brand value.

Potential use:

Hero

A subtle 3D OUTSIX/shark-inspired object or abstract chrome/black form.

Product

Optional interactive product viewer later.

Cursor

Subtle custom cursor on desktop.

Do NOT turn the entire website into a Three.js experiment.

Performance > gimmicks.

26. GRAIN / TEXTURE

The brand visuals in the reference material have a gritty physical feel.

Create a subtle grain/noise layer.

Use:

CSS noise

SVG filter

lightweight overlay

Rules:

extremely subtle

never reduce readability

never interfere with product photography

27. IMAGE DIRECTION

The supplied reference screenshots show:

black oversized tees

large graphic prints

monochrome artwork

gritty texture

white/grey graphics

occasional red details

dark fashion aesthetic

Use this as the visual direction.

Product photography should use:

strong contrast

clean backgrounds for product cards

editorial photography for campaigns

consistent aspect ratios

Do not distort product images.

Use object-fit: contain for isolated product photography whereappropriate.

28. RESPONSIVE DESIGN

Do not simply shrink desktop.

Design explicitly for:

Mobile

360px
390px
412px

Tablet

768px
1024px

Desktop

1280px
1440px
1728px+

Mobile must have:

thumb-friendly buttons

sticky add-to-cart

bottom sheets

full-screen search/menu

2-column product grid

swipe galleries

29. ACCESSIBILITY

Implement:

keyboard navigation

visible focus states

semantic HTML

accessible labels

sufficient contrast

reduced-motion support

alt text

proper button elements

form validation

Never rely solely on color for product states.

30. PERFORMANCE

The website must feel fast.

Requirements:

lazy-load below-fold images

responsive image sizes

optimized formats

avoid huge JavaScript bundles

avoid unnecessary 3D

avoid rendering massive DOM trees

use skeleton loading states

prevent layout shift

preload only critical assets

Animations must remain smooth on mid-range mobile devices.

31. COMPONENT ARCHITECTURE

Create reusable components.

Suggested structure:

components/
  layout/
    Header
    MobileMenu
    Footer

  navigation/
    SearchOverlay
    CategoryNav
    Breadcrumbs

  product/
    ProductCard
    ProductGrid
    ProductGallery
    ProductInfo
    SizeSelector
    QuantitySelector
    ProductActions
    RelatedProducts
    RecentlyViewed

  cart/
    CartDrawer
    CartItem
    CartSummary

  wishlist/
    WishlistButton
    WishlistGrid
    WishlistItem

  checkout/
    CheckoutForm
    OrderSummary
    PaymentMethod
    AddressForm

  ui/
    Button
    IconButton
    Modal
    Drawer
    Sheet
    Tabs
    Input
    Select
    Badge
    Skeleton
    Toast
    Dialog

Use the Antigravity Kit equivalents whenever they exist.

32. ANTIGRAVITY KIT RULE

The project already contains:

npx @vudovn/ag-kit init

and installation has completed successfully.

Before implementing UI:

Inspect the generated project files.

Inspect available Antigravity Kit components.

Identify reusable primitives.

Use those components instead of manually recreating equivalent UI.

Preserve the kit's conventions.

Extend components only when required for OUTSIX branding.

Do not install another UI library just because a component looksconvenient.

Avoid dependency duplication.

The UI should feel custom even though it is built on a componentfoundation.

33. TECHNICAL STACK

Preferred:

React
TypeScript
Next.js or the existing project framework
Tailwind CSS if already configured
Antigravity Kit
Framer Motion / Motion
Three.js only where useful
Lucide icons or the existing icon system

Do not replace the project's existing architecture without a reason.

First inspect what already exists.

34. DATA MODEL

Prepare product data with a structure similar to:

type Product = {
  id: string
  slug: string
  name: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: string
  collection?: string
  sizes: string[]
  availableSizes: string[]
  colors?: string[]
  material?: string
  fit?: string
  stock: number
  featured?: boolean
  badge?: string
}

Use realistic OUTSIX demo products.

Example names:

OUTSIDE FLAME TEE
VOID SKULL TEE
SHARK MARK TEE
NO SIGNAL TEE
OUTSIDE FORM TEE
BLACKOUT GRAPHIC TEE

Do not copy real competitor product names.

35. STATE MANAGEMENT

The shopping experience needs real state.

At minimum:

cart
wishlist
selected sizes
quantities
search
filters
sort
recently viewed
checkout form

For a prototype:

local state + localStorage is acceptable

For production:

use proper backend persistence

authenticated account state

inventory source of truth

secure checkout/payment integration

Cart must persist after refresh.

Wishlist must persist after refresh.

36. MOCK DATA REQUIREMENT

Do not build the site with only 2--3 products.

Create at least:

12–20 products
3–5 categories
2–4 collections

Each product should have:

2--4 images where possible

realistic price

sizes

stock

category

description

This makes the UI feel like a real store.

37. UX STATES

Every major interaction needs states.

Buttons

default
hover
active
loading
success
disabled

Product

available
low stock
sold out

Search

idle
typing
results
no results

Cart

empty
has items
updating
checkout

Checkout

idle
validation error
processing
success
failure

38. EMPTY STATES

Never leave blank white/black screens.

Empty cart

YOUR BAG IS EMPTY.

NOTHING HERE YET.

[ SHOP THE DROP ]

Empty wishlist

NOTHING SAVED.

[ EXPLORE OUTSIX ]

Search no results

NOTHING FOUND.

TRY:
TEES
GRAPHIC
DROP 01
HOODIES

39. ERROR HANDLING

Errors must feel native to the brand.

Avoid generic:

Something went wrong!!!

Use:

THAT DIDN'T WORK.

TRY AGAIN.

For forms:

ENTER A VALID PHONE NUMBER.

Keep errors clear, not overly branded.

40. ECOMMERCE TRUST

Even though the visual language is experimental, shopping must feeltrustworthy.

Include:

secure checkout indicator

shipping information

return policy

size guide

contact/support

order tracking architecture

clear pricing

stock status

Do not hide important information behind excessive animation.

41. SEO

Implement:

proper page titles

meta descriptions

Open Graph metadata

product structured data where backend allows

clean URLs

semantic headings

descriptive image alt text

sitemap-ready architecture

Product pages should be indexable.

42. PWA / MOBILE FEEL

The site should feel excellent when opened from a phone.

Consider:

viewport-safe areas

touch gestures

mobile sticky actions

fast transitions

installable PWA architecture if appropriate

43. DESKTOP CURSOR

Optional custom cursor.

Possible states:

VIEW
SHOP
DRAG
ADD

Example:

When hovering product image:

VIEW

When hovering CTA:

cursor responds subtly.

Disable or simplify on touch devices.

Do not create a giant annoying cursor.

44. PAGE TRANSITIONS

Use subtle transitions between pages.

Preferred:

black screen wipe

image transition

fade/slide

shared product image transition where feasible

Avoid:

long loading animations

unnecessary 3D page flips

slow transitions

Target perceived transition duration:

200–500ms

45. HOME PAGE SECTION ORDER

Recommended:

1. Hero
2. Announcement / Drop ticker
3. New Drop
4. Featured Product / Editorial
5. Shop by Category
6. Collection Campaign
7. Best Sellers
8. Brand Statement
9. Instagram / Social proof
10. Newsletter
11. Footer

Do not make every section a card grid.

46. ANNOUNCEMENT TICKER

Use a horizontally moving ticker.

Example:

NEW DROP 01   •   FREE SHIPPING ABOVE ₹999   •   OUTSIDE THE ORDINARY   •

Animation:

continuous

slow

seamless loop

Pause on hover if appropriate.

47. SHOP BY CATEGORY

Use oversized text/image combinations.

Example:

TEES
HOODIES
BOTTOMS
ACCESSORIES

Hover:

image reveal

text shift

subtle cursor interaction

Mobile:

stacked visual blocks

48. SOCIAL / INSTAGRAM SECTION

Build a visual social grid.

Do not fake social proof such as fake reviews.

If actual social media integration isn't available, use a clearlylabeled editorial/social section with demo imagery.

49. NEWSLETTER

Keep it minimal.

STAY OUTSIDE.

DROP ALERTS.
NO SPAM.

[ EMAIL ADDRESS                  ]
[ JOIN ]

Do not ask for unnecessary personal information.

50. MICROINTERACTION DETAILS

Use tiny details to create polish:

heart morphs/fills on wishlist

bag count increments

button icon slides

product image crossfades

filter drawer slides

search expands

menu typography staggers

quantity changes animate

checkout sections reveal

toast notifications

subtle hover underline

These details should make the website feel expensive.

51. DO NOT USE

This is extremely important.

Avoid the following AI-slop patterns:

purple/blue gradient hero

glassmorphism everywhere

excessive rounded cards

huge glowing buttons

random floating blobs

generic "AI startup" layout

excessive emojis

rainbow gradients

generic stock photos

random 3D shapes

excessive shadows

excessive border-radius

every section inside a card

fake testimonials

fake review numbers

fake social proof

unnecessary badges

too many animations

excessive neon

"Elevate your style" copy

generic SaaS dashboard aesthetic

OUTSIX is fashion, not SaaS.

52. BORDER RADIUS

Use restrained radius.

Suggested:

Buttons: 6–10px
Inputs: 6–10px
Cards: 0–12px depending on context
Modals: 10–16px
Images: often 0px or small radius

Do not make every object a pill.

53. SPACING

Use a consistent spacing system.

Prefer:

4
8
12
16
24
32
48
64
80
96
128

Large editorial sections should have generous vertical rhythm.

54. PRODUCT GRID PHILOSOPHY

The product grid should breathe.

Don't cram products together.

Product image should be the hero.

Metadata should remain visually quiet.

Example:

[ IMAGE ]

OUTSIDE FLAME TEE
₹599

not:

[ IMAGE ]
NEW
BEST SELLER
TRENDING
HOT
ONLY 2 LEFT
...

55. MOBILE STICKY PURCHASE BAR

On product page mobile:

₹599                 ADD TO BAG

Sticky at bottom after scrolling beyond product purchase area.

Include selected size state.

If no size selected:

SELECT SIZE

56. QUICK ADD

Desktop product cards should support quick add.

Interaction:

QUICK ADD
↓
S M L XL
↓
ADDED ✓

Keep the card layout stable.

57. FILTER SHEET

Mobile filter:

FILTER

CATEGORY
□ TEES
□ HOODIES
□ BOTTOMS

SIZE
S M L XL

PRICE
₹0 — ₹3000

[ APPLY FILTERS ]

Use actual accessible controls rather than visual-only boxes.

58. PRODUCT IMAGE ZOOM

Product gallery should support:

click to enlarge

pinch on mobile where possible

close

next/previous

image count

Fullscreen viewer:

1 / 4

Keep controls minimal.

59. LOADING SYSTEM

Create branded skeletons.

Avoid spinner-only interfaces.

Use:

image skeleton

text skeleton

button loading state

For page loading:

subtle fade rather than giant spinner.

60. FINAL QUALITY BAR

The website should pass this test:

Visual

Does it look like a real streetwear brand?

UX

Can a new visitor buy a product without confusion?

Mobile

Does it feel designed for a phone, not squeezed onto one?

Motion

Does animation improve the experience?

Performance

Does it still feel fast?

Brand

Does it feel like OUTSIX rather than a generic template?

If any answer is "no", fix it before considering the build complete.

61. IMPLEMENTATION PHASES

Build in this order.

PHASE 01 --- FOUNDATION

inspect existing project

inspect Antigravity Kit

configure theme tokens

configure typography

create layout

create header

create footer

create responsive primitives

create reusable UI components

PHASE 02 --- HOMEPAGE

hero

ticker

new drop

editorial sections

category navigation

collection sections

newsletter

footer

PHASE 03 --- SHOP

product data

product grid

category pages

filters

sorting

search

pagination/infinite loading

PHASE 04 --- PRODUCT

product gallery

product information

size selection

wishlist

add to cart

buy now

related products

PHASE 05 --- CART + WISHLIST

cart drawer

cart page

wishlist page

quantity management

persistence

PHASE 06 --- CHECKOUT

customer information

address

shipping

payment architecture

order summary

validation

success page

PHASE 07 --- ACCOUNT

account dashboard

orders

order detail

wishlist

profile

addresses

PHASE 08 --- POLISH

page transitions

microinteractions

image transitions

grain

responsive fixes

accessibility

SEO

performance

PHASE 09 --- QA

Test every route and state.

62. QA CHECKLIST

Navigation

Logo returns home

All nav links work

Mobile menu works

Search works

Wishlist opens

Cart opens

Header remains usable while scrolling

Products

Product cards work

Product images load

Hover states work

Product page works

Size selection works

Sold-out states work

Wishlist works

Add to bag works

Cart

Add product

Remove product

Change quantity

Cart persists after refresh

Subtotal updates

Checkout button works

Checkout

Validation works

Address form works

Order summary works

Payment state works

Success page works

Responsive

360px

390px

412px

768px

1024px

1280px

1440px

Large desktop

Accessibility

Keyboard navigation

Focus states

Labels

Alt text

Reduced motion

Contrast

Performance

Images optimized

Lazy loading

No unnecessary dependencies

No console errors

Smooth scrolling

Smooth animations

63. ANTIGRAVITY MASTER EXECUTION PROMPT

Use this document as the specification and execute the project, notmerely mock the homepage.

Before writing code:

Inspect the existing repository.

Inspect the installed Antigravity Kit.

Understand its component APIs.

Preserve the existing setup unless there is a clear reason to changeit.

Create a reusable design system.

Build the application in phases.

Do not stop after creating a beautiful landing page.

The final application must include:

Homepage
Shop
Categories
Collections
Search
Product pages
Wishlist
Cart
Checkout
Order success
Account
Orders
About
Support pages

Every major action must work in the browser.

Use realistic local product data initially.

Do not pretend a payment was processed unless this is explicitly amock/demo mode.

64. DESIGN DIRECTION FOR THE AI BUILDER

Think:

streetwear
+
editorial fashion
+
underground culture
+
premium ecommerce
+
digital experimentation

Do NOT think:

SaaS
+
startup landing page
+
generic ecommerce template

The interface should have moments of visual surprise, but the shoppingflow should remain obvious.

The product always remains the hero.

65. DEFINITION OF DONE

The project is complete only when:

Homepage feels like a real OUTSIX campaign

Shop experience is complete

Product pages are polished

Cart is functional

Wishlist is functional

Search is functional

Filters work

Checkout workflow works

Order success works

Account architecture exists

Responsive layouts are intentional

Antigravity Kit components are actually reused

No unnecessary UI library duplication exists

Motion is polished but restrained

No obvious AI-slop design patterns remain

No fake social proof is presented as real

No broken links

No console errors

No major layout shifts

Keyboard navigation works

Reduced-motion support exists

Product images are optimized

The site feels fast on mobile

The brand identity is consistent across every route

66. FINAL CREATIVE PRINCIPLE

OUTSIX should feel like a clothing brand that happens to have anincredible website --- not a website pretending to be a clothingbrand.

Keep the UI dark.

Keep the typography bold.

Keep the product photography dominant.

Keep the interaction details sharp.

Keep the shopping flow effortless.

Keep the weirdness intentional.

Keep the brand identity stronger than the technology.

OUTSIDE THE ORDINARY.