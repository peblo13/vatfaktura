'use client'

import { useEffect } from 'react'

export function InitDemo() {
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      
      // Initialize demo account if it doesn't exist
      const users = JSON.parse(localStorage.getItem('vatfaktura_users') || '[]')
    
    if (!users.some((u: any) => u.email === 'demo@test.com')) {
      users.push({
        id: 'demo-user',
        email: 'demo@test.com',
        password: 'demo123',
        company: 'Demo Sp. z o.o.',
        nip: '1234567890',
      })
      localStorage.setItem('vatfaktura_users', JSON.stringify(users))
    }

    // Add demo invoices
    const invoices = JSON.parse(localStorage.getItem('vatfaktura_invoices') || '[]')
    if (invoices.length === 0) {
      const demoInvoices = [
        {
          id: 'inv-1',
          number: 'FV-2026-001',
          issueDate: new Date(2026, 0, 15).toISOString().split('T')[0],
          dueDate: new Date(2026, 1, 15).toISOString().split('T')[0],
          status: 'paid',
          client: {
            name: 'ABC Sp. z o.o.',
            email: 'kontakt@abc.pl',
            address: 'ul. Główna 1, 00-001 Warszawa',
            nip: '9876543210',
          },
          items: [
            {
              id: 'item-1',
              description: 'Usługi konsultingowe',
              quantity: 10,
              unitPrice: 500,
              vat: 23,
            },
          ],
          notes: 'Dziękujemy za współpracę!',
          template: 'default',
          userId: 'demo-user',
        },
        {
          id: 'inv-2',
          number: 'FV-2026-002',
          issueDate: new Date(2026, 1, 1).toISOString().split('T')[0],
          dueDate: new Date(2026, 2, 1).toISOString().split('T')[0],
          status: 'sent',
          client: {
            name: 'XYZ Producent',
            email: 'info@xyz.pl',
            address: 'ul. Handlowa 5, 80-001 Gdańsk',
            nip: '5555555555',
          },
          items: [
            {
              id: 'item-2',
              description: 'Dostarczenie materiałów',
              quantity: 5,
              unitPrice: 1000,
              vat: 23,
            },
            {
              id: 'item-3',
              description: 'Transport',
              quantity: 1,
              unitPrice: 250,
              vat: 23,
            },
          ],
          notes: '',
          template: 'default',
          userId: 'demo-user',
        },
      ]
      localStorage.setItem('vatfaktura_invoices', JSON.stringify(demoInvoices))
    }
    } catch (error) {
      console.error('[v0] InitDemo failed:', error)
    }
  }, [])

  return null
}
