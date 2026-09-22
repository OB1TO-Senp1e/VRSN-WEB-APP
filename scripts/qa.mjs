/**
 * Visual QA harness — not part of the app bundle.
 *
 * Boots headless Chromium against the local preview and, for each
 * viewport, reports console errors and measures horizontal overflow
 * (document scrollWidth plus the individual elements escaping the
 * viewport). Screenshots are captured viewport-sized at key scroll
 * positions — a full-page capture of a page this tall at 2x DPR exceeds
 * the sandbox's memory budget and crashes the browser.
 *
 * Usage: node scripts/qa.mjs [viewport-filter] [--shots]
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.QA_URL ?? 'http://localhost:3000/'
const OUT = 'qa'
const SHOTS = process.argv.includes('--shots')

const VIEWPORTS = [
  { name: '375-iphone-se', width: 375, height: 812, mobile: true },
  { name: '390-iphone-14', width: 390, height: 844, mobile: true },
  { name: '430-iphone-max', width: 430, height: 932, mobile: true },
  { name: '768-tablet', width: 768, height: 1024, mobile: false },
  { name: '1024-laptop', width: 1024, height: 768, mobile: false },
  { name: '1280-desktop', width: 1280, height: 800, mobile: false },
  { name: '1440-desktop', width: 1440, height: 900, mobile: false },
  { name: '1920-wide', width: 1920, height: 1080, mobile: false }
]

/** Scroll stops worth photographing, as a fraction of total page height. */
const SHOT_STOPS = [0, 0.12, 0.3, 0.46, 0.62, 0.78, 0.92]

const filter = process.argv.slice(2).find((a) => !a.startsWith('--'))
const targets = filter ? VIEWPORTS.filter((v) => v.name.includes(filter)) : VIEWPORTS

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({
  args: [
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--use-gl=swiftshader',
    '--js-flags=--max-old-space-size=384'
  ]
})

let failures = 0

for (const vp of targets) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
    reducedMotion: 'no-preference'
  })
  const page = await context.newPage()

  const errors = []
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`)
  })
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))

  await page.goto(BASE, { waitUntil: 'load', timeout: 60000 })
  await page.waitForTimeout(2600)

  // Walk the page so every scroll-driven section mounts and settles.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.75)
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 90))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 500))
  })

  // Horizontal overflow. >2px of document spill means something is
  // escaping the viewport rather than being deliberately full-bleed.
  const result = await page.evaluate(() => {
    const de = document.documentElement
    const vw = de.clientWidth
    const docOverflow = de.scrollWidth - de.clientWidth
    const offenders = []
    document.querySelectorAll('body *').forEach((el) => {
      const cs = getComputedStyle(el)
      if (cs.position === 'fixed' || cs.visibility === 'hidden' || cs.display === 'none') return
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return
      // Deliberately scrolling / clipping surfaces are allowed to exceed
      // their box — that is what they are for.
      if (el.closest('[data-scroll-surface]')) return
      // Skip anything inside an ancestor that clips overflow: it cannot
      // reach the document edge, so it is not real horizontal overflow.
      let clipped = false
      for (let p = el.parentElement; p; p = p.parentElement) {
        const pcs = getComputedStyle(p)
        if (pcs.overflowX === 'hidden' || pcs.overflowX === 'clip' || pcs.overflowX === 'auto') {
          clipped = true
          break
        }
      }
      if (clipped) return
      const spill = Math.max(r.right - vw, -r.left)
      if (spill > 2) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || '').toString().slice(0, 64),
          spill: Math.round(spill)
        })
      }
    })
    offenders.sort((a, b) => b.spill - a.spill)
    return {
      docOverflow,
      offenders: offenders.slice(0, 6),
      pageHeight: document.body.scrollHeight,
      // Sanity: the sections we expect to exist
      sections: ['top', 'work', 'services', 'about', 'process', 'contact'].filter((id) =>
        document.getElementById(id)
      ).length
    }
  })

  if (SHOTS) {
    for (let i = 0; i < SHOT_STOPS.length; i++) {
      await page.evaluate((f) => {
        window.scrollTo(0, Math.round((document.body.scrollHeight - window.innerHeight) * f))
      }, SHOT_STOPS[i])
      await page.waitForTimeout(700)
      await page.screenshot({
        path: `${OUT}/${vp.name}-${String(i).padStart(2, '0')}.png`,
        animations: 'disabled'
      })
    }
  }

  const ok = errors.length === 0 && result.docOverflow <= 2 && result.sections === 6
  if (!ok) failures++

  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${vp.name.padEnd(15)} overflow:${String(result.docOverflow).padStart(3)}px  ` +
      `h:${result.pageHeight}px  sections:${result.sections}/6  console:${errors.length}`
  )
  errors.slice(0, 5).forEach((e) => console.log(`        ! ${e.slice(0, 140)}`))
  result.offenders.forEach((o) => console.log(`        > ${o.tag}.${o.cls} spills ${o.spill}px`))

  await context.close()
}

await browser.close()
console.log(failures === 0 ? '\nAll viewports clean.' : `\n${failures} viewport(s) need work.`)
process.exit(0)
