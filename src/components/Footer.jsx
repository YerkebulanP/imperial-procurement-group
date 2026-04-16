export default function Footer() {
  const links = [
    ['Главная',              '#hero'],
    ['О компании',           '#about'],
    ['Арсенал и склады',     '#categories'],
    ['Калькулятор триумфа',  '#calculator'],
    ['Контакты',             '#contact'],
  ]
  const brands = ['Komatsu', 'XCMG', 'CAT', 'Liebherr', 'Hitachi', 'Volvo', 'Doosan', 'JCB', 'Sandvik']

  return (
    <footer style={{ position: 'relative', background: 'rgba(5, 4, 2, 0.78)' }}>
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, var(--gold-3) 30%, var(--gold-3) 70%, transparent 100%)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '4rem', marginBottom: '3rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--gold-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontWeight: 700, fontSize: '1.2rem' }}>I</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontSize: '14px', letterSpacing: '0.3em', fontWeight: 700 }}>IMPERIAL</div>
                <div style={{ fontFamily: 'Cinzel, serif', color: 'var(--text-dim)', fontSize: '10px', letterSpacing: '0.25em' }}>PROCUREMENT GROUP</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.85, marginBottom: '2rem', maxWidth: '300px' }}>
              Комплексное снабжение спецтехники — запчасти, фильтры, расходники.
              Строим на века. Снабжаем как империю.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {brands.map((b) => (
                <span key={b} style={{ padding: '5px 12px', border: '1px solid var(--line-soft)', fontFamily: 'Cinzel, serif', color: 'var(--text-dim)', fontSize: '10px', letterSpacing: '0.15em' }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Навигация
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {links.map(([label, href]) => (
                <li key={href}>
                  <a href={href} style={{ fontFamily: 'Cinzel, serif', color: 'var(--text-dim)', fontSize: '13px', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold-3)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-dim)' }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Контакты
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { label: 'Телефон', value: '+7 (XXX) XXX-XX-XX' },
                { label: 'Email',   value: 'info@imperial-pg.kz' },
                { label: 'Время',   value: 'Пн–Пт: 9:00–18:00' },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-2)', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '3px' }}>
                    {item.label}
                  </div>
                  <div style={{ color: 'var(--text-soft)', fontSize: '0.9rem' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--line-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ fontFamily: 'Cinzel, serif', color: 'var(--text-dim)', fontSize: '11px', letterSpacing: '0.1em' }}>
            © {new Date().getFullYear()} Imperial Procurement Group. Все права защищены.
          </div>
          <div style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-2)', fontSize: '11px', letterSpacing: '0.15em', fontStyle: 'italic' }}>
            «Roma aeterna» — Империя вечна
          </div>
        </div>
      </div>
    </footer>
  )
}
