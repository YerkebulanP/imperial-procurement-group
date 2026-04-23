import { useState, useEffect } from 'react'
import imperialLogo from '/imperial-logo.png'

const navLinks = [
  { label: 'О компании',  href: '#about',      id: 'about' },
  { label: 'Услуги',      href: '#categories', id: 'categories' },
  { label: 'Калькулятор', href: '#calculator', id: 'calculator' },
  { label: 'Аналитика',   href: '#analytics',  id: 'analytics' },
  { label: 'Почему мы?',  href: '#whyus',      id: 'whyus' },
  { label: 'Контакты',    href: '#contact',    id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)

    const visible = {}
    const observers = navLinks.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          visible[id] = entry.intersectionRatio
          const top = Object.entries(visible).sort((a, b) => b[1] - a[1])[0]
          if (top && top[1] > 0) setActive(top[0])
          else setActive('hero')
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
      )
      obs.observe(el)
      return obs
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observers.forEach(o => o?.disconnect())
    }
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all 0.4s ease',
      background: scrolled
        ? 'rgba(13,10,8,0.97)'
        : 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(197,160,89,0.15)' : 'none',
    }}>
      <div className="nav-inner" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>

        {/* Logo */}
        <a href="#hero" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <img src={imperialLogo} alt="Imperial Logo" className="nav-logo-img" style={{ width: 'auto', objectFit: 'contain' }} />
          <div style={{ lineHeight: 1 }}>
            <div className="nav-logo-title" style={{ fontFamily: 'Cinzel, serif', color: '#C5A059', fontWeight: 700 }}>
              IMPERIAL
            </div>
            <div className="nav-logo-sub" style={{ fontFamily: 'Cinzel, serif', color: 'rgba(197,160,89,0.5)', marginTop: '2px' }}>
              PROCUREMENT GROUP
            </div>
          </div>
        </a>

        {/* Nav links */}
        <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map((link, i) => {
            const isActive = active === link.id
            return (
              <li key={link.id} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && (
                  <span style={{ color: 'rgba(197,160,89,0.25)', fontSize: '12px', margin: '0 2px' }}>|</span>
                )}
                <a
                  href={link.href}
                  className="nav-link-a"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: isActive ? '#C5A059' : 'rgba(232,217,176,0.65)',
                    position: 'relative',
                    transition: 'color 0.25s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#C5A059' }}
                  onMouseLeave={e => { e.currentTarget.style.color = isActive ? '#C5A059' : 'rgba(232,217,176,0.65)' }}
                >
                  {link.label}
                  <span style={{
                    position: 'absolute', bottom: 1, left: 0, right: 0,
                    height: '1px', background: '#C5A059',
                    transition: 'opacity 0.25s',
                    opacity: isActive ? 1 : 0,
                  }} />
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="nav-cta"
          style={{
            fontFamily: 'Cinzel, serif',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: '#0d0a08',
            background: '#C5A059',
            border: '1px solid rgba(197,160,89,0.5)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Начать экспансию
        </a>

        {/* Burger */}
        <button
          className="nav-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#C5A059', padding: '4px' }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile / tablet dropdown menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(13,10,8,0.98)', borderTop: '1px solid rgba(197,160,89,0.15)', padding: '1.25rem 1.5rem' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {navLinks.map(link => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '12px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: active === link.id ? '#C5A059' : 'rgba(232,217,176,0.6)',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li style={{ marginTop: '0.5rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(197,160,89,0.12)' }}>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'inline-block',
                  fontFamily: 'Cinzel, serif',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: '#0d0a08',
                  background: '#C5A059',
                  padding: '10px 20px',
                }}
              >
                Начать экспансию
              </a>
            </li>
          </ul>
        </div>
      )}

      <style>{`
        /* ── База: стандартный ПК / FullHD 1080p ── */
        .nav-inner      { padding: 0.85rem 2.5rem; }
        .nav-logo-img   { height: 42px; }
        .nav-logo-title { font-size: 13px; letter-spacing: 0.26em; }
        .nav-logo-sub   { font-size: 8px;  letter-spacing: 0.18em; }
        .nav-link-a     { font-size: 11px; padding: 8px 12px; letter-spacing: 0.11em; }
        .nav-cta        { font-size: 10px; padding: 10px 20px; }

        /* ── XL монитор / 2K-4K (≥ 1600px) ── */
        @media (min-width: 1600px) {
          .nav-inner      { padding: 1.2rem 3.5rem; }
          .nav-logo-img   { height: 58px; }
          .nav-logo-title { font-size: 15px; letter-spacing: 0.30em; }
          .nav-logo-sub   { font-size: 9px;  letter-spacing: 0.24em; }
          .nav-link-a     { font-size: 12px; padding: 10px 16px; letter-spacing: 0.13em; }
          .nav-cta        { font-size: 11px; padding: 12px 26px; }
        }

        /* ── Ноутбук / HD (1024px – 1279px) ── */
        @media (max-width: 1279px) {
          .nav-inner      { padding: 0.7rem 2rem; }
          .nav-logo-img   { height: 36px; }
          .nav-logo-title { font-size: 11px; letter-spacing: 0.20em; }
          .nav-logo-sub   { font-size: 7px;  letter-spacing: 0.14em; }
          .nav-link-a     { font-size: 9.5px; padding: 7px 10px; letter-spacing: 0.08em; }
          .nav-cta        { font-size: 9px;  padding: 8px 15px; }
        }

        /* ── Маленький ноутбук / iPad landscape (900px – 1023px) ── */
        @media (max-width: 1023px) {
          .nav-inner      { padding: 0.6rem 1.5rem; }
          .nav-logo-img   { height: 32px; }
          .nav-logo-title { font-size: 10px; letter-spacing: 0.16em; }
          .nav-logo-sub   { font-size: 6px;  letter-spacing: 0.12em; }
          .nav-link-a     { font-size: 8.5px; padding: 6px 7px; letter-spacing: 0.06em; }
          .nav-cta        { font-size: 8px;  padding: 7px 11px; }
        }

        /* ── Планшет / iPad portrait (≤ 899px) — бургер ── */
        @media (max-width: 899px) {
          .nav-links  { display: none !important; }
          .nav-cta    { display: none !important; }
          .nav-burger { display: flex !important; align-items: center; }
          .nav-inner      { padding: 0.6rem 1.75rem; }
          .nav-logo-img   { height: 34px; }
          .nav-logo-title { font-size: 11px; letter-spacing: 0.22em; }
          .nav-logo-sub   { font-size: 7px; letter-spacing: 0.18em; }
        }

        /* ── Большой телефон / phablet (≤ 767px) ── */
        @media (max-width: 767px) {
          .nav-inner      { padding: 0.55rem 1.25rem; }
          .nav-logo-img   { height: 30px; }
          .nav-logo-title { font-size: 10px; letter-spacing: 0.2em; }
          .nav-logo-sub   { font-size: 6.5px; letter-spacing: 0.15em; }
        }

        /* ── Маленький мобильный (≤ 479px) ── */
        @media (max-width: 479px) {
          .nav-inner      { padding: 0.55rem 1rem; }
          .nav-logo-img   { height: 28px; }
          .nav-logo-title { font-size: 10px; letter-spacing: 0.18em; }
          .nav-logo-sub   { display: none; }
        }
      `}</style>
    </nav>
  )
}
