'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, CATEGORIES, type ProductCategory } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';

type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'best-selling';

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sort, setSort] = useState<SortOption>('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const filtered = useMemo(() => {
    let products = [...PRODUCTS];

    if (selectedCategories.length > 0) {
      products = products.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedSizes.length > 0) {
      products = products.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s))
      );
    }
    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sort) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products.sort((a, b) => a.id.localeCompare(b.id)).reverse();
        break;
      case 'best-selling':
        products.sort((a, b) => b.stock - a.stock);
        break;
      default:
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return products;
  }, [selectedCategories, selectedSizes, priceRange, sort]);

  const toggleCategory = (cat: ProductCategory) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setPriceRange([0, 2000]);
  };

  const hasFilters =
    selectedCategories.length > 0 || selectedSizes.length > 0;

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      {/* PAGE HEADER */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          padding: 'clamp(32px, 5vh, 64px) 0 24px',
          backgroundColor: 'var(--surface)',
        }}
      >
        <div className="container-outsix">
          <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.16em', marginBottom: '8px' }}>
            {filtered.length} PRODUCTS
          </p>
          <h1 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text-primary)', lineHeight: 1 }}>
            SHOP<br /><span style={{ color: 'var(--text-secondary)' }}>ALL PRODUCTS</span>
          </h1>
        </div>
      </div>

      {/* FILTER + SORT BAR */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--surface)',
          position: 'sticky',
          top: '56px',
          zIndex: 50,
        }}
      >
        <div
          className="container-outsix"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '52px',
            gap: '16px',
          }}
        >
          {/* FILTER TOGGLE */}
          <button
            onClick={() => setFilterOpen((prev) => !prev)}
            className="font-editorial hidden-mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: filterOpen ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'none',
              fontSize: '11px',
              letterSpacing: '0.1em',
              transition: 'color var(--transition-fast)',
            }}
          >
            <SlidersHorizontal size={14} />
            FILTER {hasFilters && `(${selectedCategories.length + selectedSizes.length})`}
          </button>

          <button
            onClick={() => setShowMobileFilter(true)}
            className="font-editorial visible-mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '11px',
              letterSpacing: '0.1em',
            }}
          >
            <SlidersHorizontal size={14} />
            FILTER {hasFilters && `(${selectedCategories.length + selectedSizes.length})`}
          </button>

          {/* CLEAR */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="font-editorial"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'none',
                fontSize: '11px',
                letterSpacing: '0.1em',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <X size={12} /> CLEAR
            </button>
          )}

          <div style={{ flex: 1 }} />

          {/* SORT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="font-editorial" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>SORT:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="font-editorial"
              aria-label="Sort products"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                cursor: 'none',
                outline: 'none',
              }}
            >
              <option value="featured" style={{ backgroundColor: '#0D0D0D' }}>FEATURED</option>
              <option value="newest" style={{ backgroundColor: '#0D0D0D' }}>NEWEST</option>
              <option value="price-asc" style={{ backgroundColor: '#0D0D0D' }}>PRICE: LOW → HIGH</option>
              <option value="price-desc" style={{ backgroundColor: '#0D0D0D' }}>PRICE: HIGH → LOW</option>
              <option value="best-selling" style={{ backgroundColor: '#0D0D0D' }}>BEST SELLING</option>
            </select>
          </div>
        </div>
      </div>

      {/* FILTER PANEL (DESKTOP) */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
          >
            <div
              className="container-outsix hidden-mobile"
              style={{ display: 'flex', gap: '48px', padding: '24px 0', flexWrap: 'wrap' }}
            >
              {/* CATEGORY */}
              <FilterSection title="CATEGORY">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {CATEGORIES.map((cat) => (
                    <FilterPill
                      key={cat}
                      label={cat}
                      active={selectedCategories.includes(cat)}
                      onClick={() => toggleCategory(cat)}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* SIZE */}
              <FilterSection title="SIZE">
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <FilterPill
                      key={size}
                      label={size}
                      active={selectedSizes.includes(size)}
                      onClick={() => toggleSize(size)}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* PRICE */}
              <FilterSection title={`PRICE: ₹${priceRange[0]} — ₹${priceRange[1]}`}>
                <input
                  type="range"
                  min={0}
                  max={2000}
                  step={50}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  style={{ width: '200px', accentColor: 'var(--text-primary)' }}
                  aria-label="Maximum price filter"
                />
              </FilterSection>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE FILTER SHEET */}
      <AnimatePresence>
        {showMobileFilter && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilter(false)}
              style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 290 }}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'var(--surface)',
                borderTop: '1px solid var(--border)',
                zIndex: 300,
                padding: '24px',
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
              role="dialog"
              aria-label="Filter products"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 className="font-editorial" style={{ fontSize: '14px', letterSpacing: '0.1em', color: 'var(--text-primary)' }}>FILTER</h2>
                <button onClick={() => setShowMobileFilter(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>

              <FilterSection title="CATEGORY">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {CATEGORIES.map((cat) => (
                    <FilterPill key={cat} label={cat} active={selectedCategories.includes(cat)} onClick={() => toggleCategory(cat)} />
                  ))}
                </div>
              </FilterSection>

              <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '20px 0' }} />

              <FilterSection title="SIZE">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <FilterPill key={size} label={size} active={selectedSizes.includes(size)} onClick={() => toggleSize(size)} />
                  ))}
                </div>
              </FilterSection>

              <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '20px 0' }} />

              <FilterSection title={`PRICE: ₹0 — ₹${priceRange[1]}`}>
                <input
                  type="range"
                  min={0}
                  max={2000}
                  step={50}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  style={{ width: '100%', accentColor: 'var(--text-primary)', marginTop: '8px' }}
                  aria-label="Maximum price"
                />
              </FilterSection>

              <button
                onClick={() => setShowMobileFilter(false)}
                style={{
                  width: '100%',
                  marginTop: '32px',
                  padding: '16px',
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--background)',
                  border: 'none',
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                VIEW {filtered.length} PRODUCTS
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PRODUCT GRID */}
      <div className="container-outsix" style={{ paddingTop: '48px', paddingBottom: '96px' }}>
        <ProductGrid products={filtered} columns={4} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .visible-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '12px' }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="font-editorial"
      style={{
        padding: '6px 12px',
        border: '1px solid',
        borderColor: active ? 'var(--text-primary)' : 'var(--border)',
        backgroundColor: active ? 'var(--text-primary)' : 'transparent',
        color: active ? 'var(--background)' : 'var(--text-secondary)',
        fontSize: '10px',
        letterSpacing: '0.1em',
        cursor: 'none',
        transition: 'all var(--transition-fast)',
      }}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
