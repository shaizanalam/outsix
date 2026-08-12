export default function AddressesPage() {
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--border)', padding: '40px 0 24px', backgroundColor: 'var(--surface)' }}>
        <div className="container-outsix">
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text-primary)' }}>ADDRESSES</h1>
        </div>
      </div>
      <div className="container-outsix" style={{ paddingTop: '48px', paddingBottom: '96px', maxWidth: '480px' }}>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'Inter', lineHeight: 1.7 }}>
          Address management will be available once authentication is enabled.
        </p>
      </div>
    </div>
  );
}
