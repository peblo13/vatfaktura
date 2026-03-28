'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  CheckCircle2, 
  Zap, 
  Shield, 
  Clock, 
  Download,
  ArrowRight,
  Star,
  Users,
  Receipt
} from 'lucide-react'
import { useUser } from '@/hooks/useUser'

export default function HomePage() {
  const { user } = useUser()

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                VAT Faktura
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <Link href="/pricing" className="text-sm text-blue-200/70 hover:text-white transition">
                Cennik
              </Link>
              <Link href="/about" className="text-sm text-blue-200/70 hover:text-white transition">
                O nas
              </Link>
              <Link href="/blog" className="text-sm text-blue-200/70 hover:text-white transition">
                Blog
              </Link>
              <Link href="/faq" className="text-sm text-blue-200/70 hover:text-white transition">
                FAQ
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="hidden sm:block">
                    <Button variant="ghost" className="text-blue-200 hover:text-white hover:bg-blue-500/20">
                      Zaloguj
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-semibold shadow-lg shadow-green-500/30">
                      Rozpocznij za darmo
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full mb-8">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-green-300">100% BEZPŁATNIE - BEZ LIMITÓW</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Darmowy Program do
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Faktur VAT z KSeF
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-200/70 max-w-2xl mx-auto mb-10">
              Twórz profesjonalne faktury w 30 sekund. Pełna integracja z Krajowym Systemem e-Faktur. 
              Bez karty kredytowej, bez ukrytych opłat.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-bold text-lg px-8 py-6 shadow-xl shadow-green-500/30">
                  Załóż Darmowe Konto
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-500/30 text-blue-200 hover:bg-blue-500/10 hover:text-white px-8 py-6">
                  Dowiedz się więcej
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">10k+</div>
                <div className="text-xs sm:text-sm text-blue-300/70">Użytkowników</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">50k+</div>
                <div className="text-xs sm:text-sm text-blue-300/70">Faktur</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">4.9</div>
                <div className="text-xs sm:text-sm text-blue-300/70 flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> Ocena
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Wszystko czego potrzebujesz do fakturowania
            </h2>
            <p className="text-blue-200/70 max-w-2xl mx-auto">
              Profesjonalne narzędzia do fakturowania dostępne za darmo dla każdego przedsiębiorcy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="group p-6 sm:p-8 bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-blue-500/40 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Szybkie fakturowanie</h3>
              <p className="text-blue-200/70">
                Wystawiaj faktury w zaledwie 30 sekund. Intuicyjny interfejs bez zbędnych komplikacji.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 sm:p-8 bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-blue-500/40 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Integracja z KSeF</h3>
              <p className="text-blue-200/70">
                Pełna zgodność z Krajowym Systemem e-Faktur. Wysyłaj faktury bezpośrednio do KSeF.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 sm:p-8 bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-blue-500/40 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-6 group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Export do PDF</h3>
              <p className="text-blue-200/70">
                Pobieraj faktury w formacie PDF. Profesjonalny wygląd gotowy do wysłania klientowi.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-6 sm:p-8 bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-blue-500/40 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Szablony faktur</h3>
              <p className="text-blue-200/70">
                Zapisuj szablony z danymi kontrahentów. Oszczędzaj czas przy wystawianiu kolejnych faktur.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-6 sm:p-8 bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-blue-500/40 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Wyszukiwanie NIP</h3>
              <p className="text-blue-200/70">
                Automatyczne pobieranie danych firmy z GUS. Wystarczy wpisać NIP kontrahenta.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-6 sm:p-8 bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-blue-500/40 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 mb-6 group-hover:scale-110 transition-transform">
                <Receipt className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Bez limitów</h3>
              <p className="text-blue-200/70">
                Twórz nieograniczoną liczbę faktur. Brak ukrytych opłat ani ograniczeń funkcji.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Gotowy do rozpoczęcia?
            </h2>
            <p className="text-blue-200/70 mb-8 text-lg">
              Dołącz do tysięcy przedsiębiorców którzy już korzystają z VAT Faktura
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-bold text-lg px-10 py-6 shadow-xl shadow-green-500/30">
                Załóż Darmowe Konto Teraz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-blue-300/50 text-sm mt-4">
              Bez karty kredytowej - Bez limitów - 100% za darmo
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Produkt</h4>
              <ul className="space-y-2">
                <li><Link href="/pricing" className="text-blue-200/70 hover:text-white text-sm transition">Cennik</Link></li>
                <li><Link href="/faq" className="text-blue-200/70 hover:text-white text-sm transition">FAQ</Link></li>
                <li><Link href="/blog" className="text-blue-200/70 hover:text-white text-sm transition">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Firma</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-blue-200/70 hover:text-white text-sm transition">O nas</Link></li>
                <li><Link href="/contact" className="text-blue-200/70 hover:text-white text-sm transition">Kontakt</Link></li>
                <li><Link href="/partners" className="text-blue-200/70 hover:text-white text-sm transition">Partnerzy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Prawne</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-blue-200/70 hover:text-white text-sm transition">Polityka prywatności</Link></li>
                <li><Link href="/terms" className="text-blue-200/70 hover:text-white text-sm transition">Regulamin</Link></li>
                <li><Link href="/disclaimer" className="text-blue-200/70 hover:text-white text-sm transition">Disclaimer</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Kontakt</h4>
              <p className="text-blue-200/70 text-sm">
                fredbogus504@gmail.com
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                VAT Faktura
              </span>
            </div>
            <p className="text-blue-200/50 text-sm">
              &copy; {new Date().getFullYear()} VAT Faktura. Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
