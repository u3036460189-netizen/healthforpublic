import { cn } from '../lib/cn.js'
import { services, site } from '../data/content.js'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

function ServiceCard({ service, delay }) {
  const featured = service.featured

  return (
    <Reveal as="article" delay={delay} className="h-full">
      <div
        className={cn(
          'group relative flex h-full flex-col rounded-3xl border p-6 transition-all duration-300 ease-out sm:p-7',
          featured
            ? 'border-ink bg-ink text-cream shadow-card'
            : 'border-ink/10 bg-cream-100 shadow-card hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft',
        )}
      >
        {service.badge && (
          <span className="absolute -top-3 right-6 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold text-ink shadow-gold">
            {service.badge}
          </span>
        )}

        <span
          className={cn(
            'grid h-11 w-11 place-items-center rounded-2xl transition-colors duration-300',
            featured ? 'bg-gold/15 text-gold' : 'bg-ink/5 text-ink',
          )}
        >
          <Icon name={service.icon} className="h-5 w-5" strokeWidth={1.7} />
        </span>

        <h3
          className={cn(
            'mt-5 font-display text-[1.15rem] font-semibold leading-snug tracking-tight',
            featured ? 'text-cream' : 'text-ink',
          )}
        >
          {service.title}
        </h3>

        <p
          className={cn(
            'mt-2.5 text-sm leading-relaxed',
            featured ? 'text-cream/70' : 'text-ink/65',
          )}
        >
          {service.description}
        </p>

        <div
          className={cn(
            'mt-auto flex items-center justify-between gap-3 border-t pt-5',
            featured ? 'border-white/10' : 'border-ink/10',
          )}
        >
          <span
            className={cn(
              'text-xs font-medium',
              featured ? 'text-cream/55' : 'text-ink/60',
            )}
          >
            {service.format}
          </span>
          <span
            className={cn(
              'font-display text-lg font-semibold tracking-tight',
              featured ? 'text-gold-300' : 'text-gold-800',
            )}
          >
            {service.price}
          </span>
        </div>

        <a
          href={site.ctaHref}
          className={cn(
            'mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2',
            featured
              ? 'text-gold-300 hover:text-gold-200 focus-visible:ring-offset-ink'
              : 'text-ink hover:text-gold-700 focus-visible:ring-offset-cream',
          )}
          aria-label={`Learn more about ${service.title}`}
        >
          Learn more
          <Icon
            name="arrowRight"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </Reveal>
  )
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-20 sm:py-28">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="services-title"
            eyebrow="Services & offerings"
            title="Practical protection, built around your week"
            description="Every service starts from the same question: what would genuinely help your household stay well this season? Pick one, or stack them together."
          />
          <a
            href="#faq"
            className="hidden items-center gap-1.5 text-sm font-semibold text-ink/70 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 md:inline-flex"
          >
            Not sure which fits?
            <Icon
              name="arrowUpRight"
              className="h-4 w-4 text-gold-600 transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} delay={(index % 3) * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
