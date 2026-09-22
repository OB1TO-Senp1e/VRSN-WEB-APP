import { useCallback, useState } from 'react'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Marquee from './components/Marquee'
import Hero from './sections/Hero'
import Manifesto from './sections/Manifesto'
import Statement from './sections/Statement'
import Work from './sections/Work'
import Services from './sections/Services'
import About from './sections/About'
import Process from './sections/Process'
import Collaboration from './sections/Collaboration'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

/**
 * Page rhythm — chapters alternate between paper and ink so the scroll
 * never settles into a single register:
 *
 *   Hero · Manifesto      paper   (quiet, type-driven)
 *   Statement             ink     (the loud claim)
 *   Work · Services ·
 *   About                 paper   (the printed portfolio)
 *   Process               ink     (sticky, photographic)
 *   Collaboration         paper   (editorial list)
 *   Contact · Footer      ink     (the close)
 */
export default function App() {
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])

  return (
    <div>
      <a href="#work" className="skip-link">
        Skip to work
      </a>

      <Preloader onDone={onReady} />
      <CustomCursor />
      <ScrollProgress />
      <Navbar ready={ready} />

      <main id="main">
        <Hero ready={ready} />

        <Manifesto />

        {/* Disciplines band — breaks the type before the loud statement */}
        <Marquee
          items={['Strategy', 'Branding', 'Digital', 'Motion', 'Development']}
          speed={1.2}
          direction={-1}
          size="md"
          className="border-y border-line py-6 md:py-8"
        />

        <Statement />

        <Work />

        <Services />

        <About />

        <Process />

        <Collaboration />

        {/* Signature band, running the other way */}
        <Marquee
          items={['Every idea has a version', 'VRSN®', 'Independent creative studio']}
          speed={1}
          direction={1}
          size="lg"
          separator="—"
          className="border-y border-line py-8 md:py-12"
        />

        <Contact />
      </main>

      <Footer />
    </div>
  )
}
