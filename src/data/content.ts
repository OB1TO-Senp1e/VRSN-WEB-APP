export interface Project {
  id: string
  title: string
  category: string
  year: string
  description: string
  tag: string
  image: string
  alt: string
  /** Tailwind aspect class + grid span composition */
  aspect: string
  span: string
}

export interface Service {
  index: string
  title: string
  body: string
  tags: string[]
}

export interface ProcessStage {
  index: string
  title: string
  body: string
  items: string[]
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface ArchiveEntry {
  title: string
  category: string
  year: string
}

export const projects: Project[] = [
  {
    id: 'aether',
    title: 'Aether',
    category: 'Brand & Web',
    year: '2026',
    description: 'Identity and launch platform for a climate-tech company turning industrial heat into power.',
    tag: 'Site of the Day',
    image: '/images/work-aether.jpg',
    alt: 'Angular concrete staircase with strong diagonal shadows — Aether brand campaign image',
    aspect: 'aspect-[3/4]',
    span: 'md:col-span-5'
  },
  {
    id: 'monolith',
    title: 'Monolith',
    category: 'Digital Experience',
    year: '2025',
    description: 'An immersive product configurator for a furniture house obsessed with material honesty.',
    tag: 'Interactive',
    image: '/images/work-monolith.jpg',
    alt: 'Intersecting black structural beams against a textured white wall — Monolith visual',
    aspect: 'aspect-[4/5]',
    span: 'md:col-span-7'
  },
  {
    id: 'orbital',
    title: 'Orbital',
    category: 'Creative Technology',
    year: '2025',
    description: 'A real-time generative system driving the in-store screens of a luxury eyewear brand.',
    tag: 'Generative',
    image: '/images/work-orbital.jpg',
    alt: 'White curved architectural surface with flowing line pattern and soft light — Orbital system',
    aspect: 'aspect-[3/4]',
    span: 'md:col-span-7'
  },
  {
    id: 'cadence',
    title: 'Cadence',
    category: 'Motion & Web',
    year: '2024',
    description: 'Editorial platform and motion language for a music publisher with a century of archive.',
    tag: 'Motion System',
    image: '/images/work-cadence.jpg',
    alt: 'Rhythmic light and shadow stripes cast across a wooden interior — Cadence editorial',
    aspect: 'aspect-[16/10]',
    span: 'md:col-span-5'
  },
  {
    id: 'hollow',
    title: 'Hollow',
    category: 'Identity',
    year: '2024',
    description: 'A typographic identity for an independent type foundry, built from its own letterforms.',
    tag: 'Typography',
    image: '/images/work-hollow.jpg',
    alt: 'Modern minimal building exterior with clean geometry and deep shadow — Hollow identity',
    aspect: 'aspect-[21/10] md:aspect-[21/8]',
    span: 'md:col-span-12'
  }
]

export const archive: ArchiveEntry[] = [
  { title: 'Northwind', category: 'Web Design', year: '2023' },
  { title: 'Parallel', category: 'Product Design', year: '2023' },
  { title: 'Sable', category: 'Brand Identity', year: '2022' },
  { title: 'Kestrel', category: 'Digital Experience', year: '2022' },
  { title: 'Meridian', category: 'Web Development', year: '2021' },
  { title: 'Isle', category: 'Motion Design', year: '2020' },
  { title: 'Tonal', category: 'Creative Direction', year: '2019' }
]

export const services: Service[] = [
  {
    index: '01',
    title: 'Creative Direction',
    body: 'We set the creative north star — the idea every touchpoint is measured against. Positioning, narrative, art direction, and the courage to cut what does not serve the story.',
    tags: ['Positioning', 'Narrative', 'Art Direction', 'Campaign Concepts']
  },
  {
    index: '02',
    title: 'Brand Identity',
    body: 'Identity systems built to flex across screens, spaces and time. Logotype, typography, colour and motion principles designed as one living system — never a static PDF.',
    tags: ['Logotype', 'Typography', 'Colour', 'Motion Principles']
  },
  {
    index: '03',
    title: 'Web Design',
    body: 'Editorial layouts, deliberate typography and interfaces that feel inevitable. We design in the browser early, so what you approve is what you ship.',
    tags: ['UX', 'Editorial Layout', 'Design Systems', 'Prototyping']
  },
  {
    index: '04',
    title: 'Web Development',
    body: 'Fast, accessible, maintainable front-ends. Modern React, headless integrations, WebGL when it earns its place — and performance budgets we actually keep.',
    tags: ['React', 'TypeScript', 'Headless CMS', 'Performance']
  },
  {
    index: '05',
    title: 'Motion Design',
    body: 'Motion is a material. We define timing, easing and choreography so interfaces feel physical — from micro-interactions to full launch films.',
    tags: ['Interaction Motion', 'Brand Films', 'Product Reels']
  },
  {
    index: '06',
    title: 'Creative Technology',
    body: 'Generative systems, real-time graphics and R&D prototypes. When the brief needs something that does not exist yet, we build it.',
    tags: ['Generative Art', 'Real-time 3D', 'Shaders', 'R&D']
  }
]

export const processStages: ProcessStage[] = [
  {
    index: '01',
    title: 'Discover',
    body: 'We start by listening. Stakeholder interviews, audits, and a brutally honest look at what the brand is versus what it says it is.',
    items: ['Kick-off workshop', 'Stakeholder interviews', 'Audit & benchmarks']
  },
  {
    index: '02',
    title: 'Strategy',
    body: 'Insight becomes direction. We define positioning, experience principles and success criteria before a single pixel moves.',
    items: ['Positioning', 'Experience principles', 'Content architecture']
  },
  {
    index: '03',
    title: 'Design',
    body: 'Identity, interface and motion evolve together. Short loops, real in-browser work — never just static mockups.',
    items: ['Identity system', 'UX & UI', 'Motion language']
  },
  {
    index: '04',
    title: 'Develop',
    body: 'Engineering starts on day one, not after sign-off. Clean component architecture, accessibility and performance budgets are non-negotiable.',
    items: ['Component build', 'CMS integration', 'QA & accessibility']
  },
  {
    index: '05',
    title: 'Launch',
    body: 'A launch is a beginning. We ship, measure, refine — and hand over a system your team can actually run.',
    items: ['Go-live', 'Analytics', 'Training & handover']
  }
]

export const testimonials: Testimonial[] = [
  {
    quote: 'VRSN made us look like the company we wanted to become. Twelve months later, we are that company.',
    name: 'Helena Marques',
    role: 'Chief Marketing Officer',
    company: 'Aether Energy'
  },
  {
    quote: 'The rare studio where the engineers care about the type and the designers care about the frame rate.',
    name: 'Jonas Reuter',
    role: 'Founder & CEO',
    company: 'Monolith Furniture'
  },
  {
    quote: 'They said no to half of our ideas, and they were right about every single one. The result speaks for itself.',
    name: 'Amara Okafor',
    role: 'Head of Brand',
    company: 'Cadence Music Group'
  }
]

export const stats: Stat[] = [
  { value: 10, suffix: '+', label: 'Years of practice' },
  { value: 50, suffix: '+', label: 'Projects shipped' },
  { value: 20, suffix: '+', label: 'Global clients' },
  { value: 12, suffix: '', label: 'Industry awards' }
]

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
]
