import { steps } from '../data/content.js'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

export default function Steps() {
  return (
    <section aria-labelledby="steps-title" className="pb-20 pt-4 sm:pb-24">
      <div className="container">
        <SectionHeading
          id="steps-title"
          align="center"
          eyebrow="How it works"
          title="Three calm steps to a protected household"
        />

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-12 right-12 top-7 hidden border-t border-dashed border-ink/20 md:block"
          />
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 120}
                className="flex flex-col items-start"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-cream-100 font-display text-lg font-semibold text-gold-800 shadow-card">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-display text-[1.15rem] font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/65">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
