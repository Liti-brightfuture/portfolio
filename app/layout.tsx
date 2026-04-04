import type { Metadata } from 'next'
import Script from 'next/script'
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
        <Script id="bis-skin-cleanup" strategy="beforeInteractive">
          {`
            (() => {
              const attributeName = 'bis_skin_checked'

              const stripAttribute = (root) => {
                if (!root || typeof root.querySelectorAll !== 'function') return

                if (root.nodeType === Node.ELEMENT_NODE && root.hasAttribute?.(attributeName)) {
                  root.removeAttribute(attributeName)
                }

                root.querySelectorAll?.('[' + attributeName + ']').forEach((element) => {
                  element.removeAttribute(attributeName)
                })
              }

              stripAttribute(document.documentElement)

              const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                  if (mutation.type === 'attributes' && mutation.attributeName === attributeName) {
                    mutation.target.removeAttribute(attributeName)
                    continue
                  }

                  mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                      stripAttribute(node)
                    }
                  })
                }
              })

              observer.observe(document.documentElement, {
                subtree: true,
                childList: true,
                attributes: true,
                attributeFilter: [attributeName],
              })

              const stopObserver = () => observer.disconnect()
              window.addEventListener('load', stopObserver, { once: true })
              window.setTimeout(stopObserver, 4000)
            })()
          `}
        </Script>
        <LangProvider>
          <ConsoleEgg />
          {children}
        </LangProvider>
      </body>
    </html>
  )
}
