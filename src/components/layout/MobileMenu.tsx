'use client';

import Link from 'next/link';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/ui';
import { Logo } from '@/components/ui/Logo';

const MENU_SECTIONS = [
  {
    label: 'SHOP',
    href: '/shop',
    children: [
      { href: '/shop/tees', label: 'TEES' },
      { href: '/shop/hoodies', label: 'HOODIES' },
      { href: '/shop/bottoms', label: 'BOTTOMS' },
      { href: '/shop/accessories', label: 'ACCESSORIES' },
      { href: '/shop/headwear', label: 'HEADWEAR' },
    ],
  },
  { label: 'COLLECTIONS', href: '/collections' },
  { label: 'ABOUT', href: '/about' },
  { label: 'SEARCH', href: null, action: 'search' as const },
  { label: 'ACCOUNT', href: '/account' },
  { label: 'ADMIN DASHBOARD', href: '/admin' },
];

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu, openSearch } = useUIStore();

  const handleSearch = () => {
    closeMobileMenu();
    openSearch();
  };

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 250,
            backgroundColor: 'var(--background)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* HEADER ROW */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <Logo height={34} onClick={closeMobileMenu} />
            <button
              onClick={closeMobileMenu}
              aria-label="Close menu"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
              }}
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* MENU ITEMS */}
          <nav
            style={{ flex: 1, padding: '40px 24px' }}
            aria-label="Mobile navigation"
          >
            {MENU_SECTIONS.map((section, sectionIdx) => (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: sectionIdx * 0.07, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{ marginBottom: '8px' }}
              >
                {section.action === 'search' ? (
                  <button
                    onClick={handleSearch}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px 0',
                      width: '100%',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <span
                      className="font-display"
                      style={{ fontSize: '36px', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}
                    >
                      {section.label}
                    </span>
                    <Search size={20} color="var(--text-muted)" />
                  </button>
                ) : (
                  <div style={{ borderBottom: '1px solid var(--border)' }}>
                    <Link
                      href={section.href!}
                      onClick={closeMobileMenu}
                      style={{ display: 'block', padding: '16px 0', textDecoration: 'none' }}
                    >
                      <span
                        className="font-display"
                        style={{
                          fontSize: '36px',
                          color: 'var(--text-primary)',
                          letterSpacing: '0.04em',
                          transition: 'color var(--transition-fast)',
                        }}
                      >
                        {section.label}
                      </span>
                    </Link>

                    {/* SUB ITEMS */}
                    {section.children && (
                      <div style={{ paddingBottom: '12px', paddingLeft: '2px' }}>
                        {section.children.map((child, childIdx) => (
                          <motion.div
                            key={child.href}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: sectionIdx * 0.07 + childIdx * 0.04 + 0.15,
                              duration: 0.28,
                            }}
                          >
                            <Link
                              href={child.href}
                              onClick={closeMobileMenu}
                              className="font-editorial"
                              style={{
                                display: 'block',
                                padding: '8px 0',
                                fontSize: '13px',
                                color: 'var(--text-secondary)',
                                textDecoration: 'none',
                                letterSpacing: '0.1em',
                                transition: 'color var(--transition-fast)',
                              }}
                            >
                              {child.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </nav>

          {/* FOOTER */}
          <div
            style={{
              padding: '24px',
              borderTop: '1px solid var(--border)',
            }}
          >
            <p
              className="font-editorial"
              style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}
            >
              OUTSIDE THE ORDINARY
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
