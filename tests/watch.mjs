/**
 * 開一個「有畫面」的瀏覽器視窗，即場瀏覽網站。
 * 用途：讓使用者同步看到頁面實際效果。
 * 執行：node tests/watch.mjs
 */
import { chromium } from 'playwright-core'

const BASE = process.env.BASE_URL || 'http://localhost:5173'

async function launchBrowser() {
  for (const channel of ['msedge', 'chrome']) {
    try {
      return await chromium.launch({
        channel,
        headless: false,
        args: ['--start-maximized'],
      })
    } catch {
      /* try next */
    }
  }
  throw new Error('找不到可用的瀏覽器，請確認已安裝 Edge 或 Chrome。')
}

const browser = await launchBrowser()
const context = await browser.newContext({ viewport: null })
const page = await context.newPage()

await page.goto(BASE, { waitUntil: 'networkidle' })
console.log(`已開啟 ${BASE} — 視窗保持開啟，可直接操作瀏覽。按 Ctrl+C 結束。`)

// 保持程式活著，讓視窗一直開著
await new Promise(() => {})
