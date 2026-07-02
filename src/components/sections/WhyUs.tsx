import { BadgeCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function WhyUs() {
  const { t } = useTranslation()

  const points = [
    t('whyUs.items.expertise'),
    t('whyUs.items.clarity'),
    t('whyUs.items.focus'),
  ]

  return (
    <section className="py-16 sm:py-20" id="why-us">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-accent">{t('whyUs.eyebrow')}</p>
        <h2 className="mt-3 text-3xl font-bold text-primary">{t('whyUs.title')}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          {t('whyUs.description')}
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {points.map((point) => (
            <li
              className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm font-semibold text-primary"
              key={point}
            >
              <BadgeCheck aria-hidden="true" className="size-5 text-accent" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
