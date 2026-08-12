'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { useUIStore } from '@/store/ui';
import type { Product, ProductSize } from '@/data/products';

type Props = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [addedSize, setAddedSize] = useState<ProductSize | null>(null);

  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { addToast } = useUIStore();

  const wishlisted = isWishlisted(product.id);
  const soldOut = product.availableSizes.length === 0;
  const lowStock = !soldOut && product.stock <= 10;

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const handleQuickAdd = (size: ProductSize, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
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
      className="group relative flex flex-col bg-[var(--surface)] border border-[var(--border)] overflow-hidden transition-all duration-300 hover:border-[var(--border-strong)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setQuickAddOpen(false); }}
      data-cursor="view"
    >
      {/* TOP IMAGE AREA */}
      <Link href={`/product/${product.slug}`} className="block relative w-full aspect-[3/4] bg-[#0A0A0A] overflow-hidden no-underline">
        {/* SHIRT IMAGE */}
        <div className="w-full h-full relative transition-transform duration-500 ease-out group-hover:scale-105">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hovered && product.images[1] ? product.images[1] : product.images[0] || '/ed2.jpeg'}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* BADGES (TOP-LEFT) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge && !soldOut && (
            <span
              className={`px-2 py-0.5 text-[9px] font-bold tracking-widest font-editorial ${
                product.badge === 'SALE' ? 'bg-[var(--destructive)] text-white' : 'bg-[var(--text-primary)] text-[var(--background)]'
              }`}
            >
              {product.badge}
            </span>
          )}
          {discountPercent && discountPercent > 0 && !soldOut && (
            <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider bg-[var(--success)] text-white font-editorial">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* SOLD OUT OVERLAY */}
        {soldOut && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="font-editorial text-xs text-[var(--text-secondary)] tracking-widest bg-black/80 px-3 py-1 border border-[var(--border)]">
              SOLD OUT
            </span>
          </div>
        )}

        {/* WISHLIST HEART (TOP-RIGHT) */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white z-10 flex items-center justify-center transition-transform active:scale-90"
        >
          <motion.div
            animate={{ scale: wishlisted ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.25 }}
          >
            <Heart
              size={15}
              strokeWidth={2}
              fill={wishlisted ? 'var(--text-primary)' : 'none'}
              color={wishlisted ? 'var(--text-primary)' : '#ffffff'}
            />
          </motion.div>
        </button>
      </Link>

      {/* BOTTOM DESCRIPTION & PRICE AREA */}
      <div className="flex flex-col justify-between flex-1 p-3 sm:p-4 border-t border-[var(--border)]">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="font-editorial text-[9px] sm:text-[10px] text-[var(--text-muted)] tracking-widest uppercase">
              OUTSIX · {product.category}
            </span>
            {lowStock && (
              <span className="font-editorial text-[9px] text-[var(--warning)] tracking-wider">
                FEW LEFT
              </span>
            )}
          </div>

          <Link href={`/product/${product.slug}`} className="no-underline">
            <h3 className="font-editorial text-xs sm:text-sm text-[var(--text-primary)] tracking-wide line-clamp-1 mb-2 group-hover:text-[var(--text-secondary)] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* PRICE BLOCK */}
          <div className="flex items-baseline gap-2 flex-wrap mb-3">
            <span className="font-sans text-sm sm:text-base font-semibold text-[var(--text-primary)]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.compareAtPrice && (
              <span className="font-sans text-xs text-[var(--text-muted)] line-through">
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* MOBILE & DESKTOP QUICK ACTION BUTTON */}
        {!soldOut ? (
          <div>
            {!quickAddOpen ? (
              <button
                onClick={handleQuickAddToggle}
                className="w-full min-h-[38px] py-2 px-3 bg-transparent border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--background)] font-editorial text-xs font-bold tracking-widest flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {addedSize ? (
                  <>
                    <Check size={14} />
                    ADDED
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    ADD TO BAG
                  </>
                )}
              </button>
            ) : (
              <div className="flex gap-1.5 flex-wrap justify-center py-1">
                {product.sizes.map((size) => {
                  const available = product.availableSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={(e) => available && handleQuickAdd(size, e)}
                      disabled={!available}
                      className={`min-h-[34px] min-w-[34px] px-2 text-xs font-bold font-editorial tracking-wider border transition-colors ${
                        available
                          ? 'border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--background)] cursor-pointer'
                          : 'border-[var(--border)] text-[var(--text-muted)] opacity-40 cursor-not-allowed'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <button
            disabled
            className="w-full min-h-[38px] py-2 px-3 bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-muted)] font-editorial text-xs font-bold tracking-widest text-center opacity-60 cursor-not-allowed"
          >
            OUT OF STOCK
          </button>
        )}
      </div>
    </article>
  );
}
