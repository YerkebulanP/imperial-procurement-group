import { useEffect, useRef } from 'react'
import '../styles/theme.css'
import '../styles/imperial-ui.css'
import '../styles/buttons.css'
import '../styles/sections.css'

const NAV_H = 72

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.querySelectorAll('.anim').forEach((child, i) => {
      setTimeout(() => {
        child.style.opacity = '1'
        child.style.transform = 'translateY(0)'
      }, i * 160)
    })
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        backgroundImage: 'none',
        paddingTop: `${NAV_H}px`,
      }}
    >
      {/* Оверлей */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(170deg, rgba(6,4,2,0.35) 0%, rgba(10,7,3,0.22) 50%, rgba(6,4,2,0.45) 100%)',
      }} />
      {/* Плавный переход снизу под цвет текстуры следующей секции */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
        background: 'linear-gradient(to top, rgba(8, 6, 3, 0.35), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Золотая линия под навбаром */}
      <div style={{
        position: 'absolute', top: `${NAV_H}px`, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, var(--line-mid) 20%, var(--line-strong) 50%, var(--line-mid) 80%, transparent 100%)',
        zIndex: 5,
      }} />

      <div ref={ref} style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Текст — верхняя часть */}
        <div className="container hero-text" style={{ padding: '8rem 20px 0', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div className="anim" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease' }}>
              <h1 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4.2vw, 58px)', marginBottom: 0, fontWeight: 900 }}>
                Imperial Procurement Group
              </h1>
            </div>
            <div className="anim" style={{ opacity: 0, transform: 'translateY(12px)', transition: 'all 0.7s ease', margin: '14px 0 22px' }}>
              <p style={{
                margin: 0,
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(10px, 1.1vw, 14px)',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(220,190,130,0.75)',
              }}>
                Оператор стратегического снабжения и надёжности техники
              </p>
            </div>
            <div className="anim gold-divider" style={{ opacity: 0, transform: 'translateY(12px)', transition: 'all 0.7s ease' }} />
            <div className="anim" style={{ opacity: 0, transform: 'translateY(18px)', transition: 'all 0.8s ease' }}>
              <p style={{ margin: 0, fontSize: 'clamp(13px, 1.3vw, 17px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75 }}>
                Мы помогаем предприятиям снижать простой техники<br />
                и эффективно управлять запасными частями.
              </p>
            </div>
          </div>
        </div>

        {/* Кнопки — нижняя часть */}
        <div className="container hero-btns" style={{ padding: '0 20px 7rem', marginTop: 'auto' }}>
          <div className="anim btn-tactical-row" style={{ opacity: 0, transform: 'translateY(28px)', transition: 'all 1s ease' }}>
            <a href="#calculator" className="btn-tactical">Рассчитать потери</a>
            <a href="#about"   className="btn-tactical">Получить аудит техники</a>
            <a href="#contact" className="btn-tactical">Запросить поставку запчастей</a>
          </div>
        </div>
      </div>

      <style>{`
        /* Средний ноутбук (~1440px / высота ~810px) */
        @media (max-height: 860px) {
          .hero-text { padding-top: 5rem !important; }
          .hero-btns { padding-bottom: 4.5rem !important; }
        }
        /* Маленький ноутбук (~1280px / высота ~720-800px) */
        @media (max-height: 760px) {
          .hero-text { padding-top: 3.5rem !important; }
          .hero-btns { padding-bottom: 3rem !important; }
        }
        /* Очень маленький (~высота <680px) */
        @media (max-height: 680px) {
          .hero-text { padding-top: 2rem !important; }
          .hero-btns { padding-bottom: 2rem !important; }
        }
        /* Узкие экраны — кнопки в колонку */
        @media (max-width: 700px) {
          .btn-tactical-row { grid-template-columns: 1fr !important; max-width: 360px !important; }
        }
      `}</style>
    </section>
  )
}
