'use client';

import Link from 'next/link';
import { LOGO_BASE64 } from './LogoData';

type LogoProps = {
  height?: number;
  className?: string;
  onClick?: () => void;
};

export function Logo({ height = 36, className = '', onClick }: LogoProps) {
  // Use embedded Base64 image data first so Vercel CDN never requires an external file
  const logoSource = LOGO_BASE64 || '/logo.jpeg';

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
        src={logoSource}
        alt="OUTSIX"
        onError={(e) => {
          // Fallback if image fails
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
      {/* FALLBACK BRANDING */}
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
