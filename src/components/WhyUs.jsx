function IPGShield() {
  return (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <path d="M22 2L4 9V22C4 31.5 12 39.5 22 42C32 39.5 40 31.5 40 22V9L22 2Z" fill="rgba(212,175,55,0.1)" stroke="#D4AF37" strokeWidth="1.2"/>
      <path d="M22 5L7 11V22C7 30 13.5 37 22 39.5C30.5 37 37 30 37 22V11L22 5Z" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="0.6"/>
      <text x="22" y="24" textAnchor="middle" dominantBaseline="middle" fontFamily="Cinzel, serif" fontSize="9" fontWeight="700" fill="#D4AF37" letterSpacing="1">IPG</text>
    </svg>
  )
}

const pillars = [
  { icon: '🏭', title: 'Прямые поставки от производителей', stat: 'OEM', statLabel: 'без посредников', desc: 'Работаем напрямую с производителями и официальными дистрибьюторами. Никаких лишних звеньев — только оригинальные запчасти по честной цене.' },
  { icon: '💰', title: 'Конкурентные цены',                  stat: '-25%', statLabel: 'vs рынок',       desc: 'Прямые контракты с заводами позволяют предлагать цены ниже рыночных. Оптовые условия доступны с первого заказа.' },
  { icon: '🚚', title: 'Быстрая логистика по РК',            stat: '48ч',  statLabel: 'доставка',       desc: 'Собственная логистическая сеть по всему Казахстану. Доставляем в Алматы, Астану, Атырау, Актобе и другие регионы.' },
  { icon: '🛡️', title: 'Гарантия на продукцию',             stat: '12мес', statLabel: 'гарантия',      desc: 'Вся продукция проходит контроль качества. Предоставляем гарантию от 3 до 12 месяцев в зависимости от категории товара.' },
  { icon: '🤝', title: 'Индивидуальный подход',              stat: '1:1',   statLabel: 'менеджер',      desc: 'Персональный менеджер за каждым клиентом. Подберём аналоги, проконсультируем по совместимости, поможем с комплектацией.' },
]

export default function WhyUs() {
  return (
    <section id="whyus" className="section-imperial">
      <style>{`
        @media (max-width: 1599px) {
          .whyus-header { padding: 0.5rem 1rem !important; margin-bottom: 0.6rem !important; }
          .whyus-card   { padding: 0.75rem !important; }
          .whyus-grid   { gap: 8px !important; margin-bottom: 8px !important; }
        }
        @media (max-width: 1279px) {
          .whyus-header { padding: 0.45rem 0.9rem !important; margin-bottom: 0.5rem !important; }
          .whyus-card   { padding: 0.65rem !important; }
          .whyus-grid   { gap: 7px !important; margin-bottom: 7px !important; }
        }
        @media (max-width: 899px) {
          .whyus-grid       { grid-template-columns: 1fr 1fr !important; }
          .whyus-row-bottom { flex-wrap: wrap !important; justify-content: flex-start !important; }
          .whyus-row-bottom > .whyus-card { flex: 0 0 calc(50% - 8px) !important; }
        }
        @media (max-width: 479px) {
          .whyus-grid { grid-template-columns: 1fr !important; }
          .whyus-row-bottom > .whyus-card { flex: 0 0 100% !important; }
        }
      `}</style>
      <div className="container">

        {/* Header */}
        <div className="whyus-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.7rem 1.4rem', background: 'var(--bg-card)', border: '1px solid var(--line-soft)', borderRadius: 'var(--radius-md)', marginBottom: '0.8rem' }}>
          <IPGShield />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--gold-3)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.45em', textTransform: 'uppercase', margin: '0 0 4px' }}>Почему мы?</p>
            <h2 style={{ fontFamily: 'Cinzel, serif', color: 'var(--text-main)', fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              Преимущества работы с нами
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="whyus-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '10px' }}>
          {pillars.slice(0, 3).map((p) => (
            <div
              key={p.title}
              className="whyus-card"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--line-soft)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.45)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.35), 0 0 16px rgba(212,175,55,0.1)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--line-soft)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.7rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{p.icon}</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, color: 'var(--gold-3)', fontSize: 'clamp(1rem, 1.2vw, 1.4rem)', lineHeight: 1 }}>{p.stat}</div>
                  <div style={{ color: 'var(--text-dim)', fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.1em', marginTop: '3px' }}>{p.statLabel}</div>
                </div>
              </div>
              <div style={{ height: '1px', background: 'var(--line-soft)', marginBottom: '0.6rem' }} />
              <h3 style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, color: 'var(--text-main)', fontSize: '0.88rem', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                {p.title}
              </h3>
              <p style={{ color: 'var(--text-dim)', fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', lineHeight: 1.55, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="whyus-row-bottom" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {pillars.slice(3).map((p) => (
            <div
              key={p.title}
              className="whyus-card"
              style={{
                flex: '0 0 calc((100% - 32px) / 3)',
                background: 'var(--bg-card)',
                border: '1px solid var(--line-soft)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.45)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.35), 0 0 16px rgba(212,175,55,0.1)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--line-soft)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.7rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{p.icon}</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, color: 'var(--gold-3)', fontSize: 'clamp(1rem, 1.2vw, 1.4rem)', lineHeight: 1 }}>{p.stat}</div>
                  <div style={{ color: 'var(--text-dim)', fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.1em', marginTop: '3px' }}>{p.statLabel}</div>
                </div>
              </div>
              <div style={{ height: '1px', background: 'var(--line-soft)', marginBottom: '0.6rem' }} />
              <h3 style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, color: 'var(--text-main)', fontSize: '0.88rem', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                {p.title}
              </h3>
              <p style={{ color: 'var(--text-dim)', fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', lineHeight: 1.55, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div style={{ textAlign: 'center', marginTop: '0.8rem', paddingTop: '0.7rem', borderTop: '1px solid var(--line-soft)' }}>
          <blockquote style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontSize: 'clamp(0.82rem, 1.4vw, 1rem)', fontStyle: 'italic', fontWeight: 700, lineHeight: 1.6, maxWidth: '620px', margin: '0 auto' }}>
            «Мы доставляем ресурсы так же чётко,<br />
            как римляне строили дороги,<br />
            которые стоят 2000 лет»
          </blockquote>
          <div style={{ color: 'var(--text-dim)', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '0.3em', marginTop: '0.4rem', textTransform: 'uppercase' }}>
            — Imperial Procurement Group
          </div>
        </div>

      </div>
    </section>
  )
}
