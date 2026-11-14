import { cn } from '../lib/cn.js'
import { navLinks, services, site } from '../data/content.js'
import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'
import Logo from './ui/Logo.jsx'
import Reveal from './ui/Reveal.jsx'

const socials = [
  { label: 'Email us', href: `mailto:${site.email}`, icon: 'mail' },
  { label: 'Weekly prevention brief', href: '#contact', icon: 'sparkle' },
  { label: 'Field notes blog', href: '#notes', icon: 'book' },
]

export default function Footer() {
  return (
    <footer className="bg-ink pb-10 pt-16 text-cream sm:pt-20" aria-labelledby="footer-cta-title">
      <div className="container">
        {/* Closing CTA */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/25 bg-ink-800 px-6 py-14 text-center sm:px-12 sm:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(50%_60%_at_50%_0%,rgba(201,168,76,0.18),transparent_70%)]" />
              <div className="absolute -bottom-16 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-2xl" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300">
                {site.tagline}
              </p>
              <h2
                id="footer-cta-title"
                className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-[2.5rem]"
              >
                Ready when you are — let&rsquo;s be healthy, together.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-cream/65">
                Book the free call, join the weekly brief, or start with a household
                kit. Small steps now beat a difficult fortnight later.
              </p>
              <Button href={site.ctaHref} size="lg" className="mt-8">
                {site.ctaLabel}
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Link columns */}
        <div className="mt-16 grid gap-12 border-t border-white/10 pt-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="dark" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">
              Nurse-led infectious disease prevention for families, schools and
              workplaces. Evidence translated into habits, delivered without fear.
            </p>
            <ul className="mt-6 flex gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/70 transition-all duration-300 hover:border-gold/60 hover:bg-cream/5 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    <Icon name={social.icon} className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/55">
                Services
              </h3>
              <ul className="mt-5 space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <a
                      href="#services"
                      className="text-sm text-cream/65 underline-offset-4 transition-colors hover:text-gold-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 rounded"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/55">
                Explore
              </h3>
              <ul className="mt-5 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-cream/65 underline-offset-4 transition-colors hover:text-gold-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/55">
                Contact
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-cream/65">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="underline-offset-4 transition-colors hover:text-gold-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 rounded"
                  >
                    {site.email}
                  </a>
                </li>
                <li>{site.responseTime}</li>
                <li>Online worldwide · On-site regionally</li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-cream/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Prevention education — not a
            substitute for medical diagnosis or emergency care.
          </p>
          <a
            href="#top"
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-medium text-cream/60 transition-colors hover:text-gold-300',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300',
            )}
          >
            Back to top
            <Icon name="arrowUp" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
