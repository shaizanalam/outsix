'use client';

import Link from 'next/link';
import { ArrowRight, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlistStore } from '@/store/wishlist';
import { useCartStore } from '@/store/cart';
import { useUIStore } from '@/store/ui';
import { PRODUCTS } from '@/data/products';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const { addToast } = useUIStore();

  const handleMoveToBag = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product || product.availableSizes.length === 0) return;
    addItem(product, product.availableSizes[0]);
    removeItem(productId);
    addToast(`${product.name} — ADDED TO BAG`, 'success');
  };

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      {/* HEADER */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(32px, 5vh, 64px) 0 24px', backgroundColor: 'var(--surface)' }}>
        <div className="container-outsix">
          <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.16em', marginBottom: '8px' }}>
            {items.length} SAVED ITEMS
          </p>
          <h1 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text-primary)', lineHeight: 1 }}>
            WISHLIST
          </h1>
        </div>
      </div>

      <div className="container-outsix" style={{ paddingTop: '48px', paddingBottom: '96px' }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '80px', paddingBottom: '80px' }}>
            <p className="font-display" style={{ fontSize: '28px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              NOTHING SAVED YET.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'Inter', marginBottom: '32px' }}>
              KEEP LOOKING.
            </p>
            <Link
              href="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: 'var(--text-primary)',
                color: 'var(--background)',
                textDecoration: 'none',
                fontSize: '12px',
                letterSpacing: '0.12em',
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 700,
              }}
            >
              SHOP THE DROP <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '32px 24px',
            }}
          >
            <AnimatePresence>
              {items.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.productId);
                const soldOut = !product || product.availableSizes.length === 0;

                return (
                  <motion.article
                    key={item.productId}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* IMAGE */}
                    <Link href={`/product/${item.slug}`} style={{ display: 'block', textDecoration: 'none', marginBottom: '12px' }}>
                      <div
                        style={{
                          aspectRatio: '3/4',
                          backgroundColor: '#0A0A0A',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image || '/ed2.jpeg'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {soldOut && (
                          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(7,7,7,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em' }}>SOLD OUT</span>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* META */}
                    <p className="font-editorial truncate-1" style={{ fontSize: '12px', color: 'var(--text-primary)', letterSpacing: '0.06em', marginBottom: '4px' }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontFamily: 'Inter', marginBottom: '12px' }}>
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>

                    {/* ACTIONS */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleMoveToBag(item.productId)}
                        disabled={soldOut}
                        style={{
                          flex: 1,
                          padding: '10px',
                          backgroundColor: soldOut ? 'var(--surface-elevated)' : 'var(--text-primary)',
                          color: soldOut ? 'var(--text-muted)' : 'var(--background)',
                          border: 'none',
                          fontSize: '10px',
                          letterSpacing: '0.1em',
                          fontFamily: 'Barlow Condensed, sans-serif',
                          fontWeight: 700,
                          cursor: soldOut ? 'not-allowed' : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <ShoppingBag size={12} />
                        {soldOut ? 'SOLD OUT' : 'ADD TO BAG'}
                      </button>
                      <button
                        onClick={() => removeItem(item.productId)}
                        aria-label="Remove from wishlist"
                        style={{
                          padding: '10px',
                          backgroundColor: 'transparent',
                          border: '1px solid var(--border)',
                          color: 'var(--text-muted)',
                          cursor: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'color var(--transition-fast), border-color var(--transition-fast)',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--destructive)'; e.currentTarget.style.borderColor = 'var(--destructive)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .container-outsix > div > [style*="repeat(4"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .container-outsix > div > [style*="repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
