import { useTranslation } from 'react-i18next'

export function About() {
  const { t } = useTranslation()

  return (
    <section className="py-16 sm:py-20" id="about">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-accent">{t('about.eyebrow')}</p>
        <h2 className="mt-3 text-3xl font-bold text-primary">{t('about.title')}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          {t('about.description')}
        </p>
      </div>
    </section>
  )
}
