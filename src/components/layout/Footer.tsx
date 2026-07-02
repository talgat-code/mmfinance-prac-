import { Mail, MapPin, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const contacts = [
    { icon: Phone, text: t('footer.phone') },
    { icon: Mail, text: t('footer.email') },
    { icon: MapPin, text: t('footer.address') },
  ]

  return (
    <footer className="border-t border-primary-soft bg-primary text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="text-lg font-bold">MM Finance Consulting</p>
          <p className="mt-3 max-w-xl text-sm text-white/70">
            {t('footer.tagline')}
          </p>
          <p className="mt-6 text-sm text-white/60">
            © {currentYear} MM Finance Consulting. {t('footer.copyright')}
          </p>
        </div>

        <ul className="space-y-3 text-sm text-white/75">
          {contacts.map(({ icon: Icon, text }) => (
            <li className="flex items-center gap-3" key={text}>
              <Icon aria-hidden="true" className="size-4 text-accent" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
