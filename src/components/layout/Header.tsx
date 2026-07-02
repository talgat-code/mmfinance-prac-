import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#contacts', label: t('nav.contacts') },
  ]

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border transition-colors ${
        isScrolled ? 'bg-surface/95 shadow-sm backdrop-blur' : 'bg-surface/80'
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a className="text-base font-bold text-primary sm:text-lg" href="#home">
          MM Finance Consulting
        </a>

        <nav
          aria-label="Main navigation"
          className="order-3 flex w-full items-center justify-center gap-5 text-sm font-medium text-muted md:order-none md:w-auto"
        >
          {navItems.map((item) => (
            <a
              className="transition hover:text-primary"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  )
}
