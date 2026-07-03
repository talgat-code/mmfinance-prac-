import { ClipboardCheck, FileSearch, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'
import { SectionReveal } from '../ui/SectionReveal'

type FactItem = {
  value: string
  label: string
}

const factIcons = [FileSearch, ClipboardCheck, ShieldCheck]

export function About() {
  const { t } = useTranslation()
  const facts = t('about.facts', { returnObjects: true }) as FactItem[]

  return (
    <section className="relative overflow-hidden py-20 sm:py-24" id="about">
      <div className="absolute left-0 top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
        <SectionReveal>
          <SectionHeading
            description={t('about.description')}
            eyebrow={t('about.eyebrow')}
            title={t('about.title')}
          />
          <p className="mt-6 max-w-2xl border-l-2 border-accent pl-5 text-base leading-8 text-primary/78">
            {t('about.lead')}
          </p>
        </SectionReveal>

        <SectionReveal className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {facts.map(({ label, value }, index) => {
            const Icon = factIcons[index] ?? ShieldCheck

            return (
              <Card
                className="group relative overflow-hidden p-6 sm:min-h-44 lg:min-h-0"
                hover
                key={label}
              >
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-accent/10 transition group-hover:bg-accent/20" />
                <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-accent shadow-soft">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <div>
                    <p className="text-2xl font-black text-primary">{value}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{label}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </SectionReveal>
      </div>
    </section>
  )
}
