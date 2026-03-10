'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { ArrowLeft, Plus, Edit2, Trash2, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { TaxCost } from '@/lib/types/pit-types'
import { getTaxCostsByUser, addTaxCost, deleteTaxCost } from '@/lib/pit/pit-store'
import { STANDARD_DEDUCTIONS } from '@/lib/pit/tax-rates'

export default function CostsPage() {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const [mounted, setMounted] = useState(false)
  const [costs, setCosts] = useState<TaxCost[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingCost, setEditingCost] = useState<TaxCost | null>(null)

  const [formData, setFormData] = useState({
    category: 'office' as any,
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    invoiceNumber: '',
    deductible: true,
    deductionPercent: 100,
  })

  useEffect(() => {
    setMounted(true)
    if (!isLoading && !user) {
      router.push('/login')
    } else if (user) {
      setCosts(getTaxCostsByUser(user.id))
    }
  }, [user, isLoading, router])

  const handleAddCost = () => {
    if (!formData.description || formData.amount <= 0) {
      alert('Uzupełnij opisani i kwotę')
      return
    }

    const newCost: TaxCost = {
      id: `cost_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user!.id,
      declarationId: '',
      category: formData.category,
      description: formData.description,
      amount: formData.amount,
      date: formData.date,
      invoiceNumber: formData.invoiceNumber || undefined,
      deductible: formData.deductible,
      deductionPercent: formData.deductionPercent,
      status: 'draft',
    }

    addTaxCost(newCost)
    setCosts([...costs, newCost])
    setFormData({
      category: 'office',
      description: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      invoiceNumber: '',
      deductible: true,
      deductionPercent: 100,
    })
    setShowForm(false)
  }

  const handleDeleteCost = (id: string) => {
    if (confirm('Na pewno usunąć ten koszt?')) {
      deleteTaxCost(id)
      setCosts(costs.filter(c => c.id !== id))
    }
  }

  const totalCosts = costs.reduce((sum, cost) => sum + cost.amount, 0)
  const deductibleCosts = costs.reduce((sum, cost) => {
    if (cost.deductible) {
      return sum + (cost.amount * (cost.deductionPercent / 100))
    }
    return sum
  }, 0)

  if (!mounted || isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary/30 border-t-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/pit" className="p-2 hover:bg-card/50 rounded-lg transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">Zarządzanie Kosztami</h1>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
          >
            <Plus className="w-4 h-4" />
            Dodaj Koszt
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 rounded-lg border border-border/40 bg-card/30">
            <p className="text-sm text-muted-foreground mb-1">Wszystkie Koszty</p>
            <p className="text-3xl font-bold">{totalCosts.toFixed(2)} PLN</p>
            <p className="text-xs text-muted-foreground mt-1">{costs.length} pozycji</p>
          </div>

          <div className="p-6 rounded-lg border border-border/40 bg-card/30">
            <p className="text-sm text-muted-foreground mb-1">Koszty Odliczalne</p>
            <p className="text-3xl font-bold text-green-400">{deductibleCosts.toFixed(2)} PLN</p>
            <p className="text-xs text-muted-foreground mt-1">Do odliczenia</p>
          </div>

          <div className="p-6 rounded-lg border border-border/40 bg-card/30">
            <p className="text-sm text-muted-foreground mb-1">Średni Koszt</p>
            <p className="text-3xl font-bold">
              {costs.length > 0 ? (totalCosts / costs.length).toFixed(2) : '0'} PLN
            </p>
            <p className="text-xs text-muted-foreground mt-1">Na pozycję</p>
          </div>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="border border-border/40 bg-card/30 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Dodaj Nowy Koszt</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Kategoria</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                >
                  <option value="office">Biuro / Pomieszczenia</option>
                  <option value="equipment">Urządzenia i Wyposażenie</option>
                  <option value="vehicle">Pojazd</option>
                  <option value="professional">Usługi Zawodowe</option>
                  <option value="meals">Posiłki</option>
                  <option value="travel">Podróże Służbowe</option>
                  <option value="utilities">Media i Opał</option>
                  <option value="other">Inne</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Opis</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="np. Czynsz za biuro"
                  className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Kwota (PLN)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                  className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Data</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Numer Faktury (opcjonalnie)</label>
                <input
                  type="text"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                  placeholder="FV/2024/001"
                  className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Procent Odliczenia</label>
                <input
                  type="number"
                  value={formData.deductionPercent}
                  onChange={(e) => setFormData({ ...formData, deductionPercent: Math.min(100, parseFloat(e.target.value) || 0) })}
                  placeholder="100"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                />
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleAddCost}
                className="flex-1 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
              >
                Dodaj Koszt
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 px-6 py-2 border border-border/40 text-foreground rounded-lg hover:bg-card/50 transition"
              >
                Anuluj
              </button>
            </div>
          </div>
        )}

        {/* Costs List */}
        <div className="border border-border/40 bg-card/30 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Lista Kosztów</h2>

          {costs.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Brak dodanych kosztów</p>
              <button
                onClick={() => setShowForm(true)}
                className="text-primary hover:underline"
              >
                Dodaj pierwszy koszt
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {costs.map((cost) => (
                <div key={cost.id} className="p-4 rounded-lg border border-border/40 hover:bg-card/50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{cost.description}</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                          {cost.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(cost.date).toLocaleDateString('pl-PL')}
                        {cost.invoiceNumber && ` • ${cost.invoiceNumber}`}
                      </p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="font-semibold">{cost.amount.toFixed(2)} PLN</p>
                      <p className="text-xs text-muted-foreground">
                        Odliczalne: {(cost.amount * (cost.deductionPercent / 100)).toFixed(2)} PLN
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-card rounded transition text-blue-400">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCost(cost.id)}
                        className="p-2 hover:bg-card rounded transition text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Categories Info */}
        <div className="border border-border/40 bg-card/30 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Kategorie i Procenty Odliczenia</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(STANDARD_DEDUCTIONS).map(([key, deduction]) => (
              <div key={key} className="p-3 rounded-lg border border-border/40 bg-background/50">
                <p className="font-medium">{deduction.name}</p>
                <p className="text-xs text-muted-foreground mb-1">{deduction.description}</p>
                <p className="text-sm text-primary font-semibold">{deduction.deductiblePercent}% odliczalne</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
