'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutSuccessPage() {
  const orderNum = `OSX-${String(Math.floor(Math.random() * 9000) + 1000)}`;

  return (
    <div
      style={{
        paddingTop: '72px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--background)',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '48px 24px',
          maxWidth: '560px',
          width: '100%',
        }}
      >
        {/* CHECK ICON */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
          style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              border: '1px solid var(--border-strong)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--success)',
            }}
          >
            <CheckCircle size={32} strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: '12px' }}>
            ORDER CONFIRMED
          </p>
          <h1
            className="font-display"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: 'var(--text-primary)', lineHeight: 0.95, marginBottom: '16px' }}
          >
            ORDER<br />CONFIRMED.
          </h1>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              fontFamily: 'Inter',
              lineHeight: 1.7,
              marginBottom: '8px',
            }}
          >
            THANK YOU FOR BEING OUTSIDE.
          </p>
          <p
            className="font-editorial"
            style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '40px' }}
          >
            ORDER #{orderNum}
          </p>

          <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'Inter', marginBottom: '32px' }}>
            A confirmation will be sent to your email. Your order will be dispatched within 1–2 business days.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/account/orders"
              style={{
                padding: '14px 24px',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '12px',
                letterSpacing: '0.12em',
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color var(--transition-fast), border-color var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
            >
              VIEW ORDER
            </Link>
            <Link
              href="/shop"
              style={{
                padding: '14px 24px',
                backgroundColor: 'var(--text-primary)',
                color: 'var(--background)',
                textDecoration: 'none',
                fontSize: '12px',
                letterSpacing: '0.12em',
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              CONTINUE SHOPPING <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
