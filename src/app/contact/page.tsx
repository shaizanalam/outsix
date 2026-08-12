'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--border)', padding: '40px 0 24px', backgroundColor: 'var(--surface)' }}>
        <div className="container-outsix">
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text-primary)' }}>CONTACT</h1>
        </div>
      </div>
      <div className="container-outsix grid grid-cols-1 md:grid-cols-2 gap-16 pt-12 pb-24 max-w-[1000px]">
        {/* INFO */}
        <div>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', fontFamily: 'Inter', lineHeight: 1.7, marginBottom: '40px' }}>
            Got a question? We&apos;re outside. But we&apos;ll get back to you.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '4px' }}>EMAIL</p>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontFamily: 'Inter' }}>hello@outsix.in</p>
            </div>
            <div>
              <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '4px' }}>RESPONSE TIME</p>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontFamily: 'Inter' }}>Within 24–48 hours</p>
            </div>
            <div>
              <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '4px' }}>INSTAGRAM</p>
              <a href="https://instagram.com/outsix.in" style={{ fontSize: '14px', color: 'var(--text-secondary)', fontFamily: 'Inter', textDecoration: 'underline' }}>@outsix.in</a>
            </div>
          </div>
        </div>

        {/* FORM */}
        {sent ? (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
            <p className="font-display" style={{ fontSize: '28px', color: 'var(--text-primary)' }}>MESSAGE SENT.</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>We&apos;ll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { key: 'name', label: 'NAME', type: 'text', placeholder: 'Your name' },
              { key: 'email', label: 'EMAIL', type: 'email', placeholder: 'your@email.com' },
              { key: 'subject', label: 'SUBJECT', type: 'text', placeholder: 'What\'s this about?' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '8px' }}>{label}</p>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => set(key as keyof typeof form, e.target.value)}
                  placeholder={placeholder}
                  required
                  style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid var(--border)', padding: '12px 14px', fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'Inter', outline: 'none' }}
                />
              </div>
            ))}
            <div>
              <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '8px' }}>MESSAGE</p>
              <textarea
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
                placeholder="Your message"
                required
                rows={5}
                style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid var(--border)', padding: '12px 14px', fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'Inter', outline: 'none', resize: 'vertical' }}
              />
            </div>
            <button
              type="submit"
              style={{ padding: '14px', backgroundColor: 'var(--text-primary)', color: 'var(--background)', border: 'none', fontSize: '12px', letterSpacing: '0.12em', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, cursor: 'pointer' }}
            >
              SEND MESSAGE
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
