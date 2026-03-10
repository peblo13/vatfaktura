'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { ArrowLeft, ChevronRight, ChevronLeft, Check } from 'lucide-react'
import Link from 'next/link'
import { PitDeclaration } from '@/lib/types/pit-types'
import { addPitDeclaration } from '@/lib/pit/pit-store'
import { calculatePIT } from '@/lib/pit/pit-calculator'

export default function Pit36CreatePage() {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<string[]>([])

  const [formData, setFormData] = useState({
    year: 2024,
    salaryIncome: 0,
    pensionIncome: 0,
    copyrightIncome: 0,
    rentalIncome: 0,
    capitalGains: 0,
    capitalLosses: 0,
    personalDeduction: 3600,
    reliefs: 0,
    maritalStatus: 'single' as const,
    dependents: 0,
    healthInsuranceContribution: 0,
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
      if (formData.salaryIncome < 0) newErrors.push('Dochód ze stanowiska nie może być ujemny')
      if (formData.pensionIncome < 0) newErrors.push('Emerytura/renta nie może być ujemna')
    }

    if (stepNum === 2) {
      if (formData.copyrightIncome < 0) newErrors.push('Dochód z praw autorskich nie może być ujemny')
      if (formData.rentalIncome < 0) newErrors.push('Dochód z wynajmu nie może być ujemny')
      if (formData.capitalGains < 0) newErrors.push('Zyski kapitałowe nie mogą być ujemne')
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

    const totalIncome = 
      formData.salaryIncome + 
      formData.pensionIncome + 
      formData.copyrightIncome + 
      formData.rentalIncome + 
      formData.capitalGains

    const calculatorInput = {
      year: formData.year,
      grossIncome: formData.salaryIncome + formData.pensionIncome + formData.copyrightIncome,
      businessExpenses: 0,
      personalDeductions: formData.personalDeduction,
      capitalGains: formData.capitalGains,
      capitalLosses: formData.capitalLosses,
      rentalIncome: formData.rentalIncome,
      maritalStatus: formData.maritalStatus,
      dependents: formData.dependents,
      pensionContribution: 0,
      healthInsuranceContribution: formData.healthInsuranceContribution,
      zusContribution: 0,
      reliefs: formData.reliefs,
    }

    const taxOutput = calculatePIT(calculatorInput)

    const declaration: PitDeclaration = {
      id: `pit36_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user!.id,
      type: 'PIT-36',
      year: formData.year,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      incomeFromAllSources: totalIncome,
      personalIncome: formData.salaryIncome + formData.pensionIncome,
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
    router.push(`/dashboard/pit/pit-36/${declaration.id}`)
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
          <Link href="/dashboard/pit/pit-36" className="p-2 hover:bg-card/50 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Nowa Deklaracja PIT-36</h1>
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
          {/* Step 1: Main Income */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Główne Źródła Dochodów</h2>
                <p className="text-muted-foreground">Wpisz przychody ze pracy i emerytury/renty</p>
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
                  <label className="block text-sm font-medium mb-2">Dochód ze stosunku pracy (PLN)</label>
                  <input
                    type="number"
                    name="salaryIncome"
                    value={formData.salaryIncome}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Emerytura / Renta (PLN)</label>
                  <input
                    type="number"
                    name="pensionIncome"
                    value={formData.pensionIncome}
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
                <p className="text-muted-foreground">Dodaj pozostałe źródła dochodów</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Dochód z praw autorskich (PLN)</label>
                  <input
                    type="number"
                    name="copyrightIncome"
                    value={formData.copyrightIncome}
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

          {/* Step 4: Insurance & Summary */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Ubezpieczenie i Podsumowanie</h2>
                <p className="text-muted-foreground">Dane ubezpieczenia i przegląd deklaracji</p>
              </div>

              <div className="space-y-4">
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
                      <span className="text-muted-foreground">Dochód ze pracy:</span>
                      <span className="font-medium">{formData.salaryIncome.toFixed(2)} PLN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emerytura/Renta:</span>
                      <span className="font-medium">{formData.pensionIncome.toFixed(2)} PLN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pozostałe dochody:</span>
                      <span className="font-medium">
                        {(formData.copyrightIncome + formData.rentalIncome + formData.capitalGains).toFixed(2)} PLN
                      </span>
                    </div>
                    <div className="border-t border-border/20 pt-2 mt-2 flex justify-between font-semibold">
                      <span>Przychód razem:</span>
                      <span>
                        {(formData.salaryIncome + formData.pensionIncome + formData.copyrightIncome + formData.rentalIncome + formData.capitalGains).toFixed(2)} PLN
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
