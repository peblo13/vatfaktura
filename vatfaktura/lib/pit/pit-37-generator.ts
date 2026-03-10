import { PitDeclaration, TaxCost } from '../types/pit-types'
import { formatCurrency, formatDate } from './pit-utils'
import { getTaxYearConfig } from './tax-rates'

interface Pit37Declaration extends PitDeclaration {
  type: 'PIT-37'
}

export class Pit37Generator {
  private declaration: Pit37Declaration
  private costs: TaxCost[]

  constructor(declaration: PitDeclaration, costs: TaxCost[] = []) {
    this.declaration = declaration as Pit37Declaration
    this.costs = costs
  }

  // Generate XML for e-podatki submission
  generateXML(): string {
    const declaration = this.declaration
    const taxConfig = getTaxYearConfig(declaration.year)

    // Calculate totals
    const totalDeductibleCosts = this.calculateTotalDeductibleCosts()
    const taxableIncome = Math.max(0, declaration.personalIncome - totalDeductibleCosts - declaration.personalDeduction)

    // Build XML structure (simplified for demonstration)
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<PIT37 xmlns="http://www.mf.gov.pl/pit">
  <RocznikPodatkowy>${declaration.year}</RocznikPodatkowy>
  <IdentyfikatorZlozenia>${declaration.id}</IdentyfikatorZlozenia>
  <DataZlozenia>${new Date().toISOString().split('T')[0]}</DataZlozenia>
  
  <DanePodstawowe>
    <ImieNazwisko>${declaration.userId}</ImieNazwisko>
    <RodzajDeklaracji>PIT-37</RodzajDeklaracji>
    <StatusZawodowy>przedsiębiorca</StatusZawodowy>
  </DanePodstawowe>

  <DochodyZDzialalnosciGospodarczej>
    <PrzychodyBrutto>${declaration.businessIncome || 0}</PrzychodyBrutto>
    <KosztyUzyskania>${totalDeductibleCosts}</KosztyUzyskania>
    <DochódNetto>${Math.max(0, (declaration.businessIncome || 0) - totalDeductibleCosts)}</DochódNetto>
  </DochodyZDzialalnosciGospodarczej>

  <DochodyZPracy>
    <PrzychodyZPracy>${declaration.personalIncome}</PrzychodyZPracy>
  </DochodyZPracy>

  <DochodyZKapitalu>
    <ZyskiZobytuPapierowWartosciowych>${declaration.capitalGains}</ZyskiZobytuPapierowWartosciowych>
    <StrataZobytuPapierowWartosciowych>${declaration.capitalLosses}</StrataZobytuPapierowWartosciowych>
  </DochodyZKapitalu>

  <DochodyZNieruchomosci>
    <PrzychodyZNajmu>${declaration.rentalIncome}</PrzychodyZNajmu>
  </DochodyZNieruchomosci>

  <UlgiPodatkowe>
    <UlgaZaZawisleUtrzymywane>${declaration.reliefs}</UlgaZaZawisleUtrzymywane>
  </UlgiPodatkowe>

  <Podsumowanie>
    <DochodDoOpodatkowania>${taxableIncome}</DochodDoOpodatkowania>
    <PodatekDoZaplaty>${declaration.taxToPay}</PodatekDoZaplaty>
    <KwotaWolnaOdPodatku>${taxConfig.personalDeductionAmount}</KwotaWolnaOdPodatku>
  </Podsumowanie>
</PIT37>`

    return xml
  }

  // Generate human-readable PIT-37 report
  generateReport(): string {
    const declaration = this.declaration
    const taxConfig = getTaxYearConfig(declaration.year)

    const totalDeductibleCosts = this.calculateTotalDeductibleCosts()
    const businessNetIncome = Math.max(0, (declaration.businessIncome || 0) - totalDeductibleCosts)
    const totalIncome = businessNetIncome + declaration.personalIncome + declaration.capitalGains + declaration.rentalIncome
    const taxableIncome = Math.max(0, totalIncome - declaration.personalDeduction - declaration.reliefs)

    let report = `
════════════════════════════════════════════════════════════════
                      DEKLARACJA PIT-37
                    ROK PODATKOWY ${declaration.year}
════════════════════════════════════════════════════════════════

DATA SPORZĄDZENIA: ${formatDate(new Date())}
ID DEKLARACJI: ${declaration.id}
STATUS: ${declaration.status.toUpperCase()}

────────────────────────────────────────────────────────────────
I. DOCHODY Z DZIAŁALNOŚCI GOSPODARCZEJ
────────────────────────────────────────────────────────────────

Przychody brutto:                    ${formatCurrency(declaration.businessIncome || 0)}
Koszty uzyskania przychodu:          ${formatCurrency(totalDeductibleCosts)}
Dochód netto z działalności:         ${formatCurrency(businessNetIncome)}

────────────────────────────────────────────────────────────────
II. DOCHODY Z PRACY
────────────────────────────────────────────────────────────────

Dochody ze stosunku pracy:           ${formatCurrency(declaration.personalIncome)}

────────────────────────────────────────────────────────────────
III. DOCHODY Z KAPITAŁU
────────────────────────────────────────────────────────────────

Zyski z obrotu papierami wart.:      ${formatCurrency(declaration.capitalGains)}
Straty z obrotu papierami wart.:     ${formatCurrency(declaration.capitalLosses)}
Dochód netto z kapitału:             ${formatCurrency(Math.max(0, declaration.capitalGains - declaration.capitalLosses))}

────────────────────────────────────────────────────────────────
IV. DOCHODY Z NIERUCHOMOŚCI
────────────────────────────────────────────────────────────────

Przychody z wynajmu:                 ${formatCurrency(declaration.rentalIncome)}

────────────────────────────────────────────────────────────────
V. RAZEM DOCHODY
────────────────────────────────────────────────────────────────

Razem dochody:                       ${formatCurrency(totalIncome)}

────────────────────────────────────────────────────────────────
VI. ODLICZENIA I ULGI
────────────────────────────────────────────────────────────────

Kwota wolna od podatku:              ${formatCurrency(declaration.personalDeduction)}
Ulgi podatkowe:                      ${formatCurrency(declaration.reliefs)}
Razem odliczenia:                    ${formatCurrency(declaration.personalDeduction + declaration.reliefs)}

────────────────────────────────────────────────────────────────
VII. DOCHÓD DO OPODATKOWANIA
────────────────────────────────────────────────────────────────

Dochód do opodatkowania:             ${formatCurrency(taxableIncome)}

────────────────────────────────────────────────────────────────
VIII. PODATEK PIT
────────────────────────────────────────────────────────────────

Podatek należny:                     ${formatCurrency(declaration.taxAmount)}
Ulgi na podatek:                     ${formatCurrency(declaration.reliefs)}
Podatek do zapłaty:                  ${formatCurrency(declaration.taxToPay)}

────────────────────────────────────────────────────────────────
IX. PODSUMOWANIE
────────────────────────────────────────────────────────────────

Efektywna stawka podatkowa:          ${((declaration.taxAmount / totalIncome) * 100).toFixed(2)}%
Krańcowa stawka podatkowa:           ${this.getMarginalTaxRate(taxableIncome)}%

${this.getCostBreakdown()}

════════════════════════════════════════════════════════════════
`

    return report
  }

  // Generate JSON representation
  generateJSON(): string {
    const declaration = this.declaration
    const totalDeductibleCosts = this.calculateTotalDeductibleCosts()

    const data = {
      declarationType: 'PIT-37',
      year: declaration.year,
      taxpayerId: declaration.userId,
      submissionDate: new Date().toISOString(),
      
      incomes: {
        businessGross: declaration.businessIncome || 0,
        businessNetted: Math.max(0, (declaration.businessIncome || 0) - totalDeductibleCosts),
        employment: declaration.personalIncome,
        capital: {
          gains: declaration.capitalGains,
          losses: declaration.capitalLosses,
          net: Math.max(0, declaration.capitalGains - declaration.capitalLosses),
        },
        property: declaration.rentalIncome,
        total: this.calculateTotalIncome(),
      },

      deductions: {
        personalDeduction: declaration.personalDeduction,
        reliefs: declaration.reliefs,
        businessCosts: totalDeductibleCosts,
        total: declaration.personalDeduction + declaration.reliefs + totalDeductibleCosts,
      },

      taxCalculation: {
        taxableIncome: this.calculateTaxableIncome(),
        tax: declaration.taxAmount,
        reliefs: declaration.reliefs,
        payable: declaration.taxToPay,
        effectiveRate: ((declaration.taxAmount / this.calculateTotalIncome()) * 100).toFixed(2),
      },

      costs: this.costs.map(cost => ({
        id: cost.id,
        category: cost.category,
        description: cost.description,
        amount: cost.amount,
        date: cost.date,
        deductible: cost.deductible,
        deductionAmount: cost.amount * (cost.deductionPercent / 100),
      })),

      status: declaration.status,
      createdAt: declaration.createdAt,
      submittedAt: declaration.submittedAt,
      epodatkiReferenceNumber: declaration.epodatkiReferenceNumber,
    }

    return JSON.stringify(data, null, 2)
  }

  // CSV Export for costs
  generateCostsCSV(): string {
    let csv = 'Lp.,Data,Kategoria,Opis,Kwota,Procent Odliczenia,Kwota Odliczenia,Status\n'

    this.costs.forEach((cost, index) => {
      const deductionAmount = (cost.amount * cost.deductionPercent) / 100
      const row = [
        index + 1,
        formatDate(cost.date),
        cost.category,
        `"${cost.description}"`,
        cost.amount.toFixed(2),
        cost.deductionPercent.toFixed(2),
        deductionAmount.toFixed(2),
        cost.status,
      ]
      csv += row.join(',') + '\n'
    })

    return csv
  }

  // Getters and calculations
  private calculateTotalDeductibleCosts(): number {
    return this.costs.reduce((sum, cost) => {
      if (cost.deductible && cost.status === 'included') {
        return sum + (cost.amount * cost.deductionPercent) / 100
      }
      return sum
    }, 0)
  }

  private calculateTotalIncome(): number {
    const businessNetIncome = Math.max(0, (this.declaration.businessIncome || 0) - this.calculateTotalDeductibleCosts())
    return (
      businessNetIncome +
      this.declaration.personalIncome +
      this.declaration.capitalGains +
      this.declaration.rentalIncome
    )
  }

  private calculateTaxableIncome(): number {
    return Math.max(0, this.calculateTotalIncome() - this.declaration.personalDeduction - this.declaration.reliefs)
  }

  private getMarginalTaxRate(taxableIncome: number): string {
    const limit = this.declaration.year === 2024 ? 123000 : 120000
    return taxableIncome > limit ? '32' : '12'
  }

  private getCostBreakdown(): string {
    const categoryTotals: Record<string, number> = {}

    this.costs.forEach(cost => {
      if (cost.status === 'included' && cost.deductible) {
        const deductionAmount = (cost.amount * cost.deductionPercent) / 100
        categoryTotals[cost.category] = (categoryTotals[cost.category] || 0) + deductionAmount
      }
    })

    if (Object.keys(categoryTotals).length === 0) {
      return 'LISTA KOSZTÓW\n\nBrak kosztów.'
    }

    let breakdown = 'LISTA KOSZTÓW\n\n'
    Object.entries(categoryTotals).forEach(([category, total]) => {
      breakdown += `${category.toUpperCase()}: ${formatCurrency(total)}\n`
    })

    return breakdown
  }
}

// Export helper function
export function generatePit37XML(declaration: PitDeclaration, costs: TaxCost[] = []): string {
  const generator = new Pit37Generator(declaration, costs)
  return generator.generateXML()
}

export function generatePit37Report(declaration: PitDeclaration, costs: TaxCost[] = []): string {
  const generator = new Pit37Generator(declaration, costs)
  return generator.generateReport()
}

export function generatePit37JSON(declaration: PitDeclaration, costs: TaxCost[] = []): string {
  const generator = new Pit37Generator(declaration, costs)
  return generator.generateJSON()
}

export function generatePit37CostsCSV(costs: TaxCost[]): string {
  const generator = new Pit37Generator(
    {
      id: '',
      userId: '',
      type: 'PIT-37',
      year: new Date().getFullYear(),
      status: 'draft',
      createdAt: '',
      updatedAt: '',
      personalIncome: 0,
      capitalGains: 0,
      capitalLosses: 0,
      rentalIncome: 0,
      personalDeduction: 0,
      reliefs: 0,
      taxAmount: 0,
      taxToPay: 0,
    },
    costs
  )
  return generator.generateCostsCSV()
}
