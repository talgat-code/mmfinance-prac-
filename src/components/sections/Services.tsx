import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  Briefcase,
  Car,
  Globe,
  Home,
  User,
  Users,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'
import { SectionReveal } from '../ui/SectionReveal'

const serviceIcons = {
  Briefcase,
  Car,
  Globe,
  Home,
  User,
  Users,
} satisfies Record<string, LucideIcon>

type ServiceIconName = keyof typeof serviceIcons

type ServiceItem = {
  icon: ServiceIconName
  key: string
  title: string
  description: string
}

export function Services() {
  const { t } = useTranslation()
  const services = t('services.items', { returnObjects: true }) as ServiceItem[]

  return (
    <section
      className="relative overflow-hidden bg-surface py-20 sm:py-24"
      id="services"
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgb(15_23_42_/_0.04),_transparent_40%),radial-gradient(circle_at_85%_20%,_rgb(34_197_94_/_0.16),_transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            align="center"
            description={t('services.description')}
            eyebrow={t('services.eyebrow')}
            title={t('services.title')}
          />
        </SectionReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ description, icon, key, title }) => {
            const Icon = serviceIcons[icon]

            return (
              <SectionReveal className="h-full" key={title}>
                <Card className="flex h-full flex-col overflow-hidden" hover>
                  <div className="mb-7 flex items-center justify-between">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-accent-soft text-primary ring-1 ring-accent/20">
                      <Icon aria-hidden="true" className="size-7" />
                    </span>
                    <span className="h-px w-16 bg-gradient-to-r from-accent to-transparent" />
                  </div>
                  <h3 className="text-xl font-bold leading-tight text-primary">
                    {title}
                  </h3>
                  <p className="mt-4 flex-1 text-base font-semibold leading-7 text-muted">
                    {description}
                  </p>
                  <Link
                    aria-label={t('services.cardCtaAria', { service: title })}
                    className="group mt-7 inline-flex min-h-11 items-center justify-between gap-3 rounded-xl border border-primary/10 bg-primary/5 px-4 text-sm font-black text-primary transition duration-200 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    to={{
                      pathname: '/chat',
                      search: `?service=${encodeURIComponent(key)}`,
                    }}
                  >
                    <span>{t('services.cardCta')}</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 transition group-hover:translate-x-1"
                    />
                  </Link>
                </Card>
              </SectionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
