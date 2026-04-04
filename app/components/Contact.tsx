'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '@/app/context/LangContext'

export default function Contact() {
  const { t } = useLang()
  const reduceMotion = useReducedMotion()

  return (
    <section id="contact" className="border-b border-black/10 dark:border-white/10">
      <motion.div
        className="max-w-5xl mx-auto px-6 py-16"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <p className="text-[11px] tracking-[0.12em] uppercase text-neutral-400 mb-4">
          {t.contact.label}
        </p>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] md:items-start">
          <div className="max-w-2xl">
            <h2 className="font-serif text-[34px] md:text-[42px] leading-[1.05] tracking-[-0.03em] text-neutral-900 dark:text-neutral-100">
              {t.contact.heading}
            </h2>
            <p className="mt-4 max-w-xl text-[14px] leading-[1.8] text-neutral-600 dark:text-neutral-400 font-light">
              {t.contact.confidence}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="mailto:litescudud@gmail.com"
                className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:ring-white/20"
              >
                {t.contact.emailMe}
              </a>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 rounded-lg border border-black/20 px-5 py-2.5 text-[13px] font-medium transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:border-white/20 dark:hover:bg-neutral-800 dark:focus-visible:ring-white/20"
              >
                {t.contact.downloadCV} &rarr;
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white/85 p-4 dark:border-white/10 dark:bg-neutral-900/40">
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="mailto:litescudud@gmail.com"
                className="rounded-2xl border border-black/8 bg-black/[0.018] p-4 transition-colors hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:border-white/8 dark:bg-white/[0.03] dark:hover:bg-white/[0.05] dark:focus-visible:ring-white/20"
              >
                <p className="mb-1 text-[11px] uppercase tracking-[0.08em] text-neutral-400">Email</p>
                <p className="text-[14px] font-medium text-neutral-900 dark:text-neutral-100">litescudud@gmail.com</p>
              </a>

              <a
                href="tel:+40757040154"
                className="rounded-2xl border border-black/8 bg-black/[0.018] p-4 transition-colors hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:border-white/8 dark:bg-white/[0.03] dark:hover:bg-white/[0.05] dark:focus-visible:ring-white/20"
              >
                <p className="mb-1 text-[11px] uppercase tracking-[0.08em] text-neutral-400">Phone</p>
                <p className="text-[14px] font-medium text-neutral-900 dark:text-neutral-100">+40 757 040 154</p>
              </a>

              <a
                href="https://www.linkedin.com/in/david-litescu-a53371213"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-black/8 bg-black/[0.018] p-4 transition-colors hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:border-white/8 dark:bg-white/[0.03] dark:hover:bg-white/[0.05] dark:focus-visible:ring-white/20"
              >
                <p className="mb-1 text-[11px] uppercase tracking-[0.08em] text-neutral-400">{t.contact.linkedin}</p>
                <p className="text-[14px] font-medium text-neutral-900 dark:text-neutral-100">{t.contact.linkedin} &rarr;</p>
              </a>

              <a
                href="https://github.com/Liti-brightfuture"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-black/8 bg-black/[0.018] p-4 transition-colors hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:border-white/8 dark:bg-white/[0.03] dark:hover:bg-white/[0.05] dark:focus-visible:ring-white/20"
              >
                <p className="mb-1 text-[11px] uppercase tracking-[0.08em] text-neutral-400">{t.contact.github}</p>
                <p className="text-[14px] font-medium text-neutral-900 dark:text-neutral-100">{t.contact.github} &rarr;</p>
              </a>

              <div className="rounded-2xl border border-black/8 bg-black/[0.018] p-4 sm:col-span-2 dark:border-white/8 dark:bg-white/[0.03]">
                <p className="mb-1 text-[11px] uppercase tracking-[0.08em] text-neutral-400">{t.contact.location}</p>
                <p className="text-[14px] font-medium text-neutral-900 dark:text-neutral-100">{t.contact.locationVal}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
