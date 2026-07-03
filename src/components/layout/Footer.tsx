import type { LucideIcon } from 'lucide-react'
import { MapPin, MessageCircle, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type FooterContact = {
  icon: LucideIcon
  text: string
  href?: string
  external?: boolean
}

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  const phoneHref = t('contacts.phoneHref')
  const whatsappHref = t('contacts.whatsappHref')

  const contacts: FooterContact[] = [
    { icon: Phone, text: t('contacts.phone'), href: `tel:${phoneHref}` },
    { icon: MapPin, text: t('contacts.address') },
  ]

  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,_rgb(212_175_55_/_0.18),_transparent_28%),linear-gradient(180deg,_rgb(255_255_255_/_0.03),_transparent)]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.1fr_0.9fr_0.6fr] lg:px-8">
        <div>
          <a className="inline-flex items-center gap-3" href="#home">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-sm font-black text-primary">
              {t('brand.shortName').slice(0, 2)}
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-base font-black">{t('brand.shortName')}</span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                {t('brand.descriptor')}
              </span>
            </span>
          </a>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/68">
            {t('footer.tagline')}
          </p>
          <p className="mt-8 text-sm text-white/50">
            {currentYear} {t('brand.name')}. {t('footer.copyright')}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
            {t('footer.contactsTitle')}
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-white/72">
            {contacts.map(({ external, href, icon: Icon, text }) => (
              <li className="flex items-start gap-3" key={text}>
                <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                {href ? (
                  <a
                    className="transition hover:text-accent"
                    href={href}
                    rel={external ? 'noreferrer' : undefined}
                    target={external ? '_blank' : undefined}
                  >
                    {text}
                  </a>
                ) : (
                  <span>{text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
            {t('footer.quickContactTitle')}
          </h3>
          <div className="mt-5">
            <a
              aria-label={t('footer.whatsapp')}
              className="inline-flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
              href={`https://wa.me/${whatsappHref}`}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
