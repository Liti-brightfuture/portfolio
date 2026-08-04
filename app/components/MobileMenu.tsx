'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '@/app/context/LangContext'
import type { SectionId } from '@/app/data/nav'

interface MobileMenuProps {
  sections: readonly SectionId[]
  active: SectionId | null
  onNavigate: (id: SectionId) => void
}

// Portalling to <body> needs `document` to exist, which is only true on the client.
// useSyncExternalStore reports `false` for the SSR pass and the first client render
// (so they match, no hydration mismatch), then flips to `true` right after — the
// React-recommended way to gate client-only rendering without setState-in-effect.
const subscribeNever = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export default function MobileMenu({ sections, active, onNavigate }: MobileMenuProps) {
  const { t, lang, toggle } = useLang()
  const [open, setOpen] = useState(false)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const mounted = useSyncExternalStore(subscribeNever, getClientSnapshot, getServerSnapshot)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotion()

  const openMenu = () => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    setOpen(true)
  }

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    if (!open) return

    const triggerButton = buttonRef.current
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()

    // iOS Safari ignores `overflow: hidden` on body for touch-driven scroll/rubber-band —
    // the page behind the overlay still drags underneath it. Swallow touchmove everywhere
    // except inside the panel's own scroll container, so a short-viewport phone (landscape,
    // long Romanian labels) can still scroll the menu itself if it ever overflows.
    const preventBackgroundScroll = (event: TouchEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('[data-menu-scroll]')) return
      event.preventDefault()
    }
    document.addEventListener('touchmove', preventBackgroundScroll, { passive: false })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll<HTMLElement>('button, a[href]')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('touchmove', preventBackgroundScroll)
      document.removeEventListener('keydown', onKeyDown)
      triggerButton?.focus()
    }
  }, [open])

  const go = (id: SectionId) => {
    closeMenu()
    onNavigate(id)
  }

  const maxRadius =
    typeof window !== 'undefined' ? Math.ceil(Math.hypot(window.innerWidth, window.innerHeight)) : 2000

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={open ? closeMenu : openMenu}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
        className="relative z-20 inline-flex h-9 w-9 items-center justify-center rounded-full md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/20"
      >
        <span className="relative flex h-[13px] w-[19px] flex-col justify-between">
          <span
            className={`h-[1.5px] w-full origin-center rounded-full bg-neutral-900 transition-transform duration-300 ease-out dark:bg-neutral-100 ${
              open ? 'translate-y-[5.75px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-[1.5px] w-full origin-center rounded-full bg-neutral-900 transition-transform duration-300 ease-out dark:bg-neutral-100 ${
              open ? '-translate-y-[5.75px] -rotate-45' : ''
            }`}
          />
        </span>
      </button>

      {mounted &&
        createPortal(
          <div suppressHydrationWarning
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menuLabel}
        aria-hidden={!open}
        inert={!open}
        className="fixed inset-0 z-40 md:hidden"
        style={{
          clipPath: `circle(${open ? maxRadius : 0}px at ${origin.x}px ${origin.y}px)`,
          transition: `clip-path ${open ? '620ms' : '420ms'} cubic-bezier(0.65, 0, 0.35, 1)`,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div suppressHydrationWarning className="relative h-full w-full bg-[#fafaf8] dark:bg-[#111110]">
          <div suppressHydrationWarning
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-25"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(26,26,24,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,24,0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div
            suppressHydrationWarning
            className="relative flex h-full flex-col px-6 pt-24"
            style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom))' }}
          >
            <nav className="flex-1">
              <motion.ul suppressHydrationWarning
                initial={false}
                animate={open && !reduceMotion ? 'open' : 'closed'}
                variants={{
                  open: { transition: { staggerChildren: 0.06, delayChildren: 0.16 } },
                  closed: {},
                }}
              >
                {sections.map((id, i) => {
                  const isActive = active === id
                  return (
                    <motion.li suppressHydrationWarning
                      key={id}
                      variants={{
                        open: { opacity: 1, y: 0 },
                        closed: { opacity: 0, y: 14 },
                      }}
                      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                      transition={{ duration: 0.38, ease: 'easeOut' }}
                    >
                      <button
                        ref={i === 0 ? firstLinkRef : undefined}
                        type="button"
                        onClick={() => go(id)}
                        className="group flex w-full items-baseline gap-4 py-2.5 text-left focus-visible:outline-none"
                      >
                        <span
                          className={`font-serif text-[13px] tabular-nums ${
                            isActive ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-500 dark:text-neutral-400'
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={`font-serif text-[clamp(28px,9vw,42px)] leading-tight tracking-[-0.02em] transition-colors ${
                            isActive
                              ? 'text-neutral-900 dark:text-neutral-100'
                              : 'text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100'
                          }`}
                        >
                          {t.nav[id]}
                        </span>
                        {isActive && (
                          <motion.span suppressHydrationWarning
                            layoutId="mobile-nav-active-dot"
                            className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900 dark:bg-neutral-100"
                          />
                        )}
                      </button>
                    </motion.li>
                  )
                })}
              </motion.ul>
            </nav>

            <div suppressHydrationWarning className="flex items-center justify-between border-t border-black/10 pt-6 text-[12px] text-neutral-500 dark:border-white/10">
              <button
                type="button"
                onClick={toggle}
                className="rounded-full border border-black/20 px-3 py-1.5 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:border-white/20 dark:hover:text-neutral-100 dark:focus-visible:ring-white/20"
              >
                {lang === 'en' ? 'RO' : 'EN'}
              </button>
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  {!reduceMotion && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                {t.hero.available}
              </span>
            </div>
          </div>
        </div>
          </div>,
          document.body
        )}
    </>
  )
}
