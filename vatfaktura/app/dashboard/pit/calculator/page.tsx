'use client'

import React from 'react'
import Link from 'next/link'

export default function PitCalculatorPage() {
  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 mb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">Kalkulator PIT</h1>
          <p className="text-purple-300/70 text-xs sm:text-sm mt-1">Szybko oblicz swój przychód, podatek i kwotę do zapłaty</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-8 relative z-10 space-y-6">
        {/* Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-4">Zawarte w kalkulatorze</h3>
            <ul className="space-y-2 text-sm text-blue-300/80">
              <li>✓ Polskie stawki podatku PIT 2026 (12% / 32%)</li>
              <li>✓ Kwota wolna od podatku (3600 PLN)</li>
              <li>✓ Ulgi na dzieci i rodzinne</li>
              <li>✓ Składki ZUS i ubezpieczenie zdrowotne</li>
              <li>✓ Dochody z różnych źródeł (praca, biznes, kapitał)</li>
              <li>✓ Zyski i straty z kapitału</li>
              <li>✓ Dochody z wynajmu nieruchomości</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-4">Masz pytania?</h3>
            <ul className="space-y-2 text-sm text-blue-300/80">
              <li><strong>Przychód brutto:</strong> całkowity zarobek przed opodatkowaniem</li>
              <li><strong>Koszty uzyskania:</strong> wydatki związane z zarabianiem</li>
              <li><strong>Kwota wolna:</strong> część dochodu nie podlegająca opodatkowaniu</li>
              <li><strong>ZUS:</strong> składki społeczne (emerytura, renta, choroba)</li>
              <li><strong>Ulgi podatkowe:</strong> zmniejszenie podatku za każde dziecko</li>
            </ul>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-lg p-6">
          <h3 className="font-semibold text-purple-300 mb-4">Kalkulator znajduje się w opracowaniu</h3>
          <p className="text-blue-300/80 text-sm mb-4">
            Kalkulator PIT będzie wkrótce dostępny w aplikacji. Tymczasem możesz przejść do pozostałych funkcji rozliczeń PIT.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/dashboard/pit"
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded px-4 py-2 transition-all"
            >
              Wróć do rozliczeń
            </Link>
            <Link
              href="/dashboard/pit/costs"
              className="border border-purple-500/30 hover:bg-purple-500/10 text-purple-300 text-sm font-medium rounded px-4 py-2 transition-all"
            >
              Zarządzaj kosztami
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
