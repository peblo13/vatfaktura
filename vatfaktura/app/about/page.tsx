import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'O nas - VAT Faktura | Nasza Misja i Historia',
  description: 'Dowiedz się kim jesteśmy i dlaczego stworzyliśmy VAT Faktura. Nasza misja to bezpłatne, proste i bezpieczne fakturowanie dla wszystkich.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            O VAT Faktura
          </h1>
          <p className="text-xl text-blue-200/70 max-w-2xl">
            Bezpłatny program do fakturowania stworzony dla freelancerów i małych firm
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Nasza Misja
            </h2>
            <p className="text-blue-200/80 mb-4 leading-relaxed text-lg">
              VAT Faktura to odpowiedź na problem, który dotyka każdego przedsiębiorcy - potrzeba prostego, darmowego i bezpiecznego sposobu do wystawiania faktur.
            </p>
            <p className="text-blue-200/80 mb-4 leading-relaxed text-lg">
              Wierzymy że każdy powinien mieć dostęp do profesjonalnych narzędzi biznesowych bez konieczności płacenia wysokich opłat lub rezygnacji z prywatności.
            </p>
            <p className="text-blue-200/80 leading-relaxed text-lg">
              Dlatego stworzyliśmy VAT Faktura - program który jest w 100 procent bezpłatny, bezpieczny i w pełni zintegrowany z KSEF.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-8 border border-blue-500/30">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <span className="text-blue-100">100 procent bezpłatny - na zawsze</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <span className="text-blue-100">Dane przechowywane lokalnie - bez serwerów</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <span className="text-blue-100">Pełna integracja z KSEF</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <span className="text-blue-100">Brak limitów - nieograniczone faktury</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <span className="text-blue-100">Szybkie i proste - faktury w 30 sekund</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Creator Info */}
        <div className="mb-20 bg-slate-800/60 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Twórca i Właściciel
          </h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-cyan-300 mb-2">
                Paweł Śliwiński
              </h3>
              <p className="text-blue-200/80 leading-relaxed mb-4">
                Twórca i właściciel VAT Faktura. Programista i przedsiębiorca, który zdecydował się stworzyć bezpłatne rozwiązanie do fakturowania dla polskich freelancerów i małych firm.
              </p>
              <p className="text-blue-200/80 leading-relaxed mb-4">
                Paweł wierzy że narzędzia biznesowe powinny być dostępne dla wszystkich bez względu na wielkość firmy lub budżet. VAT Faktura jest wynikiem tej pasji do tworzenia wartościowych produktów.
              </p>
              <p className="text-blue-200/70 text-sm">
                Kontakt: <a href="mailto:fredbogus504@gmail.com" className="text-cyan-300 hover:text-cyan-200 underline">fredbogus504@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            Nasze Wartości
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8">
              <h3 className="text-xl font-bold text-cyan-300 mb-3">Bezpłatność</h3>
              <p className="text-blue-200/70">
                Wierzymy że narzędzia biznesowe powinny być dostępne dla wszystkich. Dlatego VAT Faktura jest i będzie zawsze 100 procent bezpłatna.
              </p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8">
              <h3 className="text-xl font-bold text-cyan-300 mb-3">Bezpieczeństwo</h3>
              <p className="text-blue-200/70">
                Twoje faktury i dane są przechowywane bezpośrednio w przeglądarce. Nic nie trafia na nasze serwery - pełna kontrola w Twoich rękach.
              </p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8">
              <h3 className="text-xl font-bold text-cyan-300 mb-3">Prostota</h3>
              <p className="text-blue-200/70">
                Fakturowanie powinno być proste i szybkie. Nasza aplikacja jest intuicyjna - wystawisz fakturę w zaledwie 30 sekund.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Gotów do rozpoczęcia?
          </h2>
          <p className="text-blue-200/70 mb-8 text-lg">
            Dołącz do tysięcy freelancerów i firm które już używają VAT Faktura
          </p>
          <Link href="/register">
            <Button className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 shadow-lg shadow-green-500/50 font-bold text-lg px-8 py-6">
              Załóż Darmowe Konto Teraz
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
