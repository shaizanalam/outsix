import { ProductCard } from './ProductCard';
import type { Product } from '@/data/products';

type Props = {
  products: Product[];
  columns?: 2 | 3 | 4;
  priorityCount?: number;
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

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '32px 24px',
      }}
      role="list"
      aria-label="Products"
    >
      {products.map((product, i) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} priority={i < priorityCount} />
        </div>
      ))}
      <style>{`
        @media (max-width: 1024px) {
          [role="list"][aria-label="Products"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          [role="list"][aria-label="Products"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
