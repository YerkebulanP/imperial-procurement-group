import { useState } from 'react'
import hero from '../assets/salamat-photo.jpeg'

const pillars = [
  { num: '01', title: 'Дисциплина поставок',  desc: 'Строгое соблюдение сроков. Как в легионе — опоздание недопустимо.' },
  { num: '02', title: 'Масштаб империи',       desc: 'Складская сеть по всей территории. Тысячи позиций в наличии.' },
  { num: '03', title: 'Надёжность',             desc: 'Крепче римского бетона. Только проверенные производители и OEM.' },
  { num: '04', title: 'Партнёрство',            desc: 'Персональный менеджер для каждого клиента. Ваш личный интендант.' },
]

const brands = ['CAT', 'Komatsu', 'SDLG', 'XCMG', 'Shantui', 'Hitachi', 'Cummins']

/* заменить null на: import founderPhoto from '../assets/founder.jpg' */
const FOUNDER_PHOTO = hero

function FounderModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.78)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 520, width: '100%',
          background: '#1a1a1c',
          border: '1px solid rgba(212,175,55,0.35)',
          borderRadius: '16px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.65), 0 0 50px rgba(212,175,55,0.07)',
          overflow: 'hidden',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        {/* Gold top accent */}
        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-3), transparent)' }} />

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 18,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-dim)', fontSize: '1.5rem', lineHeight: 1,
            transition: 'color 0.2s', zIndex: 2,
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold-3)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-dim)' }}
        >
          ×
        </button>

        {/* Header bg stripe */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(212,175,55,0.06) 0%, transparent 100%)',
          padding: '1.2rem 2rem 0.9rem',
        }}>
          {/* Label */}
          <p style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--gold-3)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.55em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
            Об основателе
          </p>

          {/* Photo */}
          <div style={{
            width: 80, height: 80,
            margin: '0 auto 0.8rem',
            borderRadius: '50%',
            background: FOUNDER_PHOTO ? 'transparent' : 'rgba(212,175,55,0.06)',
            border: '2px solid rgba(212,175,55,0.55)',
            boxShadow: '0 0 0 5px rgba(212,175,55,0.08)',
            overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {FOUNDER_PHOTO
              ? <img src={FOUNDER_PHOTO} alt="Основатель" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '35% 0%' }} />
              : <span style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '2px' }}>СР</span>
            }
          </div>

          {/* Name */}
          <h3 style={{ fontFamily: 'Cinzel, serif', color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem', letterSpacing: '0.04em' }}>
            Саламат Рахимов
          </h3>
          <p style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--gold-3)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0 }}>
            Основатель и руководитель
          </p>
        </div>

        <div style={{ padding: '0 1.6rem 1.4rem' }}>
          {/* Bio */}
          <p style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--text-dim)', fontSize: '0.8rem', lineHeight: 1.65, margin: '0.9rem 0' }}>
            Управленец с практическим опытом в промышленном снабжении и закупочной деятельности.
            Реализует полный цикл поставок — от формирования потребности до контроля качества.
            Создал модель комплексного снабжения с акцентом на надёжность цепочек и снижение операционных рисков.
          </p>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--line-soft)', margin: '0 0 0.9rem' }} />

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '0.9rem' }}>
            {[
              { num: '10+', label: 'лет опыта' },
              { num: '200+', label: 'клиентов' },
              { num: '5000+', label: 'позиций' },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: 'center', padding: '0.55rem 0.5rem', background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.12)', borderRadius: '8px' }}>
                <div style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '3px' }}>{num}</div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--text-dim)', fontSize: '9px', letterSpacing: '0.1em' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '8px', padding: '0.85rem 1.1rem' }}>
            <p style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-2)', fontStyle: 'italic', fontSize: '0.8rem', lineHeight: 1.65, margin: '0 0 0.4rem' }}>
              «Мы строим не просто бизнес — мы строим систему снабжения,
              на которую можно опереться в любой момент, как на вечные римские дороги.»
            </p>
            <div style={{ color: 'var(--text-dim)', fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              — Саламат Рахимов, основатель IPG
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const [showFounder, setShowFounder] = useState(false)

  return (
    <section id="about" className="section-imperial">
      <style>{`
        @media (max-width: 1599px) {
          .about-intro       { margin-bottom: 2rem !important; }
          .about-pillars     { padding-top: 1.5rem !important; gap: 10px !important; }
          .about-pillar-card { padding: 1rem 0.9rem !important; }
        }
        @media (max-width: 1279px) {
          .about-intro       { margin-bottom: 1.5rem !important; }
          .about-pillars     { padding-top: 1.2rem !important; gap: 8px !important; }
          .about-pillar-card { padding: 0.85rem 0.75rem !important; }
        }
        @media (max-width: 899px) {
          .about-pillars { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 479px) {
          .about-pillars { grid-template-columns: 1fr !important; }
          .about-intro   { margin-bottom: 1.2rem !important; }
        }
      `}</style>
      <div className="container">

        {/* Intro */}
        <div className="about-intro" style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>

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

          {/* Founder button */}
          <div style={{ marginTop: '1.5rem' }}>
            <button
              onClick={() => setShowFounder(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '10px 22px',
                background: 'var(--gold-3)',
                border: '1px solid var(--gold-3)',
                borderRadius: '6px',
                fontFamily: 'Cinzel, serif',
                color: '#111',
                fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--gold-1)'
                e.currentTarget.style.borderColor = 'var(--gold-1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--gold-3)'
                e.currentTarget.style.borderColor = 'var(--gold-3)'
              }}
            >
              Об основателе компании
            </button>
          </div>

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
        <div className="about-pillars" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', borderTop: '1px solid var(--line-soft)', paddingTop: '3rem' }}>
          {pillars.map((p) => (
            <div
              key={p.num}
              className="about-pillar-card"
              style={{
                padding: '1.4rem 1.2rem',
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

      {showFounder && <FounderModal onClose={() => setShowFounder(false)} />}
    </section>
  )
}
