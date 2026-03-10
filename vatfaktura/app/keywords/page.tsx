import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Keyword Clustering - 100+ Słów Kluczowych do Fakturowania i KSEF',
  description: 'Kompletna lista 100+ słów kluczowych związanych z fakturowaniem, KSEF, podatkami i e-fakturami. Przewodnik po wszystkich synonimach i wariantach.',
  keywords: 'słowa kluczowe fakturowanie, KSEF keywords, e-faktury, podatki, Program do fakturowania',
}

export default function KeywordClusteringPage() {
  const clusters = [
    {
      title: 'Program do Fakturowania',
      keywords: [
        'program do fakturowania',
        'darmowy program fakturowanie',
        'najlepszy program do fakturowania',
        'program do faktur',
        'software do fakturowania',
        'narzędzie do fakturowania',
        'aplikacja do faktur',
        'platforma fakturowania',
        'system fakturowania',
        'generator faktur',
      ]
    },
    {
      title: 'Faktury Za Darmo',
      keywords: [
        'faktury za darmo',
        'darmowe faktury',
        'bezpłatne faktury',
        'fakturowanie za darmo',
        '100% bezpłatne faktury',
        'program faktury bezpłatnie',
        'generator faktur za darmo',
        'darmowe fakturowanie online',
        'faktury bez opłat',
        'bezpłatne fakturowanie dla freelancerów',
      ]
    },
    {
      title: 'KSEF - Krajowy System e-Faktur',
      keywords: [
        'KSEF',
        'Krajowy System e-Faktur',
        'e-faktury KSEF',
        'integracja KSEF',
        'wysyłanie do KSEF',
        'KSEF poradnik',
        'jak wysłać fakturę do KSEF',
        'e-faktury 2026',
        'elektroniczne faktury',
        'obowiązkowe e-faktury',
      ]
    },
    {
      title: 'Faktury VAT',
      keywords: [
        'faktury VAT',
        'faktura VAT',
        'wystawienie faktury VAT',
        'jak wystawić fakturę VAT',
        'prawidłowa faktura VAT',
        'faktura VAT template',
        'stawki VAT',
        'faktura VAT pdf',
        'wzór faktury VAT',
        'dane obowiązkowe na fakturze VAT',
      ]
    },
    {
      title: 'Fakturowanie Online',
      keywords: [
        'fakturowanie online',
        'faktury online',
        'generator faktur online',
        'wystawianie faktur online',
        'program fakturowania online',
        'darmowe fakturowanie online',
        'aplikacja do faktur online',
        'fakturowanie przez przeglądarkę',
        'platforma do fakturowania online',
        'system fakturowania online',
      ]
    },
    {
      title: 'Freelancerzy',
      keywords: [
        'fakturowanie dla freelancerów',
        'faktury dla freelancerów',
        'program dla freelancerów',
        'fakturowanie samozatrudniony',
        'faktury samozatrudniony',
        'jak wystawić fakturę jako freelancer',
        'podatki freelancer',
        'JDG faktury',
        'ZUS freelancer',
        'program dla jednoosobowych działalności',
      ]
    },
    {
      title: 'Firmy i Biznes',
      keywords: [
        'program do fakturowania dla firm',
        'fakturowanie dla firm',
        'system fakturowania dla małych firm',
        'oprogramowanie do fakturowania',
        'rozwiązanie do fakturowania',
        'zarządzanie fakturami',
        'archiwizacja faktur',
        'faktury dla małych firm',
        'program dla małych przedsiębiorstw',
        'system zarządzania fakturami',
      ]
    },
    {
      title: 'Podatki i Rachunkowość',
      keywords: [
        'podatki fakturowanie',
        'ulgę VAT',
        'zwrot VAT',
        'deklaracja VAT',
        'ewidencja VAT',
        'obliczanie VAT',
        'program do podatków',
        'program księgowy',
        'rozliczenie VAT',
        'podatek dochodowy',
      ]
    },
    {
      title: 'Porównanie Programów',
      keywords: [
        'porównanie programów fakturowania',
        'najlepszy program fakturowania',
        'program vs inFakt',
        'VAT Faktura vs inFakt',
        'program do faktur porównanie',
        'która aplikacja do faktur jest najlepsza',
        'program fakturowania opinie',
        'recenzje programów fakturowania',
        'ranking programów do fakturowania',
        'alternatywa dla inFakta',
      ]
    },
    {
      title: 'Integracje i API',
      keywords: [
        'integracja KSEF',
        'API do fakturowania',
        'integracja z innym oprogramowaniem',
        'synchronizacja faktur',
        'eksport faktur',
        'import danych',
        'integracja z systemem kasjowym',
        'integracja z księgowością',
        'automatyzacja fakturowania',
        'webhook fakturowanie',
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
            100+ Słów Kluczowych
          </h1>
          <p className="text-base sm:text-lg text-blue-200/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Kompletna lista słów kluczowych związanych z fakturowaniem, KSEF, podatkami i zarządzaniem biznesem. Odkryj wszystkie warianty i synonimy.
          </p>
          <div className="inline-block px-4 py-2 bg-green-600/20 border border-green-500/50 rounded-full text-sm text-green-300 font-medium">
            {clusters.length} kategorii, 100+ słów kluczowych
          </div>
        </div>

        {/* Clusters Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clusters.map((cluster, idx) => (
              <Card key={idx} className="bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 p-6 hover:border-blue-500/50 transition-all">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 text-balance">
                  {cluster.title}
                </h2>
                <ul className="space-y-2">
                  {cluster.keywords.map((keyword, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold mt-1">•</span>
                      <span className="text-blue-200/80 text-sm leading-relaxed">
                        {keyword}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/blog">
                  <Button className="w-full mt-6 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-400/50">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Czytaj artykuły
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-cyan-600/20 border border-cyan-500/50 rounded-2xl p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Gotowy na lepsze fakturowanie?
            </h2>
            <p className="text-blue-200/80 mb-8 max-w-2xl mx-auto">
              Wszystkie te słowa kluczowe opisują funcje VAT Faktura. Zacznij używać naszego darmowego programu do fakturowania teraz.
            </p>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 shadow-lg shadow-green-500/50 font-bold text-lg px-8">
                Załóż Konto Za Darmo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
