'use client'

import React, { useState } from 'react'
import { TaxCost } from '@/lib/types/pit-types'
import { usePit } from '@/app/pit-context'
import { useUser } from '@/hooks/useUser'
import { formatCurrency, getTaxCostCategoryLabel } from '@/lib/pit/pit-utils'
import { validateTaxCost } from '@/lib/pit/pit-validation'

interface PitCostEntryFormProps {
  declarationId: string
  onSuccess?: () => void
}

export function PitCostEntryForm({ declarationId, onSuccess }: PitCostEntryFormProps) {
  const { user } = useUser()
  const { addCost } = usePit()

  const categories = ['office', 'equipment', 'vehicle', 'professional', 'meals', 'travel', 'utilities', 'other']

  const [formData, setFormData] = useState<Partial<TaxCost>>({
    category: 'professional',
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    deductible: true,
    deductionPercent: 100,
    status: 'draft',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'amount' || name === 'deductionPercent' ? parseFloat(value) : value,
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      const cost: TaxCost = {
        id: '',
        userId: user?.id || '',
        declarationId,
        category: (formData.category as any) || 'professional',
        description: formData.description || '',
        amount: formData.amount || 0,
        date: formData.date || new Date().toISOString(),
        deductible: formData.deductible !== false,
        deductionPercent: formData.deductionPercent || 100,
        status: 'draft',
      }

      // Validate
      const validation = validateTaxCost(cost)
      if (!validation.isValid) {
        const errorMap: Record<string, string> = {}
        validation.errors.forEach(err => {
          if (!errorMap[err.field]) {
            errorMap[err.field] = err.message
          }
        })
        setErrors(errorMap)
        return
      }

      // Add cost
      addCost(cost)

      // Reset form
      setFormData({
        category: 'professional',
        description: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        deductible: true,
        deductionPercent: 100,
        status: 'draft',
      })

      onSuccess?.()
    } catch (error) {
      console.error('Error adding cost:', error)
      setErrors({ general: 'Błąd podczas dodawania kosztu' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Dodaj koszt uzyskania przychodu</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {errors.general}
          </div>
        )}

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kategoria kosztu</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {getTaxCostCategoryLabel(cat)}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Opis kosztu</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Np. Zestaw narzędzi profesjonalnych do pracy..."
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kwota (PLN)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            step="0.01"
            placeholder="0.00"
          />
          {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Data poniesienia kosztu</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
        </div>

        {/* Deduction Percent */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Procent odliczenia (%)</label>
          <input
            type="number"
            name="deductionPercent"
            value={formData.deductionPercent}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            min="0"
            max="100"
            step="1"
          />
          <p className="text-gray-500 text-xs mt-1">
            Kwota do odliczenia: {formatCurrency((formData.amount || 0) * ((formData.deductionPercent || 0) / 100))}
          </p>
          {errors.deductionPercent && <p className="text-red-600 text-sm mt-1">{errors.deductionPercent}</p>}
        </div>

        {/* Deductible Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="deductible"
            name="deductible"
            checked={formData.deductible !== false}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="deductible" className="ml-2 block text-sm text-gray-700">
            Koszt podlegający odliczeniu
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {loading ? 'Dodawanie...' : 'Dodaj koszt'}
        </button>
      </form>
    </div>
  )
}
