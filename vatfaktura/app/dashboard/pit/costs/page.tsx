'use client'

import React from 'react'
import Link from 'next/link'

export default function PitCostsPage() {
  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 mb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-300 bg-clip-text text-transparent">Zarządzanie kosztami UPZ</h1>
          <p className="text-orange-300/70 text-xs sm:text-sm mt-1">Śledź koszty uzyskania przychodu i optymalizuj podatek</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-8 relative z-10 space-y-6">
        {/* Info Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-orange-500/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Jakie koszty możesz odliczać?</h2>
          <ul className="space-y-2 text-sm text-blue-300/80">
            <li>• Materiały i surowce do produkcji</li>
            <li>• Artykuły biurowe i papiernicze</li>
            <li>• Czynsz za lokal biznesowy</li>
            <li>• Rachunki za prąd, wodę, gaz</li>
            <li>• Internet i telefon (proporcjonalnie)</li>
            <li>• Usługi księgowe i doradztwa</li>
            <li>• Amortyzacja majątku (komputer, maszyny)</li>
            <li>• Ubezpieczenia biznesowe</li>
            <li>• Szkolenia i kursy zawodowe</li>
            <li>• Transport do klienta (paliwo, przejazdy)</li>
          </ul>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-lg p-6">
          <h3 className="font-semibold text-orange-300 mb-4">Moduł kosztów - opracowanie</h3>
          <p className="text-blue-300/80 text-sm mb-4">
            Pełny system zarządzania kosztami UPZ z kategoryzacją, amortyzacją i raportowaniem będzie dostępny wkrótce.
          </p>
          <Link
            href="/dashboard/pit"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded px-4 py-2 transition-all"
          >
            Wróć do rozliczeń
          </Link>
        </div>

        {/* Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Dokumentacja</h4>
            <p className="text-xs sm:text-sm text-blue-300/70">Przechowuj wszystkie faktury i rachunki przez 5 lat dla kontroli fiskusa.</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Kategorizacja</h4>
            <p className="text-xs sm:text-sm text-blue-300/70">Organizuj koszty po kategoriach dla lepszej analizy i raportowania.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

}
