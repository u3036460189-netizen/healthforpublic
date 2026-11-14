import { useState } from 'react'
import { site } from '../data/content.js'
import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const benefits = [
  'Seasonal outbreak watch for your region',
  'Printable household checklists and room cards',
  'Early access to workshops and kit restocks',
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | success
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('error')
      setMessage('Please enter a valid email address — e.g. you@example.com.')
      return
    }
    setStatus('success')
    setMessage('You’re in. Watch your inbox on Tuesday.')
  }

  return (
    <section
      id="contact"
      aria-labelledby="newsletter-title"
      className="relative overflow-hidden bg-ink py-20 text-cream sm:py-28"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(52%_52%_at_50%_0%,rgba(201,168,76,0.16),transparent_70%)]" />
        <div className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-sage/15 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <Reveal>
              <SectionHeading
                id="newsletter-title"
                tone="dark"
                eyebrow="Stay in the loop"
                title="The weekly prevention brief"
                description="One short email every Tuesday: what’s circulating in your region, one habit to build, and one myth to retire. Written by a nurse, readable in three minutes."
              />
            </Reveal>

            <Reveal delay={120}>
              <ul className="mt-8 space-y-3.5">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-3 text-sm font-medium text-cream/75 sm:text-[15px]"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-300">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="text-sm font-semibold text-cream">Prefer a direct line?</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 inline-flex items-center gap-2 font-display text-lg font-semibold text-gold-300 underline-offset-4 transition-colors hover:text-gold-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <Icon name="mail" className="h-5 w-5" />
                  {site.email}
                </a>
                <p className="mt-2 text-xs text-cream/55">{site.responseTime}</p>
              </div>
            </Reveal>
          </div>

          {/* Glass signup panel */}
          <Reveal delay={160}>
            <div className="rounded-[2rem] border border-white/15 bg-white/5 p-7 shadow-soft backdrop-blur-xl sm:p-9">
              <h3 className="font-display text-xl font-semibold tracking-tight text-cream">
                Join {`4,200`} careful households
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">
                No spam, no fear-mongering. Unsubscribe in one click.
              </p>

              {status === 'success' ? (
                <div
                  role="status"
                  className="mt-7 flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-4"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-ink">
                    <Icon name="check" className="h-4 w-4" strokeWidth={2.4} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-cream">{message}</p>
                    <p className="mt-1 text-xs text-cream/60">
                      Your first brief arrives with this week’s outbreak watch.
                    </p>
                  </div>
                </div>
              ) : (
                <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label
                      htmlFor="newsletter-email"
                      className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/60"
                    >
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                        if (status === 'error') setStatus('idle')
                      }}
                      aria-invalid={status === 'error'}
                      aria-describedby="newsletter-note"
                      className="mt-2 w-full rounded-full border border-white/20 bg-ink/60 px-5 py-3.5 text-[15px] text-cream outline-none transition placeholder:text-cream/45 focus:border-gold focus:ring-2 focus:ring-gold/30"
                    />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="text-sm font-medium text-gold-300">
                      {message}
                    </p>
                  )}

                  <Button as="button" type="submit" className="w-full">
                    Subscribe to the brief
                    <Icon
                      name="arrowRight"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Button>

                  <p id="newsletter-note" className="text-xs leading-relaxed text-cream/55">
                    By subscribing you agree to receive the weekly brief. Your address
                    is never shared or sold, and every email includes a one-click
                    unsubscribe.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
