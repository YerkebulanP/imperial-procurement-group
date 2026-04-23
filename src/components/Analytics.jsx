import {
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'

/* ── Mock data ── */
const savingsData = [
  { month: 'Янв', без_IPG: 150, с_IPG: 58 },
  { month: 'Фев', без_IPG: 300, с_IPG: 112 },
  { month: 'Мар', без_IPG: 450, с_IPG: 163 },
  { month: 'Апр', без_IPG: 600, с_IPG: 210 },
  { month: 'Май', без_IPG: 750, с_IPG: 255 },
  { month: 'Июн', без_IPG: 900, с_IPG: 298 },
  { month: 'Июл', без_IPG: 1050, с_IPG: 340 },
  { month: 'Авг', без_IPG: 1200, с_IPG: 378 },
  { month: 'Сен', без_IPG: 1350, с_IPG: 415 },
  { month: 'Окт', без_IPG: 1500, с_IPG: 450 },
  { month: 'Ноя', без_IPG: 1650, с_IPG: 483 },
  { month: 'Дек', без_IPG: 1800, с_IPG: 514 },
]

const downtimeData = [
  { name: 'Экскаватор', до: 8.4, после: 1.9 },
  { name: 'Бульдозер',  до: 6.2, после: 1.4 },
  { name: 'Грейдер',    до: 5.1, после: 1.1 },
  { name: 'Кран',       до: 9.8, после: 2.2 },
  { name: 'Самосвал',   до: 4.6, после: 1.0 },
  { name: 'Буровая',    до: 11.2, после: 2.5 },
]

const deliveryData = [
  { month: 'Янв', IPG: 2.1, Рынок: 13.4 },
  { month: 'Фев', IPG: 1.9, Рынок: 11.8 },
  { month: 'Мар', IPG: 2.3, Рынок: 14.2 },
  { month: 'Апр', IPG: 1.8, Рынок: 12.1 },
  { month: 'Май', IPG: 2.0, Рынок: 13.7 },
  { month: 'Июн', IPG: 1.7, Рынок: 10.9 },
  { month: 'Июл', IPG: 1.9, Рынок: 12.5 },
  { month: 'Авг', IPG: 1.6, Рынок: 11.3 },
  { month: 'Сен', IPG: 1.8, Рынок: 13.0 },
  { month: 'Окт', IPG: 1.5, Рынок: 12.8 },
  { month: 'Ноя', IPG: 1.7, Рынок: 11.6 },
  { month: 'Дек', IPG: 1.4, Рынок: 10.7 },
]

/* ── Shared chart theme ── */
const GOLD   = '#D4AF37'
const RED    = '#fb923c'
const GREEN  = '#22c55e'
const GRID   = 'rgba(212,175,55,0.08)'
const AXIS   = 'rgba(212,175,55,0.4)'

const tooltipStyle = {
  contentStyle: {
    background: 'rgba(12,9,5,0.95)',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: 8,
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 12,
    color: '#e8d9b0',
  },
  itemStyle: { fontFamily: 'Montserrat, sans-serif', fontSize: 12 },
  labelStyle: { color: GOLD, fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: '0.1em' },
  cursor: { stroke: 'rgba(212,175,55,0.2)', strokeWidth: 1 },
}

const axisStyle = {
  tick: { fill: AXIS, fontSize: 10, fontFamily: 'Montserrat, sans-serif' },
  axisLine: { stroke: GRID },
  tickLine: false,
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="analytics-chart-card" style={{
      background: 'rgba(12, 9, 5, 0.72)',
      border: '1px solid rgba(212,175,55,0.18)',
      borderRadius: 12,
      padding: '1.1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.8rem',
    }}>
      <div>
        <div style={{ fontFamily: 'Cinzel, serif', color: GOLD, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
          {title}
        </div>
        <div style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(212,175,55,0.5)', fontSize: 11 }}>
          {subtitle}
        </div>
      </div>
      {children}
    </div>
  )
}

export default function Analytics() {
  return (
    <section id="analytics" className="section-imperial">
      <style>{`
        @media (max-width: 1599px) {
          .analytics-charts-grid  { gap: 12px !important; }
          .analytics-chart-card   { padding: 0.85rem !important; }
          .analytics-premium-side { padding: 1.3rem !important; }
        }
        @media (max-width: 1279px) {
          .analytics-chart-card   { padding: 0.75rem !important; }
          .analytics-premium-side { padding: 1.1rem !important; }
        }
        @media (max-width: 899px) {
          .analytics-charts-grid  { grid-template-columns: 1fr !important; }
          .analytics-premium-grid { grid-template-columns: 1fr !important; }
          .analytics-premium-blur { display: none !important; }
          .analytics-premium-side { border-right: none !important; }
        }
      `}</style>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', color: GOLD, fontSize: '10px', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Данные и статистика
          </p>
          <h2 className="section-title">Аналитика Imperial</h2>
          <div className="gold-divider" />
          <p className="section-subtitle" style={{ fontSize: 'clamp(13px, 1.3vw, 17px)' }}>
            Реальные показатели клиентов IPG. Данные — оружие империи.
          </p>
        </div>

        {/* Charts grid */}
        <div className="analytics-charts-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

          {/* Chart 1 — Накопленные потери */}
          <ChartCard
            title="Накопленные потери"
            subtitle="Сравнение затрат на простой — без IPG и с IPG (тыс. USD)"
          >
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={savingsData}>
                <defs>
                  <linearGradient id="grad-loss" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={RED}   stopOpacity={0.4} />
                    <stop offset="100%" stopColor={RED}   stopOpacity={0}   />
                  </linearGradient>
                  <linearGradient id="grad-ipg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={GOLD}  stopOpacity={0.35} />
                    <stop offset="100%" stopColor={GOLD}  stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="month" {...axisStyle} />
                <YAxis {...axisStyle} />
                <Tooltip {...tooltipStyle} />
                <Legend wrapperStyle={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(212,175,55,0.7)' }} />
                <Area type="monotone" dataKey="без_IPG" name="Без IPG" stroke={RED}  strokeWidth={2} fill="url(#grad-loss)" />
                <Area type="monotone" dataKey="с_IPG"   name="С IPG"   stroke={GOLD} strokeWidth={2} fill="url(#grad-ipg)"  />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Chart 2 — Срок доставки */}
          <ChartCard
            title="Срок доставки запчастей"
            subtitle="Среднее время доставки (дней) — IPG vs рынок"
          >
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={deliveryData}>
                <CartesianGrid stroke={GRID} />
                <XAxis dataKey="month" {...axisStyle} />
                <YAxis {...axisStyle} unit=" д." />
                <Tooltip {...tooltipStyle} />
                <Legend wrapperStyle={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(212,175,55,0.7)' }} />
                <Line type="monotone" dataKey="IPG"    name="IPG"    stroke={GOLD} strokeWidth={2.5} dot={{ fill: GOLD, r: 3 }}  activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="Рынок"  name="Рынок"  stroke={RED}  strokeWidth={2}   dot={{ fill: RED,  r: 2 }}  activeDot={{ r: 4 }} strokeDasharray="5 3" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

        </div>

        {/* Chart 3 — Простои по технике (full width) */}
        <ChartCard
          title="Простой техники по категориям"
          subtitle="Среднее количество дней простоя в месяц — до и после подключения IPG"
        >
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={downtimeData} barCategoryGap="30%">
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="name" {...axisStyle} />
              <YAxis {...axisStyle} unit=" д." />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(212,175,55,0.7)' }} />
              <Bar dataKey="до"    name="До IPG"    fill={RED}   radius={[4,4,0,0]} fillOpacity={0.85} />
              <Bar dataKey="после" name="После IPG" fill={GREEN} radius={[4,4,0,0]} fillOpacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Premium AI card */}
        <div style={{
          marginTop: 20,
          position: 'relative',
          background: 'rgba(12,9,5,0.75)',
          border: '1px solid rgba(212,175,55,0.35)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {/* gold top line */}
          <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

          <div className="analytics-premium-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>

            {/* Left — blurred demo charts */}
            <div className="analytics-premium-side analytics-premium-blur" style={{ padding: '1.6rem', borderRight: '1px solid rgba(212,175,55,0.12)', filter: 'blur(3px)', pointerEvents: 'none', opacity: 0.5 }}>
              <div style={{ fontFamily: 'Cinzel, serif', color: GOLD, fontSize: 12, letterSpacing: '0.15em', marginBottom: 12 }}>AI ПРОГНОЗ ОТКАЗОВ</div>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={savingsData.slice(0, 8)}>
                  <defs>
                    <linearGradient id="ai-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#818cf8" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="с_IPG" stroke="#818cf8" strokeWidth={2} fill="url(#ai-grad)" />
                  <XAxis dataKey="month" hide />
                  <YAxis hide />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Right — Premium info */}
            <div className="analytics-premium-side" style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ padding: '4px 12px', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: 20, fontFamily: 'Cinzel, serif', color: GOLD, fontSize: 10, letterSpacing: '0.3em' }}>
                  PREMIUM
                </div>
              </div>
              <h3 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', fontWeight: 700, letterSpacing: '0.05em', margin: 0 }}>
                AI-Аналитика вашего парка
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {[
                  '🔮  Прогноз отказов на 30–90 дней вперёд',
                  '📊  Индивидуальные дашборды по вашему парку',
                  '⚡  Автоматические заявки на замену деталей',
                  '🤖  Рекомендации на основе данных эксплуатации',
                  '📡  Интеграция с вашей ERP / 1C',
                ].map(f => (
                  <li key={f} style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(212,175,55,0.75)', fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-imperial" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.5rem', padding: '12px 28px', fontSize: 11 }}>
                Подключить AI-аналитику →
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
