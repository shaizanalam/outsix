import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Returns — OUTSIX' };

export default function ReturnsPage() {
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--border)', padding: '40px 0 24px', backgroundColor: 'var(--surface)' }}>
        <div className="container-outsix">
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text-primary)' }}>RETURNS</h1>
        </div>
      </div>
      <div className="container-outsix" style={{ paddingTop: '48px', paddingBottom: '96px', maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Section title="RETURN POLICY">
          <p style={body}>We accept returns within 7 days of delivery. Items must be unused, unwashed, and in original condition with all tags attached.</p>
        </Section>
        <Section title="NON-RETURNABLE ITEMS">
          <p style={body}>Sale items, accessories (socks, lanyards), and items marked as final sale cannot be returned.</p>
        </Section>
        <Section title="HOW TO RETURN">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Raise a return request via your account within 7 days.', 'Pack the item securely in its original packaging.', 'Schedule a pickup or drop off at your nearest courier partner.', 'Refund will be processed within 5–7 business days of receipt.'].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px' }}>
                <span className="font-display" style={{ fontSize: '20px', color: 'var(--text-muted)', width: '28px', flexShrink: 0 }}>{i + 1}</span>
                <p style={body}>{s}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="QUESTIONS?">
          <p style={body}>Get in touch at <Link href="/contact" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>contact</Link> or email us at returns@outsix.in</p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-editorial" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

const body: React.CSSProperties = { fontSize: '14px', color: 'var(--text-secondary)', fontFamily: 'Inter', lineHeight: 1.7 };
