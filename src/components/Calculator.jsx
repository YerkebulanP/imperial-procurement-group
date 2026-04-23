import { useState, useMemo } from 'react'

/* ── tokens (из test.css) ── */
const T = {
  bgCard:    'rgba(31, 41, 55, 0.55)',
  bgInput:   'rgba(17, 24, 39, 0.75)',
  border:    'rgba(255, 255, 255, 0.08)',
  borderAcc: 'rgba(245, 158, 11, 0.22)',
  textMain:  '#f3f4f6',
  textSec:   'rgba(243, 244, 246, 0.65)',
  accent:    '#f59e0b',
  accentSoft:'rgba(245, 158, 11, 0.15)',
  success:   '#22c55e',
  danger:    '#fb923c',
  rxXl:      32,
  rxLg:      22,
  rxMd:      16,
}

const MACHINES = [
  { id: 'excavator', label: 'Экскаватор', icon: '🚜', rate: 380, defaultVolume: 5000 },
  { id: 'bulldozer', label: 'Бульдозер',  icon: '🏗️', rate: 320, defaultVolume: 3000 },
  { id: 'grader',    label: 'Грейдер',    icon: '🚧', rate: 290, defaultVolume: 2000 },
  { id: 'crane',     label: 'Кран',       icon: '🏗️', rate: 450, defaultVolume:  500 },
  { id: 'dumper',    label: 'Самосвал',   icon: '🚛', rate: 260, defaultVolume: 4000 },
  { id: 'loader',    label: 'Погрузчик',  icon: '🚧', rate: 300, defaultVolume: 3500 },
  { id: 'drill',     label: 'Буровая',    icon: '⚙️', rate: 520, defaultVolume:  200 },
]

const BRANDS_BY_MACHINE = {
  excavator: ['CAT','Komatsu','Hitachi','XCMG','Shantui','SDLG','Hyundai','Doosan','Volvo CE'],
  bulldozer: ['CAT','Komatsu','Shantui','XCMG','SDLG','ЧЕТРА'],
  grader:    ['CAT','Komatsu','XCMG','SDLG','Shantui'],
  crane:     ['XCMG','Zoomlion','Liebherr','Tadano','Manitowoc','Terex'],
  dumper:    ['CAT','Komatsu','XCMG','Shantui','БелАЗ','Hitachi'],
  loader:    ['CAT','Komatsu','XCMG','SDLG','Shantui','Hitachi','LiuGong'],
  drill:     ['Atlas Copco','Sandvik','Epiroc','Furukawa','Boart Longyear'],
}

const fmt = n => new Intl.NumberFormat('ru-RU').format(Math.round(n))

/* ── input-row (из test.html структуры) ── */
function InputRow({ icon, label, children }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '4px 10px',
        background: hover ? 'rgba(25, 33, 50, 0.9)' : T.bgInput,
        border: `1px solid ${hover ? T.borderAcc : 'rgba(255,255,255,0.05)'}`,
        borderRadius: T.rxMd,
        marginBottom: 3,
        opacity: 0.85,
        transition: 'background 0.18s, border-color 0.18s',
        cursor: 'default',
      }}
    >
      {/* icon box */}
      <div style={{
        width: 22, height: 22, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: T.accentSoft,
        borderRadius: 6,
        fontSize: 11,
      }}>
        {icon}
      </div>

      {/* label — fixed width */}
      <span style={{
        flexShrink: 0, width: 130,
        fontFamily: 'Inter, Montserrat, sans-serif',
        fontSize: 11, fontWeight: 400,
        color: T.textSec,
      }}>{label}</span>

      {/* control — fills remaining space */}
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  )
}

/* ── styled select inside InputRow ── */
const selectStyle = {
  width: '100%',
  backgroundColor: 'rgba(0,0,0,0.35)',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23f59e0b' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 8px center',
  backgroundSize: '10px',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  outline: 'none',
  color: T.textMain,
  fontFamily: 'Inter, Montserrat, sans-serif',
  fontSize: 13, fontWeight: 600,
  cursor: 'pointer',
  appearance: 'none',
  padding: '5px 26px 5px 10px',
}

/* ── shared styles ── */
const numBoxStyle = {
  display: 'flex', alignItems: 'center',
  width: '100%',
  backgroundColor: 'rgba(0,0,0,0.35)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  padding: '5px 10px',
  boxSizing: 'border-box',
}
const numInputStyle = {
  flex: 1, minWidth: 0,
  background: 'transparent', border: 'none', outline: 'none',
  color: T.textMain,
  fontFamily: 'Inter, Montserrat, sans-serif',
  fontSize: 13, fontWeight: 600,
  textAlign: 'right',
}
const numSuffixStyle = {
  fontFamily: 'Inter, Montserrat, sans-serif',
  fontSize: 11, color: T.textSec,
  marginLeft: 5, flexShrink: 0,
}

/* ── NumInput: клик очищает поле, blur восстанавливает если пусто ── */
function NumInput({ value, onChange, suffix, min = 0, max }) {
  const [text, setText] = useState(String(value))
  const [focused, setFocused] = useState(false)

  const displayed = focused ? text : String(value)

  const handleFocus = (e) => {
    setText('')
    setFocused(true)
  }

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setText(raw)
    const n = parseInt(raw, 10)
    if (!isNaN(n)) {
      let clamped = Math.max(min, n)
      if (max !== undefined) clamped = Math.min(max, clamped)
      onChange(clamped)
    }
  }

  const handleBlur = () => {
    setFocused(false)
    const n = parseInt(text, 10)
    if (isNaN(n) || text === '') {
      // ничего не ввели — оставляем старое значение
      setText(String(value))
    } else {
      let clamped = Math.max(min, n)
      if (max !== undefined) clamped = Math.min(max, clamped)
      onChange(clamped)
      setText(String(clamped))
    }
  }

  return (
    <div style={numBoxStyle}>
      <input
        type="text"
        inputMode="numeric"
        value={displayed}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        className="calc-plain-num"
        style={numInputStyle}
      />
      {suffix && <span style={numSuffixStyle}>{suffix}</span>}
    </div>
  )
}

/* ── Growing cumulative chart (grouped: без IPG vs с IPG) ── */
function GrowingChart({ lossMonth, savedMonth }) {
  const labels = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']
  const H = 68, BW = 7, innerGap = 2, outerGap = 6
  const groupW = BW * 2 + innerGap
  const totalW = labels.length * (groupW + outerGap) - outerGap
  const maxVal = lossMonth * labels.length || 1

  return (
    <svg viewBox={`0 0 ${totalW} ${H + 18}`} style={{ width: '100%', display: 'block' }}>
      <defs>
        <linearGradient id="cg-loss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fb923c" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#b45309" stopOpacity="0.2"  />
        </linearGradient>
        <linearGradient id="cg-save" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#22c55e" stopOpacity="0.9"  />
          <stop offset="100%" stopColor="#15803d" stopOpacity="0.2"  />
        </linearGradient>
      </defs>
      {labels.map((_, i) => {
        const withoutIPG = lossMonth * (i + 1)
        const withIPG    = (lossMonth - savedMonth) * (i + 1)

        const hWithout = Math.max(3, (withoutIPG / maxVal) * H)
        const hWith    = Math.max(3, (withIPG    / maxVal) * H)

        const groupX = i * (groupW + outerGap)
        const baseY  = H

        return (
          <g key={i}>
            {/* бар БЕЗ IPG — оранжевый */}
            <rect x={groupX} y={baseY - hWithout} width={BW} height={hWithout} rx={3}
              fill="url(#cg-loss)" />
            {/* бар С IPG — зелёный (ниже) */}
            <rect x={groupX + BW + innerGap} y={baseY - hWith} width={BW} height={hWith} rx={3}
              fill="url(#cg-save)" />
            {/* подпись месяца */}
            {(i === 0 || i === 3 || i === 6 || i === 11) && (
              <text x={groupX + groupW / 2} y={H + 14}
                textAnchor="middle" fill="#6b7280"
                fontSize="8" fontFamily="Inter, Montserrat, sans-serif">
                {labels[i]}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

/* ── IPG Shield ── */
function IPGShield() {
  return (
    <svg width="48" height="48" viewBox="0 0 44 44" fill="none">
      <path d="M22 2L4 9V22C4 31.5 12 39.5 22 42C32 39.5 40 31.5 40 22V9L22 2Z"
        fill={T.accentSoft} stroke={T.accent} strokeWidth="1.2"/>
      <text x="22" y="24" textAnchor="middle" dominantBaseline="middle"
        fontFamily="Cinzel,serif" fontSize="9" fontWeight="700"
        fill={T.accent} letterSpacing="1">IPG</text>
    </svg>
  )
}

/* ── Result card ── */
function ResultCard({ label, value, unit, color, borderColor, bg }) {
  return (
    <div style={{ padding: '1rem 1.2rem', border: `1px solid ${borderColor}`, borderRadius: T.rxMd, background: bg }}>
      <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', color, opacity: 0.75, fontSize: 9, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 5 }}>{label}</div>
      <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontWeight: 800, color, fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', lineHeight: 1.1 }}>
        {fmt(value)} <span style={{ fontSize: '0.7rem', fontWeight: 500, opacity: 0.6 }}>{unit}</span>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════ */
export default function Calculator() {
  const [machineId,  setMachineId]  = useState('excavator')
  const [brand,      setBrand]      = useState(BRANDS_BY_MACHINE.excavator[0])
  const [baseRate,   setBaseRate]   = useState(380)
  const [volume,       setVolume]       = useState(5000)  // плановый объём в сутки, м³
  const [normHours,    setNormHours]    = useState(20)    // нормативные моточасы/сутки
  const [repairHours,  setRepairHours]  = useState(5)    // часов в ремонте прямо сейчас
  const [downtimeDays, setDowntimeDays] = useState(5)    // дней простоя в месяц
  const [waitingDays,  setWaitingDays]  = useState(2)    // из них — дней ожидания запчастей

  // производительность = объём / нормативные моточасы
  const productivity = normHours > 0 ? +(volume / normHours).toFixed(1) : 0

  const machine = MACHINES.find(m => m.id === machineId) || MACHINES[0]

  const handleMachineChange = (id) => {
    const m = MACHINES.find(m => m.id === id) ?? MACHINES[0]
    setMachineId(id)
    setBaseRate(m.rate)
    setVolume(m.defaultVolume)
    setBrand(BRANDS_BY_MACHINE[id]?.[0] ?? '')
  }

  const { lossPerHour, lossThisRepair, lossMonth, lossYear, savedMonth } = useMemo(() => {
    const lossPerHour    = productivity * baseRate
    const lossThisRepair = repairHours * lossPerHour
    const lossPerDay     = normHours * lossPerHour
    const lossMonth      = lossPerDay * downtimeDays
    const lossYear       = lossMonth * 12
    // экономия = только дни ожидания запчастей, не больше общего простоя
    const clampedWaiting = Math.min(waitingDays, downtimeDays)
    const savedMonth     = lossPerDay * clampedWaiting
    return { lossPerHour, lossThisRepair, lossMonth, lossYear, savedMonth }
  }, [productivity, baseRate, repairHours, normHours, downtimeDays, waitingDays])

  /* ── outer card styles ── */
  const card = {
    width: '100%',
    background: T.bgCard,
    backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
    border: `1px solid ${T.border}`,
    borderRadius: T.rxXl,
    boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
  }

  return (
    <section id="calculator" className="section-imperial">
      <style>{`
        @media (max-width: 1599px) {
          .calc-pane-l, .calc-pane-r { padding: 12px !important; }
        }
        @media (max-width: 1279px) {
          .calc-pane-l, .calc-pane-r { padding: 10px !important; }
        }
        @media (max-width: 1023px) {
          .calc-card { grid-template-columns: 1fr !important; }
          .calc-pane-l {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
          }
        }
        @media (max-width: 599px) {
          .calc-pane-l, .calc-pane-r { padding: 14px !important; }
        }
      `}</style>
      <div className="container" style={{ padding: '0 20px' }}>

        {/* ── Section header ── */}
        <div style={{ textAlign: 'center', marginBottom: '0.8rem' }}>
          {/* <p style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-3)', fontSize: '10px', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Управление надёжностью
          </p> */}
          <h2 className="section-title">Калькулятор потерь</h2>
          <div className="gold-divider" />
          <p className="section-subtitle" style={{ fontSize: 'clamp(13px, 1.3vw, 17px)' }}>
            Рассчитайте реальные потери от простоев техники — и экономию с IPG
          </p>
        </div>

        {/* ══ Main card ══ */}
        <div style={card} className="calc-card">

          {/* ── LEFT ── */}
          <div className="calc-pane-l" style={{ padding: 14, borderRight: `1px solid rgba(255,255,255,0.05)` }}>

            {/* form-card */}
            <div style={{
              background: 'rgba(17, 24, 39, 0.38)',
              border: `1px solid rgba(255,255,255,0.06)`,
              borderRadius: T.rxLg,
              padding: 12,
            }}>
              <div style={{
                fontFamily: 'Inter, Montserrat, sans-serif',
                fontSize: 11, fontWeight: 700,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(243,244,246,0.8)', marginBottom: 8,
              }}>
                Данные техники
              </div>

              <InputRow icon={machine.icon} label="Тип техники">
                <select value={machineId} onChange={e => handleMachineChange(e.target.value)} style={selectStyle}>
                  {MACHINES.map(m => (
                    <option key={m.id} value={m.id} style={{ background: '#1f2937' }}>{m.label}</option>
                  ))}
                </select>
              </InputRow>

              <InputRow icon="🏷️" label="Марка (бренд)">
                <select value={brand} onChange={e => setBrand(e.target.value)} style={selectStyle}>
                  {(BRANDS_BY_MACHINE[machineId] ?? []).map(b => (
                    <option key={b} value={b} style={{ background: '#1f2937' }}>{b}</option>
                  ))}
                </select>
              </InputRow>

              <InputRow icon="💰" label="Базовая ставка за м3">
                <NumInput value={baseRate} onChange={setBaseRate} suffix="тг" min={1} />
              </InputRow>

              <InputRow icon="📦" label="Плановый объём в сутки">
                <NumInput value={volume} onChange={setVolume} suffix="м³" min={1} />
              </InputRow>

              <InputRow icon="🔢" label="Нормативные моточасы">
                <NumInput value={normHours} onChange={setNormHours} suffix="ч./сут" min={1} />
              </InputRow>

              <InputRow icon="⏱️" label="Производительность (м³/ч)">
                <div style={{ ...numBoxStyle, border: `1px solid ${T.borderAcc}`, background: 'rgba(245,158,11,0.06)' }}>
                  <span style={{ ...numInputStyle, color: T.accent, textAlign: 'right', flex: 1 }}>
                    {productivity}
                  </span>
                  <span style={numSuffixStyle}>м³/ч</span>
                </div>
              </InputRow>

              <InputRow icon="🔧" label="Часов в ремонте сейчас">
                <NumInput value={repairHours} onChange={setRepairHours} suffix="ч." min={0} />
              </InputRow>

              <InputRow icon="📅" label="Дней простоя в месяц">
                <NumInput value={downtimeDays} onChange={setDowntimeDays} suffix="дн." min={0} max={31} />
              </InputRow>

              <InputRow icon="📦" label="Сколько дней ждали запчасти?">
                <NumInput value={waitingDays} onChange={v => setWaitingDays(Math.min(v, downtimeDays))} suffix="дн." min={0} max={downtimeDays} />
              </InputRow>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="calc-pane-r" style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>

            {/* results-header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                fontFamily: 'Inter, Montserrat, sans-serif',
                fontSize: 13, fontWeight: 700,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(243,244,246,0.8)',
              }}>
                Результат
              </div>
              <div style={{
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: 20, padding: '3px 12px',
                fontFamily: 'Inter, Montserrat, sans-serif',
                fontSize: 12, fontWeight: 700, color: T.success,
              }}>
                −{Math.min(waitingDays, downtimeDays)} дн./мес с IPG
              </div>
            </div>

            {/* потеряли за этот ремонт — главный эмоциональный акцент */}
            <div style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: T.rxLg, padding: '8px 12px',
            }}>
              <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(239,68,68,0.7)', marginBottom: 4 }}>
                Потеряли за этот ремонт
              </div>
              <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: 'clamp(1rem, 1.4vw, 1.5rem)', fontWeight: 800, color: '#ef4444', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {fmt(lossThisRepair)} тг
              </div>
              <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: 10, color: 'rgba(239,68,68,0.55)', marginTop: 4 }}>
                {fmt(lossPerHour)} тг/ч × {repairHours} ч простоя
              </div>
            </div>

            {/* главные метрики — потери/мес и потери/год */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              <div style={{ background: 'rgba(251,146,60,0.06)', border: '1px solid rgba(251,146,60,0.25)', borderRadius: T.rxMd, padding: '8px 10px' }}>
                <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(251,146,60,0.7)', marginBottom: 4 }}>
                  Потери / месяц
                </div>
                <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: 'clamp(0.9rem, 1.2vw, 1.3rem)', fontWeight: 800, color: T.danger, lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {fmt(lossMonth)}
                </div>
                <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: 10, color: 'rgba(251,146,60,0.5)', marginTop: 3 }}>тг / мес</div>
              </div>
              <div style={{ background: 'rgba(251,146,60,0.1)', border: `1px solid ${T.borderAcc}`, borderRadius: T.rxMd, padding: '8px 10px' }}>
                <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.accent, marginBottom: 4 }}>
                  Потери / год
                </div>
                <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: 'clamp(0.9rem, 1.2vw, 1.3rem)', fontWeight: 800, color: T.accent, lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {fmt(lossYear)}
                </div>
                <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: 10, color: T.textSec, marginTop: 3 }}>тг / год</div>
              </div>
            </div>

            {/* экономия IPG */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
              {[
                { label: 'Экономия с IPG / мес', value: savedMonth, sub: `если не ждать запчасти (−${Math.min(waitingDays, downtimeDays)} дн./мес)`, color: T.success, border: 'rgba(34,197,94,0.2)', bg: 'rgba(34,197,94,0.06)' },
              ].map(({ label, value, sub, color, border, bg }) => (
                <div key={label} style={{ background: bg, border: `1px solid ${border}`, borderRadius: T.rxMd, padding: '8px 12px' }}>
                  <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.textSec, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: '1rem', fontWeight: 800, color }}>{fmt(value)}</div>
                  <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: 10, color: T.textSec, marginTop: 3 }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* chart-card */}
            <div style={{
              background: 'rgba(17,24,39,0.38)',
              border: `1px solid rgba(255,255,255,0.06)`,
              borderRadius: T.rxLg, padding: '8px 12px',
              flex: 1,
            }}>
              <div style={{ marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: 11, fontWeight: 600, color: T.textMain }}>
                    Динамика потерь за год
                  </div>
                  <div style={{
                    background: 'rgba(251,146,60,0.12)',
                    border: '1px solid rgba(251,146,60,0.25)',
                    borderRadius: 20, padding: '2px 8px',
                    fontFamily: 'Inter, Montserrat, sans-serif',
                    fontSize: 10, fontWeight: 700, color: T.danger,
                  }}>
                    накопительно
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: '#fb923c' }} />
                    <span style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: 10, color: T.textSec }}>Потери без IPG</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: '#22c55e' }} />
                    <span style={{ fontFamily: 'Inter, Montserrat, sans-serif', fontSize: 10, color: T.textSec }}>Потери с IPG</span>
                  </div>
                </div>
              </div>
              <GrowingChart lossMonth={lossMonth} savedMonth={savedMonth} />
            </div>

            {/* CTA */}
            <a href="#contact" style={{
              display: 'block', textAlign: 'center',
              padding: '8px 20px',
              background: T.accent, color: '#111827',
              fontFamily: 'Inter, Montserrat, sans-serif',
              fontSize: 12, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: T.rxMd,
            }}>
              Получить аудит техники
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
