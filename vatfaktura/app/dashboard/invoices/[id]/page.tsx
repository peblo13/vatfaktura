'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useInvoices, Invoice } from '@/app/invoice-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, Eye, Download, Printer, Trash2, Edit, FileText, Clock, Send, CheckCircle, AlertCircle, Copy } from 'lucide-react'
import Link from 'next/link'
import DeleteInvoiceButton from '@/components/delete-invoice-button'

export default function InvoiceViewPage() {
  const router = useRouter()
  const params = useParams()
  const { user, isLoading } = useUser()
  const { getInvoicesByUser, updateInvoice, updateInvoiceStatus, duplicateInvoice } = useInvoices()
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [editingStatus, setEditingStatus] = useState(false)
  const [ksefStatus, setKsefStatus] = useState<{
    submitting: boolean
    submitted: boolean
    error: string | null
    reference?: string
  }>({
    submitting: false,
    submitted: false,
    error: null,
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      const userInvoices = getInvoicesByUser(user.id)
      const found = userInvoices.find(inv => inv.id === params.id)
      setInvoice(found || null)
    }
  }, [user, isLoading, params.id, getInvoicesByUser, router])

  const handleStatusChange = (newStatus: 'draft' | 'sent' | 'paid' | 'overdue') => {
    if (invoice) {
      const user = localStorage.getItem('user')
      const userName = user ? JSON.parse(user).email : 'System'
      updateInvoiceStatus(invoice.id, newStatus, userName)
      setInvoice({ ...invoice, status: newStatus })
      setEditingStatus(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
      case 'sent':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-300'
      case 'overdue':
        return 'bg-rose-500/20 border-rose-500/30 text-rose-300'
      default:
        return 'bg-slate-500/20 border-slate-500/30 text-slate-300'
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
        return ''
      default:
        return status
    }
  }

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('pl-PL', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pl-PL', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    })
  }

  const exportToCSV = () => {
    if (!invoice) return
    
    const total = invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
    const totalWithVat = total * 1.23

    const headers = ['Numer', 'Klient', 'Data wystawienia', 'Termin płatności', 'Status', 'Netto', 'VAT', 'Razem']
    const rows = [
      [
        invoice.number,
        invoice.client.name,
        formatDate(invoice.issueDate),
        formatDate(invoice.dueDate),
        getStatusLabel(invoice.status),
        total.toFixed(2),
        (totalWithVat - total).toFixed(2),
        totalWithVat.toFixed(2)
      ]
    ]

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `faktura_${invoice.number}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExportToCSV = exportToCSV

  const handleExportToPDF = async () => {
    if (!invoice || !user) return
    
    try {
      const response = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoice,
          user,
          items: invoice.items,
        }),
      })

      if (!response.ok) {
        throw new Error('Nie udało się wygenerować PDF')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `faktura_${invoice.number}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Błąd przy pobieraniu PDF:', error)
      alert('Nie udało się pobrać PDF. Spróbuj ponownie.')
    }
  }

  const handleExportToKsef = async () => {
    if (!invoice || !user) return

    setKsefStatus({ submitting: true, submitted: false, error: null })

    try {
      // Przygotowanie danych z wszystkimi wymaganymi polami
      const response = await fetch('/api/ksef/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          invoiceId: invoice.id,
          invoiceData: {
            number: invoice.number,
            issueDate: invoice.issueDate,
            dueDate: invoice.dueDate,
            currency: 'PLN',
            seller: {
              name: user.company,
              nip: user.nip,
              address: user.address || '',
              city: user.city || '',
              postalCode: user.postalCode || '',
            },
            buyer: {
              name: invoice.client.name,
              nip: invoice.client.nip || '',
              address: invoice.client.address || '',
              city: invoice.client.city || '',
              postalCode: invoice.client.postalCode || '',
            },
            items: invoice.items.map((item, idx) => ({
              id: item.id || String(idx + 1),
              name: item.name,
              description: item.description || item.name,
              quantity: item.quantity,
              unitCode: 'EA', // Each/piece
              unitPrice: item.unitPrice,
              taxPercent: item.taxPercent || 23,
            })),
            notes: invoice.notes || '',
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Błąd przy wysyłaniu do kSEF')
      }

      setKsefStatus({
        submitting: false,
        submitted: true,
        error: null,
        reference: data.data?.referenceNumber || data.referenceNumber,
      })

      // Zaktualizuj status faktury
      updateInvoiceStatus(invoice.id, 'sent', user.email || 'System')
      setInvoice({ ...invoice, status: 'sent' })

      // Pokaż wiadomość o sukcesie
      setTimeout(() => {
        alert('Faktura wysłana do kSEF pomyślnie!')
      }, 100)
    } catch (error) {
      console.error('[v0] kSEF submit error:', error)
      setKsefStatus({
        submitting: false,
        submitted: false,
        error: error instanceof Error ? error.message : 'Nieznany błąd',
      })
      alert(`Błąd wysłania do kSEF: ${error instanceof Error ? error.message : 'Nieznany błąd'}`)
    }
  }

  const handleDuplicateInvoice = () => {
    if (!invoice) return
    const duplicated = duplicateInvoice(invoice.id)
    if (duplicated) {
      router.push(`/dashboard/invoices/${duplicated.id}`)
    }
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500/30 border-t-blue-500"></div>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="min-h-screen relative">
        <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
            <Link href="/dashboard">
              <button className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-300 hover:text-blue-100">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-white">Faktura nie znaleziona</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-blue-200/70">Faktura którą szukasz nie istnieje.</p>
          <Link href="/dashboard">
            <Button className="mt-4">Wróć na dashboard</Button>
          </Link>
        </main>
      </div>
    )
  }

  const total = invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const totalWithVat = total * 1.23

  return (
    <div className="min-h-screen relative">
      <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <button className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-300 hover:text-blue-100">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {invoice.number}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {invoice.status !== 'draft' && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                {getStatusLabel(invoice.status)}
              </span>
            )}
            <Link href={`/dashboard/create-invoice?edit=${invoice.id}`}>
              <Button variant="outline" className="border-blue-500/30 hover:bg-blue-500/10 text-blue-300">
                <Edit className="w-4 h-4 mr-2" />
                Edytuj
              </Button>
            </Link>
            <DeleteInvoiceButton invoiceNumber={invoice.number} invoiceId={invoice.id} />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* kSEF Status Alerts */}
        {ksefStatus.submitted && (
          <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-300">Faktura wysłana do kSEF</p>
              {ksefStatus.reference && (
                <p className="text-sm text-emerald-200/70">Numer referencyjny: {ksefStatus.reference}</p>
              )}
            </div>
          </div>
        )}
        {ksefStatus.error && (
          <div className="mb-6 p-4 bg-rose-500/20 border border-rose-500/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-300 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-300">Błąd przy wysyłaniu do kSEF</p>
              <p className="text-sm text-rose-200/70">{ksefStatus.error}</p>
            </div>
          </div>
        )}
        
        <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 p-8 shadow-lg print:shadow-none">
          {/* Invoice Header */}
          <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-blue-500/20">
            <div>
              <h2 className="text-xs text-blue-300 font-semibold mb-2">WYSTAWIAJĄCY</h2>
              <p className="text-lg font-semibold text-white">{user.company}</p>
              <p className="text-sm text-blue-200/70">NIP: {user.nip}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xs text-blue-300 font-semibold mb-2">NABYWCA</h2>
              <p className="text-lg font-semibold text-white">{invoice.client.name}</p>
              <p className="text-sm text-blue-200/70">{invoice.client.address}</p>
              <p className="text-sm text-blue-200/70">NIP: {invoice.client.nip}</p>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-blue-500/20">
            <div>
              <p className="text-xs text-blue-300 font-semibold mb-1">Data wystawienia</p>
              <p className="text-white">{formatDate(invoice.issueDate)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-300 font-semibold mb-1">Termin płatności</p>
              <p className="text-white">{formatDate(invoice.dueDate)}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <div className="grid grid-cols-12 gap-4 mb-4 pb-4 border-b border-blue-500/20">
              <div className="col-span-6">
                <p className="text-xs text-blue-300 font-semibold">Opis</p>
              </div>
              <div className="col-span-2 text-right">
                <p className="text-xs text-blue-300 font-semibold">Ilość</p>
              </div>
              <div className="col-span-2 text-right">
                <p className="text-xs text-blue-300 font-semibold">Cena</p>
              </div>
              <div className="col-span-2 text-right">
                <p className="text-xs text-blue-300 font-semibold">Razem</p>
              </div>
            </div>

            {invoice.items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 py-3 border-b border-blue-500/10">
                <div className="col-span-6">
                  <p className="text-white">{item.description}</p>
                </div>
                <div className="col-span-2 text-right">
                  <p className="text-blue-200">{item.quantity}</p>
                </div>
                <div className="col-span-2 text-right">
                  <p className="text-blue-200">{formatCurrency(item.unitPrice)} PLN</p>
                </div>
                <div className="col-span-2 text-right">
                  <p className="text-cyan-300 font-semibold">{formatCurrency(item.quantity * item.unitPrice)} PLN</p>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80">
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-900/30 rounded-lg border border-blue-500/20">
                <p className="text-blue-300">Netto:</p>
                <p className="text-right text-white font-semibold">{formatCurrency(total)} PLN</p>
                <p className="text-blue-300">VAT (23%):</p>
                <p className="text-right text-white font-semibold">{formatCurrency(totalWithVat - total)} PLN</p>
                <p className="text-blue-300 font-semibold col-span-1">Razem:</p>
                <p className="text-right text-cyan-300 font-bold text-lg">{formatCurrency(totalWithVat)} PLN</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="p-4 bg-slate-900/30 rounded-lg border border-blue-500/20">
              <p className="text-xs text-blue-300 font-semibold mb-2">NOTATKI</p>
              <p className="text-blue-200/70 text-sm whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}

          {/* Status History */}
          {invoice.statusHistory && invoice.statusHistory.length > 0 && (
            <div className="mt-8 pt-8 border-t border-blue-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-300" />
                <h3 className="text-sm font-semibold text-blue-300">Historia zmian statusu</h3>
              </div>
              <div className="space-y-3">
                {invoice.statusHistory.map((change, index) => (
                  <div key={index} className="flex gap-4 p-3 bg-slate-900/30 rounded-lg border border-blue-500/10">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm text-white">
                        Status zmieniony na{' '}
                        <span className="font-semibold">
                          {change.status === 'paid' ? 'Opłacona' :
                           change.status === 'sent' ? 'Wysłana' :
                           change.status === 'overdue' ? 'Zaległa' :
                           'Szkic'}
                        </span>
                      </p>
                      <p className="text-xs text-blue-200/50 mt-1">
                        {new Date(change.changedAt).toLocaleDateString('pl-PL')} o{' '}
                        {new Date(change.changedAt).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })} przez {change.changedBy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <style>{`
            @media print {
              body {
                background: #0f172a;
              }
              header {
                display: none;
              }
              .sticky-pdf-bar {
                display: none;
              }
            }
          `}</style>
        </Card>

        <div className="h-32"></div>
      </main>

      {/* Sticky PDF Bar */}
      <div className="sticky-pdf-bar fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-t border-blue-500/30 shadow-2xl z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between gap-4">
          <div className="text-sm text-blue-200/70">
            <p>Faktura {invoice.number} - pobierz, drukuj lub podgląd</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-500/50 rounded-lg font-semibold transition-all min-h-[48px] flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Podgląd PDF
            </button>
            <button
              onClick={handleExportToPDF}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/50 transition-all min-h-[48px] flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Pobierz PDF
            </button>
            <button
              onClick={exportToCSV}
              className="px-6 py-3 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg font-semibold transition-all min-h-[48px] flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Eksport CSV
            </button>
            <button
              onClick={handleExportToKsef}
              disabled={ksefStatus.submitting || ksefStatus.submitted}
              className={`px-6 py-3 rounded-lg font-semibold transition-all min-h-[48px] flex items-center gap-2 ${
                ksefStatus.error
                  ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 hover:border-rose-500/50'
                  : ksefStatus.submitted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 border border-violet-500/30 hover:border-violet-500/50 disabled:opacity-50'
              }`}
            >
              {ksefStatus.submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-violet-500/30 border-t-violet-500" />
                  Wysyłanie...
                </>
              ) : ksefStatus.submitted ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Wysłane do kSEF
                </>
              ) : ksefStatus.error ? (
                <>
                  <AlertCircle className="w-5 h-5" />
                  Błąd
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Wyślij do kSEF
                </>
              )}
            </button>
            <button
              onClick={handleDuplicateInvoice}
              className="px-6 py-3 bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 border border-orange-500/30 hover:border-orange-500/50 rounded-lg font-semibold transition-all min-h-[48px] flex items-center gap-2"
            >
              <Copy className="w-5 h-5" />
              Duplikuj
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 hover:border-emerald-500/50 rounded-lg font-semibold transition-all min-h-[48px] flex items-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Drukuj
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
