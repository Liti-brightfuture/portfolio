'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '@/app/context/LangContext'

const skillGroups = [
  {
    cat: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS', 'React Native', 'Framer Motion', 'Radix UI', 'Zustand', 'Recharts'],
  },
  {
    cat: 'Backend & Data',
    items: ['Node.js', 'Express', 'Supabase', 'Prisma', 'PostgreSQL', 'Neon Postgres', 'Upstash Redis', 'SQLite', 'Edge Functions', 'RLS'],
  },
  {
    cat: 'Integrations & APIs',
    items: ['Twilio', 'SendGrid', 'Resend', 'OpenAI API', 'Telegram Bot API', 'EmailJS', 'Pexels API', 'Solana Wallet Adapter'],
  },
  {
    cat: 'Tooling & DevOps',
    items: ['GitHub', 'Vercel', 'Claude Code', 'ffmpeg', 'Expo', 'Zod', 'React Hook Form', 'Vitest'],
  },
  {
    cat: 'AI & Prompt Engineering',
    items: ['Prompt Engineering', 'Claude Code', 'GPT-4o', 'Whisper', 'AI Workflows', 'Context Management'],
  },
  {
    cat: 'Other',
    items: ['C++', 'C# .NET', 'Python async', 'NetworkX', 'pandas', 'Industrial Robotics', 'i18n'],
  },
]

export default function Skills() {
  const { t } = useLang()
  const reduceMotion = useReducedMotion()

  return (
    <section suppressHydrationWarning id="skills" className="border-b border-black/10 dark:border-white/10">
      <motion.div suppressHydrationWarning
        className="max-w-5xl mx-auto px-6 py-16"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className="text-[11px] tracking-[0.12em] uppercase text-neutral-500 mb-10">
          {t.skills.label}
        </p>
        <div suppressHydrationWarning className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/10 border border-black/10 dark:border-white/10 rounded-xl overflow-hidden">
          {skillGroups.map((group, i) => (
            <div suppressHydrationWarning
              key={group.cat}
              className={`p-5 bg-white dark:bg-neutral-900/40 ${i >= 3 ? 'border-t border-black/10 dark:border-white/10' : ''}`}
            >
              <p className="text-[11px] uppercase tracking-[0.1em] text-neutral-500 mb-3">{group.cat}</p>
              <div suppressHydrationWarning className="flex flex-wrap gap-1.5">
                {group.items.map(item => (
                  <span
                    key={item}
                    className="text-[12px] px-2.5 py-1 border border-black/15 dark:border-white/15 rounded-full text-neutral-600 dark:text-neutral-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
