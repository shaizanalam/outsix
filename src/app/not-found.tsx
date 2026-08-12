import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        paddingTop: '72px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{ padding: '48px 24px' }}>
        <p className="font-display" style={{ fontSize: 'clamp(80px, 15vw, 180px)', color: 'var(--surface-elevated)', lineHeight: 1, userSelect: 'none' }}>
          404
        </p>
        <h1 className="font-display" style={{ fontSize: 'clamp(24px, 4vw, 48px)', color: 'var(--text-primary)', marginTop: '-20px', marginBottom: '12px' }}>
          THAT DIDN&apos;T WORK.
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'Inter', marginBottom: '32px' }}>
          The page you&apos;re looking for is outside our reach.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            backgroundColor: 'var(--text-primary)',
            color: 'var(--background)',
            textDecoration: 'none',
            fontSize: '12px',
            letterSpacing: '0.12em',
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 700,
          }}
        >
          BACK TO OUTSIX <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
