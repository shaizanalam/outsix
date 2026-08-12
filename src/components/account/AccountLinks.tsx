'use client';

import Link from 'next/link';
import { Package, Heart, User, MapPin, Settings, ArrowRight } from 'lucide-react';

const ACCOUNT_LINKS = [
  { href: '/account/orders', icon: Package, label: 'ORDERS', desc: 'Track and view your orders' },
  { href: '/wishlist', icon: Heart, label: 'WISHLIST', desc: 'Your saved items' },
  { href: '/account/profile', icon: User, label: 'PROFILE', desc: 'Your personal details' },
  { href: '/account/addresses', icon: MapPin, label: 'ADDRESSES', desc: 'Saved delivery addresses' },
  { href: '/account/settings', icon: Settings, label: 'SETTINGS', desc: 'Preferences and notifications' },
];

export function AccountLinks() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {ACCOUNT_LINKS.map(({ href, icon: Icon, label, desc }) => (
        <Link
          key={href}
          href={href}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '24px 0',
            borderBottom: '1px solid var(--border)',
            textDecoration: 'none',
            transition: 'padding-left var(--transition-base)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '8px')}
          onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '0')}
        >
          <Icon size={18} color="var(--text-muted)" strokeWidth={1.5} />
          <div style={{ flex: 1 }}>
            <p className="font-editorial" style={{ fontSize: '13px', color: 'var(--text-primary)', letterSpacing: '0.08em', marginBottom: '2px' }}>{label}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>{desc}</p>
          </div>
          <ArrowRight size={16} color="var(--text-muted)" />
        </Link>
      ))}
    </div>
  );
}
