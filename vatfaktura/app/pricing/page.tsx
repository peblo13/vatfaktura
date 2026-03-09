'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import { SUBSCRIPTION_PLANS } from '@/lib/stripe'
import Link from 'next/link'

export default function PricingPage() {
  const { user } = useUser()

  const plans = [
    SUBSCRIPTION_PLANS.free,
    SUBSCRIPTION_PLANS.pro,
    SUBSCRIPTION_PLANS.enterprise,
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full">
            <span className="text-sm font-semibold text-green-300">100% BEZPŁATNIE ZAWSZE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Wszystkie plany za darmo
          </h1>
          <p className="text-xl text-slate-300">
            Brak karty kredytowej, brak ukrytych opłat, brak limitów. Wszystkie funkcje dostępne dla każdego.
          </p>
        </div>

        {/* Trust Signals */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">∞</div>
            <p className="text-slate-300">Nieograniczone faktury</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">💳</div>
            <p className="text-slate-300">Nigdy nie będzie karty kredytowej</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">🔓</div>
            <p className="text-slate-300">Pełny dostęp do wszystkich funkcji</p>
          </div>
        </div>

        {/* Pricing Cards - All the Same */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative rounded-lg transition-all duration-300 bg-slate-800 border border-blue-500/30 hover:border-blue-500/50 shadow-lg"
            >
              <div className="p-8">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

                {/* Price - Always Free */}
                <div className="mb-6">
                  <span className="text-5xl font-bold text-green-400">0 PLN</span>
                  <span className="text-slate-400 ml-2">zawsze</span>
                </div>

                {/* CTA Button */}
                <Link href={user ? '/dashboard' : '/register'} className="block w-full mb-8">
                  <Button className="w-full h-11 font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                    {user ? 'Przejdź do dashboardu' : 'Załóż konto'}
                  </Button>
                </Link>

                {/* Features */}
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ / Info Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Pytania i odpowiedzi</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Czy zawsze będzie to bezpłatne?</h3>
              <p className="text-slate-300">
                Tak! VAT Faktura jest całkowicie bezpłatny. Naszą misją jest dostarczenie najlepszych narzędzi fakturowania dla każdego.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Czy jest limit na liczbę faktur?</h3>
              <p className="text-slate-300">
                Nie, możesz tworzyć nieograniczoną liczbę faktur bez żadnych ograniczeń.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Czy mogę eksportować faktury?</h3>
              <p className="text-slate-300">
                Oczywiście! Możesz eksportować do PDF, CSV i wysyłać bezpośrednio do kSEF.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Jaka jest różnica między planami?</h3>
              <p className="text-slate-300">
                Nie ma różnicy. Wszystkie plany zawierają identyczne funkcje. Wybierz ten, który ci się podoba!
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        {!user && (
          <div className="text-center mt-12">
            <p className="text-slate-300 mb-4">Gotów zacząć za darmo?</p>
            <Link href="/register">
              <Button className="bg-green-600 hover:bg-green-700 text-white h-12 px-8 text-lg font-semibold">
                Zarejestruj się za darmo
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
