'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useInvoices } from '@/app/invoice-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, Plus, Eye } from 'lucide-react'
import Link from 'next/link'

const DEFAULT_TEMPLATES = [
  {
    id: 'default',
    name: 'Standardowy',
    description: 'Klasyczny szablon faktury',
    color: 'blue',
    preview: {
      number: 'FV/2024/001',
      issueDate: '2024-02-26',
      dueDate: '2024-03-12',
      sellerName: 'ABC Sp. z o.o.',
      buyerName: 'XYZ Sp. z o.o.',
      items: [
        { name: 'Usługi programistyczne', description: 'Usługi programistyczne', quantity: 10, unitPrice: 500, vat: 23 },
        { name: 'Wsparcie techniczne', description: 'Wsparcie techniczne', quantity: 5, unitPrice: 200, vat: 23 }
      ]
    }
  },
  {
    id: 'minimal',
    name: 'Minimalistyczny',
    description: 'Prosty i elegancki design',
    color: 'gray',
    preview: {
      number: 'FV/2024/002',
      issueDate: '2024-02-26',
      dueDate: '2024-03-12',
      sellerName: 'Demo Company Sp. z o.o.',
      buyerName: 'Klient S.A.',
      items: [
        { name: 'Produkt/Usługa', description: 'Produkt/Usługa', quantity: 1, unitPrice: 1000, vat: 23 }
      ]
    }
  },
  {
    id: 'modern',
    name: 'Nowoczesny',
    description: 'Nowoczesny design z gradientami',
    color: 'purple',
    preview: {
      number: 'FV/2024/003',
      issueDate: '2024-02-26',
      dueDate: '2024-03-12',
      sellerName: 'Modern Tech Ltd.',
      buyerName: 'Enterprise Corp.',
      items: [
        { name: 'Konsultacja', description: 'Konsultacja', quantity: 8, unitPrice: 750, vat: 23 },
        { name: 'Wdrożenie', description: 'Wdrożenie', quantity: 40, unitPrice: 300, vat: 23 },
        { name: 'Szkolenie', description: 'Szkolenie', quantity: 4, unitPrice: 400, vat: 23 }
      ]
    }
  },
]

export default function TemplatesPage() {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const { addInvoice } = useInvoices()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotate carousel every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DEFAULT_TEMPLATES.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  const handleSelectTemplate = (template: typeof DEFAULT_TEMPLATES[0]) => {
    // Create invoice from template
    const items = template.preview.items.map((item) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: item.name || item.description,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      vat: item.vat,
      taxPercent: item.vat,
    }))

    const invoice = {
      id: Date.now().toString(),
      number: template.preview.number,
      issueDate: template.preview.issueDate,
      dueDate: template.preview.dueDate,
      client: {
        name: template.preview.buyerName,
        email: '',
        address: '',
        nip: '',
        city: '',
        postalCode: '',
      },
      items,
      notes: '',
      status: 'draft' as const,
      statusHistory: [],
      template: template.id,
      userId: user?.id || '',
    }
    
    addInvoice(invoice)
    router.push('/dashboard')
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
      {/* Header */}
      <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <button className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-300 hover:text-blue-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Szablony faktur</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <h2 className="text-lg sm:text-xl font-semibold text-blue-300 mb-6 sm:mb-8">Dostępne szablony - Wybierz szybko</h2>
        
        {/* Desktop Carousel - Visible on lg and up */}
        <div className="hidden lg:block mb-12">
          <div className="flex items-center gap-4">
            {/* Left Arrow */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + DEFAULT_TEMPLATES.length) % DEFAULT_TEMPLATES.length)}
              className="p-3 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-300 hover:text-blue-100 flex-shrink-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Carousel - Single visible template at 50% scale */}
            <div className="flex-1 min-h-[420px] flex items-center justify-center relative">
              <div className="w-full transform scale-50 origin-center relative">
                {DEFAULT_TEMPLATES.map((template, index) => (
                  <div
                    key={template.id}
                    className={`transition-all duration-500 absolute w-full ${
                      index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 shadow-lg overflow-hidden">
                      <div className={`h-24 bg-gradient-to-br ${
                        template.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                        template.color === 'gray' ? 'from-slate-500 to-slate-600' :
                        'from-purple-500 to-pink-500'
                      }`} />
                      
                      <div className="p-6 border-b border-blue-500/20">
                        <h3 className="text-lg font-semibold text-white mb-1">{template.name}</h3>
                        <p className="text-blue-200/70 text-sm">{template.description}</p>
                      </div>

                      <div className="p-6 border-b border-blue-500/20 bg-slate-900/20">
                        <p className="text-xs text-blue-200/50 mb-3 font-medium">PODGLĄD</p>
                        <div className="space-y-2 text-sm text-blue-100">
                          <div className="flex justify-between">
                            <span className="text-blue-300">Numer:</span>
                            <span className="font-mono">{template.preview.number}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-300">Wystawiający:</span>
                            <span className="text-right text-xs">{template.preview.sellerName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-300">Nabywca:</span>
                            <span className="text-right text-xs">{template.preview.buyerName}</span>
                          </div>
                          <div className="flex justify-between mt-3 pt-3 border-t border-blue-500/20">
                            <span className="text-blue-300">Pozycji:</span>
                            <span>{template.preview.items.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-300">Łączna wartość:</span>
                            <span className="font-semibold text-cyan-300">
                              {template.preview.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toLocaleString('pl-PL')} PLN
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex gap-3">
                        <Button
                          onClick={() => handleSelectTemplate(template)}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/50"
                        >
                          Wybierz
                        </Button>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % DEFAULT_TEMPLATES.length)}
              className="p-3 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-300 hover:text-blue-100 flex-shrink-0"
            >
              <ChevronLeft className="w-6 h-6 transform rotate-180" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {DEFAULT_TEMPLATES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-cyan-400 w-6' : 'bg-blue-500/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Grid Layout - Visible on sm/md, hidden on lg+ */}
        <div className="lg:hidden space-y-4">
          {DEFAULT_TEMPLATES.map((template, index) => (
            <div key={template.id} className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-br ${
                template.color === 'blue' ? 'from-blue-500/30 to-cyan-500/30' :
                template.color === 'gray' ? 'from-slate-500/30 to-slate-600/30' :
                'from-purple-500/30 to-pink-500/30'
              } rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500`}></div>
              
              <Card className="relative bg-slate-800/50 backdrop-blur-sm border-blue-500/20 shadow-lg overflow-hidden hover:border-blue-500/50 transition-all">
                <div className={`h-16 sm:h-20 bg-gradient-to-br ${
                  template.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                  template.color === 'gray' ? 'from-slate-500 to-slate-600' :
                  'from-purple-500 to-pink-500'
                }`} />
                
                <div className="p-4 sm:p-5 border-b border-blue-500/20">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{template.name}</h3>
                  <p className="text-blue-200/70 text-xs sm:text-sm">{template.description}</p>
                </div>

                <div className="p-4 sm:p-5 border-b border-blue-500/20 bg-slate-900/20">
                  <p className="text-xs text-blue-200/50 mb-3 font-medium">PODGLĄD</p>
                  <div className="space-y-1.5 text-xs sm:text-sm text-blue-100">
                    <div className="flex justify-between">
                      <span className="text-blue-300">Numer:</span>
                      <span className="font-mono text-xs">{template.preview.number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Wystawiający:</span>
                      <span className="text-right text-xs">{template.preview.sellerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Nabywca:</span>
                      <span className="text-right text-xs">{template.preview.buyerName}</span>
                    </div>
                    <div className="flex justify-between mt-2 pt-2 border-t border-blue-500/20">
                      <span className="text-blue-300">Pozycji:</span>
                      <span>{template.preview.items.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Wartość:</span>
                      <span className="font-semibold text-cyan-300">
                        {template.preview.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toLocaleString('pl-PL')} PLN
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex gap-2 sm:gap-3">
                  <Button
                    onClick={() => handleSelectTemplate(template)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/50 text-xs sm:text-sm min-h-[40px]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Wybierz
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
