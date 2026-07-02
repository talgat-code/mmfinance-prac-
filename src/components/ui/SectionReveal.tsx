import { motion, useReducedMotion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

type SectionRevealProps = PropsWithChildren<{
  className?: string
}>

export function SectionReveal({
  children,
  className = '',
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-80px' }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  )
}
