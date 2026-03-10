import { JpkV7Report } from '../types/pit-types'
import { formatCurrency, formatDate } from './pit-utils'

export class JpkV7Generator {
  private report: JpkV7Report

  constructor(report: JpkV7Report) {
    this.report = report
  }

  // Generate standard JPK-V7 XML format
  generateXML(): string {
    const report = this.report
    const timestamp = new Date().toISOString()

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<JPK xmlns="http://jpk.mf.gov.pl/wzor/2024/01/25/11089" xmlns:etd="http://jpk.mf.gov.pl/wzor/2024/01/25/11089">
  <Naglowek>
    <KodFormularz kodSystemu="JPK" kodPodstawowy="V7" wersjaSchemy="1-0" wersjaOprogramowania="1.0">
      <DataZakonczenia>${report.year}-12-31</DataZakonczenia>
    </KodFormularz>
    <Zlozajacy>
      <NIP>${report.userId.substring(0, 10)}</NIP>
      <ImieNazwisko>Podatnik</ImieNazwisko>
    </Zlozajacy>
    <PeriodZlozenia>
      <DataOd>${report.year}-01-01</DataOd>
      <DataDo>${report.year}-12-31</DataDo>
      <RodzajZlozenia>O</RodzajZlozenia>
    </PeriodZlozenia>
    <DataZlozenia>${timestamp.split('T')[0]}</DataZlozenia>
  </Naglowek>

  <Dane>
    <JPK_V7_VAT>
      <Sprzedaz>
        <PozycjaSprzedazy>
          <LpSp>1</LpSp>
          <NazwaNabywcy>Różni nabywcy</NazwaNabywcy>
          <KwotaSprzedazy>${this.report.vatSummary.totalVatSales}</KwotaSprzedazy>
          <KwotaVat>${this.report.vatSummary.totalVatTax}</KwotaVat>
          <StawkaVat>23</StawkaVat>
        </PozycjaSprzedazy>
      </Sprzedaz>

      <Zakupy>
        <PozycjaZakupu>
          <LpZk>1</LpZk>
          <NazwaDostawcy>Różni dostawcy</NazwaDostawcy>
          <KwotaZakupu>${this.report.vatSummary.totalVatPurchases}</KwotaZakupu>
          <KwotaVatZakupu>${this.report.vatSummary.totalVatDeduction}</KwotaVatZakupu>
          <StawkaVat>23</StawkaVat>
        </PozycjaZakupu>
      </Zakupy>

      <Podsumowanie>
        <OgolnaSprzedaz>${this.report.vatSummary.totalVatSales}</OgolnaSprzedaz>
        <OgolnyVatSprzedazy>${this.report.vatSummary.totalVatTax}</OgolnyVatSprzedazy>
        <OgolneZakupy>${this.report.vatSummary.totalVatPurchases}</OgolneZakupy>
        <OgolnyVatZakupu>${this.report.vatSummary.totalVatDeduction}</OgolnyVatZakupu>
        <VatDo_Zaplaty>${this.report.vatSummary.vatToPay}</VatDo_Zaplaty>
      </Podsumowanie>
    </JPK_V7_VAT>

    <JPK_V7_PIT>
      <Przychody>
        <OgolnyPrzychod>${this.report.pitSummary.totalIncome}</OgolnyPrzychod>
      </Przychody>

      <Wydatki>
        <OgolneWydatki>${this.report.pitSummary.totalExpenses}</OgolneWydatki>
      </Wydatki>

      <Podatek>
        <DochodDoOpodatkowania>${this.report.pitSummary.taxableIncome}</DochodDoOpodatkowania>
        <PodatekNalezny>${this.report.pitSummary.tax}</PodatekNalezny>
      </Podatek>
    </JPK_V7_PIT>
  </Dane>
</JPK>`

    return xml
  }

  // Generate human-readable JPK-V7 Report
  generateReport(): string {
    const report = this.report
    const quarter = report.quarter ? `Q${report.quarter}` : 'Roczny'

    let reportText = `
════════════════════════════════════════════════════════════════
                    RAPORT JPK-V7 (VAT + PIT)
                         ROK: ${report.year}
                         OKRES: ${quarter}
════════════════════════════════════════════════════════════════

DATA SPORZĄDZENIA: ${formatDate(new Date())}
ID RAPORTU: ${report.id}
FORMAT EKSPORTU: ${report.exportFormat.toUpperCase()}
STATUS: ${this.getStatusLabel(report.status)}

────────────────────────────────────────────────────────────────
I. PODSUMOWANIE VAT
────────────────────────────────────────────────────────────────

Sprzedaż (przychody):                ${formatCurrency(report.vatSummary.totalVatSales)}
VAT ze sprzedaży:                    ${formatCurrency(report.vatSummary.totalVatTax)}

Zakupy (wydatki):                    ${formatCurrency(report.vatSummary.totalVatPurchases)}
VAT podlegający odliczeniu:          ${formatCurrency(report.vatSummary.totalVatDeduction)}

┌─────────────────────────────────────────────────────────────┐
│ VAT DO ZAPŁATY:                  ${formatCurrency(report.vatSummary.vatToPay).padStart(25)}│
└─────────────────────────────────────────────────────────────┘

────────────────────────────────────────────────────────────────
II. PODSUMOWANIE PIT
────────────────────────────────────────────────────────────────

Razem przychody:                     ${formatCurrency(report.pitSummary.totalIncome)}
Razem wydatki:                       ${formatCurrency(report.pitSummary.totalExpenses)}

Dochód do opodatkowania:             ${formatCurrency(report.pitSummary.taxableIncome)}
Podatek należny:                     ${formatCurrency(report.pitSummary.tax)}

────────────────────────────────────────────────────────────────
III. PODSUMOWANIE ŁĄCZNE
────────────────────────────────────────────────────────────────

Przychody razem:                     ${formatCurrency(report.vatSummary.totalVatSales + report.pitSummary.totalIncome)}
Wydatki razem:                       ${formatCurrency(report.vatSummary.totalVatPurchases + report.pitSummary.totalExpenses)}

Obciążenia podatkowe:
  - VAT do zapłaty:                  ${formatCurrency(report.vatSummary.vatToPay)}
  - PIT do zapłaty:                  ${formatCurrency(report.pitSummary.tax)}

┌─────────────────────────────────────────────────────────────┐
│ RAZEM DO ZAPŁATY:          ${formatCurrency(report.vatSummary.vatToPay + report.pitSummary.tax).padStart(31)}│
└─────────────────────────────────────────────────────────────┘

════════════════════════════════════════════════════════════════

Raport wygenerowany: ${formatDate(report.generatedAt)}
${report.exportedAt ? `Wyeksportowany: ${formatDate(report.exportedAt)}` : 'Status: Nie wyeksportowany'}

════════════════════════════════════════════════════════════════
`

    return reportText
  }

  // Generate JSON representation
  generateJSON(): string {
    const report = this.report

    const data = {
      reportType: 'JPK-V7',
      year: report.year,
      quarter: report.quarter || null,
      period: report.quarter ? `${report.year}/Q${report.quarter}` : `${report.year}`,

      vat: {
        sales: {
          gross: report.vatSummary.totalVatSales,
          tax: report.vatSummary.totalVatTax,
        },
        purchases: {
          gross: report.vatSummary.totalVatPurchases,
          deduction: report.vatSummary.totalVatDeduction,
        },
        balance: {
          totalSalesTax: report.vatSummary.totalVatTax,
          totalPurchasesTax: report.vatSummary.totalVatDeduction,
          toPay: report.vatSummary.vatToPay,
        },
      },

      pit: {
        income: {
          total: report.pitSummary.totalIncome,
        },
        expenses: {
          total: report.pitSummary.totalExpenses,
        },
        tax: {
          taxableIncome: report.pitSummary.taxableIncome,
          due: report.pitSummary.tax,
        },
      },

      summary: {
        totalIncome: report.vatSummary.totalVatSales + report.pitSummary.totalIncome,
        totalExpenses: report.vatSummary.totalVatPurchases + report.pitSummary.totalExpenses,
        totalTaxes: report.vatSummary.vatToPay + report.pitSummary.tax,
      },

      metadata: {
        status: report.status,
        generatedAt: report.generatedAt,
        exportedAt: report.exportedAt || null,
        format: report.exportFormat,
        reportId: report.id,
      },
    }

    return JSON.stringify(data, null, 2)
  }

  // Generate CSV for detailed breakdown
  generateDetailedCSV(): string {
    const report = this.report

    let csv = 'Kategoria,Kwota\n'

    csv += `Przychody (VAT),${report.vatSummary.totalVatSales}\n`
    csv += `VAT ze sprzedaży,${report.vatSummary.totalVatTax}\n`
    csv += `Wydatki (VAT),${report.vatSummary.totalVatPurchases}\n`
    csv += `VAT do odliczenia,${report.vatSummary.totalVatDeduction}\n`
    csv += `VAT do zapłaty,${report.vatSummary.vatToPay}\n`
    csv += `\n`
    csv += `Przychody (PIT),${report.pitSummary.totalIncome}\n`
    csv += `Wydatki (PIT),${report.pitSummary.totalExpenses}\n`
    csv += `Dochód do opodatkowania,${report.pitSummary.taxableIncome}\n`
    csv += `PIT do zapłaty,${report.pitSummary.tax}\n`

    return csv
  }

  // Analyze tax efficiency
  generateTaxAnalysis(): string {
    const report = this.report
    const totalRevenue = report.vatSummary.totalVatSales + report.pitSummary.totalIncome
    const totalTaxes = report.vatSummary.vatToPay + report.pitSummary.tax
    const effectiveRate = totalRevenue > 0 ? (totalTaxes / totalRevenue) * 100 : 0

    let analysis = `
════════════════════════════════════════════════════════════════
                    ANALIZA PODATKÓW JPK-V7
════════════════════════════════════════════════════════════════

1. WSKAŹNIKI EFEKTYWNOŚCI:
   - Efektywna stawka VAT: ${((report.vatSummary.totalVatTax / report.vatSummary.totalVatSales) * 100).toFixed(2)}%
   - Efektywna stawka PIT: ${((report.pitSummary.tax / report.pitSummary.totalIncome) * 100).toFixed(2)}%
   - Razem obciążenie podatkowe: ${effectiveRate.toFixed(2)}%

2. STRUKTURA PRZYCHODÓW:
   - Z VAT (sprzedaż): ${formatCurrency(report.vatSummary.totalVatSales)}
   - Z PIT (dochody): ${formatCurrency(report.pitSummary.totalIncome)}
   - Razem: ${formatCurrency(totalRevenue)}

3. STRUKTURA WYDATKÓW:
   - VAT (zakupy): ${formatCurrency(report.vatSummary.totalVatPurchases)}
   - PIT (wydatki): ${formatCurrency(report.pitSummary.totalExpenses)}
   - Razem: ${formatCurrency(report.vatSummary.totalVatPurchases + report.pitSummary.totalExpenses)}

4. MARŻA NETTO:
   - Przychody netto (VAT): ${formatCurrency(report.vatSummary.totalVatSales - report.vatSummary.totalVatTax)}
   - Przychody netto (PIT): ${formatCurrency(report.pitSummary.totalIncome - report.pitSummary.tax)}

════════════════════════════════════════════════════════════════
`

    return analysis
  }

  // Private methods
  private getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      draft: 'Szkic',
      generated: 'Wygenerowany',
      exported: 'Wyeksportowany',
      sent: 'Wysłany',
    }
    return labels[status] || status
  }
}

// Export helper functions
export function generateJpkV7XML(report: JpkV7Report): string {
  const generator = new JpkV7Generator(report)
  return generator.generateXML()
}

export function generateJpkV7Report(report: JpkV7Report): string {
  const generator = new JpkV7Generator(report)
  return generator.generateReport()
}

export function generateJpkV7JSON(report: JpkV7Report): string {
  const generator = new JpkV7Generator(report)
  return generator.generateJSON()
}

export function generateJpkV7DetailedCSV(report: JpkV7Report): string {
  const generator = new JpkV7Generator(report)
  return generator.generateDetailedCSV()
}

export function generateJpkV7TaxAnalysis(report: JpkV7Report): string {
  const generator = new JpkV7Generator(report)
  return generator.generateTaxAnalysis()
}
