import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  Briefcase,
  Car,
  ClipboardList,
  Globe,
  Home,
  MapPin,
  MessageCircle,
  PhoneCall,
  User,
  Users,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionReveal } from '../ui/SectionReveal'

const bannerUrl = new URL('../../assets/images/newbanner.png', import.meta.url).href

const serviceIcons = {
  Briefcase,
  Car,
  Globe,
  Home,
  User,
  Users,
} satisfies Record<string, LucideIcon>

type ServiceIconName = keyof typeof serviceIcons

type ServiceItem = {
  icon: ServiceIconName
  title: string
  description: string
}

export function PromoPanel() {
  const { t } = useTranslation()
  const services = t('services.items', { returnObjects: true }) as ServiceItem[]
  const phoneHref = t('contacts.phoneHref')
  const whatsappHref = t('contacts.whatsappHref')

  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl lg:px-8">
        <SectionReveal>
          <div className="grid overflow-hidden rounded-[1.75rem] bg-primary text-white shadow-[0_34px_110px_rgb(15_23_42_/_0.22)] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative isolate flex min-h-[520px] items-center justify-center overflow-hidden bg-[linear-gradient(150deg,_rgb(2_6_23),_rgb(15_23_42)_58%,_rgb(30_41_59))] p-5 sm:p-8">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_35%_16%,_rgb(212_175_55_/_0.18),_transparent_32%),linear-gradient(180deg,_rgb(255_255_255_/_0.08),_transparent)]" />
              <img
                alt={t('promo.imageAlt')}
                className="max-h-[680px] w-full max-w-[360px] rounded-2xl object-cover shadow-[0_30px_90px_rgb(0_0_0_/_0.34)] ring-1 ring-accent/30"
                src={bannerUrl}
              />
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                {t('promo.eyebrow')}
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
                {t('promo.title')}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/74 sm:text-base sm:leading-7">
                {t('promo.description')}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-primary transition hover:bg-[#c9a12f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  href="#contacts"
                >
                  {t('promo.applyButton')}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
                <a
                  aria-label={t('contacts.callLabel')}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:border-accent/60 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  href={`tel:${phoneHref}`}
                >
                  <PhoneCall aria-hidden="true" className="size-4" />
                  {t('promo.callButton')}
                </a>
                <a
                  aria-label={t('contacts.whatsappAriaLabel')}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:border-accent/60 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  href={`https://wa.me/${whatsappHref}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  {t('promo.whatsappButton')}
                </a>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/8 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                    <ClipboardList aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="text-xl font-black text-white">
                    {t('promo.servicesTitle')}
                  </h3>
                </div>

                <ul className="mt-5 grid gap-3">
                  {services.map(({ description, icon, title }) => {
                    const Icon = serviceIcons[icon]

                    return (
                      <li
                        className="grid gap-3 border-t border-white/10 pt-3 first:border-t-0 first:pt-0 sm:grid-cols-[2.75rem_1fr]"
                        key={title}
                      >
                        <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-primary">
                          <Icon aria-hidden="true" className="size-5" />
                        </span>
                        <span>
                          <span className="block text-base font-bold leading-6 text-white">
                            {title}
                          </span>
                          <span className="mt-1 block text-sm leading-6 text-white/72">
                            {description}
                          </span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                    {t('warning.title')}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/78">
                    {t('warning.text')}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <div className="flex items-start gap-3">
                    <MapPin
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-accent"
                    />
                    <p className="text-sm font-semibold leading-6 text-white/78">
                      {t('contacts.address')}
                    </p>
                  </div>
                  <p className="mt-3 text-xl font-black text-accent">
                    {t('contacts.phone')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
