'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { projects, earlyProjects } from '@/app/data/projects'
import ProjectCard from './ProjectCard'
import { useLang } from '@/app/context/LangContext'

export default function Projects() {
  const { t } = useLang()
  const reduceMotion = useReducedMotion()

  return (
    <>
      <section suppressHydrationWarning id="projects" className="border-b border-black/10 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-[11px] tracking-[0.12em] uppercase text-neutral-500 mb-10">
            {t.projects.label}
          </p>
          <div className="grid items-start md:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                className="self-start"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.36, ease: 'easeOut', delay: reduceMotion ? 0 : i * 0.05 }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section suppressHydrationWarning className="border-b border-black/10 dark:border-white/10">
        <motion.div
          className="max-w-5xl mx-auto px-6 py-16"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p className="text-[11px] tracking-[0.12em] uppercase text-neutral-500 mb-2">
            {t.early.label}
          </p>
          <p className="text-[13px] text-neutral-500 mb-10 max-w-lg font-light">
            {t.early.subtitle}
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            {earlyProjects.map(p => (
              <div key={p.name} className="border border-black/10 dark:border-white/10 rounded-xl p-4 bg-white dark:bg-neutral-900/40">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[14px] font-medium">{p.name}</span>
                  <span className="text-[11px] text-neutral-500">{p.year}</span>
                </div>
                <p className="text-[12px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3 font-light">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {p.tech.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 border border-black/15 dark:border-white/15 rounded-full text-neutral-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  )
}
