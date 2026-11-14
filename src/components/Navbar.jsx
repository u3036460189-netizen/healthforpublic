import { useEffect, useState } from 'react'
import { cn } from '../lib/cn.js'
import useScrolled from '../hooks/useScrolled.js'
import { navLinks, site } from '../data/content.js'
import Logo from './ui/Logo.jsx'
import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'

export default function Navbar() {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Reading progress */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] overflow-hidden"
      >
        <div
          className="h-full origin-left bg-gold transition-transform duration-150 ease-linear"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <div className="container pt-3 sm:pt-4">
        <nav
          aria-label="Primary"
          className={cn(
            'relative flex items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 ease-out sm:px-5',
            scrolled || open
              ? 'h-14 border-ink/10 bg-cream/85 shadow-soft backdrop-blur-xl'
              : 'h-16 border-transparent bg-transparent',
          )}
        >
          <Logo />

          <ul className="hidden items-center lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative rounded-full px-3.5 py-2 text-sm font-medium text-ink/70 transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3.5 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              href={site.ctaHref}
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => setOpen(false)}
            >
              {site.ctaLabel}
            </Button>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-cream-100/80 text-ink backdrop-blur transition-colors hover:border-ink/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 lg:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Mobile panel */}
        <div
          id="mobile-menu"
          className={cn(
            'overflow-hidden transition-all duration-300 ease-out lg:hidden',
            open ? 'mt-2 max-h-[440px] opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="rounded-3xl border border-ink/10 bg-cream/95 p-3 shadow-soft backdrop-blur-xl">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-medium text-ink/80 transition-colors hover:bg-cream-200/70 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
                  >
                    {link.label}
                    <Icon
                      name="arrowUpRight"
                      className="h-4 w-4 text-ink/35"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <Button
              href={site.ctaHref}
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              {site.ctaLabel}
              <Icon
                name="arrowRight"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
