import { useEffect, useRef, useState } from 'react'

/**
 * Counts from 0 to `target` the first time the element scrolls into view.
 * Respects prefers-reduced-motion by jumping straight to the final value.
 */
export default function useCountUp(target, duration = 1700) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let frame = 0
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const run = () => {
      if (startedRef.current) return
      startedRef.current = true

      if (prefersReduced) {
        setValue(target)
        return
      }

      const startTime = performance.now()
      const tick = (now) => {
        const progress = Math.min(1, (now - startTime) / duration)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(target * eased))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    if (typeof IntersectionObserver === 'undefined') {
      run()
      return () => cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, duration])

  return { ref, value }
}
