'use client';

import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import type { Product } from '@/data/products';

type Props = {
  products: Product[];
  columns?: 2 | 3 | 4;
  priorityCount?: number;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function ProductGrid({ products, columns = 4, priorityCount = 4 }: Props) {
  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 24px',
        }}
      >
        <p className="font-display" style={{ fontSize: '24px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          NOTHING FOUND.
        </p>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>
          Try adjusting your filters.
        </p>
      </div>
    );
  }

  const gridCols = columns === 4 
    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    : columns === 3 
    ? 'grid-cols-2 md:grid-cols-3'
    : 'grid-cols-2';

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className={`grid ${gridCols} gap-x-[12px] md:gap-x-[24px] gap-y-[20px] md:gap-y-[32px]`}
      role="list"
      aria-label="Products"
    >
      {products.map((product, i) => (
        <motion.div key={product.id} variants={item} role="listitem">
          <ProductCard product={product} priority={i < priorityCount} />
        </motion.div>
      ))}
    </motion.div>
  );
}
