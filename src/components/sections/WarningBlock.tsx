import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionReveal } from '../ui/SectionReveal'

export function WarningBlock() {
  const { t } = useTranslation()

  return (
    <section className="bg-surface px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-6xl lg:px-8">
        <SectionReveal>
          <div className="overflow-hidden rounded-[1.5rem] border border-accent/60 bg-primary p-5 text-white shadow-[0_28px_90px_rgb(15_23_42_/_0.2)]">
            <div className="flex flex-col gap-5 rounded-[1.1rem] border border-white/10 bg-white/8 p-5 sm:flex-row sm:items-start sm:p-6">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary shadow-[0_16px_45px_rgb(212_175_55_/_0.22)]">
                <AlertTriangle aria-hidden="true" className="size-7" />
              </span>
              <div>
                <h2 className="text-2xl font-black tracking-wide text-accent">
                  {t('warning.title')}
                </h2>
                <p className="mt-3 text-base font-semibold leading-7 text-white/82">
                  {t('warning.text')}
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
