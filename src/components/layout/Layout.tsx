import type { PropsWithChildren } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
