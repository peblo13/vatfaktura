import { PitCalculatorInput, PitCalculatorOutput } from '../types/pit-types'
import {
  getTaxYearConfig,
  calculateIncomeTax,
  getPersonalDeduction,
  calculateChildRelief,
  calculateBusinessExpensesDeduction,
  calculateEffectiveTaxRate,
  HEALTH_INSURANCE_RATE,
  CAPITAL_GAINS_TAX_RATE,
  RENTAL_INCOME_DEDUCTION_PERCENT,
  getZusOption,
} from './tax-rates'

export class PitCalculator {
  private input: PitCalculatorInput
  private output: PitCalculatorOutput

  constructor(input: PitCalculatorInput) {
    this.input = input
    this.output = {
      incomeBeforeTax: 0,
      personalDeduction: 0,
      incomeAfterDeduction: 0,
      capitalGainsTax: 0,
      taxableIncome: 0,
      tax: 0,
      reliefs: 0,
      taxAfterReliefs: 0,
      healthInsurancePayable: 0,
      totalPayable: 0,
      effectiveTaxRate: 0,
      marginTaxRate: 0,
      breakdown: {},
    }
  }

  calculate(): PitCalculatorOutput {
    this.calculateIncomeBeforeTax()
    this.calculatePersonalDeduction()
    this.calculateIncomeAfterDeduction()
    this.calculateCapitalGainsTax()
    this.calculateTaxableIncome()
    this.calculateTax()
    this.applyReliefs()
    this.calculateHealthInsurance()
    this.calculateTotalPayable()
    this.calculateEffectiveRate()

    return this.output
  }

  private calculateIncomeBeforeTax(): void {
    let income = this.input.grossIncome

    // Subtract business expenses if provided
    if (this.input.businessExpenses && this.input.businessExpenses > 0) {
      income -= this.input.businessExpenses
    }

    // Add other income sources
    income += this.input.capitalGains
    income += this.input.rentalIncome

    // Subtract capital losses
    income -= this.input.capitalLosses

    this.output.incomeBeforeTax = Math.max(0, income)
    this.output.breakdown['incomeBeforeTax'] = this.output.incomeBeforeTax
  }

  private calculatePersonalDeduction(): void {
    const config = getTaxYearConfig(this.input.year)
    const deduction = config.personalDeductionAmount

    // Personal deduction is limited to income
    this.output.personalDeduction = Math.min(deduction, this.output.incomeBeforeTax)
    this.output.breakdown['personalDeduction'] = this.output.personalDeduction
  }

  private calculateIncomeAfterDeduction(): void {
    this.output.incomeAfterDeduction = Math.max(0, this.output.incomeBeforeTax - this.output.personalDeduction)
    this.output.breakdown['incomeAfterDeduction'] = this.output.incomeAfterDeduction
  }

  private calculateCapitalGainsTax(): void {
    if (this.input.capitalGains > 0) {
      this.output.capitalGainsTax = Math.round(this.input.capitalGains * CAPITAL_GAINS_TAX_RATE)
      this.output.breakdown['capitalGainsTax'] = this.output.capitalGainsTax
    }
  }

  private calculateTaxableIncome(): void {
    // In Poland, capital gains are taxed separately, so they're included in income
    // but also taxed separately with a flat 19% rate

    let taxableIncome = this.output.incomeAfterDeduction

    // If there's rental income, apply deduction
    if (this.input.rentalIncome > 0) {
      const rentalDeduction = Math.round(this.input.rentalIncome * RENTAL_INCOME_DEDUCTION_PERCENT)
      taxableIncome = Math.max(0, taxableIncome - rentalDeduction)
    }

    // Subtract business expense deduction if using 20% method
    if (this.input.businessExpenses === undefined || this.input.businessExpenses === 0) {
      const businessDeduction = calculateBusinessExpensesDeduction(this.output.incomeBeforeTax, this.input.year)
      taxableIncome = Math.max(0, taxableIncome - businessDeduction)
      this.output.breakdown['businessExpensesDeduction'] = businessDeduction
    }

    // Subtract personal deductions (if not already done)
    taxableIncome = Math.max(0, taxableIncome - this.input.personalDeductions)

    this.output.taxableIncome = taxableIncome
    this.output.breakdown['taxableIncome'] = this.output.taxableIncome
  }

  private calculateTax(): void {
    const tax = calculateIncomeTax(this.output.taxableIncome, this.input.year)
    this.output.tax = tax
    this.output.breakdown['tax'] = tax

    // Margin tax rate (rate on next PLN earned)
    const config = getTaxYearConfig(this.input.year)
    this.output.marginTaxRate = this.output.taxableIncome > config.tax1Limit ? config.tax2Percent : config.tax1Percent
  }

  private applyReliefs(): void {
    let reliefs = this.input.reliefs

    // Add child reliefs
    const childRelief = calculateChildRelief(this.input.dependents, this.input.year)
    reliefs += childRelief
    this.output.breakdown['childRelief'] = childRelief

    // For married couples filing jointly (not implemented in this basic version)
    // This would need additional logic

    this.output.reliefs = reliefs
    this.output.taxAfterReliefs = Math.max(0, this.output.tax - reliefs)
    this.output.breakdown['reliefs'] = reliefs
  }

  private calculateHealthInsurance(): void {
    // Health insurance contribution is calculated on gross income
    // Rate is 9% of income, but is deductible from the tax
    const healthInsurance = Math.round(this.input.healthInsuranceContribution || 0)

    this.output.healthInsurancePayable = healthInsurance
    this.output.breakdown['healthInsurancePayable'] = healthInsurance
  }

  private calculateTotalPayable(): void {
    let totalPayable = this.output.taxAfterReliefs

    // Add capital gains tax
    totalPayable += this.output.capitalGainsTax

    // Add ZUS contributions if applicable
    const zusContribution = Math.round(this.input.zusContribution || 0)
    totalPayable += zusContribution

    // Add health insurance
    totalPayable += this.output.healthInsurancePayable

    // Subtract pension contributions (they reduce tax)
    const pensionContribution = Math.round(this.input.pensionContribution || 0)
    totalPayable = Math.max(0, totalPayable - pensionContribution)

    this.output.totalPayable = totalPayable
    this.output.breakdown['totalPayable'] = this.output.totalPayable
  }

  private calculateEffectiveRate(): void {
    if (this.output.incomeBeforeTax > 0) {
      this.output.effectiveTaxRate = calculateEffectiveTaxRate(
        this.output.taxAfterReliefs,
        this.output.incomeBeforeTax
      )
    }
  }

  // Static helper methods
  static calculateFromInput(input: PitCalculatorInput): PitCalculatorOutput {
    const calculator = new PitCalculator(input)
    return calculator.calculate()
  }

  static calculateBusinessExpensesDeduction(income: number, year: number): number {
    return calculateBusinessExpensesDeduction(income, year)
  }

  static calculateChildRelief(children: number, year: number): number {
    return calculateChildRelief(children, year)
  }

  static calculateZusContribution(income: number, optionId: string = 'standard'): number {
    const option = getZusOption(optionId)
    if (!option) return 0

    const contribution = Math.round(income * (option.totalPercent / 100))
    return contribution
  }

  static calculateHealthInsuranceContribution(income: number): number {
    return Math.round(income * (HEALTH_INSURANCE_RATE / 100))
  }

  static estimateTaxReturn(input: PitCalculatorInput): number {
    const output = PitCalculator.calculateFromInput(input)
    const totalPaid = Math.round(input.healthInsuranceContribution + input.pensionContribution)
    const taxDue = output.taxAfterReliefs

    return totalPaid - taxDue
  }

  // Scenario analysis
  static compareScenarios(baseInput: PitCalculatorInput, scenarios: Record<string, Partial<PitCalculatorInput>>): Record<string, PitCalculatorOutput> {
    const results: Record<string, PitCalculatorOutput> = {}

    for (const [name, changes] of Object.entries(scenarios)) {
      const input = { ...baseInput, ...changes }
      results[name] = PitCalculator.calculateFromInput(input)
    }

    return results
  }
}

// Export helper function for easy use
export function calculatePIT(input: PitCalculatorInput): PitCalculatorOutput {
  return PitCalculator.calculateFromInput(input)
}
