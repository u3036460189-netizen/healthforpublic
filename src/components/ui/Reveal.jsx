import { cn } from '../../lib/cn.js'
import useInView from '../../hooks/useInView.js'

/** Fades and lifts its children into view once they enter the viewport. */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className,
  ...props
}) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
