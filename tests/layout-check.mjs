/**
 * Playwright layout & bug scanner for Health for Public.
 *
 * Checks at multiple viewports:
 *  - console errors / page errors / failed network requests
 *  - page-level horizontal overflow
 *  - text elements extending past the viewport
 *  - text elements visually clipped by overflow-hidden ancestors
 *  - overlapping text elements
 *  - fixed navbar covering the hero headline
 *  - responsive nav behaviour (mobile menu vs desktop links)
 *  - FAQ accordion + article topic filter interactions
 *  - web font loading
 *
 * Usage:  node tests/layout-check.mjs   (dev server must be running)
 */
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright-core'

const BASE = process.env.BASE_URL || 'http://localhost:5173'
const VIEWPORTS = [320, 375, 768, 1024, 1280, 1440]
const SHOTS = new Set([375, 768, 1280])

mkdirSync('tests/screenshots', { recursive: true })

async function launchBrowser() {
  for (const channel of ['msedge', 'chrome']) {
    try {
      return await chromium.launch({ channel, headless: true })
    } catch {
      /* try next channel */
    }
  }
  throw new Error(
    '找不到可用的瀏覽器：請確認系統已安裝 Microsoft Edge 或 Google Chrome。',
  )
}

/** Scroll through the whole page so every scroll-reveal has fired. */
async function settlePage(page) {
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        let y = 0
        const step = () => {
          y += 350
          window.scrollTo(0, y)
          if (y < document.body.scrollHeight) setTimeout(step, 40)
          else {
            window.scrollTo(0, 0)
            setTimeout(resolve, 900)
          }
        }
        step()
      }),
  )
}

const browser = await launchBrowser()
const report = {}

for (const width of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width, height: 820 },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()

  const consoleErrors = []
  const failedRequests = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 200))
  })
  page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err.message}`.slice(0, 200)))
  page.on('requestfailed', (req) =>
    failedRequests.push(`${req.url().slice(0, 120)} :: ${req.failure()?.errorText}`),
  )

  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 45000 })
  await settlePage(page)

  const issues = []

  // ── 1. Page-level horizontal overflow ──────────────────────────────
  const pageOverflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }))
  if (pageOverflow.scrollW > pageOverflow.clientW + 1) {
    issues.push({
      type: 'horizontal-overflow',
      detail: `頁面横向溢出：scrollWidth ${pageOverflow.scrollW} > viewport ${pageOverflow.clientW}`,
    })
  }

  // ── 2. Text elements past the viewport / clipped / overlapping ─────
  const dom = await page.evaluate(() => {
    const SEL = 'p,h1,h2,h3,h4,h5,h6,button,a,li,label,span,time,strong'
    const vw = document.documentElement.clientWidth

    // Effective visibility: element itself AND every ancestor must be shown.
    // (A parent with opacity-0 / display-none hides children visually even
    // though the children's own computed styles look "visible".)
    const effectivelyVisible = (el) => {
      let node = el
      while (node && node !== document.body) {
        const cs = getComputedStyle(node)
        if (cs.display === 'none') return false
        if (cs.visibility === 'hidden') return false
        if (parseFloat(cs.opacity) < 0.05) return false
        if (node.getAttribute('aria-hidden') === 'true') return false
        node = node.parentElement
      }
      return true
    }

    const all = [...document.querySelectorAll(SEL)].filter(
      (el) => el.textContent.trim() && effectivelyVisible(el),
    )
    // keep only innermost text-bearing elements
    const leaves = all.filter(
      (el) => ![...el.querySelectorAll(SEL)].some((d) => d.textContent.trim()),
    )

    const clipped = []
    for (const el of leaves) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      // past the viewport?
      if (r.right > vw + 1 || r.left < -1) {
        clipped.push({
          kind: 'past-viewport',
          tag: el.tagName.toLowerCase(),
          text: el.textContent.trim().slice(0, 36),
          left: Math.round(r.left),
          right: Math.round(r.right),
        })
        continue
      }
      // visually cut by an overflow-hidden ancestor?
      // (an element entirely outside a collapsed container is fine —
      //  that is how accordions / closed menus work; only partial cuts hurt)
      let p = el.parentElement
      while (p && p !== document.body) {
        const cs = getComputedStyle(p)
        if (/(hidden|clip)/.test(`${cs.overflow}${cs.overflowX}${cs.overflowY}`)) {
          const pr = p.getBoundingClientRect()
          const fullyOutside = r.top >= pr.bottom - 1 || r.bottom <= pr.top + 1
          if (!fullyOutside && (r.left < pr.left - 4 || r.right > pr.right + 4 || r.top < pr.top - 4 || r.bottom > pr.bottom + 4)) {
            clipped.push({
              kind: 'clipped-by-ancestor',
              tag: el.tagName.toLowerCase(),
              text: el.textContent.trim().slice(0, 36),
            })
          }
          break
        }
        p = p.parentElement
      }
    }

    // pairwise overlap between text elements
    const overlaps = []
    const rects = leaves.map((el) => ({ el, r: el.getBoundingClientRect() }))
    for (let i = 0; i < rects.length; i++) {
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i]
        const b = rects[j]
        const ix = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left)
        const iy = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top)
        if (ix <= 2 || iy <= 2) continue
        const area = ix * iy
        const minArea = Math.min(a.r.width * a.r.height, b.r.width * b.r.height)
        if (minArea > 0 && area > minArea * 0.2) {
          overlaps.push({
            a: `${a.el.tagName.toLowerCase()}“${a.el.textContent.trim().slice(0, 22)}”`,
            b: `${b.el.tagName.toLowerCase()}“${b.el.textContent.trim().slice(0, 22)}”`,
            ratio: Math.round((area / minArea) * 100),
          })
        }
      }
    }
    return { clipped: clipped.slice(0, 12), overlaps: overlaps.slice(0, 12) }
  })

  for (const c of dom.clipped) issues.push({ type: c.kind, detail: `${c.tag}「${c.text}」 left:${c.left ?? '-'} right:${c.right ?? '-'}` })
  for (const o of dom.overlaps)
    issues.push({ type: 'text-overlap', detail: `${o.a} ↔ ${o.b}（覆蓋 ${o.ratio}%）` })

  // ── 3. Fixed navbar vs hero headline ───────────────────────────────
  const navGap = await page.evaluate(() => {
    const header = document.querySelector('header')
    const h1 = document.querySelector('h1')
    if (!header || !h1) return null
    window.scrollTo(0, 0)
    const hb = header.getBoundingClientRect().bottom
    const ht = h1.getBoundingClientRect().top
    return Math.round(ht - hb)
  })
  if (navGap !== null && navGap < -2) {
    issues.push({ type: 'nav-overlap', detail: `固定導覽列遮住 H1（重疊 ${-navGap}px）` })
  }

  // ── 4. Responsive navigation behaviour ─────────────────────────────
  const nav = await page.evaluate(async () => {
    const toggle = document.querySelector('button[aria-controls="mobile-menu"]')
    const desktopLinks = [...document.querySelectorAll('nav ul li')].filter(
      (li) => li.getBoundingClientRect().height > 0,
    ).length
    if (!toggle) return { toggleVisible: false, desktopLinks }
    const visible = toggle.getBoundingClientRect().height > 0
    if (!visible) return { toggleVisible: false, desktopLinks }
    toggle.click()
    await new Promise((r) => setTimeout(r, 350))
    const panel = document.getElementById('mobile-menu')
    const open = panel.offsetHeight > 40
    toggle.click()
    return { toggleVisible: true, desktopLinks, mobilePanelOpens: open }
  })
  const expectMobile = width < 1024
  if (expectMobile && !nav.toggleVisible)
    issues.push({ type: 'nav-bug', detail: `${width}px 應顯示行動選單按鈕，但找不到` })
  if (!expectMobile && nav.toggleVisible)
    issues.push({ type: 'nav-bug', detail: `${width}px 不應顯示行動選單按鈕` })
  if (nav.mobilePanelOpens === false)
    issues.push({ type: 'nav-bug', detail: '行動選單無法展開' })

  // ── 5. Interactions: FAQ accordion + topic filter ──────────────────
  const interactions = await page.evaluate(async () => {
    const out = {}
    const faqBtns = [...document.querySelectorAll('#faq button[aria-expanded]')]
    if (faqBtns.length) {
      faqBtns[1].click()
      await new Promise((r) => setTimeout(r, 300))
      out.faqSecondOpens = faqBtns[1].getAttribute('aria-expanded') === 'true'
      out.faqFirstCloses = faqBtns[0].getAttribute('aria-expanded') === 'false'
      faqBtns[0].click()
      await new Promise((r) => setTimeout(r, 200))
    }
    const chip = [...document.querySelectorAll('#articles [role="group"] button')].find(
      (b) => b.textContent.trim() === '疫情',
    )
    if (chip) {
      chip.click()
      await new Promise((r) => setTimeout(r, 300))
      out.filterCount = document.querySelectorAll('#articles article').length
      chip.textContent.trim()
      const allChip = [...document.querySelectorAll('#articles [role="group"] button')].find(
        (b) => b.textContent.trim() === '全部',
      )
      allChip.click()
      await new Promise((r) => setTimeout(r, 200))
      out.filterReset = document.querySelectorAll('#articles article').length
    }
    return out
  })
  if (interactions.faqSecondOpens === false)
    issues.push({ type: 'interaction', detail: 'FAQ 第二題無法展開' })
  if (interactions.faqFirstCloses === false)
    issues.push({ type: 'interaction', detail: 'FAQ 無法單開（第一題未收合）' })
  if (interactions.filterCount !== undefined && interactions.filterCount !== 2)
    issues.push({ type: 'interaction', detail: `主題篩選「疫情」應為 2 篇，實際 ${interactions.filterCount}` })
  if (interactions.filterReset !== undefined && interactions.filterReset !== 7)
    issues.push({ type: 'interaction', detail: `篩選重設後應為 7 篇，實際 ${interactions.filterReset}` })

  // ── 6. Fonts ────────────────────────────────────────────────────────
  const fonts = await page.evaluate(() => ({
    status: document.fonts.status,
    noto: document.fonts.check('16px "Noto Sans TC"'),
    inter: document.fonts.check('16px Inter'),
  }))
  if (fonts.status !== 'loaded')
    issues.push({ type: 'fonts', detail: `字體狀態：${fonts.status}` })
  if (!fonts.noto) issues.push({ type: 'fonts', detail: 'Noto Sans TC 未載入（中文字體）' })

  // ── 7. Console / network ───────────────────────────────────────────
  for (const e of consoleErrors) issues.push({ type: 'console-error', detail: e })
  for (const r of failedRequests) issues.push({ type: 'request-failed', detail: r })

  if (SHOTS.has(width)) {
    await page.screenshot({
      path: `tests/screenshots/${width}.png`,
      fullPage: true,
    })
  }

  report[width] = { issues, counts: { consoleErrors: consoleErrors.length, failedRequests: failedRequests.length } }
  await context.close()
}

await browser.close()

// ── Print ────────────────────────────────────────────────────────────
let total = 0
for (const [width, { issues }] of Object.entries(report)) {
  console.log(`\n=== ${width}px ===`)
  if (!issues.length) {
    console.log('  ✔ 無問題')
    continue
  }
  for (const i of issues) {
    total++
    console.log(`  ✘ [${i.type}] ${i.detail}`)
  }
}
console.log(`\n掃描完成：${VIEWPORTS.length} 個尺寸，共 ${total} 個問題。`)
process.exit(total > 0 ? 1 : 0)
