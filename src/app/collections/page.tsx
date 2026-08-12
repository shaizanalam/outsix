import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '@/data/products';

export const metadata: Metadata = {
  title: 'Collections — OUTSIX',
  description: 'Shop all OUTSIX collections. DROP 01, DROP 02 and Archive.',
};

export default function CollectionsPage() {
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(32px, 5vh, 64px) 0 24px', backgroundColor: 'var(--surface)' }}>
        <div className="container-outsix">
          <h1 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', color: 'var(--text-primary)', lineHeight: 1 }}>
            COLLECTIONS
          </h1>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {COLLECTIONS.slice(0, 3).map((col, i) => (
          <div
            key={col.id}
            style={{
              display: 'grid',
              gridTemplateColumns: i % 2 === 0 ? '3fr 2fr' : '2fr 3fr',
              minHeight: '60vh',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                order: i % 2 === 0 ? 0 : 1,
                backgroundColor: '#080808',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '360px',
              }}
              data-cursor="view"
            >
              <span className="font-display" style={{ fontSize: '20px', color: '#111', letterSpacing: '0.12em' }}>OUTSIX</span>
            </div>
            <div
              style={{
                order: i % 2 === 0 ? 1 : 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 'clamp(32px, 5vw, 64px)',
                backgroundColor: 'var(--surface)',
              }}
            >
              <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.16em', marginBottom: '12px' }}>{col.season}</p>
              <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text-primary)', lineHeight: 0.95, marginBottom: '12px' }}>
                {col.name}
              </h2>
              <p className="font-editorial" style={{ fontSize: '14px', color: 'var(--text-secondary)', letterSpacing: '0.04em', marginBottom: '16px' }}>
                {col.subtitle}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'Inter', lineHeight: 1.6, marginBottom: '28px', maxWidth: '300px' }}>
                {col.description}
              </p>
              <Link
                href={`/collections/${col.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                }}
              >
                EXPLORE {col.name} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          div > div > div[style*="3fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
