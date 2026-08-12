import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shipping — OUTSIX' };

export default function ShippingPage() {
  return (
    <InfoPage title="SHIPPING">
      <InfoSection title="DELIVERY TIMES">
        <InfoRow label="Standard" value="3–7 business days" />
        <InfoRow label="Express" value="1–3 business days (select cities)" />
        <InfoRow label="Free shipping" value="On orders above ₹999" />
        <InfoRow label="Standard shipping" value="₹99" />
      </InfoSection>
      <InfoSection title="LOCATIONS">
        <p style={bodyStyle}>We currently ship across all major cities in India. International shipping coming soon.</p>
      </InfoSection>
      <InfoSection title="ORDER TRACKING">
        <p style={bodyStyle}>Once your order is dispatched, you&apos;ll receive a tracking link via email. Track your order via your account.</p>
      </InfoSection>
    </InfoPage>
  );
}

function InfoPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--border)', padding: '40px 0 24px', backgroundColor: 'var(--surface)' }}>
        <div className="container-outsix">
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text-primary)' }}>{title}</h1>
        </div>
      </div>
      <div className="container-outsix" style={{ paddingTop: '48px', paddingBottom: '96px', maxWidth: '640px' }}>{children}</div>
    </div>
  );
}

function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 className="font-editorial" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: '24px', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'Inter', width: '160px', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'Inter' }}>{value}</span>
    </div>
  );
}

const bodyStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--text-secondary)', fontFamily: 'Inter', lineHeight: 1.7 };
