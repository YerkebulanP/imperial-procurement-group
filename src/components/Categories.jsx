import { useState } from 'react'

const categories = [
  {
    title: 'Двигатели',
    subtitle: 'Силовые агрегаты',
    icon: '🔥',
    items: [
      'Новые и контрактные двигатели',
      'Капитально восстановленные (с гарантией)',
      'CAT, Komatsu, SDLG, XCMG, Shantui, Hitachi, Cummins и др.',
      'Гарантия: от 3 до 12 месяцев',
    ],
    desc: 'Полный спектр двигателей для спецтехники — новые, контрактные и восстановленные.',
  },
  {
    title: 'Узлы и агрегаты',
    subtitle: 'Ключевые компоненты',
    icon: '⚙️',
    items: [
      'КПП (механические и автоматические)',
      'Редукторы, мосты',
      'Гидравлические системы и насосы',
      'Турбины и компрессоры',
      'Стартеры, генераторы',
    ],
    desc: 'Ключевые узлы и агрегаты для бесперебойной работы вашего парка.',
  },
  {
    title: 'Масла и фильтра',
    subtitle: 'Расходные материалы',
    icon: '💧',
    items: [
      'Моторные, гидравлические, трансмиссионные масла',
      'Фильтры: масляные, воздушные, топливные',
      'Проверенные бренды (прошли ОПИ)',
      'Оптовые поставки и гибкие условия',
    ],
    desc: 'Расходные материалы от проверенных брендов. Оптовые поставки по всему Казахстану.',
    featured: true,
  },
  {
    title: 'Коронки и режущие элементы',
    subtitle: 'Рабочий инструмент',
    icon: '⛏️',
    items: [
      'Коронки ковшей (bucket teeth)',
      'Ножи для автогрейдера',
      'Бокорезы, адаптеры',
      'Усиленные варианты для тяжёлых условий',
    ],
    desc: 'Износостойкие коронки и режущие элементы для работы в самых тяжёлых условиях.',
  },
  {
    title: 'Шины',
    subtitle: 'Шинная продукция',
    icon: '🔘',
    items: [
      'Для спецтехники и грузового транспорта',
      'Карьерные, индустриальные, дорожные',
      'Подбор под конкретные задачи и нагрузку',
    ],
    desc: 'Шины для спецтехники и грузового транспорта. Подберём под ваши задачи и нагрузку.',
  },
  {
    title: 'Услуги под ключ',
    subtitle: 'Комплексное снабжение',
    icon: '🏛️',
    items: [
      'Комплексное снабжение парка техники',
      'Подбор аналогов и замен OEM',
      'Управление складскими запасами',
      'Логистика и доставка по Казахстану',
      'Технические консультации по подбору',
    ],
    desc: 'Полный цикл снабжения — от заявки до доставки на объект. Один звонок решает всё.',
  },
]

const N = categories.length

export default function Categories() {
  const [active, setActive] = useState(5)
  const [dir, setDir] = useState(1)
  const [tick, setTick] = useState(0)

  const go = (d) => {
    setDir(d)
    setTick(t => t + 1)
    setActive(i => (i + d + N) % N)
  }

  // 3 фиксированных слота — всегда circular
  const slots = [
    (active - 1 + N) % N,
    active,
    (active + 1) % N,
  ]

  return (
    <section id="categories" className="section-imperial" style={{ paddingBottom: '4rem' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontSize: '10px', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            Арсенал и склады
          </p>
          <h2 className="section-title">Категории товаров и услуг</h2>
          <div className="gold-divider" />
        </div>

        {/* Carousel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', overflow: 'hidden', borderRadius: '4px' }}>

          {/* Left Arrow */}
          <ArrowBtn onClick={() => go(-1)}>‹</ArrowBtn>

          {/* 3 fixed slots — layout never moves */}
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
            alignItems: 'stretch',
          }}>
            {slots.map((catIdx, slotPos) => {
              const isCenter = slotPos === 1
              const animName = dir > 0 ? 'catFromRight' : 'catFromLeft'

              return (
                /* outer slot: opacity/scale stays stable — no movement */
                <div
                  key={slotPos}
                  style={{
                    opacity: isCenter ? 1 : 0.5,
                    transition: 'opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  {/* inner content: re-keyed on navigation → CSS animation fires */}
                  <div
                    key={`${slotPos}-${tick}`}
                    style={{ animation: `${animName} 0.55s cubic-bezier(0.22, 1, 0.36, 1) both`, height: '100%', willChange: 'transform, opacity' }}
                  >
                    <CardInner cat={categories[catIdx]} isCenter={isCenter} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Arrow */}
          <ArrowBtn onClick={() => go(1)}>›</ArrowBtn>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
          {categories.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > active ? 1 : -1); setTick(t => t + 1); setActive(i) }}
              style={{
                width: i === active ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? 'var(--gold-3)' : 'rgba(212,175,55,0.22)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes catFromRight {
          from { opacity: 0; transform: translateX(40px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0)   scale(1); }
        }
        @keyframes catFromLeft {
          from { opacity: 0; transform: translateX(-40px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0)    scale(1); }
        }
      `}</style>
    </section>
  )
}

function ArrowBtn({ onClick, children }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0,
        width: 48, height: 48,
        borderRadius: '50%',
        background: hov ? 'rgba(212,175,55,0.2)' : 'rgba(212,175,55,0.08)',
        border: `1px solid ${hov ? 'var(--gold-3)' : 'rgba(212,175,55,0.3)'}`,
        color: 'var(--gold-3)',
        fontSize: '1.6rem', lineHeight: 1,
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
        userSelect: 'none',
      }}
    >
      {children}
    </button>
  )
}

function CardInner({ cat, isCenter }) {
  return (
    <div style={{
      background: '#262628',
      border: `1px solid ${isCenter || cat.featured ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.15)'}`,
      borderRadius: '10px',
      padding: '1.1rem 1.2rem',
      display: 'flex', flexDirection: 'column',
      position: 'relative',
      height: '100%',
      boxSizing: 'border-box',
      boxShadow: isCenter
        ? '0 16px 48px rgba(0,0,0,0.55), 0 0 24px rgba(212,175,55,0.12)'
        : '0 4px 16px rgba(0,0,0,0.35)',
    }}>
      {isCenter && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', borderRadius: '10px 10px 0 0', background: 'linear-gradient(90deg, transparent, var(--gold-3), transparent)' }} />
      )}

      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>{cat.icon}</div>

      <div style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--gold-3)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.45em', textTransform: 'uppercase', marginBottom: '0.5rem', textAlign: 'center' }}>
        {cat.subtitle}
      </div>

      <h3 style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, color: '#FFFFFF', fontSize: '0.95rem', lineHeight: 1.35, marginBottom: '0.6rem', letterSpacing: '0.02em', textAlign: 'center' }}>
        {cat.title}
      </h3>

      <p style={{ color: 'var(--text-dim)', fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', lineHeight: 1.5, marginBottom: '0.7rem', textAlign: 'center' }}>
        {cat.desc}
      </p>

      <div style={{ height: '1px', background: 'rgba(212,175,55,0.15)', marginBottom: '0.8rem' }} />

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
        {cat.items.map((item) => (
          <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
            <span style={{ color: 'var(--gold-3)', fontSize: '9px', flexShrink: 0, marginTop: '5px' }}>◆</span>
            <span style={{ color: 'var(--text-soft)', fontFamily: 'Montserrat, sans-serif', fontSize: '0.87rem' }}>{item}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={isCenter || cat.featured ? 'btn-imperial' : 'btn-imperial-outline'}
        style={{ marginTop: '1rem', width: '100%', minHeight: '40px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', boxSizing: 'border-box' }}
      >
        Запросить
      </a>
    </div>
  )
}
