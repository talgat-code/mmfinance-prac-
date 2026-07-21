import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  MessageCircle,
  PhoneCall,
  ShieldQuestionMark,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../ui/SectionHeading'
import { SectionReveal } from '../ui/SectionReveal'

type FaqItem = {
  answer: string
  question: string
}

export function Faq() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const items = t('faq.items', { returnObjects: true }) as FaqItem[]
  const phoneHref = t('contacts.phoneHref')

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24" id="faq">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgb(6_40_26_/_0.04),_transparent_38%),radial-gradient(circle_at_14%_18%,_rgb(34_197_94_/_0.14),_transparent_30%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <SectionReveal>
          <div>
            <SectionHeading
              description={t('faq.description')}
              eyebrow={t('faq.eyebrow')}
              title={t('faq.title')}
            />

            <div className="mt-8 overflow-hidden rounded-2xl bg-primary text-white shadow-[0_24px_80px_rgb(6_40_26_/_0.18)]">
              <div className="relative p-6">
                <div className="absolute inset-0 bg-[linear-gradient(145deg,_rgb(34_197_94_/_0.22),_transparent_46%),linear-gradient(180deg,_rgb(255_255_255_/_0.06),_transparent)]" />
                <div className="relative">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
                    <ShieldQuestionMark aria-hidden="true" className="size-6" />
                  </span>
                  <h2 className="mt-5 text-2xl font-black leading-tight">
                    {t('faq.managerBox.title')}
                  </h2>
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/70">
                    {t('faq.managerBox.text')}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <Link
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-black text-primary transition hover:-translate-y-0.5 hover:bg-[#16a34a]"
                      to="/chat"
                    >
                      <MessageCircle aria-hidden="true" className="size-4" />
                      {t('faq.managerBox.chat')}
                    </Link>
                    <a
                      aria-label={t('contacts.callLabel')}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/10 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                      href={`tel:${phoneHref}`}
                    >
                      <PhoneCall aria-hidden="true" className="size-4" />
                      {t('faq.managerBox.call')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="min-w-0">
          <div className="grid gap-3">
            {items.map((item, index) => {
              const isOpen = openIndex === index
              const answerId = `faq-answer-${index}`

              return (
                <div
                  className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft"
                  key={item.question}
                >
                  <button
                    aria-controls={answerId}
                    aria-expanded={isOpen}
                    className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-accent-soft/55 sm:px-6"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    type="button"
                  >
                    <span className="text-base font-black leading-6 text-primary sm:text-lg">
                      {item.question}
                    </span>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-primary ring-1 ring-accent/20">
                      <ChevronDown
                        aria-hidden="true"
                        className={`size-5 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        id={answerId}
                        initial={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: 'easeOut' }}
                      >
                        <div className="border-t border-border px-5 py-4 sm:px-6">
                          <p className="text-sm font-semibold leading-7 text-muted sm:text-base">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          <Link
            className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 text-sm font-black text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-primary"
            to={{ pathname: '/', hash: '#contacts' }}
          >
            {t('faq.moreButton')}
            <ArrowRight aria-hidden="true" className="size-4 text-accent" />
          </Link>
        </SectionReveal>
      </div>
    </section>
  )
}
