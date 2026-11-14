import { cn } from '../../lib/cn.js'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 motion-safe:hover:-translate-y-0.5 active:translate-y-0'

const variants = {
  primary:
    'bg-gold text-ink shadow-gold hover:bg-gold-300 hover:shadow-soft focus-visible:ring-offset-cream',
  secondary:
    'border border-ink/15 bg-cream-100/70 text-ink backdrop-blur hover:border-ink/30 hover:bg-cream-100 focus-visible:ring-offset-cream',
  ink: 'bg-ink text-cream shadow-soft hover:bg-ink-700 focus-visible:ring-offset-cream',
  ghost:
    'border border-cream/25 bg-cream/5 text-cream backdrop-blur hover:border-gold/60 hover:bg-cream/10 focus-visible:ring-gold-300 focus-visible:ring-offset-ink',
}

const sizes = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-[15px]',
}

export default function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  const Tag = as || (href ? 'a' : 'button')

  return (
    <Tag
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
