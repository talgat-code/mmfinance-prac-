import type { PropsWithChildren } from 'react'
import { Footer } from './Footer'
import { FloatingContactDock } from './FloatingContactDock'
import { Header } from './Header'
import { SmoothCursor } from '../ui/SmoothCursor'

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background">
      <SmoothCursor />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingContactDock />
    </div>
  )
}
