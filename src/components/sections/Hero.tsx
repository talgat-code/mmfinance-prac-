import { motion } from 'framer-motion'
import { ArrowRight, BriefcaseBusiness } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="bg-surface pt-20 pb-16 sm:pt-24 sm:pb-20" id="home">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="inline-flex items-center gap-2 rounded-md bg-accent-soft px-3 py-1.5 text-sm font-semibold text-primary">
            <BriefcaseBusiness aria-hidden="true" className="size-4" />
            {t('hero.eyebrow')}
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-primary sm:text-5xl">
            {t('hero.title')}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {t('hero.description')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contacts">
              {t('hero.primaryCta')}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <Button href="#services" variant="secondary">
              {t('hero.secondaryCta')}
            </Button>
          </div>
        </motion.div>

        <div className="rounded-lg border border-border bg-background p-6 shadow-soft">
          <div className="rounded-md bg-primary p-6 text-white">
            <p className="text-sm text-white/65">MM Finance Consulting</p>
            <p className="mt-12 text-3xl font-semibold text-accent">#0F172A</p>
            <p className="mt-3 text-sm text-white/65">Primary palette preview</p>
          </div>
        </div>
      </div>
    </section>
  )
}
