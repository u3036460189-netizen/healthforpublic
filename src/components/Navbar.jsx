import { useEffect, useState } from 'react'
import { cn } from '../lib/cn.js'
import useScrolled from '../hooks/useScrolled.js'
import { getLang, setLang } from '../i18n/lang.js'
import { navLinks, site } from '../data/content.js'
import Logo from './ui/Logo.jsx'
import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'

const socials = [
  { label: '寫信給我們', href: `mailto:${site.email}`, icon: 'mail' },
  { label: '每週防疫簡報', href: '#contact', icon: 'sparkle' },
  { label: '防疫筆記文章', href: '#articles', icon: 'book' },
]

export default function Navbar() {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [lang, setLangState] = useState(() => getLang())
  const [langLoading, setLangLoading] = useState(false)

  const handleToggleLang = async () => {
    setLangLoading(true)
    try {
      const next = await setLang(lang === 'hant' ? 'hans' : 'hant')
      setLangState(next)
    } catch (error) {
      console.warn('語言切換失敗：', error.message)
      window.alert('簡體轉換暫時無法載入，請檢查網絡連線後再試。')
    } finally {
      setLangLoading(false)
    }
  }

  // Navbar sits over the dark cinematic hero before the user scrolls.
  const onDark = !scrolled && !open

  // 載入時套用已儲存的語言偏好（簡體用戶啟動即轉換）
  useEffect(() => {
    if (getLang() === 'hans') {
      setLangState('hans')
      setLang('hans').catch((error) => console.warn('語言切換失敗：', error.message))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    <header className="fixed inset-x-0 top-0 z-50 print:hidden">
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
          aria-label="主要導覽"
          className={cn(
            'relative flex items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 ease-out sm:px-5',
            scrolled || open
              ? 'h-14 border-ink/10 bg-cream/85 shadow-soft backdrop-blur-xl'
              : 'h-16 border-transparent bg-transparent',
          )}
        >
          <Logo tone={onDark ? 'dark' : 'light'} />

          <ul className="hidden items-center lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'group relative rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600',
                    onDark
                      ? 'text-cream/70 hover:text-cream'
                      : 'text-ink/70 hover:text-ink',
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Language toggle — 簡體 for the wider Chinese-speaking market */}
            <button
              type="button"
              onClick={handleToggleLang}
              disabled={langLoading}
              aria-label={lang === 'hant' ? '切換至簡體中文' : '切換至繁體中文'}
              title={lang === 'hant' ? '切換至簡體中文' : '切換至繁體中文'}
              className={cn(
                'grid h-9 w-9 shrink-0 place-items-center rounded-full border text-[13px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 disabled:opacity-50',
                onDark
                  ? 'border-cream/20 text-cream/80 hover:border-gold/60 hover:bg-white/5 hover:text-gold-300'
                  : 'border-ink/15 text-ink/70 hover:border-gold/50 hover:bg-cream-200/50 hover:text-gold-800',
              )}
            >
              {langLoading ? '…' : lang === 'hant' ? '簡' : '繁'}
            </button>

            {/* Social circles — editorial touch from the reference design */}
            <ul
              className={cn(
                'mr-1 hidden items-center gap-2 xl:flex',
                onDark ? 'text-cream/70' : 'text-ink/60',
              )}
            >
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className={cn(
                      'grid h-9 w-9 place-items-center rounded-full border transition-all duration-300 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600',
                      onDark
                        ? 'border-cream/20 hover:border-gold/60 hover:bg-white/5'
                        : 'border-ink/15 hover:border-gold/50 hover:bg-cream-200/50',
                    )}
                  >
                    <Icon name={social.icon} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>

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
              aria-label={open ? '關閉選單' : '開啟選單'}
              className={cn(
                'grid h-10 w-10 place-items-center rounded-full border backdrop-blur transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 lg:hidden',
                onDark
                  ? 'border-cream/25 bg-white/10 text-cream hover:border-gold/60'
                  : 'border-ink/10 bg-cream-100/80 text-ink hover:border-ink/25',
              )}
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
            open ? 'mt-2 max-h-[480px] opacity-100' : 'max-h-0 opacity-0',
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
