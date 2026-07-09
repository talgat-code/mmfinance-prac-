import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { useEffect, useState } from 'react'

const interactiveSelector =
  'a, button, input, textarea, select, [role="button"], [data-cursor="interactive"]'

const isInteractiveTarget = (target: EventTarget | null) =>
  target instanceof Element && Boolean(target.closest(interactiveSelector))

export function SmoothCursor() {
  const shouldReduceMotion = useReducedMotion()
  const cursorX = useMotionValue(-120)
  const cursorY = useMotionValue(-120)
  const ringX = useSpring(cursorX, { damping: 34, mass: 0.35, stiffness: 420 })
  const ringY = useSpring(cursorY, { damping: 34, mass: 0.35, stiffness: 420 })
  const [canRender, setCanRender] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    if (shouldReduceMotion) {
      setCanRender(false)

      return undefined
    }

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updateAvailability = () => setCanRender(mediaQuery.matches)

    updateAvailability()
    mediaQuery.addEventListener('change', updateAvailability)

    return () => mediaQuery.removeEventListener('change', updateAvailability)
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!canRender) {
      document.documentElement.classList.remove('mm-cursor-enabled')

      return undefined
    }

    document.documentElement.classList.add('mm-cursor-enabled')

    const handlePointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
      setIsVisible(true)
      setIsInteractive(isInteractiveTarget(event.target))
    }

    const handlePointerLeave = () => setIsVisible(false)
    const handlePointerDown = () => setIsPressed(true)
    const handlePointerUp = () => setIsPressed(false)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      document.documentElement.classList.remove('mm-cursor-enabled')
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [canRender, cursorX, cursorY])

  if (!canRender) {
    return null
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isInteractive ? (isPressed ? 1.05 : 1.45) : isPressed ? 0.75 : 1,
        }}
        className="pointer-events-none fixed z-[9999] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/70 bg-accent/10 shadow-[0_0_32px_rgb(212_175_55_/_0.3)]"
        style={{ left: ringX, top: ringY }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />
      <motion.div
        aria-hidden="true"
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isInteractive ? 0.72 : isPressed ? 1.4 : 1,
        }}
        className="pointer-events-none fixed z-[10000] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_rgb(212_175_55_/_0.55)]"
        style={{ left: cursorX, top: cursorY }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
      />
    </>
  )
}
