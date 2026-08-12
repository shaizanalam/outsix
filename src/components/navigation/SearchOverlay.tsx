'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/ui';
import { searchProducts, POPULAR_SEARCHES } from '@/data/products';
import type { Product } from '@/data/products';

export function SearchOverlay() {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery, addRecentSearch, recentSearches, clearRecentSearches } = useUIStore();
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      setResults(searchProducts(searchQuery).slice(0, 8));
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    if (isSearchOpen) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchOpen, closeSearch]);

  const handleSearch = (q: string) => {
    if (q.trim()) {
      addRecentSearch(q.trim().toUpperCase());
      closeSearch();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              zIndex: 290,
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* PANEL */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 300,
              backgroundColor: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              padding: '0',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            {/* INPUT ROW */}
            <div
              className="container-outsix"
              style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '72px' }}
            >
              <Search size={20} color="var(--text-muted)" strokeWidth={1.5} />
              <form onSubmit={handleSubmit} style={{ flex: 1 }}>
                <input
                  ref={inputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH OUTSIX"
                  className="font-editorial"
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                    letterSpacing: '0.08em',
                    color: 'var(--text-primary)',
                  }}
                  aria-label="Search products"
                />
              </form>
              <button
                onClick={closeSearch}
                aria-label="Close search"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'none',
                  padding: '8px',
                  display: 'flex',
                }}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* RESULTS AREA */}
            <div
              className="container-outsix"
              style={{ paddingTop: '8px', paddingBottom: '32px', maxHeight: '60vh', overflowY: 'auto' }}
            >
              {/* SEARCH RESULTS */}
              {results.length > 0 && (
                <div>
                  <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '16px' }}>
                    RESULTS
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={() => { addRecentSearch(searchQuery.toUpperCase()); closeSearch(); }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 0',
                          borderBottom: '1px solid var(--border)',
                          textDecoration: 'none',
                          gap: '16px',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        <div>
                          <span className="font-editorial" style={{ fontSize: '13px', color: 'var(--text-primary)', letterSpacing: '0.06em', display: 'block' }}>
                            {product.name}
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                            {product.category}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'Inter' }}>
                            ₹{product.price}
                          </span>
                          <ArrowRight size={14} color="var(--text-muted)" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* NO RESULTS */}
              {searchQuery.trim().length > 1 && results.length === 0 && (
                <div style={{ paddingTop: '24px' }}>
                  <p className="font-display" style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    NOTHING FOUND.
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'Inter', marginBottom: '24px' }}>
                    Try a different search.
                  </p>
                </div>
              )}

              {/* POPULAR + RECENT — shown when no active search */}
              {searchQuery.trim().length <= 1 && (
                <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', paddingTop: '16px' }}>
                  {recentSearches.length > 0 && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                          RECENT
                        </p>
                        <button
                          onClick={clearRecentSearches}
                          style={{ background: 'none', border: 'none', fontSize: '10px', color: 'var(--text-muted)', cursor: 'none', fontFamily: 'Inter' }}
                        >
                          Clear
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {recentSearches.map((s) => (
                          <button
                            key={s}
                            onClick={() => { setSearchQuery(s); }}
                            className="font-editorial"
                            style={{
                              background: 'none',
                              border: 'none',
                              textAlign: 'left',
                              fontSize: '13px',
                              color: 'var(--text-secondary)',
                              cursor: 'none',
                              letterSpacing: '0.06em',
                              transition: 'color var(--transition-fast)',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '12px' }}>
                      POPULAR
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {POPULAR_SEARCHES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSearchQuery(s)}
                          className="font-editorial"
                          style={{
                            background: 'none',
                            border: 'none',
                            textAlign: 'left',
                            fontSize: '13px',
                            color: 'var(--text-secondary)',
                            cursor: 'none',
                            letterSpacing: '0.06em',
                            transition: 'color var(--transition-fast)',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
