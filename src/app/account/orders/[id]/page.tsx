import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Order OSX-1042 — OUTSIX' };

type Props = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--border)', padding: '40px 0 24px', backgroundColor: 'var(--surface)' }}>
        <div className="container-outsix">
          <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '8px' }}>ORDERS</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-primary)' }}>ORDER #{id}</h1>
        </div>
      </div>
      <div className="container-outsix" style={{ paddingTop: '48px', paddingBottom: '96px', maxWidth: '640px' }}>
        {/* STATUS TIMELINE */}
        <div style={{ marginBottom: '40px' }}>
          <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '20px' }}>STATUS</p>
          {[
            { label: 'ORDER PLACED', date: '11 Aug 2026, 10:32 AM', done: true },
            { label: 'PAYMENT CONFIRMED', date: '11 Aug 2026, 10:33 AM', done: true },
            { label: 'DISPATCHED', date: '12 Aug 2026, 3:00 PM', done: true },
            { label: 'DELIVERED', date: '14 Aug 2026', done: false },
          ].map((step, i, arr) => (
            <div key={step.label} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0, marginTop: '3px',
                  backgroundColor: step.done ? 'var(--text-primary)' : 'var(--surface-elevated)',
                  border: step.done ? '1px solid var(--text-primary)' : '1px solid var(--border)',
                }} />
                {i < arr.length - 1 && <div style={{ width: '1px', flex: 1, backgroundColor: 'var(--border)', margin: '4px 0', minHeight: '32px' }} />}
              </div>
              <div style={{ paddingBottom: '20px' }}>
                <p className="font-editorial" style={{ fontSize: '12px', color: step.done ? 'var(--text-primary)' : 'var(--text-muted)', letterSpacing: '0.08em' }}>{step.label}</p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Inter', marginTop: '2px' }}>{step.date}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>
          Full order details will be available with backend integration.
        </p>
      </div>
    </div>
  );
}
