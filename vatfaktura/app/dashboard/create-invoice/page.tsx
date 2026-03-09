'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useInvoices, Invoice, InvoiceItem } from '@/app/invoice-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { SubscriptionLimitAlert } from '@/components/subscription-limit-alert'
import { checkSubscriptionLimit, getInvoiceCountThisMonth } from '@/lib/subscription-limits'
import { Plus, Trash2, ChevronLeft, Eye, Download, Printer } from 'lucide-react'
import Link from 'next/link'

export default function CreateInvoicePage() {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const { addInvoice, invoices } = useInvoices()
  
  const [subscriptionCheck, setSubscriptionCheck] = useState({
    canCreateInvoice: true,
    currentCount: 0,
    limit: 5,
  })

  const [formData, setFormData] = useState({
    number: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    clientNip: '',
    notes: '',
  })

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0, vat: 23 }
  ])
  const [autofillingNip, setAutofillingNip] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
    
    if (user) {
      const userInvoices = invoices.filter(inv => inv.userId === user.id)
      const count = getInvoiceCountThisMonth(userInvoices)
      const planId = user.subscription?.plan || 'free'
      const check = checkSubscriptionLimit(planId, count)
      setSubscriptionCheck(check)
    }
  }, [user, isLoading, router, invoices])

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      quantity: 1,
      unitPrice: 0,
      vat: 23,
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleClientNipChange = async (value: string) => {
    // Remove all non-digits and format display
    const cleanNip = value.replace(/[^0-9]/g, '')
    
    // Store clean NIP, but also accept formatted input
    setFormData({...formData, clientNip: cleanNip})

    // Only fetch if we have exactly 10 digits
    if (cleanNip.length === 10) {
      setAutofillingNip(true)
      try {
        const response = await fetch(`/api/gus/search?nip=${cleanNip}`)
        const data = await response.json()

        if (data.success && data.company) {
          setFormData(prev => ({
            ...prev,
            clientName: data.company.name,
            clientAddress: `${data.company.street || ''} ${data.company.streetNumber || ''} ${data.company.postalCode || ''} ${data.company.city || ''}`.trim()
          }))
        }
      } catch (err) {
        // GUS API error - user can fill data manually
      } finally {
        setAutofillingNip(false)
      }
    }
  }

  // Format NIP for display (XXX-XX-XX-XXX)
  const formatNipDisplay = (nip: string): string => {
    const clean = nip.replace(/[^0-9]/g, '')
    if (clean.length !== 10) return clean
    return `${clean.slice(0, 3)}-${clean.slice(3, 5)}-${clean.slice(5, 7)}-${clean.slice(7, 10)}`
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!subscriptionCheck.canCreateInvoice) {
      return
    }

    const nextNumber = `FV-${Date.now().toString().slice(-6)}`

    const invoice: Invoice = {
      id: Math.random().toString(36).substr(2, 9),
      number: formData.number || nextNumber,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      status: 'draft',
      statusHistory: [{
        status: 'draft',
        changedAt: new Date().toISOString(),
        changedBy: user?.email || 'system',
      }],
      client: {
        name: formData.clientName,
        email: formData.clientEmail,
        address: formData.clientAddress,
        nip: formData.clientNip,
      },
      items,
      notes: formData.notes,
      template: 'default',
      userId: user?.id || '',
    }

    addInvoice(invoice)
    router.push('/dashboard')
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  }

  const calculateVAT = () => {
    return items.reduce((sum, item) => {
      const itemTotal = item.quantity * item.unitPrice
      return sum + (itemTotal * item.vat / 100)
    }, 0)
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500/30 border-t-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <button className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-400 hover:text-blue-300">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Nowa faktura</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* No subscription limit alert needed - unlimited for all */}
          
          {/* Basic Info */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4">Dane faktury</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">Numer faktury</label>
                <Input
                  type="text"
                  placeholder="FV-001"
                  value={formData.number}
                  onChange={(e) => setFormData({...formData, number: e.target.value})}
                  className="min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">Data wystawienia</label>
                <Input
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                  className="min-h-[44px]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">Termin płatności</label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  className="min-h-[44px]"
                  required
                />
              </div>
            </div>
          </Card>

          {/* Client Info */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4">Dane odbiorcy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">Nazwa firmy</label>
                <Input
                  type="text"
                  placeholder="ABC Sp. z o.o."
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  className="min-h-[44px]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">Email</label>
                <Input
                  type="email"
                  placeholder="kontakt@abc.pl"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                  className="min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">Adres</label>
                <Input
                  type="text"
                  placeholder="ul. Główna 1, 00-001 Warszawa"
                  value={formData.clientAddress}
                  onChange={(e) => setFormData({...formData, clientAddress: e.target.value})}
                  className="min-h-[44px]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">
                  NIP nabywcy {autofillingNip && <span className="inline animate-spin ml-1">⏳</span>}
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="956-19-57-119 lub 9561957119"
                    value={formatNipDisplay(formData.clientNip)}
                    onChange={(e) => handleClientNipChange(e.target.value)}
                    className="min-h-[44px]"
                  />
                  {autofillingNip && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border border-blue-500/30 border-t-blue-500"></div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-blue-200/50 mt-2">Wpisz NIP (z myślnikami lub bez) → dane z GUS uzupełnią się automatycznie</p>
              </div>
            </div>
          </Card>

          {/* Items */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Pozycje faktury</h2>
              <Button
                type="button"
                onClick={addItem}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 min-h-[40px] px-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Dodaj pozycję
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-end bg-slate-900/30 p-4 rounded-lg border border-blue-500/10">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-blue-300 mb-1">Opis</label>
                    <Input
                      type="text"
                      placeholder="Opis usługi lub produktu"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="min-h-[40px]"
                    />
                  </div>
                  <div className="w-20">
                    <label className="block text-xs font-medium text-blue-300 mb-1">Ilość</label>
                    <Input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                      className="min-h-[40px]"
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-xs font-medium text-blue-300 mb-1">Cena netto</label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                      className="min-h-[40px]"
                    />
                  </div>
                  <div className="w-16">
                    <label className="block text-xs font-medium text-blue-300 mb-1">VAT %</label>
                    <select
                      value={item.vat}
                      onChange={(e) => updateItem(item.id, 'vat', parseFloat(e.target.value))}
                      className="w-full min-h-[40px] bg-slate-800 border border-blue-500/30 rounded-lg text-blue-300 text-sm"
                    >
                      <option value="0">0%</option>
                      <option value="5">5%</option>
                      <option value="8">8%</option>
                      <option value="23">23%</option>
                    </select>
                  </div>
                  <Button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 min-h-[40px] w-[40px]"
                    variant="ghost"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Summary */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 p-6 shadow-lg">
            <div className="flex justify-end">
              <div className="w-full md:w-64 space-y-2">
                <div className="flex justify-between text-blue-200">
                  <span>Razem netto:</span>
                  <span className="font-semibold">{calculateTotal().toFixed(2)} PLN</span>
                </div>
                <div className="flex justify-between text-blue-200">
                  <span>VAT:</span>
                  <span className="font-semibold">{calculateVAT().toFixed(2)} PLN</span>
                </div>
                <div className="flex justify-between text-white border-t border-blue-500/20 pt-2 text-lg">
                  <span>Razem brutto:</span>
                  <span className="font-bold text-cyan-400">{(calculateTotal() + calculateVAT()).toFixed(2)} PLN</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Notes */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4">Notatki</h2>
            <textarea
              placeholder="Dodatkowe informacje, warunki płatności, itp."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full min-h-[100px] bg-slate-800 border border-blue-500/30 rounded-lg px-3 py-2 text-blue-200 placeholder-blue-300/40 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
            />
          </Card>

          {/* Regular Buttons */}
          <div className="flex gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full border-blue-500/30 hover:bg-blue-500/10 text-blue-300">
                Anuluj
              </Button>
            </Link>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/50"
            >
              Utwórz fakturę
            </Button>
          </div>

          {/* Spacer for sticky bar */}
          <div className="h-32"></div>
        </form>
      </main>

      {/* Sticky PDF Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-t border-blue-500/30 shadow-2xl z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between gap-4">
          <div className="text-sm text-blue-200/70">
            <p>Faktura gotowa? Pobierz jako PDF lub drukuj</p>
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
              onClick={() => window.print()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/50 transition-all min-h-[48px] flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Pobierz PDF
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg font-semibold transition-all min-h-[48px] flex items-center gap-2"
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
