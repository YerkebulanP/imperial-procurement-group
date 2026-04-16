const pillars = [
  { num: '01', title: 'Дисциплина поставок',  desc: 'Строгое соблюдение сроков. Как в легионе — опоздание недопустимо.' },
  { num: '02', title: 'Масштаб империи',       desc: 'Складская сеть по всей территории. Тысячи позиций в наличии.' },
  { num: '03', title: 'Надёжность',             desc: 'Крепче римского бетона. Только проверенные производители и OEM.' },
  { num: '04', title: 'Партнёрство',            desc: 'Персональный менеджер для каждого клиента. Ваш личный интендант.' },
]

const brands = ['Komatsu', 'XCMG', 'CAT', 'Liebherr', 'Hitachi', 'Volvo', 'Doosan', 'JCB', 'Sandvik']

export default function About() {
  return (
    <section id="about" className="section-imperial">
      <div className="container">

        {/* Intro */}
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>

          <p style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--gold-3)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
            О компании
          </p>

          <h2 className="section-title">
            Главный интендант вашей техники
          </h2>

          <div className="gold-divider" />

          <p className="section-subtitle" style={{ marginBottom: '1rem' }}>
            <strong style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontWeight: 700 }}>
              Imperial Procurement Group
            </strong>{' '}
            — комплексный поставщик запасных частей и расходных материалов
            для карьерной и дорожно-строительной техники.
          </p>
          <p style={{ color: 'var(--text-dim)', fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(14px, 1.4vw, 17px)', lineHeight: 1.9, textAlign: 'center' }}>
            Мы доставляем ресурсы так же чётко, как римляне строили дороги,
            которые стоят 2000 лет. Каждая деталь проверена. Каждая поставка — в срок.
          </p>

          {/* Pull quote */}
          <div style={{
            marginTop: '2rem',
            display: 'inline-block',
            padding: '1.4rem 2.2rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--line-soft)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '3px solid var(--gold-3)',
          }}>
            <p style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.75, textAlign: 'center', margin: 0 }}>
              «Ни один легион не останавливается из-за нехватки снаряжения»
            </p>
          </div>

          {/* Brands */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '2.5rem' }}>
            {brands.map((brand) => (
              <span key={brand} style={{
                padding: '7px 16px',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-soft)',
                border: '1px solid var(--line-soft)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-card)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-3)'; e.currentTarget.style.color = 'var(--gold-3)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line-soft)'; e.currentTarget.style.color = 'var(--text-soft)' }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', borderTop: '1px solid var(--line-soft)', paddingTop: '3rem' }}>
          {pillars.map((p) => (
            <div
              key={p.num}
              style={{
                padding: '2.5rem 2rem',
                textAlign: 'center',
                background: 'var(--bg-card)',
                border: '1px solid var(--line-soft)',
                borderRadius: 'var(--radius-md)',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.45)'
                e.currentTarget.style.background = '#2a2a2c'
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3), 0 0 14px rgba(212,175,55,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--line-soft)'
                e.currentTarget.style.background = 'var(--bg-card)'
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-1)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.8rem' }}>
                {p.num}
              </div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, color: 'var(--text-main)', fontSize: '0.88rem', letterSpacing: '0.05em', marginBottom: '0.8rem', lineHeight: 1.45 }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.75, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
