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
    description: 'Dark, technical, minimalist street silhouettes.',
    image: '/images/collections/drop-02.jpg',
    season: 'SS26',
  },
];

// ZERO MOCK PRODUCTS — ONLY LIVE BACKEND DATA IS LOADED
export const PRODUCTS: Product[] = [];

import { useProductStore } from '@/store/products';

export const CATEGORIES: ProductCategory[] = ['TEES', 'HOODIES', 'BOTTOMS', 'ACCESSORIES', 'HEADWEAR'];

export function getLiveProducts(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const stateProducts = useProductStore.getState().products;
      if (Array.isArray(stateProducts)) {
        return stateProducts;
      }
    } catch {
      // fallback
    }
  }
  return [];
}

export function getProductBySlug(slug: string): Product | undefined {
  return getLiveProducts().find((p) => p.slug === slug || p.id === slug);
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
