import { AnimatePresence, motion } from 'framer-motion'
import type { ChangeEvent, FocusEvent, FormEvent } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  MessageCircle,
  PhoneCall,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
  WalletCards,
} from 'lucide-react'

type MessageRole = 'manager' | 'client'

type ChatMessage = {
  id: string
  role: MessageRole
  text: string
  time: string
}

type QuickReply = {
  label: string
  message: string
  response: string
}

type SmartReply = {
  keywords: string[]
  response: string
}

type ChatStep = {
  title: string
  text: string
}

type LeadFormValues = {
  name: string
  phone: string
}

type LeadFormTouched = Record<keyof LeadFormValues, boolean>

const actionCards = [
  { icon: WalletCards, key: 'programs' },
  { icon: FileCheck2, key: 'documents' },
  { icon: ShieldCheck, key: 'decision' },
] as const

const phonePattern = /^[\d+()\s-]+$/

const initialLeadFormValues: LeadFormValues = {
  name: '',
  phone: '',
}

const initialLeadFormTouched: LeadFormTouched = {
  name: false,
  phone: false,
}

const createMessageId = (role: MessageRole) =>
  `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`

export function ManagerChat() {
  const { i18n, t } = useTranslation()
  const locale = i18n.resolvedLanguage === 'kk' ? 'kk-KZ' : 'ru-RU'
  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
      }),
    [locale],
  )
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isTouched, setIsTouched] = useState(false)
  const [leadValues, setLeadValues] = useState<LeadFormValues>(initialLeadFormValues)
  const [leadTouched, setLeadTouched] =
    useState<LeadFormTouched>(initialLeadFormTouched)
  const [isLeadSuccessVisible, setIsLeadSuccessVisible] = useState(false)
  const messageInputRef = useRef<HTMLInputElement>(null)
  const endOfChatRef = useRef<HTMLDivElement>(null)
  const typingTimerRef = useRef<number | undefined>(undefined)
  const quickReplies = t('chat.quickReplies', {
    returnObjects: true,
  }) as QuickReply[]
  const smartReplies = t('chat.smartReplies', {
    returnObjects: true,
  }) as SmartReply[]
  const steps = t('chat.steps.items', { returnObjects: true }) as ChatStep[]
  const documents = t('chat.documents.items', {
    returnObjects: true,
  }) as string[]
  const phoneHref = t('contacts.phoneHref')
  const whatsappHref = t('contacts.whatsappHref')
  const whatsappUrl = `https://wa.me/${whatsappHref}?text=${encodeURIComponent(
    t('chat.whatsappTemplate'),
  )}`
  const trimmedLeadName = leadValues.name.trim()
  const trimmedLeadPhone = leadValues.phone.trim()
  const isLeadPhoneValid =
    trimmedLeadPhone.length > 0 && phonePattern.test(trimmedLeadPhone)
  const isLeadFormValid = trimmedLeadName.length > 0 && isLeadPhoneValid
  const leadNameError =
    leadTouched.name && trimmedLeadName.length === 0
      ? t('chat.leadForm.nameRequired')
      : ''
  const leadPhoneError =
    leadTouched.phone && trimmedLeadPhone.length === 0
      ? t('chat.leadForm.phoneRequired')
      : leadTouched.phone && trimmedLeadPhone.length > 0 && !isLeadPhoneValid
        ? t('chat.leadForm.phoneInvalid')
        : ''

  const createInitialMessages = useCallback(() => {
    const initialMessages = t('chat.initialMessages', {
      returnObjects: true,
    }) as string[]

    return initialMessages.map((text, index) => ({
      id: `manager-initial-${locale}-${index}`,
      role: 'manager' as const,
      text,
      time: timeFormatter.format(new Date()),
    }))
  }, [locale, t, timeFormatter])

  useEffect(() => {
    setMessages(createInitialMessages())
    setIsTyping(false)
    setInputValue('')
    setIsTouched(false)
  }, [createInitialMessages])

  useEffect(
    () => () => {
      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current)
      }
    },
    [],
  )

  useEffect(() => {
    if (!isLeadSuccessVisible) {
      return undefined
    }

    const timer = window.setTimeout(() => setIsLeadSuccessVisible(false), 3500)

    return () => window.clearTimeout(timer)
  }, [isLeadSuccessVisible])

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [isTyping, messages])

  const buildTranscript = useCallback(() => {
    if (messages.length === 0) {
      return t('chat.emptyTranscript')
    }

    return messages
      .map((message) => {
        const author =
          message.role === 'client' ? t('chat.clientLabel') : t('chat.managerLabel')

        return `${author}: ${message.text}`
      })
      .join('\n')
  }, [messages, t])

  const transcriptWhatsappUrl = `https://wa.me/${whatsappHref}?text=${encodeURIComponent(
    t('chat.whatsappTranscriptTemplate').replaceAll(
      '{transcript}',
      buildTranscript(),
    ),
  )}`

  const findManagerReply = (message: string) => {
    const normalizedMessage = message.toLowerCase()
    const matchedReply = smartReplies.find(({ keywords }) =>
      keywords.some((keyword) => normalizedMessage.includes(keyword.toLowerCase())),
    )

    return matchedReply?.response ?? t('chat.fallbackReply')
  }

  const focusMessageInput = () => {
    window.setTimeout(() => messageInputRef.current?.focus(), 0)
  }

  const sendMessage = (message: string, preparedResponse?: string) => {
    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
      setIsTouched(true)
      focusMessageInput()

      return
    }

    if (typingTimerRef.current) {
      window.clearTimeout(typingTimerRef.current)
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: createMessageId('client'),
        role: 'client',
        text: trimmedMessage,
        time: timeFormatter.format(new Date()),
      },
    ])
    setInputValue('')
    setIsTouched(false)
    setIsTyping(true)

    const managerResponse = preparedResponse ?? findManagerReply(trimmedMessage)

    typingTimerRef.current = window.setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createMessageId('manager'),
          role: 'manager',
          text: managerResponse,
          time: timeFormatter.format(new Date()),
        },
      ])
      setIsTyping(false)
      focusMessageInput()
    }, 850)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendMessage(inputValue)
  }

  const resetChat = () => {
    if (typingTimerRef.current) {
      window.clearTimeout(typingTimerRef.current)
    }

    setMessages(createInitialMessages())
    setInputValue('')
    setIsTouched(false)
    setIsTyping(false)
    focusMessageInput()
  }

  const handleLeadChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof LeadFormValues

    setLeadValues((currentValues) => ({
      ...currentValues,
      [field]: event.target.value,
    }))
    setIsLeadSuccessVisible(false)
  }

  const handleLeadBlur = (event: FocusEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof LeadFormValues

    setLeadTouched((currentTouched) => ({
      ...currentTouched,
      [field]: true,
    }))
  }

  const handleLeadSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isLeadFormValid) {
      setLeadTouched({ name: true, phone: true })

      return
    }

    const message = t('chat.leadForm.whatsappTemplate')
      .replaceAll('{name}', trimmedLeadName)
      .replaceAll('{phone}', trimmedLeadPhone)
      .replaceAll('{transcript}', buildTranscript())
    const url = `https://wa.me/${whatsappHref}?text=${encodeURIComponent(message)}`

    window.open(url, '_blank', 'noopener,noreferrer')
    setIsLeadSuccessVisible(true)
  }

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,_#ffffff_0%,_#f8fafc_48%,_#edf2f7_100%)] py-14 sm:py-20">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,_rgb(7_20_38_/_0.04)_1px,_transparent_1px),linear-gradient(180deg,_rgb(7_20_38_/_0.035)_1px,_transparent_1px)] bg-[size:44px_44px]" />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.58fr] lg:px-8">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="min-w-0"
          initial={{ opacity: 0, y: 22 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="mb-7 max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft/90 px-4 py-2 text-sm font-bold text-primary shadow-sm">
              <Sparkles aria-hidden="true" className="size-4" />
              {t('chat.eyebrow')}
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight text-primary sm:text-5xl">
              {t('chat.title')}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              {t('chat.description')}
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] bg-primary text-white shadow-[0_34px_110px_rgb(7_20_38_/_0.24)] ring-1 ring-primary/10">
            <div className="flex flex-col gap-4 border-b border-white/10 bg-white/8 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary shadow-[0_16px_45px_rgb(212_175_55_/_0.22)]">
                  <UserRound aria-hidden="true" className="size-7" />
                  <span className="absolute -right-1 -top-1 size-4 rounded-full border-2 border-primary bg-emerald-400" />
                </div>
                <div>
                  <p className="text-lg font-black leading-6 text-white">
                    {t('chat.managerName')}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-white/68">
                    {t('chat.managerRole')}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:items-end">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-emerald-300/25 bg-emerald-400/12 px-3 text-xs font-bold text-emerald-100">
                    <span className="size-2 rounded-full bg-emerald-300" />
                    {t('chat.onlineStatus')}
                  </span>
                  <span className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 text-xs font-bold text-white/72">
                    <Clock3 aria-hidden="true" className="size-4 text-accent" />
                    {t('chat.responseTime')}
                  </span>
                </div>
                <div className="grid w-full gap-2 sm:w-auto sm:grid-cols-2">
                  <a
                    aria-label={t('contacts.whatsappAriaLabel')}
                    className="inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-accent px-3 text-xs font-black text-primary transition hover:-translate-y-0.5 hover:bg-[#c9a12f]"
                    href={whatsappUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <MessageCircle aria-hidden="true" className="size-4" />
                    {t('chat.actions.whatsapp')}
                  </a>
                  <a
                    aria-label={t('contacts.callLabel')}
                    className="inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/12 bg-white/10 px-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                    href={`tel:${phoneHref}`}
                  >
                    <PhoneCall aria-hidden="true" className="size-4" />
                    {t('chat.actions.call')}
                  </a>
                </div>
              </div>
            </div>

            <div className="h-[34rem] overflow-y-auto px-4 py-5 sm:px-6">
              <ul className="grid gap-4">
                <AnimatePresence initial={false}>
                  {messages.map((message) => {
                    const isClient = message.role === 'client'

                    return (
                      <motion.li
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${isClient ? 'justify-end' : 'justify-start'}`}
                        exit={{ opacity: 0, y: -8 }}
                        initial={{ opacity: 0, y: 12 }}
                        key={message.id}
                        transition={{ duration: 0.24, ease: 'easeOut' }}
                      >
                        {!isClient ? (
                          <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-primary">
                            <UserRound aria-hidden="true" className="size-5" />
                          </span>
                        ) : null}
                        <div
                          className={`max-w-[84%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[72%] ${
                            isClient
                              ? 'rounded-br-md bg-accent text-primary'
                              : 'rounded-bl-md border border-white/10 bg-white/10 text-white'
                          }`}
                        >
                          <span className="sr-only">
                            {isClient ? t('chat.clientLabel') : t('chat.managerLabel')}
                          </span>
                          <p className="text-sm font-semibold leading-6">{message.text}</p>
                          <time
                            className={`mt-2 block text-xs font-semibold ${
                              isClient ? 'text-primary/58' : 'text-white/45'
                            }`}
                          >
                            {message.time}
                          </time>
                        </div>
                      </motion.li>
                    )
                  })}

                  {isTyping ? (
                    <motion.li
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3"
                      exit={{ opacity: 0, y: -8 }}
                      initial={{ opacity: 0, y: 12 }}
                      key="typing"
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-primary">
                        <UserRound aria-hidden="true" className="size-5" />
                      </span>
                      <div className="rounded-2xl rounded-bl-md border border-white/10 bg-white/10 px-4 py-3">
                        <span className="sr-only">{t('chat.typing')}</span>
                        <span className="flex h-6 items-center gap-1.5">
                          {[0, 1, 2].map((dot) => (
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4], y: [0, -4, 0] }}
                              className="size-2 rounded-full bg-accent"
                              key={dot}
                              transition={{
                                delay: dot * 0.12,
                                duration: 0.72,
                                repeat: Infinity,
                              }}
                            />
                          ))}
                        </span>
                      </div>
                    </motion.li>
                  ) : null}
                </AnimatePresence>
              </ul>
              <div ref={endOfChatRef} />
            </div>

            <div className="border-t border-white/10 bg-white/8 p-4 sm:p-6">
              <div className="mb-4 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    className="min-h-10 rounded-xl border border-white/12 bg-white/10 px-3 text-sm font-bold text-white/78 transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
                    disabled={isTyping}
                    key={reply.label}
                    onClick={() => sendMessage(reply.message, reply.response)}
                    type="button"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>

              <div className="mb-4 grid gap-2 sm:grid-cols-2">
                <a
                  aria-label={t('chat.actions.sendTranscriptAriaLabel')}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/10 px-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                  href={transcriptWhatsappUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  {t('chat.actions.sendTranscript')}
                </a>
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/10 px-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                  onClick={resetChat}
                  type="button"
                >
                  <RotateCcw aria-hidden="true" className="size-4" />
                  {t('chat.actions.restart')}
                </button>
              </div>

              <form className="grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
                <div>
                  <label className="sr-only" htmlFor="manager-chat-message">
                    {t('chat.inputLabel')}
                  </label>
                  <input
                    aria-describedby={
                      isTouched && !inputValue.trim() ? 'manager-chat-error' : undefined
                    }
                    aria-invalid={isTouched && !inputValue.trim()}
                    autoComplete="off"
                    className="min-h-12 w-full rounded-xl border border-white/12 bg-white px-4 text-primary outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/20"
                    disabled={isTyping}
                    id="manager-chat-message"
                    onBlur={() => setIsTouched(true)}
                    onChange={(event) => setInputValue(event.target.value)}
                    placeholder={t('chat.inputPlaceholder')}
                    ref={messageInputRef}
                    type="text"
                    value={inputValue}
                  />
                  {isTouched && !inputValue.trim() ? (
                    <p
                      className="mt-2 text-sm font-semibold text-accent"
                      id="manager-chat-error"
                    >
                      {t('chat.emptyError')}
                    </p>
                  ) : null}
                </div>
                <button
                  aria-label={t('chat.sendAriaLabel')}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-black text-primary shadow-[0_18px_45px_rgb(212_175_55_/_0.28)] transition hover:-translate-y-0.5 hover:bg-[#c9a12f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:bg-border disabled:text-muted disabled:shadow-none disabled:hover:translate-y-0"
                  disabled={isTyping}
                  type="submit"
                >
                  {t('chat.send')}
                  <Send aria-hidden="true" className="size-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="grid content-start gap-5"
          initial={{ opacity: 0, x: 28 }}
          transition={{ delay: 0.12, duration: 0.55, ease: 'easeOut' }}
        >
          <div className="rounded-[1.5rem] border border-white/70 bg-surface/92 p-6 shadow-soft ring-1 ring-primary/5 backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
              {t('chat.sidePanel.eyebrow')}
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-primary">
              {t('chat.sidePanel.title')}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {t('chat.sidePanel.description')}
            </p>

            <div className="mt-6 grid gap-3">
              {actionCards.map(({ icon: Icon, key }) => (
                <div
                  className="flex gap-3 rounded-2xl border border-border bg-background/80 p-4"
                  key={key}
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-primary ring-1 ring-accent/20">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <p className="font-black text-primary">
                      {t(`chat.sidePanel.cards.${key}.title`)}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-muted">
                      {t(`chat.sidePanel.cards.${key}.text`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/70 bg-surface/92 p-6 shadow-soft ring-1 ring-primary/5 backdrop-blur">
            <h2 className="text-xl font-black text-primary">{t('chat.steps.title')}</h2>
            <ol className="mt-5 grid gap-4">
              {steps.map((step, index) => (
                <li className="flex gap-3" key={step.title}>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-black text-accent">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-black leading-6 text-primary">
                      {step.title}
                    </span>
                    <span className="mt-1 block text-sm leading-5 text-muted">
                      {step.text}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[1.5rem] border border-white/70 bg-surface/92 p-6 shadow-soft ring-1 ring-primary/5 backdrop-blur">
            <h2 className="text-xl font-black text-primary">
              {t('chat.documents.title')}
            </h2>
            <ul className="mt-5 grid gap-3">
              {documents.map((item) => (
                <li className="flex gap-3 text-sm font-semibold leading-6 text-muted" key={item}>
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-white/70 bg-surface/92 p-6 shadow-soft ring-1 ring-primary/5 backdrop-blur">
            <h2 className="text-xl font-black text-primary">
              {t('chat.leadForm.title')}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {t('chat.leadForm.description')}
            </p>

            <form className="mt-5 grid gap-4" noValidate onSubmit={handleLeadSubmit}>
              <div>
                <label
                  className="text-sm font-semibold text-primary"
                  htmlFor="chat-lead-name"
                >
                  {t('chat.leadForm.nameLabel')}
                </label>
                <input
                  aria-describedby={leadNameError ? 'chat-lead-name-error' : undefined}
                  aria-invalid={Boolean(leadNameError)}
                  autoComplete="name"
                  className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-primary outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/15"
                  id="chat-lead-name"
                  name="name"
                  onBlur={handleLeadBlur}
                  onChange={handleLeadChange}
                  placeholder={t('chat.leadForm.namePlaceholder')}
                  required
                  type="text"
                  value={leadValues.name}
                />
                {leadNameError ? (
                  <p
                    className="mt-2 text-sm font-semibold text-red-700"
                    id="chat-lead-name-error"
                  >
                    {leadNameError}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  className="text-sm font-semibold text-primary"
                  htmlFor="chat-lead-phone"
                >
                  {t('chat.leadForm.phoneLabel')}
                </label>
                <input
                  aria-describedby={leadPhoneError ? 'chat-lead-phone-error' : undefined}
                  aria-invalid={Boolean(leadPhoneError)}
                  autoComplete="tel"
                  className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-primary outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/15"
                  id="chat-lead-phone"
                  inputMode="tel"
                  name="phone"
                  onBlur={handleLeadBlur}
                  onChange={handleLeadChange}
                  placeholder={t('chat.leadForm.phonePlaceholder')}
                  required
                  type="tel"
                  value={leadValues.phone}
                />
                {leadPhoneError ? (
                  <p
                    className="mt-2 text-sm font-semibold text-red-700"
                    id="chat-lead-phone-error"
                  >
                    {leadPhoneError}
                  </p>
                ) : null}
              </div>

              <button
                aria-label={t('chat.leadForm.submitAriaLabel')}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-black text-primary shadow-[0_18px_45px_rgb(212_175_55_/_0.28)] transition hover:-translate-y-0.5 hover:bg-[#c9a12f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:bg-border disabled:text-muted disabled:shadow-none disabled:hover:translate-y-0"
                disabled={!isLeadFormValid}
                type="submit"
              >
                {t('chat.leadForm.submit')}
                <Send aria-hidden="true" className="size-4" />
              </button>

              {isLeadSuccessVisible ? (
                <p
                  aria-live="polite"
                  className="flex items-center gap-2 text-sm font-semibold text-emerald-700"
                >
                  <CheckCircle2 aria-hidden="true" className="size-4" />
                  {t('chat.leadForm.success')}
                </p>
              ) : null}

              <p className="text-xs leading-5 text-muted">
                {t('chat.leadForm.note')}
              </p>
            </form>
          </div>

          <div className="grid gap-3 rounded-[1.5rem] bg-primary p-5 text-white shadow-[0_24px_80px_rgb(7_20_38_/_0.18)]">
            <a
              aria-label={t('contacts.whatsappAriaLabel')}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-black text-primary transition hover:-translate-y-0.5 hover:bg-[#c9a12f]"
              href={whatsappUrl}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              {t('chat.actions.whatsapp')}
            </a>
            <a
              aria-label={t('contacts.callLabel')}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/10 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
              href={`tel:${phoneHref}`}
            >
              <PhoneCall aria-hidden="true" className="size-4" />
              {t('chat.actions.call')}
            </a>
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/10 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
              to={{ pathname: '/', hash: '#contacts' }}
            >
              {t('chat.actions.request')}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
