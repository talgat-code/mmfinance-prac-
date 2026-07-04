import { motion } from 'framer-motion'
import {
  ArrowRight,
  BriefcaseBusiness,
  CircleCheck,
  MessageCircle,
  PhoneCall,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'

type PanelItem = {
  label: string
  value: string
}

export function Hero() {
  const { t } = useTranslation()
  const problems = t('hero.problems', { returnObjects: true }) as string[]
  const panelItems = t('hero.panel.items', { returnObjects: true }) as PanelItem[]
  const phoneHref = t('contacts.phoneHref')
  const whatsappHref = t('contacts.whatsappHref')

  return (
    <section
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,_#ffffff_0%,_#f8fafc_52%,_#eef2f7_100%)] pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28"
      id="home"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <svg
        aria-hidden="true"
        className="absolute right-[-5rem] top-16 -z-10 hidden h-[30rem] w-[36rem] text-accent opacity-[0.13] lg:block"
        fill="none"
        viewBox="0 0 620 520"
      >
        <path
          d="M76 418C182 372 242 306 330 236C404 177 466 129 548 64"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="10"
        />
        <path
          d="M492 64H552V124"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10"
        />
        {[86, 132, 178, 224, 270, 316].map((x, index) => (
          <rect
            fill="currentColor"
            height={72 + index * 22}
            key={x}
            rx="10"
            width="24"
            x={x}
            y={392 - index * 22}
          />
        ))}
        {[0, 1, 2, 3, 4].map((index) => (
          <path
            d={`M${92 + index * 68} 72L${238 + index * 68} 218`}
            key={index}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="3"
          />
        ))}
      </svg>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
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

          <p className="mt-5 max-w-2xl text-2xl font-bold leading-8 text-primary/88 sm:text-3xl">
            {t('hero.tagline')}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {t('hero.description')}
          </p>

          <ol className="mt-10 grid gap-3">
            {problems.map((item, index) => {
              const isSolution = index === problems.length - 1

              return (
                <li
                  className={`flex items-center gap-3 rounded-2xl border p-4 shadow-sm ring-1 ring-primary/5 backdrop-blur ${
                    isSolution
                      ? 'border-accent/45 bg-primary text-white'
                      : 'border-white/70 bg-white/78 text-primary'
                  }`}
                  key={item}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                      isSolution ? 'bg-accent text-primary' : 'bg-primary text-accent'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`text-base font-bold leading-6 ${
                      isSolution ? 'text-white' : 'text-primary'
                    }`}
                  >
                    {item}
                  </span>
                </li>
              )
            })}
          </ol>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contacts">
              {t('hero.primaryCta')}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <Button href="#services" variant="secondary">
              {t('hero.secondaryCta')}
            </Button>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="relative"
          initial={{ opacity: 0, x: 28 }}
          transition={{ delay: 0.12, duration: 0.65, ease: 'easeOut' }}
        >
          <div className="relative overflow-hidden rounded-[2rem] bg-primary p-5 text-white shadow-[0_36px_120px_rgb(15_23_42_/_0.28)]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgb(212_175_55_/_0.28),_transparent_42%),linear-gradient(180deg,_rgb(255_255_255_/_0.08),_transparent)]" />
            <div className="relative rounded-[1.5rem] border border-white/10 bg-white/8 p-6 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                    {t('hero.panel.title')}
                  </p>
                  <h2 className="mt-4 text-3xl font-black leading-tight text-white">
                    {t('hero.tagline')}
                  </h2>
                </div>
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary shadow-[0_16px_45px_rgb(212_175_55_/_0.22)]">
                  <CircleCheck aria-hidden="true" className="size-7" />
                </span>
              </div>

              <p className="mt-5 text-sm leading-6 text-white/72">
                {t('hero.panel.description')}
              </p>

              <div className="mt-8 grid gap-4">
                {panelItems.map((item) => (
                  <div
                    className="rounded-2xl border border-white/10 bg-white/10 p-4"
                    key={item.label}
                  >
                    <p className="text-sm text-white/72">{item.label}</p>
                    <p className="mt-2 text-lg font-bold leading-6 text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a
                  aria-label={t('contacts.callLabel')}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-primary transition hover:bg-[#c9a12f]"
                  href={`tel:${phoneHref}`}
                >
                  <PhoneCall aria-hidden="true" className="size-4" />
                  {t('contacts.phone')}
                </a>
                <a
                  aria-label={t('contacts.whatsappAriaLabel')}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:border-accent/60 hover:text-accent"
                  href={`https://wa.me/${whatsappHref}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  {t('contacts.whatsappLabel')}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
