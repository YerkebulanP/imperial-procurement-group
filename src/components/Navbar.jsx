import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'О компании',  href: '#about',      id: 'about' },
  { label: 'Услуги',      href: '#categories', id: 'categories' },
  { label: 'Калькулятор', href: '#calculator', id: 'calculator' },
  { label: 'Аналитика',   href: '#analytics',  id: 'analytics' },
  { label: 'Почему мы?',   href: '#whyus',      id: 'whyus' },
  { label: 'Контакты',    href: '#contact',    id: 'contact' },
]

function IPGShield({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield shape */}
      <path
        d="M22 2L4 9V22C4 31.5 12 39.5 22 42C32 39.5 40 31.5 40 22V9L22 2Z"
        fill="rgba(197,160,89,0.12)"
        stroke="#C5A059"
        strokeWidth="1.2"
      />
      {/* Inner shield border */}
      <path
        d="M22 5L7 11V22C7 30 13.5 37 22 39.5C30.5 37 37 30 37 22V11L22 5Z"
        fill="none"
        stroke="rgba(197,160,89,0.35)"
        strokeWidth="0.6"
      />
      {/* IPG text */}
      <text
        x="22" y="24"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Cinzel, serif"
        fontSize="9"
        fontWeight="700"
        fill="#C5A059"
        letterSpacing="1"
      >IPG</text>
    </svg>
  )
}

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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 3.5rem',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>

        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <IPGShield size={46} />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontFamily: 'Cinzel, serif', color: '#C5A059', fontSize: '13px', letterSpacing: '0.28em', fontWeight: 700 }}>
              IMPERIAL
            </div>
            <div style={{ fontFamily: 'Cinzel, serif', color: 'rgba(197,160,89,0.5)', fontSize: '8px', letterSpacing: '0.22em', marginTop: '2px' }}>
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
                  <span style={{ color: 'rgba(197,160,89,0.25)', fontSize: '14px', margin: '0 4px' }}>|</span>
                )}
                <a
                  href={link.href}
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: isActive ? '#C5A059' : 'rgba(232,217,176,0.65)',
                    padding: '8px 16px',
                    position: 'relative',
                    transition: 'color 0.25s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#C5A059' }}
                  onMouseLeave={e => { e.currentTarget.style.color = isActive ? '#C5A059' : 'rgba(232,217,176,0.65)' }}
                >
                  {link.label}
                  <span style={{
                    position: 'absolute', bottom: 2, left: '16px', right: '16px',
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
            fontFamily: 'Cinzel, serif', fontSize: '10px',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            textDecoration: 'none', color: '#0d0a08',
            background: '#C5A059',
            border: '1px solid rgba(197,160,89,0.5)',
            padding: '10px 22px',
          }}
        >
          Начать экспансию
        </a>

        {/* Mobile burger */}
        <button
          className="nav-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#C5A059' }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(13,10,8,0.98)', borderTop: '1px solid rgba(197,160,89,0.15)', padding: '1.5rem 2rem' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {navLinks.map(link => (
              <li key={link.id}>
                <a href={link.href} onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: 'Cinzel, serif', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', color: active === link.id ? '#C5A059' : 'rgba(232,217,176,0.6)' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-cta   { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
