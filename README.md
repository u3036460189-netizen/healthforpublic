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
npm run news:update  # 從衞生防護中心 RSS 抓取最新新聞（更新 src/data/news.json）
```

## 新聞定期更新

`src/data/news.json` 由 `scripts/fetch-news.mjs` 從衞生防護中心 RSS、港台國際新聞及
Outbreak News Today 抓取生成。自動化方案：

1. 把 repo 推上 GitHub（`website` 已包含 `.github/workflows/update-news.yml`）。
2. Workflow 按排程嘗試抓取並 commit 變更；`*/2` 是按日期逢雙日執行，不保證嚴格每 48 小時，GitHub Actions 排程亦可能延遲。
3. 託管平台（GitHub Pages / Netlify / Vercel）偵測 push 後重新建置；請以新聞區最後更新日期為準。

沒有 CI 時亦可手動執行 `npm run news:update` 後重新部署。

> 這台電腦的 `git` / `npm` 不在 PATH，需用完整路徑：
> `"C:\Program Files\Git\cmd\git.exe"`、`"C:\Program Files\nodejs\npm.cmd"`。

## Layout 掃描（tests/layout-check.mjs）

用 Playwright（playwright-core + 系統 Edge/Chrome，免下載瀏覽器）在 320–1440px 六個尺寸檢查：
頁面水平溢出、文字超出視窗或被裁切、文字重疊（含有效可見性判斷）、導覽列遮擋、
行動選單切換、FAQ 手風琴、主題篩選、字體載入、console 錯誤與網路請求失敗。
截圖輸出至 `tests/screenshots/`。

## 頁面結構

Hero → 文章待填提示 → 傳染病百科 → 實用清單 → 疫情新聞 → 我們的理念 → 清單入口 → 常見問題 → 頁尾 CTA

```
index.html                 SEO meta（zh-Hant）、Google Fonts、JSON-LD
tailwind.config.js         色票（#0B0B0F / #C9A84C / #F5F0E6）、字體、陰影、動畫
src/
  main.jsx                 React 進入點
  index.css                僅 Tailwind 指令
  App.jsx                  頁面組裝 + 跳轉連結
  data/content.js          導覽、理念、FAQ 文案
  hooks/
    useInView.js           IntersectionObserver 進場偵測
    useScrolled.js         導覽列捲動狀態
  components/
    Navbar.jsx             吸頂毛玻璃導覽、行動選單、閱讀進度條
    Hero.jsx               首屏標題及現有內容入口
    Articles.jsx           未有正式文章時的待填提示
    Mission.jsx            香港護士理念及九年臨床經驗
    MidCta.jsx             現有清單入口
    News.jsx               香港傳染病新聞速遞（每兩日自動更新）
    Faq.jsx                無障礙手風琴（單開）
    Footer.jsx             收尾 CTA、主題/探索/聯絡欄
    ui/                    Button、Icon、Logo、Reveal、SectionHeading
```

## 備註

- 主要 CTA 文字集中在一處：`src/data/content.js` → `site.ctaLabel`。
- 未經確認的人數、見證、講座、聯絡電郵及訂閱服務已移除；文章及聯絡方式待提供真實資料後再補。
- 字體：Inter + Noto Sans TC（標題）、Manrope + Noto Sans TC（內文），Google Fonts 載入。
- 無障礙：語意化標籤、跳轉連結、aria-expanded 手風琴、focus ring、reduced-motion 支援。
