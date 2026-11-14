import { useState } from 'react'
import { cn } from '../lib/cn.js'
import newsData from '../data/news.json'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const formatDateDisplay = (iso) => {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

function NewsList({ items, source }) {
  if (!items || items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-ink/20 p-8 text-center text-sm text-ink/60">
        暫時沒有最新消息——下次更新時自動補上。
      </p>
    )
  }

  return (
    <ul className="divide-y divide-ink/10 overflow-hidden rounded-3xl border border-ink/10 bg-cream-100 shadow-card">
      {items.map((item, index) => (
        <li key={`${item.link}-${index}`} className="group">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-1.5 px-5 py-4 transition-colors duration-200 hover:bg-cream-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 sm:flex-row sm:items-center sm:gap-5 sm:px-6 sm:py-5"
          >
            <time
              dateTime={item.date.replace(/\//g, '-')}
              className="shrink-0 font-display text-[13px] font-semibold tabular-nums text-gold-800 sm:w-24"
            >
              {item.date}
            </time>
            <span className="flex-1 text-[15px] font-medium leading-relaxed text-ink transition-colors duration-200 group-hover:text-gold-700">
              {item.title}
            </span>
            <span className="hidden items-center gap-2.5 sm:flex">
              {item.lang === 'en' && (
                <span className="rounded-full border border-ink/15 px-2 py-0.5 text-[10px] font-semibold text-ink/50">
                  EN
                </span>
              )}
              <span className="max-w-[9rem] truncate rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-medium text-ink/55">
                {source}
              </span>
              <Icon
                name="arrowUpRight"
                className="h-4 w-4 shrink-0 text-ink/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-600"
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function News() {
  const [tab, setTab] = useState('hk')
  const tabs = [
    { id: 'hk', label: '香港', data: newsData.hk },
    { id: 'world', label: '世界', data: newsData.world },
  ]
  const activeData = tab === 'hk' ? newsData.hk : newsData.world

  return (
    <section
      id="news"
      aria-labelledby="news-title"
      className="border-y border-ink/10 bg-cream-100/70 py-20 sm:py-28"
    >
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="news-title"
            eyebrow="最新動態"
            title="香港與世界傳染病新聞"
            description="整理香港衞生防護中心公報及其他來源的世界疫情消息；請以原文與發布日期為準。"
          />
          <div className="flex flex-col items-start gap-1.5 md:items-end">
            <span className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-sage-100 px-3.5 py-1.5 text-[11px] font-semibold text-sage-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-sage motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-600" />
              </span>
              定期擷取來源
            </span>
            {newsData.generatedAt && (
              <p className="text-[11px] text-ink/50">
                最後更新：{formatDateDisplay(newsData.generatedAt)}
              </p>
            )}
          </div>
        </div>

        {/* 分頁 */}
        <div role="tablist" aria-label="選擇新聞來源" className="mt-9 flex flex-wrap gap-2.5">
          {tabs.map((item) => {
            const active = tab === item.id
            const count = Array.isArray(item.data?.items) ? item.data.items.length : 0
            return (
              <button
                key={item.id}
                id={`news-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`news-panel-${item.id}`}
                onClick={() => setTab(item.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
                  active
                    ? 'border-ink bg-ink text-cream shadow-soft'
                    : 'border-ink/15 bg-cream-100/70 text-ink/70 hover:border-ink/35 hover:text-ink',
                )}
              >
                {item.label}
                <span className={cn('font-medium', active ? 'text-cream/60' : 'text-ink/40')}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <Reveal delay={80} className="mt-7">
          <div
            id={`news-panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`news-tab-${tab}`}
          >
            <NewsList items={activeData?.items} source={activeData?.source} />
          </div>
        </Reveal>

        <p className="mt-6 text-xs leading-relaxed text-ink/50">
          資料來源：
          <a
            href={activeData?.sourceUrl || 'https://www.chp.gov.hk/tc/media/116/index.html'}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink/70 underline underline-offset-2 transition-colors hover:text-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
          >
            {activeData?.source || '衞生防護中心新聞公報'}
          </a>
          。世界新聞來源並非全部為官方機構；請點開原文核對。本站只提供連結與標題。
        </p>
      </div>
    </section>
  )
}
