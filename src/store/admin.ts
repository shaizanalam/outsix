import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductSize } from '@/data/products';
import {
  updateProductStockInSupabase,
  updateProductPriceInSupabase,
  createProductInSupabase,
  deleteProductFromSupabase,
} from '@/lib/supabase/products';
import { updateOrderStatusInSupabase, fetchOrdersFromSupabase } from '@/lib/supabase/orders';

export type AdminOrder = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  items: {
    productId: string;
    name: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  totalAmount: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  createdAt: string;
};

type AdminState = {
  products: Product[];
  orders: AdminOrder[];
  loadOrders: () => Promise<void>;
  updateStock: (productId: string, newStock: number) => void;
  updatePrice: (productId: string, newPrice: number, compareAtPrice?: number) => void;
  toggleSizeAvailability: (productId: string, size: ProductSize) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: AdminOrder['status']) => void;
  restockAllLowStock: (minStock?: number) => void;
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      products: [],
      orders: [],

      loadOrders: async () => {
        try {
          const liveOrders = await fetchOrdersFromSupabase();
          if (liveOrders) {
            set({ orders: liveOrders });
          }
        } catch (e) {
          // ignore
        }
      },

      updateStock: (productId, newStock) => {
        updateProductStockInSupabase(productId, newStock);
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId
              ? {
                  ...p,
                  stock: Math.max(0, newStock),
                  availableSizes: newStock === 0 ? [] : p.availableSizes,
                }
              : p
          ),
        }));
      },

      updatePrice: (productId, newPrice, compareAtPrice) => {
        updateProductPriceInSupabase(productId, newPrice);
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId
              ? { ...p, price: newPrice, compareAtPrice: compareAtPrice || p.compareAtPrice }
              : p
          ),
        }));
      },

      toggleSizeAvailability: (productId, size) =>
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id !== productId) return p;
            const exists = p.availableSizes.includes(size);
            const availableSizes = exists
              ? p.availableSizes.filter((s) => s !== size)
              : [...p.availableSizes, size];
            return {
              ...p,
              availableSizes,
            };
          }),
        })),

      addProduct: (newProduct) => {
        createProductInSupabase(newProduct);
        set((state) => {
          const id = newProduct.slug || `prod-${Date.now()}`;
          const productWithId: Product = { ...newProduct, id };
          return { products: [productWithId, ...state.products] };
        });
      },

      deleteProduct: (productId) => {
        deleteProductFromSupabase(productId);
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        }));
      },

      updateOrderStatus: (orderId, status) => {
        updateOrderStatusInSupabase(orderId, status);
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        }));
      },

      restockAllLowStock: (minStock = 25) =>
        set((state) => ({
          products: state.products.map((p) => {
            if (p.stock <= 10) {
              updateProductStockInSupabase(p.id, minStock);
              return { ...p, stock: minStock, availableSizes: p.sizes };
            }
            return p;
          }),
        })),
    }),
    {
      name: 'outsix-admin-storage',
    }
  )
);
