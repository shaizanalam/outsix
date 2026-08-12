import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Orders — OUTSIX' };

const DEMO_ORDERS = [
  { id: 'OSX-1042', date: '11 Aug 2026', status: 'DELIVERED', total: '₹1,448', items: 2 },
  { id: 'OSX-0987', date: '2 Aug 2026', status: 'IN TRANSIT', total: '₹699', items: 1 },
  { id: 'OSX-0831', date: '18 Jul 2026', status: 'DELIVERED', total: '₹2,097', items: 3 },
];

const STATUS_COLOR: Record<string, string> = {
  'DELIVERED': 'var(--success)',
  'IN TRANSIT': 'var(--warning)',
  'PROCESSING': 'var(--text-secondary)',
};

export default function OrdersPage() {
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--border)', padding: '32px 0 24px', backgroundColor: 'var(--surface)' }}>
        <div className="container-outsix">
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text-primary)' }}>ORDERS</h1>
        </div>
      </div>
      <div className="container-outsix" style={{ paddingTop: '40px', paddingBottom: '96px', maxWidth: '720px' }}>
        {DEMO_ORDERS.map((order) => (
          <Link
            key={order.id}
            href={`/account/orders/${order.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 0',
              borderBottom: '1px solid var(--border)',
              textDecoration: 'none',
              gap: '16px',
            }}
          >
            <div>
              <p className="font-editorial" style={{ fontSize: '13px', color: 'var(--text-primary)', letterSpacing: '0.08em', marginBottom: '4px' }}>
                ORDER #{order.id}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                {order.date} · {order.items} item{order.items > 1 ? 's' : ''}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className="font-editorial" style={{ fontSize: '11px', color: STATUS_COLOR[order.status] || 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: '4px' }}>
                {order.status}
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Inter', fontWeight: 500 }}>{order.total}</p>
            </div>
            <ArrowRight size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          </Link>
        ))}
      </div>
    </div>
  );
}
