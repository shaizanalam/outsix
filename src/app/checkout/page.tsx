'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/navigation';

type FormData = {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  upiId: string;
};

const STATES = [
  'Andhra Pradesh', 'Delhi', 'Goa', 'Gujarat', 'Karnataka',
  'Kerala', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu',
  'Telangana', 'Uttar Pradesh', 'West Bengal',
];

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const [form, setForm] = useState<FormData>({
    email: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi',
    upiId: '',
  });

  const subtotal = getSubtotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const set = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: '' }));
  };

  const validateStep1 = () => {
    const e: Partial<FormData> = {};
    if (!form.email.includes('@')) e.email = 'ENTER A VALID EMAIL';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Partial<FormData> = {};
    if (!form.fullName.trim()) e.fullName = 'REQUIRED';
    if (form.phone.length < 10) e.phone = 'ENTER A VALID PHONE NUMBER';
    if (!form.address.trim()) e.address = 'REQUIRED';
    if (!form.city.trim()) e.city = 'REQUIRED';
    if (!form.state) e.state = 'REQUIRED';
    if (form.pincode.length !== 6) e.pincode = 'ENTER A VALID PINCODE';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1800));
    clearCart();
    router.push('/checkout/success');
  };

  if (items.length === 0) {
    return (
      <div style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <p className="font-display" style={{ fontSize: '28px', color: 'var(--text-secondary)' }}>YOUR BAG IS EMPTY.</p>
        <Link href="/shop" style={{ color: 'var(--text-primary)', fontFamily: 'Inter', textDecoration: 'underline' }}>Shop the drop</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* DEMO MODE BANNER */}
      <div style={{ backgroundColor: 'rgba(245,158,11,0.15)', borderBottom: '1px solid rgba(245,158,11,0.3)', padding: '10px 0', textAlign: 'center' }}>
        <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--warning)', letterSpacing: '0.12em' }}>
          DEMO MODE — NO REAL PAYMENT WILL BE PROCESSED
        </p>
      </div>

      <div
        className="container-outsix"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '64px',
          paddingTop: '48px',
          paddingBottom: '96px',
          alignItems: 'start',
        }}
      >
        {/* FORM COLUMN */}
        <div>
          {/* HEADER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <Link href="/" className="font-display" style={{ fontSize: '18px', letterSpacing: '0.12em', color: 'var(--text-primary)', textDecoration: 'none' }}>
              OUTSIX
            </Link>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span className="font-editorial" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>CHECKOUT</span>
          </div>

          {/* STEP INDICATORS */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', alignItems: 'center' }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: step >= s ? 'var(--text-primary)' : 'var(--surface-elevated)',
                    border: '1px solid',
                    borderColor: step >= s ? 'var(--text-primary)' : 'var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: step >= s ? 'var(--background)' : 'var(--text-muted)',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {s}
                </div>
                <span className="font-editorial" style={{ fontSize: '10px', color: step === s ? 'var(--text-primary)' : 'var(--text-muted)', letterSpacing: '0.1em' }}>
                  {['CONTACT', 'DELIVERY', 'PAYMENT'][s - 1]}
                </span>
                {s < 3 && <div style={{ width: '24px', height: '1px', backgroundColor: 'var(--border)' }} />}
              </div>
            ))}
          </div>

          {/* STEP 1 — CONTACT */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Section title="CONTACT">
                  <Field
                    label="EMAIL"
                    value={form.email}
                    onChange={(v) => set('email', v)}
                    type="email"
                    placeholder="your@email.com"
                    error={errors.email}
                    required
                  />
                </Section>
                <button
                  onClick={() => { if (validateStep1()) setStep(2); }}
                  style={primaryBtnStyle}
                >
                  CONTINUE TO DELIVERY <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {/* STEP 2 — DELIVERY */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Section title="DELIVERY">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Field label="FULL NAME" value={form.fullName} onChange={(v) => set('fullName', v)} placeholder="Name Surname" error={errors.fullName} required style={{ gridColumn: 'span 2' }} />
                    <Field label="PHONE" value={form.phone} onChange={(v) => set('phone', v)} type="tel" placeholder="10-digit mobile" error={errors.phone} required style={{ gridColumn: 'span 2' }} />
                    <Field label="ADDRESS" value={form.address} onChange={(v) => set('address', v)} placeholder="Street, Building, Apartment" error={errors.address} required style={{ gridColumn: 'span 2' }} />
                    <Field label="CITY" value={form.city} onChange={(v) => set('city', v)} placeholder="Mumbai" error={errors.city} required />
                    <div>
                      <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '8px' }}>STATE *</p>
                      <select
                        value={form.state}
                        onChange={(e) => set('state', e.target.value)}
                        style={{ ...inputStyle, width: '100%' }}
                        aria-label="State"
                      >
                        <option value="" style={{ backgroundColor: '#0D0D0D' }}>Select state</option>
                        {STATES.map((s) => <option key={s} value={s} style={{ backgroundColor: '#0D0D0D' }}>{s}</option>)}
                      </select>
                      {errors.state && <p style={errorStyle}>{errors.state}</p>}
                    </div>
                    <Field label="PINCODE" value={form.pincode} onChange={(v) => set('pincode', v.slice(0, 6))} placeholder="400001" error={errors.pincode} required maxLength={6} />
                  </div>
                </Section>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setStep(1)} style={secondaryBtnStyle}>BACK</button>
                  <button onClick={() => { if (validateStep2()) setStep(3); }} style={{ ...primaryBtnStyle, flex: 1 }}>
                    CONTINUE TO PAYMENT <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — PAYMENT */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Section title="PAYMENT">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { value: 'upi', label: 'UPI', desc: 'Pay via UPI ID or QR' },
                      { value: 'card', label: 'CARD', desc: 'Credit or debit card' },
                      { value: 'netbanking', label: 'NET BANKING', desc: 'All major banks' },
                      { value: 'cod', label: 'CASH ON DELIVERY', desc: '+₹50 COD fee' },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '16px',
                          border: '1px solid',
                          borderColor: form.paymentMethod === opt.value ? 'var(--text-primary)' : 'var(--border)',
                          cursor: 'none',
                          transition: 'border-color var(--transition-fast)',
                        }}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={opt.value}
                          checked={form.paymentMethod === (opt.value as CheckoutFormState['paymentMethod'])}
                          onChange={() => set('paymentMethod', opt.value as CheckoutFormState['paymentMethod'])}
                          style={{ accentColor: 'var(--text-primary)' }}
                        />
                        <div>
                          <p className="font-editorial" style={{ fontSize: '12px', color: 'var(--text-primary)', letterSpacing: '0.08em' }}>{opt.label}</p>
                          <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {form.paymentMethod === 'upi' && (
                    <div style={{ marginTop: '16px' }}>
                      <Field label="UPI ID" value={form.upiId} onChange={(v) => set('upiId', v)} placeholder="yourname@upi" />
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px', color: 'var(--text-muted)' }}>
                    <Lock size={12} />
                    <span style={{ fontSize: '11px', fontFamily: 'Inter' }}>
                      DEMO MODE — No real charges will be applied
                    </span>
                  </div>
                </Section>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setStep(2)} style={secondaryBtnStyle}>BACK</button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={processing}
                    style={{ ...primaryBtnStyle, flex: 1, opacity: processing ? 0.7 : 1 }}
                  >
                    {processing ? 'PROCESSING...' : `PLACE ORDER — ₹${total.toLocaleString('en-IN')}`}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ORDER SUMMARY COLUMN */}
        <div
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '24px',
            position: 'sticky',
            top: '80px',
          }}
        >
          <h2 className="font-editorial" style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'var(--text-primary)', marginBottom: '20px' }}>
            ORDER SUMMARY
          </h2>

          {/* ITEMS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div
                  style={{
                    width: '56px',
                    height: '70px',
                    backgroundColor: '#0A0A0A',
                    flexShrink: 0,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image || '/ed2.jpeg'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      backgroundColor: 'var(--text-primary)',
                      color: 'var(--background)',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      fontFamily: 'Inter',
                    }}
                  >
                    {item.quantity}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="font-editorial truncate-1" style={{ fontSize: '11px', color: 'var(--text-primary)', letterSpacing: '0.06em' }}>{item.name}</p>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>Size: {item.size}</p>
                </div>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'Inter', flexShrink: 0 }}>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* TOTALS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'Inter' }}>Subtotal</span>
              <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontFamily: 'Inter' }}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'Inter' }}>Shipping</span>
              <span style={{ fontSize: '12px', fontFamily: 'Inter', color: shipping === 0 ? 'var(--success)' : 'var(--text-secondary)' }}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>
            <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="font-editorial" style={{ fontSize: '13px', color: 'var(--text-primary)', letterSpacing: '0.08em' }}>TOTAL</span>
              <span className="font-display" style={{ fontSize: '20px', color: 'var(--text-primary)' }}>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* TRUST BADGES */}
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
              <Shield size={12} />
              <span style={{ fontSize: '11px', fontFamily: 'Inter' }}>Secure checkout</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
              <Lock size={12} />
              <span style={{ fontSize: '11px', fontFamily: 'Inter' }}>7-day easy returns</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .container-outsix > [style*="grid-template-columns: 1fr 380px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const primaryBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  width: '100%',
  padding: '16px',
  backgroundColor: 'var(--text-primary)',
  color: 'var(--background)',
  border: 'none',
  fontSize: '13px',
  letterSpacing: '0.12em',
  fontFamily: 'Barlow Condensed, sans-serif',
  fontWeight: 700,
  cursor: 'none',
  marginTop: '24px',
};

const secondaryBtnStyle: React.CSSProperties = {
  padding: '16px 20px',
  backgroundColor: 'transparent',
  color: 'var(--text-secondary)',
  border: '1px solid var(--border-strong)',
  fontSize: '12px',
  letterSpacing: '0.1em',
  fontFamily: 'Barlow Condensed, sans-serif',
  fontWeight: 700,
  cursor: 'none',
  marginTop: '24px',
  flexShrink: 0,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'transparent',
  border: '1px solid var(--border)',
  padding: '12px 14px',
  fontSize: '13px',
  color: 'var(--text-primary)',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
};

const errorStyle: React.CSSProperties = {
  fontSize: '10px',
  color: 'var(--destructive)',
  fontFamily: 'Barlow Condensed, sans-serif',
  letterSpacing: '0.1em',
  marginTop: '4px',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 className="font-editorial" style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({
  label, value, onChange, type = 'text', placeholder, error, required, style: fieldStyle, maxLength,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; error?: string; required?: boolean; style?: React.CSSProperties; maxLength?: number;
}) {
  return (
    <div style={fieldStyle}>
      <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '8px' }}>
        {label} {required && '*'}
      </p>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        aria-label={label}
        style={{
          ...inputStyle,
          borderColor: error ? 'var(--destructive)' : 'var(--border)',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--border-strong)')}
        onBlur={(e) => (e.target.style.borderColor = error ? 'var(--destructive)' : 'var(--border)')}
      />
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}
