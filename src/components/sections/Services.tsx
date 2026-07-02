import {
  CreditCard,
  FileCheck2,
  Landmark,
  MessageCircle,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'
import { SectionReveal } from '../ui/SectionReveal'

export function Services() {
  const { t } = useTranslation()

  const services = [
    {
      icon: CreditCard,
      title: t('services.items.creditHistory.title'),
      description: t('services.items.creditHistory.description'),
    },
    {
      icon: Landmark,
      title: t('services.items.mortgage.title'),
      description: t('services.items.mortgage.description'),
    },
    {
      icon: FileCheck2,
      title: t('services.items.documents.title'),
      description: t('services.items.documents.description'),
    },
    {
      icon: MessageCircle,
      title: t('services.items.support.title'),
      description: t('services.items.support.description'),
    },
  ]

  return (
    <section
      className="relative overflow-hidden bg-surface py-20 sm:py-24"
      id="services"
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgb(15_23_42_/_0.04),_transparent_40%),radial-gradient(circle_at_85%_20%,_rgb(212_175_55_/_0.16),_transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            align="center"
            description={t('services.description')}
            eyebrow={t('services.eyebrow')}
            title={t('services.title')}
          />
        </SectionReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map(({ description, icon: Icon, title }, index) => (
            <SectionReveal className="h-full" key={title}>
              <Card
                className={`flex h-full flex-col overflow-hidden ${
                  index % 2 === 1 ? 'xl:mt-8' : ''
                }`}
                hover
              >
                <div className="mb-7 flex items-center justify-between">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-accent-soft text-primary ring-1 ring-accent/20">
                    <Icon aria-hidden="true" className="size-7" />
                  </span>
                  <span className="h-px w-16 bg-gradient-to-r from-accent to-transparent" />
                </div>
                <h3 className="text-xl font-bold leading-tight text-primary">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
