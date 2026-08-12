import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — OUTSIX',
  description: 'For the ones who don\'t fit the frame. The OUTSIX story.',
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* HERO */}
      <section
        style={{
          minHeight: '60vh',
          backgroundColor: '#060606',
          display: 'flex',
          alignItems: 'flex-end',
          borderBottom: '1px solid var(--border)',
          padding: 'clamp(64px, 10vh, 128px) 0 clamp(40px, 6vh, 80px)',
        }}
      >
        <div className="container-outsix">
          <h1 className="font-display" style={{ fontSize: 'clamp(56px, 10vw, 120px)', color: 'var(--text-primary)', lineHeight: 0.92 }}>
            OUTSIX
          </h1>
          <p className="font-display" style={{ fontSize: 'clamp(20px, 3vw, 36px)', color: 'var(--text-secondary)', marginTop: '16px', lineHeight: 1.1 }}>
            FOR THE ONES WHO<br />DON&apos;T FIT THE FRAME.
          </p>
        </div>
      </section>

      {/* THE BRAND */}
      <section style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(48px, 8vh, 96px) 0' }}>
        <div className="container-outsix" style={{ maxWidth: '800px' }}>
          <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.16em', marginBottom: '24px' }}>THE BRAND</p>
          <p style={{ fontSize: 'clamp(16px, 2vw, 22px)', color: 'var(--text-secondary)', fontFamily: 'Inter', lineHeight: 1.7 }}>
            OUTSIX is a streetwear label built in India, for those who move at their own pace. We don&apos;t follow trends. We don&apos;t chase hype. We create for the ones who exist on the outside of the ordinary.
          </p>
        </div>
      </section>

      {/* THE CULTURE */}
      <section style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(48px, 8vh, 96px) 0' }}>
        <div className="container-outsix">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div
              style={{ aspectRatio: '4/5', backgroundColor: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              data-cursor="view"
            >
              <span className="font-display" style={{ fontSize: '18px', color: '#111', letterSpacing: '0.12em' }}>OUTSIX</span>
            </div>
            <div>
              <p className="font-editorial" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.16em', marginBottom: '24px' }}>THE CULTURE</p>
              <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-primary)', lineHeight: 0.95, marginBottom: '20px' }}>
                UNDERGROUND.<br />AUTHENTIC.<br />OURS.
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', fontFamily: 'Inter', lineHeight: 1.7 }}>
                Rooted in Indian street culture, influenced by the underground music scene and raw visual art. Every piece is intentional. Every drop is limited. Every design is a statement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section style={{ padding: 'clamp(80px, 12vh, 160px) 0', textAlign: 'center' }}>
        <div className="container-outsix">
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 7vw, 96px)', color: 'var(--text-primary)', lineHeight: 0.92 }}>
            OUTSIDE THE ORDINARY.
          </h2>
        </div>
      </section>
    </div>
  );
}
