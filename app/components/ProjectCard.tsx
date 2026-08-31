'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Project } from '@/app/data/projects'
import { useLang } from '@/app/context/LangContext'

const statusColors: Record<string, string> = {
  done: 'bg-green-500',
  wip: 'bg-amber-500',
  demo: 'bg-blue-500',
}

export default function ProjectCard({ project, className = '' }: { project: Project; className?: string }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const badgeClass = `badge-${project.badge} px-2 py-0.5 rounded-full text-[10px] font-medium transition-all duration-200`
  const badgeLabel = t.legend[project.badge as 'human' | 'ai' | 'collab']
  const statusLabel = t.projects[project.status as 'done' | 'wip' | 'demo']
  const hasExpandedContent = Boolean(project.problem || project.owned || project.tradeoff || (project.why && !project.why.startsWith('[YOUR')))

  const detailsId = `${project.id}-details`

  const toggleCard = () => {
    if (!hasExpandedContent) return
    setOpen(o => !o)
  }

  const summaryItems = [
    { label: t.projects.role, value: project.role },
    { label: t.projects.outcome, value: project.outcome },
    { label: t.projects.stackFit, value: project.stackFit },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value))

  const detailItems = [
    { label: t.projects.why, value: project.why && !project.why.startsWith('[YOUR') ? project.why : undefined },
    { label: t.projects.problem, value: project.problem },
    { label: t.projects.owned, value: project.owned },
    { label: t.projects.tradeoff, value: project.tradeoff },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value))

  return (
    <motion.article suppressHydrationWarning
      className={`group flex flex-col rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-neutral-900/40 ${
        hasExpandedContent ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={toggleCard}
      whileHover={reduceMotion ? undefined : { y: -2, boxShadow: '0 12px 28px rgba(15, 23, 42, 0.06)' }}
      animate={open && !reduceMotion ? { borderColor: 'rgba(24, 24, 19, 0.18)' } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div suppressHydrationWarning className="mb-3 flex items-start justify-between gap-3">
        <span className="font-serif text-[13px] text-neutral-500 transition-all duration-200 group-hover:tracking-[0.08em] group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
          {project.number}
        </span>
        <div suppressHydrationWarning className="flex items-center gap-2">
          <span className={`${badgeClass} group-hover:opacity-90 group-hover:-translate-y-px`}>{badgeLabel}</span>
          {hasExpandedContent && (
            <button
              type="button"
              onClick={e => { e.stopPropagation(); toggleCard() }}
              aria-expanded={open}
              aria-controls={detailsId}
              aria-label={open ? t.projects.collapse : t.projects.expand}
              className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/10 text-neutral-500 before:absolute before:-inset-2 before:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:border-white/10 dark:focus-visible:ring-white/20"
            >
              <motion.span suppressHydrationWarning
                animate={reduceMotion ? undefined : { rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <ChevronDown size={15} strokeWidth={1.75} />
              </motion.span>
            </button>
          )}
        </div>
      </div>

      <div suppressHydrationWarning className="mb-2 text-[15px] font-medium leading-snug">{project.name}</div>
      <div suppressHydrationWarning className="mb-4 text-[13px] font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
        {project.description}
      </div>

      {summaryItems.length > 0 && (
        <div suppressHydrationWarning className="mb-4 grid gap-2 rounded-xl border border-black/8 bg-black/[0.018] p-3 dark:border-white/8 dark:bg-white/[0.03]">
          {summaryItems.map((item) => (
            <div suppressHydrationWarning key={item.label} className="grid gap-0.5 md:grid-cols-[72px_minmax(0,1fr)]">
              <span className="text-[10px] uppercase tracking-[0.12em] text-neutral-500">{item.label}</span>
              <span className="text-[12px] leading-relaxed text-neutral-700 dark:text-neutral-300">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence initial={false}>
        {open && detailItems.length > 0 && (
          <motion.div suppressHydrationWarning
            id={detailsId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={reduceMotion ? undefined : { height: 'auto', opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div suppressHydrationWarning className="mb-4 border-t border-black/8 pt-4 dark:border-white/8">
              <div suppressHydrationWarning className="grid gap-3">
                {detailItems.map((item) => (
                  <div suppressHydrationWarning key={item.label}>
                    <p className="mb-1 text-[10px] uppercase tracking-[0.12em] text-neutral-500">{item.label}</p>
                    <p className="text-[13px] font-light italic leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div suppressHydrationWarning className="mt-auto pt-3 border-t border-black/8 dark:border-white/8">
        <div suppressHydrationWarning className="flex flex-wrap gap-1 mb-3">
          {project.tech.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 border border-black/15 dark:border-white/15 rounded-full text-neutral-500">
              {tag}
            </span>
          ))}
        </div>
        <div suppressHydrationWarning className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-neutral-500">
            <span className={`w-1.5 h-1.5 rounded-full ${statusColors[project.status]}`} />
            {statusLabel}
          </span>
          {(project.link || project.github) && (
            <div suppressHydrationWarning className="flex items-center gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="whitespace-nowrap text-[11px] text-neutral-500 underline underline-offset-2 transition-colors hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:hover:text-neutral-200 dark:focus-visible:ring-white/20"
                >
                  {t.projects.liveDemo} &rarr;
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="whitespace-nowrap text-[11px] text-neutral-500 underline underline-offset-2 transition-colors hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:hover:text-neutral-200 dark:focus-visible:ring-white/20"
                >
                  {t.projects.viewCode} &rarr;
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}
