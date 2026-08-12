'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';

const FOOTER_SECTIONS = [
  {
    title: 'SHOP',
    links: [
      { href: '/shop', label: 'NEW DROP' },
      { href: '/shop/tees', label: 'TEES' },
      { href: '/shop/hoodies', label: 'HOODIES' },
      { href: '/shop/bottoms', label: 'BOTTOMS' },
      { href: '/shop/accessories', label: 'ACCESSORIES' },
    ],
  },
  {
    title: 'HELP',
    links: [
      { href: '/shipping', label: 'SHIPPING' },
      { href: '/returns', label: 'RETURNS' },
      { href: '/size-guide', label: 'SIZE GUIDE' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'CONTACT' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { href: '/about', label: 'ABOUT' },
      { href: '/contact', label: 'CONTACT' },
      { href: '/admin', label: 'ADMIN PORTAL' },
    ],
  },
  {
    title: 'SOCIAL',
    links: [
      { href: 'https://instagram.com/outsix.in', label: 'INSTAGRAM' },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer
      style={{
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        paddingTop: '80px',
        paddingBottom: '40px',
      }}
    >
      <div className="container-outsix">
        {/* TOP ROW */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '48px',
            paddingBottom: '64px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {/* BRAND COLUMN */}
          <div style={{ gridColumn: 'span 1' }}>
            <Logo height={40} className="mb-4" />
            <p
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                lineHeight: '1.7',
                maxWidth: '200px',
              }}
            >
              FOR THE ONES WHO DON&apos;T FIT THE FRAME.
            </p>
          </div>

          {/* LINK COLUMNS */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3
                className="font-editorial"
                style={{
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  marginBottom: '20px',
                }}
              >
                {section.title}
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-editorial"
                      style={{
                        fontSize: '11px',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        letterSpacing: '0.08em',
                        transition: 'color var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM ROW */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '32px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p
            className="font-editorial"
            style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}
          >
            © 2026 OUTSIX. ALL RIGHTS RESERVED.
          </p>
          <p
            className="font-editorial"
            style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}
          >
            OUTSIDE THE ORDINARY.
          </p>
        </div>
      </div>
    </footer>
  );
}
