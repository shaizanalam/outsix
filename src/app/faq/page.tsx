'use client';
import { useState } from 'react';

const FAQS = [
  { q: 'What sizes do you carry?', a: 'We carry XS to XXL across most products. Sizing runs oversized — check our Size Guide for measurements.' },
  { q: 'How long does delivery take?', a: 'Standard delivery takes 3–7 business days. Express delivery (1–3 days) is available in select cities.' },
  { q: 'Do you ship internationally?', a: 'We currently ship across India. International shipping is coming soon.' },
  { q: 'Can I return a product?', a: 'Yes. We accept returns within 7 days of delivery on unused, unwashed items with original tags. Sale items are non-returnable.' },
  { q: 'How do I track my order?', a: 'Once dispatched, you\'ll receive a tracking link via email. You can also view orders from your account.' },
  { q: 'Are the garments true to size?', a: 'OUTSIX is intentionally oversized. If you prefer a closer fit, size down. Check our Size Guide for exact measurements.' },
  { q: 'What is the material used?', a: 'We use heavyweight cotton (240–300 GSM) for tees and 380–500 GSM French terry for hoodies. Each product page lists exact material information.' },
  { q: 'How do I care for my OUTSIX garment?', a: 'Machine wash cold, inside out. Do not tumble dry. Iron on low heat, inside out. Do not bleach.' },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--border)', padding: '40px 0 24px', backgroundColor: 'var(--surface)' }}>
        <div className="container-outsix">
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text-primary)' }}>FAQ</h1>
        </div>
      </div>
      <div className="container-outsix" style={{ paddingTop: '48px', paddingBottom: '96px', maxWidth: '720px' }}>
        {FAQS.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '20px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <span style={{ fontSize: '15px', color: 'var(--text-primary)', fontFamily: 'Inter', fontWeight: 500 }}>{faq.q}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '20px', flexShrink: 0, lineHeight: 1 }}>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontFamily: 'Inter', lineHeight: 1.7, paddingBottom: '20px' }}>
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
