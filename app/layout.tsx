import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/app/context/LangContext'
import ConsoleEgg from '@/app/components/ConsoleEgg'

export const metadata: Metadata = {
  title: 'David Litescu — Software Developer',
  description: 'Full-stack developer building SaaS products, bots, and mobile apps. Transparent about AI-assisted development.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <LangProvider>
          <ConsoleEgg />
          {children}
        </LangProvider>
      </body>
    </html>
  )
}
