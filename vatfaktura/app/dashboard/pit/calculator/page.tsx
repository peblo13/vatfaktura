'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { Calculator, ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'
import { PitCalculatorInput, PitCalculatorOutput } from '@/lib/types/pit-types'
import { calculatePIT, validateCalculatorInput } from '@/lib/pit/pit-calculator'
import { getTaxYearConfig } from '@/lib/pit/tax-rates'

export default function PitCalculatorPage() {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const [mounted, setMounted] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [output, setOutput] = useState<PitCalculatorOutput | null>(null)

  const [input, setInput] = useState<PitCalculatorInput>({
    year: 2024,
    grossIncome: 0,
    businessExpenses: 0,
    personalDeductions: 0,
    capitalGains: 0,
    capitalLosses: 0,
    rentalIncome: 0,
    maritalStatus: 'single',
    dependents: 0,
    pensionContribution: 0,
    healthInsuranceContribution: 0,
    zusContribution: 0,
    reliefs: 0,
  })

  useEffect(() => {
    setMounted(true)
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  const handleCalculate = () => {
    const validation = validateCalculatorInput(input)
    if (!validation.valid) {
      setErrors(validation.errors)
      setOutput(null)
      return
    }

    setErrors([])
    const result = calculatePIT(input)
    setOutput(result)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const numValue = type === 'number' ? parseFloat(value) || 0 : value

    setInput(prev => ({
      ...prev,
      [name]: numValue
    }))
  }

  const taxConfig = getTaxYearConfig(input.year)

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-card/50 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Kalkulator PIT</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div className="border border-border/40 bg-card/30 rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Dane wejściowe</h2>

              {/* Year Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rok podatkowy</label>
                <select
                  name="year"
                  value={input.year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                >
                  <option value={2024}>2024</option>
                  <option value={2023}>2023</option>
                  <option value={2022}>2022</option>
                </select>
              </div>

              {/* Income Section */}
              <div className="mb-6 pb-6 border-b border-border/40">
                <h3 className="text-sm font-semibold mb-3 text-accent">Przychody</h3>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Dochód brutto</label>
                  <input
                    type="number"
                    name="grossIncome"
                    value={input.grossIncome}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Dochód z wynajmu</label>
                  <input
                    type="number"
                    name="rentalIncome"
                    value={input.rentalIncome}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Zyski kapitałowe</label>
                  <input
                    type="number"
                    name="capitalGains"
                    value={input.capitalGains}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Straty kapitałowe</label>
                  <input
                    type="number"
                    name="capitalLosses"
                    value={input.capitalLosses}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>
              </div>

              {/* Business Expenses */}
              <div className="mb-6 pb-6 border-b border-border/40">
                <h3 className="text-sm font-semibold mb-3 text-accent">Koszty biznesowe</h3>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Wydatki biznesowe (opcjonalnie)</label>
                  <input
                    type="number"
                    name="businessExpenses"
                    value={input.businessExpenses}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>

                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-muted-foreground">
                  <p>Lub: {(taxConfig.businessExpensesPercent)}% kwoty dochodu ({Math.round(input.grossIncome * (taxConfig.businessExpensesPercent / 100))} PLN)</p>
                </div>
              </div>

              {/* Personal Info */}
              <div className="mb-6 pb-6 border-b border-border/40">
                <h3 className="text-sm font-semibold mb-3 text-accent">Informacje osobiste</h3>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Stan cywilny</label>
                  <select
                    name="maritalStatus"
                    value={input.maritalStatus}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  >
                    <option value="single">Niezamężna/nieżonaty</option>
                    <option value="married">Zamężna/żonaty</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Liczba osób na utrzymaniu</label>
                  <input
                    type="number"
                    name="dependents"
                    value={input.dependents}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>
              </div>

              {/* Contributions */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 text-accent">Składki i ubezpieczenia</h3>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Składka emerytalna ZUS</label>
                  <input
                    type="number"
                    name="zusContribution"
                    value={input.zusContribution}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Ubezpieczenie zdrowotne</label>
                  <input
                    type="number"
                    name="healthInsuranceContribution"
                    value={input.healthInsuranceContribution}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Ulgi podatkowe</label>
                  <input
                    type="number"
                    name="reliefs"
                    value={input.reliefs}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>
              </div>

              {/* Errors */}
              {errors.length > 0 && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400 space-y-1">
                  {errors.map((error, idx) => (
                    <p key={idx}>• {error}</p>
                  ))}
                </div>
              )}

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition"
              >
                Oblicz podatek
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {output && (
              <>
                {/* Summary Card */}
                <div className="border border-border/40 bg-card/30 rounded-lg p-6">
                  <h2 className="text-lg font-bold mb-6">Wynik obliczenia</h2>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Podatek do zapłaty</p>
                      <div className="text-4xl font-bold text-primary">{output.taxToPay.toFixed(2)} PLN</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg border border-border/40 bg-card/50">
                        <p className="text-xs text-muted-foreground">Dochód do opodatkowania</p>
                        <p className="font-bold">{output.incomeAfterDeduction.toFixed(2)} PLN</p>
                      </div>
                      <div className="p-3 rounded-lg border border-border/40 bg-card/50">
                        <p className="text-xs text-muted-foreground">Efektywna stawka</p>
                        <p className="font-bold">{output.effectiveTaxRate.toFixed(2)}%</p>
                      </div>
                      <div className="p-3 rounded-lg border border-border/40 bg-card/50">
                        <p className="text-xs text-muted-foreground">Ulgi podatkowe</p>
                        <p className="font-bold">{output.reliefs.toFixed(2)} PLN</p>
                      </div>
                      <div className="p-3 rounded-lg border border-border/40 bg-card/50">
                        <p className="text-xs text-muted-foreground">Razem do zapłaty</p>
                        <p className="font-bold">{output.totalPayable.toFixed(2)} PLN</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="border border-border/40 bg-card/30 rounded-lg p-6">
                  <h3 className="font-bold mb-4">Szczegółowy rozkład</h3>
                  
                  <div className="space-y-2 text-sm">
                    {Object.entries(output.breakdown).map(([key, value]) => {
                      if (value === 0 || typeof value !== 'number') return null
                      const label = key
                        .replace(/([A-Z])/g, ' $1')
                        .toLowerCase()
                        .replace(/^./, c => c.toUpperCase())
                      
                      return (
                        <div key={key} className="flex items-center justify-between py-2 border-b border-border/20">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium">{value.toFixed(2)} PLN</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Tips */}
                <div className="border border-border/40 bg-card/30 rounded-lg p-6">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div className="text-sm space-y-2 text-muted-foreground">
                      <p><strong>Wskazówka:</strong> Kalkulator jest przybliżony. Konsultuj się z doradcą podatkowym dla ostatecznego obliczenia.</p>
                      <p>Stawki mogą zmienić się w przyszłych latach podatkowych.</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!output && (
              <div className="border border-border/40 bg-card/30 rounded-lg p-12 text-center">
                <Calculator className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">Uzupełnij formularz i kliknij "Oblicz podatek"</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
