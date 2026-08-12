'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Heart, User, MapPin, Settings, ArrowRight, LogOut } from 'lucide-react';
import { signInWithEmail, signUpWithEmail, signOutUser, getCurrentUserSession } from '@/lib/supabase/auth';
import { useUIStore } from '@/store/ui';

type AccountUser = {
  email: string;
  user_metadata?: {
    full_name?: string;
  };
};

const ACCOUNT_LINKS = [
  { href: '/account/orders', icon: Package, label: 'ORDERS', desc: 'Track and view your orders' },
  { href: '/wishlist', icon: Heart, label: 'WISHLIST', desc: 'Your saved items' },
  { href: '/account/profile', icon: User, label: 'PROFILE', desc: 'Your personal details' },
  { href: '/account/addresses', icon: MapPin, label: 'ADDRESSES', desc: 'Saved delivery addresses' },
  { href: '/account/settings', icon: Settings, label: 'SETTINGS', desc: 'Preferences and notifications' },
];

export function AccountLinks() {
  const [sessionUser, setSessionUser] = useState<AccountUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const { addToast } = useUIStore();

  useEffect(() => {
    getCurrentUserSession().then((session) => {
      if (session?.user?.email) {
        setSessionUser({
          email: session.user.email,
          user_metadata: session.user.user_metadata,
        });
      }
      setLoading(false);
    });
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    if (mode === 'login') {
      const { user, error } = await signInWithEmail(email, password);
      if (error) {
        addToast(error.message || 'Login failed', 'error');
      } else if (user && user.email) {
        setSessionUser({
          email: user.email,
          user_metadata: user.user_metadata,
        });
        addToast(`Welcome back, ${user.email}!`, 'success');
      }
    } else {
      const { user, error } = await signUpWithEmail(email, password, fullName);
      if (error) {
        addToast(error.message || 'Sign up failed', 'error');
      } else if (user && user.email) {
        setSessionUser({
          email: user.email,
          user_metadata: user.user_metadata,
        });
        addToast('Account created successfully!', 'success');
      }
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await signOutUser();
    setSessionUser(null);
    addToast('Signed out of OUTSIX', 'info');
  };

  if (loading) {
    return <div className="py-12 text-center text-xs font-editorial text-[var(--text-muted)]">LOADING ACCOUNT...</div>;
  }

  // IF LOGGED IN
  if (sessionUser) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="p-4 bg-[var(--surface-elevated)] border border-[var(--border)] mb-6 flex justify-between items-center">
          <div>
            <p className="font-bold text-sm text-[var(--text-primary)]">{sessionUser.user_metadata?.full_name || 'OUTSIX Member'}</p>
            <p className="text-xs text-[var(--text-muted)]">{sessionUser.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 border border-[var(--border-strong)] text-xs font-editorial text-[var(--text-muted)] hover:text-white flex items-center gap-1.5"
          >
            <LogOut size={14} /> LOGOUT
          </button>
        </div>

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
    );
  }

  // IF LOGGED OUT — AUTH FORM
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 space-y-6">
      <div className="flex gap-4 border-b border-[var(--border)] pb-4">
        <button
          onClick={() => setMode('login')}
          className={`font-editorial text-xs font-bold tracking-widest ${
            mode === 'login' ? 'text-[var(--text-primary)] border-b-2 border-[var(--text-primary)] pb-4 -mb-4' : 'text-[var(--text-muted)]'
          }`}
        >
          LOG IN
        </button>
        <button
          onClick={() => setMode('signup')}
          className={`font-editorial text-xs font-bold tracking-widest ${
            mode === 'signup' ? 'text-[var(--text-primary)] border-b-2 border-[var(--text-primary)] pb-4 -mb-4' : 'text-[var(--text-muted)]'
          }`}
        >
          CREATE ACCOUNT
        </button>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label className="block font-editorial text-xs text-[var(--text-muted)] tracking-wider mb-1">
              FULL NAME
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--text-primary)] outline-none min-h-[48px]"
            />
          </div>
        )}

        <div>
          <label className="block font-editorial text-xs text-[var(--text-muted)] tracking-wider mb-1">
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@domain.com"
            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--text-primary)] outline-none min-h-[48px]"
          />
        </div>

        <div>
          <label className="block font-editorial text-xs text-[var(--text-muted)] tracking-wider mb-1">
            PASSWORD
          </label>
          <input
            type="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--text-primary)] outline-none min-h-[48px]"
          />
        </div>

        <button
          type="submit"
          disabled={authLoading}
          className="w-full py-4 bg-[var(--text-primary)] text-[var(--background)] font-editorial text-xs font-bold tracking-widest hover:opacity-90 transition min-h-[48px]"
        >
          {authLoading ? 'PROCESSING...' : mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
        </button>
      </form>
    </div>
  );
}
