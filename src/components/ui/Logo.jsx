import { cn } from '../../lib/cn.js'
import Icon from './Icon.jsx'
import { site } from '../../data/content.js'

export default function Logo({ tone = 'light', className }) {
  const dark = tone === 'dark'

  return (
    <a
      href="#top"
      className={cn('group inline-flex items-center gap-3 rounded-2xl', className)}
    >
      <span className="sr-only">Back to top — </span>
      <span
        className={cn(
          'grid h-10 w-10 shrink-0 place-items-center rounded-full ring-1 transition-colors duration-300',
          dark
            ? 'bg-gold text-ink ring-gold/60 group-hover:ring-gold'
            : 'bg-ink text-gold ring-ink/80 group-hover:ring-gold',
        )}
      >
        <Icon name="shield" className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            'block font-display text-[15px] font-semibold tracking-tight',
            dark ? 'text-cream' : 'text-ink',
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            'block text-[10.5px] font-semibold uppercase tracking-[0.22em]',
            dark ? 'text-gold-300' : 'text-ink/60',
          )}
        >
          {site.tagline}
        </span>
      </span>
    </a>
  )
}
