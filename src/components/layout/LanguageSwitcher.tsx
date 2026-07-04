import { useTranslation } from 'react-i18next'
import type { AppLanguage } from '../../i18n'

const languages: Array<{ code: AppLanguage }> = [
  { code: 'ru' },
  { code: 'kk' },
]

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language

  return (
    <div
      aria-label={t('language.label')}
      className="inline-flex rounded-xl border border-white/70 bg-white/80 p-1 shadow-sm ring-1 ring-primary/5 backdrop-blur"
      role="group"
    >
      {languages.map((language) => {
        const isActive = currentLanguage === language.code

        return (
          <button
            aria-label={t(
              language.code === 'ru' ? 'language.switchToRu' : 'language.switchToKk',
            )}
            aria-pressed={isActive}
            className={`min-h-10 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              isActive
                ? 'bg-primary text-white'
                : 'text-muted hover:bg-background hover:text-primary'
            }`}
            data-language-code={language.code}
            key={language.code}
            onClick={() => void i18n.changeLanguage(language.code)}
            type="button"
          >
            {t(`language.${language.code}`)}
          </button>
        )
      })}
    </div>
  )
}
