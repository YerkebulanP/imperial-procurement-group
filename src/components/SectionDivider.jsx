export default function SectionDivider() {
  return (
    <div style={{ position: 'relative', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* левая линия */}
      <div style={{
        flex: 1,
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.35))',
      }} />
      {/* центральный орнамент */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 18px' }}>
        <div style={{ width: '4px', height: '4px', background: 'rgba(212,175,55,0.4)', transform: 'rotate(45deg)' }} />
        <div style={{ width: '7px', height: '7px', background: 'rgba(212,175,55,0.65)', transform: 'rotate(45deg)', boxShadow: '0 0 6px rgba(212,175,55,0.3)' }} />
        <div style={{ width: '4px', height: '4px', background: 'rgba(212,175,55,0.4)', transform: 'rotate(45deg)' }} />
      </div>
      {/* правая линия */}
      <div style={{
        flex: 1,
        height: '1px',
        background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.35))',
      }} />
    </div>
  )
}
