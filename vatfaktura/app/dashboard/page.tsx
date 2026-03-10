'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useInvoices } from '../invoice-context'
import { Plus, LogOut, FileText, CreditCard, Search, Filter, X } from 'lucide-react'
import Link from 'next/link'
import DashboardStats from '@/components/dashboard-stats'
import { SupportBanner } from '@/components/support-banner'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading, logout } = useUser()
  const { getInvoicesByUser } = useInvoices()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500/30 border-t-blue-500"></div>
      </div>
    )
  }

  const userInvoices = getInvoicesByUser(user.id)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
      } else if (sortBy === 'amount') {
        const totalA = a.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
        const totalB = b.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
        return totalB - totalA
      } else if (sortBy === 'client') {
        return a.client.name.localeCompare(b.client.name)
      }
      return 0
    })

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 flex items-center justify-between min-h-[56px] sm:min-h-[64px]">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50 flex-shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent truncate">VAT Faktura</h1>
                <p className="text-blue-300/70 text-xs sm:text-sm truncate hidden xs:block">Witaj, {user.company}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-blue-300 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all border border-blue-500/30 hover:border-blue-500/50 min-h-[44px] ml-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Wyloguj się</span>
            <span className="sm:hidden">Wyloguj</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 relative z-10 space-y-6 sm:space-y-8">
        {/* Support Banner */}
        <SupportBanner />

        {/* Stats */}
        <DashboardStats invoices={userInvoices} />

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
          <Link href="/dashboard/create-invoice" className="group">
            <button className="w-full min-h-[44px] text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/75 transition-all rounded px-3 py-2 text-white flex items-center justify-center gap-1">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Nowa faktura</span>
              <span className="sm:hidden">Nowa</span>
            </button>
          </Link>
          <Link href="/dashboard/templates" className="group">
            <button className="w-full min-h-[44px] text-xs sm:text-sm font-medium border border-blue-500/30 hover:bg-blue-500/10 text-blue-300 group-hover:border-blue-500/50 transition-all rounded px-3 py-2 flex items-center justify-center gap-1">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Szablony</span>
              <span className="sm:hidden">Sza</span>
            </button>
          </Link>
          <Link href="/blog" className="group">
            <button className="w-full min-h-[44px] text-xs sm:text-sm font-medium border border-purple-500/30 hover:bg-purple-500/10 text-purple-300 group-hover:border-purple-500/50 transition-all rounded px-3 py-2 flex items-center justify-center gap-1">
              <Calculator className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Blog</span>
              <span className="sm:hidden">Blog</span>
            </button>
          </Link>
          <Link href="/dashboard/billing" className="group">
            <button className="w-full min-h-[44px] text-xs sm:text-sm font-medium border border-blue-500/30 hover:bg-blue-500/10 text-blue-300 group-hover:border-blue-500/50 transition-all rounded px-3 py-2 flex items-center justify-center gap-1">
              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Plan</span>
            </button>
          </Link>
          <Link href="/dashboard/settings" className="group">
            <button className="w-full min-h-[44px] text-xs sm:text-sm font-medium border border-blue-500/30 hover:bg-blue-500/10 text-blue-300 group-hover:border-blue-500/50 transition-all rounded px-3 py-2 flex items-center justify-center gap-1">
              <span className="hidden sm:inline">Ustawienia</span>
              <span className="sm:hidden">Ust</span>
            </button>
          </Link>
        </div>

        {/* Invoices List */}
        <div className="mt-6 sm:mt-8">
          <p className="text-blue-300/70 text-sm">Twoje faktury będą wyświetlane tutaj...</p>
        </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-blue-300/70 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-blue-300/70">Status:</span>
                <div className="flex gap-1 sm:gap-2 flex-wrap flex-1">
                  {(['all', 'draft', 'sent', 'paid'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all min-h-[36px] sm:min-h-[40px] flex items-center justify-center ${
                        filterStatus === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700/50 text-blue-300/70 hover:bg-slate-700'
                      }`}
                    >
                      {status === 'all' ? 'Wszystkie' : status === 'draft' ? 'Drafty' : status === 'sent' ? 'Wysłane' : 'Zapłacone'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm text-blue-300/70">Sortuj:</span>
                <div className="flex gap-1 sm:gap-2 flex-wrap flex-1">
                  {(['date', 'amount', 'client'] as const).map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setSortBy(sort)}
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all min-h-[36px] sm:min-h-[40px] flex items-center justify-center ${
                        sortBy === sort
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-700/50 text-blue-300/70 hover:bg-slate-700'
                      }`}
                    >
                      {sort === 'date' ? 'Dacie' : sort === 'amount' ? 'Kwocie' : 'Kliencie'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-xs sm:text-sm text-blue-300/70">
              Znaleziono {filteredInvoices.length} faktur{filteredInvoices.length === 1 ? 'ę' : filteredInvoices.length % 10 === 2 || filteredInvoices.length % 10 === 3 || filteredInvoices.length % 10 === 4 ? 'y' : ''}
            </p>
          </div>

          <InvoicesList invoices={filteredInvoices} />
        </div>
      </main>
    </div>
  )
}
