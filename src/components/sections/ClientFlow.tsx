import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  ClipboardCheck,
  FileSearch,
  MessageCircle,
  MessagesSquare,
  SlidersHorizontal,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../ui/SectionHeading'
import { SectionReveal } from '../ui/SectionReveal'

const flowIcons = {
  ClipboardCheck,
  FileSearch,
  MessagesSquare,
  SlidersHorizontal,
} satisfies Record<string, LucideIcon>

type FlowIconName = keyof typeof flowIcons

type FlowStep = {
  icon: FlowIconName
  meta: string
  text: string
  title: string
}

type FlowHighlight = {
  label: string
  value: string
}

export function ClientFlow() {
  const { t } = useTranslation()
  const steps = t('flow.steps', { returnObjects: true }) as FlowStep[]
  const highlights = t('flow.highlights', {
    returnObjects: true,
  }) as FlowHighlight[]

  return (
    <section
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,_#f7f8fb_0%,_#ffffff_48%,_#eef2f7_100%)] py-20 sm:py-24"
      id="flow"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent" />
      <div className="absolute left-1/2 top-10 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            align="center"
            description={t('flow.description')}
            eyebrow={t('flow.eyebrow')}
            title={t('flow.title')}
          />
        </SectionReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <SectionReveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-[1.5rem] bg-primary p-6 text-white shadow-[0_28px_90px_rgb(8_31_58_/_0.22)] sm:p-8">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,_rgb(212_175_55_/_0.22),_transparent_48%),linear-gradient(180deg,_rgb(255_255_255_/_0.08),_transparent_58%)]" />
              <div className="relative">
                <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  <MessageCircle aria-hidden="true" className="size-4" />
                  {t('flow.summary.eyebrow')}
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                  {t('flow.summary.title')}
                </h2>
                <p className="mt-5 text-sm leading-7 text-white/74 sm:text-base">
                  {t('flow.summary.text')}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {highlights.map(({ label, value }) => (
                    <div
                      className="rounded-2xl border border-white/10 bg-white/8 p-4"
                      key={label}
                    >
                      <p className="text-2xl font-black text-accent">{value}</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/72">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <Link
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-black text-primary transition hover:-translate-y-0.5 hover:bg-[#b88a16]"
                    to="/chat"
                  >
                    {t('flow.actions.chat')}
                    <MessagesSquare aria-hidden="true" className="size-4" />
                  </Link>
                  <a
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/10 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                    href="#contacts"
                  >
                    {t('flow.actions.contacts')}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </SectionReveal>

          <div className="grid gap-4">
            {steps.map(({ icon, meta, text, title }, index) => {
              const Icon = flowIcons[icon] ?? ClipboardCheck

              return (
                <SectionReveal key={title}>
                  <motion.article
                    className="group grid gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft ring-1 ring-primary/5 transition md:grid-cols-[4rem_1fr_auto]"
                    whileHover={{ y: -4 }}
                  >
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-accent shadow-[0_16px_44px_rgb(8_31_58_/_0.16)] transition group-hover:bg-primary-soft">
                      <Icon aria-hidden="true" className="size-7" />
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-1 text-xl font-black leading-7 text-primary">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-muted">
                        {text}
                      </p>
                    </div>
                    <span className="inline-flex h-10 items-center justify-center rounded-xl border border-accent/25 bg-accent-soft px-3 text-xs font-black text-primary md:self-start">
                      {meta}
                    </span>
                  </motion.article>
                </SectionReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
