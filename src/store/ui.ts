import { create } from 'zustand';
import type { Product } from '@/data/products';

type Toast = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};

type RecentlyViewed = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
};

type UIStore = {
  // Overlays
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;

  // Search
  searchQuery: string;
  recentSearches: string[];

  // Recently viewed
  recentlyViewed: RecentlyViewed[];

  // Toasts
  toasts: Toast[];

  // Quick add
  quickAddProductId: string | null;

  // Actions
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  setSearchQuery: (q: string) => void;
  addRecentSearch: (q: string) => void;
  clearRecentSearches: () => void;

  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  addToRecentlyViewed: (product: Product) => void;

  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  setQuickAddProductId: (id: string | null) => void;
};

export const useUIStore = create<UIStore>()((set, get) => ({
  isSearchOpen: false,
  isMobileMenuOpen: false,
  searchQuery: '',
  recentSearches: [],
  recentlyViewed: [],
  toasts: [],
  quickAddProductId: null,

  openSearch: () => set({ isSearchOpen: true, isMobileMenuOpen: false }),
  closeSearch: () => set({ isSearchOpen: false, searchQuery: '' }),
  toggleSearch: () =>
    set((s) => ({ isSearchOpen: !s.isSearchOpen, searchQuery: '' })),
  setSearchQuery: (q) => set({ searchQuery: q }),
  addRecentSearch: (q) => {
    if (!q.trim()) return;
    set((s) => ({
      recentSearches: [q, ...s.recentSearches.filter((r) => r !== q)].slice(0, 6),
    }));
  },
  clearRecentSearches: () => set({ recentSearches: [] }),

  openMobileMenu: () => set({ isMobileMenuOpen: true, isSearchOpen: false }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),

  addToRecentlyViewed: (product) => {
    set((s) => ({
      recentlyViewed: [
        { productId: product.id, slug: product.slug, name: product.name, price: product.price, image: product.images[0] },
        ...s.recentlyViewed.filter((r) => r.productId !== product.id),
      ].slice(0, 8),
    }));
  },

  addToast: (message, type = 'success') => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => get().removeToast(id), 3500);
  },
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  setQuickAddProductId: (id) => set({ quickAddProductId: id }),
}));
