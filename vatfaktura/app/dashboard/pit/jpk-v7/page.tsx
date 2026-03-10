'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { ArrowLeft, Plus, Download, FileText, TrendingUp, FileJson } from 'lucide-react'
import Link from 'next/link'
import { getInvoicesByUser } from '@/lib/invoices-store'
import { getPitDeclarationsByUser } from '@/lib/pit/pit-store'
import { JpkV7Report } from '@/lib/types/pit-types'

export default function JpkV7Page() {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const [mounted, setMounted] = useState(false)
  const [reports, setReports] = useState<JpkV7Report[]>([])
  const [showGenerate, setShowGenerate] = useState(false)
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedQuarter, setSelectedQuarter] = useState(0)

  useEffect(() => {
    setMounted(true)
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  const generateReport = () => {
    if (!user) return

    const invoices = getInvoicesByUser(user.id)
    const declarations = getPitDeclarationsByUser(user.id)

    // Filter invoices for selected period
    const filteredInvoices = invoices.filter(inv => {
      const invoiceYear = new Date(inv.issueDate).getFullYear()
      if (invoiceYear !== selectedYear) return false

      if (selectedQuarter > 0) {
        const invoiceMonth = new Date(inv.issueDate).getMonth()
        const quarter = Math.floor(invoiceMonth / 3) + 1
        return quarter === selectedQuarter
      }

      return true
    })

    // Calculate VAT summary
    const vatOutput = {
      totalGross: filteredInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0),
      totalVat: filteredInvoices.reduce((sum, inv) => sum + (inv.vat || 0), 0),
      invoiceCount: filteredInvoices.length,
    }

    // Get PIT declarations for the year
    const yearDeclarations = declarations.filter(d => d.year === selectedYear)
    const pitSummary = {
      tax: yearDeclarations.reduce((sum, d) => sum + (d.taxToPay || 0), 0),
      declarations: yearDeclarations.length,
    }

    const report: JpkV7Report = {
      id: `jpk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      year: selectedYear,
      quarter: selectedQuarter,
      status: 'generated',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      vatSummary: vatOutput,
      pitSummary: pitSummary,
      invoiceCount: filteredInvoices.length,
    }

    setReports([...reports, report])
    setShowGenerate(false)
  }

  const handleExportXML = (report: JpkV7Report) => {
    const xmlContent = generateJpkV7XML(report, user?.company || 'Twoja Firma')
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(xmlContent))
    element.setAttribute('download', `JPK_V7_${report.year}_Q${report.quarter || '00'}.xml`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (!mounted || isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary/30 border-t-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/pit" className="p-2 hover:bg-card/50 rounded-lg transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h1 className="text-2xl font-bold">Raporty JPK-V7</h1>
            </div>
          </div>
          <button
            onClick={() => setShowGenerate(!showGenerate)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
          >
            <Plus className="w-4 h-4" />
            Generuj Raport
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Generate Form */}
        {showGenerate && (
          <div className="border border-border/40 bg-card/30 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Generuj Nowy Raport JPK-V7</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rok</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                >
                  <option value={2024}>2024</option>
                  <option value={2023}>2023</option>
                  <option value={2022}>2022</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Kwartał (opcjonalnie)</label>
                <select
                  value={selectedQuarter}
                  onChange={(e) => setSelectedQuarter(parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                >
                  <option value={0}>Całoroczny</option>
                  <option value={1}>Q1 (styczeń-marzec)</option>
                  <option value={2}>Q2 (kwiecień-czerwiec)</option>
                  <option value={3}>Q3 (lipiec-wrzesień)</option>
                  <option value={4}>Q4 (październik-grudzień)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={generateReport}
                className="flex-1 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
              >
                Generuj
              </button>
              <button
                onClick={() => setShowGenerate(false)}
                className="flex-1 px-6 py-2 border border-border/40 text-foreground rounded-lg hover:bg-card/50 transition"
              >
                Anuluj
              </button>
            </div>
          </div>
        )}

        {/* Reports List */}
        <div className="border border-border/40 bg-card/30 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-6">Wygenerowane Raporty</h2>

          {reports.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Brak wygenerowanych raportów</p>
              <button
                onClick={() => setShowGenerate(true)}
                className="text-primary hover:underline"
              >
                Generuj pierwszy raport
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="p-4 rounded-lg border border-border/40 hover:bg-card/50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-green-500" />
                        <p className="font-medium">
                          JPK-V7 {report.year}
                          {report.quarter ? ` - Q${report.quarter}` : ' (Całoroczny)'}
                        </p>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                          {report.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-3 text-sm text-muted-foreground">
                        <div>
                          <p className="text-xs">Faktury</p>
                          <p className="font-semibold text-foreground">{report.invoiceCount}</p>
                        </div>
                        <div>
                          <p className="text-xs">VAT</p>
                          <p className="font-semibold text-foreground">{report.vatSummary.totalVat.toFixed(2)} PLN</p>
                        </div>
                        <div>
                          <p className="text-xs">PIT</p>
                          <p className="font-semibold text-foreground">{report.pitSummary.tax.toFixed(2)} PLN</p>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground mt-2">
                        Utworzony: {new Date(report.createdAt).toLocaleDateString('pl-PL')}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleExportXML(report)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition text-sm"
                      >
                        <Download className="w-4 h-4" />
                        XML
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition text-sm">
                        <FileJson className="w-4 h-4" />
                        JSON
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="border border-border/40 bg-card/30 rounded-lg p-6">
          <h3 className="font-bold mb-3">Informacje o JPK-V7</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>JPK-V7 to zintegrowany raport zawierający:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Podsumowanie VAT z wydanych faktur</li>
              <li>Podsumowanie PIT z deklaracji podatkowych</li>
              <li>Dane sprzedaży i zakupów</li>
              <li>Dane o dochodach i kosztach</li>
            </ul>
            <p className="mt-3">Raport można wysłać do e-podatki w formacie XML.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

function generateJpkV7XML(report: JpkV7Report, companyName: string): string {
  const periodStart = report.quarter
    ? `${report.year}-${String((report.quarter - 1) * 3 + 1).padStart(2, '0')}-01`
    : `${report.year}-01-01`
  const periodEnd = report.quarter
    ? `${report.year}-${String(report.quarter * 3).padStart(2, '0')}-${getDaysInMonth(
        report.year,
        report.quarter * 3
      )}`
    : `${report.year}-12-31`

  return `<?xml version="1.0" encoding="UTF-8"?>
<JPK_V7 xmlns="http://jpk.mf.gov.pl/wzor/2024/02/07/11357/" version="24-2">
  <Naglowek>
    <KodFormularza>JPK_V7</KodFormularza>
    <WariantFormularza>A</WariantFormularza>
    <LiczbaStron>1</LiczbaStron>
    <LiczbaWierszyNetto>0</LiczbaWierszyNetto>
    <LiczbaWierszyBrutto>${report.invoiceCount}</LiczbaWierszyBrutto>
    <DataWytworzeniaJPK>${new Date().toISOString().split('T')[0]}</DataWytworzeniaJPK>
    <DataOd>${periodStart}</DataOd>
    <DataDo>${periodEnd}</DataDo>
    <NazwaSystemu>VAT Faktura</NazwaSystemu>
    <WersjaSystemu>1.0</WersjaSystemu>
  </Naglowek>
  <Podmiot1>
    <NazwaPodmiotu>${companyName}</NazwaPodmiotu>
    <REGON></REGON>
    <NIP></NIP>
  </Podmiot1>
  <Umowa>
    <Wersja>1.0</Wersja>
    <IsTestCaseOfJPK>false</IsTestCaseOfJPK>
  </Umowa>
  <PIT>
    <PodatekDoZaplaty>${report.pitSummary.tax.toFixed(2)}</PodatekDoZaplaty>
    <LiczbaDeklaracji>${report.pitSummary.declarations}</LiczbaDeklaracji>
  </PIT>
  <VAT>
    <SumaVAT>${report.vatSummary.totalVat.toFixed(2)}</SumaVAT>
    <LiczbaFaktur>${report.invoiceCount}</LiczbaFaktur>
    <SumaBrutto>${report.vatSummary.totalGross.toFixed(2)}</SumaBrutto>
  </VAT>
  <ZalacznikXML>
  </ZalacznikXML>
</JPK_V7>`
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}
