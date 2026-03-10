import { NextRequest, NextResponse } from 'next/server'
import { PitCalculatorInput } from '@/lib/types/pit-types'
import { PitCalculator } from '@/lib/pit/pit-calculator'
import { validatePitCalculatorInput } from '@/lib/pit/pit-validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const input: PitCalculatorInput = body

    // Validate input
    const validation = validatePitCalculatorInput(input)
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
          message: 'Invalid calculator input',
        },
        { status: 400 }
      )
    }

    // Calculate PIT
    const calculator = new PitCalculator(input)
    const output = calculator.calculate()

    return NextResponse.json(
      {
        success: true,
        data: output,
        message: 'PIT calculated successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error calculating PIT:', error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error calculating PIT',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Return example input for calculator
    const exampleInput: PitCalculatorInput = {
      year: 2024,
      grossIncome: 100000,
      businessExpenses: 20000,
      personalDeductions: 3600,
      capitalGains: 0,
      capitalLosses: 0,
      rentalIncome: 0,
      maritalStatus: 'single',
      dependents: 0,
      pensionContribution: 0,
      healthInsuranceContribution: 9000,
      zusContribution: 10000,
      reliefs: 0,
    }

    return NextResponse.json(
      {
        success: true,
        exampleInput,
        message: 'POST with PitCalculatorInput to calculate',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error',
      },
      { status: 500 }
    )
  }
}
