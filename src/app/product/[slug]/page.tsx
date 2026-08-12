'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, ChevronDown, Minus, Plus, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { useUIStore } from '@/store/ui';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import type { Product, ProductSize } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { useProductStore } from '@/store/products';

export default function ProductPage() {
  const routeParams = useParams();
  const slug = typeof routeParams?.slug === 'string' ? routeParams.slug : Array.isArray(routeParams?.slug) ? routeParams.slug[0] : '';
  const { loadProducts } = useProductStore();
  const isLoaded = useProductStore((s) => s.isLoaded);
  const storeProducts = useProductStore((s) => s.products);
  const product = storeProducts.find((p) => p.slug === slug || p.id === slug) || getProductBySlug(slug);

  const { addToRecentlyViewed } = useUIStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product && !isLoaded) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="font-editorial" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.14em' }}>
          LOADING PRODUCT DETAILS...
        </p>
      </div>
    );
  }

  if (!product) {
    notFound();
    return null;
  }

  const related = getRelatedProducts(product, 4);

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* BREADCRUMBS */}
      <div className="container-outsix" style={{ paddingTop: '20px', paddingBottom: '0' }}>
        <nav aria-label="Breadcrumb">
          <ol style={{ display: 'flex', gap: '8px', alignItems: 'center', listStyle: 'none', flexWrap: 'wrap' }}>
            <li><Link href="/" className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', textDecoration: 'none' }}>HOME</Link></li>
            <li style={{ color: 'var(--text-muted)', fontSize: '10px' }}>/</li>
            <li><Link href="/shop" className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', textDecoration: 'none' }}>SHOP</Link></li>
            <li style={{ color: 'var(--text-muted)', fontSize: '10px' }}>/</li>
            <li><Link href={`/shop/${product.category.toLowerCase()}`} className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', textDecoration: 'none' }}>{product.category}</Link></li>
            <li style={{ color: 'var(--text-muted)', fontSize: '10px' }}>/</li>
            <li><span className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>{product.name}</span></li>
          </ol>
        </nav>
      </div>

      {/* MAIN PRODUCT LAYOUT */}
      <div
        className="container-outsix grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start pt-8 pb-24"
      >
        {/* LEFT — GALLERY */}
        <ProductGallery product={product} />

        {/* RIGHT — INFO */}
        <ProductInfo product={product} />
      </div>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section
          style={{
            borderTop: '1px solid var(--border)',
            padding: 'clamp(48px, 8vh, 96px) 0',
            backgroundColor: 'var(--surface)',
          }}
          aria-labelledby="related-heading"
        >
          <div className="container-outsix">
            <h2 id="related-heading" className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 40px)', color: 'var(--text-primary)', marginBottom: '40px' }}>
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MOBILE STICKY BAR */}
      <MobileStickyBar product={product} />
    </div>
  );
}

/* ============================================================
   PRODUCT GALLERY
   ============================================================ */
function ProductGallery({ product }: { product: Product }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="relative md:sticky md:top-[80px]">
      <div className="flex flex-col md:flex-row gap-3">
        {/* THUMBNAILS */}
        {product.images.length > 1 && (
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto w-full md:w-[72px] shrink-0 order-2 md:order-1">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`View image ${i + 1}`}
                style={{
                  width: '72px',
                  height: '90px',
                  backgroundColor: '#0A0A0A',
                  border: '1px solid',
                  borderColor: i === activeIdx ? 'var(--text-primary)' : 'var(--border)',
                  cursor: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'border-color var(--transition-fast)',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img || '/ed2.jpeg'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}

        {/* MAIN IMAGE */}
        <div
          className="flex-1 order-1 md:order-2"
          data-cursor="view"
        >
          <div
            onClick={() => setZoomed(true)}
            style={{
              aspectRatio: '3/4',
              backgroundColor: '#080808',
              position: 'relative',
              cursor: 'none',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ width: '100%', height: '100%' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.images[activeIdx] || '/ed2.jpeg'}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            </AnimatePresence>

            {/* ZOOM ICON */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '4px 8px',
              }}
            >
              <ZoomIn size={14} />
              <span className="font-editorial" style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'var(--white)' }}>ZOOM</span>
            </div>

            {/* BADGE */}
            {product.badge && product.availableSizes.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: product.badge === 'SALE' ? 'var(--destructive)' : 'var(--text-primary)',
                  color: product.badge === 'SALE' ? 'var(--white)' : 'var(--background)',
                  padding: '4px 10px',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  fontFamily: 'Barlow Condensed, sans-serif',
                }}
              >
                {product.badge}
              </div>
            )}

            {/* IMAGE COUNTER */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                fontSize: '10px',
                color: 'var(--white)',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '2px 8px',
                fontFamily: 'Inter',
              }}
            >
              {activeIdx + 1} / {product.images.length}
            </div>
          </div>
        </div>
      </div>

      {/* ZOOM MODAL */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.92)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'none',
            }}
            role="dialog"
            aria-label="Image zoom view"
          >
            <div style={{ width: '60vw', maxWidth: '800px', aspectRatio: '3/4', backgroundColor: '#080808', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.images[activeIdx] || '/ed2.jpeg'} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <p style={{ position: 'absolute', bottom: '32px', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>
              Click anywhere to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   PRODUCT INFO
   ============================================================ */
function ProductInfo({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addState, setAddState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [sizeError, setSizeError] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { addToast } = useUIStore();

  const wishlisted = isWishlisted(product.id);
  const soldOut = product.availableSizes.length === 0;
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const handleAddToBag = async () => {
    if (!selectedSize) {
      setSizeError(true);
      document.getElementById('size-selector')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSizeError(false);
    setAddState('loading');
    await new Promise((r) => setTimeout(r, 600));
    addItem(product, selectedSize, quantity);
    setAddState('success');
    addToast(`${product.name} (${selectedSize}) — ADDED TO BAG`, 'success');
    setTimeout(() => setAddState('idle'), 2500);
  };

  const handleWishlist = () => {
    toggleItem(product);
    addToast(isWishlisted(product.id) ? 'Removed from wishlist' : `${product.name} saved to wishlist`, 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* NAME */}
      <div>
        <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.16em', marginBottom: '8px' }}>
          {product.category} {product.collection && `— ${product.collection.toUpperCase().replace('-', ' ')}`}
        </p>
        <h1 className="font-display" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'var(--text-primary)', lineHeight: 0.95, marginBottom: '16px' }}>
          {product.name}
        </h1>

        {/* PRICE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span className="font-display" style={{ fontSize: '28px', color: 'var(--text-primary)' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.compareAtPrice && (
            <>
              <span style={{ fontSize: '16px', color: 'var(--text-muted)', fontFamily: 'Inter', textDecoration: 'line-through' }}>
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
              {discount && (
                <span
                  style={{
                    backgroundColor: 'var(--destructive)',
                    color: 'var(--white)',
                    fontSize: '10px',
                    padding: '2px 8px',
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                  }}
                >
                  {discount}% OFF
                </span>
              )}
            </>
          )}
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />

      {/* DESCRIPTION */}
      <p style={{ fontSize: '15px', color: 'var(--text-secondary)', fontFamily: 'Inter', lineHeight: 1.7 }}>
        {product.description}
      </p>

      {/* SIZE SELECTOR */}
      <div id="size-selector">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <p className="font-editorial" style={{ fontSize: '11px', color: 'var(--text-primary)', letterSpacing: '0.1em' }}>
            SELECT SIZE
            {sizeError && (
              <span style={{ marginLeft: '12px', color: 'var(--destructive)', fontSize: '10px' }}>
                — PLEASE SELECT A SIZE
              </span>
            )}
          </p>
          <Link
            href="/size-guide"
            className="font-editorial"
            style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', textDecoration: 'underline' }}
          >
            SIZE GUIDE
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {product.sizes.map((size) => {
            const available = product.availableSizes.includes(size);
            const selected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => { if (available) { setSelectedSize(size); setSizeError(false); } }}
                disabled={!available}
                aria-pressed={selected}
                aria-label={`Size ${size}${!available ? ' — sold out' : ''}`}
                style={{
                  width: '52px',
                  height: '52px',
                  border: '1px solid',
                  borderColor: selected ? 'var(--text-primary)' : sizeError ? 'var(--destructive)' : available ? 'var(--border-strong)' : 'var(--border)',
                  backgroundColor: selected ? 'var(--text-primary)' : 'transparent',
                  color: selected ? 'var(--background)' : available ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontSize: '12px',
                  letterSpacing: '0.06em',
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 700,
                  cursor: available ? 'none' : 'not-allowed',
                  opacity: available ? 1 : 0.35,
                  transition: 'all var(--transition-fast)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {size}
                {!available && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      right: 0,
                      height: '1px',
                      backgroundColor: 'var(--text-muted)',
                      transform: 'rotate(-45deg)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* QUANTITY */}
      <div>
        <p className="font-editorial" style={{ fontSize: '11px', color: 'var(--text-primary)', letterSpacing: '0.1em', marginBottom: '12px' }}>
          QUANTITY
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            border: '1px solid var(--border-strong)',
          }}
        >
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            style={{ background: 'none', border: 'none', padding: '12px 16px', color: 'var(--text-secondary)', cursor: 'none', display: 'flex' }}
          >
            <Minus size={14} />
          </button>
          <span style={{ minWidth: '40px', textAlign: 'center', fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Inter' }}>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            style={{ background: 'none', border: 'none', padding: '12px 16px', color: 'var(--text-secondary)', cursor: 'none', display: 'flex' }}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* CTA BUTTONS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* ADD TO BAG */}
        <button
          onClick={handleAddToBag}
          disabled={soldOut || addState === 'loading'}
          data-cursor="add"
          style={{
            width: '100%',
            padding: '18px',
            backgroundColor: soldOut ? 'var(--surface-elevated)' : 'var(--text-primary)',
            color: soldOut ? 'var(--text-muted)' : 'var(--background)',
            border: 'none',
            fontSize: '14px',
            letterSpacing: '0.12em',
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 700,
            cursor: soldOut ? 'not-allowed' : 'none',
            transition: 'opacity var(--transition-fast)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          {soldOut ? 'SOLD OUT' : addState === 'loading' ? 'ADDING...' : addState === 'success' ? '✓ ADDED TO BAG' : `ADD TO BAG${selectedSize ? ` — ${selectedSize}` : ''}`}
        </button>

        {/* WISHLIST */}
        <button
          onClick={handleWishlist}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-strong)',
            fontSize: '13px',
            letterSpacing: '0.12em',
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 700,
            cursor: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'border-color var(--transition-fast), color var(--transition-fast)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
          {wishlisted ? 'SAVED TO WISHLIST' : '♡ SAVE TO WISHLIST'}
        </button>
      </div>

      {/* STOCK STATUS */}
      {!soldOut && product.stock <= 10 && (
        <p className="font-editorial" style={{ fontSize: '11px', color: 'var(--warning)', letterSpacing: '0.1em' }}>
          ⚡ LOW STOCK — ONLY {product.stock} LEFT
        </p>
      )}

      {/* PRODUCT DETAILS ACCORDION */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <Accordion
          title="PRODUCT DETAILS & SPECS"
          open={detailsOpen}
          onToggle={() => setDetailsOpen((p) => !p)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Detail label="DETAILS" value={product.details} />
            <Detail label="MATERIAL" value={`${product.material} (240 GSM Premium Heavyweight)`} />
            <Detail label="FIT" value={`${product.fit} — Streetwear Oversized Drop Shoulder`} />
            <Detail label="MODEL" value="Model is 6'1&quot; (185cm) wearing Size Large" />
            <Detail label="CARE" value="Machine wash cold inside out, do not iron on print" />
          </div>
        </Accordion>

        <Accordion
          title="SHIPPING & PINCODE CHECK"
          open={shippingOpen}
          onToggle={() => setShippingOpen((p) => !p)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'Inter', lineHeight: 1.6 }}>
              Free shipping on orders above ₹999. Standard delivery: 3–7 business days across India.
            </p>

            {/* PINCODE CHECKER WIDGET */}
            <PincodeChecker />

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'Inter', lineHeight: 1.6 }}>
              Easy returns & exchanges within 7 days of delivery.
            </p>
            <Link href="/returns" className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', textDecoration: 'underline' }}>
              FULL RETURN POLICY
            </Link>
          </div>
        </Accordion>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <span className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', width: '80px', flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'Inter', lineHeight: 1.6 }}>
        {value}
      </span>
    </div>
  );
}

function Accordion({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 0',
          background: 'none',
          border: 'none',
          cursor: 'none',
        }}
      >
        <span className="font-editorial" style={{ fontSize: '11px', color: 'var(--text-primary)', letterSpacing: '0.1em' }}>
          {title}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} color="var(--text-muted)" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: '16px' }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   MOBILE STICKY BAR
   ============================================================ */
function MobileStickyBar({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [sizePickerOpen, setSizePickerOpen] = useState(false);
  const { addItem } = useCartStore();
  const { addToast } = useUIStore();

  const soldOut = product.availableSizes.length === 0;

  const handleAdd = () => {
    if (!selectedSize) {
      setSizePickerOpen(true);
      return;
    }
    addItem(product, selectedSize);
    addToast(`${product.name} (${selectedSize}) — ADDED TO BAG`, 'success');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        padding: '12px 16px',
        zIndex: 150,
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}
      className="visible-mobile"
    >
      <div style={{ flex: 1 }}>
        <p className="font-display" style={{ fontSize: '18px', color: 'var(--text-primary)' }}>
          ₹{product.price.toLocaleString('en-IN')}
        </p>
        {selectedSize && (
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>
            Size: {selectedSize}
          </p>
        )}
      </div>

      <button
        onClick={handleAdd}
        disabled={soldOut}
        style={{
          padding: '14px 24px',
          backgroundColor: soldOut ? 'var(--surface-elevated)' : 'var(--text-primary)',
          color: soldOut ? 'var(--text-muted)' : 'var(--background)',
          border: 'none',
          fontSize: '13px',
          letterSpacing: '0.12em',
          fontFamily: 'Barlow Condensed, sans-serif',
          fontWeight: 700,
          cursor: soldOut ? 'not-allowed' : 'pointer',
          flexShrink: 0,
        }}
      >
        {soldOut ? 'SOLD OUT' : selectedSize ? 'ADD TO BAG' : 'SELECT SIZE'}
      </button>

      {/* SIZE PICKER */}
      <AnimatePresence>
        {sizePickerOpen && !soldOut && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            style={{
              position: 'absolute',
              bottom: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'var(--surface-elevated)',
              borderTop: '1px solid var(--border)',
              padding: '20px 16px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {product.sizes.map((size) => {
                const available = product.availableSizes.includes(size);
                return (
                  <button
                    key={size}
                    disabled={!available}
                    onClick={() => { setSelectedSize(size); setSizePickerOpen(false); }}
                    style={{
                      padding: '10px 16px',
                      border: '1px solid',
                      borderColor: available ? 'var(--border-strong)' : 'var(--border)',
                      backgroundColor: 'transparent',
                      color: available ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontSize: '13px',
                      fontFamily: 'Barlow Condensed, sans-serif',
                      cursor: available ? 'pointer' : 'not-allowed',
                      opacity: available ? 1 : 0.4,
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function PincodeChecker() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.replace(/\D/g, '').length !== 6) {
      setResult('Please enter a valid 6-digit pincode');
      return;
    }
    setResult(`⚡ Delivery available to ${pincode} — Estimated: 3 to 5 business days`);
  };

  return (
    <div className="mt-2 p-3 bg-[var(--surface-elevated)] border border-[var(--border)]">
      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter 6-digit pincode"
          className="flex-1 px-3 py-2 text-xs bg-transparent border border-[var(--border)] text-[var(--text-primary)] outline-none min-h-[38px] font-sans"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[var(--text-primary)] text-[var(--background)] font-editorial text-xs font-bold tracking-wider hover:opacity-90 min-h-[38px]"
        >
          CHECK
        </button>
      </form>
      {result && (
        <p className="mt-2 text-xs text-[var(--success)] font-editorial tracking-wide">
          {result}
        </p>
      )}
    </div>
  );
}
