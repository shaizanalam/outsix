import type { Metadata } from 'next';
import { AccountLinks } from '@/components/account/AccountLinks';

export const metadata: Metadata = {
  title: 'Account — OUTSIX',
  description: 'Your OUTSIX account',
};

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
        <AccountLinks />
      </div>
    </div>
  );
}
