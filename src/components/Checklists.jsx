import { useEffect, useMemo, useState } from 'react'
import { cn } from '../lib/cn.js'
import {
  homeChecklist,
  returnToSchoolList,
  vaccineChecklist,
} from '../data/checklists.js'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const STORAGE_KEY = 'hfp:checklists:v1'

const tabs = [
  { id: homeChecklist.id, label: '居家防疫檢查', icon: 'house' },
  { id: vaccineChecklist.id, label: '疫苗時間表核對', icon: 'calendar' },
  { id: returnToSchoolList.id, label: '復課條件速查', icon: 'book' },
]

function loadChecked() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) ?? {}
  } catch {
    return {}
  }
}

function CheckItem({ id, label, checkedState, onToggle }) {
  const done = Boolean(checkedState[id])
  return (
    <label
      htmlFor={`check-${id}`}
      className="flex cursor-pointer items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors duration-200 hover:bg-cream-200/50"
    >
      <input
        id={`check-${id}`}
        type="checkbox"
        className="peer sr-only"
        checked={done}
        onChange={onToggle}
      />
      <span
        aria-hidden="true"
        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-ink/25 bg-cream-100 text-transparent transition-all duration-200 peer-checked:border-gold-600 peer-checked:bg-gold peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-gold-600"
      >
        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
      <span className="text-sm leading-relaxed text-ink/75 transition-colors duration-200 peer-checked:text-ink/40 peer-checked:line-through">
        {label}
      </span>
    </label>
  )
}

function ProgressBar({ done, total }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-2 flex-1 overflow-hidden rounded-full bg-ink/10"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="清單完成進度"
      >
        <div
          className="h-full rounded-full bg-gold transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="shrink-0 text-xs font-semibold text-ink/60">
        {done} / {total}（{pct}%）
      </span>
    </div>
  )
}

function NoteList({ notes }) {
  return (
    <ul className="space-y-1.5">
      {notes.map((note) => (
        <li key={note} className="flex gap-2 text-xs leading-relaxed text-ink/55">
          <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-600" />
          {note}
        </li>
      ))}
    </ul>
  )
}

function HomePanel({ data, checkedState, toggle, reset }) {
  const ids = data.groups.flatMap((group) =>
    group.items.map((_, i) => `${data.id}-${group.name}-${i}`),
  )
  const done = ids.filter((id) => checkedState[id]).length

  return (
    <div>
      <p className="rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-ink/75">
        {data.intro}
      </p>
      <div className="mt-5">
        <ProgressBar done={done} total={ids.length} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {data.groups.map((group) => (
          <div
            key={group.name}
            className="rounded-3xl border border-ink/10 bg-cream-100 p-5 shadow-card"
          >
            <h3 className="flex items-center gap-2 font-display text-[1.05rem] font-semibold tracking-tight text-ink">
              <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
              {group.name}
            </h3>
            <ul className="mt-2 space-y-1">
              {group.items.map((item, i) => {
                const id = `${data.id}-${group.name}-${i}`
                return (
                  <li key={id}>
                    <CheckItem
                      id={id}
                      label={item}
                      checkedState={checkedState}
                      onToggle={() => toggle(id)}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-[13px] font-semibold text-ink/70 transition-colors hover:border-ink/35 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
        >
          <Icon name="close" className="h-3.5 w-3.5" />
          重設這份清單
        </button>
      </div>
    </div>
  )
}

function VaccinePanel({ data, checkedState, toggle, reset }) {
  const ids = data.groups.flatMap((group, gi) =>
    group.items.map((_, i) => `${data.id}-${gi}-${i}`),
  )
  const done = ids.filter((id) => checkedState[id]).length

  return (
    <div>
      <p className="rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-ink/75">
        {data.intro}
      </p>
      <div className="mt-5">
        <ProgressBar done={done} total={ids.length} />
      </div>

      <div className="mt-6 space-y-4">
        {data.groups.map((group, gi) => (
          <div
            key={group.age}
            className="rounded-3xl border border-ink/10 bg-cream-100 p-5 shadow-card"
          >
            <h3 className="flex items-center gap-2.5 font-display text-[1.05rem] font-semibold tracking-tight text-ink">
              <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-gold-300">
                {group.age}
              </span>
            </h3>
            <ul className="mt-2 space-y-1">
              {group.items.map((item, i) => {
                const id = `${data.id}-${gi}-${i}`
                return (
                  <li key={id}>
                    <CheckItem
                      id={id}
                      label={item.label}
                      checkedState={checkedState}
                      onToggle={() => toggle(id)}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <NoteList notes={data.notes} />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-[13px] font-semibold text-ink/70 transition-colors hover:border-ink/35 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
        >
          <Icon name="close" className="h-3.5 w-3.5" />
          重設這份清單
        </button>
      </div>
    </div>
  )
}

function SchoolPanel({ data }) {
  return (
    <div>
      <p className="rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-ink/75">
        {data.intro}
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {data.rows.map((row) => (
          <li
            key={row.disease}
            className="rounded-3xl border border-ink/10 bg-cream-100 p-5 shadow-card"
          >
            <h3 className="flex flex-wrap items-center gap-2 font-display text-[1rem] font-semibold tracking-tight text-ink">
              {row.disease}
              {row.notifiable && (
                <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10.5px] font-semibold text-gold-800">
                  須呈報
                </span>
              )}
            </h3>
            <p className="mt-2 flex gap-2 text-[13px] leading-relaxed text-ink/70">
              <Icon
                name="check"
                className="mt-1 h-3.5 w-3.5 shrink-0 text-sage-600"
                strokeWidth={2.4}
              />
              <span>{row.condition}</span>
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-5">
        <NoteList notes={[data.note]} />
      </p>
    </div>
  )
}

export default function Checklists() {
  const [active, setActive] = useState(tabs[0].id)
  const [checkedState, setCheckedState] = useState(loadChecked)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedState))
    } catch {
      /* 儲存失敗也不影響使用 */
    }
  }, [checkedState])

  const toggle = (id) =>
    setCheckedState((prev) => ({ ...prev, [id]: !prev[id] }))

  const reset = (listId) => {
    setCheckedState((prev) => {
      const next = { ...prev }
      for (const key of Object.keys(next)) {
        if (key.startsWith(`${listId}-`)) delete next[key]
      }
      return next
    })
  }

  const activeTab = tabs.find((tab) => tab.id === active)

  const onKeyDown = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    const index = tabs.findIndex((tab) => tab.id === active)
    const next =
      event.key === 'ArrowRight'
        ? tabs[(index + 1) % tabs.length]
        : tabs[(index - 1 + tabs.length) % tabs.length]
    setActive(next.id)
  }

  return (
    <section id="checklists" aria-labelledby="checklists-title" className="py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          id="checklists-title"
          eyebrow="實用清單"
          title="打勾即用的三份防疫清單"
          description="勾選進度自動儲存在你的瀏覽器；需要時直接列印貼在雪櫃門上。"
        />

        {/* 分頁 */}
        <div
          role="tablist"
          aria-label="選擇清單"
          className="mt-9 flex flex-wrap gap-2.5 print:hidden"
        >
          {tabs.map((tab) => {
            const activeTabItem = active === tab.id
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={activeTabItem}
                aria-controls={`panel-${tab.id}`}
                tabIndex={activeTabItem ? 0 : -1}
                onKeyDown={onKeyDown}
                onClick={() => setActive(tab.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
                  activeTabItem
                    ? 'border-ink bg-ink text-cream shadow-soft'
                    : 'border-ink/15 bg-cream-100/70 text-ink/70 hover:border-ink/35 hover:text-ink',
                )}
              >
                <Icon name={tab.icon} className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <Reveal delay={80} className="mt-8">
          <div
            id={`panel-${activeTab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab.id}`}
            className="rounded-[2rem] border border-ink/10 bg-cream-100/60 p-6 shadow-card sm:p-8"
          >
            <div className="mb-5 flex items-center justify-between gap-4 print:hidden">
              <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                {activeTab.label}
              </h3>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-cream transition-colors hover:bg-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
              >
                <Icon name="box" className="h-3.5 w-3.5" />
                列印清單
              </button>
            </div>

            {active === homeChecklist.id && (
              <HomePanel
                data={homeChecklist}
                checkedState={checkedState}
                toggle={toggle}
                reset={reset}
              />
            )}
            {active === vaccineChecklist.id && (
              <VaccinePanel
                data={vaccineChecklist}
                checkedState={checkedState}
                toggle={toggle}
                reset={reset}
              />
            )}
            {active === returnToSchoolList.id && (
              <SchoolPanel data={returnToSchoolList} />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
