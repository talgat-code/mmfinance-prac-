import type { LucideIcon } from 'lucide-react'
import { ShieldCheck, Star, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'
import { SectionReveal } from '../ui/SectionReveal'

const trustIcons = {
  ShieldCheck,
  Star,
  Users,
} satisfies Record<string, LucideIcon>

type TrustIconName = keyof typeof trustIcons

type TrustPoint = {
  icon: TrustIconName
  text: string
}

export function WhyUs() {
  const { t } = useTranslation()
  const trustPoints = t('whyUs.trustPoints', {
    returnObjects: true,
  }) as TrustPoint[]

  return (
    <section className="relative overflow-hidden py-20 sm:py-24" id="why-us">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            align="center"
            description={t('whyUs.description')}
            eyebrow={t('whyUs.eyebrow')}
            title={t('whyUs.title')}
          />
        </SectionReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {trustPoints.map(({ icon, text }) => {
            const Icon = trustIcons[icon]

            return (
              <SectionReveal className="h-full" key={text}>
                <Card className="h-full text-center" hover>
                  <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-accent">
                    <Icon aria-hidden="true" className="size-7" />
                  </span>
                  <p className="mt-6 text-xl font-black leading-7 text-primary">
                    {text}
                  </p>
                </Card>
              </SectionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
