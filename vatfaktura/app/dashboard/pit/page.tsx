'use client'

import React from 'react'
import Link from 'next/link'

export default function PitDashboardPage() {
  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 mb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/50 flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">System Rozliczeń PIT</h1>
              <p className="text-purple-300/70 text-xs sm:text-sm mt-1">Zarządzaj deklaracjami podatkowymi, kosztami i wysyłką do e-podatki</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-8 relative z-10 space-y-6 sm:space-y-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Link href="/dashboard/pit/calculator" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all shadow-lg">
              <div className="text-base sm:text-lg font-semibold mb-1">Kalkulator PIT</div>
              <p className="text-purple-100 text-xs sm:text-sm">Szybkie obliczenie podatku</p>
            </div>
          </Link>

          <Link href="/dashboard/pit" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all shadow-lg">
              <div className="text-base sm:text-lg font-semibold mb-1">Deklaracje PIT-37</div>
              <p className="text-blue-100 text-xs sm:text-sm">Dla przedsiębiorców i samozatrudnionych</p>
            </div>
          </Link>

          <Link href="/dashboard/pit" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all shadow-lg">
              <div className="text-base sm:text-lg font-semibold mb-1">Deklaracje PIT-36</div>
              <p className="text-green-100 text-xs sm:text-sm">Dla osób fizycznych ze wszystkich źródeł</p>
            </div>
          </Link>

          <Link href="/dashboard/pit" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all shadow-lg">
              <div className="text-base sm:text-lg font-semibold mb-1">Zarządzanie kosztami</div>
              <p className="text-orange-100 text-xs sm:text-sm">Śledzenie kosztów UPZ</p>
            </div>
          </Link>

          <Link href="/dashboard/pit" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all shadow-lg">
              <div className="text-base sm:text-lg font-semibold mb-1">JPK-V7 Raporty</div>
              <p className="text-rose-100 text-xs sm:text-sm">Integracja VAT + PIT</p>
            </div>
          </Link>

          <Link href="/dashboard/pit" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all shadow-lg">
              <div className="text-base sm:text-lg font-semibold mb-1">E-podatki</div>
              <p className="text-indigo-100 text-xs sm:text-sm">Wysyłanie do Ministerstwa</p>
            </div>
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-lg sm:rounded-xl p-4 sm:p-6">
          <h3 className="font-semibold text-purple-300 mb-3">Informacje o systemie PIT</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-blue-300/80">
            <li>• System zawiera pełny kalkulator PIT z stawkami podatkowymi na 2026</li>
            <li>• Możliwość tworzenia deklaracji PIT-37 i PIT-36</li>
            <li>• Zarządzanie kosztami uzyskania przychodu (UPZ)</li>
            <li>• Generowanie raportów JPK-V7 (integracja VAT + PIT)</li>
            <li>• Wysyłka deklaracji do e-podatki (Ministerstwo Finansów)</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

