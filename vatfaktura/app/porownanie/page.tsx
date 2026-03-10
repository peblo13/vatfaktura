import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Check, X } from 'lucide-react'

export const metadata: Metadata = {
  title: 'VAT Faktura vs inFakt vs Wychowankowie - Porównanie Programów 2026',
  description: 'Szczegółowe porównanie programów do fakturowania. VAT Faktura vs inFakt vs Wychowankowie - ceny, funkcje, KSEF, recenzje.',
  keywords: 'porównanie programów, VAT Faktura vs inFakt, program do fakturowania, KSEF, recenzje',
}

export default function ComparisonPage() {
  const features = [
    { name: 'Cena', vatFaktura: '100% bezpłatnie', infakt: 'Od 9 zł/m-c', wychowankowie: 'Od 29 zł/m-c' },
    { name: 'Faktury bez limitów', vatFaktura: true, infakt: true, wychowankowie: true },
    { name: 'Integracja KSEF', vatFaktura: true, infakt: true, wychowankowie: true },
    { name: 'Eksport PDF', vatFaktura: true, infakt: true, wychowankowie: true },
    { name: 'E-podpis', vatFaktura: false, infakt: true, wychowankowie: true },
    { name: 'Archiwizacja dokumentów', vatFaktura: true, infakt: true, wychowankowie: true },
    { name: 'Import z Excela', vatFaktura: true, infakt: false, wychowankowie: true },
    { name: 'Szablony faktur', vatFaktura: true, infakt: true, wychowankowie: true },
    { name: 'Raport VAT', vatFaktura: true, infakt: true, wychowankowie: true },
    { name: 'Synchronizacja z programami księgowymi', vatFaktura: false, infakt: true, wychowankowie: true },
    { name: 'Liczba użytkowników', vatFaktura: 'Nieograniczona', infakt: 'W zależności od planu', wychowankowie: 'W zależności od planu' },
    { name: 'Wsparcie techniczne', vatFaktura: 'Forum 24/7', infakt: 'Email + Chat', wychowankowie: 'Email + Chat' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
              Porównanie Programów do Fakturowania
            </h1>
            <p className="text-lg text-blue-200/80 max-w-3xl mx-auto mb-8">
              VAT Faktura vs inFakt vs Wychowankowie - zobacz które rozwiązanie jest dla Ciebie najlepsze
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                name: 'VAT Faktura',
                price: '0 zł/m-c',
                highlight: true,
                description: 'W pełni bezpłatnie, bez limitów, bez karty kredytowej',
              },
              {
                name: 'inFakt',
                price: 'Od 9 zł/m-c',
                highlight: false,
                description: 'Popularna opcja z wieloma funkcjami',
              },
              {
                name: 'Wychowankowie',
                price: 'Od 29 zł/m-c',
                highlight: false,
                description: 'Droga opcja z zaawansowanymi funkcjami',
              },
            ].map((solution) => (
              <Card
                key={solution.name}
                className={`${
                  solution.highlight
                    ? 'border-2 border-green-500/60 bg-gradient-to-b from-green-600/20 to-slate-800/40 ring-2 ring-green-500/30 transform scale-105'
                    : 'border border-blue-500/20 bg-slate-800/40'
                } p-8 relative`}
              >
                {solution.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Najlepszy wybór
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{solution.name}</h3>
                <p className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {solution.price}
                </p>
                <p className="text-blue-200/70 text-sm mb-6">{solution.description}</p>
                <Link href="/register">
                  <Button
                    className={`w-full ${
                      solution.highlight
                        ? 'bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700'
                        : 'bg-blue-600/20 border border-blue-400/50 text-blue-300 hover:bg-blue-600/30'
                    }`}
                  >
                    {solution.highlight ? 'Zacznij Za Darmo' : 'Sprawdź'}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          <div className="bg-slate-800/40 border border-blue-500/20 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-700/50 border-b border-blue-500/20">
                <tr>
                  <th className="text-left px-6 py-4 font-bold text-white">Funkcja</th>
                  <th className="text-center px-6 py-4 font-bold text-green-400">VAT Faktura</th>
                  <th className="text-center px-6 py-4 font-bold text-blue-300">inFakt</th>
                  <th className="text-center px-6 py-4 font-bold text-blue-300">Wychowankowie</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr key={idx} className="border-b border-blue-500/10 hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{feature.name}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.vatFaktura === 'boolean' ? (
                        feature.vatFaktura ? (
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-green-300">{feature.vatFaktura}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.infakt === 'boolean' ? (
                        feature.infakt ? (
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-blue-300">{feature.infakt}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.wychowankowie === 'boolean' ? (
                        feature.wychowankowie ? (
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-blue-300">{feature.wychowankowie}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-16 bg-gradient-to-r from-green-600/20 to-cyan-600/20 border-2 border-green-500/50 rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Dlaczego wybrać VAT Faktura?</h2>
            <p className="text-lg text-green-200/80 mb-8">
              100% bezpłatnie, bez limitów, bez zbędnych funkcji. Wszystko czego potrzebujesz do fakturowania bez dodatkowych kosztów.
            </p>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 shadow-lg shadow-green-500/50 font-bold text-lg px-8 py-3">
                Zaloguj się i zacznij za darmo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
