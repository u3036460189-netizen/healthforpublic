import { stats } from '../data/content.js'
import useCountUp from '../hooks/useCountUp.js'
import Reveal from './ui/Reveal.jsx'

function StatItem({ value, suffix, label, delay }) {
  const { ref, value: current } = useCountUp(value)

  return (
    <Reveal delay={delay} className="text-center lg:border-l lg:border-ink/10 lg:px-8 lg:text-left lg:first:border-l-0 lg:first:pl-0">
      <p
        ref={ref}
        className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-[2.75rem]"
      >
        {current.toLocaleString('en-US')}
        <span className="text-gold-600">{suffix}</span>
      </p>
      <p className="mt-2 text-[13px] leading-snug text-ink/60">{label}</p>
    </Reveal>
  )
}

export default function Stats() {
  return (
    <section
      aria-label="防疫成效速覽"
      className="border-y border-ink/10 bg-cream-100/70 print:hidden"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 90}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
