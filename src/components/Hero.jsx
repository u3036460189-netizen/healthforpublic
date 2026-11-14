import { site, trustPoints } from '../data/content.js'
import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-ink pb-16 pt-28 text-cream sm:pb-20 sm:pt-36 lg:pt-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/4 right-[-8%] h-[80vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(201,168,76,0.32),transparent)] blur-3xl" />
        <div className="absolute -top-32 right-[18%] h-[140%] w-28 origin-top rotate-[26deg] bg-gradient-to-b from-gold/35 via-gold/10 to-transparent blur-xl" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#241C0E]/70 to-transparent" />
      </div>
      <div className="container relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-2 pl-3.5 pr-4 text-[11px] font-semibold tracking-[0.2em] text-gold-300">
            <Icon name="sparkle" className="h-3.5 w-3.5" />
            香港護士 · 九年臨床經驗
          </p>
          <h1 id="hero-title" className="mt-7 max-w-2xl font-serif text-[2.6rem] font-medium leading-[1.15] tracking-tight sm:text-6xl xl:text-[4.2rem]">
            讓你在乎的人，<span className="text-gold-300">比傳染病快一步。</span>
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-cream/70 sm:text-lg">
            由香港護士整理的傳染病防治資訊、香港須呈報傳染病速查與家庭實用清單，方便你按需要查閱。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={site.ctaHref} size="lg">{site.ctaLabel}<Icon name="arrowRight" className="h-4 w-4" /></Button>
            <Button href="#notifiable" variant="ghost" size="lg">查閱傳染病百科<Icon name="arrowDown" className="h-4 w-4" /></Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-white/10 pt-7">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-cream/65">
                <Icon name="check" className="h-4 w-4 shrink-0 text-gold-400" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-[34rem] overflow-hidden rounded-[2rem] border border-gold/20 bg-ink-800 shadow-soft">
          <img src={`${import.meta.env.BASE_URL}images/care-shield.svg`} alt="金色盾牌與綠色葉子的抽象防疫插畫" width="720" height="560" className="h-auto w-full" />
        </div>
        </div>
        <div className="mt-16 grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-soft sm:grid-cols-3">
          {[
            { href: '#notifiable', title: '傳染病百科', detail: '查閱病徵與預防資訊' },
            { href: '#checklists', title: '實用清單', detail: '可打勾及列印' },
            { href: '#news', title: '疫情新聞', detail: '查閱香港與世界新聞來源' },
          ].map((item) => (
            <a key={item.href} href={item.href} className="flex min-h-36 flex-col justify-center border-white/10 bg-ink-800 p-6 transition-colors hover:bg-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 sm:border-r sm:last:border-r-0">
              <span className="font-display text-lg font-semibold">{item.title}</span>
              <span className="mt-2 text-sm text-cream/60">{item.detail}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
