import { useState, useMemo } from 'react'
import {
  PieChart, Pie, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from 'recharts'

/* ── palette ── */
const GOLD = '#D4AF37'

/* ── mock datasets (fill встроен в данные) ── */
const REPAIR_DATA = [
  { name: 'Ремонт ходовой части',      value: 36.4,  fill: '#4FC3F7' },
  { name: 'Замена фильтров',           value: 14.8,  fill: '#1565C0' },
  { name: 'Ремонт двигателя',          value: 11.2,  fill: '#FF7043' },
  { name: 'Ремонт электрики',          value: 9.1,   fill: '#7B1FA2' },
  { name: 'Ремонт топливной системы',  value: 7.5,   fill: '#AB47BC' },
  { name: 'Ремонт гидравлики',         value: 6.3,   fill: '#E91E63' },
  { name: 'ТО плановое',               value: 5.8,   fill: '#4CAF50' },
  { name: 'Замена запчастей',          value: 4.2,   fill: '#009688' },
  { name: 'Сварочные работы',          value: 2.9,   fill: '#26C6DA' },
  { name: 'Прочее',                    value: 1.8,   fill: '#FFAB91' },
]
const HOURS_DATA = [
  { name: 'Рабочие часы',   value: 50.0,  fill: '#FF7043' },
  { name: 'Ремонт',         value: 31.9,  fill: '#1A237E' },
  { name: 'Простои',        value: 12.14, fill: '#4FC3F7' },
  { name: 'Прочее',         value: 5.96,  fill: '#311B92' },
]
const DOWN_DATA = [
  { name: 'Ожидание запчастей',    value: 42.5,  fill: '#4FC3F7' },
  { name: 'Отсутствие топлива',    value: 23.1,  fill: '#1A237E' },
  { name: 'Погодные условия',      value: 15.8,  fill: '#FF7043' },
  { name: 'Отсутствие экипажа',    value: 11.2,  fill: '#7B1FA2' },
  { name: 'Технические неисправн.',value: 7.4,   fill: '#EC407A' },
]

/* motor hours line — generate daily data Nov 2025 – Apr 2026 */
function genMotorHours() {
  const pts = []
  const months = [
    { label: 'ноя 2025', days: 30, base: 148 },
    { label: 'дек 2025', days: 31, base: 142 },
    { label: 'янв 2026', days: 31, base: 150 },
    { label: 'фев 2026', days: 28, base: 155 },
    { label: 'мар 2026', days: 31, base: 158 },
    { label: 'апр 2026', days: 15, base: 162 },
  ]
  months.forEach(m => {
    for (let d = 1; d <= m.days; d += 3) {
      const noise = (Math.sin(d * 0.7 + m.base) * 28 + Math.random() * 14 - 7)
      pts.push({ date: `${d} ${m.label.split(' ')[0]}`, value: Math.max(100, Math.round(m.base + noise)), month: m.label })
    }
  })
  return pts
}
const MOTOR_DATA = genMotorHours()

/* ── tabs ── */
const TABS = [
  'Общий суточный отчет',
  'Плановые по производительности',
  'Объёмы',
  'ГСМ',
  'Моточасы',
  'Часы простоя/ремонта',
  'Операторы',
  'Рейтинг операторов',
]

/* ── companies / equipment ── */
const COMPANIES = ['Nord Mining Ltd.', 'ТехноРесурс', 'ГорнякПро']
const EQUIPMENT_CATS = [
  { label: 'Вспомогательная тех.', sub: ['Volvo FH16 (Аренда)', 'Liebherr LTM 1100'] },
  { label: 'Карьерный транспорт',  sub: ['Komatsu HD785', 'CAT 793F', 'Sandvik TH663'] },
  { label: 'Бульдозеры/грейдеры', sub: ['CAT D10T', 'Komatsu GD825'] },
  { label: 'Экскавация',           sub: ['Hitachi EX1200', 'Liebherr R 9400'] },
]

/* ── custom tooltip ── */
function DarkTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'rgba(10,8,4,0.96)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 8, padding: '8px 14px', fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: '#e8d9b0' }}>
      {label && <div style={{ color: GOLD, marginBottom: 4, fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.1em' }}>{label}</div>}
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || GOLD }}>{p.name}: <b>{typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</b></div>
      ))}
    </div>
  )
}

/* ── donut label ── */
function DonutLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  if (percent < 0.05) return null
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={9} fontFamily="Montserrat, sans-serif">
      {(percent * 100).toFixed(1)}%
    </text>
  )
}

/* ── KPI card ── */
function KpiCard({ value, label, color = GOLD }) {
  return (
    <div style={{ background: 'rgba(212,175,55,0.08)', border: `1px solid rgba(212,175,55,0.2)`, borderRadius: 8, padding: '14px 18px', minWidth: 140 }}>
      <div style={{ fontFamily: 'Cinzel, serif', fontSize: 28, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(212,175,55,0.6)', marginTop: 4 }}>{label}</div>
    </div>
  )
}

/* ── checkbox ── */
function Chk({ label, checked, onChange, indent = false }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', paddingLeft: indent ? 14 : 0, marginBottom: 5 }}>
      <div onClick={onChange} style={{
        width: 14, height: 14, border: `1px solid ${checked ? GOLD : 'rgba(212,175,55,0.3)'}`,
        background: checked ? GOLD : 'transparent', borderRadius: 2, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <svg width="9" height="7" viewBox="0 0 9 7"><path d="M1 3l2.5 2.5L8 1" stroke="#0d0a08" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>}
      </div>
      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(212,175,55,0.75)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>{label}</span>
    </label>
  )
}

/* ── seed-based pseudo-random (детерминированный по фильтрам) ── */
function seededRand(seed) {
  let s = seed
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646 }
}

/* компании → базовый множитель нагрузки */
const COMPANY_FACTOR = { 'Nord Mining Ltd.': 1.0, 'ТехноРесурс': 0.72, 'ГорнякПро': 1.31 }

export default function PowerBIDashboard() {
  const [companies,  setCompanies]  = useState({ 'Nord Mining Ltd.': true, 'ТехноРесурс': false, 'ГорнякПро': false })
  const [catOpen,    setCatOpen]    = useState({ 0: false, 1: true, 2: false, 3: false })
  const [catChecked, setCatChecked] = useState({ 0: false, 1: true, 2: false, 3: false })
  const [shift, setShift] = useState(1)
  const [dateFrom, setDateFrom] = useState('2025-11-01')
  const [dateTo,   setDateTo]   = useState('2025-11-30')

  const toggleCompany = (c) => setCompanies(p => ({ ...p, [c]: !p[c] }))
  const toggleCat = (i) => { setCatChecked(p => ({ ...p, [i]: !p[i] })); setCatOpen(p => ({ ...p, [i]: !p[i] })) }

  /* ── общий коэффициент на основе фильтров ── */
  const filterKey = useMemo(() => {
    const active = Object.entries(companies).filter(([,v]) => v).map(([k]) => k)
    const cats   = Object.entries(catChecked).filter(([,v]) => v).map(([k]) => k)
    return active.join('|') + '_' + cats.join('|') + '_' + shift + '_' + dateFrom + '_' + dateTo
  }, [companies, catChecked, shift, dateFrom, dateTo])

  const scaleFactor = useMemo(() => {
    const active = Object.entries(companies).filter(([,v]) => v).map(([k]) => k)
    if (!active.length) return 0.4
    const base = active.reduce((s, c) => s + (COMPANY_FACTOR[c] ?? 1), 0) / active.length
    const shiftMod = shift === 1 ? 1.0 : 0.65
    const cats = Object.values(catChecked).filter(Boolean).length
    const catMod = cats === 0 ? 0.55 : 0.55 + cats * 0.15
    const days = Math.max(1, Math.round((new Date(dateTo) - new Date(dateFrom)) / 86400000))
    const dateMod = Math.min(1.4, days / 30)
    return base * shiftMod * catMod * dateMod
  }, [filterKey])

  /* ── динамические данные графиков ── */
  const repairData = useMemo(() => {
    const rand = seededRand(filterKey.length * 31 + Math.floor(scaleFactor * 100))
    return REPAIR_DATA.map(d => ({ ...d, value: Math.max(0.5, +(d.value * scaleFactor * (0.75 + rand() * 0.5)).toFixed(1)) }))
  }, [filterKey, scaleFactor])

  const hoursData = useMemo(() => {
    const rand = seededRand(filterKey.length * 17 + Math.floor(scaleFactor * 77))
    return HOURS_DATA.map(d => ({ ...d, value: Math.max(0.5, +(d.value * scaleFactor * (0.8 + rand() * 0.4)).toFixed(1)) }))
  }, [filterKey, scaleFactor])

  const downData = useMemo(() => {
    const rand = seededRand(filterKey.length * 53 + Math.floor(scaleFactor * 44))
    return DOWN_DATA.map(d => ({ ...d, value: Math.max(0.5, +(d.value * scaleFactor * (0.7 + rand() * 0.6)).toFixed(1)) }))
  }, [filterKey, scaleFactor])

  /* ── линейный график: дата + фильтры ── */
  const motorFiltered = useMemo(() => {
    const from = new Date(dateFrom), to = new Date(dateTo)
    const diffDays = Math.max(1, Math.round((to - from) / 86400000))
    const count = Math.min(MOTOR_DATA.length, Math.max(4, Math.round(diffDays / 3)))
    const rand = seededRand(filterKey.length * 7 + shift * 13)
    return MOTOR_DATA.slice(0, count).map(p => ({
      ...p,
      value: Math.max(60, Math.round(p.value * scaleFactor * (0.85 + rand() * 0.3))),
    }))
  }, [filterKey, scaleFactor])

  /* ── KPI ── */
  const kpiRepair  = useMemo(() => Math.round(3931 * scaleFactor), [scaleFactor])
  const kpiMotor   = useMemo(() => (17 * scaleFactor).toFixed(1),  [scaleFactor])

  const sStyle = {
    background: 'rgba(12,9,5,0.80)',
    border: '1px solid rgba(212,175,55,0.15)',
    borderRadius: 10,
    padding: '1rem',
  }

  return (
    <section id="analytics" className="section-imperial">
      <div className="container">

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', color: GOLD, fontSize: '10px', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Данные и статистика
          </p>
          <h2 className="section-title">Аналитика Imperial</h2>
          <div className="gold-divider" />
          <p className="section-subtitle" style={{ fontSize: 'clamp(13px, 1.3vw, 17px)' }}>
            Интерактивный дашборд управления техникой — в реальном времени
          </p>
        </div>

        {/* Dashboard shell */}
        <div style={{ background: 'rgba(8,6,3,0.88)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 14, overflow: 'hidden' }}>

          {/* Top bar */}
          <div style={{ background: 'rgba(20,15,8,0.95)', borderBottom: '1px solid rgba(212,175,55,0.12)', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'Cinzel, serif', color: GOLD, fontSize: 11, letterSpacing: '0.2em' }}>IPG ANALYTICS</span>
            <div style={{ flex: 1 }} />
            <span style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(212,175,55,0.4)', fontSize: 10 }}>Последнее обновление: сегодня 08:00</span>
          </div>

          <div style={{ display: 'flex', minHeight: 560 }}>

            {/* ── SIDEBAR ── */}
            <div style={{ width: 220, flexShrink: 0, background: 'rgba(14,10,5,0.9)', borderRight: '1px solid rgba(212,175,55,0.1)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>

              {/* Date */}
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', color: GOLD, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 8 }}>Период</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[['от', dateFrom, setDateFrom], ['до', dateTo, setDateTo]].map(([lbl, val, set]) => (
                    <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: 'rgba(212,175,55,0.5)', width: 16 }}>{lbl}</span>
                      <input type="date" value={val} onChange={e => set(e.target.value)}
                        style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 5, color: 'rgba(212,175,55,0.8)', fontFamily: 'Montserrat, sans-serif', fontSize: 10, padding: '4px 6px', width: '100%', colorScheme: 'dark' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Companies */}
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', color: GOLD, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 8 }}>Местоположение</div>
                {COMPANIES.map(c => <Chk key={c} label={c} checked={companies[c]} onChange={() => toggleCompany(c)} />)}
              </div>

              {/* Shift */}
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', color: GOLD, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 8 }}>Смена</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[1, 2].map(s => (
                    <button key={s} onClick={() => setShift(s)} style={{
                      flex: 1, padding: '6px 0', fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 600,
                      background: shift === s ? GOLD : 'transparent',
                      color: shift === s ? '#0d0a08' : 'rgba(212,175,55,0.6)',
                      border: `1px solid ${shift === s ? GOLD : 'rgba(212,175,55,0.25)'}`,
                      borderRadius: 5, cursor: 'pointer',
                    }}>{s} смена</button>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', color: GOLD, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 8 }}>Техника</div>
                {EQUIPMENT_CATS.map((cat, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
                      <span onClick={() => setCatOpen(p => ({ ...p, [i]: !p[i] }))}
                        style={{ color: 'rgba(212,175,55,0.4)', fontSize: 9, cursor: 'pointer', userSelect: 'none' }}>
                        {catOpen[i] ? '▾' : '▸'}
                      </span>
                      <Chk label={cat.label} checked={catChecked[i]} onChange={() => toggleCat(i)} />
                    </div>
                    {catOpen[i] && cat.sub.map(s => <Chk key={s} label={s} checked={catChecked[i]} onChange={() => {}} indent />)}
                  </div>
                ))}
              </div>

              {/* KPI cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
                <KpiCard value={kpiRepair.toLocaleString('ru-RU')} label="Сумма часов ремонта" color="#FF7043" />
                <KpiCard value={`${kpiMotor} тыс.`} label="Отработанные моточасы" color={GOLD} />
              </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>

              {/* Row 1: Donut charts */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>

                {/* Ремонт */}
                <div style={sStyle}>
                  <div style={{ fontFamily: 'Cinzel, serif', color: GOLD, fontSize: 11, letterSpacing: '0.1em', marginBottom: 8 }}>Ремонт</div>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {/* Donut */}
                    <div style={{ flexShrink: 0, width: 200, height: 200 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={repairData} cx="50%" cy="50%" innerRadius={52} outerRadius={88} dataKey="value" labelLine={false} label={DonutLabel} />
                          <Tooltip content={<DarkTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    {/* Legend */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {repairData.map((d, i) => (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '6px 12px',
                          background: 'rgba(212,175,55,0.04)',
                          border: '1px solid rgba(212,175,55,0.1)',
                          borderRadius: 6,
                          borderLeft: `3px solid ${d.fill}`,
                        }}>
                          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(232,217,176,0.8)', flex: 1 }}>{d.name}</span>
                          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 700, color: d.fill, flexShrink: 0 }}>{d.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Все часы */}
                <div style={{ ...sStyle, display: 'none' }}>
                  <div style={{ fontFamily: 'Cinzel, serif', color: GOLD, fontSize: 11, letterSpacing: '0.1em', marginBottom: 8 }}>Все часы · работа · простои</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={hoursData} cx="50%" cy="50%" innerRadius={42} outerRadius={72} dataKey="value" labelLine={false} label={DonutLabel} />
                      <Tooltip content={<DarkTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                    {hoursData.map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: d.fill, flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, color: 'rgba(212,175,55,0.65)', flex: 1 }}>{d.name}</span>
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, color: 'rgba(212,175,55,0.9)' }}>{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Простои */}
                <div style={{ ...sStyle, display: 'none' }}>
                  <div style={{ fontFamily: 'Cinzel, serif', color: GOLD, fontSize: 11, letterSpacing: '0.1em', marginBottom: 8 }}>Простои</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={downData} cx="50%" cy="50%" innerRadius={42} outerRadius={72} dataKey="value" labelLine={false} label={DonutLabel} />
                      <Tooltip content={<DarkTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                    {downData.map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: d.fill, flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, color: 'rgba(212,175,55,0.65)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, color: 'rgba(212,175,55,0.9)' }}>{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Row 2: Line chart */}
              <div style={sStyle}>
                <div style={{ fontFamily: 'Cinzel, serif', color: GOLD, fontSize: 11, letterSpacing: '0.1em', marginBottom: 12 }}>
                  Отработанные моточасы по дате
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={motorFiltered}>
                    <CartesianGrid stroke="rgba(212,175,55,0.07)" />
                    <XAxis dataKey="date" tick={{ fill: 'rgba(212,175,55,0.4)', fontSize: 9, fontFamily: 'Montserrat, sans-serif' }} axisLine={{ stroke: 'rgba(212,175,55,0.1)' }} tickLine={false} interval={Math.floor(motorFiltered.length / 8)} />
                    <YAxis tick={{ fill: 'rgba(212,175,55,0.4)', fontSize: 9, fontFamily: 'Montserrat, sans-serif' }} axisLine={false} tickLine={false} domain={[90, 200]} />
                    <Tooltip content={<DarkTooltip />} />
                    <Line type="monotone" dataKey="value" name="Моточасы" stroke="#4FC3F7" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#4FC3F7' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </div>
          </div>

          {/* ── TAB BAR ── */}
          <div style={{ background: 'rgba(14,10,5,0.95)', borderTop: '1px solid rgba(212,175,55,0.12)', padding: '0 8px' }}>
            <button style={{
              padding: '8px 20px', whiteSpace: 'nowrap',
              fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 600,
              color: GOLD, background: 'transparent', border: 'none', cursor: 'default',
              borderBottom: `2px solid ${GOLD}`,
            }}>
              Часы ремонтных работ
            </button>
          </div>

        </div>

        {/* Premium CTA */}
        <div style={{ marginTop: 20, textAlign: 'center', padding: '1.5rem', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 10 }}>
          <p style={{ fontFamily: 'Cinzel, serif', color: GOLD, fontSize: 13, letterSpacing: '0.1em', marginBottom: 12 }}>
            Подключите аналитику к данным вашего предприятия
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(212,175,55,0.6)', fontSize: 12, marginBottom: 16 }}>
            Интеграция с вашей ERP / 1С · AI-прогноз отказов · Индивидуальные дашборды
          </p>
          <a href="#contact" className="btn-imperial" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 32px', fontSize: 11 }}>
            Получить демо-доступ →
          </a>
        </div>

      </div>
    </section>
  )
}
