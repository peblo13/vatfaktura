'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { ArrowLeft, FileText, ChevronRight, ChevronLeft, Check } from 'lucide-react'
import Link from 'next/link'
import { PitDeclaration } from '@/lib/types/pit-types'
import { addPitDeclaration } from '@/lib/pit/pit-store'
import { getTaxYearConfig } from '@/lib/pit/tax-rates'
import { calculatePIT } from '@/lib/pit/pit-calculator'

export default function Pit37CreatePage() {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<string[]>([])

  const [formData, setFormData] = useState({
    year: 2024,
    businessIncome: 0,
    businessExpenses: 0,
    personalIncome: 0,
    capitalGains: 0,
    capitalLosses: 0,
    rentalIncome: 0,
    personalDeduction: 0,
    reliefs: 0,
    maritalStatus: 'single' as const,
    dependents: 0,
    healthInsuranceContribution: 0,
    zusContribution: 0,
  })

  useEffect(() => {
    setMounted(true)
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const numValue = type === 'number' ? parseFloat(value) || 0 : value

    setFormData(prev => ({
      ...prev,
      [name]: numValue
    }))
  }

  const validateStep = (stepNum: number): boolean => {
    const newErrors: string[] = []

    if (stepNum === 1) {
      if (formData.businessIncome < 0) newErrors.push('Przychód biznesowy nie może być ujemny')
      if (formData.businessExpenses < 0) newErrors.push('Wydatki biznesowe nie mogą być ujemne')
      if (formData.personalIncome < 0) newErrors.push('Dochód osobisty nie może być ujemny')
    }

    if (stepNum === 2) {
      if (formData.capitalGains < 0) newErrors.push('Zyski kapitałowe nie mogą być ujemne')
      if (formData.capitalLosses < 0) newErrors.push('Straty kapitałowe nie mogą być ujemne')
      if (formData.rentalIncome < 0) newErrors.push('Dochód z wynajmu nie może być ujemny')
    }

    if (stepNum === 3) {
      if (formData.dependents < 0) newErrors.push('Liczba osób na utrzymaniu nie może być ujemna')
      if (formData.dependents > 20) newErrors.push('Liczba osób na utrzymaniu jest nierealista')
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleSubmit = () => {
    if (!validateStep(4)) return

    const totalIncome = formData.businessIncome + formData.personalIncome + formData.capitalGains + formData.rentalIncome
    const config = getTaxYearConfig(formData.year)

    const calculatorInput = {
      year: formData.year,
      grossIncome: formData.businessIncome + formData.personalIncome,
      businessExpenses: formData.businessExpenses,
      personalDeductions: formData.personalDeduction,
      capitalGains: formData.capitalGains,
      capitalLosses: formData.capitalLosses,
      rentalIncome: formData.rentalIncome,
      maritalStatus: formData.maritalStatus,
      dependents: formData.dependents,
      pensionContribution: formData.zusContribution,
      healthInsuranceContribution: formData.healthInsuranceContribution,
      zusContribution: formData.zusContribution,
      reliefs: formData.reliefs,
    }

    const taxOutput = calculatePIT(calculatorInput)

    const declaration: PitDeclaration = {
      id: `pit37_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user!.id,
      type: 'PIT-37',
      year: formData.year,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      businessIncome: formData.businessIncome,
      businessExpenses: formData.businessExpenses,
      personalIncome: formData.personalIncome,
      capitalGains: formData.capitalGains,
      capitalLosses: formData.capitalLosses,
      rentalIncome: formData.rentalIncome,
      deductions: formData.personalDeduction,
      reliefs: formData.reliefs,
      taxAmount: taxOutput.tax,
      taxToPay: taxOutput.taxToPay,
      maritalStatus: formData.maritalStatus,
    }

    addPitDeclaration(declaration)
    router.push(`/dashboard/pit/pit-37/${declaration.id}`)
  }

  if (!mounted || isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary/30 border-t-primary"></div>
      </div>
    )
  }

  const TOTAL_STEPS = 4

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/dashboard/pit/pit-37" className="p-2 hover:bg-card/50 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Nowa Deklaracja PIT-37</h1>
            <p className="text-xs text-muted-foreground">Krok {step} z {TOTAL_STEPS}</p>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-colors ${
                i + 1 <= step ? 'bg-primary' : 'bg-border/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border border-border/40 bg-card/30 rounded-lg p-6">
          {/* Step 1: Basic Income */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Przychody z Działalności</h2>
                <p className="text-muted-foreground">Wpisz przychody i wydatki z Twojej działalności biznesowej</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rok podatkowy</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  >
                    <option value={2024}>2024</option>
                    <option value={2023}>2023</option>
                    <option value={2022}>2022</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Przychód z działalności biznesowej (PLN)</label>
                  <input
                    type="number"
                    name="businessIncome"
                    value={formData.businessIncome}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Wydatki biznesowe (PLN)</label>
                  <input
                    type="number"
                    name="businessExpenses"
                    value={formData.businessExpenses}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Lub zastosuj 20% od przychodu: {Math.round(formData.businessIncome * 0.2)} PLN
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Dochód ze stosunku pracy (PLN)</label>
                  <input
                    type="number"
                    name="personalIncome"
                    value={formData.personalIncome}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>
              </div>

              {errors.length > 0 && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400 space-y-1">
                  {errors.map((error, idx) => (
                    <p key={idx}>• {error}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Other Income */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Pozostałe Przychody</h2>
                <p className="text-muted-foreground">Dodaj zyski kapitałowe i dochody z wynajmu</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Zyski kapitałowe (PLN)</label>
                  <input
                    type="number"
                    name="capitalGains"
                    value={formData.capitalGains}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Straty kapitałowe (PLN)</label>
                  <input
                    type="number"
                    name="capitalLosses"
                    value={formData.capitalLosses}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Dochód z wynajmu (PLN)</label>
                  <input
                    type="number"
                    name="rentalIncome"
                    value={formData.rentalIncome}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>
              </div>

              {errors.length > 0 && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400 space-y-1">
                  {errors.map((error, idx) => (
                    <p key={idx}>• {error}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Personal Info */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Dane Osobiste</h2>
                <p className="text-muted-foreground">Informacje o osobie podlegającej opodatkowaniu</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Stan cywilny</label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  >
                    <option value="single">Niezamężna/nieżonaty</option>
                    <option value="married">Zamężna/żonaty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Liczba osób na utrzymaniu</label>
                  <input
                    type="number"
                    name="dependents"
                    value={formData.dependents}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Ulga prorodzinna: {formData.dependents * 1188} PLN
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Osobiste odliczenia (PLN)</label>
                  <input
                    type="number"
                    name="personalDeduction"
                    value={formData.personalDeduction}
                    onChange={handleInputChange}
                    placeholder="3600"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Kwota wolna od podatku (domyślnie 3600 PLN)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ulgi podatkowe (PLN)</label>
                  <input
                    type="number"
                    name="reliefs"
                    value={formData.reliefs}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>
              </div>

              {errors.length > 0 && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400 space-y-1">
                  {errors.map((error, idx) => (
                    <p key={idx}>• {error}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Contributions & Review */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Składki i Podsumowanie</h2>
                <p className="text-muted-foreground">Wpisz składki i przejrzyj dane deklaracji</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Składka ZUS (PLN)</label>
                  <input
                    type="number"
                    name="zusContribution"
                    value={formData.zusContribution}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ubezpieczenie zdrowotne (PLN)</label>
                  <input
                    type="number"
                    name="healthInsuranceContribution"
                    value={formData.healthInsuranceContribution}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h3 className="font-semibold mb-3">Podsumowanie</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Przychód razem:</span>
                      <span className="font-medium">
                        {(formData.businessIncome + formData.personalIncome + formData.capitalGains + formData.rentalIncome).toFixed(2)} PLN
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wydatki:</span>
                      <span className="font-medium">{formData.businessExpenses.toFixed(2)} PLN</span>
                    </div>
                    <div className="border-t border-border/20 pt-2 mt-2 flex justify-between font-semibold">
                      <span>Dochód netto:</span>
                      <span>
                        {(formData.businessIncome - formData.businessExpenses + formData.personalIncome + formData.capitalGains + formData.rentalIncome).toFixed(2)} PLN
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {errors.length > 0 && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400 space-y-1">
                  {errors.map((error, idx) => (
                    <p key={idx}>• {error}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={handlePrevious}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-2 border border-border/40 text-foreground rounded-lg hover:bg-card/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Wstecz
            </button>

            {step < TOTAL_STEPS ? (
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
              >
                Dalej
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition"
              >
                <Check className="w-4 h-4" />
                Utwórz Deklarację
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
