import type { FormEvent } from 'react'
import type { LucideIcon } from 'lucide-react'
import { MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'
import { SectionReveal } from '../ui/SectionReveal'

type ContactItem = {
  icon: LucideIcon
  title: string
  label: string
  href?: string
  external?: boolean
}

export function Contacts() {
  const { t } = useTranslation()
  const phoneHref = t('contacts.phoneHref')
  const whatsappHref = t('contacts.whatsappHref')

  const contacts: ContactItem[] = [
    {
      icon: Phone,
      title: t('contacts.cards.phone'),
      label: t('contacts.phone'),
      href: `tel:${phoneHref}`,
    },
    {
      icon: MessageCircle,
      title: t('contacts.cards.whatsapp'),
      label: t('contacts.whatsappLabel'),
      href: `https://wa.me/${whatsappHref}`,
      external: true,
    },
    {
      icon: MapPin,
      title: t('contacts.cards.address'),
      label: t('contacts.address'),
    },
  ]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim() || '-'
    const phone = String(formData.get('phone') ?? '').trim() || '-'
    const message = t('contacts.form.whatsappMessage', { name, phone })
    const url = `https://wa.me/${whatsappHref}?text=${encodeURIComponent(message)}`

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      className="relative overflow-hidden bg-surface py-20 sm:py-24"
      id="contacts"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,_rgb(212_175_55_/_0.16),_transparent_26%),linear-gradient(180deg,_transparent,_rgb(15_23_42_/_0.04))]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            align="center"
            description={t('contacts.description')}
            eyebrow={t('contacts.eyebrow')}
            title={t('contacts.title')}
          />
        </SectionReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {contacts.map(({ external, href, icon: Icon, label, title }) => {
            const content = (
              <Card className="h-full" hover>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-primary ring-1 ring-accent/20">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  {title}
                </p>
                <p className="mt-3 text-base font-bold leading-6 text-primary">
                  {label}
                </p>
              </Card>
            )

            return (
              <SectionReveal className="h-full" key={title}>
                {href ? (
                  <a
                    className="block h-full"
                    href={href}
                    rel={external ? 'noreferrer' : undefined}
                    target={external ? '_blank' : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  <div className="h-full">{content}</div>
                )}
              </SectionReveal>
            )
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionReveal>
            <Card className="h-full overflow-hidden p-0">
              <div className="relative flex min-h-80 flex-col justify-end overflow-hidden rounded-2xl bg-primary p-6 text-white">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgb(212_175_55_/_0.28),_transparent_42%),radial-gradient(circle_at_80%_20%,_rgb(255_255_255_/_0.16),_transparent_28%)]" />
                <div className="absolute left-8 top-8 grid grid-cols-3 gap-2 opacity-40">
                  {Array.from({ length: 18 }).map((_, index) => (
                    <span
                      className="size-2 rounded-full bg-accent"
                      key={`map-dot-${index}`}
                    />
                  ))}
                </div>
                <div className="relative rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <MapPin aria-hidden="true" className="size-8 text-accent" />
                  <h3 className="mt-5 text-2xl font-bold">{t('contacts.map.title')}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/72">
                    {t('contacts.map.description')}
                  </p>
                  <p className="mt-5 text-base font-bold leading-7 text-white">
                    {t('contacts.address')}
                  </p>
                </div>
              </div>
            </Card>
          </SectionReveal>

          <SectionReveal>
            <Card className="h-full">
              <div className="mb-7">
                <h3 className="text-2xl font-bold text-primary">
                  {t('contacts.form.title')}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {t('contacts.form.description')}
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="text-sm font-semibold text-primary"
                    htmlFor="contact-name"
                  >
                    {t('contacts.form.nameLabel')}
                  </label>
                  <input
                    className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-primary outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/15"
                    id="contact-name"
                    name="name"
                    placeholder={t('contacts.form.namePlaceholder')}
                    type="text"
                  />
                </div>

                <div>
                  <label
                    className="text-sm font-semibold text-primary"
                    htmlFor="contact-phone"
                  >
                    {t('contacts.form.phoneLabel')}
                  </label>
                  <input
                    className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-primary outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/15"
                    id="contact-phone"
                    name="phone"
                    placeholder={t('contacts.form.phonePlaceholder')}
                    type="tel"
                  />
                </div>

                <button
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-primary shadow-[0_18px_45px_rgb(212_175_55_/_0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#c9a12f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  type="submit"
                >
                  {t('contacts.form.submit')}
                  <Send aria-hidden="true" className="size-4" />
                </button>

                <p className="text-xs leading-5 text-muted">{t('contacts.form.note')}</p>
              </form>
            </Card>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
