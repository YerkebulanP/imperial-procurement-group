import { useState } from 'react'

const categories = [
  {
    title: 'Опора империи',
    subtitle: 'Ходовая часть',
    icon: '⚙️',
    items: ['Гусеничные цепи', 'Катки опорные', 'Направляющие колёса', 'Звёздочки привода'],
    desc: 'Ходовая часть — фундамент вашей техники. Как колонны Рима держат своды.',
  },
  {
    title: 'Сердце колесницы',
    subtitle: 'Двигатель и система',
    icon: '🔥',
    items: ['Поршневые группы', 'Коленвалы', 'Турбокомпрессоры', 'Прокладки и сальники'],
    desc: 'Сердце техники не должно давать сбоев. Оригинальные и аналоговые запчасти.',
  },
  {
    title: 'Ресурсы для триумфа',
    subtitle: 'Расходные материалы',
    icon: '🛡️',
    items: ['Фильтры Imperial', 'Моторные масла', 'Гидравлические жидкости', 'Ремни и цепи'],
    desc: 'Расходники Imperial — щит вашей техники. Чистота, достойная триумфа.',
    featured: true,
  },
  {
    title: 'Артерии прогресса',
    subtitle: 'Гидравлика',
    icon: '💧',
    items: ['Гидравлические цилиндры', 'Насосы и моторы', 'Распределители', 'РВД и фитинги'],
    desc: 'Как акведуки несли воду в Рим, гидравлика движет силой вашей техники.',
  },
]

export default function Categories() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="categories" className="section-imperial">
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontSize: '10px', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Арсенал и склады
          </p>
          <h2 className="section-title">Категории товаров</h2>
          <div className="gold-divider" />
          <p className="section-subtitle" style={{ fontSize: 'clamp(13px, 1.3vw, 17px)' }}>
            Мощь легионов в каждой детали. Полный арсенал для бесперебойной работы вашего парка.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}>
          {categories.map((cat, i) => {
            const isHovered = hovered === i
            return (
              <div
                key={cat.title}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: '#262628',
                  border: `1px solid ${cat.featured || isHovered ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.15)'}`,
                  borderRadius: '8px',
                  padding: '2.4rem 1.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  display: 'flex', flexDirection: 'column',
                  boxShadow: isHovered
                    ? '0 12px 36px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.15)'
                    : '0 4px 16px rgba(0,0,0,0.35)',
                  transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'none',
                }}
              >
                {cat.featured && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', borderRadius: '8px 8px 0 0', background: 'linear-gradient(90deg, transparent, var(--gold-3), transparent)' }} />
                )}

                <div style={{ fontSize: '2rem', marginBottom: '1.4rem', textAlign: 'center' }}>{cat.icon}</div>

                <div style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--gold-3)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.45em', textTransform: 'uppercase', marginBottom: '0.5rem', textAlign: 'center' }}>
                  {cat.subtitle}
                </div>

                <h3 style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, color: '#FFFFFF', fontSize: '1.05rem', lineHeight: 1.35, marginBottom: '0.9rem', letterSpacing: '0.02em', textAlign: 'center' }}>
                  {cat.title}
                </h3>

                <p style={{ color: 'var(--text-dim)', fontFamily: 'Montserrat, sans-serif', fontSize: '0.82rem', lineHeight: 1.75, marginBottom: '1.4rem', textAlign: 'center' }}>
                  {cat.desc}
                </p>

                <div style={{ height: '1px', background: 'rgba(212,175,55,0.15)', marginBottom: '1.4rem' }} />

                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                  {cat.items.map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <span style={{ color: 'var(--gold-3)', fontSize: '9px', flexShrink: 0 }}>◆</span>
                      <span style={{ color: 'var(--text-soft)', fontFamily: 'Montserrat, sans-serif', fontSize: '0.83rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={isHovered || cat.featured ? 'btn-imperial' : 'btn-imperial-outline'}
                  style={{ marginTop: '1.8rem', width: '100%', minHeight: '42px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', boxSizing: 'border-box' }}
                >
                  Запросить
                </a>
              </div>
            )
          })}
        </div>


      </div>
    </section>
  )
}
