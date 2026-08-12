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

  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    cardExp: '',
    cardCvv: '',
    cardName: '',
  });

  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);

  const subtotal = getSubtotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const set = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: '' }));
  };

  const formatCardNumber = (val: string) => {
    const v = val.replace(/\D/g, '').slice(0, 16);
    return v.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatCardExp = (val: string) => {
    const v = val.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) return `${v.slice(0, 2)}/${v.slice(2)}`;
    return v;
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
    if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'ENTER A VALID 10-DIGIT MOBILE NUMBER';
    if (!form.address.trim()) e.address = 'REQUIRED';
    if (!form.city.trim()) e.city = 'REQUIRED';
    if (!form.state) e.state = 'REQUIRED';
    if (form.pincode.replace(/\D/g, '').length !== 6) e.pincode = 'ENTER A VALID 6-DIGIT PINCODE';
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
      <div style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', paddingLeft: '16px', paddingRight: '16px' }}>
        <p className="font-display" style={{ fontSize: '28px', color: 'var(--text-secondary)' }}>YOUR BAG IS EMPTY.</p>
        <Link href="/shop" style={{ color: 'var(--text-primary)', fontFamily: 'Inter', textDecoration: 'underline' }}>Shop the drop</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* DEMO MODE BANNER */}
      <div style={{ backgroundColor: 'rgba(245,158,11,0.15)', borderBottom: '1px solid rgba(245,158,11,0.3)', padding: '10px 16px', textAlign: 'center' }}>
        <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--warning)', letterSpacing: '0.12em' }}>
          DEMO MODE — NO REAL PAYMENT WILL BE PROCESSED
        </p>
      </div>

      {/* MOBILE ORDER SUMMARY ACCORDION TOGGLE */}
      <div className="block lg:hidden border-b border-[var(--border)] bg-[var(--surface)]">
        <button
          onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
          className="w-full flex items-center justify-between px-6 py-4 text-left"
          aria-expanded={orderSummaryOpen}
        >
          <div className="flex items-center gap-2">
            <span className="font-editorial text-xs text-[var(--text-primary)] tracking-widest">
              {orderSummaryOpen ? 'HIDE ORDER SUMMARY' : 'SHOW ORDER SUMMARY'}
            </span>
            <span className="text-xs text-[var(--text-muted)]">({items.length} items)</span>
          </div>
          <span className="font-display text-base text-[var(--text-primary)]">
            ₹{total.toLocaleString('en-IN')}
          </span>
        </button>

        <AnimatePresence>
          {orderSummaryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden px-6 pb-6 border-t border-[var(--border)]"
            >
              <div className="flex flex-col gap-4 mt-4 mb-4">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3">
                    <div className="w-12 h-14 bg-[#0A0A0A] relative flex-shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image || '/ed2.jpeg'} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[var(--text-primary)] text-[var(--background)] text-[9px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-editorial text-xs text-[var(--text-primary)] truncate">{item.name}</p>
                      <p className="text-[11px] text-[var(--text-muted)]">Size: {item.size}</p>
                    </div>
                    <span className="text-xs text-[var(--text-primary)] font-medium">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-[var(--text-secondary)] py-1">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-[var(--text-secondary)] py-1">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-[var(--success)]' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="container-outsix grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-16 items-start py-8 lg:py-16"
      >
        {/* FORM COLUMN */}
        <div className="w-full">
          {/* HEADER */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="font-display text-lg tracking-widest text-[var(--text-primary)] no-underline">
              OUTSIX
            </Link>
            <span className="text-[var(--border)]">/</span>
            <span className="font-editorial text-xs text-[var(--text-muted)] tracking-wider">CHECKOUT</span>
          </div>

          {/* STEP INDICATORS */}
          <div className="flex items-center gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-semibold transition-all ${
                    step >= s
                      ? 'bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--background)]'
                      : 'bg-[var(--surface-elevated)] border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  {s}
                </div>
                <span className={`font-editorial text-[10px] sm:text-xs tracking-wider ${step === s ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                  {['CONTACT', 'DELIVERY', 'PAYMENT'][s - 1]}
                </span>
                {s < 3 && <div className="w-4 sm:w-8 h-[1px] bg-[var(--border)]" />}
              </div>
            ))}
          </div>

          {/* STEP 1 — CONTACT */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Section title="CONTACT">
                  <Field
                    label="EMAIL ADDRESS"
                    value={form.email}
                    onChange={(v) => set('email', v)}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
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
                <Section title="DELIVERY ADDRESS">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="FULL NAME"
                      value={form.fullName}
                      onChange={(v) => set('fullName', v)}
                      autoComplete="name"
                      placeholder="First and last name"
                      error={errors.fullName}
                      required
                      className="col-span-1 sm:col-span-2"
                    />
                    <Field
                      label="MOBILE PHONE"
                      value={form.phone}
                      onChange={(v) => set('phone', v)}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="10-digit mobile number"
                      error={errors.phone}
                      required
                    />
                    <Field
                      label="STREET ADDRESS"
                      value={form.address}
                      onChange={(v) => set('address', v)}
                      autoComplete="street-address"
                      placeholder="House/Flat No., Street, Area"
                      error={errors.address}
                      required
                    />
                    <Field
                      label="CITY"
                      value={form.city}
                      onChange={(v) => set('city', v)}
                      autoComplete="address-level2"
                      placeholder="City"
                      error={errors.city}
                      required
                    />
                    <div>
                      <p className="font-editorial text-xs text-[var(--text-muted)] tracking-wider mb-2">STATE *</p>
                      <select
                        value={form.state}
                        onChange={(e) => set('state', e.target.value)}
                        style={{ ...inputStyle, width: '100%' }}
                        aria-label="State"
                        autoComplete="address-level1"
                      >
                        <option value="" style={{ backgroundColor: '#0D0D0D' }}>Select state</option>
                        {STATES.map((s) => <option key={s} value={s} style={{ backgroundColor: '#0D0D0D' }}>{s}</option>)}
                      </select>
                      {errors.state && <p style={errorStyle}>{errors.state}</p>}
                    </div>
                    <Field
                      label="PINCODE"
                      value={form.pincode}
                      onChange={(v) => set('pincode', v.replace(/\D/g, '').slice(0, 6))}
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="6-digit pincode"
                      error={errors.pincode}
                      required
                      maxLength={6}
                    />
                  </div>
                </Section>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setStep(1)} style={secondaryBtnStyle}>BACK</button>
                  <button onClick={() => { if (validateStep2()) setStep(3); }} style={{ ...primaryBtnStyle, flex: 1, marginTop: 0 }}>
                    CONTINUE TO PAYMENT <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — PAYMENT */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Section title="PAYMENT METHOD">
                  <div className="flex flex-col gap-3">
                    {[
                      { value: 'upi', label: 'UPI', desc: 'GPay, PhonePe, Paytm, BHIM' },
                      { value: 'card', label: 'CREDIT / DEBIT CARD', desc: 'Visa, Mastercard, RuPay' },
                      { value: 'netbanking', label: 'NET BANKING', desc: 'SBI, HDFC, ICICI, Axis & more' },
                      { value: 'cod', label: 'CASH ON DELIVERY', desc: 'Pay cash upon delivery' },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-4 p-4 border transition-colors cursor-pointer ${
                          form.paymentMethod === opt.value
                            ? 'border-[var(--text-primary)] bg-[var(--surface)]'
                            : 'border-[var(--border)] bg-transparent'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={opt.value}
                          checked={form.paymentMethod === (opt.value as FormData['paymentMethod'])}
                          onChange={() => set('paymentMethod', opt.value as FormData['paymentMethod'])}
                          className="w-4 h-4 accent-[var(--text-primary)]"
                        />
                        <div>
                          <p className="font-editorial text-xs text-[var(--text-primary)] tracking-wider">{opt.label}</p>
                          <p className="text-xs text-[var(--text-muted)] mt-0.5">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* UPI INPUT */}
                  {form.paymentMethod === 'upi' && (
                    <div className="mt-4 p-4 border border-[var(--border)] bg-[var(--surface)]">
                      <Field
                        label="UPI VPA / ID"
                        value={form.upiId}
                        onChange={(v) => set('upiId', v)}
                        inputMode="email"
                        autoComplete="off"
                        placeholder="username@upi or mobile@paytm"
                      />
                    </div>
                  )}

                  {/* CARD INPUTS */}
                  {form.paymentMethod === 'card' && (
                    <div className="mt-4 p-4 border border-[var(--border)] bg-[var(--surface)] grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field
                        label="CARD NUMBER"
                        value={cardForm.cardNumber}
                        onChange={(v) => setCardForm((c) => ({ ...c, cardNumber: formatCardNumber(v) }))}
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="4532 0000 0000 0000"
                        maxLength={19}
                        className="col-span-1 sm:col-span-2"
                      />
                      <Field
                        label="EXPIRY DATE"
                        value={cardForm.cardExp}
                        onChange={(v) => setCardForm((c) => ({ ...c, cardExp: formatCardExp(v) }))}
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      <Field
                        label="CVV"
                        value={cardForm.cardCvv}
                        onChange={(v) => setCardForm((c) => ({ ...c, cardCvv: v.replace(/\D/g, '').slice(0, 4) }))}
                        type="password"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        maxLength={4}
                      />
                      <Field
                        label="NAME ON CARD"
                        value={cardForm.cardName}
                        onChange={(v) => setCardForm((c) => ({ ...c, cardName: v }))}
                        autoComplete="cc-name"
                        placeholder="Name as on card"
                        className="col-span-1 sm:col-span-2"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4 text-[var(--text-muted)]">
                    <Lock size={14} />
                    <span className="text-xs">
                      100% Encrypted & Secure 256-Bit SSL Checkout
                    </span>
                  </div>
                </Section>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setStep(2)} style={secondaryBtnStyle}>BACK</button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={processing}
                    style={{ ...primaryBtnStyle, flex: 1, marginTop: 0, opacity: processing ? 0.7 : 1 }}
                  >
                    {processing ? 'PROCESSING PAYMENT...' : `PAY NOW — ₹${total.toLocaleString('en-IN')}`}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DESKTOP ORDER SUMMARY COLUMN */}
        <div className="hidden lg:block bg-[var(--surface)] border border-[var(--border)] p-6 sticky top-24">
          <h2 className="font-editorial text-xs tracking-widest text-[var(--text-primary)] mb-5">
            ORDER SUMMARY
          </h2>

          {/* ITEMS */}
          <div className="flex flex-col gap-4 mb-5 pb-5 border-b border-[var(--border)] max-h-[320px] overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3">
                <div className="w-14 h-[70px] bg-[#0A0A0A] flex-shrink-0 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image || '/ed2.jpeg'} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[var(--text-primary)] text-[var(--background)] text-[9px] font-bold flex items-center justify-center">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-editorial text-xs text-[var(--text-primary)] truncate">{item.name}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">Size: {item.size}</p>
                </div>
                <span className="text-xs text-[var(--text-primary)] flex-shrink-0">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* TOTALS */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-secondary)]">Subtotal</span>
              <span className="text-[var(--text-primary)]">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-secondary)]">Shipping</span>
              <span className={shipping === 0 ? 'text-[var(--success)]' : 'text-[var(--text-secondary)]'}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>
            <div className="h-[1px] bg-[var(--border)] my-1" />
            <div className="flex justify-between items-baseline">
              <span className="font-editorial text-xs tracking-wider text-[var(--text-primary)]">TOTAL</span>
              <span className="font-display text-xl text-[var(--text-primary)]">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* TRUST BADGES */}
          <div className="mt-5 pt-5 border-t border-[var(--border)] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs">
              <Shield size={14} />
              <span>Secure Encrypted Checkout</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs">
              <Lock size={14} />
              <span>7-day easy returns & exchanges</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const primaryBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  width: '100%',
  minHeight: '48px',
  padding: '14px 20px',
  backgroundColor: 'var(--text-primary)',
  color: 'var(--background)',
  border: 'none',
  fontSize: '14px',
  letterSpacing: '0.12em',
  fontFamily: 'Barlow Condensed, sans-serif',
  fontWeight: 700,
  cursor: 'pointer',
  marginTop: '24px',
  borderRadius: '0px',
};

const secondaryBtnStyle: React.CSSProperties = {
  minHeight: '48px',
  padding: '14px 20px',
  backgroundColor: 'transparent',
  color: 'var(--text-secondary)',
  border: '1px solid var(--border-strong)',
  fontSize: '13px',
  letterSpacing: '0.1em',
  fontFamily: 'Barlow Condensed, sans-serif',
  fontWeight: 700,
  cursor: 'pointer',
  marginTop: '0px',
  flexShrink: 0,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'transparent',
  border: '1px solid var(--border)',
  padding: '14px 16px',
  fontSize: '16px', // 16px prevents automatic zoom on iOS Safari
  color: 'var(--text-primary)',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  minHeight: '48px',
};

const errorStyle: React.CSSProperties = {
  fontSize: '11px',
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
  label, value, onChange, type = 'text', inputMode, autoComplete, placeholder, error, required, style: fieldStyle, className, maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  autoComplete?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  style?: React.CSSProperties;
  className?: string;
  maxLength?: number;
}) {
  return (
    <div style={fieldStyle} className={className}>
      <p className="font-editorial" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '6px' }}>
        {label} {required && '*'}
      </p>
      <input
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
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
