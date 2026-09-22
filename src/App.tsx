import { useState, useCallback } from 'react'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Marquee from './components/Marquee'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Services from './sections/Services'
import About from './sections/About'
import Process from './sections/Process'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  const onPreloaderDone = useCallback(() => setReady(true), [])

  return (
    <div className="grain">
      <Preloader onDone={onPreloaderDone} />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero ready={ready} />

        <Marquee
          items={['CREATIVE TECHNOLOGY', 'DIGITAL EXPERIENCES', 'BRAND × WEB × MOTION']}
          className="border-y border-[rgba(242,239,233,0.08)] py-8 text-bone-dim/60 md:py-12"
        />

        <Work />
        <Services />
        <About />
        <Process />
        <Testimonials />

        <Marquee
          items={['EVERY IDEA HAS A VERSION', 'VRSN®']}
          baseVelocity={1.6}
          className="border-y border-[rgba(242,239,233,0.08)] py-8 text-bone/10 md:py-12"
        />

        <Contact />
      </main>

      <Footer />
    </div>
  )
}
