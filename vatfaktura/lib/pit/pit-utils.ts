import { PitDeclaration, TaxCost } from '../types/pit-types'

// Formatting utilities
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
  }).format(value)
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d)
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

// PIT Declaration utilities
export function getPitDeclarationStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: 'Szkic',
    completed: 'Ukończona',
    submitted: 'Wysłana',
    approved: 'Zatwierdzona',
  }
  return labels[status] || status
}

export function getPitDeclarationTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'PIT-37': 'PIT-37 (przedsiębiorca)',
    'PIT-36': 'PIT-36 (osoba fizyczna)',
  }
  return labels[type] || type
}

export function calculateTotalIncome(declaration: PitDeclaration): number {
  let total = declaration.personalIncome
  if (declaration.businessIncome) total += declaration.businessIncome
  total += declaration.capitalGains
  total += declaration.rentalIncome
  return total
}

export function calculateTotalDeductions(declaration: PitDeclaration): number {
  return declaration.personalDeduction + declaration.reliefs
}

export function getDeclarationSummary(declaration: PitDeclaration): {
  totalIncome: number
  totalDeductions: number
  taxableIncome: number
  taxToPayMessage: string
  effectiveTaxRate: number
} {
  const totalIncome = calculateTotalIncome(declaration)
  const totalDeductions = calculateTotalDeductions(declaration)
  const taxableIncome = Math.max(0, totalIncome - totalDeductions)
  const taxToPayMessage =
    declaration.taxToPay > 0 ? `Do zapłaty: ${formatCurrency(declaration.taxToPay)}` : 'Brak podatku do zapłaty'

  const effectiveTaxRate = totalIncome > 0 ? (declaration.taxAmount / totalIncome) * 100 : 0

  return {
    totalIncome,
    totalDeductions,
    taxableIncome,
    taxToPayMessage,
    effectiveTaxRate,
  }
}

// Tax Cost utilities
export function getTaxCostCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    office: 'Biuro',
    equipment: 'Wyposażenie',
    vehicle: 'Pojazd',
    professional: 'Profesjonalne',
    meals: 'Posiłki',
    travel: 'Podróże',
    utilities: 'Media',
    other: 'Inne',
  }
  return labels[category] || category
}

export function getTaxCostStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: 'Szkic',
    included: 'Włączona',
    archived: 'Archiwizowana',
  }
  return labels[status] || status
}

export function calculateCostDeductionAmount(cost: TaxCost): number {
  return Math.round(cost.amount * (cost.deductionPercent / 100))
}

export function calculateTotalCostDeductions(costs: TaxCost[]): number {
  return costs.reduce((sum, cost) => {
    if (cost.deductible && cost.status === 'included') {
      return sum + calculateCostDeductionAmount(cost)
    }
    return sum
  }, 0)
}

export function calculateDepreciation(cost: TaxCost, year: number): number {
  if (!cost.hasDepreciation || !cost.depreciation) return 0

  const depreciation = cost.depreciation
  const initialValue = cost.amount
  const residualValue = depreciation.residualValue || 0
  const depreciableValue = initialValue - residualValue
  const yearsTotal = depreciation.years
  const ratePerYear = depreciation.rate / 100

  if (depreciation.method === 'linear') {
    return Math.round(depreciableValue / yearsTotal)
  } else if (depreciation.method === 'accelerated') {
    // Accelerated depreciation: using double declining balance
    const rate = (2 / yearsTotal) * ratePerYear
    return Math.round(depreciableValue * rate * (year / yearsTotal))
  }

  return 0
}

// Income and tax utilities
export function calculateTaxBracketInfo(
  income: number,
  year: number
): { bracket: '12%' | '32%'; limitReached: boolean; amountInBracket: number } {
  const limit = year === 2024 ? 123000 : year === 2023 ? 120000 : 120000

  if (income <= limit) {
    return {
      bracket: '12%',
      limitReached: false,
      amountInBracket: income,
    }
  }

  return {
    bracket: '32%',
    limitReached: true,
    amountInBracket: income - limit,
  }
}

export function calculateMonthlyTaxAdvance(annualTax: number): number {
  return Math.round(annualTax / 12)
}

export function calculateQuarterlyTaxAdvance(annualTax: number): number {
  return Math.round(annualTax / 4)
}

// Depreciation schedules
export function generateDepreciationSchedule(
  initialValue: number,
  yearsTotal: number,
  method: 'linear' | 'accelerated',
  residualValue = 0
): Array<{ year: number; depreciation: number; bookValue: number }> {
  const schedule: Array<{ year: number; depreciation: number; bookValue: number }> = []
  const depreciableValue = initialValue - residualValue
  let bookValue = initialValue

  for (let year = 1; year <= yearsTotal; year++) {
    let yearDepreciation = 0

    if (method === 'linear') {
      yearDepreciation = Math.round(depreciableValue / yearsTotal)
    } else if (method === 'accelerated') {
      const rate = 2 / yearsTotal
      yearDepreciation = Math.round(bookValue * rate)
    }

    bookValue = Math.max(residualValue, bookValue - yearDepreciation)

    schedule.push({
      year,
      depreciation: yearDepreciation,
      bookValue,
    })
  }

  return schedule
}

// Comparison and analysis utilities
export function comparePitDeclarations(
  decl1: PitDeclaration,
  decl2: PitDeclaration
): {
  incomeChange: number
  taxChange: number
  ratioChange: number
} {
  const income1 = calculateTotalIncome(decl1)
  const income2 = calculateTotalIncome(decl2)

  const incomeChange = income2 - income1
  const taxChange = decl2.taxAmount - decl1.taxAmount
  const ratioChange = (decl2.taxAmount / income2 - decl1.taxAmount / income1) * 100

  return {
    incomeChange,
    taxChange,
    ratioChange: isFinite(ratioChange) ? ratioChange : 0,
  }
}

// Scenario helpers
export function describeOptimizationTip(income: number, year: number): string {
  const taxBracketInfo = calculateTaxBracketInfo(income, year)

  if (!taxBracketInfo.limitReached && income > 100000) {
    return 'Zmblużasz się do wyższego progu podatkowego (32%). Rozważ optymalizację kosztów.'
  }

  if (income < 50000) {
    return 'Twoje dochody są niskie. Sprawdź czy masz prawo do dodatkowych ulg podatkowych.'
  }

  return 'Twoja sytuacja podatkowa jest standardowa.'
}

// PDF/Export utilities
export function generatePitDeclarationFileName(declaration: PitDeclaration, format = 'pdf'): string {
  return `PIT-${declaration.type}-${declaration.year}-${declaration.id}.${format}`
}

export function generateCostReportFileName(userId: string, format = 'pdf'): string {
  return `Koszty-Uzyskania-Przychodu-${new Date().getFullYear()}.${format}`
}

export function generateJpkFileName(year: number, quarter?: number): string {
  if (quarter) {
    return `JPK-V7-${year}-Q${quarter}.xml`
  }
  return `JPK-V7-${year}.xml`
}

// Validation helpers
export function isValidNIP(nip: string): boolean {
  // Polish NIP format: 10 digits, specific checksum algorithm
  if (!/^\d{10}$/.test(nip)) return false

  const digits = nip.split('').map(Number)
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
  let sum = 0

  for (let i = 0; i < 10; i++) {
    sum += digits[i] * weights[i]
  }

  return sum % 10 === 0
}

export function isValidPESEL(pesel: string): boolean {
  // Polish PESEL format: 11 digits, specific checksum algorithm
  if (!/^\d{11}$/.test(pesel)) return false

  const digits = pesel.split('').map(Number)
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
  let sum = 0

  for (let i = 0; i < 10; i++) {
    sum += digits[i] * weights[i]
  }

  const checksum = (10 - (sum % 10)) % 10
  return digits[10] === checksum
}

// Helper to determine if year requires special calculation
export function isSpecialTaxYear(year: number): boolean {
  // Years with special tax changes
  const specialYears = [2022, 2023, 2024]
  return specialYears.includes(year)
}

// Bank Holiday calculations (for payment deadlines)
export function calculatePitDeadline(year: number, type: 'annual' | 'advance'): Date {
  if (type === 'annual') {
    // Annual PIT deadline: April 30
    return new Date(year + 1, 3, 30)
  }

  // Quarterly advance: last day of following month
  const currentMonth = new Date().getMonth()
  const deadline = new Date()
  deadline.setMonth(currentMonth + 1, 0) // Last day of next month

  return deadline
}
