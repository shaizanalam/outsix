import type { Metadata } from 'next';
import Link from 'next/link';
import { Package, Heart, User, MapPin, Settings, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Account — OUTSIX',
  description: 'Your OUTSIX account',
};

const ACCOUNT_LINKS = [
  { href: '/account/orders', icon: Package, label: 'ORDERS', desc: 'Track and view your orders' },
  { href: '/wishlist', icon: Heart, label: 'WISHLIST', desc: 'Your saved items' },
  { href: '/account/profile', icon: User, label: 'PROFILE', desc: 'Your personal details' },
  { href: '/account/addresses', icon: MapPin, label: 'ADDRESSES', desc: 'Saved delivery addresses' },
  { href: '/account/settings', icon: Settings, label: 'SETTINGS', desc: 'Preferences and notifications' },
];

export default function AccountPage() {
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(32px, 5vh, 64px) 0 24px', backgroundColor: 'var(--surface)' }}>
        <div className="container-outsix">
          <p className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1 }}>
            WELCOME BACK.
          </p>
        </div>
      </div>

      <div className="container-outsix" style={{ paddingTop: '48px', paddingBottom: '96px', maxWidth: '640px' }}>
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
      </div>
    </div>
  );
}
