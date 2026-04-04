'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '@/app/context/LangContext'

export default function Hero() {
  const { t } = useLang()
  const reduceMotion = useReducedMotion()

  return (
    <section suppressHydrationWarning className="border-b border-black/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <div className="flex items-end gap-10 md:gap-16">

          {/* Text */}
          <div className="flex-1 min-w-0">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="text-[11px] tracking-[0.12em] uppercase text-neutral-500 mb-6"
            >
              {t.hero.label}
            </motion.p>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: 'easeOut', delay: reduceMotion ? 0 : 0.05 }}
              className="font-serif text-[64px] md:text-[88px] leading-[0.95] tracking-[-0.03em] mb-6"
            >
              David<br />
              <em className="text-neutral-400 not-italic font-serif">Litescu</em>
            </motion.h1>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.34, ease: 'easeOut', delay: reduceMotion ? 0 : 0.12 }}
              className="text-[16px] text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[480px] mb-8 font-light"
            >
              {t.hero.desc}
            </motion.p>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.24 }}
              className="flex flex-wrap gap-6 text-[12px] text-neutral-500"
            >
              <span className="flex items-center gap-2">
                <span className="relative flex w-2 h-2">
                  {!reduceMotion && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  )}
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
                </span>
                {t.hero.available}
              </span>
              <span>{t.hero.years}</span>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: reduceMotion ? 0 : 0.15 }}
            className="hidden md:block shrink-0 w-[220px] xl:w-[260px]"
          >
            <div className="relative w-full aspect-[2/3] rounded-[6px] overflow-hidden">
              <Image
                src="/david.jpg"
                alt="David Litescu"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1280px) 220px, 260px"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
