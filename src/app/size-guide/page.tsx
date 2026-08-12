import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Size Guide — OUTSIX',
  description: 'Find your perfect OUTSIX size.',
};

const SIZE_CHART = {
  tees: [
    { size: 'XS', chest: '36"', length: '27"', shoulder: '16"' },
    { size: 'S', chest: '38"', length: '28"', shoulder: '17"' },
    { size: 'M', chest: '40"', length: '29"', shoulder: '18"' },
    { size: 'L', chest: '42"', length: '30"', shoulder: '19"' },
    { size: 'XL', chest: '44"', length: '31"', shoulder: '20"' },
    { size: 'XXL', chest: '46"', length: '32"', shoulder: '21"' },
  ],
};

export default function SizeGuidePage() {
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--border)', padding: '40px 0 24px', backgroundColor: 'var(--surface)' }}>
        <div className="container-outsix">
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text-primary)' }}>SIZE GUIDE</h1>
        </div>
      </div>
      <div className="container-outsix" style={{ paddingTop: '48px', paddingBottom: '96px', maxWidth: '720px' }}>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', fontFamily: 'Inter', lineHeight: 1.7, marginBottom: '40px' }}>
          OUTSIX garments are cut oversized. We recommend sizing up if you prefer a more exaggerated fit. All measurements are in inches.
        </p>

        <h2 className="font-editorial" style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '20px' }}>
          TEES & HOODIES
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-strong)' }}>
                {['SIZE', 'CHEST', 'LENGTH', 'SHOULDER'].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.12em', fontWeight: 700 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZE_CHART.tees.map((row) => (
                <tr key={row.size} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, letterSpacing: '0.06em' }}>{row.size}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'Inter' }}>{row.chest}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'Inter' }}>{row.length}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'Inter' }}>{row.shoulder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'Inter', marginTop: '24px', lineHeight: 1.6 }}>
          Measurements may vary ±1 inch depending on the specific product. When between sizes, size up for a more oversized fit.
        </p>
      </div>
    </div>
  );
}
