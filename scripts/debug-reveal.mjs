/**
 * Debug: report the live rendered state of every section headline.
 * Confirms that masked reveals have actually resolved out of their mask
 * rather than sitting parked at the hidden offset (which reads as a blank
 * gap on the page).
 *
 * Usage: node scripts/debug-reveal.mjs
 */
import { chromium } from 'playwright'

const browser = await chromium.launch({
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

page.on('pageerror', (e) => console.log('PAGEERROR:', e.message))
await page.goto('http://localhost:3000/', { waitUntil: 'load' })
await page.waitForTimeout(2600)

/**
 * A headline is "settled" when its inner travelling span has a transform
 * that resolves to (approximately) zero translation.
 */
async function report(label) {
  const rows = await page.evaluate(() => {
    const parseTy = (tf) => {
      if (!tf || tf === 'none') return 0
      const m = tf.match(/matrix\(([^)]+)\)/)
      if (!m) return 0
      const parts = m[1].split(',').map((n) => parseFloat(n))
      return Math.round(parts[5] || 0)
    }
    return [...document.querySelectorAll('h2')].map((h) => {
      const inner = h.querySelector('span.overflow-hidden > span')
      const tf = inner ? getComputedStyle(inner).transform : 'none'
      return {
        text: (h.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30),
        ty: parseTy(tf),
        masked: Boolean(h.querySelector('span.overflow-hidden'))
      }
    })
  })

  console.log(`\n--- ${label} ---`)
  let stuck = 0
  rows.forEach((r) => {
    if (r.masked && r.ty > 4) stuck++
    console.log(
      `  ${r.masked ? 'masked' : 'plain '}  ty=${String(r.ty).padStart(5)}px  ${r.ty > 4 ? 'STUCK' : 'settled'}  :: ${r.text}`
    )
  })
  console.log(stuck === 0 ? '  => all headlines settled' : `  => ${stuck} headline(s) STUCK`)
  return stuck
}

// Walk the page the way a reader would, then settle at each stop
let totalStuck = 0
for (const sel of ['#work', '#services', '#about', '#process', '#contact']) {
  await page.evaluate((s) => document.querySelector(s).scrollIntoView(), sel)
  await page.waitForTimeout(1800)
  totalStuck += await report(`at ${sel}`)
}

await browser.close()
console.log(totalStuck === 0 ? '\nRESULT: all headlines visible.' : `\nRESULT: ${totalStuck} stuck.`)
process.exit(0)
