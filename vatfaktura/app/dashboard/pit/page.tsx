'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { Plus, ArrowLeft, FileText, Calculator, TrendingUp, CreditCard, BarChart3, Send } from 'lucide-react'
import Link from 'next/link'
import { getPitDeclarationsByUser, getJpkV7ReportsByUser } from '@/lib/pit/pit-store'
import { PitDeclaration, JpkV7Report } from '@/lib/types/pit-types'

export default function PitPage() {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const [mounted, setMounted] = useState(false)
  const [declarations, setDeclarations] = useState<PitDeclaration[]>([])
  const [jpkReports, setJpkReports] = useState<JpkV7Report[]>([])

  useEffect(() => {
    setMounted(true)
    if (!isLoading && !user) {
      router.push('/login')
    } else if (user) {
      setDeclarations(getPitDeclarationsByUser(user.id))
      setJpkReports(getJpkV7ReportsByUser(user.id))
    }
  }, [user, isLoading, router])

  if (!mounted || isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary/30 border-t-primary"></div>
      </div>
    )
  }

  const pit37Declarations = declarations.filter(d => d.type === 'PIT-37')
  const pit36Declarations = declarations.filter(d => d.type === 'PIT-36')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-card/50 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">System PIT</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-6 rounded-lg border border-border/40 bg-card/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">PIT-37</span>
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-bold">{pit37Declarations.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Deklaracje</p>
          </div>

          <div className="p-6 rounded-lg border border-border/40 bg-card/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">PIT-36</span>
              <CreditCard className="w-4 h-4 text-accent" />
            </div>
            <div className="text-3xl font-bold">{pit36Declarations.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Deklaracje</p>
          </div>

          <div className="p-6 rounded-lg border border-border/40 bg-card/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">JPK-V7</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold">{jpkReports.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Raporty</p>
          </div>

          <div className="p-6 rounded-lg border border-border/40 bg-card/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">e-podatki</span>
              <Send className="w-4 h-4 text-accent" />
            </div>
            <Link href="/dashboard/pit/epodatki" className="text-primary hover:underline text-sm">
              Wysyłaj Deklaracje
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/dashboard/pit/pit-37/create" className="group">
            <div className="p-6 rounded-lg border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition cursor-pointer h-full">
              <Plus className="w-8 h-8 text-primary group-hover:scale-110 transition mb-3" />
              <h3 className="font-semibold mb-1">Nowa PIT-37</h3>
              <p className="text-sm text-muted-foreground">Utwórz deklarację dla przedsiębiorcy</p>
            </div>
          </Link>

          <Link href="/dashboard/pit/pit-36/create" className="group">
            <div className="p-6 rounded-lg border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition cursor-pointer h-full">
              <Plus className="w-8 h-8 text-accent group-hover:scale-110 transition mb-3" />
              <h3 className="font-semibold mb-1">Nowa PIT-36</h3>
              <p className="text-sm text-muted-foreground">Utwórz deklarację dla osoby fizycznej</p>
            </div>
          </Link>

          <Link href="/dashboard/pit/calculator" className="group">
            <div className="p-6 rounded-lg border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition cursor-pointer h-full">
              <Calculator className="w-8 h-8 text-green-500 group-hover:scale-110 transition mb-3" />
              <h3 className="font-semibold mb-1">Kalkulator PIT</h3>
              <p className="text-sm text-muted-foreground">Oblicz podatek w czasie rzeczywistym</p>
            </div>
          </Link>

          <Link href="/dashboard/pit/costs" className="group">
            <div className="p-6 rounded-lg border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition cursor-pointer h-full">
              <BarChart3 className="w-8 h-8 text-purple-500 group-hover:scale-110 transition mb-3" />
              <h3 className="font-semibold mb-1">Zarządzanie Kosztami</h3>
              <p className="text-sm text-muted-foreground">Śledzenie i amortyzacja kosztów</p>
            </div>
          </Link>
        </div>

        {/* PIT-37 Section */}
        <div className="border border-border/40 bg-card/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <div>
                <h2 className="text-xl font-bold">Deklaracje PIT-37</h2>
                <p className="text-xs text-muted-foreground">Dla podatników prowadzących działalność gospodarczą</p>
              </div>
            </div>
            <Link href="/dashboard/pit/pit-37" className="text-sm text-primary hover:underline">
              Pokaż wszystkie
            </Link>
          </div>

          {pit37Declarations.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">Brak deklaracji PIT-37</p>
              <Link href="/dashboard/pit/pit-37/create" className="text-primary hover:underline text-sm">
                Utwórz nową deklarację
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {pit37Declarations.slice(-3).reverse().map((decl) => (
                <Link key={decl.id} href={`/dashboard/pit/pit-37/${decl.id}`}>
                  <div className="p-3 rounded-lg border border-border/40 hover:bg-card/50 transition flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">Rok {decl.year}</p>
                      <p className="text-xs text-muted-foreground">
                        Status: <span className={`${
                          decl.status === 'submitted' ? 'text-green-400' :
                          decl.status === 'completed' ? 'text-blue-400' :
                          'text-yellow-400'
                        }`}>{decl.status}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{decl.taxToPay?.toFixed(2)} PLN</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* PIT-36 Section */}
        <div className="border border-border/40 bg-card/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-accent" />
              <div>
                <h2 className="text-xl font-bold">Deklaracje PIT-36</h2>
                <p className="text-xs text-muted-foreground">Dla osób fizycznych otrzymujących dochody</p>
              </div>
            </div>
            <Link href="/dashboard/pit/pit-36" className="text-sm text-primary hover:underline">
              Pokaż wszystkie
            </Link>
          </div>

          {pit36Declarations.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">Brak deklaracji PIT-36</p>
              <Link href="/dashboard/pit/pit-36/create" className="text-primary hover:underline text-sm">
                Utwórz nową deklarację
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {pit36Declarations.slice(-3).reverse().map((decl) => (
                <Link key={decl.id} href={`/dashboard/pit/pit-36/${decl.id}`}>
                  <div className="p-3 rounded-lg border border-border/40 hover:bg-card/50 transition flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">Rok {decl.year}</p>
                      <p className="text-xs text-muted-foreground">
                        Status: <span className={`${
                          decl.status === 'submitted' ? 'text-green-400' :
                          decl.status === 'completed' ? 'text-blue-400' :
                          'text-yellow-400'
                        }`}>{decl.status}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{decl.taxToPay?.toFixed(2)} PLN</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* JPK-V7 Section */}
        <div className="border border-border/40 bg-card/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <div>
                <h2 className="text-xl font-bold">Raporty JPK-V7</h2>
                <p className="text-xs text-muted-foreground">Zintegrowane raporty VAT i PIT</p>
              </div>
            </div>
            <Link href="/dashboard/pit/jpk-v7" className="text-sm text-primary hover:underline">
              Pokaż wszystkie
            </Link>
          </div>

          {jpkReports.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">Brak raportów JPK-V7</p>
            </div>
          ) : (
            <div className="space-y-2">
              {jpkReports.slice(-3).reverse().map((report) => (
                <div key={report.id} className="p-3 rounded-lg border border-border/40 hover:bg-card/50 transition flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">Rok {report.year} {report.quarter ? `- Q${report.quarter}` : ''}</p>
                    <p className="text-xs text-muted-foreground">
                      Status: <span className={`${
                        report.status === 'exported' ? 'text-green-400' :
                        report.status === 'generated' ? 'text-blue-400' :
                        'text-yellow-400'
                      }`}>{report.status}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{report.pitSummary.tax.toFixed(2)} PLN</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
