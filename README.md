# Health for Public｜一起健康 — 單頁網站

以文章為主軸的傳染病防治單頁網站（繁體中文、zh-Hant）。React 19 + Vite，樣式全部使用 Tailwind CSS utility classes（無自訂 CSS）。

## 開始使用

```bash
npm install
npm run dev          # 本機開發伺服器（http://localhost:5173）
npm run build        # 正式建置至 dist/
npm run preview      # 預覽正式建置
npm run test:layout  # Playwright 多尺寸 layout 掃描（需先啟動 dev server）
npm run watch        # 開啟有介面的瀏覽器即場瀏覽
```

> 這台電腦的 `git` / `npm` 不在 PATH，需用完整路徑：
> `"C:\Program Files\Git\cmd\git.exe"`、`"C:\Program Files\nodejs\npm.cmd"`。

## Layout 掃描（tests/layout-check.mjs）

用 Playwright（playwright-core + 系統 Edge/Chrome，免下載瀏覽器）在 320–1440px 六個尺寸檢查：
頁面水平溢出、文字超出視窗或被裁切、文字重疊（含有效可見性判斷）、導覽列遮擋、
行動選單切換、FAQ 手風琴、主題篩選、字體載入、console 錯誤與網路請求失敗。
截圖輸出至 `tests/screenshots/`。

## 頁面結構

Hero → 數據速覽 → 文章（主題篩選 + 精選指南）→ 我們的理念 → 免費下載 CTA → 每週簡報訂閱 → 常見問題 → 頁尾 CTA

```
index.html                 SEO meta（zh-Hant）、Google Fonts、JSON-LD
tailwind.config.js         色票（#0B0B0F / #C9A84C / #F5F0E6）、字體、陰影、動畫
src/
  main.jsx                 React 進入點
  index.css                僅 Tailwind 指令
  App.jsx                  頁面組裝 + 跳轉連結
  data/content.js          所有文案：CTA、文章、主題、統計、FAQ
  hooks/
    useInView.js           IntersectionObserver 進場偵測
    useCountUp.js          數字動畫（支援 prefers-reduced-motion）
    useScrolled.js         導覽列捲動狀態
  components/
    Navbar.jsx             吸頂毛玻璃導覽、行動選單、閱讀進度條
    Hero.jsx               首屏標題、CTA、信任要點
    HeroArt.jsx            有機風格 SVG 插畫 + 浮動玻璃卡片 + 旋轉徽章
    Stats.jsx              進場數字動畫
    Articles.jsx           文章主軸：主題篩選（useState）、精選大卡、文章卡
    Mission.jsx            護理師理念 + 毛玻璃引言（深色區）
    MidCta.jsx             金色免費下載 CTA
    Newsletter.jsx         每週簡報訂閱（驗證 + 成功狀態）
    Faq.jsx                無障礙手風琴（單開）
    Footer.jsx             收尾 CTA、主題/探索/聯絡欄
    ui/                    Button、Icon、Logo、Reveal、SectionHeading
```

## 備註

- 主要 CTA 文字集中在一處：`src/data/content.js` → `site.ctaLabel`。
- 字體：Inter + Noto Sans TC（標題）、Manrope + Noto Sans TC（內文），Google Fonts 載入。
- 無障礙：語意化標籤、跳轉連結、aria-expanded 手風琴、focus ring、reduced-motion 支援。
