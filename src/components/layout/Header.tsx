'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { useUIStore } from '@/store/ui';

import logoImg from '../../../logo.jpeg';

const NAV_LINKS = [
  { href: '/shop', label: 'SHOP' },
  { href: '/collections', label: 'COLLECTIONS' },
  { href: '/about', label: 'ABOUT' },
];

const SECONDARY_NAV = [
  { href: '/shop/tees', label: 'TEES' },
  { href: '/shop/hoodies', label: 'HOODIES' },
  { href: '/shop/bottoms', label: 'BOTTOMS' },
  { href: '/shop/accessories', label: 'ACCESSORIES' },
  { href: '/shop/headwear', label: 'HEADWEAR' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [shopHovered, setShopHovered] = useState(false);

  const cartCount = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { openSearch, openMobileMenu, isMobileMenuOpen, closeMobileMenu } = useUIStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background-color var(--transition-base), border-color var(--transition-base), padding var(--transition-base)',
        backgroundColor: scrolled ? 'rgba(7,7,7,0.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      {/* MAIN NAV ROW */}
      <div
        className="container-outsix"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: scrolled ? '56px' : '72px',
          transition: 'height var(--transition-base)',
        }}
      >
        {/* LOGO */}
        <Link
          href="/"
          aria-label="OUTSIX Home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: scrolled ? '36px' : '44px',
            textDecoration: 'none',
            flexShrink: 0,
            transition: 'height var(--transition-base)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoImg.src}
            alt="OUTSIX"
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'contain',
              mixBlendMode: 'screen',
            }}
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: '40px' }}
          aria-label="Main navigation"
          className="hidden-mobile"
        >
          {NAV_LINKS.map((link) => (
            <div
              key={link.href}
              style={{ position: 'relative' }}
              onMouseEnter={() => link.label === 'SHOP' ? setShopHovered(true) : undefined}
              onMouseLeave={() => link.label === 'SHOP' ? setShopHovered(false) : undefined}
            >
              <Link
                href={link.href}
                className="font-editorial"
                style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </Link>

              {/* SHOP DROPDOWN */}
              {link.label === 'SHOP' && (
                <AnimatePresence>
                  {shopHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: '16px',
                        backgroundColor: 'var(--surface-elevated)',
                        border: '1px solid var(--border)',
                        padding: '16px 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        minWidth: '140px',
                      }}
                    >
                      {SECONDARY_NAV.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="font-editorial"
                          style={{
                            fontSize: '11px',
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            letterSpacing: '0.1em',
                            transition: 'color var(--transition-fast)',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* ACTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* SEARCH */}
          <button
            onClick={openSearch}
            aria-label="Open search"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'none',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <Search size={18} strokeWidth={1.5} />
          </button>

          {/* WISHLIST — desktop only */}
          <Link
            href="/wishlist"
            aria-label={`Wishlist (${wishlistCount} items)`}
            style={{
              position: 'relative',
              color: 'var(--text-secondary)',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              transition: 'color var(--transition-fast)',
            }}
            className="hidden-mobile"
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <Heart size={18} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--background)',
                  fontSize: '8px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* CART BAG */}
          <CartButton count={cartCount} />

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'none',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              transition: 'color var(--transition-fast)',
            }}
            className="visible-mobile"
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .visible-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}

function CartButton({ count }: { count: number }) {
  const { openCart } = useCartStore();

  return (
    <button
      onClick={openCart}
      aria-label={`Shopping bag (${count} items)`}
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        color: 'var(--text-secondary)',
        cursor: 'none',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        transition: 'color var(--transition-fast)',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
    >
      <ShoppingBag size={18} strokeWidth={1.5} />
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: 'var(--text-primary)',
            color: 'var(--background)',
            fontSize: '8px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {count > 9 ? '9+' : count}
        </motion.span>
      )}
    </button>
  );
}
