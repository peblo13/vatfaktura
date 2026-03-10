'use client'

import { useState, useMemo } from 'react'
import { Invoice } from '@/app/invoice-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Eye, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import DeleteInvoiceButton from './delete-invoice-button'

interface InvoicesListProps {
  invoices: Invoice[]
}

export default function InvoicesList({ invoices }: InvoicesListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice =>
      invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [invoices, searchQuery])

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage)
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      case 'sent':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'overdue':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30'
      case 'draft':
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Opłacona'
      case 'sent':
        return 'Wysłana'
      case 'overdue':
        return 'Zaległa'
      case 'draft':
        return 'Szkic'
      default:
        return status
    }
  }

  const shouldShowStatus = (status: string) => {
    return status !== 'draft'
  }

  if (invoices.length === 0) {
    return (
      <Card className="p-12 text-center bg-slate-800/50 backdrop-blur-sm border-blue-500/20 shadow-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Brak faktur</h3>
        <p className="text-blue-200/60 mb-6">Zacznij od utworzenia nowej faktury</p>
        <Link href="/dashboard/create-invoice">
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/50">Utwórz pierwszą fakturę</Button>
        </Link>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 shadow-lg p-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-300 flex-shrink-0" />
          <Input
            type="text"
            placeholder="Szukaj po numerze, kliencie..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="bg-slate-700/50 border-blue-500/20 text-white placeholder-blue-200/50"
          />
          {searchQuery && (
            <p className="text-sm text-blue-300 whitespace-nowrap">
              {filteredInvoices.length} wyników
            </p>
          )}
        </div>
      </Card>

      {filteredInvoices.length === 0 ? (
        <Card className="p-8 text-center bg-slate-800/50 backdrop-blur-sm border-blue-500/20 shadow-lg">
          <p className="text-blue-200/60">Brak faktur spełniających kryteria wyszukiwania</p>
        </Card>
      ) : (
        <>
          {/* Invoices Table - Desktop */}
          <div className="hidden sm:block">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-500/20 bg-slate-900/50">
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-blue-300">Numer</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-blue-300">Klient</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-blue-300">Data</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-blue-300">Status</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs font-semibold text-blue-300">Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedInvoices.map((invoice, index) => (
                      <tr key={invoice.id} className={`border-b border-blue-500/10 hover:bg-blue-500/5 transition-colors ${index % 2 === 0 ? 'bg-slate-800/30' : 'bg-slate-800/20'}`}>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-white">{invoice.number}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-blue-200/80">{invoice.client.name}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-blue-200/80">
                          {new Date(invoice.issueDate).toLocaleDateString('pl-PL')}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                          {shouldShowStatus(invoice.status) && (
                            <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                              {getStatusLabel(invoice.status)}
                            </span>
                          )}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                          <div className="flex items-center justify-end gap-1 sm:gap-3">
                            <Link href={`/dashboard/invoices/${invoice.id}`}>
                              <button className="px-2 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-300 hover:text-blue-200 transition-all border border-blue-500/30 hover:border-blue-500/50 text-xs sm:text-sm font-medium min-h-[36px]">
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Podgląd</span>
                              </button>
                            </Link>
                            <button
                              onClick={() => window.print()}
                              className="px-2 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg text-cyan-300 hover:text-cyan-200 transition-all border border-cyan-500/30 hover:border-cyan-500/50 text-xs sm:text-sm font-medium min-h-[36px]"
                            >
                              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Pobierz</span>
                            </button>
                            <DeleteInvoiceButton invoiceId={invoice.id} invoiceNumber={invoice.number} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Invoices Cards - Mobile */}
          <div className="sm:hidden space-y-3">
            {paginatedInvoices.map((invoice) => (
              <Card key={invoice.id} className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 shadow-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm truncate">{invoice.number}</p>
                      <p className="text-xs text-blue-200/70 truncate">{invoice.client.name}</p>
                    </div>
                    {shouldShowStatus(invoice.status) && (
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap flex-shrink-0 ${getStatusColor(invoice.status)}`}>
                        {getStatusLabel(invoice.status)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-blue-300/60">
                    {new Date(invoice.issueDate).toLocaleDateString('pl-PL')}
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <Link href={`/dashboard/invoices/${invoice.id}`} className="flex-1">
                      <button className="w-full px-3 py-2 flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-300 hover:text-blue-200 transition-all border border-blue-500/30 hover:border-blue-500/50 text-xs font-medium min-h-[36px]">
                        <Eye className="w-3 h-3" />
                        Podgląd
                      </button>
                    </Link>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-2 flex items-center justify-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg text-cyan-300 hover:text-cyan-200 transition-all border border-cyan-500/30 hover:border-cyan-500/50 text-xs font-medium min-h-[36px]"
                    >
                      <Download className="w-3 h-3" />
                    </button>
                    <DeleteInvoiceButton invoiceId={invoice.id} invoiceNumber={invoice.number} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 shadow-lg p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-blue-200/70 text-center sm:text-left">
                Strona {currentPage} z {totalPages} • {filteredInvoices.length} faktur
              </p>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                  variant="outline"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Poprzednia</span>
                </Button>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                  variant="outline"
                >
                  <span className="hidden xs:inline">Następna</span>
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
