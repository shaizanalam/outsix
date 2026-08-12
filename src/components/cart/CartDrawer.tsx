'use client';

import Link from 'next/link';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { PRODUCTS } from '@/data/products';

const SHIPPING_THRESHOLD = 999;

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getSubtotal, getTotalItems } = useCartStore();
  const { addItem: addToWishlist } = useWishlistStore();

  const subtotal = getSubtotal();
  const shippingFree = subtotal >= SHIPPING_THRESHOLD;
  const remainingForFree = SHIPPING_THRESHOLD - subtotal;

  const handleMoveToWishlist = (item: (typeof items)[0]) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (product) addToWishlist(product);
    removeItem(item.productId, item.size);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              zIndex: 60,
            }}
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '480px',
              backgroundColor: 'var(--surface)',
              borderLeft: '1px solid var(--border)',
              zIndex: 70,
              display: 'flex',
              flexDirection: 'column',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* HEADER */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                borderBottom: '1px solid var(--border)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <h2 className="font-editorial" style={{ fontSize: '14px', letterSpacing: '0.1em', color: 'var(--text-primary)' }}>
                  BAG
                </h2>
                {getTotalItems() > 0 && (
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                    {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'none',
                  padding: '8px',
                  display: 'flex',
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* FREE SHIPPING PROGRESS */}
            {items.length > 0 && (
              <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
                {shippingFree ? (
                  <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--success)', letterSpacing: '0.1em' }}>
                    ✓ FREE SHIPPING UNLOCKED
                  </p>
                ) : (
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Inter', marginBottom: '8px' }}>
                      Add ₹{remainingForFree} more for free shipping
                    </p>
                    <div style={{ height: '2px', backgroundColor: 'var(--surface-elevated)', borderRadius: '1px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          backgroundColor: 'var(--text-primary)',
                          width: `${Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100)}%`,
                          transition: 'width var(--transition-base)',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ITEMS */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
              {items.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    gap: '16px',
                    textAlign: 'center',
                  }}
                >
                  <p className="font-display" style={{ fontSize: '22px', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
                    YOUR BAG IS EMPTY.
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                    NOTHING HERE YET.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    style={{
                      marginTop: '8px',
                      padding: '12px 24px',
                      backgroundColor: 'var(--text-primary)',
                      color: 'var(--background)',
                      textDecoration: 'none',
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      fontFamily: 'Barlow Condensed, sans-serif',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    SHOP THE DROP <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.productId}-${item.size}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        style={{ borderBottom: '1px solid var(--border)', overflow: 'hidden' }}
                      >
                        <div style={{ display: 'flex', gap: '16px', padding: '20px 0' }}>
                          {/* IMAGE */}
                          <div
                            style={{
                              width: '88px',
                              height: '110px',
                              backgroundColor: 'var(--surface-elevated)',
                              flexShrink: 0,
                              overflow: 'hidden',
                              position: 'relative',
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.image || '/ed2.jpeg'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>

                          {/* INFO */}
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
                            <Link
                              href={`/product/${item.slug}`}
                              onClick={closeCart}
                              className="font-editorial truncate-1"
                              style={{ fontSize: '12px', color: 'var(--text-primary)', textDecoration: 'none', letterSpacing: '0.06em' }}
                            >
                              {item.name}
                            </Link>
                            <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                              SIZE: {item.size}
                            </p>
                            <p style={{ fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'Inter', fontWeight: 500 }}>
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </p>

                            {/* QUANTITY + ACTIONS */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                              {/* QUANTITY */}
                              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', gap: '0' }}>
                                <button
                                  onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                                  aria-label="Decrease quantity"
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: '6px 10px',
                                    color: 'var(--text-secondary)',
                                    cursor: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    transition: 'color var(--transition-fast)',
                                  }}
                                >
                                  <Minus size={12} />
                                </button>
                                <span style={{ minWidth: '28px', textAlign: 'center', fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'Inter' }}>
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                                  aria-label="Increase quantity"
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: '6px 10px',
                                    color: 'var(--text-secondary)',
                                    cursor: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    transition: 'color var(--transition-fast)',
                                  }}
                                >
                                  <Plus size={12} />
                                </button>
                              </div>

                              {/* REMOVE */}
                              <button
                                onClick={() => removeItem(item.productId, item.size)}
                                aria-label="Remove item"
                                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'none', display: 'flex', padding: '4px', transition: 'color var(--transition-fast)' }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--destructive)')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                              >
                                <Trash2 size={14} />
                              </button>

                              {/* MOVE TO WISHLIST */}
                              <button
                                onClick={() => handleMoveToWishlist(item)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  fontSize: '10px',
                                  color: 'var(--text-muted)',
                                  cursor: 'none',
                                  fontFamily: 'Inter',
                                  transition: 'color var(--transition-fast)',
                                  padding: '4px',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                              >
                                ♡ SAVE
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* FOOTER — SUMMARY + CTA */}
            {items.length > 0 && (
              <div
                style={{
                  flexShrink: 0,
                  padding: '24px',
                  borderTop: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                }}
              >
                {/* SUBTOTAL */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'Inter' }}>Subtotal</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Inter', fontWeight: 500 }}>
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'Inter' }}>Shipping</span>
                    <span style={{ fontSize: '12px', color: shippingFree ? 'var(--success)' : 'var(--text-muted)', fontFamily: 'Inter' }}>
                      {shippingFree ? 'FREE' : '₹99'}
                    </span>
                  </div>
                  <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="font-editorial" style={{ fontSize: '12px', color: 'var(--text-primary)', letterSpacing: '0.1em' }}>TOTAL</span>
                    <span className="font-display" style={{ fontSize: '18px', color: 'var(--text-primary)' }}>
                      ₹{(subtotal + (shippingFree ? 0 : 99)).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '16px',
                    backgroundColor: 'var(--text-primary)',
                    color: 'var(--background)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    letterSpacing: '0.12em',
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontWeight: 700,
                    transition: 'opacity var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  CHECKOUT <ArrowRight size={16} />
                </Link>

                <Link
                  href="/shop"
                  onClick={closeCart}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    marginTop: '12px',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    textDecoration: 'underline',
                    fontFamily: 'Inter',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  Continue shopping
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
