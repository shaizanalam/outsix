export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  details: string;
  material: string;
  fit: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: ProductCategory;
  collection?: string;
  sizes: ProductSize[];
  availableSizes: ProductSize[];
  stock: number;
  featured?: boolean;
  badge?: string;
  tags?: string[];
  color?: string;
};

export type ProductCategory = 'TEES' | 'HOODIES' | 'BOTTOMS' | 'ACCESSORIES' | 'HEADWEAR';

export type Collection = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  season: string;
};

export const COLLECTIONS: Collection[] = [
  {
    id: 'drop-01',
    slug: 'drop-01',
    name: 'DROP 01',
    subtitle: 'OUTSIDE THE ORDINARY',
    description: 'The first OUTSIX drop. Built for those who refuse to blend in.',
    image: '/images/collections/drop-01.jpg',
    season: 'SS26',
  },
  {
    id: 'drop-02',
    slug: 'drop-02',
    name: 'DROP 02',
    subtitle: 'VOID SERIES',
    description: 'Deep in the void. No light, no rules, just form.',
    image: '/images/collections/drop-02.jpg',
    season: 'SS26',
  },
  {
    id: 'archive',
    slug: 'archive',
    name: 'ARCHIVE',
    subtitle: 'FROM THE BEGINNING',
    description: 'Where it all started.',
    image: '/images/collections/archive.jpg',
    season: '2025',
  },
];

export const PRODUCTS: Product[] = [
  // ==================== TEES ====================
  {
    id: 'p001',
    slug: 'outside-flame-tee',
    name: 'OUTSIDE FLAME TEE',
    description: 'A statement piece for those who burn brighter. Oversized graphic tee with the OUTSIX flame motif — bold, uncompromising, yours.',
    details: 'Oversized fit. Drop shoulders. Ribbed crew neck. Double-stitched hem.',
    material: '100% Heavyweight Cotton — 280 GSM',
    fit: 'Oversized. Model is 6\'1" wearing size L.',
    price: 699,
    compareAtPrice: 999,
    images: ['/ed2.jpeg', '/eg1.jpeg'],
    category: 'TEES',
    collection: 'drop-01',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 48,
    featured: true,
    badge: 'DROP 01',
    tags: ['graphic', 'oversized', 'flame'],
    color: 'Black',
  },
  {
    id: 'p002',
    slug: 'void-skull-tee',
    name: 'VOID SKULL TEE',
    description: 'From the void it came. High-contrast skull graphic on dead-black cotton. No compromises.',
    details: 'Oversized fit. Drop shoulders. Raw hem. Screen-printed graphic.',
    material: '100% Combed Cotton — 260 GSM',
    fit: 'Oversized. Model is 5\'11" wearing size M.',
    price: 649,
    images: ['/ed2.jpeg', '/eg1.jpeg'],
    category: 'TEES',
    collection: 'drop-02',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['M', 'L', 'XL'],
    stock: 22,
    badge: 'LOW STOCK',
    tags: ['graphic', 'skull', 'void'],
    color: 'Black',
  },
  {
    id: 'p003',
    slug: 'shark-mark-tee',
    name: 'SHARK MARK TEE',
    description: 'The OUTSIX shark — predator energy, minimal form. Our signature mark printed large on heavy cotton.',
    details: 'Regular-oversized fit. Reinforced shoulder seams. Back graphic.',
    material: '100% Heavyweight Cotton — 300 GSM',
    fit: 'Regular oversized. Relaxed through body.',
    price: 749,
    compareAtPrice: 899,
    images: ['/eg1.jpeg', '/ed2.jpeg'],
    category: 'TEES',
    collection: 'drop-01',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    stock: 35,
    featured: true,
    badge: 'BESTSELLER',
    tags: ['shark', 'graphic', 'signature'],
    color: 'Black',
  },
  {
    id: 'p004',
    slug: 'no-signal-tee',
    name: 'NO SIGNAL TEE',
    description: 'Disconnect from noise. Static-inspired graphic, oversized cut, raw attitude.',
    details: 'Boxy fit. Double needle stitching. Soft-hand print.',
    material: '100% Cotton — 240 GSM',
    fit: 'Boxy. Sized up recommended.',
    price: 599,
    images: ['/ed2.jpeg', '/eg1.jpeg'],
    category: 'TEES',
    collection: 'archive',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableSizes: ['XS', 'S', 'M', 'L'],
    stock: 18,
    tags: ['static', 'graphic', 'minimal'],
    color: 'Black',
  },
  {
    id: 'p005',
    slug: 'outside-form-tee',
    name: 'OUTSIDE FORM TEE',
    description: 'Pure form. The OUTSIX wordmark deconstructed across the chest. Typography as identity.',
    details: 'Relaxed fit. Crew neck. Clean finish.',
    material: '100% Supima Cotton — 220 GSM',
    fit: 'Relaxed. True to size.',
    price: 549,
    images: ['/eg1.jpeg', '/ed2.jpeg'],
    category: 'TEES',
    collection: 'drop-01',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 60,
    tags: ['wordmark', 'typography', 'minimal'],
    color: 'Black',
  },
  {
    id: 'p006',
    slug: 'blackout-graphic-tee',
    name: 'BLACKOUT GRAPHIC TEE',
    description: 'Maximum graphic, minimum noise. An all-over OUTSIX print that hits different.',
    details: 'Oversized. All-over print. Heavy cotton base.',
    material: '100% Heavyweight Cotton — 280 GSM',
    fit: 'Oversized. Size down for a closer fit.',
    price: 799,
    compareAtPrice: 1099,
    images: ['/ed2.jpeg', '/eg1.jpeg'],
    category: 'TEES',
    collection: 'drop-02',
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['M', 'L'],
    stock: 8,
    badge: 'LOW STOCK',
    tags: ['all-over', 'graphic', 'premium'],
    color: 'Black',
  },
  // ==================== HOODIES ====================
  {
    id: 'p007',
    slug: 'outside-heavyweight-hoodie',
    name: 'OUTSIDE HEAVYWEIGHT HOODIE',
    description: 'Built for the outside. 500 GSM French terry. The OUTSIX logo embroidered at chest — heavy, structured, built to last.',
    details: 'Relaxed fit. Double-lined hood. Front kangaroo pocket. Ribbed cuffs and hem.',
    material: '80% Cotton, 20% Polyester — 500 GSM French Terry',
    fit: 'Relaxed. True to size or size up.',
    price: 1599,
    compareAtPrice: 1899,
    images: ['/eg1.jpeg', '/ed2.jpeg'],
    category: 'HOODIES',
    collection: 'drop-01',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 42,
    featured: true,
    badge: 'DROP 01',
    tags: ['heavyweight', 'embroidered', 'premium'],
    color: 'Black',
  },
  {
    id: 'p008',
    slug: 'void-zip-hoodie',
    name: 'VOID ZIP HOODIE',
    description: 'Zip-through darkness. OUTSIX void graphic at back, clean at front — two-way identity.',
    details: 'Full-zip. Relaxed fit. Metal zipper. Side pockets.',
    material: '70% Cotton, 30% Polyester — 420 GSM',
    fit: 'Relaxed. Model is 6\'0" wearing size L.',
    price: 1799,
    images: ['/ed2.jpeg', '/eg1.jpeg'],
    category: 'HOODIES',
    collection: 'drop-02',
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['M', 'L', 'XL'],
    stock: 15,
    tags: ['zip', 'void', 'premium'],
    color: 'Black',
  },
  {
    id: 'p009',
    slug: 'shark-arch-hoodie',
    name: 'SHARK ARCH HOODIE',
    description: 'The shark crests above. Arch graphic at back, signature mark at chest. Mid-weight for year-round wear.',
    details: 'Pullover. Relaxed fit. Oversized hood. Front pocket.',
    material: '80% Cotton, 20% Polyester — 380 GSM',
    fit: 'Relaxed. Size up for a baggier look.',
    price: 1499,
    compareAtPrice: 1799,
    images: ['/eg1.jpeg', '/ed2.jpeg'],
    category: 'HOODIES',
    collection: 'drop-01',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['S', 'L', 'XL'],
    stock: 20,
    badge: 'SALE',
    tags: ['shark', 'arch', 'graphic'],
    color: 'Black',
  },
  // ==================== BOTTOMS ====================
  {
    id: 'p010',
    slug: 'outside-cargo-pants',
    name: 'OUTSIDE CARGO PANTS',
    description: 'Function meets form. Wide-leg cargo silhouette, OUTSIX patch at thigh. Built for movement.',
    details: 'Wide leg. Mid-rise. 6 pockets. Adjustable ankle cuffs.',
    material: '100% Cotton Twill — 280 GSM',
    fit: 'Wide leg. True to size at waist.',
    price: 1299,
    images: ['/ed2.jpeg', '/eg1.jpeg'],
    category: 'BOTTOMS',
    collection: 'drop-01',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 30,
    featured: true,
    tags: ['cargo', 'wide-leg', 'utility'],
    color: 'Black',
  },
  {
    id: 'p011',
    slug: 'void-track-pants',
    name: 'VOID TRACK PANTS',
    description: 'Void series. Tapered track silhouette with side stripe — OUTSIX written down the leg.',
    details: 'Tapered fit. Elastic waistband. Side zip pockets. OUTSIX stripe.',
    material: '100% Polyester Tech Fabric',
    fit: 'Tapered. Athletic through thigh.',
    price: 999,
    compareAtPrice: 1299,
    images: ['/eg1.jpeg', '/ed2.jpeg'],
    category: 'BOTTOMS',
    collection: 'drop-02',
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['M', 'L', 'XL'],
    stock: 25,
    badge: 'SALE',
    tags: ['track', 'tapered', 'athleisure'],
    color: 'Black',
  },
  {
    id: 'p012',
    slug: 'outside-shorts',
    name: 'OUTSIDE SHORTS',
    description: 'Heavyweight sweat shorts. The OUTSIX mark at left leg. Keep it simple.',
    details: 'Loose fit. Elastic waistband with drawcord. Side pockets.',
    material: '100% Cotton Fleece — 380 GSM',
    fit: 'Loose. True to size.',
    price: 799,
    images: ['/ed2.jpeg', '/eg1.jpeg'],
    category: 'BOTTOMS',
    collection: 'archive',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 55,
    tags: ['shorts', 'casual', 'sweat'],
    color: 'Black',
  },
  // ==================== ACCESSORIES ====================
  {
    id: 'p013',
    slug: 'outsix-tote',
    name: 'OUTSIX TOTE',
    description: 'Heavy canvas tote. The OUTSIX mark printed large. Carry the outside with you.',
    details: 'Heavy canvas. Reinforced straps. Internal pocket. 15L capacity.',
    material: 'Canvas 600D — Natural/Black',
    fit: 'One size.',
    price: 499,
    images: ['/eg1.jpeg', '/ed2.jpeg'],
    category: 'ACCESSORIES',
    collection: 'drop-01',
    sizes: ['XS'],
    availableSizes: ['XS'],
    stock: 100,
    tags: ['tote', 'canvas', 'carry'],
    color: 'Black/Natural',
  },
  {
    id: 'p014',
    slug: 'void-lanyard',
    name: 'VOID LANYARD',
    description: 'Utility is the aesthetic. OUTSIX woven lanyard with metal clip.',
    details: 'Woven polyester. Safety release. Metal clip. 45cm length.',
    material: 'Woven Polyester + Metal Hardware',
    fit: 'One size.',
    price: 249,
    images: ['/ed2.jpeg', '/eg1.jpeg'],
    category: 'ACCESSORIES',
    collection: 'drop-02',
    sizes: ['XS'],
    availableSizes: ['XS'],
    stock: 200,
    tags: ['lanyard', 'utility', 'accessory'],
    color: 'Black',
  },
  {
    id: 'p015',
    slug: 'outsix-socks',
    name: 'OUTSIX SOCKS — 2 PACK',
    description: 'The detail that closes the fit. Ribbed crew socks with OUTSIX mark at cuff.',
    details: 'Crew length. Ribbed. Elasticated cuff. 2-pair pack.',
    material: '80% Cotton, 15% Polyester, 5% Elastane',
    fit: 'One size fits most.',
    price: 349,
    images: ['/eg1.jpeg', '/ed2.jpeg'],
    category: 'ACCESSORIES',
    collection: 'archive',
    sizes: ['XS'],
    availableSizes: ['XS'],
    stock: 150,
    tags: ['socks', 'basics', 'essentials'],
    color: 'Black',
  },
  // ==================== HEADWEAR ====================
  {
    id: 'p016',
    slug: 'outside-snapback',
    name: 'OUTSIDE SNAPBACK',
    description: 'Structured snapback. OUTSIX embroidered at front. 6-panel construction.',
    details: 'Structured 6-panel. Flat brim. Snapback closure. OUTSIX embroidery.',
    material: 'Wool/Acrylic Blend',
    fit: 'Adjustable. One size.',
    price: 799,
    compareAtPrice: 999,
    images: ['/ed2.jpeg', '/eg1.jpeg'],
    category: 'HEADWEAR',
    collection: 'drop-01',
    sizes: ['XS'],
    availableSizes: ['XS'],
    stock: 45,
    featured: true,
    badge: 'DROP 01',
    tags: ['snapback', 'cap', 'headwear'],
    color: 'Black',
  },
  {
    id: 'p017',
    slug: 'void-beanie',
    name: 'VOID BEANIE',
    description: 'VOID series. Heavyweight knit beanie with OUTSIX jacquard. Pull it down, stay outside.',
    details: 'Heavyweight knit. Jacquard logo. Cuffed style. One size.',
    material: 'Acrylic Knit',
    fit: 'One size.',
    price: 599,
    images: ['/eg1.jpeg', '/ed2.jpeg'],
    category: 'HEADWEAR',
    collection: 'drop-02',
    sizes: ['XS'],
    availableSizes: ['XS'],
    stock: 80,
    tags: ['beanie', 'knit', 'winter'],
    color: 'Black',
  },
  {
    id: 'p018',
    slug: 'shark-dad-cap',
    name: 'SHARK DAD CAP',
    description: 'Unstructured dad cap. Shark embroidery at front. Washed finish for an aged look.',
    details: 'Unstructured. Low-profile. Brass buckle strap. Washed cotton.',
    material: 'Washed Cotton Twill',
    fit: 'Adjustable. One size.',
    price: 699,
    compareAtPrice: 799,
    images: ['/ed2.jpeg', '/eg1.jpeg'],
    category: 'HEADWEAR',
    collection: 'archive',
    sizes: ['XS'],
    availableSizes: [],
    stock: 0,
    badge: 'SOLD OUT',
    tags: ['cap', 'shark', 'washed'],
    color: 'Black',
  },
];

import { useAdminStore } from '@/store/admin';

export const CATEGORIES: ProductCategory[] = ['TEES', 'HOODIES', 'BOTTOMS', 'ACCESSORIES', 'HEADWEAR'];

export function getLiveProducts(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const stateProducts = useAdminStore.getState().products;
      if (stateProducts && stateProducts.length > 0) {
        return stateProducts;
      }
    } catch (e) {
      // fallback
    }
  }
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getLiveProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return getLiveProducts().filter((p) => p.category === category);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return getLiveProducts().filter((p) => p.collection === collectionSlug);
}

export function getFeaturedProducts(): Product[] {
  return getLiveProducts().filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getLiveProducts().filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection)
  ).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return getLiveProducts().filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.includes(q)) ||
      p.collection?.includes(q)
  );
}

export const POPULAR_SEARCHES = ['TEES', 'HOODIES', 'DROP 01', 'GRAPHIC', 'CARGO', 'SHARK'];
