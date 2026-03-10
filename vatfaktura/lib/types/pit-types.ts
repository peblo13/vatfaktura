// PIT Declaration Types
export interface PitDeclaration {
  id: string
  userId: string
  type: 'PIT-37' | 'PIT-36'
  year: number
  status: 'draft' | 'completed' | 'submitted' | 'approved'
  createdAt: string
  updatedAt: string
  submittedAt?: string

  // PIT-37 specific (entrepreneur income)
  businessIncome?: number
  businessExpenses?: number
  businessIncomeDeduction?: number // 20% or specific amount

  // PIT-36 specific (personal income)
  incomeFromAllSources?: number

  // Common fields
  personalIncome: number // salary, etc.
  capitalGains: number
  capitalLosses: number
  rentalIncome: number

  // Reliefs and deductions
  personalDeduction: number // kwota wolna
  reliefs: number // ulgi podatkowe (rodzina, niepełnosprawność, etc.)
  healthInsurancePayable: number

  // Calculated
  taxableIncome: number
  taxAmount: number
  taxToPay: number

  // E-podatki
  epodatkiReferenceNumber?: string
  jpkExportedAt?: string

  // Family info
  maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed'
  dependents?: number
}

// Tax Cost Management
export interface TaxCost {
  id: string
  userId: string
  declarationId: string

  category: 'office' | 'equipment' | 'vehicle' | 'professional' | 'meals' | 'travel' | 'utilities' | 'other'
  description: string
  amount: number
  date: string
  invoiceNumber?: string

  // Deductibility
  deductible: boolean
  deductionPercent: number // 0-100

  // Depreciation info
  hasDepreciation?: boolean
  depreciation?: {
    method: 'linear' | 'accelerated'
    rate: number // percentage
    years: number
    residualValue?: number
  }

  status: 'draft' | 'included' | 'archived'
}

// PIT Calculator Input
export interface PitCalculatorInput {
  year: number

  // Income
  grossIncome: number
  businessExpenses?: number
  personalDeductions: number
  capitalGains: number
  capitalLosses: number
  rentalIncome: number

  // Personal info
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed'
  dependents: number

  // Insurance & contributions
  pensionContribution: number
  healthInsuranceContribution: number
  zusContribution: number

  // Other deductions
  reliefs: number
  creditForChildren?: number
}

// PIT Calculator Output
export interface PitCalculatorOutput {
  incomeBeforeTax: number
  personalDeduction: number
  incomeAfterDeduction: number
  capitalGainsTax: number

  taxableIncome: number
  tax: number
  reliefs: number
  taxAfterReliefs: number

  healthInsurancePayable: number
  totalPayable: number

  effectiveTaxRate: number
  marginTaxRate: number

  breakdown: {
    [key: string]: number
  }
}

// JPK-V7 Report (VAT + PIT integrated)
export interface JpkV7Report {
  id: string
  userId: string
  year: number
  quarter?: number
  month?: number

  // VAT Summary
  vatSummary: {
    totalVatSales: number
    totalVatTax: number
    totalVatPurchases: number
    totalVatDeduction: number
    vatToPay: number
  }

  // PIT Summary
  pitSummary: {
    totalIncome: number
    totalExpenses: number
    taxableIncome: number
    tax: number
  }

  // Metadata
  generatedAt: string
  exportedAt?: string
  exportFormat: 'xml' | 'json' | 'pdf'
  status: 'draft' | 'generated' | 'exported' | 'sent'
}

// E-podatki Submission
export interface EpodatkiSubmission {
  id: string
  userId: string
  declarationId: string

  declarationType: 'PIT-37' | 'PIT-36' | 'JPK-V7'
  status: 'draft' | 'queued' | 'sent' | 'accepted' | 'rejected'

  submittedAt?: string
  referenceNumber?: string
  errorMessage?: string

  xmlData: string
  responseData?: Record<string, any>

  retryCount: number
  lastRetryAt?: string
}

// Tax Year Configuration
export interface TaxYearConfig {
  year: number
  personalDeductionAmount: number // kwota wolna
  minBusinessExpensesDeduction: number
  maxBusinessExpensesDeduction: number
  businessExpensesPercent: number
  tax1Percent: number // 12%
  tax1Limit: number // 123,000 PLN
  tax2Percent: number // 32%
  childReliefAmount: number
  childReliefUpToYear: number
}

// ZUS Options
export interface ZusOption {
  id: string
  name: string
  description: string
  pensionPercent: number
  disabilityPercent: number
  sickLeavePercent: number
  totalPercent: number
  minAmount?: number
  maxAmount?: number
}

// PIT Store State
export interface PitStoreState {
  declarations: PitDeclaration[]
  costs: TaxCost[]
  jpkReports: JpkV7Report[]
  submissions: EpodatkiSubmission[]
  calculatorHistory: Array<{
    id: string
    userId: string
    input: PitCalculatorInput
    output: PitCalculatorOutput
    calculatedAt: string
  }>
}
