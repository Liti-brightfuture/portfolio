'use client'

import { useEffect } from 'react'

export default function ConsoleEgg() {
  useEffect(() => {
    console.log(
      '%c David Litescu ',
      'background: #1a1a18; color: #fafaf8; font-size: 13px; font-weight: bold; padding: 4px 12px; border-radius: 4px; font-family: monospace; letter-spacing: 0.05em;'
    )
    console.log(
      '%c You opened devtools. I respect that. ',
      'color: #3B6D11; font-family: monospace; font-size: 12px;'
    )
    console.log(
      '%c → litescudud@gmail.com ',
      'color: #534AB7; font-family: monospace; font-size: 12px;'
    )
  }, [])
  return null
}
