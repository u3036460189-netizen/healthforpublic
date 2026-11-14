import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 需要子目錄 base；其他平台（Netlify/Vercel 等）用預設 '/'。
// 在 deploy workflow 或本機設環境變數 GITHUB_PAGES=1 即啟用。
const base = process.env.GITHUB_PAGES === '1' ? '/healthforpublic/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    port: 5173,
    host: true,
  },
})
