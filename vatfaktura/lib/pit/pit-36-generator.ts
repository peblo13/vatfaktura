import { PitDeclaration } from '../types/pit-types'
import { formatCurrency, formatDate } from './pit-utils'
import { getTaxYearConfig } from './tax-rates'

interface Pit36Declaration extends PitDeclaration {
  type: 'PIT-36'
}

export class Pit36Generator {
  private declaration: Pit36Declaration

  constructor(declaration: PitDeclaration) {
    this.declaration = declaration as Pit36Declaration
  }

  // Generate XML for e-podatki submission
  generateXML(): string {
    const declaration = this.declaration

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<PIT36 xmlns="http://www.mf.gov.pl/pit">
  <RocznikPodatkowy>${declaration.year}</RocznikPodatkowy>
  <IdentyfikatorZlozenia>${declaration.id}</IdentyfikatorZlozenia>
  <DataZlozenia>${new Date().toISOString().split('T')[0]}</DataZlozenia>
  
  <DanePodstawowe>
    <ImieNazwisko>${declaration.userId}</ImieNazwisko>
    <RodzajDeklaracji>PIT-36</RodzajDeklaracji>
    <StatusZawodowy>osoba_fizyczna</StatusZawodowy>
  </DanePodstawowe>

  <DochodyZWszystkich Zrodel>
    <DochodyZRobotyZarobkowej>${declaration.personalIncome}</DochodyZRobotyZarobkowej>
    <DochodyZDzialalnosciGospodarczej>${declaration.businessIncome || 0}</DochodyZDzialalnosciGospodarczej>
    <DochodyZKapitalu>${declaration.capitalGains}</DochodyZKapitalu>
    <DochodyZNieruchomosci>${declaration.rentalIncome}</DochodyZNieruchomosci>
  </DochodyZWszystkich>

  <Wydatki>
    <StrataZobytuPapierowWartosciowych>${declaration.capitalLosses}</StrataZobytuPapierowWartosciowych>
  </Wydatki>

  <UlgiPodatkowe>
    <UlgaZaZawisleUtrzymywane>${declaration.reliefs}</UlgaZaZawisleUtrzymywane>
  </UlgiPodatkowe>

  <Podsumowanie>
    <RazemDochody>${this.calculateTotalIncome()}</RazemDochody>
    <KwotaWolnaOdPodatku>${declaration.personalDeduction}</KwotaWolnaOdPodatku>
    <DochodDoOpodatkowania>${this.calculateTaxableIncome()}</DochodDoOpodatkowania>
    <PodatekDoZaplaty>${declaration.taxToPay}</PodatekDoZaplaty>
  </Podsumowanie>
</PIT36>`

    return xml
  }

  // Generate human-readable PIT-36 report
  generateReport(): string {
    const declaration = this.declaration
    const taxConfig = getTaxYearConfig(declaration.year)

    const totalIncome = this.calculateTotalIncome()
    const taxableIncome = this.calculateTaxableIncome()
    const netCapitalIncome = Math.max(0, declaration.capitalGains - declaration.capitalLosses)

    let report = `
════════════════════════════════════════════════════════════════
                      DEKLARACJA PIT-36
                    ROK PODATKOWY ${declaration.year}
════════════════════════════════════════════════════════════════

DATA SPORZĄDZENIA: ${formatDate(new Date())}
ID DEKLARACJI: ${declaration.id}
STATUS: ${declaration.status.toUpperCase()}

────────────────────────────────────────────────────────────────
I. DOCHODY Z PRACY
────────────────────────────────────────────────────────────────

Dochody ze stosunku pracy:           ${formatCurrency(declaration.personalIncome)}

────────────────────────────────────────────────────────────────
II. DOCHODY Z DZIAŁALNOŚCI GOSPODARCZEJ
────────────────────────────────────────────────────────────────

Przychody:                           ${formatCurrency(declaration.businessIncome || 0)}

────────────────────────────────────────────────────────────────
III. DOCHODY Z KAPITAŁU
────────────────────────────────────────────────────────────────

Zyski z obrotu papierami wart.:      ${formatCurrency(declaration.capitalGains)}
Straty z obrotu papierami wart.:     ${formatCurrency(declaration.capitalLosses)}
Dochód netto z kapitału:             ${formatCurrency(netCapitalIncome)}

────────────────────────────────────────────────────────────────
IV. DOCHODY Z NIERUCHOMOŚCI
────────────────────────────────────────────────────────────────

Przychody z wynajmu:                 ${formatCurrency(declaration.rentalIncome)}

────────────────────────────────────────────────────────────────
V. RAZEM DOCHODY ZE WSZYSTKICH ŹRÓDEŁ
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
Liczba osób na utrzymaniu:           ${declaration.dependents || 0}

Informacje rodzinne:
- Status cywilny:                     ${this.getMaritalStatusLabel(declaration.maritalStatus)}
- Liczba dzieci:                      ${declaration.dependents || 0}

════════════════════════════════════════════════════════════════
`

    return report
  }

  // Generate JSON representation
  generateJSON(): string {
    const declaration = this.declaration

    const data = {
      declarationType: 'PIT-36',
      year: declaration.year,
      taxpayerId: declaration.userId,
      submissionDate: new Date().toISOString(),

      incomes: {
        employment: declaration.personalIncome,
        business: declaration.businessIncome || 0,
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
        total: declaration.personalDeduction + declaration.reliefs,
      },

      familyInfo: {
        maritalStatus: declaration.maritalStatus || 'single',
        dependents: declaration.dependents || 0,
      },

      taxCalculation: {
        taxableIncome: this.calculateTaxableIncome(),
        tax: declaration.taxAmount,
        reliefs: declaration.reliefs,
        payable: declaration.taxToPay,
        effectiveRate: ((declaration.taxAmount / this.calculateTotalIncome()) * 100).toFixed(2),
      },

      status: declaration.status,
      createdAt: declaration.createdAt,
      submittedAt: declaration.submittedAt,
      epodatkiReferenceNumber: declaration.epodatkiReferenceNumber,
    }

    return JSON.stringify(data, null, 2)
  }

  // Tax breakdown analysis
  generateTaxAnalysis(): string {
    const declaration = this.declaration
    const totalIncome = this.calculateTotalIncome()
    const taxableIncome = this.calculateTaxableIncome()
    const limit = declaration.year === 2024 ? 123000 : 120000

    let analysis = `
════════════════════════════════════════════════════════════════
                    ANALIZA PODATKOWA PIT-36
════════════════════════════════════════════════════════════════

1. STRUKTURY DOCHODÓW:
   - Z pracy (${((declaration.personalIncome / totalIncome) * 100).toFixed(1)}%): ${formatCurrency(declaration.personalIncome)}
   - Z biznesu (${((​(declaration.businessIncome || 0) / totalIncome) * 100).toFixed(1)}%): ${formatCurrency(declaration.businessIncome || 0)}
   - Z kapitału (${((declaration.capitalGains / totalIncome) * 100).toFixed(1)}%): ${formatCurrency(declaration.capitalGains)}
   - Z nieruchomości (${((declaration.rentalIncome / totalIncome) * 100).toFixed(1)}%): ${formatCurrency(declaration.rentalIncome)}

2. PROGI PODATKOWE:
`

    if (taxableIncome <= limit) {
      analysis += `   - Podatek w progu 12%
   - Kwota do drugiego progu: ${formatCurrency(limit - taxableIncome)}
`
    } else {
      const firstBracket = limit
      const secondBracket = taxableIncome - limit
      const firstBracketTax = Math.round(firstBracket * 0.12)
      const secondBracketTax = Math.round(secondBracket * 0.32)

      analysis += `   - Próg 12% (0 - ${formatCurrency(limit)}): ${formatCurrency(firstBracketTax)}
   - Próg 32% (ponad ${formatCurrency(limit)}): ${formatCurrency(secondBracketTax)}
   - Razem podatek: ${formatCurrency(firstBracketTax + secondBracketTax)}
`
    }

    analysis += `
3. ODLICZENIA I ULGI:
   - Kwota wolna od podatku: ${formatCurrency(declaration.personalDeduction)}
   - Ulgi podatkowe (np. za dzieci): ${formatCurrency(declaration.reliefs)}
   - Razem oszczędności: ${formatCurrency(declaration.personalDeduction + declaration.reliefs)}

4. EFEKTYWNA STAWKA PODATKOWA:
   ${((declaration.taxAmount / totalIncome) * 100).toFixed(2)}% od dochodów brutto

════════════════════════════════════════════════════════════════
`

    return analysis
  }

  // Private methods
  private calculateTotalIncome(): number {
    return (
      declaration.personalIncome +
      (declaration.businessIncome || 0) +
      declaration.capitalGains +
      declaration.rentalIncome
    )
  }

  private calculateTaxableIncome(): number {
    return Math.max(0, this.calculateTotalIncome() - declaration.personalDeduction - declaration.reliefs)
  }

  private getMarginalTaxRate(taxableIncome: number): string {
    const limit = this.declaration.year === 2024 ? 123000 : 120000
    return taxableIncome > limit ? '32' : '12'
  }

  private getMaritalStatusLabel(status?: string): string {
    const labels: Record<string, string> = {
      single: 'Panna / Pan',
      married: 'Zamężna / Żonaty',
      divorced: 'Rozwiedziona / Rozwiedziony',
      widowed: 'Wdowa / Wdowiec',
    }
    return labels[status || 'single'] || status || 'Nieznany'
  }

  private get declaration(): Pit36Declaration {
    return this.declaration
  }
}

// Export helper functions
export function generatePit36XML(declaration: PitDeclaration): string {
  const generator = new Pit36Generator(declaration)
  return generator.generateXML()
}

export function generatePit36Report(declaration: PitDeclaration): string {
  const generator = new Pit36Generator(declaration)
  return generator.generateReport()
}

export function generatePit36JSON(declaration: PitDeclaration): string {
  const generator = new Pit36Generator(declaration)
  return generator.generateJSON()
}

export function generatePit36TaxAnalysis(declaration: PitDeclaration): string {
  const generator = new Pit36Generator(declaration)
  return generator.generateTaxAnalysis()
}
