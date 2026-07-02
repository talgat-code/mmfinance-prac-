import { Mail, MapPin, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'

export function Contacts() {
  const { t } = useTranslation()

  const contacts = [
    { icon: Phone, label: t('contacts.phone') },
    { icon: Mail, label: t('contacts.email') },
    { icon: MapPin, label: t('contacts.address') },
  ]

  return (
    <section className="bg-surface py-16 sm:py-20" id="contacts">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-accent">{t('contacts.eyebrow')}</p>
        <h2 className="mt-3 text-3xl font-bold text-primary">{t('contacts.title')}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          {t('contacts.description')}
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {contacts.map(({ icon: Icon, label }) => (
            <Card className="flex items-center gap-4" key={label}>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent-soft text-primary">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="text-sm font-medium text-primary">{label}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
