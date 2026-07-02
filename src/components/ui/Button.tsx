import type { AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'dark'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-primary shadow-[0_18px_45px_rgb(212_175_55_/_0.28)] hover:-translate-y-0.5 hover:bg-[#c9a12f]',
  secondary:
    'border border-primary/15 bg-surface text-primary hover:-translate-y-0.5 hover:border-accent hover:text-primary hover:shadow-soft',
  dark: 'bg-primary text-white shadow-soft hover:-translate-y-0.5 hover:bg-primary-soft',
}

export function Button({
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
