import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PRODUCTS, type Product, type ProductSize } from '@/data/products';
import {
  updateProductStockInSupabase,
  updateProductPriceInSupabase,
  createProductInSupabase,
  deleteProductFromSupabase,
} from '@/lib/supabase/products';
import { updateOrderStatusInSupabase } from '@/lib/supabase/orders';

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

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'ORD-8921',
    customerName: 'Aarav Sharma',
    email: 'aarav@gmail.com',
    phone: '+91 98765 43210',
    address: 'B-402, Cyber Heights, HSR Layout',
    city: 'Bengaluru',
    pincode: '560102',
    items: [
      {
        productId: 'outside-flame-tee',
        name: 'OUTSIDE FLAME TEE',
        size: 'L',
        quantity: 1,
        price: 749,
        image: '/bgrem1.png',
      },
    ],
    totalAmount: 749,
    status: 'Shipped',
    paymentMethod: 'UPI / GPay',
    createdAt: '2026-08-11 14:30',
  },
  {
    id: 'ORD-8922',
    customerName: 'Rohan Mehta',
    email: 'rohan.m@yahoo.com',
    phone: '+91 91234 56789',
    address: 'Flat 12, Sunrise Apartments, Bandra West',
    city: 'Mumbai',
    pincode: '400050',
    items: [
      {
        productId: 'void-skull-tee',
        name: 'VOID SKULL TEE',
        size: 'M',
        quantity: 2,
        price: 749,
        image: '/bgrem2.png',
      },
    ],
    totalAmount: 1498,
    status: 'Processing',
    paymentMethod: 'Credit Card',
    createdAt: '2026-08-12 09:15',
  },
  {
    id: 'ORD-8923',
    customerName: 'Ananya Verma',
    email: 'ananya.v@outlook.com',
    phone: '+91 99887 76655',
    address: '77, Vasant Vihar, Block C',
    city: 'New Delhi',
    pincode: '110057',
    items: [
      {
        productId: 'shark-mark-tee',
        name: 'SHARK MARK TEE',
        size: 'S',
        quantity: 1,
        price: 749,
        image: '/ed2.jpeg',
      },
    ],
    totalAmount: 749,
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    createdAt: '2026-08-10 11:20',
  },
];

type AdminState = {
  products: Product[];
  orders: AdminOrder[];
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
      products: PRODUCTS,
      orders: INITIAL_ORDERS,

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
