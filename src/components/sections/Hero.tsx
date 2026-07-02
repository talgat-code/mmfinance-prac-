import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CircleCheck,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'

export function Hero() {
  const { t } = useTranslation()

  const metrics = [
    {
      value: t('hero.metrics.clients.value'),
      label: t('hero.metrics.clients.label'),
    },
    {
      value: t('hero.metrics.years.value'),
      label: t('hero.metrics.years.label'),
    },
    {
      value: t('hero.metrics.banks.value'),
      label: t('hero.metrics.banks.label'),
    },
  ]

  const visualItems = [
    t('hero.visual.items.history'),
    t('hero.visual.items.load'),
    t('hero.visual.items.mortgage'),
  ]

  return (
    <section
      className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgb(248_240_207_/_0.7),_transparent_36%),linear-gradient(135deg,_#ffffff_0%,_#f8fafc_52%,_#eef2f7_100%)] pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28"
      id="home"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="absolute right-0 top-24 -z-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
            <BriefcaseBusiness aria-hidden="true" className="size-4" />
            {t('hero.eyebrow')}
          </p>

          <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.05] text-primary sm:text-5xl lg:text-6xl">
            {t('hero.title')}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {t('hero.description')}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contacts">
              {t('hero.primaryCta')}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <Button href="#services" variant="secondary">
              {t('hero.secondaryCta')}
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm ring-1 ring-primary/5 backdrop-blur"
                key={metric.label}
              >
                <p className="text-2xl font-black text-primary">{metric.value}</p>
                <p className="mt-2 text-sm leading-5 text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="relative"
          initial={{ opacity: 0, x: 28 }}
          transition={{ delay: 0.12, duration: 0.65, ease: 'easeOut' }}
        >
          <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-3xl border border-accent/30 bg-accent/10 lg:block" />
          <div className="absolute -right-4 bottom-8 hidden h-32 w-32 rounded-full border border-white/40 bg-white/30 shadow-soft lg:block" />

          <div className="relative overflow-hidden rounded-[2rem] bg-primary p-5 text-white shadow-[0_36px_120px_rgb(15_23_42_/_0.28)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,_rgb(212_175_55_/_0.26),_transparent_34%),radial-gradient(circle_at_90%_90%,_rgb(255_255_255_/_0.1),_transparent_30%)]" />
            <div className="relative rounded-[1.5rem] border border-white/10 bg-white/8 p-6 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-white/65">{t('hero.visual.status')}</p>
                  <p className="mt-3 text-4xl font-black text-accent">
                    {t('hero.visual.scoreValue')}
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    {t('hero.visual.scoreLabel')}
                  </p>
                </div>
                <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-primary shadow-[0_16px_45px_rgb(212_175_55_/_0.22)]">
                  <ChartNoAxesCombined aria-hidden="true" className="size-7" />
                </span>
              </div>

              <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{ width: '82%' }}
                  className="h-full rounded-full bg-accent"
                  initial={{ width: '12%' }}
                  transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
                />
              </div>

              <ul className="mt-8 space-y-4">
                {visualItems.map((item) => (
                  <li className="flex items-center gap-3" key={item}>
                    <CircleCheck
                      aria-hidden="true"
                      className="size-5 shrink-0 text-accent"
                    />
                    <span className="text-sm text-white/82">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-start gap-3">
                  <BadgeCheck aria-hidden="true" className="mt-0.5 size-5 text-accent" />
                  <p className="text-sm leading-6 text-white/78">{t('hero.visual.note')}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
