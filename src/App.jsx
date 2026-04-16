import { useEffect } from 'react'
import './index.css'
import heroBg from './assets/background - changed.jpeg'

import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import About        from './components/About'
import Categories   from './components/Categories'
import Calculator   from './components/Calculator'
import Analytics    from './components/PowerBIDashboard'
import WhyUs        from './components/WhyUs'
import ContactForm  from './components/ContactForm'
import Footer       from './components/Footer'
import SectionDivider from './components/SectionDivider'

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.06 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function App() {
  useScrollReveal()

  return (
    <div className="page-shell min-h-screen" style={{
      backgroundImage: `url(${heroBg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center center',
    }}>
      <Navbar />

      <Hero />

      {[About, Categories, Calculator, Analytics, WhyUs, ContactForm].map((Section, i) => (
        <div key={i} style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: -16, left: 0, right: 0, zIndex: 10 }}>
            <SectionDivider />
          </div>
          <div className="reveal"><Section /></div>
        </div>
      ))}

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
          <SectionDivider />
        </div>
        <Footer />
      </div>

      <style>{`
        .reveal {
          opacity: 0;
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.visible {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

export default App
