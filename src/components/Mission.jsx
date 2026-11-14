import { principles, site } from '../data/content.js'
import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const credentials = ['註冊護理師', '12 年社區衛生經驗', '衛教講師']

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
                title="嗨——我是寫下 Health for Public 的護理師。"
              />
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-relaxed text-cream/70 sm:text-base">
                <p>
                  過去十二年，我在社區衛生現場工作——校門口、鄰里診間、職員餐廳。一次又一次，我遇到想做對事情的家庭，卻被矛盾又嚇人的資訊淹沒。
                </p>
                <p>
                  Health for Public
                  就是我的答案：由一位護理師，把傳染病科學翻譯成小而可行的步驟——讓流感、麻疹和其他疾病，遇到的是有準備的家庭。
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
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-cream/70 underline-offset-4 transition-colors hover:text-gold-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <Icon name="mail" className="h-4 w-4" />
                  直接寫信給我
                </a>
              </div>
            </Reveal>
          </div>

          {/* Glass quote + principles */}
          <Reveal delay={150}>
            <figure className="relative rounded-[2.25rem] border border-white/15 bg-white/5 p-8 shadow-soft backdrop-blur-xl sm:p-10">
              <Icon name="quote" className="h-8 w-8 text-gold" strokeWidth={1.4} />
              <blockquote className="mt-5 font-display text-xl font-medium leading-snug text-cream sm:text-2xl">
                &ldquo;公共衛生不是要你害怕，而是清楚知道下一步該做什麼——然後一起做到。&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm text-cream/55">
                ——講座參與者，河岸社區中心
              </figcaption>
            </figure>

            <ol className="mt-8 space-y-6">
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
