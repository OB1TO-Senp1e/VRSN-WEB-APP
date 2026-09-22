/* ============================================================
   VRSN® — content model
   Brand identity, positioning and project copy are the studio's own.
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
  founded: '2016'
} as const

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

/** Editorial layout recipe — each project is composed differently. */
export type Composition = 'left' | 'right' | 'full' | 'tall-left' | 'tall-right'

export interface Project {
  id: string
  index: string
  title: string
  /** Filter keys this project belongs to. */
  categories: string[]
  /** Human-readable discipline line. */
  discipline: string
  year: string
  summary: string
  image: string
  alt: string
  /** aspect-ratio utility for the frame */
  aspect: string
  composition: Composition
  award?: string
}

export const projects: Project[] = [
  {
    id: 'aether',
    index: '01',
    title: 'Aether',
    categories: ['branding', 'web'],
    discipline: 'Brand Identity / Web',
    year: '2026',
    summary:
      'Identity and launch platform for a climate-tech company turning industrial waste heat into power.',
    image: '/images/work-aether.jpg',
    alt: 'Angular concrete stairwell cut by hard diagonal shadows — Aether brand campaign image',
    aspect: 'aspect-[4/5]',
    composition: 'left',
    award: 'Site of the Day'
  },
  {
    id: 'monolith',
    index: '02',
    title: 'Monolith',
    categories: ['digital', 'web'],
    discipline: 'Digital Experience',
    year: '2025',
    summary:
      'An immersive product configurator for a furniture house obsessed with material honesty.',
    image: '/images/work-monolith.jpg',
    alt: 'Intersecting black structural beams against a textured pale wall — Monolith visual',
    aspect: 'aspect-[3/4]',
    composition: 'tall-right'
  },
  {
    id: 'halcyon',
    index: '03',
    title: 'Halcyon',
    categories: ['branding', 'packaging'],
    discipline: 'Identity / Packaging',
    year: '2025',
    summary:
      'A restrained identity and packaging system for a fragrance house built on a single note.',
    image: '/images/work-halcyon.jpg',
    alt: 'Wide monochrome modernist facade with deep repeating window recesses — Halcyon identity',
    aspect: 'aspect-[21/9]',
    composition: 'full'
  },
  {
    id: 'orbital',
    index: '04',
    title: 'Orbital',
    categories: ['motion', 'digital'],
    discipline: 'Creative Technology',
    year: '2025',
    summary:
      'A real-time generative system driving the in-store screens of a luxury eyewear brand.',
    image: '/images/work-orbital.jpg',
    alt: 'Curved architectural surface traced with flowing lines under soft light — Orbital system',
    aspect: 'aspect-[3/4]',
    composition: 'right'
  },
  {
    id: 'cadence',
    index: '05',
    title: 'Cadence',
    categories: ['motion', 'web'],
    discipline: 'Motion / Web',
    year: '2024',
    summary:
      'Editorial platform and motion language for a music publisher with a century of archive.',
    image: '/images/work-cadence.jpg',
    alt: 'Rhythmic bands of light and shadow falling across a wooden interior — Cadence editorial',
    aspect: 'aspect-[16/10]',
    composition: 'tall-left'
  },
  {
    id: 'praxis',
    index: '06',
    title: 'Praxis',
    categories: ['digital', 'web'],
    discipline: 'Design System / Web',
    year: '2024',
    summary:
      'A component library and editorial front-end for an architecture practice publishing its own research.',
    image: '/images/work-praxis.jpg',
    alt: 'Steep monochrome stairwell seen from below with strong parallel handrails — Praxis system',
    aspect: 'aspect-[2/3]',
    composition: 'left'
  },
  {
    id: 'hollow',
    index: '07',
    title: 'Hollow',
    categories: ['branding'],
    discipline: 'Typographic Identity',
    year: '2024',
    summary:
      'A typographic identity for an independent type foundry, built entirely from its own letterforms.',
    image: '/images/work-hollow.jpg',
    alt: 'Minimal building exterior with clean geometry and one deep shadow — Hollow identity',
    aspect: 'aspect-[16/9]',
    composition: 'full'
  },
  {
    id: 'noem',
    index: '08',
    title: 'Noem',
    categories: ['motion', 'branding'],
    discipline: 'Brand Film / Motion',
    year: '2023',
    summary:
      'A launch film and motion system for a robotics company that had never shown its own product.',
    image: '/images/work-noem.jpg',
    alt: 'Abstract monochrome architectural detail of overlapping planes — Noem motion still',
    aspect: 'aspect-[16/10]',
    composition: 'right'
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
  { key: 'motion', label: 'Motion' },
  { key: 'web', label: 'Web' },
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

/** Compact typographic summary (spec §10). */
export const serviceSummary = [
  'Strategy',
  'Branding',
  'Digital',
  'Development',
  'Motion'
]

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export interface ProcessStage {
  index: string
  title: string
  body: string
}

export const processStages: ProcessStage[] = [
  {
    index: '01',
    title: 'Discover',
    body:
      'We start by listening. Stakeholder interviews, audits, and a brutally honest look at what the brand is versus what it says it is.'
  },
  {
    index: '02',
    title: 'Strategy',
    body:
      'Insight becomes direction. We define positioning, experience principles and success criteria before a single pixel moves.'
  },
  {
    index: '03',
    title: 'Design',
    body:
      'Identity, interface and motion evolve together. Short loops, real in-browser work — never just static mockups.'
  },
  {
    index: '04',
    title: 'Build',
    body:
      'Engineering starts on day one, not after sign-off. Clean component architecture, accessibility and performance budgets are non-negotiable.'
  },
  {
    index: '05',
    title: 'Launch',
    body:
      'A launch is a beginning. We ship, measure, refine — and hand over a system your team can actually run.'
  }
]

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export interface Stat {
  value: number
  suffix: string
  label: string
}

export const stats: Stat[] = [
  { value: 50, suffix: '+', label: 'Projects shipped' },
  { value: 20, suffix: '+', label: 'Global clients' },
  { value: 8, suffix: '', label: 'Disciplines' },
  { value: 10, suffix: '+', label: 'Years of practice' }
]

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
/* Words from clients                                                  */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'VRSN made us look like the company we wanted to become. Twelve months later, we are that company.',
    name: 'Helena Marques',
    role: 'Chief Marketing Officer',
    company: 'Aether Energy'
  },
  {
    quote:
      'The rare studio where the engineers care about the type and the designers care about the frame rate.',
    name: 'Jonas Reuter',
    role: 'Founder & CEO',
    company: 'Monolith Furniture'
  },
  {
    quote:
      'They said no to half of our ideas, and they were right about every single one. The result speaks for itself.',
    name: 'Amara Okafor',
    role: 'Head of Brand',
    company: 'Cadence Music Group'
  }
]

/* ------------------------------------------------------------------ */
/* Clients — placeholder names (spec §12)                              */
/* ------------------------------------------------------------------ */

export interface Client {
  name: string
  sector: string
}

/** Placeholder roster — replace with real client names before launch. */
export const clients: Client[] = [
  { name: 'Aether Energy', sector: 'Climate Tech' },
  { name: 'Monolith', sector: 'Furniture' },
  { name: 'Cadence Music Group', sector: 'Publishing' },
  { name: 'Halcyon', sector: 'Fragrance' },
  { name: 'Praxis Architects', sector: 'Architecture' },
  { name: 'Noem Robotics', sector: 'Hardware' },
  { name: 'Northwind', sector: 'Logistics' },
  { name: 'Sable', sector: 'Hospitality' }
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
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' }
]

export const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'X', href: 'https://x.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' }
]
