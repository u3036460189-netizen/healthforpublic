import { cn } from '../../lib/cn.js'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = 'left',
  tone = 'light',
  className,
}) {
  const dark = tone === 'dark'

  return (
    <div
      className={cn(
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]',
            align === 'center' && 'justify-center',
            dark ? 'text-gold-300' : 'text-gold-800',
          )}
        >
          <span
            aria-hidden="true"
            className="h-px w-8 bg-current opacity-50"
          />
          {eyebrow}
        </p>
      )}

      <h2
        id={id}
        className={cn(
          'mt-4 font-display text-[1.85rem] font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.85rem]',
          dark ? 'text-cream' : 'text-ink',
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'mt-4 text-[15px] leading-relaxed sm:text-[17px]',
            dark ? 'text-cream/70' : 'text-ink/65',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
