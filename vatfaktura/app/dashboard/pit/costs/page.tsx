'use client'

import React, { useMemo, useState } from 'react'
import { usePit } from '@/app/pit-context'
import { useUser } from '@/hooks/useUser'
import { PitCostEntryForm } from '@/components/pit/pit-cost-entry-form'
import { formatCurrency, getTaxCostCategoryLabel } from '@/lib/pit/pit-utils'
import Link from 'next/link'

export default function PitCostsPage() {
  const { user } = useUser()
  const { costs, deleteCost, declarations } = usePit()
  const [selectedDeclaration, setSelectedDeclaration] = useState<string>('')
  const [expandedForm, setExpandedForm] = useState(false)

  const userDeclarations = useMemo(
    () => declarations.filter(d => d.userId === user?.id),
    [declarations, user?.id]
  )

  const userCosts = useMemo(
    () => costs.filter(c => c.userId === user?.id && (!selectedDeclaration || c.declarationId === selectedDeclaration)),
    [costs, user?.id, selectedDeclaration]
  )

  const categoryTotals = useMemo(
    () => {
      const totals: Record<string, number> = {}
      userCosts.forEach(cost => {
        if (cost.status !== 'archived') {
          const key = cost.category
          totals[key] = (totals[key] || 0) + cost.amount
        }
      })
      return totals
    },
    [userCosts]
  )

  const totalDeductible = useMemo(
    () => userCosts.reduce((sum, cost) => {
      if (cost.deductible && cost.status !== 'archived') {
        return sum + (cost.amount * cost.deductionPercent / 100)
      }
      return sum
    }, 0),
    [userCosts]
  )

  const handleDelete = (costId: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten koszt?')) {
      deleteCost(costId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/dashboard/pit" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            ← Wróć do PIT
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Zarządzanie kosztami UPZ</h1>
          <p className="text-gray-600 mt-2">
            Śledzenie kosztów uzyskania przychodu dla celów podatkowych
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Sidebar */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-8">
              <button
                onClick={() => setExpandedForm(!expandedForm)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium mb-4"
              >
                + Dodaj nowy koszt
              </button>

              {expandedForm && (
                <>
                  {userDeclarations.length > 0 ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Powiąż z deklaracją</label>
                      <select
                        value={selectedDeclaration}
                        onChange={e => setSelectedDeclaration(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      >
                        <option value="">Wszystkie deklaracje</option>
                        {userDeclarations.map(d => (
                          <option key={d.id} value={d.id}>
                            {d.type} {d.year}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 mb-4">Najpierw utwórz deklarację PIT</p>
                  )}
                </>
              )}

              {/* Stats */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Razem kosztów</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(userCosts.reduce((sum, c) => sum + c.amount, 0))}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Do odliczenia</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{formatCurrency(totalDeductible)}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            {expandedForm && userDeclarations.length > 0 && (
              <div className="mt-6">
                <PitCostEntryForm
                  declarationId={selectedDeclaration || userDeclarations[0].id}
                  onSuccess={() => setExpandedForm(false)}
                />
              </div>
            )}
          </div>

          {/* Costs List and Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Summary */}
            {userCosts.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Koszty według kategorii</h3>
                <div className="space-y-3">
                  {Object.entries(categoryTotals).map(([category, total]) => (
                    <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium text-gray-900">{getTaxCostCategoryLabel(category)}</span>
                      <span className="text-lg font-bold text-gray-900">{formatCurrency(total)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Costs Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Lista kosztów ({userCosts.length})</h3>
              </div>

              {userCosts.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-gray-600">Brak kosztów</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Data</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Kategoria</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Opis</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Kwota</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Odliczenie</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Akcja</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userCosts.map((cost, index) => (
                        <tr key={cost.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-3 text-sm text-gray-900">{new Date(cost.date).toLocaleDateString('pl-PL')}</td>
                          <td className="px-6 py-3 text-sm font-medium text-gray-900">{getTaxCostCategoryLabel(cost.category)}</td>
                          <td className="px-6 py-3 text-sm text-gray-600 max-w-xs truncate">{cost.description}</td>
                          <td className="px-6 py-3 text-sm text-right font-semibold text-gray-900">{formatCurrency(cost.amount)}</td>
                          <td className="px-6 py-3 text-sm text-right font-semibold text-blue-600">
                            {formatCurrency((cost.amount * cost.deductionPercent) / 100)}
                          </td>
                          <td className="px-6 py-3 text-sm">
                            <button
                              onClick={() => handleDelete(cost.id)}
                              className="text-red-600 hover:text-red-700 font-medium"
                            >
                              Usuń
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
