import { TaxYearConfig, ZusOption } from './types/pit-types'

// Polish tax rates and limits for 2024
export const TAX_YEAR_2024: TaxYearConfig = {
  year: 2024,
  personalDeductionAmount: 3600, // kwota wolna
  minBusinessExpensesDeduction: 300,
  maxBusinessExpensesDeduction: 32730,
  businessExpensesPercent: 20, // default 20% of income
  tax1Percent: 12, // First tax bracket
  tax1Limit: 123000, // Income limit for 12% tax
  tax2Percent: 32, // Second tax bracket
  childReliefAmount: 1188, // per child per year
  childReliefUpToYear: 18, // up to age 18 (or 25 if studying)
}

export const TAX_YEAR_2023: TaxYearConfig = {
  year: 2023,
  personalDeductionAmount: 3600,
  minBusinessExpensesDeduction: 300,
  maxBusinessExpensesDeduction: 32730,
  businessExpensesPercent: 20,
  tax1Percent: 12,
  tax1Limit: 120000,
  tax2Percent: 32,
  childReliefAmount: 1188,
  childReliefUpToYear: 18,
}

export const TAX_YEAR_2022: TaxYearConfig = {
  year: 2022,
  personalDeductionAmount: 3600,
  minBusinessExpensesDeduction: 300,
  maxBusinessExpensesDeduction: 32730,
  businessExpensesPercent: 20,
  tax1Percent: 12,
  tax1Limit: 120000,
  tax2Percent: 32,
  childReliefAmount: 1188,
  childReliefUpToYear: 18,
}

export function getTaxYearConfig(year: number): TaxYearConfig {
  switch (year) {
    case 2024:
      return TAX_YEAR_2024
    case 2023:
      return TAX_YEAR_2023
    case 2022:
      return TAX_YEAR_2022
    default:
      return TAX_YEAR_2024 // Default to latest
  }
}

// ZUS (Polish Social Security) Options
export const ZUS_OPTIONS: ZusOption[] = [
  {
    id: 'standard',
    name: 'Standardowa',
    description: 'Standardowa opłacana składka ZUS',
    pensionPercent: 9.76,
    disabilityPercent: 1.5,
    sickLeavePercent: 2.45,
    totalPercent: 13.71,
    minAmount: 0,
  },
  {
    id: 'malazus',
    name: 'Mała ZUS',
    description: 'Preferencyjnie dla młodych i startupów',
    pensionPercent: 8.99,
    disabilityPercent: 1.5,
    sickLeavePercent: 0,
    totalPercent: 10.49,
    minAmount: 0,
  },
  {
    id: 'malazus-jakość',
    name: 'Mała ZUS Jakość',
    description: 'Mała ZUS bez ubezpieczenia chorobowego',
    pensionPercent: 8.99,
    disabilityPercent: 1.5,
    sickLeavePercent: 0,
    totalPercent: 10.49,
    minAmount: 0,
  },
  {
    id: 'bez-zu',
    name: 'Bez ubezpieczenia chorobowego',
    description: 'Opcja bez ubezpieczenia na wypadek choroby',
    pensionPercent: 9.76,
    disabilityPercent: 1.5,
    sickLeavePercent: 0,
    totalPercent: 11.26,
    minAmount: 0,
  },
]

export function getZusOption(optionId: string): ZusOption | undefined {
  return ZUS_OPTIONS.find(opt => opt.id === optionId)
}

// Health Insurance contribution (contribution to health insurance fund)
export const HEALTH_INSURANCE_RATE = 9 // 9% of income

// Family Reliefs
export const FAMILY_RELIEFS = {
  mariedCouple: 3600, // Relief for married couple filing jointly
  childRelief: 1188, // Per child per year (can be higher if conditions met)
  pensionerRelief: 2000, // For pensioners
  disabledPersonRelief: 16000, // For disabled person
}

// Standard deductions per profession/activity
export const PROFESSIONAL_DEDUCTIONS = {
  artist: 0.2, // 20%
  healthProfessional: 0.2,
  engineer: 0.2,
  lawyer: 0.2,
  accountant: 0.2,
  other: 0.2, // Default 20%
  minimum: 300,
  maximum: 32730,
}

// Capital Gains Tax Rate
export const CAPITAL_GAINS_TAX_RATE = 0.19 // 19% PIT on capital gains

// Rental Income deduction percentage
export const RENTAL_INCOME_DEDUCTION_PERCENT = 0.2 // 20%

// Dividend Tax Rate (if applicable)
export const DIVIDEND_TAX_RATE = 0.19 // 19%

// Interest Income Tax Rate (if applicable)
export const INTEREST_INCOME_TAX_RATE = 0.19 // 19%

// Helper functions for calculations
export function calculateIncomeTax(taxableIncome: number, year: number = 2024): number {
  const config = getTaxYearConfig(year)

  if (taxableIncome <= 0) return 0

  let tax = 0

  // First bracket: 12% up to limit
  if (taxableIncome <= config.tax1Limit) {
    tax = taxableIncome * (config.tax1Percent / 100)
  } else {
    // First bracket tax
    tax = config.tax1Limit * (config.tax1Percent / 100)

    // Second bracket tax
    const remainingIncome = taxableIncome - config.tax1Limit
    tax += remainingIncome * (config.tax2Percent / 100)
  }

  return Math.round(tax)
}

export function getPersonalDeduction(year: number = 2024): number {
  const config = getTaxYearConfig(year)
  return config.personalDeductionAmount
}

export function calculateChildRelief(numberOfChildren: number, year: number = 2024): number {
  const config = getTaxYearConfig(year)
  return numberOfChildren * config.childReliefAmount
}

export function getMinimumBusinessExpensesDeduction(year: number = 2024): number {
  const config = getTaxYearConfig(year)
  return config.minBusinessExpensesDeduction
}

export function getMaximumBusinessExpensesDeduction(year: number = 2024): number {
  const config = getTaxYearConfig(year)
  return config.maxBusinessExpensesDeduction
}

export function calculateBusinessExpensesDeduction(grossIncome: number, year: number = 2024): number {
  const config = getTaxYearConfig(year)
  const percent = config.businessExpensesPercent / 100
  const deduction = Math.round(grossIncome * percent)

  // Clamp between min and max
  return Math.max(config.minBusinessExpensesDeduction, Math.min(deduction, config.maxBusinessExpensesDeduction))
}

export function calculateEffectiveTaxRate(tax: number, income: number): number {
  if (income <= 0) return 0
  return (tax / income) * 100
}
