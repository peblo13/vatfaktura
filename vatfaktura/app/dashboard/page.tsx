'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useInvoices } from '../invoice-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, LogOut, FileText, CreditCard, Search, Filter, X } from 'lucide-react'
import Link from 'next/link'
import InvoicesList from '@/components/invoices-list'
import DashboardStats from '@/components/dashboard-stats'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading, logout } = useUser()
  const { getInvoicesByUser } = useInvoices()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'sent' | 'paid'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'client'>('date')

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

  // Filtrowanie i sortowanie
  const filteredInvoices = userInvoices
    .filter(invoice => {
      const matchesSearch = 
        invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus
      
      return matchesSearch && matchesStatus
    })
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">VAT Faktura</h1>
                <p className="text-blue-300/70 text-sm">Witaj, {user.company}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-blue-300 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all border border-blue-500/30 hover:border-blue-500/50"
          >
            <LogOut className="w-4 h-4" />
            Wyloguj się
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Stats */}
        <DashboardStats invoices={userInvoices} />

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Link href="/dashboard/create-invoice" className="group">
            <Button className="w-full min-h-[44px] bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/75 transition-all">
              <Plus className="w-4 h-4 mr-2" />
              Nowa faktura
            </Button>
          </Link>
          <Link href="/dashboard/templates" className="group">
            <Button variant="outline" className="w-full min-h-[44px] border-blue-500/30 hover:bg-blue-500/10 text-blue-300 group-hover:border-blue-500/50 transition-all">
              <FileText className="w-4 h-4 mr-2" />
              Szablony
            </Button>
          </Link>
          <Link href="/dashboard/billing" className="group">
            <Button variant="outline" className="w-full min-h-[44px] border-blue-500/30 hover:bg-blue-500/10 text-blue-300 group-hover:border-blue-500/50 transition-all">
              <CreditCard className="w-4 h-4 mr-2" />
              Plan
            </Button>
          </Link>
          <Link href="/dashboard/settings" className="group">
            <Button variant="outline" className="w-full min-h-[44px] border-blue-500/30 hover:bg-blue-500/10 text-blue-300 group-hover:border-blue-500/50 transition-all">
              Ustawienia
            </Button>
          </Link>
        </div>

        {/* Invoices List */}
        <div className="mt-8">
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300/50" />
              <Input
                type="text"
                placeholder="Szukaj po numerze faktury lub nazwie klienta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700/50 border-blue-500/30 text-white placeholder:text-blue-300/50 focus:border-blue-500/50"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300/50 hover:text-blue-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-300/70" />
                <span className="text-sm text-blue-300/70">Status:</span>
              </div>
              {(['all', 'draft', 'sent', 'paid'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    filterStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700/50 text-blue-300/70 hover:bg-slate-700'
                  }`}
                >
                  {status === 'all' ? 'Wszystkie' : status === 'draft' ? 'Drafty' : status === 'sent' ? 'Wysłane' : 'Zapłacone'}
                </button>
              ))}

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-300/70">Sortuj:</span>
              </div>
              {(['date', 'amount', 'client'] as const).map((sort) => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    sortBy === sort
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700/50 text-blue-300/70 hover:bg-slate-700'
                  }`}
                >
                  {sort === 'date' ? 'Dacie' : sort === 'amount' ? 'Kwocie' : 'Kliencie'}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <p className="text-sm text-blue-300/70">
              Znaleziono {filteredInvoices.length} faktur{filteredInvoices.length === 1 ? 'ę' : filteredInvoices.length % 10 === 2 || filteredInvoices.length % 10 === 3 || filteredInvoices.length % 10 === 4 ? 'y' : ''}
            </p>
          </div>

          <InvoicesList invoices={filteredInvoices} />
        </div>
      </main>
    </div>
  )
}
