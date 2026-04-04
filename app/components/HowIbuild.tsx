'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '@/app/context/LangContext'

export default function HowIbuild() {
  const { t } = useLang()
  const reduceMotion = useReducedMotion()

  const items = [
    {
      number: '01',
      title: t.build.oneTitle,
      body: t.build.oneBody,
      proof: t.build.oneProof,
    },
    {
      number: '02',
      title: t.build.twoTitle,
      body: t.build.twoBody,
      proof: t.build.twoProof,
    },
    {
      number: '03',
      title: t.build.threeTitle,
      body: t.build.threeBody,
      proof: t.build.threeProof,
    },
  ]

  return (
    <section id="build" className="border-b border-black/10 dark:border-white/10">
      <motion.div
        className="max-w-5xl mx-auto px-6 py-16"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <p className="text-[11px] tracking-[0.12em] uppercase text-neutral-500 mb-4">
          {t.build.label}
        </p>

        <div className="mb-10 max-w-3xl space-y-4">
          <p className="font-serif text-[34px] md:text-[42px] leading-[1.08] tracking-[-0.03em] text-neutral-900 dark:text-neutral-100">
            {t.build.intro}
          </p>
          <p className="max-w-2xl text-[15px] leading-[1.85] text-neutral-600 dark:text-neutral-400 font-light">
            {t.build.support}
          </p>
          <p className="text-[13px] italic leading-[1.8] text-neutral-500 dark:text-neutral-400">
            {t.build.closing}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              className="relative rounded-2xl border border-black/10 bg-white/80 p-5 dark:border-white/10 dark:bg-neutral-900/40"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: reduceMotion ? 0 : index * 0.05 }}
              whileHover={reduceMotion ? undefined : { y: -2 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                  {item.number}
                </span>
                <span className="h-px w-10 bg-black/10 dark:bg-white/10" />
              </div>

              <p className="mb-3 font-serif text-[24px] leading-tight tracking-[-0.02em] text-neutral-900 dark:text-neutral-100">
                {item.title}
              </p>
              <p className="mb-4 text-[13px] leading-[1.8] text-neutral-600 dark:text-neutral-400 font-light">
                {item.body}
              </p>

              <div className="rounded-xl border border-black/8 bg-black/[0.018] px-3 py-3 dark:border-white/8 dark:bg-white/[0.03]">
                <p className="mb-1 text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                  {t.build.proofLabel}
                </p>
                <p className="text-[12px] leading-[1.75] text-neutral-700 dark:text-neutral-300">
                  {item.proof}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
