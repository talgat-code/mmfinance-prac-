import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  Send,
  SlidersHorizontal,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../ui/SectionHeading'
import { SectionReveal } from '../ui/SectionReveal'

const productKeys = ['consumer', 'mortgage', 'pledge', 'business'] as const
const readinessKeys = ['identity', 'income', 'history', 'property'] as const

type ProductKey = (typeof productKeys)[number]
type ReadinessKey = (typeof readinessKeys)[number]
type ProductInfo = {
  key: ProductKey
  label: string
  helper: string
  rate: number
}
type ReadinessItem = {
  key: ReadinessKey
  label: string
}

const productRates: Record<ProductKey, number> = {
  business: 0.24,
  consumer: 0.27,
  mortgage: 0.18,
  pledge: 0.22,
}

const clampNumber = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const calculateMonthlyPayment = (
  amount: number,
  annualRate: number,
  months: number,
) => {
  const monthlyRate = annualRate / 12

  return amount * (monthlyRate / (1 - (1 + monthlyRate) ** -months))
}

export function FinanceTools() {
  const { i18n, t } = useTranslation()
  const locale = i18n.resolvedLanguage === 'kk' ? 'kk-KZ' : 'ru-RU'
  const whatsappHref = t('contacts.whatsappHref')
  const [productKey, setProductKey] = useState<ProductKey>('consumer')
  const [amount, setAmount] = useState(5000000)
  const [months, setMonths] = useState(36)
  const [income, setIncome] = useState(450000)
  const [readyItems, setReadyItems] = useState<Record<ReadinessKey, boolean>>({
    history: false,
    identity: true,
    income: false,
    property: false,
  })
  const moneyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'KZT',
      }),
    [locale],
  )
  const percentFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        maximumFractionDigits: 0,
        style: 'percent',
      }),
    [locale],
  )
  const products = t('tools.products', { returnObjects: true }) as Array<
    Omit<ProductInfo, 'rate'>
  >
  const readinessItems = t('tools.readiness.items', {
    returnObjects: true,
  }) as ReadinessItem[]
  const product = products.find((item) => item.key === productKey) ?? products[0]
  const rate = productRates[productKey]
  const monthlyPayment = Math.round(calculateMonthlyPayment(amount, rate, months))
  const burden = income > 0 ? monthlyPayment / income : 0
  const readyCount = readinessItems.filter((item) => readyItems[item.key]).length
  const readyProgress =
    readinessItems.length > 0 ? readyCount / readinessItems.length : 0
  const statusKey =
    income <= 0 ? 'unknown' : burden <= 0.35 ? 'good' : burden <= 0.5 ? 'caution' : 'risk'
  const statusClasses =
    statusKey === 'good'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
      : statusKey === 'caution'
        ? 'border-amber-200 bg-amber-50 text-amber-800'
        : 'border-red-200 bg-red-50 text-red-800'
  const whatsappMessage = t('tools.whatsappTemplate')
    .replaceAll('{product}', product.label)
    .replaceAll('{amount}', moneyFormatter.format(amount))
    .replaceAll('{months}', String(months))
    .replaceAll('{payment}', moneyFormatter.format(monthlyPayment))
    .replaceAll('{income}', moneyFormatter.format(income))
    .replaceAll('{burden}', percentFormatter.format(burden))
    .replaceAll('{ready}', `${readyCount}/${readinessItems.length}`)
  const whatsappUrl = `https://wa.me/${whatsappHref}?text=${encodeURIComponent(
    whatsappMessage,
  )}`

  return (
    <section className="bg-surface py-20 sm:py-24" id="tools">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            align="center"
            description={t('tools.description')}
            eyebrow={t('tools.eyebrow')}
            title={t('tools.title')}
          />
        </SectionReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <SectionReveal>
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
              <div className="border-b border-border bg-background/70 px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                      {t('tools.calculator.eyebrow')}
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-primary">
                      {t('tools.calculator.title')}
                    </h2>
                  </div>
                  <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border bg-white px-3 text-sm font-bold text-primary">
                    <Calculator aria-hidden="true" className="size-4 text-accent" />
                    {t('tools.calculator.note')}
                  </span>
                </div>
              </div>

              <div className="grid gap-6 p-5 sm:p-6">
                <div>
                  <p className="text-sm font-bold text-primary">
                    {t('tools.calculator.productLabel')}
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {products.map((item) => {
                      const isActive = item.key === productKey

                      return (
                        <button
                          className={`min-h-16 rounded-xl border px-4 text-left transition ${
                            isActive
                              ? 'border-accent bg-accent-soft text-primary shadow-sm'
                              : 'border-border bg-white text-muted hover:border-accent/60 hover:text-primary'
                          }`}
                          key={item.key}
                          onClick={() => setProductKey(item.key)}
                          type="button"
                        >
                          <span className="block text-sm font-black">{item.label}</span>
                          <span className="mt-1 block text-xs font-semibold leading-5">
                            {item.helper}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <label className="block">
                    <span className="text-sm font-bold text-primary">
                      {t('tools.calculator.amount')}
                    </span>
                    <input
                      className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-primary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
                      inputMode="numeric"
                      max={50000000}
                      min={1000000}
                      onChange={(event) =>
                        setAmount(
                          clampNumber(Number(event.target.value), 1000000, 50000000),
                        )
                      }
                      step={500000}
                      type="number"
                      value={amount}
                    />
                    <input
                      aria-label={t('tools.calculator.amount')}
                      className="mt-3 w-full accent-accent"
                      max={50000000}
                      min={1000000}
                      onChange={(event) => setAmount(Number(event.target.value))}
                      step={500000}
                      type="range"
                      value={amount}
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold text-primary">
                      {t('tools.calculator.months')}
                    </span>
                    <input
                      className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-primary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
                      inputMode="numeric"
                      max={84}
                      min={6}
                      onChange={(event) =>
                        setMonths(clampNumber(Number(event.target.value), 6, 84))
                      }
                      step={6}
                      type="number"
                      value={months}
                    />
                    <input
                      aria-label={t('tools.calculator.months')}
                      className="mt-3 w-full accent-accent"
                      max={84}
                      min={6}
                      onChange={(event) => setMonths(Number(event.target.value))}
                      step={6}
                      type="range"
                      value={months}
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold text-primary">
                      {t('tools.calculator.income')}
                    </span>
                    <input
                      className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-primary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
                      inputMode="numeric"
                      min={0}
                      onChange={(event) =>
                        setIncome(Math.max(Number(event.target.value), 0))
                      }
                      step={50000}
                      type="number"
                      value={income}
                    />
                    <p className="mt-3 text-xs font-semibold leading-5 text-muted">
                      {t('tools.calculator.incomeHint')}
                    </p>
                  </label>
                </div>

                <div className="grid gap-3 rounded-2xl border border-border bg-background/70 p-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                      {t('tools.result.payment')}
                    </p>
                    <p className="mt-2 text-2xl font-black text-primary">
                      {moneyFormatter.format(monthlyPayment)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                      {t('tools.result.rate')}
                    </p>
                    <p className="mt-2 text-2xl font-black text-primary">
                      {percentFormatter.format(rate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                      {t('tools.result.burden')}
                    </p>
                    <p className="mt-2 text-2xl font-black text-primary">
                      {income > 0 ? percentFormatter.format(burden) : '-'}
                    </p>
                  </div>
                </div>

                <div className={`rounded-2xl border p-4 ${statusClasses}`}>
                  <div className="flex items-start gap-3">
                    {statusKey === 'good' ? (
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5" />
                    ) : (
                      <AlertTriangle aria-hidden="true" className="mt-0.5 size-5" />
                    )}
                    <div>
                      <p className="font-black">{t(`tools.status.${statusKey}.title`)}</p>
                      <p className="mt-1 text-sm font-semibold leading-6">
                        {t(`tools.status.${statusKey}.text`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="grid gap-5">
              <div className="rounded-2xl border border-border bg-white p-5 shadow-soft sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-primary ring-1 ring-accent/20">
                    <ClipboardCheck aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-primary">
                      {t('tools.readiness.title')}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {t('tools.readiness.description')}
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-2 rounded-full bg-border">
                  <motion.div
                    animate={{ width: `${readyProgress * 100}%` }}
                    className="h-full rounded-full bg-accent"
                    initial={false}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                </div>
                <p className="mt-2 text-sm font-bold text-primary">
                  {readyCount}/{readinessItems.length} {t('tools.readiness.ready')}
                </p>

                <div className="mt-5 grid gap-3">
                  {readinessItems.map((item) => (
                    <label
                      className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-border bg-background/70 px-4 text-sm font-bold text-primary transition hover:border-accent/60"
                      key={item.key}
                    >
                      <input
                        checked={readyItems[item.key]}
                        className="size-4 accent-accent"
                        onChange={(event) =>
                          setReadyItems((currentItems) => ({
                            ...currentItems,
                            [item.key]: event.target.checked,
                          }))
                        }
                        type="checkbox"
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-primary p-5 text-white shadow-[0_24px_80px_rgb(6_40_26_/_0.18)] sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                    <SlidersHorizontal aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-xl font-black">{t('tools.next.title')}</h2>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      {t('tools.next.description')}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  <a
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-black text-primary transition hover:-translate-y-0.5 hover:bg-[#16a34a]"
                    href={whatsappUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <MessageCircle aria-hidden="true" className="size-4" />
                    {t('tools.next.whatsapp')}
                  </a>
                  <Link
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/10 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                    to="/chat"
                  >
                    {t('tools.next.chat')}
                    <Send aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
