import { site, trustPoints } from '../data/content.js'
import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import HeroArt from './HeroArt.jsx'

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(58%_58%_at_50%_0%,rgba(201,168,76,0.18),transparent_72%)]" />
        <div className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-sage/15 blur-3xl" />
        <div className="absolute -right-24 top-64 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-cream-100/80 py-2 pl-3.5 pr-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/65 backdrop-blur">
                <span aria-hidden="true" className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-gold motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-600" />
                </span>
                公共衛生護理 · 傳染病防治
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1
                id="hero-title"
                className="mt-6 max-w-2xl font-display text-[2.35rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[3.4rem] xl:text-[3.9rem]"
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
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink/70 sm:text-lg">
                我是一位公共衛生護理師，把傳染病防治知識寫成簡單易明的文章——哪些方法真的有效、哪些可以忽略，第一步又該做什麼。
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={site.ctaHref} size="lg">
                  {site.ctaLabel}
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
                <Button href="#articles" variant="secondary" size="lg">
                  瀏覽全部文章
                  <Icon
                    name="arrowDown"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5">
                {trustPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm font-medium text-ink/65"
                  >
                    <Icon
                      name="check"
                      className="h-4 w-4 shrink-0 text-gold-600"
                      strokeWidth={2.2}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Illustration */}
          <Reveal delay={200} className="lg:col-span-5">
            <HeroArt />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
