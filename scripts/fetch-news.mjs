/**
 * 從官方來源抓取傳染病新聞，寫入 src/data/news.json。
 *
 * 香港：衞生防護中心新聞公報 RSS（中文）
 * 世界：香港電台國際新聞 RSS（中文，過濾疫情關鍵字）＋ WHO 新聞 RSS（英文後備）
 *
 * 執行：node scripts/fetch-news.mjs   （或 npm run news:update）
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const FEEDS = {
  chp: 'https://www.chp.gov.hk/rss/pressreleases_zh_tw_RSS.xml',
  rthkWorld: 'https://rthk.hk/rthk/news/rss/c_expressnews_cinternational.xml',
  outbreakToday: 'https://outbreaknewstoday.com/feed',
}

const OUT_FILE = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'news.json')
const MAX_PER_SOURCE = 10

const HK_KEYWORDS = [
  '傳染病', '感染', '流感', '麻疹', '德國麻疹', '風疹', '腮腺炎', '水痘', '猩紅熱',
  '百日咳', '白喉', '破傷風', '結核', '肺痨', '肺炎', '腦膜炎', '手足口', '腸病毒',
  'EV71', '諾羅', '病毒', '沙門氏', '大腸桿菌', '痢疾', '霍亂', '傷寒', '副傷寒',
  '李斯特', '退伍軍人', '登革熱', '基孔肯雅', '日本腦炎', '寨卡', '茲卡', '黃熱病',
  '瘧疾', '猴痘', '新冠', 'COVID', '禽流感', '甲型', '乙型', '肝炎', '狂犬病',
  '炭疽', '鼠疫', '疫苗', '防疫', '疫情', '個案', '爆發', '蚊',
]

const WORLD_ZH_KEYWORDS = [
  '疫情', '病毒', '感染', '麻疹', '霍亂', '猴痘', '禽流感', '登革熱', '肺炎',
  '疫苗', '傳染病', '腦膜炎', '瘧疾', '伊波拉', '埃博拉', '茲卡', '寨卡',
  '基孔肯雅', '甲流', 'H5N1', '禽流感', '大流行', '衞生', '衛生', '疫症',
]

const WORLD_EN_KEYWORDS = [
  'outbreak', 'measles', 'cholera', 'mpox', 'monkeypox', 'influenza', 'flu',
  'avian', 'dengue', 'ebola', 'pandemic', 'virus', 'infection', 'malaria',
  'polio', 'hepatitis', 'rubella', 'pertussis', 'tuberculosis', 'rabies',
  'vaccine', 'epidemic', 'Zika', 'chikungunya', 'meningitis',
]

const decode = (text) =>
  text
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '')
    .trim()

const pick = (item, tag) => {
  const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))
  return match ? decode(match[1]) : ''
}

const formatDate = (value) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(
    date.getDate(),
  ).padStart(2, '0')}`
}

const absolutize = (link, base) =>
  link.startsWith('http') ? link : new URL(link, base).href

async function fetchFeed(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'HealthForPublicSite/1.0' },
    signal: AbortSignal.timeout(20000),
  })
  if (!response.ok) throw new Error(`HTTP ${response.status} — ${url}`)
  const xml = await response.text()
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? []
  return blocks.map((block) => {
    const title = pick(block, 'title')
    const rawLink = pick(block, 'link')
    const rawDate = pick(block, 'pubDate')
    return {
      title,
      link: absolutize(rawLink, url),
      date: formatDate(rawDate),
      rawDate,
      lang: /[\u4e00-\u9fff]/.test(title) ? 'zh' : 'en',
    }
  })
}

const byKeyword = (items, keywords) =>
  items.filter((item) => keywords.some((k) => item.title.toLowerCase().includes(k.toLowerCase())))

const newest = (items, limit) =>
  [...items]
    .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate))
    .slice(0, limit)
    .map(({ title, link, date, lang }) => ({ title, link, date, lang }))

async function main() {
  const results = await Promise.allSettled([
    fetchFeed(FEEDS.chp),
    fetchFeed(FEEDS.rthkWorld),
    fetchFeed(FEEDS.outbreakToday),
  ])

  const [chp, rthk, outbreakToday] = results.map((r) => (r.status === 'fulfilled' ? r.value : null))
  const errors = results.filter((r) => r.status === 'rejected').map((r) => r.reason.message)

  const hkSource = { source: '香港衞生防護中心新聞公報', sourceUrl: 'https://www.chp.gov.hk/tc/media/116/index.html' }
  const worldSource = { source: '香港電台國際新聞・Outbreak News Today', sourceUrl: 'https://outbreaknewstoday.com' }

  const hkItems = chp ? newest(byKeyword(chp, HK_KEYWORDS), MAX_PER_SOURCE) : []
  if (hkItems.length === 0 && chp) hkItems.push(...newest(chp, MAX_PER_SOURCE))

  const worldZh = rthk ? byKeyword(rthk, WORLD_ZH_KEYWORDS) : []
  const worldEn = outbreakToday ? byKeyword(outbreakToday, WORLD_EN_KEYWORDS) : []

  // 中文來源不足時，以英文來源補足
  const worldItems =
    worldZh.length >= 5
      ? newest(worldZh, MAX_PER_SOURCE)
      : newest([...worldZh, ...worldEn], MAX_PER_SOURCE)

  if (hkItems.length === 0 && worldItems.length === 0) {
    throw new Error(`所有來源均失敗：${errors.join('；')}`)
  }
  if (errors.length) console.warn('⚠ 部分來源失敗：', errors.join('；'))

  writeFileSync(
    OUT_FILE,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        hk: { ...hkSource, items: hkItems },
        world: { ...worldSource, items: worldItems },
      },
      null,
      2,
    ) + '\n',
  )

  console.log(
    `✓ 已寫入：香港 ${hkItems.length} 條、世界 ${worldItems.length} 條 → src/data/news.json`,
  )
}

main().catch((error) => {
  console.error('✗ 抓取失敗：', error.message)
  process.exit(1)
})
