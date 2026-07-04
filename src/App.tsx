import {
  Component,
  useEffect,
  type ErrorInfo,
  type PropsWithChildren,
  type ReactNode,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { About } from './components/sections/About'
import { Contacts } from './components/sections/Contacts'
import { FinalSlogan } from './components/sections/FinalSlogan'
import { Hero } from './components/sections/Hero'
import { Services } from './components/sections/Services'
import { WarningBlock } from './components/sections/WarningBlock'
import { WhyUs } from './components/sections/WhyUs'

type ErrorBoundaryState = {
  error: Error | null
}

class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('MM Finance render error', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16 text-primary">
          <div className="max-w-xl rounded-2xl border border-accent/40 bg-surface p-6 text-center shadow-soft">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              Ошибка отображения
            </p>
            <h1 className="mt-3 text-3xl font-black">Страница временно недоступна</h1>
            <p className="mt-4 text-base leading-7 text-muted">
              Мы уже вывели подробности ошибки в консоль браузера. Обновите страницу
              или попробуйте открыть её позже.
            </p>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

function DocumentLanguage() {
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage === 'kk' ? 'kk' : 'ru'

  useEffect(() => {
    document.documentElement.lang = language
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute('content', language === 'kk' ? 'kk_KZ' : 'ru_RU')
  }, [language])

  return null
}

function LandingPage() {
  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <WarningBlock />
      <WhyUs />
      <FinalSlogan />
      <Contacts />
    </Layout>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <DocumentLanguage />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
