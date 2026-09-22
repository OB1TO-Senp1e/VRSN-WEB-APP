/**
 * Reduced-motion verification.
 *
 * With `prefers-reduced-motion: reduce` the site must remain fully
 * legible: no element may be left parked at a hidden offset by an
 * animation that never runs, and the kinetic typography must resolve to a
 * controlled stack rather than a frozen off-centre fragment.
 *
 * Usage: node scripts/qa-reduced.mjs
 */
import { chromium } from 'playwright'

const VIEWPORTS = [
  { name: '375-iphone-se', width: 375, height: 812 },
  { name: '768-tablet', width: 768, height: 1024 },
  { name: '1440-desktop', width: 1440, height: 900 }
]

const browser = await chromium.launch({
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
})

let failures = 0

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    reducedMotion: 'reduce'
  })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })

  await page.goto('http://localhost:3000/', { waitUntil: 'load', timeout: 60000 })
  await page.waitForTimeout(2200)

  // Walk the page so every section mounts.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8)
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 70))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 400))
  })

  const check = await page.evaluate(() => {
    // 1. No masked headline may be left translated out of its mask.
    const parseTy = (tf) => {
      if (!tf || tf === 'none') return 0
      const m = tf.match(/matrix\(([^)]+)\)/)
      return m ? Math.round(parseFloat(m[1].split(',')[5]) || 0) : 0
    }
    const stuck = []
    document.querySelectorAll('h2').forEach((h) => {
      const inner = h.querySelector('span.overflow-hidden > span')
      if (!inner) return
      const ty = parseTy(getComputedStyle(inner).transform)
      if (ty > 4) stuck.push((h.textContent || '').trim().slice(0, 26) + ` (${ty}px)`)
    })

    // 2. Kinetic lines must be un-transformed (identity) under reduce.
    const kineticMoved = [...document.querySelectorAll('[data-kinetic]')]
      .map((el) => {
        const tf = getComputedStyle(el).transform
        if (!tf || tf === 'none') return null
        const p = tf.match(/matrix\(([^)]+)\)/)
        if (!p) return null
        const v = p[1].split(',').map(Number)
        const tx = v[4] || 0
        const ty = v[5] || 0
        return Math.abs(tx) > 4 || Math.abs(ty) > 4 ? Math.round(Math.abs(tx) + Math.abs(ty)) : null
      })
      .filter(Boolean)

    // 3. The kinetic sentence must exist as real text for AT / search.
    const caption = document.body.innerText.includes('ready to find out')

    // 4. Preloader must not have trapped the page.
    const preloaderGone = !document.querySelector('.fixed.inset-0.z-\\[110\\]')

    return { stuck, kineticMoved, caption, preloaderGone }
  })

  const ok =
    check.stuck.length === 0 &&
    check.kineticMoved.length === 0 &&
    check.caption &&
    check.preloaderGone &&
    errors.length === 0
  if (!ok) failures++

  console.log(`${ok ? 'PASS' : 'FAIL'}  ${vp.name.padEnd(15)} reduced-motion`)
  check.stuck.forEach((s) => console.log(`        ! headline stuck: ${s}`))
  if (check.kineticMoved.length)
    console.log(`        ! ${check.kineticMoved.length} kinetic line(s) still translated`)
  if (!check.caption) console.log('        ! kinetic caption text missing')
  if (!check.preloaderGone) console.log('        ! preloader did not clear')
  errors.slice(0, 3).forEach((e) => console.log(`        ! console: ${e.slice(0, 120)}`))

  await context.close()
}

await browser.close()
console.log(failures === 0 ? '\nReduced motion clean.' : `\n${failures} viewport(s) failed.`)
process.exit(0)
