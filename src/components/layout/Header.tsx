import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, type To } from 'react-router-dom'
import { LanguageSwitcher } from './LanguageSwitcher'

const logoUrl = new URL('../../assets/images/mm-finance-logo-cropped.jpg', import.meta.url)
  .href

type NavItem = {
  label: string
  targetId?: string
  to: To
}

export function Header() {
  const { t } = useTranslation()
  const location = useLocation()
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

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const navItems: NavItem[] = [
    { label: t('nav.about'), targetId: 'about', to: { pathname: '/', hash: '#about' } },
    {
      label: t('nav.services'),
      targetId: 'services',
      to: { pathname: '/', hash: '#services' },
    },
    {
      label: t('nav.tools'),
      targetId: 'tools',
      to: { pathname: '/', hash: '#tools' },
    },
    {
      label: t('nav.whyUs'),
      targetId: 'why-us',
      to: { pathname: '/', hash: '#why-us' },
    },
    { label: t('nav.faq'), targetId: 'faq', to: { pathname: '/', hash: '#faq' } },
    { label: t('nav.contacts'), targetId: 'contacts', to: { pathname: '/', hash: '#contacts' } },
    { label: t('nav.chat'), to: '/chat' },
  ]

  const handleNavClick = (targetId?: string) => {
    setIsMenuOpen(false)

    if (targetId && location.pathname === '/') {
      window.setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 0)
    }
  }

  const renderNavLink = ({ label, targetId, to }: NavItem, isMobile = false) => {
    const isActive = to === '/chat' && location.pathname === '/chat'

    return (
      <Link
        className={`group relative inline-flex min-h-10 items-center font-medium transition hover:text-primary ${
          isActive ? 'text-primary' : 'text-muted'
        } ${
        isMobile ? 'py-3 text-lg' : 'text-sm'
      }`}
        key={label}
        onClick={() => handleNavClick(targetId)}
        to={to}
      >
        <span>{label}</span>
        <span
          className={`absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-accent transition-transform duration-300 ${
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </Link>
    )
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        isScrolled
          ? 'border-border bg-surface/92 shadow-[0_16px_45px_rgb(15_23_42_/_0.08)] backdrop-blur-xl'
          : 'border-transparent bg-surface/75 backdrop-blur'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          aria-label={t('brand.name')}
          className="group flex items-center gap-3 text-primary"
          onClick={() => handleNavClick('home')}
          to={{ pathname: '/', hash: '#home' }}
        >
          <span className="flex h-14 w-20 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-1.5 shadow-soft ring-1 ring-primary/5 sm:w-24">
            <img
              alt=""
              aria-hidden="true"
              className="h-full w-full rounded-xl object-contain"
              src={logoUrl}
            />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-sm font-black tracking-wide text-primary sm:text-base">
              {t('brand.shortName')}
            </span>
            <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              {t('brand.descriptor')}
            </span>
          </span>
        </Link>

        <nav
          aria-label={t('nav.mainNavigation')}
          className="hidden items-center justify-center gap-5 md:flex xl:gap-7"
        >
          {navItems.map((item) => renderNavLink(item))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            aria-label={t('contacts.callLabel')}
            className="hidden min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-sm transition hover:bg-primary-soft lg:inline-flex"
            href={`tel:${phoneHref}`}
          >
            <Phone aria-hidden="true" className="size-4 shrink-0 text-accent" />
            {t('contacts.phone')}
          </a>
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <button
            aria-controls="mobile-navigation"
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
            id="mobile-navigation"
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
                {navItems.map((item) => renderNavLink(item, true))}
              </nav>
              <a
                aria-label={t('contacts.callLabel')}
                className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary px-4 text-sm font-bold text-white"
                href={`tel:${phoneHref}`}
              >
                <Phone aria-hidden="true" className="size-4 shrink-0 text-accent" />
                {t('contacts.phone')}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
