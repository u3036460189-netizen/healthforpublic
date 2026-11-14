import { site, trustPoints } from '../data/content.js'
import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'

const avatars = [
  { char: '陳', cls: 'bg-gold text-ink' },
  { char: '李', cls: 'bg-sage text-cream' },
  { char: '黃', cls: 'bg-[#B98A5E] text-cream' },
  { char: '張', cls: 'bg-ink-700 text-gold-300 ring-gold/40' },
]

function ShieldMark() {
  return (
    <svg
      viewBox="0 0 120 150"
      className="h-32 w-auto"
      role="img"
      aria-label="Health for Public 標誌插畫：盾牌與葉子"
    >
      <circle cx="60" cy="72" r="42" fill="none" stroke="#C9A84C" strokeOpacity="0.25" strokeDasharray="1 7" strokeLinecap="round" />
      <circle cx="60" cy="72" r="56" fill="none" stroke="#C9A84C" strokeOpacity="0.15" strokeDasharray="1 9" strokeLinecap="round" />
      <path
        d="M60 26 92 38v34c0 26-15 45-32 56-17-11-32-30-32-56V38Z"
        fill="#0B0B0F"
        stroke="#C9A84C"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M60 52c13 9 13 32 0 42-13-10-13-33 0-42Z" fill="#C9A84C" />
      <path d="M60 58v30" stroke="#0B0B0F" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
    </svg>
  )
}

function SeasonalCard() {
  return (
    <div className="animate-float rounded-2xl border border-white/15 bg-white/10 p-4 shadow-soft backdrop-blur-md motion-reduce:animate-none">
      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream/60">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-gold motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
        </span>
        季節疫情觀測
      </p>
      <ul className="mt-2.5 space-y-1.5 text-[12px] font-medium text-cream/80">
        <li className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            流感
          </span>
          <span className="text-cream/55">高</span>
        </li>
        <li className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sage" />
            諾羅病毒
          </span>
          <span className="text-cream/55">上升</span>
        </li>
        <li className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cream/50" />
            麻疹
          </span>
          <span className="text-cream/55">留意</span>
        </li>
      </ul>
    </div>
  )
}

function LatestGuideCard() {
  return (
    <a
      href="#articles"
      className="group animate-float-slow rounded-2xl border border-gold/30 bg-gold/10 p-4 shadow-soft backdrop-blur-md transition-colors duration-300 hover:border-gold/60 motion-reduce:animate-none"
    >
      <p className="flex items-center gap-2 text-[12px] font-semibold text-cream">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-ink">
          <Icon name="book" className="h-3.5 w-3.5" strokeWidth={1.9} />
        </span>
        本週新文章
      </p>
      <p className="mt-1.5 pl-8 text-[11px] leading-snug text-cream/60">
        防禦流感季：10 分鐘全家檢查清單
      </p>
      <p className="mt-2 pl-8 text-[11px] font-semibold text-gold-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        前往閱讀 →
      </p>
    </a>
  )
}

/** Load-time entrance animation (no scroll observer needed for the hero). */
function Enter({ delay = 0, className, children }) {
  return (
    <div
      className={cnSafe('animate-fade-up motion-reduce:animate-none', className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function cnSafe(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-ink pb-16 pt-28 text-cream sm:pb-20 sm:pt-36 lg:pt-44"
    >
      {/* Cinematic light rays */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/4 right-[-8%] h-[80vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(201,168,76,0.32),transparent)] blur-3xl" />
        <div className="absolute -top-32 right-[18%] h-[140%] w-28 origin-top rotate-[26deg] bg-gradient-to-b from-gold/35 via-gold/10 to-transparent blur-xl" />
        <div className="absolute -top-32 right-[30%] h-[140%] w-16 origin-top rotate-[34deg] bg-gradient-to-b from-cream/15 via-gold/10 to-transparent blur-xl" />
        <div className="absolute -top-24 right-[8%] h-[120%] w-10 origin-top rotate-[16deg] bg-gradient-to-b from-gold/25 to-transparent blur-lg" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#241C0E]/70 to-transparent" />
        <div className="absolute -left-28 top-1/2 h-72 w-72 rounded-full bg-sage/10 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-7">
            <Enter>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-2 pl-3.5 pr-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300 backdrop-blur">
                <Icon name="sparkle" className="h-3.5 w-3.5" strokeWidth={1.6} />
                香港護士 · 傳染病防治
              </p>
            </Enter>

            <Enter delay={90}>
              <h1
                id="hero-title"
                className="mt-7 max-w-2xl font-serif text-[2.6rem] font-medium leading-[1.15] tracking-tight text-cream sm:text-6xl xl:text-[4.2rem]"
              >
                讓你在乎的人，
                <span className="relative inline-block whitespace-nowrap">
                  永遠比傳染病
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 220 12"
                    fill="none"
                    className="absolute -bottom-1 left-0 h-2.5 w-full text-gold sm:-bottom-2 sm:h-3"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3 9c60-7 150-7 214-3"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                快一步。
              </h1>
            </Enter>

            <Enter delay={180}>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-cream/70 sm:text-lg">
                我是一位香港護士，把傳染病防治知識寫成簡單易明的文章——哪些方法真的有效、哪些可以忽略，第一步又該做什麼。
              </p>
            </Enter>

            <Enter delay={260}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={site.ctaHref} size="lg">
                  {site.ctaLabel}
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
                <Button href="#articles" variant="ghost" size="lg">
                  瀏覽全部文章
                  <Icon
                    name="arrowDown"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </Button>
              </div>
            </Enter>

            <Enter delay={320}>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <span className="flex -space-x-2.5">
                  {avatars.map((a) => (
                    <span
                      key={a.char}
                      aria-hidden="true"
                      className={`grid h-9 w-9 place-items-center rounded-full text-xs font-semibold ring-2 ring-ink ${a.cls}`}
                    >
                      {a.char}
                    </span>
                  ))}
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-ink ring-2 ring-ink">
                    <Icon name="plus" className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </span>
                <span className="text-xs font-medium text-cream/60">
                  4,200+ 個家庭已加入每週簡報
                </span>
              </div>
            </Enter>

            <Enter delay={380}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-white/10 pt-7">
                {trustPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm font-medium text-cream/65"
                  >
                    <Icon
                      name="check"
                      className="h-4 w-4 shrink-0 text-gold-400"
                      strokeWidth={2.2}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Enter>
          </div>

          {/* Floating glass cards over the rays */}
          <Enter delay={200} className="lg:col-span-5">
            <div className="relative mx-auto flex w-full max-w-sm flex-col gap-4 lg:ml-auto lg:mr-8">
              <SeasonalCard />
              <LatestGuideCard />
              <div className="hidden justify-center lg:flex">
                <ShieldMark />
              </div>
            </div>
          </Enter>
        </div>

        {/* Bento strip */}
        <Enter delay={150}>
          <div className="mt-16 overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-soft">
            <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
              {/* Art cell */}
              <div className="relative hidden items-center justify-center bg-gradient-to-br from-[#2E2A1D] via-ink-800 to-ink p-6 sm:flex">
                <ShieldMark />
              </div>

              {/* Quote cell */}
              <div className="flex min-h-[180px] flex-col justify-between gap-3 bg-ink-800 p-5">
                <Icon name="quote" className="h-6 w-6 text-gold" strokeWidth={1.4} />
                <p className="text-[13px] leading-relaxed text-cream/75">
                  公共衞生不是要你害怕，而是清楚知道下一步該做什麼。
                </p>
              </div>

              {/* Latest guide cell */}
              <a
                href="#articles"
                aria-label="閱讀最新指南：防禦流感季 10 分鐘全家檢查清單"
                className="group relative flex min-h-[180px] flex-col justify-between bg-gradient-to-br from-[#4A3A15] via-[#33290F] to-ink p-5 transition-colors duration-300 hover:from-[#55431A]"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-300">
                  最新指南
                </p>
                <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-ink shadow-gold transition-transform duration-300 group-hover:scale-110">
                  <Icon name="play" className="h-5 w-5" />
                </span>
                <p className="text-xs leading-snug text-cream/75">
                  流感季 10 分鐘清單 · 6 分鐘讀完
                </p>
              </a>

              {/* Brief card */}
              <div className="flex min-h-[180px] flex-col justify-between gap-3 bg-cream p-5 text-ink">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-800">
                  每週防疫簡報
                </p>
                <p className="font-display text-lg font-semibold leading-snug tracking-tight">
                  逢星期二
                  <span className="block text-sm font-medium text-ink/60">三分鐘讀完</span>
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-ink underline-offset-4 transition-colors hover:text-gold-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
                >
                  立即訂閱
                  <Icon name="arrowUpRight" className="h-4 w-4 text-gold-600" />
                </a>
              </div>
            </div>
          </div>
        </Enter>
      </div>
    </section>
  )
}
