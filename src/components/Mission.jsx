import { principles } from '../data/content.js'
import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const credentials = ['香港護士', '九年臨床經驗']

export default function Mission() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="relative overflow-hidden bg-ink py-20 text-cream sm:py-28 print:hidden"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sage/15 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Story */}
          <div>
            <Reveal>
              <SectionHeading
                id="approach-title"
                tone="dark"
                eyebrow="我們的理念"
                title="嗨——我是寫下 Health for Public 的香港護士。"
              />
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-relaxed text-cream/70 sm:text-base">
                <p>
                  我是一位有九年臨床經驗的香港護士。本站整理傳染病防治資訊，方便家長與照顧者查閱。
                </p>
                <p>
                  Health for Public 以淺白文字整理防疫資訊，協助家庭查找實用的預防方法。
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {credentials.map((credential) => (
                  <li
                    key={credential}
                    className="rounded-full border border-cream/15 bg-cream/5 px-3.5 py-1.5 text-xs font-medium text-cream/70"
                  >
                    {credential}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href="#articles" variant="ghost" size="lg">
                  瀏覽文章
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Principles */}
          <Reveal delay={150}>
            <ol className="space-y-6 rounded-[2.25rem] border border-white/15 bg-white/5 p-8 shadow-soft backdrop-blur-xl sm:p-10">
              {principles.map((principle, index) => (
                <li key={principle.title} className="flex gap-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 font-display text-sm font-semibold text-gold-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.05rem] font-semibold text-cream">
                      {principle.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream/60">
                      {principle.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
