'use client'

import { useState, useEffect } from 'react'
import { X, Cookie } from 'lucide-react'

export function CookieConsent() {
  const [accepted, setAccepted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const consent = localStorage.getItem('cookieConsent')
        if (!consent) {
          setIsVisible(true)
        }
      }
    } catch (error) {
      console.error('[v0] Cookie consent check failed:', error)
    }
  }, [])

  const handleAccept = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cookieConsent', 'accepted')
      }
    } catch (error) {
      console.error('[v0] Accept cookies failed:', error)
    }
    setAccepted(true)
    setIsVisible(false)
  }

  const handleReject = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cookieConsent', 'rejected')
      }
    } catch (error) {
      console.error('[v0] Reject cookies failed:', error)
    }
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute bottom-6 right-6 max-w-sm pointer-events-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
          
          <div className="relative bg-slate-900/95 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={handleReject}
              className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-lg transition-colors text-blue-300 hover:text-blue-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <Cookie className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Ciasteczka</h3>
              </div>
            </div>

            <p className="text-blue-200/80 text-sm mb-6 leading-relaxed">
              Używamy ciasteczek do personalnych doświadczeń i analizy. Możesz zaakceptować lub odrzucić wszystkie.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleReject}
                className="flex-1 px-4 py-2 border border-blue-500/30 text-blue-300 hover:text-blue-100 hover:bg-slate-800/50 rounded-lg font-medium transition-all text-sm"
              >
                Odrzuć
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 rounded-lg font-bold transition-all text-sm shadow-lg shadow-blue-500/50"
              >
                Akceptuj
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
