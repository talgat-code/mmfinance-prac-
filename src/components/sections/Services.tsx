import { ChartNoAxesCombined, ClipboardCheck, Landmark } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'

export function Services() {
  const { t } = useTranslation()

  const services = [
    {
      icon: Landmark,
      title: t('services.items.planning.title'),
      description: t('services.items.planning.description'),
    },
    {
      icon: ChartNoAxesCombined,
      title: t('services.items.analytics.title'),
      description: t('services.items.analytics.description'),
    },
    {
      icon: ClipboardCheck,
      title: t('services.items.support.title'),
      description: t('services.items.support.description'),
    },
  ]

  return (
    <section className="bg-surface py-16 sm:py-20" id="services">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-accent">{t('services.eyebrow')}</p>
        <h2 className="mt-3 text-3xl font-bold text-primary">{t('services.title')}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          {t('services.description')}
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <Icon aria-hidden="true" className="size-7 text-accent" />
              <h3 className="mt-5 text-lg font-semibold text-primary">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
