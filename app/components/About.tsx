'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate, useReducedMotion } from 'framer-motion'
import { useLang } from '@/app/context/LangContext'

const stats = [
  { num: 7, key: 'years' as const },
  { num: 12, key: 'projects' as const },
  { num: 2, key: 'ai' as const },
  { num: 3, key: 'languages' as const },
]

function Counter({ value }: { value: number }) {
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(reduceMotion ? value : 0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView || reduceMotion) return

    const controls = animate(0, value, {
      duration: 1.1,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })

    return () => controls.stop()
  }, [isInView, reduceMotion, value])

  return <span ref={ref}>{display}</span>
}

export default function About() {
  const { t } = useLang()
  const reduceMotion = useReducedMotion()

  return (
    <section id="about" className="border-b border-black/10 dark:border-white/10">
      <motion.div
        className="max-w-5xl mx-auto px-6 py-14"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <p className="text-[11px] tracking-[0.12em] uppercase text-neutral-500 mb-10">
          {t.about.label}
        </p>
        <div className="grid md:grid-cols-[minmax(0,1fr)_240px] gap-10 items-start">
          <div className="space-y-4 text-[15px] text-neutral-600 dark:text-neutral-400 leading-[1.8] font-light">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full border border-black/15 dark:border-white/15 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-serif text-2xl text-neutral-600">
              DL
            </div>
            <div className="grid grid-cols-2 gap-2 w-full">
              {stats.map(s => (
                <div key={s.key} className="bg-neutral-100 dark:bg-neutral-800/60 rounded-lg p-3 text-center">
                  <div className="text-[22px] font-medium">
                    <Counter value={s.num} />
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">{t.about[s.key]}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-[12px] leading-[1.75] text-neutral-500 dark:text-neutral-400 font-light px-2">
              {t.about.note}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
