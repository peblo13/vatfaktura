'use client'

import Link from 'next/link'
import { ExternalLink, X } from 'lucide-react'
import { useState } from 'react'

export function SupportBanner() {
  const [closed, setClosed] = useState(false)

  if (closed) return null

  return (
    <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 px-3 sm:px-4 md:px-6 lg:px-8 py-2 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-lg p-3 sm:p-4 backdrop-blur-xl border border-amber-400/50 shadow-2xl shadow-amber-600/20">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-bold text-white mb-0.5 truncate">
              🚀 POLECENI PARTNERZY - Wspieraj projekt!
            </p>
            <p className="text-xs text-amber-100 line-clamp-1">
              Wise, Stripe, Google Workspace → Zarabiamy prowizje, portal zostaje 100% bezpłatny
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/#partners">
              <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 hover:bg-white/30 border border-white/50 hover:border-white rounded-lg text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap min-h-[32px]">
                <span>ZOBACZ</span>
                <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </Link>
            <button
              onClick={() => setClosed(true)}
              className="p-1.5 hover:bg-white/10 rounded text-white/80 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
