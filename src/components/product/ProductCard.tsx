'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { useUIStore } from '@/store/ui';
import type { Product, ProductSize } from '@/data/products';

type Props = {
  product: Product;
  priority?: boolean;
};

import { TShirtGraphic } from '@/components/ui/TShirtGraphic';

export function ProductCard({ product, priority = false }: Props) {
  const [hovered, setHovered] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [addedSize, setAddedSize] = useState<ProductSize | null>(null);

  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { addToast } = useUIStore();

  const wishlisted = isWishlisted(product.id);
  const soldOut = product.availableSizes.length === 0;
  const lowStock = !soldOut && product.stock <= 10;

  const graphicType = product.slug.includes('cross') || product.slug.includes('tribal') || product.slug.includes('gothic') || product.slug.includes('void') ? 'gothic' : 'skull';

  const handleQuickAdd = (size: ProductSize) => {
    addItem(product, size);
    setAddedSize(size);
    setQuickAddOpen(false);
    addToast(`${product.name} (${size}) — ADDED TO BAG`, 'success');
    setTimeout(() => setAddedSize(null), 2500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  const handleQuickAddToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!soldOut) setQuickAddOpen((prev) => !prev);
  };

  return (
    <article
      style={{ position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setQuickAddOpen(false); }}
      data-cursor="view"
    >
      {/* IMAGE */}
      <Link href={`/product/${product.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div
          style={{
            position: 'relative',
            aspectRatio: '3/4',
            backgroundColor: 'var(--surface-elevated)',
            overflow: 'hidden',
          }}
        >
          {/* REAL SHIRT IMAGE (ed2.jpeg / eg1.jpeg) */}
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transition: 'transform var(--transition-slow)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hovered && product.images[1] ? product.images[1] : product.images[0] || '/ed2.jpeg'}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>

          {/* BADGE */}
          {product.badge && !soldOut && (
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                backgroundColor: product.badge === 'SALE' ? 'var(--destructive)' : 'var(--text-primary)',
                color: product.badge === 'SALE' ? 'var(--white)' : 'var(--background)',
                padding: '3px 8px',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                fontFamily: 'Barlow Condensed, sans-serif',
              }}
            >
              {product.badge}
            </div>
          )}

          {/* SOLD OUT OVERLAY */}
          {soldOut && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(7,7,7,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                className="font-editorial"
                style={{ fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.14em' }}
              >
                SOLD OUT
              </span>
            </div>
          )}

          {/* WISHLIST */}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'none',
              border: 'none',
              cursor: 'none',
              padding: '6px',
              opacity: hovered || wishlisted ? 1 : 0,
              transition: 'opacity var(--transition-fast)',
              display: 'flex',
            }}
          >
            <motion.div
              animate={{ scale: wishlisted ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.25 }}
            >
              <Heart
                size={18}
                strokeWidth={1.5}
                fill={wishlisted ? 'var(--text-primary)' : 'none'}
                color={wishlisted ? 'var(--text-primary)' : 'var(--white)'}
              />
            </motion.div>
          </button>

          {/* QUICK ADD */}
          <AnimatePresence>
            {hovered && !soldOut && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: quickAddOpen ? 'var(--surface-elevated)' : 'rgba(7,7,7,0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '12px',
                }}
              >
                {!quickAddOpen ? (
                  <button
                    onClick={handleQuickAddToggle}
                    data-cursor="add"
                    style={{
                      width: '100%',
                      background: 'none',
                      border: '1px solid var(--border-strong)',
                      color: 'var(--text-primary)',
                      padding: '10px',
                      cursor: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      fontFamily: 'Barlow Condensed, sans-serif',
                      fontWeight: 700,
                      transition: 'border-color var(--transition-fast)',
                    }}
                  >
                    {addedSize ? (
                      <>
                        <Check size={12} />
                        ADDED
                      </>
                    ) : (
                      <>
                        <Plus size={12} />
                        QUICK ADD
                      </>
                    )}
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {product.sizes.map((size) => {
                      const available = product.availableSizes.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => available && handleQuickAdd(size)}
                          disabled={!available}
                          style={{
                            padding: '6px 10px',
                            fontSize: '10px',
                            letterSpacing: '0.08em',
                            fontFamily: 'Barlow Condensed, sans-serif',
                            fontWeight: 700,
                            border: '1px solid',
                            borderColor: available ? 'var(--border-strong)' : 'var(--border)',
                            backgroundColor: 'transparent',
                            color: available ? 'var(--text-primary)' : 'var(--text-muted)',
                            cursor: available ? 'none' : 'not-allowed',
                            opacity: available ? 1 : 0.4,
                            transition: 'border-color var(--transition-fast), background var(--transition-fast)',
                          }}
                          onMouseEnter={(e) => available && (e.currentTarget.style.backgroundColor = 'var(--text-primary)', e.currentTarget.style.color = 'var(--background)')}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = available ? 'var(--text-primary)' : 'var(--text-muted)'; }}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      {/* PRODUCT META */}
      <div style={{ paddingTop: '12px' }}>
        <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3
            className="font-editorial truncate-1"
            style={{ fontSize: '12px', color: 'var(--text-primary)', letterSpacing: '0.06em', marginBottom: '4px' }}
          >
            {product.name}
          </h3>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Inter', fontWeight: 500 }}>
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.compareAtPrice && (
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'Inter', textDecoration: 'line-through' }}>
              ₹{product.compareAtPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
        {lowStock && (
          <p className="font-editorial" style={{ fontSize: '9px', color: 'var(--warning)', letterSpacing: '0.1em', marginTop: '4px' }}>
            LOW STOCK
          </p>
        )}
      </div>
    </article>
  );
}
