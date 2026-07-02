import { BadgeCheck, Eye, LockKeyhole, Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'
import { SectionReveal } from '../ui/SectionReveal'

export function WhyUs() {
  const { t } = useTranslation()

  const advantages = [
    {
      icon: Eye,
      title: t('whyUs.items.diagnostics.title'),
      description: t('whyUs.items.diagnostics.description'),
    },
    {
      icon: BadgeCheck,
      title: t('whyUs.items.transparency.title'),
      description: t('whyUs.items.transparency.description'),
    },
    {
      icon: LockKeyhole,
      title: t('whyUs.items.privacy.title'),
      description: t('whyUs.items.privacy.description'),
    },
    {
      icon: Target,
      title: t('whyUs.items.result.title'),
      description: t('whyUs.items.result.description'),
    },
  ]

  const steps = [
    {
      step: t('whyUs.timeline.audit.step'),
      title: t('whyUs.timeline.audit.title'),
      description: t('whyUs.timeline.audit.description'),
    },
    {
      step: t('whyUs.timeline.plan.step'),
      title: t('whyUs.timeline.plan.title'),
      description: t('whyUs.timeline.plan.description'),
    },
    {
      step: t('whyUs.timeline.application.step'),
      title: t('whyUs.timeline.application.title'),
      description: t('whyUs.timeline.application.description'),
    },
  ]

  return (
    <section className="relative overflow-hidden py-20 sm:py-24" id="why-us">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            description={t('whyUs.description')}
            eyebrow={t('whyUs.eyebrow')}
            title={t('whyUs.title')}
          />
        </SectionReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map(({ description, icon: Icon, title }) => (
            <SectionReveal className="h-full" key={title}>
              <Card className="h-full" hover>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-accent">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
              </Card>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="mt-12">
          <div className="rounded-[2rem] bg-primary p-5 shadow-[0_32px_100px_rgb(15_23_42_/_0.22)]">
            <div className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/8 p-4 sm:p-6 lg:grid-cols-3">
              {steps.map((item, index) => (
                <div className="relative rounded-2xl bg-white/8 p-5" key={item.step}>
                  {index < steps.length - 1 ? (
                    <span className="absolute right-[-1rem] top-1/2 hidden h-px w-8 bg-accent/50 lg:block" />
                  ) : null}
                  <p className="text-sm font-black text-accent">{item.step}</p>
                  <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/68">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
