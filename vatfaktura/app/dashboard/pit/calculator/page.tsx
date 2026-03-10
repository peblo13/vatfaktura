'use client'

import React from 'react'
import { PitCalculatorForm } from '@/components/pit/pit-calculator-form'
import Link from 'next/link'

export default function PitCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/dashboard/pit" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            ← Wróć do PIT
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Kalkulator PIT</h1>
          <p className="text-gray-600 mt-2">
            Szybko oblicz swój przychód, podatek i kwotę do zapłaty. Kalkulator wspiera wszystkie źródła dochodów.
          </p>
        </div>

        {/* Calculator */}
        <PitCalculatorForm />

        {/* Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Zawarte w kalkulatorze</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Polskie stawki podatku PIT 2024 (12% / 32%)</li>
              <li>✓ Kwota wolna od podatku (3600 PLN)</li>
              <li>✓ Ulgi na dzieci i rodzinne</li>
              <li>✓ Składki ZUS i ubezpieczenie zdrowotne</li>
              <li>✓ Dochody z różnych źródeł (praca, biznes, kapitał)</li>
              <li>✓ Zyski i straty z kapitału</li>
              <li>✓ Dochody z wynajmu nieruchomości</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Masz pytania?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><strong>Przychód brutto:</strong> całkowity zarobek przed opodatkowaniem</li>
              <li><strong>Koszty uzyskania:</strong> wydatki związane z zarabianiem</li>
              <li><strong>Kwota wolna:</strong> część dochodu nie podlegająca opodatkowaniu</li>
              <li><strong>ZUS:</strong> składki społeczne (emerytura, renta, choroba)</li>
              <li><strong>Ulgi podatkowe:</strong> zmniejszenie podatku za każde dziecko</li>
            </ul>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-4">Co dalej?</h3>
          <p className="text-blue-800 text-sm mb-4">
            Po obliczeniu podatku możesz:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/dashboard/pit/pit-37"
              className="bg-white hover:bg-gray-50 border border-blue-200 rounded p-4 text-sm font-medium text-blue-600"
            >
              ✓ Stworzyć deklarację PIT-37
            </Link>
            <Link
              href="/dashboard/pit/costs"
              className="bg-white hover:bg-gray-50 border border-blue-200 rounded p-4 text-sm font-medium text-blue-600"
            >
              ✓ Zarządzać kosztami UPZ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
