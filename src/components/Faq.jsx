import { useState } from 'react'
import { cn } from '../lib/cn.js'
import { faqs, site } from '../data/content.js'
import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

function FaqItem({ item, index, open, onToggle }) {
  const buttonId = `faq-question-${index}`
  const panelId = `faq-answer-${index}`

  return (
    <div className={cn('border-b border-ink/10 last:border-b-0', open && 'bg-cream-200/40')}>
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left font-display text-[1.02rem] font-semibold tracking-tight text-ink transition-colors hover:text-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
        >
          {item.question}
          <span
            aria-hidden="true"
            className={cn(
              'grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300',
              open
                ? 'rotate-180 border-ink bg-ink text-cream'
                : 'border-ink/15 text-ink/60',
            )}
          >
            <Icon name={open ? 'minus' : 'plus'} className="h-4 w-4" strokeWidth={2} />
          </span>
        </button>
      </h3>

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
          <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink/65">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28 print:hidden">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                id="faq-title"
                eyebrow="常見問題"
                title="誠實回答你的疑問"
                description="大家在閱讀前最常問的問題——用我在餐桌旁回答的方式寫成。"
              />
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-8">
                <Button href={`mailto:${site.email}`} variant="secondary">
                  <Icon name="mail" className="h-4 w-4 text-gold-600" />
                  直接問我你的問題
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-ink/10 bg-cream-100 shadow-card">
              {faqs.map((item, index) => (
                <FaqItem
                  key={item.question}
                  item={item}
                  index={index}
                  open={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? -1 : index)
                  }
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
