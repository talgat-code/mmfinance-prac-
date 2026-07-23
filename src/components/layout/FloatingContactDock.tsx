import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, MessagesSquare, PhoneCall } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

export function FloatingContactDock() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [isVisible, setIsVisible] = useState(false)
  const phoneHref = t('contacts.phoneHref')
  const whatsappHref = t('contacts.whatsappHref')
  const isChatPage = pathname === '/chat'

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 280)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && !isChatPage ? (
        <motion.aside
          animate={{ opacity: 1, y: 0 }}
          aria-label={t('quickDock.label')}
          className="fixed inset-x-4 bottom-4 z-40 sm:left-auto sm:right-5 sm:w-[19rem]"
          exit={{ opacity: 0, y: 18 }}
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
        >
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-primary/94 p-2 text-white shadow-[0_24px_80px_rgb(6_40_26_/_0.28)] backdrop-blur-xl">
            <div className="hidden items-center justify-between gap-3 px-2 pb-2 pt-1 sm:flex">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-accent">
                {t('quickDock.title')}
              </span>
              <span className="size-2 rounded-full bg-accent shadow-[0_0_18px_rgb(34_197_94_/_0.8)]" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <a
                aria-label={t('contacts.whatsappAriaLabel')}
                className="group flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl bg-accent text-primary transition hover:-translate-y-0.5 hover:bg-[#16a34a]"
                href={`https://wa.me/${whatsappHref}`}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle aria-hidden="true" className="size-5" />
                <span className="text-[0.7rem] font-black leading-4">
                  {t('quickDock.whatsapp')}
                </span>
              </a>
              <Link
                aria-label={t('chat.title')}
                className="group flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border border-white/12 bg-white/10 text-white transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                to="/chat"
              >
                <MessagesSquare aria-hidden="true" className="size-5" />
                <span className="text-[0.7rem] font-black leading-4">
                  {t('quickDock.chat')}
                </span>
              </Link>
              <a
                aria-label={t('contacts.callLabel')}
                className="group flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border border-white/12 bg-white/10 text-white transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                href={`tel:${phoneHref}`}
              >
                <PhoneCall aria-hidden="true" className="size-5" />
                <span className="text-[0.7rem] font-black leading-4">
                  {t('quickDock.call')}
                </span>
              </a>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  )
}
