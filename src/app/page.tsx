'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { AnnouncementTicker } from '@/components/layout/AnnouncementTicker';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useProductStore } from '@/store/products';
import type { Product } from '@/data/products';

export default function HomePage() {
  const { loadProducts } = useProductStore();
  const storeProducts = useProductStore((s) => s.products);
  const productsList = storeProducts || [];

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const newDropProducts = productsList.filter((p) => p.collection === 'drop-01' || p.category === 'TEES').slice(0, 6);
  const bestSellers = productsList.filter((p) => p.badge === 'BESTSELLER' || p.featured || p.stock > 0).slice(0, 4);

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* TICKER */}
      <AnnouncementTicker />

      {/* 01 — HERO */}
      <HeroSection />

      {/* 02 — NEW DROP */}
      <NewDropSection products={newDropProducts} />

      {/* 03 — SHOP BY CATEGORY */}
      <ShopByCategorySection />

      {/* 04 — BEST SELLERS */}
      <BestSellersSection products={bestSellers} />

      {/* 07 — BRAND STATEMENT */}
      <BrandStatementSection />

      {/* 08 — SOCIAL GRID */}
      <SocialGridSection />

      {/* 09 — NEWSLETTER */}
      <NewsletterSection />
    </div>
  );
}

/* ============================================================
   01 — HERO SECTION
   ============================================================ */
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] min-h-[550px] bg-[var(--background)] flex items-center md:items-end overflow-hidden pt-16 md:pt-0"
      aria-label="Hero"
    >
      {/* CLEAN PRODUCT SHOWCASE — 2 STAGGERED T-SHIRTS WITH UNIFORM ROTATION & SOFT DROP SHADOW */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          transform: 'translateY(-50%)',
          width: 'clamp(460px, 48vw, 800px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          gap: '32px',
          zIndex: 2,
        }}
        className="hidden-mobile"
      >
        {/* SHIRT 1 — OUTSIDE FLAME TEE (bgrem1.png) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            flex: 1,
            maxWidth: '360px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: 'rotate(-3deg)',
            transition: 'transform 0.4s ease',
          }}
          data-cursor="view"
        >
          {/* ASPECT-RATIO CONTAINER WITH SOFT DROP SHADOW */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '3/4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: 'drop-shadow(0 35px 50px rgba(0, 0, 0, 0.85)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.6))',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bgrem1.png"
              alt="OUTSIDE FLAME TEE"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/ed2.jpeg';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* PRICE TAG BADGE */}
          <div
            style={{
              marginTop: '12px',
              backgroundColor: 'rgba(13, 13, 13, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-strong)',
              padding: '6px 14px',
              textAlign: 'center',
            }}
          >
            <span className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-primary)', letterSpacing: '0.12em', display: 'block' }}>
              OUTSIDE FLAME TEE
            </span>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>
              ₹699 · DROP 01
            </span>
          </div>
        </motion.div>

        {/* SHIRT 2 — VOID SKULL TEE (bgrem2.png) — VERTICALLY STAGGERED ALIGNED TO BASELINE */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            flex: 1,
            maxWidth: '340px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: 'rotate(4deg) translateY(-40px)',
            transition: 'transform 0.4s ease',
          }}
          data-cursor="view"
        >
          {/* ASPECT-RATIO CONTAINER WITH SOFT DROP SHADOW */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '3/4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: 'drop-shadow(0 35px 50px rgba(0, 0, 0, 0.85)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.6))',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bgrem2.png"
              alt="VOID SKULL TEE"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/eg1.jpeg';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* PRICE TAG BADGE */}
          <div
            style={{
              marginTop: '12px',
              backgroundColor: 'rgba(13, 13, 13, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-strong)',
              padding: '6px 14px',
              textAlign: 'center',
            }}
          >
            <span className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-primary)', letterSpacing: '0.12em', display: 'block' }}>
              VOID SKULL TEE
            </span>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>
              ₹749 · DROP 01
            </span>
          </div>
        </motion.div>
      </div>

      {/* BACKGROUND — parallax shift on mouse move */}
      <div
        style={{
          position: 'absolute',
          inset: '-3%',
          background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(20,20,20,0.6) 0%, #070707 70%)`,
          transition: 'background 0.8s ease',
        }}
        aria-hidden="true"
      />

      {/* GRID LINES — editorial texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.3,
        }}
        aria-hidden="true"
      />

      {/* LARGE BACKGROUND TEXT */}
      <div
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '-20px',
          fontSize: 'clamp(120px, 20vw, 280px)',
          fontFamily: 'Barlow Condensed, sans-serif',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        OUTSIX
      </div>

      {/* CONTENT */}
      <div
        className="container-outsix relative z-[2] w-full flex flex-col gap-6 py-12 md:py-0 md:pb-[clamp(48px,8vh,96px)]"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="font-editorial" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: '16px' }}>

          </p>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(56px, 11vw, 140px)',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '32px',
            }}
          >
            OUTSIDE<br />THE<br />ORDINARY.
          </h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <Link
              href="/shop"
              data-cursor="shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                backgroundColor: 'var(--text-primary)',
                color: 'var(--background)',
                textDecoration: 'none',
                fontSize: '13px',
                letterSpacing: '0.12em',
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 700,
                transition: 'background-color var(--transition-fast), color var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--background)'; e.currentTarget.style.color = 'var(--text-primary)'; (e.currentTarget as HTMLElement).style.border = '1px solid var(--text-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--background)'; (e.currentTarget as HTMLElement).style.border = 'none'; }}
            >
              SHOP THE DROP <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* MOBILE HERO SHOWCASE GRAPHIC */}
      <div
        className="block md:hidden absolute right-[-20%] top-1/2 -translate-y-1/2 w-[70vw] max-w-[300px] pointer-events-none opacity-30 z-1"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bgrem1.png"
          alt=""
          className="w-full h-auto object-contain -rotate-6 drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* SCROLL INDICATOR — DESKTOP */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
        className="hidden-mobile"
        aria-hidden="true"
      >
        <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--border-strong)' }} />
        <span className="font-editorial" style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.14em', writingMode: 'vertical-lr' }}>
          SCROLL
        </span>
      </motion.div>

      {/* SCROLL CUE — MOBILE ANIMATED CHEVRON */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="block md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-[var(--text-muted)] opacity-70"
        aria-hidden="true"
      >
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}

/* ============================================================
   02 — NEW DROP SECTION
   ============================================================ */
function NewDropSection({ products }: { products: Product[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        padding: 'clamp(64px, 10vh, 128px) 0',
        borderTop: '1px solid var(--border)',
      }}
      aria-labelledby="new-drop-heading"
      role="region"
    >
      <div className="container-outsix">
        {/* HEADER */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '48px',
          }}
        >
          <div>
            <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.16em', marginBottom: '8px' }}>
              SS26
            </p>
            <h2
              id="new-drop-heading"
              className="font-display"
              style={{ fontSize: 'clamp(40px, 6vw, 72px)', color: 'var(--text-primary)', lineHeight: 1 }}
            >
              NEW DROP<br />DROP 01
            </h2>
          </div>
          <Link
            href="/shop"
            className="font-editorial"
            style={{
              fontSize: '11px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            VIEW ALL <ArrowRight size={14} />
          </Link>
        </div>

        <ProductGrid products={products} columns={3} priorityCount={3} />
      </div>
    </motion.div>
  );
}



/* ============================================================
   04 — SHOP BY CATEGORY
   ============================================================ */
const CATEGORIES_DISPLAY = [
  { label: 'TEES', href: '/shop/tees', sub: 'GRAPHIC · OVERSIZED · HEAVYWEIGHT' },
  { label: 'HOODIES', href: '/shop/hoodies', sub: 'HEAVYWEIGHT · ZIP · PULLOVER' },
  { label: 'BOTTOMS', href: '/shop/bottoms', sub: 'CARGO · TRACK · SHORTS' },
  { label: 'ACCESSORIES', href: '/shop/accessories', sub: 'TOTES · HEADWEAR · SOCKS' },
];

function ShopByCategorySection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      style={{ padding: 'clamp(64px, 10vh, 128px) 0', borderTop: '1px solid var(--border)' }}
      aria-labelledby="category-heading"
    >
      <div className="container-outsix">
        <h2
          id="category-heading"
          className="font-editorial"
          style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.16em', marginBottom: '40px' }}
        >
          SHOP BY CATEGORY
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
          {CATEGORIES_DISPLAY.map((cat, i) => (
            <Link
              key={cat.label}
              href={cat.href}
              data-cursor="shop"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '28px 0',
                borderBottom: '1px solid var(--border)',
                textDecoration: 'none',
                transition: 'padding-left var(--transition-base)',
                paddingLeft: hoveredIdx === i ? '16px' : '0',
              }}
            >
              <div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(32px, 5vw, 64px)',
                    color: hoveredIdx === i ? 'var(--text-primary)' : 'var(--text-secondary)',
                    letterSpacing: '-0.01em',
                    transition: 'color var(--transition-fast)',
                    lineHeight: 1,
                  }}
                >
                  {cat.label}
                </h3>
                <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginTop: '4px' }}>
                  {cat.sub}
                </p>
              </div>
              <ArrowUpRight
                size={24}
                color={hoveredIdx === i ? 'var(--text-primary)' : 'var(--text-muted)'}
                style={{ flexShrink: 0, transition: 'color var(--transition-fast)' }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   05 — COLLECTION CAMPAIGNS
   ============================================================ */


/* ============================================================
   06 — BEST SELLERS
   ============================================================ */
function BestSellersSection({ products }: { products: Product[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ padding: 'clamp(64px, 10vh, 128px) 0', borderTop: '1px solid var(--border)' }}
      aria-labelledby="bestsellers-heading"
      role="region"
    >
      <div className="container-outsix">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px' }}>
          <h2 id="bestsellers-heading" className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text-primary)' }}>
            BEST SELLERS
          </h2>
          <Link
            href="/shop"
            className="font-editorial"
            style={{ fontSize: '11px', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            VIEW ALL <ArrowRight size={14} />
          </Link>
        </div>
        <ProductGrid products={products} columns={4} />
      </div>
    </motion.div>
  );
}

/* ============================================================
   07 — BRAND STATEMENT
   ============================================================ */
function BrandStatementSection() {
  return (
    <section
      style={{
        backgroundColor: 'var(--surface)',
        padding: 'clamp(80px, 14vh, 160px) 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}
      aria-label="Brand statement"
    >
      <div className="container-outsix">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="font-display"
          style={{
            fontSize: 'clamp(40px, 7vw, 96px)',
            lineHeight: 0.95,
            color: 'var(--text-primary)',
            maxWidth: '900px',
            margin: '0 auto 32px',
          }}
        >
          FOR THE ONES WHO<br />DON&apos;T FIT THE FRAME.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-editorial"
          style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.2em' }}
        >
          OUTSIX — OUTSIDE THE ORDINARY.
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================================
   08 — SOCIAL GRID
   ============================================================ */
function SocialGridSection() {
  const placeholders = Array.from({ length: 6 });
  return (
    <section
      style={{ padding: 'clamp(64px, 10vh, 128px) 0', borderTop: '1px solid var(--border)' }}
      aria-labelledby="social-heading"
    >
      <div className="container-outsix">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h2
            id="social-heading"
            className="font-editorial"
            style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.16em' }}
          >
            @OUTSIX.IN
          </h2>
          <a
            href="https://instagram.com/outsix.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-editorial"
            style={{ fontSize: '11px', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            INSTAGRAM <ArrowUpRight size={12} />
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' }}>
          {placeholders.map((_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: '1',
                backgroundColor: '#0A0A0A',
                overflow: 'hidden',
                cursor: 'none',
                transition: 'opacity var(--transition-fast)',
              }}
              data-cursor="view"
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={i % 2 === 0 ? '/ed2.jpeg' : '/eg1.jpeg'} alt="OUTSIX Instagram" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          section[aria-labelledby="social-heading"] .container-outsix > div:last-child {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ============================================================
   09 — NEWSLETTER
   ============================================================ */
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      style={{
        backgroundColor: 'var(--surface)',
        padding: 'clamp(64px, 10vh, 128px) 0',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}
      aria-labelledby="newsletter-heading"
    >
      <div className="container-outsix" style={{ maxWidth: '560px', margin: '0 auto' }}>
        {submitted ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-display" style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '8px' }}>
              YOU&apos;RE OUTSIDE.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>
              Drop alerts incoming.
            </p>
          </motion.div>
        ) : (
          <>
            <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.16em', marginBottom: '16px' }}>
              DROP ALERTS
            </p>
            <h2
              id="newsletter-heading"
              className="font-display"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-primary)', marginBottom: '8px' }}
            >
              STAY OUTSIDE.
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'Inter', marginBottom: '32px' }}>
              Drop alerts. No spam.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                gap: '0',
                border: '1px solid var(--border-strong)',
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                required
                aria-label="Email address for newsletter"
                className="font-editorial"
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  padding: '14px 16px',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: 'var(--text-primary)',
                }}
              />
              <button
                type="submit"
                className="font-editorial"
                style={{
                  padding: '14px 20px',
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--background)',
                  border: 'none',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  cursor: 'none',
                  transition: 'opacity var(--transition-fast)',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                JOIN
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
