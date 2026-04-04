'use client'

import { useLang } from '@/app/context/LangContext'

export default function LegendBar() {
  const { t } = useLang()

  return (
    <div className="border-b border-black/10 dark:border-white/10">
      <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap gap-5 items-center">
        <span className="text-[11px] text-neutral-500">{t.legend.label}</span>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-[11px] text-neutral-500">
            <span className="badge-human px-2 py-0.5 rounded-full text-[10px] font-medium">{t.legend.human}</span>
            {t.legend.humanDesc}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-neutral-500">
            <span className="badge-ai px-2 py-0.5 rounded-full text-[10px] font-medium">{t.legend.ai}</span>
            {t.legend.aiDesc}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-neutral-500">
            <span className="badge-collab px-2 py-0.5 rounded-full text-[10px] font-medium">{t.legend.collab}</span>
            {t.legend.collabDesc}
          </div>
        </div>
      </div>
    </div>
  )
}
