import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PRODUCTS, type Product, type ProductSize } from '@/data/products';
import {
  fetchProductsFromSupabase,
  updateProductStockInSupabase,
  updateProductPriceInSupabase,
  createProductInSupabase,
  deleteProductFromSupabase,
} from '@/lib/supabase/products';

import { isSupabaseConfigured } from '@/lib/supabase/client';

type ProductState = {
  products: Product[];
  isLoaded: boolean;
  loadProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateStock: (productId: string, stock: number) => Promise<void>;
  updatePrice: (productId: string, price: number) => Promise<void>;
  toggleSizeAvailability: (productId: string, size: ProductSize) => void;
  deleteProduct: (productId: string) => Promise<void>;
  restockAllLowStock: (minStock?: number) => void;
};

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: isSupabaseConfigured ? [] : PRODUCTS,
      isLoaded: false,

      loadProducts: async () => {
        try {
          const liveProducts = await fetchProductsFromSupabase();
          if (liveProducts !== null) {
            set({ products: liveProducts, isLoaded: true });
          }
        } catch (err) {
          set({ isLoaded: true });
        }
      },

      addProduct: async (newProd) => {
        const id = newProd.slug || `prod-${Date.now()}`;
        const productWithId: Product = {
          ...newProd,
          id,
          availableSizes: newProd.availableSizes || newProd.sizes || ['S', 'M', 'L', 'XL'],
          images: newProd.images && newProd.images.length > 0 ? newProd.images : ['/bgrem1.png'],
        };

        // 1. Update local state immediately for 0ms UI delay
        set((state) => ({
          products: [productWithId, ...state.products.filter((p) => p.id !== id && p.slug !== id)],
        }));

        // 2. Persist to Supabase DB asynchronously
        await createProductInSupabase(newProd);

        // 3. Sync latest DB snapshot
        get().loadProducts();
      },

      updateStock: async (productId, stock) => {
        const newStock = Math.max(0, stock);
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId || p.slug === productId
              ? {
                  ...p,
                  stock: newStock,
                  availableSizes: newStock === 0 ? [] : p.sizes,
                }
              : p
          ),
        }));
        await updateProductStockInSupabase(productId, newStock);
      },

      updatePrice: async (productId, price) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === productId || p.slug === productId ? { ...p, price } : p)),
        }));
        await updateProductPriceInSupabase(productId, price);
      },

      toggleSizeAvailability: (productId, size) => {
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id !== productId && p.slug !== productId) return p;
            const exists = p.availableSizes.includes(size);
            const availableSizes = exists
              ? p.availableSizes.filter((s) => s !== size)
              : [...p.availableSizes, size];
            return { ...p, availableSizes };
          }),
        }));
      },

      deleteProduct: async (productId) => {
        // 1. Delete immediately from local UI state
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId && p.slug !== productId),
        }));

        // 2. Delete from Supabase PostgreSQL DB
        await deleteProductFromSupabase(productId);

        // 3. Sync latest DB snapshot
        get().loadProducts();
      },

      restockAllLowStock: (minStock = 25) => {
        const currentProducts = get().products;
        currentProducts.forEach((p) => {
          if (p.stock <= 10) {
            updateProductStockInSupabase(p.id, minStock);
          }
        });
        set((state) => ({
          products: state.products.map((p) =>
            p.stock <= 10 ? { ...p, stock: minStock, availableSizes: p.sizes } : p
          ),
        }));
      },
    }),
    {
      name: 'outsix-products-sync-store',
    }
  )
);
