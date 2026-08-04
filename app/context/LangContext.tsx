'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { translations, Lang, Translations } from '@/app/data/i18n'

interface LangContextType {
  lang: Lang
  t: Translations
  toggle: () => void
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  t: translations.en,
  toggle: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggle = () => setLang(l => l === 'en' ? 'ro' : 'en')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
