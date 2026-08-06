import { useEffect, useState } from 'react'

const clampProgress = (value: number) => Math.min(Math.max(value, 0), 1)

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frameId: number | null = null

    const updateProgress = () => {
      frameId = null
      const { documentElement } = document
      const maxScroll = documentElement.scrollHeight - window.innerHeight

      setProgress(maxScroll > 0 ? clampProgress(window.scrollY / maxScroll) : 0)
    }

    const queueProgressUpdate = () => {
      if (frameId !== null) {
        return
      }

      frameId = window.requestAnimationFrame(updateProgress)
    }

    queueProgressUpdate()
    window.addEventListener('scroll', queueProgressUpdate, { passive: true })
    window.addEventListener('resize', queueProgressUpdate)
    window.addEventListener('load', queueProgressUpdate)

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', queueProgressUpdate)
      window.removeEventListener('resize', queueProgressUpdate)
      window.removeEventListener('load', queueProgressUpdate)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 bg-primary/8"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-accent via-primary-soft to-accent shadow-[0_0_18px_rgb(212_175_55_/_0.42)] transition-transform duration-150 ease-out will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
