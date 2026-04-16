import { useState } from 'react'

const initialForm = { name: '', company: '', phone: '', email: '', message: '', source: 'landing' }

export default function ContactForm() {
  const [form, setForm]     = useState(initialForm)
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-imperial">
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontSize: '10px', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Посольство
          </p>
          <h2 className="section-title">Укрепить границы бизнеса</h2>
          <div className="gold-divider" />
          <p className="section-subtitle" style={{ fontSize: 'clamp(13px, 1.3vw, 17px)' }}>
            Оставьте заявку — ваш личный интендант свяжется в течение 2 часов.
          </p>
        </div>

        {/* Panel */}
        <div className="imperial-panel" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <span className="panel-corner tl" />
          <span className="panel-corner tr" />
          <span className="panel-corner bl" />
          <span className="panel-corner br" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--line-soft)', position: 'relative', zIndex: 2 }}>

            {/* Left: form */}
            <div style={{ background: 'var(--bg-card)', padding: '3rem' }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🏛️</div>
                  <h3 style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.8rem' }}>
                    Посольство получило вашу весть
                  </h3>
                  <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                    Ваш интендант свяжется в течение 2 часов.<br />Добро пожаловать в Империю.
                  </p>
                  <button onClick={() => setStatus('idle')}
                    style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontSize: '10px', letterSpacing: '0.3em', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', textDecoration: 'underline' }}>
                    Отправить ещё одну заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="form-grid">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="field-group">
                      <label className="field-label">Ваше имя *</label>
                      <input className="field-input" type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Имя" />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Компания</label>
                      <input className="field-input" type="text" name="company" value={form.company} onChange={handleChange} placeholder="Название" />
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="field-label">Телефон *</label>
                    <input className="field-input" type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+7 (___) ___-__-__" />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Email</label>
                    <input className="field-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@company.com" />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Что нужно?</label>
                    <textarea className="field-textarea" name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Модель техники, нужные запчасти, объём..." />
                  </div>

                  {status === 'error' && (
                    <p style={{ fontFamily: 'Cinzel, serif', color: '#C0622A', fontSize: '11px', margin: 0 }}>
                      Ошибка отправки. Позвоните нам напрямую.
                    </p>
                  )}

                  <button type="submit" disabled={status === 'loading'}
                    className="btn-imperial"
                    style={{ width: '100%', opacity: status === 'loading' ? 0.6 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}>
                    {status === 'loading' ? 'Отправка...' : 'Начать экспансию'}
                  </button>

                  {/* <p style={{ color: 'var(--text-dim)', fontSize: '9px', textAlign: 'center', margin: 0 }}>
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p> */}
                </form>
              )}
            </div>

            {/* Right: info */}
            <div style={{ background: 'var(--bg-deep)', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, color: 'var(--text-main)', fontSize: '1.35rem', marginBottom: '2rem', letterSpacing: '0.01em' }}>
                  Все дороги ведут к нам
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    { label: 'Телефон',      value: '+7 (XXX) XXX-XX-XX' },
                    { label: 'Email',         value: 'info@imperial-pg.kz' },
                    { label: 'Режим работы', value: 'Пн–Пт: 9:00 — 18:00' },
                    { label: 'Локация',       value: 'Казахстан' },
                  ].map((item) => (
                    <div key={item.label} style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--line-soft)' }}>
                      <span style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>
                        {item.label}
                      </span>
                      <span style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 500 }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '2rem', borderLeft: '2px solid var(--gold-3)', paddingLeft: '1.4rem' }}>
                <p style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-2)', fontStyle: 'italic', fontSize: '0.88rem', lineHeight: 1.85, margin: '0 0 0.75rem' }}>
                  «Ни один триумф не начинался без разведки. Свяжитесь с нами — мы оценим ваши потребности и предложим стратегию снабжения.»
                </p>
                <div style={{ color: 'var(--text-dim)', fontSize: '10px', letterSpacing: '0.2em' }}>
                  — Главный интендант IPG
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
