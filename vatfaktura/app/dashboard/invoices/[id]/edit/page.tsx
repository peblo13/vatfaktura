'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useInvoices, Invoice, InvoiceItem } from '@/app/invoice-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Plus, Trash2, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function EditInvoicePage() {
  const router = useRouter()
  const params = useParams()
  const { user, isLoading } = useUser()
  const { getInvoicesByUser, updateInvoice } = useInvoices()
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [formData, setFormData] = useState({
    number: '',
    issueDate: '',
    dueDate: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    clientNip: '',
    notes: '',
  })
  const [items, setItems] = useState<InvoiceItem[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      const userInvoices = getInvoicesByUser(user.id)
      const found = userInvoices.find(inv => inv.id === params.id)
      if (found) {
        setInvoice(found)
        setFormData({
          number: found.number,
          issueDate: found.issueDate,
          dueDate: found.dueDate,
          clientName: found.client.name,
          clientEmail: found.client.email,
          clientAddress: found.client.address,
          clientNip: found.client.nip,
          notes: found.notes,
        })
        setItems(found.items)
      }
    }
  }, [user, isLoading, params.id, router, getInvoicesByUser])

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

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!invoice || !user) return

    const updated: Invoice = {
      ...invoice,
      number: formData.number,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      client: {
        name: formData.clientName,
        email: formData.clientEmail,
        address: formData.clientAddress,
        nip: formData.clientNip,
      },
      items,
      notes: formData.notes,
    }

    updateInvoice(invoice.id, updated)
    router.push(`/dashboard/invoices/${invoice.id}`)
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

  if (isLoading || !user || !invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href={`/dashboard/invoices/${invoice.id}`}>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Edytuj fakturę {invoice.number}</h1>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card className="p-6 border-0 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dane faktury</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numer faktury</label>
                <Input
                  type="text"
                  value={formData.number}
                  onChange={(e) => setFormData({...formData, number: e.target.value})}
                  className="min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data wystawienia</label>
                <Input
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                  className="min-h-[44px]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Termin płatności</label>
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
          <Card className="p-6 border-0 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dane odbiorcy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa firmy</label>
                <Input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  className="min-h-[44px]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                  className="min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                <Input
                  type="text"
                  value={formData.clientAddress}
                  onChange={(e) => setFormData({...formData, clientAddress: e.target.value})}
                  className="min-h-[44px]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIP</label>
                <Input
                  type="text"
                  value={formData.clientNip}
                  onChange={(e) => setFormData({...formData, clientNip: e.target.value.replace(/[^0-9]/g, '')})}
                  className="min-h-[44px]"
                  maxLength={10}
                  required
                />
              </div>
            </div>
          </Card>

          {/* Items */}
          <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Pozycje faktury</h2>
              <Button
                type="button"
                onClick={addItem}
                className="bg-blue-600 hover:bg-blue-700 min-h-[44px]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Dodaj pozycję
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Opis</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Ilość</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Cena jednostkowa</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">VAT %</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Razem</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Input
                          type="text"
                          placeholder="Opis usługi/produktu"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className="w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                          className="w-20 text-center"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                          className="w-24 text-center"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={item.vat}
                          onChange={(e) => updateItem(item.id, 'vat', parseInt(e.target.value))}
                          className="w-20 text-center px-2 py-1 border border-gray-300 rounded-md"
                        >
                          <option value={0}>0%</option>
                          <option value={5}>5%</option>
                          <option value={8}>8%</option>
                          <option value={23}>23%</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-900 font-medium">
                        {(item.quantity * item.unitPrice * (1 + item.vat / 100)).toFixed(2)} zł
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="mt-6 flex flex-col items-end gap-2 border-t border-gray-200 pt-4">
              <div className="flex gap-8 text-sm">
                <span className="text-gray-600">Razem netto:</span>
                <span className="font-semibold text-gray-900 w-24 text-right">{calculateTotal().toFixed(2)} zł</span>
              </div>
              <div className="flex gap-8 text-sm">
                <span className="text-gray-600">Razem VAT:</span>
                <span className="font-semibold text-gray-900 w-24 text-right">{calculateVAT().toFixed(2)} zł</span>
              </div>
              <div className="flex gap-8 border-t border-gray-200 pt-2 mt-2">
                <span className="font-semibold text-gray-900">Do zapłaty:</span>
                <span className="font-bold text-blue-600 text-lg w-24 text-right">{(calculateTotal() + calculateVAT()).toFixed(2)} zł</span>
              </div>
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-6 border-0 shadow-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">Uwagi/Notatki</label>
            <textarea
              placeholder="Dodatkowe informacje dla odbiorcy..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Link href={`/dashboard/invoices/${invoice.id}`} className="flex-1">
              <Button variant="outline" className="w-full min-h-[44px]">
                Anuluj
              </Button>
            </Link>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 min-h-[44px]">
              Zapisz zmiany
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
