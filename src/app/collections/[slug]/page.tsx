import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductsByCollection, COLLECTIONS } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const col = COLLECTIONS.find((c) => c.slug === slug);
  if (!col) return { title: 'Not Found' };
  return { title: `${col.name} — OUTSIX`, description: col.description };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const col = COLLECTIONS.find((c) => c.slug === slug);
  if (!col) notFound();

  const products = getProductsByCollection(slug);

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      {/* HERO */}
      <div
        style={{
          minHeight: '40vh',
          backgroundColor: '#060606',
          display: 'flex',
          alignItems: 'flex-end',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
        }}
      >
        <div className="container-outsix" style={{ paddingBottom: 'clamp(32px, 5vh, 64px)' }}>
          <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.16em', marginBottom: '12px' }}>
            {col.season}
          </p>
          <h1 className="font-display" style={{ fontSize: 'clamp(40px, 8vw, 96px)', color: 'var(--text-primary)', lineHeight: 0.92 }}>
            {col.name}
          </h1>
          <p className="font-editorial" style={{ fontSize: '18px', color: 'var(--text-secondary)', letterSpacing: '0.04em', marginTop: '12px' }}>
            {col.subtitle}
          </p>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="container-outsix" style={{ paddingTop: '48px', paddingBottom: '96px' }}>
        <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '32px' }}>
          {products.length} PRODUCTS
        </p>
        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
