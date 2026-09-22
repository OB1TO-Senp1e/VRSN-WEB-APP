/* ============================================================
   VRSN® — content model
   Brand identity, positioning and project copy are the studio's own.
   No invented clients, awards, years, revenue or statistics.
   ============================================================ */

export const studio = {
  name: 'VRSN',
  mark: '®',
  tagline: 'Every idea has a version.',
  positioning: 'Independent creative studio',
  disciplines: 'Brand · Web · Motion',
  email: 'hello@vrsn.studio',
  location: 'Working worldwide',
  timezone: 'GMT+0 — GMT+8',
  founded: '2016',
  /** Replace with the real address when you want it public. */
  addressNote: 'Remote-first — meetings in person on request'
} as const

/* ------------------------------------------------------------------ */
/* Hero / Manifesto / Statement                                        */
/* ------------------------------------------------------------------ */

export const hero = {
  label: 'Independent creative studio',
  /** Lines of the headline. `em` marks the serif-italic word. */
  headline: [
    { text: 'EVERY BRAND', em: null },
    { text: 'HAS A BETTER', em: null },
    { text: 'VERSION.', em: 'Version' }
  ],
  /** Short positioning under the headline. */
  positioning:
    'We are an independent studio for brand identity, digital experience and motion. We find the version of a company people actually remember — then build it, end to end.',
  cta: 'Start a project',
  /** Sits on the hero baseline as the third column. */
  disciplines: ['Brand identity', 'Digital experience', 'Motion']
} as const

/** Scroll-scrubbed manifesto. Words in `emphasis` resolve to the accent. */
export const manifesto = {
  lines: ['DESIGN', 'IS NOT', 'DECORATION.'],
  em: 'Decoration',
  text:
    'A brand is not a logo, a palette or a deck. It is the residue left behind after every encounter. So we design the encounters — the first visit, the second look, the moment someone decides to remember you.',
  emphasis: ['residue', 'encounters']
} as const

export const statement = {
  headline: ['WE MAKE', 'IDEAS', 'VISIBLE.'],
  em: 'Visible',
  body: [
    'VRSN is an independent practice for companies that would rather be recognised than described. We work in three moves — find the idea, give it a form, then build it properly.',
    'Small team by design, led by the people who actually make the work.'
  ]
} as const

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

/**
 * Editorial layout recipe — no two consecutive projects share one.
 *  feature      — large, left, 8/12
 *  offset-right — narrower, pushed right, 5/12, vertically offset
 *  full         — full bleed 12/12, meta on a two-column baseline
 *  split        — image 7/12 with meta standing beside it
 *  half-right   — 6/12 from column 7
 *  tall-left    — 5/12 portrait
 *  wide-right   — 7/12 from column 6
 */
export type Composition =
  | 'feature'
  | 'offset-right'
  | 'full'
  | 'split'
  | 'half-right'
  | 'tall-left'
  | 'wide-right'

export interface Project {
  id: string
  index: string
  title: string
  categories: string[]
  discipline: string
  year: string
  client: string
  summary: string
  image: string
  alt: string
  aspect: string
  composition: Composition
}

export const projects: Project[] = [
  {
    id: 'aether',
    index: '01',
    title: 'Aether',
    categories: ['branding', 'web'],
    discipline: 'Brand Identity / Web',
    year: '2026',
    client: 'Aether Energy',
    summary:
      'Identity and launch platform for a climate-tech company turning industrial waste heat into power.',
    image: '/images/work-aether.jpg',
    alt: 'Angular concrete stairwell cut by hard diagonal shadows — Aether brand campaign image',
    aspect: 'aspect-[4/5]',
    composition: 'feature'
  },
  {
    id: 'monolith',
    index: '02',
    title: 'Monolith',
    categories: ['digital', 'web'],
    discipline: 'Digital Experience',
    year: '2025',
    client: 'Monolith Furniture',
    summary:
      'An immersive product configurator for a furniture house obsessed with material honesty.',
    image: '/images/work-monolith.jpg',
    alt: 'Intersecting black structural beams against a textured pale wall — Monolith visual',
    aspect: 'aspect-[3/4]',
    composition: 'offset-right'
  },
  {
    id: 'halcyon',
    index: '03',
    title: 'Halcyon',
    categories: ['branding', 'packaging'],
    discipline: 'Identity / Packaging',
    year: '2025',
    client: 'Halcyon',
    summary:
      'A restrained identity and packaging system for a fragrance house built on a single note.',
    image: '/images/work-halcyon.jpg',
    alt: 'Wide monochrome modernist facade with deep repeating window recesses — Halcyon identity',
    aspect: 'aspect-[4/3] md:aspect-[21/9]',
    composition: 'full'
  },
  {
    id: 'orbital',
    index: '04',
    title: 'Orbital',
    categories: ['motion', 'digital'],
    discipline: 'Creative Technology',
    year: '2025',
    client: 'Orbital Eyewear',
    summary:
      'A real-time generative system driving the in-store screens of a luxury eyewear brand.',
    image: '/images/work-orbital.jpg',
    alt: 'Curved architectural surface traced with flowing lines under soft light — Orbital system',
    aspect: 'aspect-[3/4] md:aspect-[4/5]',
    composition: 'split'
  },
  {
    id: 'cadence',
    index: '05',
    title: 'Cadence',
    categories: ['motion', 'web'],
    discipline: 'Motion / Web',
    year: '2024',
    client: 'Cadence Music Group',
    summary:
      'Editorial platform and motion language for a music publisher with a century of archive.',
    image: '/images/work-cadence.jpg',
    alt: 'Rhythmic bands of light and shadow falling across a wooden interior — Cadence editorial',
    aspect: 'aspect-[16/10]',
    composition: 'half-right'
  },
  {
    id: 'praxis',
    index: '06',
    title: 'Praxis',
    categories: ['digital', 'web'],
    discipline: 'Design System / Web',
    year: '2024',
    client: 'Praxis Architects',
    summary:
      'A component library and editorial front-end for an architecture practice publishing its own research.',
    image: '/images/work-praxis.jpg',
    alt: 'Steep monochrome stairwell seen from below with strong parallel handrails — Praxis system',
    aspect: 'aspect-[2/3]',
    composition: 'tall-left'
  },
  {
    id: 'hollow',
    index: '07',
    title: 'Hollow',
    categories: ['branding'],
    discipline: 'Typographic Identity',
    year: '2024',
    client: 'Hollow Type Foundry',
    summary:
      'A typographic identity for an independent type foundry, built entirely from its own letterforms.',
    image: '/images/work-hollow.jpg',
    alt: 'Minimal building exterior with clean geometry and one deep shadow — Hollow identity',
    aspect: 'aspect-[4/5] md:aspect-[16/9]',
    composition: 'full'
  },
  {
    id: 'noem',
    index: '08',
    title: 'Noem',
    categories: ['motion', 'branding'],
    discipline: 'Brand Film / Motion',
    year: '2023',
    client: 'Noem Robotics',
    summary:
      'A launch film and motion system for a robotics company that had never shown its own product.',
    image: '/images/work-noem.jpg',
    alt: 'Abstract monochrome architectural detail of overlapping planes — Noem motion still',
    aspect: 'aspect-[16/10]',
    composition: 'wide-right'
  }
]

export interface Filter {
  key: string
  label: string
}

export const filters: Filter[] = [
  { key: 'all', label: 'All' },
  { key: 'branding', label: 'Branding' },
  { key: 'digital', label: 'Digital' },
  { key: 'web', label: 'Web' },
  { key: 'motion', label: 'Motion' },
  { key: 'packaging', label: 'Packaging' }
]

/* ------------------------------------------------------------------ */
/* Archive                                                             */
/* ------------------------------------------------------------------ */

export interface ArchiveEntry {
  title: string
  category: string
  year: string
}

export const archive: ArchiveEntry[] = [
  { title: 'Northwind', category: 'Web Design', year: '2023' },
  { title: 'Parallel', category: 'Product Design', year: '2023' },
  { title: 'Sable', category: 'Brand Identity', year: '2022' },
  { title: 'Kestrel', category: 'Digital Experience', year: '2022' },
  { title: 'Meridian', category: 'Web Development', year: '2021' },
  { title: 'Isle', category: 'Motion Design', year: '2020' },
  { title: 'Tonal', category: 'Creative Direction', year: '2019' }
]

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export interface Service {
  index: string
  title: string
  body: string
  tags: string[]
  image: string
  alt: string
}

export const services: Service[] = [
  {
    index: '01',
    title: 'Brand Strategy',
    body:
      'We set the creative north star — the idea every touchpoint is measured against. Positioning, narrative, art direction, and the courage to cut what does not serve the story.',
    tags: ['Positioning', 'Narrative', 'Art Direction', 'Naming'],
    image: '/images/work-aether.jpg',
    alt: 'Concrete stairwell with hard diagonal shadows'
  },
  {
    index: '02',
    title: 'Visual Identity',
    body:
      'Identity systems built to flex across screens, spaces and time. Logotype, typography, colour and motion principles designed as one living system — never a static PDF.',
    tags: ['Logotype', 'Typography', 'Colour', 'Guidelines'],
    image: '/images/work-hollow.jpg',
    alt: 'Minimal building exterior with clean geometry'
  },
  {
    index: '03',
    title: 'Digital Experience',
    body:
      'Editorial layouts, deliberate typography and interfaces that feel inevitable. We design in the browser early, so what you approve is what you ship.',
    tags: ['UX', 'Editorial Layout', 'Design Systems', 'Prototyping'],
    image: '/images/work-monolith.jpg',
    alt: 'Intersecting black structural beams'
  },
  {
    index: '04',
    title: 'Web Design',
    body:
      'Sites that carry the brand rather than dilute it. Composition, rhythm and hierarchy first — then the details that make it feel expensive.',
    tags: ['Art Direction', 'Layout', 'Interaction', 'Accessibility'],
    image: '/images/work-praxis.jpg',
    alt: 'Steep monochrome stairwell from below'
  },
  {
    index: '05',
    title: 'Development',
    body:
      'Fast, accessible, maintainable front-ends. Modern React, headless integrations, WebGL when it earns its place — and performance budgets we actually keep.',
    tags: ['React', 'TypeScript', 'Headless CMS', 'Performance'],
    image: '/images/work-noem.jpg',
    alt: 'Abstract architectural detail of overlapping planes'
  },
  {
    index: '06',
    title: 'Motion',
    body:
      'Motion is a material. We define timing, easing and choreography so interfaces feel physical — from micro-interactions to full launch films.',
    tags: ['Interaction Motion', 'Brand Films', 'Generative', 'Real-time'],
    image: '/images/work-cadence.jpg',
    alt: 'Rhythmic bands of light across a wooden interior'
  }
]

export const marqueeDisciplines = ['Strategy', 'Branding', 'Digital', 'Motion', 'Development']
export const marqueeSignature = ['Every idea has a version', 'VRSN®']

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export interface ProcessStage {
  index: string
  title: string
  body: string
  image: string
  alt: string
}

export const processStages: ProcessStage[] = [
  {
    index: '01',
    title: 'Discover',
    body:
      'We start by listening. Stakeholder interviews, audits, and a brutally honest look at what the brand is versus what it says it is.',
    image: '/images/work-praxis.jpg',
    alt: 'Steep monochrome stairwell — discovery reference'
  },
  {
    index: '02',
    title: 'Strategy',
    body:
      'Insight becomes direction. We define positioning, experience principles and success criteria before a single pixel moves.',
    image: '/images/work-hollow.jpg',
    alt: 'Minimal geometric building exterior — strategy reference'
  },
  {
    index: '03',
    title: 'Design',
    body:
      'Identity, interface and motion evolve together. Short loops, real in-browser work — never just static mockups.',
    image: '/images/work-monolith.jpg',
    alt: 'Intersecting structural beams — design reference'
  },
  {
    index: '04',
    title: 'Develop',
    body:
      'Engineering starts on day one, not after sign-off. Clean component architecture, accessibility and performance budgets are non-negotiable.',
    image: '/images/work-orbital.jpg',
    alt: 'Curved architectural surface traced with flowing lines — development reference'
  },
  {
    index: '05',
    title: 'Launch',
    body:
      'A launch is a beginning. We ship, measure, refine — and hand over a system your team can actually run.',
    image: '/images/work-noem.jpg',
    alt: 'Abstract architectural planes — launch reference'
  }
]

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  label: 'The studio',
  headline: ['A SMALL', 'STUDIO WITH', 'A LONG MEMORY.'],
  em: 'Memory',
  /** Facts we can state without inventing figures. */
  facts: [
    { label: 'Practice', value: 'Independent' },
    { label: 'Team', value: 'Small, senior' },
    { label: 'Disciplines', value: 'Brand · Web · Motion' },
    { label: 'Working', value: studio.location }
  ],
  body: [
    'Great work comes from fewer, deeper collaborations — not a production line. We keep the team small, the process honest and the standard uncomfortable.',
    'If it does not move the work forward, we cut it. That applies to features, pages, meetings and ideas — including our own.'
  ]
} as const

export const principles = [
  {
    index: '01',
    title: 'Strategy before surface',
    body: 'If we cannot explain why it exists, we do not design it.'
  },
  {
    index: '02',
    title: 'Fewer, deeper projects',
    body: 'A small team, led by the people who actually make the work.'
  },
  {
    index: '03',
    title: 'Built, not mocked up',
    body: 'We design in the browser, so what you approve is what ships.'
  }
]

/* ------------------------------------------------------------------ */
/* Collaboration — who the studio works with                           */
/* ------------------------------------------------------------------ */

export interface Audience {
  index: string
  title: string
  body: string
}

export const collaboration = {
  label: 'Who we work with',
  headline: ['FOR THE', 'PEOPLE WHO', 'MAKE THINGS.'],
  intro: 'We keep the roster short so every project gets the people who run the studio.'
}

export const audiences: Audience[] = [
  {
    index: '01',
    title: 'For founders',
    body: 'Companies that have outgrown their first identity and need the next one to carry real weight.'
  },
  {
    index: '02',
    title: 'For culture',
    body: 'Publishers, labels, institutions and foundries with an archive worth showing properly.'
  },
  {
    index: '03',
    title: 'For products',
    body: 'Hardware and software that deserve to be seen and felt — not just explained.'
  },
  {
    index: '04',
    title: 'For ambitious brands',
    body: 'Anyone who would rather be recognised than described.'
  }
]

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' }
]

export const mobileNavLinks = [
  { index: '01', label: 'Work', href: '#work' },
  { index: '02', label: 'About', href: '#about' },
  { index: '03', label: 'Services', href: '#services' },
  { index: '04', label: 'Contact', href: '#contact' }
]

export const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'X', href: 'https://x.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' }
]
