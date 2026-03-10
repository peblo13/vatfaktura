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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">System PIT</h1>
          <p className="text-gray-600 mt-2">
            Zarządzaj swoimi deklaracjami podatkowymi, kosztami i wysyłką do e-podatki
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="text-sm font-medium text-gray-600">Deklaracje razem</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{stats.totalDeclarations}</div>
            <div className="text-sm text-gray-500 mt-2">
              {stats.draftDeclarations} szkice, {stats.submittedDeclarations} wysłane
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="text-sm font-medium text-gray-600">Koszty UPZ</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCosts}</div>
            <div className="text-sm text-gray-500 mt-2">{formatCurrency(stats.totalCostsAmount)}</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="text-sm font-medium text-gray-600">Raporty JPK-V7</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{stats.totalJpkReports}</div>
            <div className="text-sm text-gray-500 mt-2">VAT + PIT</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="text-sm font-medium text-gray-600">Oczekujące wysyłki</div>
            <div className="text-3xl font-bold text-red-600 mt-2">{stats.pendingSubmissions}</div>
            <div className="text-sm text-gray-500 mt-2">do e-podatki</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link
            href="/dashboard/pit/pit-37"
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-lg font-semibold mb-2">Deklaracje PIT-37</div>
            <p className="text-blue-100 text-sm">Dla przedsiębiorców i samozatrudnionych</p>
          </Link>

          <Link
            href="/dashboard/pit/pit-36"
            className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-lg font-semibold mb-2">Deklaracje PIT-36</div>
            <p className="text-green-100 text-sm">Dla osób fizycznych ze wszystkich źródeł</p>
          </Link>

          <Link
            href="/dashboard/pit/calculator"
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-lg font-semibold mb-2">Kalkulator PIT</div>
            <p className="text-purple-100 text-sm">Szybkie obliczenie podatku</p>
          </Link>

          <Link
            href="/dashboard/pit/costs"
            className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-lg font-semibold mb-2">Zarządzanie kosztami</div>
            <p className="text-orange-100 text-sm">Śledzenie kosztów UPZ</p>
          </Link>

          <Link
            href="/dashboard/pit/jpk-v7"
            className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-lg font-semibold mb-2">JPK-V7</div>
            <p className="text-red-100 text-sm">Integracja VAT + PIT</p>
          </Link>

          <Link
            href="/dashboard/pit/e-podatki"
            className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-lg font-semibold mb-2">E-podatki</div>
            <p className="text-indigo-100 text-sm">Wysyłanie do Ministerstwa</p>
          </Link>
        </div>

        {/* Recent Declarations */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Ostatnie deklaracje</h2>
            <Link
              href="/dashboard/pit/pit-37"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Pokaż wszystkie →
            </Link>
          </div>

          {userDeclarations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Brak deklaracji</p>
              <Link
                href="/dashboard/pit/pit-37"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Utwórz deklarację →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {userDeclarations.slice(0, 3).map(declaration => (
                <div key={declaration.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {getPitDeclarationTypeLabel(declaration.type)} {declaration.year}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      ID: {declaration.id.substring(0, 20)}...
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    declaration.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : declaration.status === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : declaration.status === 'submitted'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                  }`}>
                    {declaration.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Potrzebujesz pomocy?</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Zapoznaj się z naszym <Link href="/help/pit-guide" className="underline hover:text-blue-600">przewodnikiem</Link></li>
            <li>• Sprawdź <Link href="/help/faq" className="underline hover:text-blue-600">najczęściej zadawane pytania</Link></li>
            <li>• Skontaktuj się z <Link href="/support" className="underline hover:text-blue-600">wsparciem technicznym</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
