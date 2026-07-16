import { AnimatePresence, motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  Briefcase,
  Car,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Globe,
  Home,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from 'lucide-react'
import { useState } from 'react'
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

const panelTabs = ['company', 'services', 'requirements'] as const

type PanelTab = (typeof panelTabs)[number]
type ServiceIconName = keyof typeof serviceIcons

type ServiceItem = {
  icon: ServiceIconName
  title: string
  description: string
}

type StatItem = {
  value: string
  label: string
}

const tabVariants = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  initial: { opacity: 0, y: 12 },
}

export function PromoPanel() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<PanelTab>('company')
  const services = t('services.items', { returnObjects: true }) as ServiceItem[]
  const stats = t('promo.stats', { returnObjects: true }) as StatItem[]
  const companyHighlights = t('promo.companyHighlights', {
    returnObjects: true,
  }) as string[]
  const requirements = t('promo.requirements', {
    returnObjects: true,
  }) as string[]
  const phoneHref = t('contacts.phoneHref')
  const whatsappHref = t('contacts.whatsappHref')

  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl lg:px-8">
        <SectionReveal>
          <div className="grid overflow-hidden rounded-[1.75rem] bg-primary text-white shadow-[0_34px_110px_rgb(7_20_38_/_0.24)] ring-1 ring-primary/10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative isolate flex min-h-[520px] items-center justify-center overflow-hidden bg-[linear-gradient(150deg,_rgb(2_6_23),_rgb(7_20_38)_58%,_rgb(23_43_64)),repeating-linear-gradient(90deg,_rgb(255_255_255_/_0.05)_0_1px,_transparent_1px_34px)] p-5 sm:p-8">
              <div className="absolute inset-x-8 top-8 -z-10 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
              <motion.img
                alt={t('promo.imageAlt')}
                className="w-full max-w-[360px] rounded-2xl object-cover shadow-[0_30px_90px_rgb(0_0_0_/_0.34)] ring-1 ring-accent/35"
                src={bannerUrl}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                whileHover={{ rotate: -0.6, scale: 1.015 }}
              />
            </div>

            <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <div className="absolute right-8 top-8 hidden h-24 w-px bg-gradient-to-b from-accent/60 to-transparent lg:block" />

              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-accent">
                    <Sparkles aria-hidden="true" className="size-4" />
                    {t('promo.eyebrow')}
                  </p>
                  <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
                    {t('promo.title')}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-white/74 sm:text-base sm:leading-7">
                    {t('promo.description')}
                  </p>
                </div>
              </div>

              <div
                aria-label={t('promo.title')}
                className="mt-7 grid gap-2 rounded-2xl border border-white/10 bg-white/8 p-1.5 sm:grid-cols-3"
                role="tablist"
              >
                {panelTabs.map((tab) => {
                  const isActive = activeTab === tab

                  return (
                    <button
                      aria-selected={isActive}
                      className={`relative min-h-11 rounded-xl px-4 text-sm font-bold transition ${
                        isActive
                          ? 'bg-accent text-primary shadow-[0_14px_36px_rgb(34_197_94_/_0.2)]'
                          : 'text-white/72 hover:bg-white/10 hover:text-white'
                      }`}
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      role="tab"
                      type="button"
                    >
                      {t(`promo.tabs.${tab}`)}
                    </button>
                  )
                })}
              </div>

              <div className="mt-7 min-h-[360px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'company' ? (
                    <motion.div
                      animate="animate"
                      className="grid gap-5"
                      exit="exit"
                      initial="initial"
                      key="company"
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                      variants={tabVariants}
                    >
                      <div className="rounded-2xl border border-white/10 bg-white/8 p-5">
                        <div className="flex items-start gap-4">
                          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                            <ClipboardCheck aria-hidden="true" className="size-6" />
                          </span>
                          <div>
                            <h3 className="text-2xl font-black text-white">
                              {t('promo.companyTitle')}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-white/74">
                              {t('promo.companyDescription')}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        {stats.map(({ label, value }) => (
                          <motion.div
                            className="rounded-2xl border border-white/10 bg-white/10 p-4"
                            key={label}
                            whileHover={{ y: -4 }}
                          >
                            <p className="text-xl font-black text-accent">{value}</p>
                            <p className="mt-2 text-xs font-semibold leading-5 text-white/68">
                              {label}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      <ul className="grid gap-3">
                        {companyHighlights.map((item) => (
                          <li
                            className="flex gap-3 rounded-2xl border border-white/10 bg-white/8 p-4"
                            key={item}
                          >
                            <CheckCircle2
                              aria-hidden="true"
                              className="mt-0.5 size-5 shrink-0 text-accent"
                            />
                            <span className="text-sm font-semibold leading-6 text-white/78">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : null}

                  {activeTab === 'services' ? (
                    <motion.div
                      animate="animate"
                      exit="exit"
                      initial="initial"
                      key="services"
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                      variants={tabVariants}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                          <ClipboardList aria-hidden="true" className="size-5" />
                        </span>
                        <h3 className="text-xl font-black text-white">
                          {t('promo.servicesTitle')}
                        </h3>
                      </div>

                      <ul className="mt-5 grid gap-3">
                        {services.map(({ description, icon, title }, index) => {
                          const Icon = serviceIcons[icon]

                          return (
                            <motion.li
                              className="grid gap-3 rounded-2xl border border-white/10 bg-white/8 p-4 sm:grid-cols-[2.75rem_1fr]"
                              key={title}
                              transition={{ delay: index * 0.035, duration: 0.2 }}
                              whileHover={{ x: 4 }}
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
                            </motion.li>
                          )
                        })}
                      </ul>
                    </motion.div>
                  ) : null}

                  {activeTab === 'requirements' ? (
                    <motion.div
                      animate="animate"
                      className="grid gap-4"
                      exit="exit"
                      initial="initial"
                      key="requirements"
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                      variants={tabVariants}
                    >
                      <div className="rounded-2xl border border-accent/35 bg-accent/10 p-5">
                        <div className="flex items-start gap-4">
                          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                            <ShieldCheck aria-hidden="true" className="size-6" />
                          </span>
                          <div>
                            <p className="text-2xl font-black text-accent">
                              {t('warning.title')}
                            </p>
                            <p className="mt-3 text-sm font-semibold leading-6 text-white/78">
                              {t('warning.text')}
                            </p>
                          </div>
                        </div>
                      </div>

                      <ul className="grid gap-3">
                        {requirements.map((item) => (
                          <li
                            className="flex gap-3 rounded-2xl border border-white/10 bg-white/8 p-4"
                            key={item}
                          >
                            <CheckCircle2
                              aria-hidden="true"
                              className="mt-0.5 size-5 shrink-0 text-accent"
                            />
                            <span className="text-sm font-semibold leading-6 text-white/78">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

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
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-primary transition hover:-translate-y-0.5 hover:bg-[#16a34a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  href="#contacts"
                >
                  {t('promo.applyButton')}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
                <a
                  aria-label={t('contacts.callLabel')}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  href={`tel:${phoneHref}`}
                >
                  <PhoneCall aria-hidden="true" className="size-4" />
                  {t('promo.callButton')}
                </a>
                <a
                  aria-label={t('contacts.whatsappAriaLabel')}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  href={`https://wa.me/${whatsappHref}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  {t('promo.whatsappButton')}
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
