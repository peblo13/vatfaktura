'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  vat: number
}

export interface StatusChange {
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  changedAt: string
  changedBy: string
}

export interface Invoice {
  id: string
  number: string
  issueDate: string
  dueDate: string
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  statusHistory: StatusChange[]
  client: {
    name: string
    email: string
    address: string
    nip: string
  }
  items: InvoiceItem[]
  notes: string
  template: string
  userId: string
}

interface InvoiceContextType {
  invoices: Invoice[]
  templates: any[]
  addInvoice: (invoice: Invoice) => void
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void
  updateInvoiceStatus: (id: string, newStatus: Invoice['status'], userName: string) => void
  deleteInvoice: (id: string) => void
  duplicateInvoice: (id: string) => Invoice | null
  getInvoicesByUser: (userId: string) => Invoice[]
  saveTemplate: (template: any) => void
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined)

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [templates, setTemplates] = useState<any[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('vatfaktura_invoices')
    if (stored) {
      setInvoices(JSON.parse(stored))
    }
    const storedTemplates = localStorage.getItem('vatfaktura_templates')
    if (storedTemplates) {
      setTemplates(JSON.parse(storedTemplates))
    }
  }, [])

  const addInvoice = (invoice: Invoice) => {
    const updated = [...invoices, invoice]
    setInvoices(updated)
    localStorage.setItem('vatfaktura_invoices', JSON.stringify(updated))
  }

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    const updated = invoices.map(inv => inv.id === id ? { ...inv, ...updates } : inv)
    setInvoices(updated)
    localStorage.setItem('vatfaktura_invoices', JSON.stringify(updated))
  }

  const updateInvoiceStatus = (id: string, newStatus: Invoice['status'], userName: string) => {
    const updated = invoices.map(inv => {
      if (inv.id === id) {
        const statusHistory = [
          ...(inv.statusHistory || []),
          {
            status: newStatus,
            changedAt: new Date().toISOString(),
            changedBy: userName,
          }
        ]
        return { ...inv, status: newStatus, statusHistory }
      }
      return inv
    })
    setInvoices(updated)
    localStorage.setItem('vatfaktura_invoices', JSON.stringify(updated))
  }

  const deleteInvoice = (id: string) => {
    const updated = invoices.filter(inv => inv.id !== id)
    setInvoices(updated)
    localStorage.setItem('vatfaktura_invoices', JSON.stringify(updated))
  }

  const duplicateInvoice = (id: string): Invoice | null => {
    const invoice = invoices.find(inv => inv.id === id)
    if (!invoice) return null

    const duplicated: Invoice = {
      ...invoice,
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      number: `${invoice.number}-kopія`,
      status: 'draft',
      statusHistory: [],
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    }

    addInvoice(duplicated)
    return duplicated
  }

  const getInvoicesByUser = (userId: string) => {
    return invoices.filter(inv => inv.userId === userId)
  }

  const saveTemplate = (template: any) => {
    const updated = [...templates, template]
    setTemplates(updated)
    localStorage.setItem('vatfaktura_templates', JSON.stringify(updated))
  }

  return (
    <InvoiceContext.Provider value={{ invoices, templates, addInvoice, updateInvoice, updateInvoiceStatus, deleteInvoice, duplicateInvoice, getInvoicesByUser, saveTemplate }}>
      {children}
    </InvoiceContext.Provider>
  )
}

export function useInvoices() {
  const context = useContext(InvoiceContext)
  if (context === undefined) {
    throw new Error('useInvoices must be used within InvoiceProvider')
  }
  return context
}
