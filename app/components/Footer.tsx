'use client'

import { useLang } from '@/app/context/LangContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="max-w-5xl mx-auto px-6 py-8 flex flex-wrap justify-between items-center gap-4 text-[12px] text-neutral-400">
      <span>{t.footer.built}</span>
      <span className="flex items-center gap-1">
        {t.footer.collab}
        <span className="badge-ai px-2 py-0.5 rounded-full text-[10px] font-medium ml-1">AI-assisted</span>
      </span>
    </footer>
  )
}
