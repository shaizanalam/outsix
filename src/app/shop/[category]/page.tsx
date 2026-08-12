import { notFound } from 'next/navigation';
import { getProductsByCategory, CATEGORIES } from '@/data/products';
import type { ProductCategory } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import type { Metadata } from 'next';

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = category.toUpperCase() as ProductCategory;
  return {
    title: `${cat} — OUTSIX`,
    description: `Shop OUTSIX ${cat}. Graphic tees, hoodies, bottoms and more.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = category.toUpperCase() as ProductCategory;

  if (!CATEGORIES.includes(cat)) notFound();

  const products = getProductsByCategory(cat);

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          padding: 'clamp(32px, 5vh, 64px) 0 24px',
          backgroundColor: 'var(--surface)',
        }}
      >
        <div className="container-outsix">
          <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.16em', marginBottom: '8px' }}>
            SHOP / {products.length} ITEMS
          </p>
          <h1 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', color: 'var(--text-primary)', lineHeight: 1 }}>
            {cat}
          </h1>
        </div>
      </div>

      <div className="container-outsix" style={{ paddingTop: '48px', paddingBottom: '96px' }}>
        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
