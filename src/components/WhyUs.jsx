function IPGShield() {
  return (
    <svg width="48" height="48" viewBox="0 0 44 44" fill="none">
      <path d="M22 2L4 9V22C4 31.5 12 39.5 22 42C32 39.5 40 31.5 40 22V9L22 2Z" fill="rgba(212,175,55,0.1)" stroke="#D4AF37" strokeWidth="1.2"/>
      <path d="M22 5L7 11V22C7 30 13.5 37 22 39.5C30.5 37 37 30 37 22V11L22 5Z" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="0.6"/>
      <text x="22" y="24" textAnchor="middle" dominantBaseline="middle" fontFamily="Cinzel, serif" fontSize="9" fontWeight="700" fill="#D4AF37" letterSpacing="1">IPG</text>
    </svg>
  )
}

const pillars = [
  { icon: '⚡', title: 'Дисциплина поставок',    stat: '48ч',   statLabel: 'среднее время',       desc: 'Как военная машина Рима — чёткая, предсказуемая, неостановимая. Ваш заказ приходит в срок или мы берём ответственность.' },
  { icon: '🌍', title: 'Масштаб империи',          stat: '5000+', statLabel: 'позиций в наличии',  desc: 'Склады как сеть форпостов. Мы присутствуем там, где нужна ваша техника — в любой точке.' },
  { icon: '🏗️', title: 'Надёжность материалов',   stat: 'OEM+',  statLabel: 'качество деталей',   desc: 'Крепче римского бетона. Только проверенные производители. Каждая запчасть проходит контроль совместимости.' },
  { icon: '🦅', title: 'Личный интендант',          stat: '1:1',   statLabel: 'менеджер за вами',  desc: 'Персональный менеджер знает ваш парк. Проактивно предупреждает о плановых заменах.' },
  { icon: '📊', title: 'Прозрачность',              stat: '100%',  statLabel: 'отслеживаемость',   desc: 'Портал клиента — история заказов, статусы, документы. Полная видимость движения грузов.' },
  { icon: '💰', title: 'Экономия на простоях',      stat: '-60%',  statLabel: 'потерь от простоя', desc: 'Быстрая поставка — меньше дней простоя. Меньше простоя — больше выработки. Математика империи.' },
]

export default function WhyUs() {
  return (
    <section id="whyus" className="section-imperial">
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem 2rem', background: 'var(--bg-card)', border: '1px solid var(--line-soft)', borderRadius: 'var(--radius-md)', marginBottom: '3rem' }}>
          <IPGShield />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--gold-3)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.45em', textTransform: 'uppercase', margin: '0 0 4px' }}>Почему мы?</p>
            <h2 style={{ fontFamily: 'Cinzel, serif', color: 'var(--text-main)', fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              Преимущества работы с нами
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {pillars.map((p) => (
            <div
              key={p.title}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--line-soft)',
                borderRadius: 'var(--radius-md)',
                padding: '2.2rem',
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem' }}>{p.icon}</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, color: 'var(--gold-3)', fontSize: '1.6rem', lineHeight: 1 }}>{p.stat}</div>
                  <div style={{ color: 'var(--text-dim)', fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.1em', marginTop: '3px' }}>{p.statLabel}</div>
                </div>
              </div>
              <div style={{ height: '1px', background: 'var(--line-soft)', marginBottom: '1.2rem' }} />
              <h3 style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem', letterSpacing: '0.04em', marginBottom: '0.8rem' }}>
                {p.title}
              </h3>
              <p style={{ color: 'var(--text-dim)', fontFamily: 'Montserrat, sans-serif', fontSize: '0.82rem', lineHeight: 1.75, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--line-soft)' }}>
          <blockquote style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', fontStyle: 'italic', lineHeight: 1.95, maxWidth: '620px', margin: '0 auto' }}>
            «Мы доставляем ресурсы так же чётко,<br />
            как римляне строили дороги,<br />
            которые стоят 2000 лет»
          </blockquote>
          <div style={{ color: 'var(--text-dim)', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '0.3em', marginTop: '1rem', textTransform: 'uppercase' }}>
            — Imperial Procurement Group
          </div>
        </div>

      </div>
    </section>
  )
}
