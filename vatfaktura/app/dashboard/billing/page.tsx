'use client'

import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useInvoices } from '@/app/invoice-context'
import { SUBSCRIPTION_PLANS } from '@/lib/stripe'
import { getInvoiceCountThisMonth } from '@/lib/subscription-limits'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function BillingPage() {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const { invoices } = useInvoices()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500/30 border-t-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  const currentPlan = user.subscription?.plan || 'free'
  const planDetails = SUBSCRIPTION_PLANS[currentPlan as keyof typeof SUBSCRIPTION_PLANS]
  const userInvoices = invoices.filter(inv => inv.userId === user.id)
  const invoicesThisMonth = getInvoiceCountThisMonth(userInvoices)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-300 bg-clip-text text-transparent">
            Plan (Bezpłatny)
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Current Plan Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Twój obecny plan</h2>
          <Card className="bg-gradient-to-r from-green-600/10 to-cyan-600/10 border-green-500/30 p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Plan Info */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">{planDetails?.name}</h3>
                <p className="text-4xl font-bold text-green-400">
                  0 PLN
                  <span className="text-sm text-slate-400 font-normal">/zawsze</span>
                </p>
              </div>

              {/* Usage Info */}
              <div className="border-l border-green-500/20 pl-8">
                <h4 className="text-sm font-semibold text-slate-300 mb-4">Użycie tego miesiąca</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {invoicesThisMonth}
                    </p>
                    <p className="text-sm text-slate-400">faktury (bez limitów)</p>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Wszystko dostępne</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="border-l border-green-500/20 pl-8">
                <h4 className="text-sm font-semibold text-slate-300 mb-4">Status</h4>
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-300">Aktywny</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Bezpłatny na zawsze bez względu na liczbę faktur
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Dostępne funkcje</h2>
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <ul className="grid md:grid-cols-2 gap-4">
              {planDetails?.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Why Free Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Dlaczego VAT Faktura jest bezpłatna?</h2>
          <div className="space-y-4 text-slate-300">
            <p>
              Wierzymy, że każdy powinien mieć dostęp do profesjonalnych narzędzi fakturowania bez barier finansowych. 
              Naszą misją jest wspieranie małych firm, freelancerów i przedsiębiorców.
            </p>
            <p>
              Brak limitów, brak ukrytych opłat, brak karty kredytowej - po prostu najlepsze narzędzie fakturowania dla wszystkich.
            </p>
            <p>
              Jeśli uważasz, że VAT Faktura ci pomaga, podziel się nią z kolegami i bądź częścią naszej społeczności!
            </p>
          </div>
        </div>

        {/* Invoice History */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Historia faktur</h2>
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300">Wszystkich faktur: <span className="font-bold text-white">{userInvoices.length}</span></p>
                <p className="text-sm text-slate-400">Tego miesiąca: {invoicesThisMonth}</p>
              </div>
              <Link href="/dashboard/invoices">
                <Button className="bg-green-600 hover:bg-green-700">
                  Przejdź do faktur
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
