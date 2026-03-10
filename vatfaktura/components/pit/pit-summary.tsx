'use client'

import React from 'react'
import { PitDeclaration } from '@/lib/types/pit-types'
import { formatCurrency, getDeclarationSummary, getPitDeclarationStatusLabel, getPitDeclarationTypeLabel } from '@/lib/pit/pit-utils'

interface PitSummaryProps {
  declaration: PitDeclaration
  costCount?: number
  showActions?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export function PitSummary({ declaration, costCount = 0, showActions = true, onEdit, onDelete }: PitSummaryProps) {
  const summary = getDeclarationSummary(declaration)

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {getPitDeclarationTypeLabel(declaration.type)} - {declaration.year}
            </h3>
            <p className="text-sm text-gray-600 mt-1">ID: {declaration.id}</p>
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
            {getPitDeclarationStatusLabel(declaration.status)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Income */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Dochody</h4>
            <div className="space-y-2 text-sm">
              {declaration.businessIncome !== undefined && declaration.businessIncome > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Z biznesu:</span>
                  <span className="font-medium">{formatCurrency(declaration.businessIncome)}</span>
                </div>
              )}
              {declaration.personalIncome > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Z pracy:</span>
                  <span className="font-medium">{formatCurrency(declaration.personalIncome)}</span>
                </div>
              )}
              {declaration.capitalGains > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Z kapitału:</span>
                  <span className="font-medium">{formatCurrency(declaration.capitalGains)}</span>
                </div>
              )}
              {declaration.rentalIncome > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Z wynajmu:</span>
                  <span className="font-medium">{formatCurrency(declaration.rentalIncome)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold">
                <span>Razem:</span>
                <span>{formatCurrency(summary.totalIncome)}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Odliczenia i ulgi</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Kwota wolna:</span>
                <span className="font-medium">{formatCurrency(declaration.personalDeduction)}</span>
              </div>
              {declaration.reliefs > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Ulgi podatkowe:</span>
                  <span className="font-medium">{formatCurrency(declaration.reliefs)}</span>
                </div>
              )}
              {declaration.businessExpenses !== undefined && declaration.businessExpenses > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Koszty biznesu:</span>
                  <span className="font-medium">{formatCurrency(declaration.businessExpenses)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold">
                <span>Razem:</span>
                <span>{formatCurrency(summary.totalDeductions + (declaration.businessExpenses || 0))}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Calculation */}
        <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4">Obliczenie podatku</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Dochód do opodatkowania</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(summary.taxableIncome)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Podatek brutto</p>
              <p className="text-xl font-bold text-red-600">{formatCurrency(declaration.taxAmount)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Do zapłaty</p>
              <p className="text-xl font-bold text-red-700">{formatCurrency(declaration.taxToPay)}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200 text-center">
            <p className="text-sm text-gray-600">
              Efektywna stawka podatkowa: <span className="font-semibold">{summary.effectiveTaxRate.toFixed(2)}%</span>
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Data utworzenia</p>
            <p className="font-medium text-gray-900">{new Date(declaration.createdAt).toLocaleDateString('pl-PL')}</p>
          </div>
          {declaration.submittedAt && (
            <div>
              <p className="text-gray-600">Data wysłania</p>
              <p className="font-medium text-gray-900">{new Date(declaration.submittedAt).toLocaleDateString('pl-PL')}</p>
            </div>
          )}
          {declaration.epodatkiReferenceNumber && (
            <div>
              <p className="text-gray-600">Numer referencyjny e-podatki</p>
              <p className="font-mono text-xs font-medium text-gray-900 break-all">{declaration.epodatkiReferenceNumber}</p>
            </div>
          )}
        </div>

        {costCount > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
            Dołączonych kosztów: <span className="font-semibold">{costCount}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={onEdit}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium text-sm"
          >
            Edytuj
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 font-medium text-sm"
          >
            Usuń
          </button>
        </div>
      )}
    </div>
  )
}
