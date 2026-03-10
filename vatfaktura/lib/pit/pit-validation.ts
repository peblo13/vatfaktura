import { PitDeclaration, TaxCost, PitCalculatorInput, JpkV7Report } from '../types/pit-types'

export interface ValidationError {
  field: string
  message: string
  severity: 'error' | 'warning'
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// ===== PIT DECLARATION VALIDATION =====

export function validatePitDeclaration(declaration: PitDeclaration): ValidationResult {
  const errors: ValidationError[] = []

  // Required fields
  if (!declaration.userId) {
    errors.push({ field: 'userId', message: 'User ID is required', severity: 'error' })
  }

  if (!declaration.type || !['PIT-37', 'PIT-36'].includes(declaration.type)) {
    errors.push({ field: 'type', message: 'Invalid declaration type', severity: 'error' })
  }

  if (!declaration.year || declaration.year < 2022 || declaration.year > new Date().getFullYear() + 1) {
    errors.push({ field: 'year', message: 'Invalid tax year', severity: 'error' })
  }

  if (!declaration.status || !['draft', 'completed', 'submitted', 'approved'].includes(declaration.status)) {
    errors.push({ field: 'status', message: 'Invalid status', severity: 'error' })
  }

  // Income validation
  if (declaration.personalIncome < 0) {
    errors.push({ field: 'personalIncome', message: 'Personal income cannot be negative', severity: 'error' })
  }

  if (declaration.businessIncome !== undefined && declaration.businessIncome < 0) {
    errors.push({ field: 'businessIncome', message: 'Business income cannot be negative', severity: 'error' })
  }

  if (declaration.capitalGains < 0) {
    errors.push({ field: 'capitalGains', message: 'Capital gains cannot be negative', severity: 'error' })
  }

  if (declaration.capitalGains > 0 && declaration.capitalLosses > declaration.capitalGains) {
    errors.push({ field: 'capitalLosses', message: 'Capital losses cannot exceed capital gains', severity: 'warning' })
  }

  if (declaration.rentalIncome < 0) {
    errors.push({ field: 'rentalIncome', message: 'Rental income cannot be negative', severity: 'error' })
  }

  // Expenses validation
  if (declaration.businessExpenses !== undefined && declaration.businessExpenses < 0) {
    errors.push({ field: 'businessExpenses', message: 'Business expenses cannot be negative', severity: 'error' })
  }

  if (
    declaration.businessExpenses &&
    declaration.businessIncome &&
    declaration.businessExpenses > declaration.businessIncome
  ) {
    errors.push({ field: 'businessExpenses', message: 'Business expenses cannot exceed income', severity: 'warning' })
  }

  // Deductions validation
  if (declaration.personalDeduction < 0) {
    errors.push({ field: 'personalDeduction', message: 'Personal deduction cannot be negative', severity: 'error' })
  }

  if (declaration.reliefs < 0) {
    errors.push({ field: 'reliefs', message: 'Reliefs cannot be negative', severity: 'error' })
  }

  // Tax validation
  if (declaration.taxAmount < 0) {
    errors.push({ field: 'taxAmount', message: 'Tax amount cannot be negative', severity: 'error' })
  }

  if (declaration.taxToPay < 0) {
    errors.push({ field: 'taxToPay', message: 'Tax to pay cannot be negative', severity: 'error' })
  }

  // Personal info validation for PIT-36/37
  if (declaration.maritalStatus && !['single', 'married', 'divorced', 'widowed'].includes(declaration.maritalStatus)) {
    errors.push({ field: 'maritalStatus', message: 'Invalid marital status', severity: 'error' })
  }

  if (declaration.dependents !== undefined && declaration.dependents < 0) {
    errors.push({ field: 'dependents', message: 'Number of dependents cannot be negative', severity: 'error' })
  }

  // Status check
  if (declaration.status === 'submitted' && !declaration.submittedAt) {
    errors.push({ field: 'submittedAt', message: 'Submission date required for submitted status', severity: 'warning' })
  }

  return {
    isValid: errors.filter(e => e.severity === 'error').length === 0,
    errors,
  }
}

// ===== TAX COST VALIDATION =====

export function validateTaxCost(cost: TaxCost): ValidationResult {
  const errors: ValidationError[] = []

  // Required fields
  if (!cost.userId) {
    errors.push({ field: 'userId', message: 'User ID is required', severity: 'error' })
  }

  if (!cost.declarationId) {
    errors.push({ field: 'declarationId', message: 'Declaration ID is required', severity: 'error' })
  }

  if (!cost.category || !['office', 'equipment', 'vehicle', 'professional', 'meals', 'travel', 'utilities', 'other'].includes(cost.category)) {
    errors.push({ field: 'category', message: 'Invalid cost category', severity: 'error' })
  }

  if (!cost.description || cost.description.trim().length === 0) {
    errors.push({ field: 'description', message: 'Cost description is required', severity: 'error' })
  }

  if (cost.description.length > 500) {
    errors.push({ field: 'description', message: 'Cost description is too long (max 500 characters)', severity: 'error' })
  }

  if (cost.amount < 0) {
    errors.push({ field: 'amount', message: 'Cost amount cannot be negative', severity: 'error' })
  }

  if (cost.amount === 0) {
    errors.push({ field: 'amount', message: 'Cost amount must be greater than zero', severity: 'warning' })
  }

  if (!cost.date) {
    errors.push({ field: 'date', message: 'Cost date is required', severity: 'error' })
  }

  // Validate date is not in the future
  const costDate = new Date(cost.date)
  if (costDate > new Date()) {
    errors.push({ field: 'date', message: 'Cost date cannot be in the future', severity: 'error' })
  }

  if (cost.deductionPercent < 0 || cost.deductionPercent > 100) {
    errors.push({ field: 'deductionPercent', message: 'Deduction percent must be between 0 and 100', severity: 'error' })
  }

  // Depreciation validation
  if (cost.hasDepreciation && cost.depreciation) {
    if (!cost.depreciation.method || !['linear', 'accelerated'].includes(cost.depreciation.method)) {
      errors.push({ field: 'depreciation.method', message: 'Invalid depreciation method', severity: 'error' })
    }

    if (cost.depreciation.rate < 0 || cost.depreciation.rate > 100) {
      errors.push({ field: 'depreciation.rate', message: 'Depreciation rate must be between 0 and 100', severity: 'error' })
    }

    if (cost.depreciation.years < 1 || cost.depreciation.years > 50) {
      errors.push({ field: 'depreciation.years', message: 'Depreciation years must be between 1 and 50', severity: 'error' })
    }

    if (cost.depreciation.residualValue && cost.depreciation.residualValue < 0) {
      errors.push({ field: 'depreciation.residualValue', message: 'Residual value cannot be negative', severity: 'error' })
    }
  }

  if (!cost.status || !['draft', 'included', 'archived'].includes(cost.status)) {
    errors.push({ field: 'status', message: 'Invalid cost status', severity: 'error' })
  }

  return {
    isValid: errors.filter(e => e.severity === 'error').length === 0,
    errors,
  }
}

// ===== PIT CALCULATOR INPUT VALIDATION =====

export function validatePitCalculatorInput(input: PitCalculatorInput): ValidationResult {
  const errors: ValidationError[] = []

  // Year validation
  if (!input.year || input.year < 2020 || input.year > new Date().getFullYear() + 1) {
    errors.push({ field: 'year', message: 'Invalid tax year', severity: 'error' })
  }

  // Income validation
  if (input.grossIncome < 0) {
    errors.push({ field: 'grossIncome', message: 'Gross income cannot be negative', severity: 'error' })
  }

  if (input.businessExpenses !== undefined && input.businessExpenses < 0) {
    errors.push({ field: 'businessExpenses', message: 'Business expenses cannot be negative', severity: 'error' })
  }

  if (input.capitalGains < 0) {
    errors.push({ field: 'capitalGains', message: 'Capital gains cannot be negative', severity: 'error' })
  }

  if (input.capitalLosses < 0) {
    errors.push({ field: 'capitalLosses', message: 'Capital losses cannot be negative', severity: 'error' })
  }

  if (input.rentalIncome < 0) {
    errors.push({ field: 'rentalIncome', message: 'Rental income cannot be negative', severity: 'error' })
  }

  // Deductions
  if (input.personalDeductions < 0) {
    errors.push({ field: 'personalDeductions', message: 'Personal deductions cannot be negative', severity: 'error' })
  }

  // Personal info
  if (!input.maritalStatus || !['single', 'married', 'divorced', 'widowed'].includes(input.maritalStatus)) {
    errors.push({ field: 'maritalStatus', message: 'Invalid marital status', severity: 'error' })
  }

  if (input.dependents < 0 || input.dependents > 20) {
    errors.push({ field: 'dependents', message: 'Number of dependents must be between 0 and 20', severity: 'error' })
  }

  // Contributions
  if (input.pensionContribution < 0) {
    errors.push({ field: 'pensionContribution', message: 'Pension contribution cannot be negative', severity: 'error' })
  }

  if (input.healthInsuranceContribution < 0) {
    errors.push({ field: 'healthInsuranceContribution', message: 'Health insurance cannot be negative', severity: 'error' })
  }

  if (input.zusContribution < 0) {
    errors.push({ field: 'zusContribution', message: 'ZUS contribution cannot be negative', severity: 'error' })
  }

  // Reliefs
  if (input.reliefs < 0) {
    errors.push({ field: 'reliefs', message: 'Reliefs cannot be negative', severity: 'error' })
  }

  // Warnings for unusual values
  if (input.grossIncome > 1000000) {
    errors.push({ field: 'grossIncome', message: 'Very high income - please verify', severity: 'warning' })
  }

  return {
    isValid: errors.filter(e => e.severity === 'error').length === 0,
    errors,
  }
}

// ===== JPK-V7 REPORT VALIDATION =====

export function validateJpkV7Report(report: JpkV7Report): ValidationResult {
  const errors: ValidationError[] = []

  // Required fields
  if (!report.userId) {
    errors.push({ field: 'userId', message: 'User ID is required', severity: 'error' })
  }

  if (!report.year || report.year < 2020) {
    errors.push({ field: 'year', message: 'Invalid tax year', severity: 'error' })
  }

  if (report.quarter !== undefined && (report.quarter < 1 || report.quarter > 4)) {
    errors.push({ field: 'quarter', message: 'Quarter must be between 1 and 4', severity: 'error' })
  }

  // VAT Summary validation
  if (report.vatSummary.totalVatSales < 0) {
    errors.push({ field: 'vatSummary.totalVatSales', message: 'Total VAT sales cannot be negative', severity: 'error' })
  }

  if (report.vatSummary.totalVatPurchases < 0) {
    errors.push({ field: 'vatSummary.totalVatPurchases', message: 'Total VAT purchases cannot be negative', severity: 'error' })
  }

  if (report.vatSummary.totalVatDeduction > report.vatSummary.totalVatPurchases) {
    errors.push({ field: 'vatSummary.totalVatDeduction', message: 'VAT deduction cannot exceed total purchases', severity: 'warning' })
  }

  // PIT Summary validation
  if (report.pitSummary.totalIncome < 0) {
    errors.push({ field: 'pitSummary.totalIncome', message: 'Total income cannot be negative', severity: 'error' })
  }

  if (report.pitSummary.totalExpenses < 0) {
    errors.push({ field: 'pitSummary.totalExpenses', message: 'Total expenses cannot be negative', severity: 'error' })
  }

  if (report.pitSummary.totalExpenses > report.pitSummary.totalIncome) {
    errors.push({ field: 'pitSummary.totalExpenses', message: 'Expenses cannot exceed income', severity: 'warning' })
  }

  if (!report.status || !['draft', 'generated', 'exported', 'sent'].includes(report.status)) {
    errors.push({ field: 'status', message: 'Invalid report status', severity: 'error' })
  }

  return {
    isValid: errors.filter(e => e.severity === 'error').length === 0,
    errors,
  }
}

// ===== BATCH VALIDATION =====

export function validateDeclarationForSubmission(declaration: PitDeclaration, costs: TaxCost[]): ValidationResult {
  const errors: ValidationError[] = []

  // Basic declaration validation
  const declarationValidation = validatePitDeclaration(declaration)
  errors.push(...declarationValidation.errors)

  // Check if all costs are validated
  const invalidCosts = costs.filter(cost => {
    const result = validateTaxCost(cost)
    return !result.isValid
  })

  if (invalidCosts.length > 0) {
    errors.push({
      field: 'costs',
      message: `${invalidCosts.length} cost(s) have validation errors`,
      severity: 'error',
    })
  }

  // Check if declaration is complete
  if (declaration.status !== 'completed' && declaration.status !== 'submitted') {
    errors.push({
      field: 'status',
      message: 'Declaration must be in "completed" or "submitted" status',
      severity: 'error',
    })
  }

  // Check for zero income warning
  const totalIncome = declaration.personalIncome + (declaration.businessIncome || 0) + declaration.capitalGains + declaration.rentalIncome
  if (totalIncome === 0) {
    errors.push({
      field: 'income',
      message: 'Declaration has no income - this may be incorrect',
      severity: 'warning',
    })
  }

  return {
    isValid: errors.filter(e => e.severity === 'error').length === 0,
    errors,
  }
}
