import { useCallback, useState } from 'react'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Marquee from './components/Marquee'
import ScrollTextLines from './components/ScrollTextLines'
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
 * Page composition.
 *
 * Eleven movements, each numbered like a printed contents page, and the
 * ground alternates between paper and ink so the scroll never settles into
 * a single register:
 *
 *   Hero · Manifesto          paper   quiet, type-driven
 *   Statement                 ink     the loud claim
 *   Work                      ink     the printed portfolio
 *   Services · About          paper   the argument
 *   Process                   ink     sticky, photographic
 *   Collaboration             paper   the register
 *   Kinetic installation      paper   the installation
 *   Contact · Footer          ink     the close
 *
 * Two typographic bands break the type before each major shift — one
 * running left, one running right, so the page has a pulse.
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

        {/* Kinetic typography — the collaboration mark, before the close */}
        <ScrollTextLines />

        {/* Signature band, running the other way */}
        <Marquee
          items={['Every idea has a version', 'VRSN®', 'Independent creative studio']}
          speed={1}
          direction={1}
          size="lg"
          separator="—"
          className="border-y border-line py-8 md:py-11"
        />

        <Contact />
      </main>

      <Footer />
    </div>
  )
}
