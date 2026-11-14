import { useMemo, useState } from 'react'
import { cn } from '../lib/cn.js'
import { diseases, diseaseGroups, parentTips } from '../data/diseases.js'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const CHP_URL = 'https://www.chp.gov.hk/tc/static/24040.html'

function TipCard({ tip, index }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-ink/10 bg-cream-100 p-5 shadow-card">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 bg-cream font-display text-sm font-semibold text-gold-800">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="mt-3.5 font-display text-[1.02rem] font-semibold tracking-tight text-ink">
        {tip.title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink/65">{tip.body}</p>
    </div>
  )
}

function DiseaseCard({ disease, open, onToggle }) {
  const panelId = `disease-detail-${disease.id}`
  const buttonId = `disease-toggle-${disease.id}`

  return (
    <article
      className={cn(
        'overflow-hidden rounded-3xl border bg-cream-100 shadow-card transition-all duration-300',
        open ? 'border-gold/50' : 'border-ink/10 hover:border-gold/40',
      )}
    >
      <h4>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full flex-col gap-2 px-5 pb-4 pt-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
        >
          <span className="flex items-start justify-between gap-3">
            <span>
              <span className="block font-display text-[1.05rem] font-semibold leading-snug tracking-tight text-ink">
                {disease.zh}
              </span>
              <span className="mt-0.5 block text-[11px] font-medium italic text-ink/50">
                {disease.en}
              </span>
            </span>
            <span
              aria-hidden="true"
              className={cn(
                'grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300',
                open
                  ? 'rotate-180 border-ink bg-ink text-cream'
                  : 'border-ink/15 text-ink/60',
              )}
            >
              <Icon name={open ? 'minus' : 'plus'} className="h-3.5 w-3.5" strokeWidth={2.2} />
            </span>
          </span>

          <span className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-semibold text-ink/65">
              {disease.group}
            </span>
            {disease.kid && (
              <span className="rounded-full bg-gold/20 px-2.5 py-1 text-[11px] font-semibold text-gold-800">
                兒童相關
              </span>
            )}
          </span>

          <span className="block text-[13px] leading-relaxed text-ink/65">
            {disease.symptoms}
          </span>
        </button>
      </h4>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          'grid transition-all duration-300 ease-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <dl className="space-y-3 border-t border-ink/10 px-5 pb-5 pt-4 text-[13px] leading-relaxed">
            <div className="flex gap-3">
              <dt className="mt-0.5 shrink-0">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ink/5 text-ink/70">
                  <Icon name="virus" className="h-4 w-4" />
                </span>
              </dt>
              <dd className="text-ink/75">
                <strong className="mr-1.5 font-semibold text-ink">病徵：</strong>
                {disease.symptoms}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="mt-0.5 shrink-0">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-sage-100 text-sage-600">
                  <Icon name="shield" className="h-4 w-4" />
                </span>
              </dt>
              <dd className="text-ink/75">
                <strong className="mr-1.5 font-semibold text-ink">預防：</strong>
                {disease.prevention}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="mt-0.5 shrink-0">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gold/15 text-gold-700">
                  <Icon name="heart" className="h-4 w-4" />
                </span>
              </dt>
              <dd className="text-ink/75">
                <strong className="mr-1.5 font-semibold text-ink">家長注意：</strong>
                {disease.note}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  )
}

export default function Notifiable() {
  const [group, setGroup] = useState('全部')
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return diseases.filter((disease) => {
      const inGroup = group === '全部' || disease.group === group
      if (!inGroup) return false
      if (!q) return true
      return (
        disease.zh.toLowerCase().includes(q) ||
        disease.en.toLowerCase().includes(q) ||
        disease.symptoms.toLowerCase().includes(q) ||
        disease.prevention.toLowerCase().includes(q)
      )
    })
  }, [group, query])

  const groupCount = (name) =>
    name === '全部' ? diseases.length : diseases.filter((d) => d.group === name).length

  return (
    <section
      id="notifiable"
      aria-labelledby="notifiable-title"
      className="border-y border-ink/10 bg-cream-100/70 py-20 sm:py-28 print:hidden"
    >
      <div className="container">
        <SectionHeading
          id="notifiable-title"
          eyebrow="香港防疫百科"
          title="53 種須呈報傳染病，家長速查手冊"
          description="根據香港《預防及控制疾病條例》（第599章），註冊醫生發現懷疑或證實個案須通知衞生防護中心，以便追蹤接觸者、及早控制擴散。以下是全部 53 種的簡介——幫你快速掌握病徵、預防方法與家長注意事項。"
        />

        {/* 家長要點 */}
        <Reveal delay={100}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {parentTips.map((tip, index) => (
              <TipCard key={tip.title} tip={tip} index={index} />
            ))}
          </div>
        </Reveal>

        {/* 搜尋與篩選 */}
        <Reveal delay={150}>
          <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="group"
              aria-label="依傳播途徑篩選傳染病"
              className="flex flex-wrap gap-2.5"
            >
              {diseaseGroups.map((name) => {
                const active = group === name
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setGroup(name)
                      setOpenId(null)
                    }}
                    className={cn(
                      'rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
                      active
                        ? 'border-ink bg-ink text-cream shadow-soft'
                        : 'border-ink/15 bg-cream-100/70 text-ink/70 hover:border-ink/35 hover:text-ink',
                    )}
                  >
                    {name}
                    <span className={cn('ml-1.5 font-medium', active ? 'text-cream/60' : 'text-ink/40')}>
                      {groupCount(name)}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="relative w-full lg:w-72">
              <label htmlFor="disease-search" className="sr-only">
                搜尋傳染病
              </label>
              <Icon
                name="search"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35"
              />
              <input
                id="disease-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜尋疾病或症狀，例如：麻疹、發燒"
                className="w-full rounded-full border border-ink/15 bg-cream pl-10 pr-5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
            </div>
          </div>
        </Reveal>

        {/* 結果 */}
        <p aria-live="polite" className="mt-6 text-xs font-medium text-ink/55">
          {query.trim()
            ? `搜尋「${query.trim()}」：找到 ${filtered.length} 種（全部 53 種）`
            : `顯示 ${filtered.length} / ${diseases.length} 種`}
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((disease) => (
            <DiseaseCard
              key={disease.id}
              disease={disease}
              open={openId === disease.id}
              onToggle={() => setOpenId(openId === disease.id ? null : disease.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-4 rounded-3xl border border-dashed border-ink/20 p-10 text-center text-sm text-ink/60">
            找不到符合的傳染病——試試其他關鍵字，或切換傳播途徑。
          </p>
        )}

        {/* 免責聲明 */}
        <p className="mt-10 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-xs leading-relaxed text-ink/70">
          資料僅供衞教參考，不能取代專業醫療診斷。懷疑症狀請盡早就醫；緊急情況請致電
          999 或前往急症室。名單及詳情以衞生防護中心最新公布為準
          （<a
            href={CHP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold-800 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
          >
            官方名單與呈報安排
          </a>）。
        </p>
      </div>
    </section>
  )
}
