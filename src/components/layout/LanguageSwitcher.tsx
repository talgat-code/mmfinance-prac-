import { useTranslation } from 'react-i18next'
import type { AppLanguage } from '../../i18n'

const languages: Array<{ code: AppLanguage; label: string }> = [
  { code: 'ru', label: 'RU' },
  { code: 'kk', label: 'KZ' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language

  return (
    <div
      aria-label="Language switcher"
      className="inline-flex rounded-md border border-border bg-surface p-1"
    >
      {languages.map((language) => {
        const isActive = currentLanguage === language.code

        return (
          <button
            aria-pressed={isActive}
            className={`rounded px-3 py-1.5 text-xs font-semibold transition ${
              isActive
                ? 'bg-primary text-white'
                : 'text-muted hover:bg-background hover:text-primary'
            }`}
            key={language.code}
            onClick={() => void i18n.changeLanguage(language.code)}
            type="button"
          >
            {language.label}
          </button>
        )
      })}
    </div>
  )
}
