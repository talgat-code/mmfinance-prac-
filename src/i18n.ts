import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import kk from './locales/kk.json'
import ru from './locales/ru.json'

export const supportedLanguages = ['ru', 'kk'] as const
export type AppLanguage = (typeof supportedLanguages)[number]

const defaultLanguage: AppLanguage = 'ru'
const storageKey = 'mm-finance-language'

const isSupportedLanguage = (language: string | null): language is AppLanguage =>
  supportedLanguages.includes(language as AppLanguage)

const getInitialLanguage = (): AppLanguage => {
  if (typeof window === 'undefined') {
    return defaultLanguage
  }

  const savedLanguage = window.localStorage.getItem(storageKey)

  return isSupportedLanguage(savedLanguage) ? savedLanguage : defaultLanguage
}

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    kk: { translation: kk },
  },
  lng: getInitialLanguage(),
  fallbackLng: defaultLanguage,
  supportedLngs: [...supportedLanguages],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
})

i18n.on('languageChanged', (language) => {
  if (typeof window !== 'undefined' && isSupportedLanguage(language)) {
    window.localStorage.setItem(storageKey, language)
  }
})

export default i18n
