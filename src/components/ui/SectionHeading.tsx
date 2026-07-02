type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  align = 'left',
  className = '',
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  const alignment =
    align === 'center'
      ? 'mx-auto items-center text-center'
      : 'items-start text-left'

  return (
    <div className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
      <span className="h-1 w-12 rounded-full bg-accent" />
      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold leading-tight text-primary sm:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
        {description}
      </p>
    </div>
  )
}
