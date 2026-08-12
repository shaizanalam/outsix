'use client';

import { useEffect } from 'react';
import { useProductStore } from '@/store/products';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useProductStore.getState().loadProducts();
  }, []);

  return <>{children}</>;
}
