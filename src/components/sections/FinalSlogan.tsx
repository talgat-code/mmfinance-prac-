import { useTranslation } from 'react-i18next'
import { SectionReveal } from '../ui/SectionReveal'

export function FinalSlogan() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-surface px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl lg:px-8">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-primary px-6 py-12 text-center text-white shadow-[0_32px_100px_rgb(15_23_42_/_0.22)] sm:px-10 sm:py-16">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgb(212_175_55_/_0.22),_transparent_36%),linear-gradient(180deg,_rgb(255_255_255_/_0.08),_transparent)]" />
            <div className="relative mx-auto flex max-w-4xl flex-col items-center">
              <span className="h-px w-28 bg-gradient-to-r from-transparent via-accent to-transparent" />
              <p className="mt-8 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {t('hero.closingSlogan')}
              </p>
              <span className="mt-8 h-px w-28 bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
