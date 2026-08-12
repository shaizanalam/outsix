const TICKER_ITEMS = [
  'NEW DROP 01',
  'FREE SHIPPING ABOVE ₹999',
  'OUTSIDE THE ORDINARY',
  'DROP 02 — VOID SERIES',
  'SHOP THE DROP',
  'NOT FOR EVERYONE',
];

export function AnnouncementTicker() {
  const content = [...TICKER_ITEMS, ...TICKER_ITEMS]; // doubled for seamless loop

  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-label="Announcements"
    >
      <div
        className="ticker-track"
        style={{ display: 'flex', alignItems: 'center', gap: '0' }}
      >
        {content.map((item, i) => (
          <span
            key={i}
            className="font-editorial"
            style={{
              fontSize: '10px',
              letterSpacing: '0.16em',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
              padding: '0 32px',
            }}
          >
            {item}
            <span style={{ marginLeft: '32px', color: 'var(--text-muted)' }}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
