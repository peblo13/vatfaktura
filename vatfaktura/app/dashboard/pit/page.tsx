'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { usePit } from '@/app/pit-context'
import { useUser } from '@/hooks/useUser'
import { PitSummary } from '@/components/pit/pit-summary'
import { formatCurrency, getPitDeclarationTypeLabel } from '@/lib/pit/pit-utils'

export default function PitDashboardPage() {
  const { user } = useUser()
  const { declarations, costs, jpkReports, submissions } = usePit()

  const userDeclarations = useMemo(
    () => declarations.filter(d => d.userId === user?.id),
    [declarations, user?.id]
  )

  const userCosts = useMemo(
    () => costs.filter(c => c.userId === user?.id),
    [costs, user?.id]
  )

  const userSubmissions = useMemo(
    () => submissions.filter(s => s.userId === user?.id),
    [submissions, user?.id]
  )

  const stats = useMemo(
    () => ({
      totalDeclarations: userDeclarations.length,
      draftDeclarations: userDeclarations.filter(d => d.status === 'draft').length,
      submittedDeclarations: userDeclarations.filter(d => d.status === 'submitted').length,
      totalCosts: userCosts.length,
      totalCostsAmount: userCosts.reduce((sum, c) => sum + c.amount, 0),
      totalJpkReports: jpkReports.filter(r => r.userId === user?.id).length,
      pendingSubmissions: userSubmissions.filter(s => s.status === 'queued' || s.status === 'sent').length,
    }),
    [userDeclarations, userCosts, jpkReports, submissions, user?.id]
  )

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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative p-3 sm:p-4 md:p-6 bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all shadow-lg rounded-lg sm:rounded-xl">
              <div className="flex flex-col items-start gap-2 sm:gap-3">
                <p className="text-purple-200/70 text-xs sm:text-sm font-medium">Deklaracje razem</p>
                <div className="flex items-end justify-between w-full">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{stats.totalDeclarations}</p>
                  <div className="text-xs text-purple-300/70">{stats.draftDeclarations} szkice</div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative p-3 sm:p-4 md:p-6 bg-slate-800/50 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/50 transition-all shadow-lg rounded-lg sm:rounded-xl">
              <div className="flex flex-col items-start gap-2 sm:gap-3">
                <p className="text-orange-200/70 text-xs sm:text-sm font-medium">Koszty UPZ</p>
                <div className="flex items-end justify-between w-full">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{stats.totalCosts}</p>
                  <div className="text-xs text-orange-300/70">{formatCurrency(stats.totalCostsAmount)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative p-3 sm:p-4 md:p-6 bg-slate-800/50 backdrop-blur-sm border-red-500/20 hover:border-red-500/50 transition-all shadow-lg rounded-lg sm:rounded-xl">
              <div className="flex flex-col items-start gap-2 sm:gap-3">
                <p className="text-red-200/70 text-xs sm:text-sm font-medium">JPK-V7 Raporty</p>
                <div className="flex items-end justify-between w-full">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{stats.totalJpkReports}</p>
                  <div className="text-xs text-red-300/70">VAT+PIT</div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative p-3 sm:p-4 md:p-6 bg-slate-800/50 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/50 transition-all shadow-lg rounded-lg sm:rounded-xl">
              <div className="flex flex-col items-start gap-2 sm:gap-3">
                <p className="text-yellow-200/70 text-xs sm:text-sm font-medium">Oczekujące wysyłki</p>
                <div className="flex items-end justify-between w-full">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{stats.pendingSubmissions}</p>
                  <div className="text-xs text-yellow-300/70">e-podatki</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Link
            href="/dashboard/pit/pit-37"
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all shadow-lg">
              <div className="text-base sm:text-lg font-semibold mb-1">Deklaracje PIT-37</div>
              <p className="text-blue-100 text-xs sm:text-sm">Dla przedsiębiorców i samozatrudnionych</p>
            </div>
          </Link>

          <Link
            href="/dashboard/pit/pit-36"
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all shadow-lg">
              <div className="text-base sm:text-lg font-semibold mb-1">Deklaracje PIT-36</div>
              <p className="text-green-100 text-xs sm:text-sm">Dla osób fizycznych ze wszystkich źródeł</p>
            </div>
          </Link>

          <Link
            href="/dashboard/pit/calculator"
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all shadow-lg">
              <div className="text-base sm:text-lg font-semibold mb-1">Kalkulator PIT</div>
              <p className="text-purple-100 text-xs sm:text-sm">Szybkie obliczenie podatku</p>
            </div>
          </Link>

          <Link
            href="/dashboard/pit/costs"
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all shadow-lg">
              <div className="text-base sm:text-lg font-semibold mb-1">Zarządzanie kosztami</div>
              <p className="text-orange-100 text-xs sm:text-sm">Śledzenie kosztów UPZ</p>
            </div>
          </Link>

          <Link
            href="/dashboard/pit/jpk-v7"
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all shadow-lg">
              <div className="text-base sm:text-lg font-semibold mb-1">JPK-V7 Raporty</div>
              <p className="text-rose-100 text-xs sm:text-sm">Integracja VAT + PIT</p>
            </div>
          </Link>

          <Link
            href="/dashboard/pit/e-podatki"
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all shadow-lg">
              <div className="text-base sm:text-lg font-semibold mb-1">E-podatki</div>
              <p className="text-indigo-100 text-xs sm:text-sm">Wysyłanie do Ministerstwa</p>
            </div>
          </Link>
        </div>

        {/* Recent Declarations */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg sm:rounded-xl blur"></div>
          <div className="relative bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 hover:border-purple-500/50 transition-all rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white">Ostatnie deklaracje</h2>
              <Link
                href="/dashboard/pit/pit-37"
                className="text-purple-400 hover:text-purple-300 text-xs sm:text-sm font-medium transition-colors"
              >
                Pokaż wszystkie →
              </Link>
            </div>

            {userDeclarations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-blue-300/70 mb-4">Brak deklaracji</p>
                <Link
                  href="/dashboard/pit/pit-37"
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  Utwórz deklarację →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {userDeclarations.slice(0, 3).map(declaration => (
                  <div key={declaration.id} className="flex justify-between items-center p-3 sm:p-4 border border-purple-500/20 hover:border-purple-500/50 rounded-lg bg-slate-700/30 transition-all">
                    <div>
                      <h3 className="font-medium text-white text-sm sm:text-base">
                        {getPitDeclarationTypeLabel(declaration.declarationType)} {declaration.year}
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-300/70 mt-1">
                        ID: {declaration.id.substring(0, 20)}...
                      </p>
                    </div>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                      declaration.status === 'draft'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : declaration.status === 'completed'
                          ? 'bg-blue-500/20 text-blue-300'
                          : declaration.status === 'submitted'
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-green-500/20 text-green-300'
                    }`}>
                      {declaration.status === 'draft' ? 'Szkic' : declaration.status === 'completed' ? 'Ukończona' : declaration.status === 'submitted' ? 'Wysłana' : 'Opracowana'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-lg sm:rounded-xl p-4 sm:p-6">
          <h3 className="font-semibold text-purple-300 mb-3">Potrzebujesz pomocy?</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-blue-300/80">
            <li>• Zapoznaj się z naszym przewodnikiem (dostępny wkrótce)</li>
            <li>• Sprawdź <Link href="/faq" className="text-purple-400 hover:text-purple-300 underline transition-colors">najczęściej zadawane pytania</Link></li>
            <li>• Skontaktuj się z nami przez <Link href="/contact" className="text-purple-400 hover:text-purple-300 underline transition-colors">formularz kontaktowy</Link></li>
          </ul>
        </div>
      </main>
    </div>
  )
}
