/** 分区块截图：node scripts/shots-sections.mjs [url] [width] [outDir] */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const url = process.argv[2] || 'http://127.0.0.1:5273/'
const width = Number(process.argv[3] || 1440)
const outDir = process.argv[4] || '.shots/sections'
mkdirSync(outDir, { recursive: true })

const ids = [
  'hero',
  'highlights',
  'design',
  'extraction',
  'routing',
  'search',
  'assembly',
  'recursion',
  'reliability',
  'workflows',
  'metrics',
  'interfaces',
  'trust',
  'upgrade',
  'team',
  'values',
  'index',
]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(600)

const height = await page.evaluate(() => document.body.scrollHeight)
for (let y = 0; y < height; y += 500) {
  await page.evaluate((v) => window.scrollTo(0, v), y)
  await page.waitForTimeout(80)
}
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(500)

for (const [i, id] of ids.entries()) {
  const el = await page.$('#' + id)
  if (!el) {
    console.log('missing', id)
    continue
  }
  const name = join(outDir, `${String(i + 1).padStart(2, '0')}-${id}.png`)
  await el.screenshot({ path: name, animations: 'disabled' })
  const box = await el.boundingBox()
  console.log('saved', name, box ? `${Math.round(box.width)}x${Math.round(box.height)}` : '')
}

console.log('page height:', height)
console.log(errors.length ? 'ERRORS: ' + errors.slice(0, 6).join(' | ') : 'no console errors')
await browser.close()
