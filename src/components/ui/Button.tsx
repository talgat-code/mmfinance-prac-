import type { AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-primary shadow-sm hover:opacity-90',
  secondary:
    'border border-primary/15 bg-surface text-primary hover:border-accent hover:text-primary',
}

export function Button({
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
