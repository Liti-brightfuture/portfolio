'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '@/app/context/LangContext'

const sections = ['about', 'build', 'projects', 'skills', 'contact'] as const

export default function Nav() {
  const { t, lang, toggle } = useLang()
  const [active, setActive] = useState<(typeof sections)[number] | null>(null)
  const reduceMotion = useReducedMotion()
  const manualTargetRef = useRef<(typeof sections)[number] | null>(null)
  const manualTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const updateActiveSection = () => {
      const bottomThreshold = 8
      const reachedBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - bottomThreshold

      if (reachedBottom) {
        if (!manualTargetRef.current || manualTargetRef.current === 'contact') {
          setActive('contact')
        }
        return
      }

      const marker = window.innerHeight * 0.28
      let current: (typeof sections)[number] | null = null

      for (const id of sections) {
        const element = document.getElementById(id)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top - marker <= 0) {
          current = id
        }
      }

      if (!manualTargetRef.current || manualTargetRef.current === current) {
        setActive(current)
      }
    }

    const handleScroll = () => {
      window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (manualTimeoutRef.current) {
        window.clearTimeout(manualTimeoutRef.current)
      }
    }
  }, [])

  const scrollTo = (id: (typeof sections)[number]) => {
    const element = document.getElementById(id)
    if (!element) return

    const navOffset = 84
    const targetTop = element.getBoundingClientRect().top + window.scrollY - navOffset

    if (manualTimeoutRef.current) {
      window.clearTimeout(manualTimeoutRef.current)
    }

    manualTargetRef.current = id
    setActive(id)

    window.scrollTo({
      top: targetTop,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })

    manualTimeoutRef.current = window.setTimeout(() => {
      manualTargetRef.current = null
    }, reduceMotion ? 120 : 700)
  }

  const scrollToTop = () => {
    if (manualTimeoutRef.current) {
      window.clearTimeout(manualTimeoutRef.current)
    }

    manualTargetRef.current = null
    setActive(null)

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#fafaf8]/92 backdrop-blur-md dark:border-white/10 dark:bg-[#111110]/92">
      <div className="relative max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center justify-start">
          <button
            onClick={scrollToTop}
            className={`relative inline-flex items-center justify-center rounded-full px-3 py-2 font-serif text-lg tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/20 ${
              active === null
                ? 'text-neutral-900 dark:text-neutral-100'
                : 'hover:opacity-70'
            }`}
            aria-label="Scroll to top"
          >
            {active === null && (
              <motion.span
                layoutId="nav-active-home"
                transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-black/[0.045] ring-1 ring-black/10 dark:bg-white/[0.07] dark:ring-white/10"
              />
            )}
            <span className="relative">DL</span>
          </button>
        </div>

        <div className="hidden md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:flex md:items-center md:justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-2 text-[13px] text-neutral-500 dark:text-neutral-400">
            {sections.map((key) => {
              const isActive = active === key

              return (
                <li key={key}>
                  <button
                    onClick={() => scrollTo(key)}
                    className={`relative rounded-full px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/20 ${
                      isActive ? 'text-neutral-900 dark:text-neutral-100' : 'hover:text-neutral-900 dark:hover:text-neutral-100'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-black/[0.045] dark:bg-white/[0.07]"
                      />
                    )}
                    <span className="relative">{t.nav[key]}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-line"
                        transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
                        className="absolute bottom-1 left-3 right-3 h-px bg-neutral-900 dark:bg-neutral-100"
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex items-center justify-end">
          <button
            onClick={toggle}
            className="text-[12px] px-3 py-1 border border-black/20 dark:border-white/20 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/20"
          >
            {lang === 'en' ? 'RO' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  )
}
