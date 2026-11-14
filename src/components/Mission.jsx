import { principles, site } from '../data/content.js'
import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const credentials = ['Registered nurse', '12 yrs in community health', 'Health educator']

export default function Mission() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="relative overflow-hidden bg-ink py-20 text-cream sm:py-28"
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
                eyebrow="Our approach"
                title="Hi — I&rsquo;m the nurse behind Health for Public."
              />
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-relaxed text-cream/70 sm:text-base">
                <p>
                  For twelve years I&rsquo;ve worked community health — school gates,
                  neighbourhood clinics, workplace canteens. Again and again I met
                  families who wanted to do the right thing but were drowning in
                  contradictory, frightening advice.
                </p>
                <p>
                  Health for Public is my answer: one nurse, translating infectious
                  disease science into small, doable steps — so flu, measles and
                  everything else meet a household that is ready for them.
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
                <Button href="#services" variant="ghost" size="lg">
                  Explore services
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
                  Write to me directly
                </a>
              </div>
            </Reveal>
          </div>

          {/* Glass quote + principles */}
          <Reveal delay={150}>
            <figure className="relative rounded-[2.25rem] border border-white/15 bg-white/5 p-8 shadow-soft backdrop-blur-xl sm:p-10">
              <Icon name="quote" className="h-8 w-8 text-gold" strokeWidth={1.4} />
              <blockquote className="mt-5 font-display text-xl font-medium leading-snug text-cream sm:text-2xl">
                &ldquo;Public health isn&rsquo;t about fear. It&rsquo;s about knowing
                exactly what to do next — and doing it together.&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm text-cream/55">
                — Workshop participant, Riverside Community Centre
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
