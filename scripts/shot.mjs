/**
 * 截图脚本（仅用于开发期视觉校对）
 * 用法: node scripts/shot.mjs [url] [out] [width] [mode]
 *   mode = full | viewport | selector:#id
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const url = process.argv[2] || 'http://127.0.0.1:5273/'
const out = process.argv[3] || '.shots/page.png'
const width = Number(process.argv[4] || 1440)
const mode = process.argv[5] || 'full'

mkdirSync(dirname(out), { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: 'no-preference',
})

const errors = []
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text())
})
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(900)

// 逐屏滚动，触发所有滚动动画
const height = await page.evaluate(() => document.body.scrollHeight)
for (let y = 0; y < height; y += 500) {
  await page.evaluate((v) => window.scrollTo(0, v), y)
  await page.waitForTimeout(90)
}
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(700)

if (mode === 'viewport') {
  await page.screenshot({ path: out })
} else if (mode.startsWith('scrollto:')) {
  const sel = mode.slice('scrollto:'.length)
  const offset = Number(process.argv[6] || 0)
  await page.evaluate(
    ([s, o]) => {
      const el = document.querySelector(s)
      if (!el) return
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + o)
    },
    [sel, offset],
  )
  await page.waitForTimeout(900)
  await page.screenshot({ path: out })
} else if (mode.startsWith('selector:')) {
  const sel = mode.slice('selector:'.length)
  const el = await page.$(sel)
  if (!el) throw new Error(`selector not found: ${sel}`)
  await el.screenshot({ path: out })
} else {
  await page.screenshot({ path: out, fullPage: true })
}

if (errors.length) {
  console.log('CONSOLE ERRORS:')
  for (const e of errors.slice(0, 12)) console.log(' -', e)
} else {
  console.log('no console errors')
}
console.log('saved', out)
await browser.close()
