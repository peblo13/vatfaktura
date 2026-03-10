'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useInvoices } from '../invoice-context'
import { Plus, LogOut, FileText, CreditCard, Calculator, TrendingUp, MoreVertical } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading, logout } = useUser()
  const { getInvoicesByUser } = useInvoices()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (!mounted || isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary/30 border-t-primary"></div>
      </div>
    )
  }

  const userInvoices = getInvoicesByUser(user.id)
  const invoiceCount = userInvoices.length
  const paidInvoices = userInvoices.filter(inv => inv.status === 'paid').length
  const totalAmount = userInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">VAT Faktura</h1>
              <p className="text-xs text-muted-foreground">{user.company}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-card/50 rounded-lg transition border border-border/40"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Wyloguj</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-6 rounded-lg border border-border/40 bg-card/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Faktury</span>
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-bold">{invoiceCount}</div>
            <p className="text-xs text-muted-foreground mt-1">{paidInvoices} zapłaconych</p>
          </div>

          <div className="p-6 rounded-lg border border-border/40 bg-card/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Przychód</span>
              <TrendingUp className="w-4 h-4 text-accent" />
            </div>
            <div className="text-3xl font-bold">{(totalAmount / 1000).toFixed(1)}k PLN</div>
            <p className="text-xs text-muted-foreground mt-1">Łącznie</p>
          </div>

          <div className="p-6 rounded-lg border border-border/40 bg-card/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Plan</span>
              <CreditCard className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold">Bezpłatny</div>
            <p className="text-xs text-muted-foreground mt-1">Zawsze darmowy</p>
          </div>

          <div className="p-6 rounded-lg border border-border/40 bg-card/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">PIT</span>
              <Calculator className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-3xl font-bold">-</div>
            <p className="text-xs text-muted-foreground mt-1">Zarządzaj kosztami</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4">
          <Link href="/dashboard/create-invoice" className="group">
            <div className="p-6 rounded-lg border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition cursor-pointer">
              <Plus className="w-8 h-8 text-primary group-hover:scale-110 transition mb-3" />
              <h3 className="font-semibold mb-1">Nowa Faktura</h3>
              <p className="text-sm text-muted-foreground">Utwórz nową fakturę VAT</p>
            </div>
          </Link>

          <Link href="/dashboard/pit/calculator" className="group">
            <div className="p-6 rounded-lg border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition cursor-pointer">
              <Calculator className="w-8 h-8 text-accent group-hover:scale-110 transition mb-3" />
              <h3 className="font-semibold mb-1">Kalkulator PIT</h3>
              <p className="text-sm text-muted-foreground">Oblicz podatek w czasie rzeczywistym</p>
            </div>
          </Link>

          <Link href="/dashboard/pit" className="group">
            <div className="p-6 rounded-lg border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition cursor-pointer">
              <TrendingUp className="w-8 h-8 text-green-500 group-hover:scale-110 transition mb-3" />
              <h3 className="font-semibold mb-1">System PIT</h3>
              <p className="text-sm text-muted-foreground">Deklaracje PIT i raporty</p>
            </div>
          </Link>

          <Link href="/dashboard/pit/costs" className="group">
            <div className="p-6 rounded-lg border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition cursor-pointer">
              <CreditCard className="w-8 h-8 text-purple-500 group-hover:scale-110 transition mb-3" />
              <h3 className="font-semibold mb-1">Zarządzanie Kosztami</h3>
              <p className="text-sm text-muted-foreground">Śledzenie wydatków biznesowych</p>
            </div>
          </Link>
        </div>
          </Link>

          <Link href="/dashboard/pit/calculator" className="group">
            <div className="p-6 rounded-lg border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition cursor-pointer">
              <Calculator className="w-8 h-8 text-accent group-hover:scale-110 transition mb-3" />
              <h3 className="font-semibold mb-1">Kalkulator PIT</h3>
              <p className="text-sm text-muted-foreground">Oblicz podatek w czasie rzeczywistym</p>
            </div>
          </Link>

          <Link href="/dashboard/pit" className="group">
            <div className="p-6 rounded-lg border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition cursor-pointer">
              <TrendingUp className="w-8 h-8 text-green-500 group-hover:scale-110 transition mb-3" />
              <h3 className="font-semibold mb-1">System PIT</h3>
              <p className="text-sm text-muted-foreground">Deklaracje PIT-37, PIT-36</p>
            </div>
          </Link>
        </div>

        {/* Recent Invoices */}
        <div className="border border-border/40 bg-card/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Ostatnie Faktury</h2>
            <Link href="/dashboard/invoices" className="text-sm text-primary hover:underline">
              Pokaż wszystkie
            </Link>
          </div>

          {userInvoices.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Brak faktur. Utwórz pierwszą fakturę!</p>
              <Link href="/dashboard/create-invoice" className="text-primary hover:underline text-sm mt-2 inline-block">
                Utwórz fakturę
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {userInvoices.slice(-5).reverse().map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg border border-border/40 hover:bg-card/50 transition">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{invoice.number}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        invoice.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                        invoice.status === 'sent' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{invoice.client.name}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-semibold">{(invoice.total || 0).toFixed(2)} PLN</div>
                    <p className="text-xs text-muted-foreground">{invoice.issueDate}</p>
                  </div>
                  <button className="ml-4 p-2 hover:bg-card rounded transition">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
