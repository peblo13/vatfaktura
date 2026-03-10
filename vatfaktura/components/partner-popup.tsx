'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

export function PartnerPopup() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Pokaż popup po 3 sekundach, tylko jeśli nie był zamknięty
    const timer = setTimeout(() => {
      const closed = localStorage.getItem('partner-popup-closed')
      if (!closed) {
        setShow(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setShow(false)
    localStorage.setItem('partner-popup-closed', 'true')
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-amber-500/50 shadow-2xl shadow-amber-600/30 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 px-6 sm:px-8 py-6 sm:py-8 text-center relative">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded text-white/80 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <p className="text-3xl sm:text-4xl mb-2">🤝</p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Wspieraj VAT Faktura
          </h2>
          <p className="text-sm text-amber-100">
            Bezpłatnie dzięki naszym partnerom
          </p>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-4">
          <p className="text-sm text-blue-200/80">
            Portal jest w 100% bezpłatny dzięki prowizjom z rekomendowanych partnerów. Kliknij "Partnerzy" aby zobaczyć naszych polecanych narzędzi dla Twojej firmy.
          </p>

          <div className="space-y-2 bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
            <p className="text-xs font-semibold text-blue-300 mb-3">Polecamy:</p>
            <div className="space-y-2 text-xs text-blue-200/70">
              <p>✨ <strong>Wise</strong> - Przelewy międzynarodowe</p>
              <p>✨ <strong>Stripe</strong> - Płatności online</p>
              <p>✨ <strong>Google Workspace</strong> - Email dla firm</p>
            </div>
          </div>

          <p className="text-xs text-blue-300/60 italic">
            Możesz zamknąć ten popup w dowolnym momencie klikając X
          </p>
        </div>

        {/* Buttons */}
        <div className="px-6 sm:px-8 py-4 sm:py-6 flex flex-col gap-3 border-t border-blue-500/10">
          <Link href="/#partners" onClick={handleClose}>
            <button className="w-full px-4 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-lg text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-amber-600/30 hover:shadow-amber-600/50">
              Sprawdź partnerów
            </button>
          </Link>
          <button
            onClick={handleClose}
            className="w-full px-4 py-3 sm:py-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-blue-300 hover:text-blue-100 font-semibold text-sm sm:text-base transition-all border border-blue-500/20 hover:border-blue-500/50"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  )
}
