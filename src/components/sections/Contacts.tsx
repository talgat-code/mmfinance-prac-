import type { ChangeEvent, FocusEvent, FormEvent } from 'react'
import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { CheckCircle2, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'
import { SectionReveal } from '../ui/SectionReveal'

const phonePattern = /^[\d+()\s]+$/

type ContactItem = {
  icon: LucideIcon
  title: string
  label: string
  href?: string
  external?: boolean
  ariaLabel?: string
}

type ContactFormValues = {
  name: string
  phone: string
}

type ContactFormTouched = Record<keyof ContactFormValues, boolean>

const formatWhatsappTemplate = (
  template: string,
  values: ContactFormValues,
) =>
  template
    .replaceAll('{name}', values.name.trim())
    .replaceAll('{phone}', values.phone.trim())

const initialFormValues: ContactFormValues = {
  name: '',
  phone: '',
}

const initialTouched: ContactFormTouched = {
  name: false,
  phone: false,
}

export function Contacts() {
  const { t } = useTranslation()
  const phoneHref = t('contacts.phoneHref')
  const whatsappHref = t('contacts.whatsappHref')
  const [formValues, setFormValues] = useState<ContactFormValues>(initialFormValues)
  const [touched, setTouched] = useState<ContactFormTouched>(initialTouched)
  const [isSuccessVisible, setIsSuccessVisible] = useState(false)
  const trimmedName = formValues.name.trim()
  const trimmedPhone = formValues.phone.trim()
  const isPhoneValid = trimmedPhone.length > 0 && phonePattern.test(trimmedPhone)
  const isFormValid = trimmedName.length > 0 && isPhoneValid
  const nameError =
    touched.name && trimmedName.length === 0 ? t('contacts.form.nameRequired') : ''
  const phoneError =
    touched.phone && trimmedPhone.length === 0
      ? t('contacts.form.phoneRequired')
      : touched.phone && trimmedPhone.length > 0 && !isPhoneValid
        ? t('contacts.form.phoneInvalid')
        : ''

  useEffect(() => {
    if (!isSuccessVisible) {
      return undefined
    }

    const timer = window.setTimeout(() => setIsSuccessVisible(false), 3500)

    return () => window.clearTimeout(timer)
  }, [isSuccessVisible])

  const contacts: ContactItem[] = [
    {
      icon: Phone,
      title: t('contacts.cards.phone'),
      label: t('contacts.phone'),
      href: `tel:${phoneHref}`,
      ariaLabel: t('contacts.callLabel'),
    },
    {
      icon: MessageCircle,
      title: t('contacts.cards.whatsapp'),
      label: t('contacts.whatsappLabel'),
      href: `https://wa.me/${whatsappHref}`,
      external: true,
      ariaLabel: t('contacts.whatsappAriaLabel'),
    },
    {
      icon: MapPin,
      title: t('contacts.cards.address'),
      label: t('contacts.address'),
    },
  ]

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof ContactFormValues

    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: event.target.value,
    }))
    setIsSuccessVisible(false)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof ContactFormValues

    setTouched((currentTouched) => ({
      ...currentTouched,
      [field]: true,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isFormValid) {
      setTouched({ name: true, phone: true })

      return
    }

    const message = formatWhatsappTemplate(t('contacts.form.whatsappTemplate'), {
      name: trimmedName,
      phone: trimmedPhone,
    })
    const url = `https://wa.me/${whatsappHref}?text=${encodeURIComponent(message)}`

    window.open(url, '_blank', 'noopener,noreferrer')
    setIsSuccessVisible(true)
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
          {contacts.map(({ ariaLabel, external, href, icon: Icon, label, title }) => {
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
                    aria-label={ariaLabel}
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
                      aria-hidden="true"
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

              <form className="space-y-5" noValidate onSubmit={handleSubmit}>
                <div>
                  <label
                    className="text-sm font-semibold text-primary"
                    htmlFor="contact-name"
                  >
                    {t('contacts.form.nameLabel')}
                  </label>
                  <input
                    aria-describedby={nameError ? 'contact-name-error' : undefined}
                    aria-invalid={Boolean(nameError)}
                    autoComplete="name"
                    className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-primary outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/15"
                    id="contact-name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t('contacts.form.namePlaceholder')}
                    required
                    type="text"
                    value={formValues.name}
                  />
                  {nameError ? (
                    <p className="mt-2 text-sm font-medium text-red-700" id="contact-name-error">
                      {nameError}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    className="text-sm font-semibold text-primary"
                    htmlFor="contact-phone"
                  >
                    {t('contacts.form.phoneLabel')}
                  </label>
                  <input
                    aria-describedby={phoneError ? 'contact-phone-error' : undefined}
                    aria-invalid={Boolean(phoneError)}
                    autoComplete="tel"
                    className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-primary outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/15"
                    id="contact-phone"
                    inputMode="tel"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t('contacts.form.phonePlaceholder')}
                    required
                    type="tel"
                    value={formValues.phone}
                  />
                  {phoneError ? (
                    <p className="mt-2 text-sm font-medium text-red-700" id="contact-phone-error">
                      {phoneError}
                    </p>
                  ) : null}
                </div>

                <button
                  aria-label={t('contacts.form.submitAriaLabel')}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-primary shadow-[0_18px_45px_rgb(212_175_55_/_0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#c9a12f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:bg-border disabled:text-muted disabled:shadow-none disabled:hover:translate-y-0"
                  disabled={!isFormValid}
                  id="contact-form-submit"
                  type="submit"
                >
                  {t('contacts.form.submit')}
                  <Send aria-hidden="true" className="size-4" />
                </button>

                {isSuccessVisible ? (
                  <p
                    aria-live="polite"
                    className="flex items-center gap-2 text-sm font-semibold text-emerald-700"
                    data-testid="contact-form-success"
                  >
                    <CheckCircle2 aria-hidden="true" className="size-4" />
                    {t('contacts.form.success')}
                  </p>
                ) : null}

                <p className="text-xs leading-5 text-muted">{t('contacts.form.note')}</p>
              </form>
            </Card>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
