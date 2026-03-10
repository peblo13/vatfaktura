'use client'

import React, { useState } from 'react'
import { PitCalculatorInput, PitCalculatorOutput } from '@/lib/types/pit-types'
import { PitCalculator } from '@/lib/pit/pit-calculator'
import { usePit } from '@/app/pit-context'
import { useUser } from '@/hooks/useUser'
import { formatCurrency } from '@/lib/pit/pit-utils'

export function PitCalculatorForm() {
  const { user } = useUser()
  const { addCalculatorEntry } = usePit()

  const [input, setInput] = useState<PitCalculatorInput>({
    year: new Date().getFullYear(),
    grossIncome: 100000,
    businessExpenses: 20000,
    personalDeductions: 3600,
    capitalGains: 0,
    capitalLosses: 0,
    rentalIncome: 0,
    maritalStatus: 'single',
    dependents: 0,
    pensionContribution: 0,
    healthInsuranceContribution: 9000,
    zusContribution: 10000,
    reliefs: 0,
  })

  const [output, setOutput] = useState<PitCalculatorOutput | null>(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const numValue = ['year', 'dependents'].includes(name) ? parseInt(value) : parseFloat(value) || 0

    setInput(prev => ({
      ...prev,
      [name]: numValue,
    }))
  }

  const handleCalculate = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/pit/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })

      const data = await response.json()

      if (data.success && data.data) {
        setOutput(data.data)
        addCalculatorEntry(input, data.data)
      } else {
        console.error('Calculation failed:', data.message)
      }
    } catch (error) {
      console.error('Error calculating PIT:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Kalkulator PIT</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rok podatkowy</label>
            <select
              name="year"
              value={input.year}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {[2024, 2023, 2022].map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Gross Income */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Przychód brutto (PLN)</label>
            <input
              type="number"
              name="grossIncome"
              value={input.grossIncome}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              step="100"
            />
          </div>

          {/* Business Expenses */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Koszty uzyskania przychodu (PLN)</label>
            <input
              type="number"
              name="businessExpenses"
              value={input.businessExpenses}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              step="100"
            />
          </div>

          {/* Personal Deductions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Odliczenia osobiste (PLN)</label>
            <input
              type="number"
              name="personalDeductions"
              value={input.personalDeductions}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              step="100"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status cywilny</label>
            <select
              name="maritalStatus"
              value={input.maritalStatus}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="single">Panna / Pan</option>
              <option value="married">Zamężna / Żonaty</option>
              <option value="divorced">Rozwiedziona / Rozwiedziony</option>
              <option value="widowed">Wdowa / Wdowiec</option>
            </select>
          </div>

          {/* Dependents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Liczba osób na utrzymaniu</label>
            <input
              type="number"
              name="dependents"
              value={input.dependents}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="0"
              max="10"
            />
          </div>

          {/* Health Insurance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ubezpieczenie zdrowotne (PLN)</label>
            <input
              type="number"
              name="healthInsuranceContribution"
              value={input.healthInsuranceContribution}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              step="100"
            />
          </div>

          {/* ZUS Contribution */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Składka ZUS (PLN)</label>
            <input
              type="number"
              name="zusContribution"
              value={input.zusContribution}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              step="100"
            />
          </div>

          {/* Capital Gains */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zyski z kapitału (PLN)</label>
            <input
              type="number"
              name="capitalGains"
              value={input.capitalGains}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              step="100"
            />
          </div>

          {/* Capital Losses */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Straty z kapitału (PLN)</label>
            <input
              type="number"
              name="capitalLosses"
              value={input.capitalLosses}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              step="100"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {loading ? 'Obliczanie...' : 'Oblicz PIT'}
        </button>
      </div>

      {/* Results */}
      {output && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Wyniki obliczenia</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border border-gray-200">
              <p className="text-sm text-gray-600">Dochód do opodatkowania</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(output.taxableIncome)}</p>
            </div>

            <div className="bg-white p-4 rounded border border-gray-200">
              <p className="text-sm text-gray-600">Podatek do zapłaty</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(output.taxAfterReliefs)}</p>
            </div>

            <div className="bg-white p-4 rounded border border-gray-200">
              <p className="text-sm text-gray-600">Efektywna stawka podatkowa</p>
              <p className="text-2xl font-bold text-gray-900">{output.effectiveTaxRate.toFixed(2)}%</p>
            </div>

            <div className="bg-white p-4 rounded border border-gray-200">
              <p className="text-sm text-gray-600">Krańcowa stawka podatkowa</p>
              <p className="text-2xl font-bold text-gray-900">{output.marginTaxRate}%</p>
            </div>

            <div className="bg-white p-4 rounded border border-gray-200">
              <p className="text-sm text-gray-600">Razem do zapłaty</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(output.totalPayable)}</p>
            </div>

            <div className="bg-white p-4 rounded border border-gray-200">
              <p className="text-sm text-gray-600">Ubezpieczenie zdrowotne</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(output.healthInsurancePayable)}</p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="mt-6 pt-6 border-t border-green-200">
            <h4 className="font-semibold text-gray-900 mb-3">Szczegółowe rozliczenie</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Dochód brutto:</span>
                <span className="font-medium">{formatCurrency(output.incomeBeforeTax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Kwota wolna od podatku:</span>
                <span className="font-medium">-{formatCurrency(output.personalDeduction)}</span>
              </div>
              <div className="flex justify-between border-t border-green-200 pt-2 mt-2">
                <span className="font-medium">Dochód do opodatkowania:</span>
                <span className="font-bold">{formatCurrency(output.taxableIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Podatek brutto:</span>
                <span className="font-medium">{formatCurrency(output.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ulgi podatkowe:</span>
                <span className="font-medium text-green-600">-{formatCurrency(output.reliefs)}</span>
              </div>
              <div className="flex justify-between border-t border-green-200 pt-2 mt-2">
                <span className="font-medium">PIT do zapłaty:</span>
                <span className="font-bold text-red-600">{formatCurrency(output.taxAfterReliefs)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
