import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const phoneHref = t('contacts.phoneHref')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navItems = [
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#why-us', label: t('nav.whyUs') },
    { href: '#contacts', label: t('nav.contacts') },
  ]

  const renderNavLink = (href: string, label: string, isMobile = false) => (
    <a
      className={`group relative font-medium text-muted transition hover:text-primary ${
        isMobile ? 'py-3 text-lg' : 'text-sm'
      }`}
      href={href}
      key={href}
      onClick={() => setIsMenuOpen(false)}
    >
      <span>{label}</span>
      <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  )

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        isScrolled
          ? 'border-border bg-surface/92 shadow-[0_16px_45px_rgb(15_23_42_/_0.08)] backdrop-blur-xl'
          : 'border-transparent bg-surface/75 backdrop-blur'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a
          className="group flex items-center gap-3 text-primary"
          href="#home"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-sm font-black text-accent shadow-soft ring-1 ring-white/20">
            {t('brand.shortName').slice(0, 2)}
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-black tracking-wide text-primary sm:text-base">
              {t('brand.shortName')}
            </span>
            <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              {t('brand.descriptor')}
            </span>
          </span>
        </a>

        <nav
          aria-label={t('nav.mainNavigation')}
          className="hidden items-center justify-center gap-7 md:flex"
        >
          {navItems.map((item) => renderNavLink(item.href, item.label))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            className="hidden min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-sm transition hover:bg-primary-soft lg:inline-flex"
            href={`tel:${phoneHref}`}
          >
            <Phone aria-hidden="true" className="size-4 text-accent" />
            {t('contacts.phone')}
          </a>
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-white/80 text-primary shadow-sm transition hover:border-accent md:hidden"
            onClick={() => setIsMenuOpen((value) => !value)}
            type="button"
          >
            {isMenuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            animate={{ opacity: 1, height: 'auto' }}
            className="overflow-hidden border-t border-border bg-surface/96 shadow-soft backdrop-blur-xl md:hidden"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 sm:px-6">
              <div className="mb-2 sm:hidden">
                <LanguageSwitcher />
              </div>
              <nav
                aria-label={t('nav.mainNavigation')}
                className="flex flex-col"
              >
                {navItems.map((item) =>
                  renderNavLink(item.href, item.label, true),
                )}
              </nav>
              <a
                className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white"
                href={`tel:${phoneHref}`}
              >
                <Phone aria-hidden="true" className="size-4 text-accent" />
                {t('contacts.phone')}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
