'use client';

import Link from 'next/link';

type LogoProps = {
  height?: number;
  className?: string;
  onClick?: () => void;
};

export function Logo({ height = 36, className = '', onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="OUTSIX Home"
      className={`inline-flex items-center no-underline ${className}`}
      style={{ height: `${height}px` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.jpeg"
        alt="OUTSIX"
        onError={(e) => {
          // Robust fallback if image isn't found
          const target = e.currentTarget as HTMLElement;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }}
        style={{
          height: '100%',
          width: 'auto',
          objectFit: 'contain',
          mixBlendMode: 'screen',
        }}
      />
      {/* FALLBACK BRANDING IF LOGO FILE IS MISSING */}
      <span
        style={{
          display: 'none',
          alignItems: 'center',
          fontFamily: 'Barlow Condensed, sans-serif',
          fontWeight: 900,
          fontSize: '22px',
          letterSpacing: '0.14em',
          color: 'var(--text-primary)',
        }}
      >
        OUTSIX
      </span>
    </Link>
  );
}
