import { useCallback, useState } from 'react'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Marquee from './components/Marquee'
import Hero from './sections/Hero'
import Intro from './sections/Intro'
import Work from './sections/Work'
import Statement from './sections/Statement'
import Services from './sections/Services'
import About from './sections/About'
import Testimonials from './sections/Testimonials'
import Clients from './sections/Clients'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

/**
 * Page rhythm — each chapter deliberately breaks the previous one's
 * scale so the scroll never settles into a template cadence.
 */
export default function App() {
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])

  return (
    <div className="grain">
      <a href="#work" className="skip-link">
        Skip to content
      </a>

      <Preloader onDone={onReady} />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main id="main">
        <Hero ready={ready} />
        <Intro />

        {/* Disciplines band */}
        <Marquee
          items={['BRANDING', 'DIGITAL', 'MOTION', 'DEVELOPMENT', 'STRATEGY']}
          speed={1.5}
          direction={-1}
          className="border-y border-[var(--border)] py-7 text-bone/[0.14] md:py-10"
        />

        <Work />
        <Statement />
        <Services />
        <About />
        <Testimonials />
        <Clients />

        {/* Signature band, running the other way */}
        <Marquee
          items={['EVERY IDEA HAS A VERSION', 'VRSN®']}
          speed={1.2}
          direction={1}
          separator="—"
          className="border-y border-[var(--border)] py-7 text-bone/[0.1] md:py-10"
        />

        <Contact />
      </main>

      <Footer />
    </div>
  )
}
