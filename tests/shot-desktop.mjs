/** 拍桌面版截圖：node tests/shot-desktop.mjs */
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright-core'

const BASE = process.env.BASE_URL || 'http://localhost:5173'
mkdirSync('tests/screenshots', { recursive: true })

async function launchBrowser() {
  for (const channel of ['msedge', 'chrome']) {
    try {
      return await chromium.launch({ channel, headless: true })
    } catch {
      /* next */
    }
  }
  throw new Error('找不到可用的瀏覽器')
}

const browser = await launchBrowser()
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await context.newPage()
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(1200)
await page.screenshot({ path: 'tests/screenshots/upgrade-hero-1280.png' })
await page.evaluate(() => document.getElementById('checklists').scrollIntoView({ behavior: 'instant' }))
await page.waitForTimeout(1200)
await page.screenshot({ path: 'tests/screenshots/upgrade-checklists-1280.png' })
await browser.close()
console.log('done')
