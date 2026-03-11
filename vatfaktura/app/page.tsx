import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Shield, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Receipt,
  Download,
  Clock,
  Users,
  Star,
  CreditCard,
  Lock,
  Globe
} from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">VAT Faktura</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/pricing" className="text-sm text-blue-200/70 hover:text-white transition-colors">Cennik</Link>
              <Link href="/about" className="text-sm text-blue-200/70 hover:text-white transition-colors">O nas</Link>
              <Link href="/blog" className="text-sm text-blue-200/70 hover:text-white transition-colors">Blog</Link>
              <Link href="/faq" className="text-sm text-blue-200/70 hover:text-white transition-colors">FAQ</Link>
              <Link href="/contact" className="text-sm text-blue-200/70 hover:text-white transition-colors">Kontakt</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-blue-200 hover:text-white hover:bg-blue-500/20">
                  Zaloguj
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 shadow-lg shadow-green-500/30 text-white">
                  Zarejestruj
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-green-300">100% BEZPLATNIE - BEZ LIMITOW</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
              Wystawiaj faktury VAT
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">w 30 sekund</span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-200/80 mb-10 max-w-2xl mx-auto text-balance">
              Darmowy program do fakturowania z pena integracja KSeF. Bez karty kredytowej, bez limitow, bez ukrytych oplat.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 shadow-xl shadow-green-500/30 text-lg px-8 py-6 font-semibold">
                  Zacznij za darmo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-500/50 text-blue-200 hover:bg-blue-500/20 text-lg px-8 py-6">
                  Dowiedz sie wiecej
                </Button>
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-blue-300/70">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Bezpieczne dane</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-400" />
                <span>Zgodne z RODO</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-400" />
                <span>Integracja KSeF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Wszystko czego potrzebujesz
            </h2>
            <p className="text-lg text-blue-200/70 max-w-2xl mx-auto">
              Profesjonalne narzedzia do fakturowania dostepne dla kazdego - calkowicie bezplatnie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="group bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Szybkie fakturowanie</h3>
              <p className="text-blue-200/70">
                Wystaw fakture w zaledwie 30 sekund. Intuicyjny interfejs pozwala na szybka prace.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <Receipt className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Integracja z KSeF</h3>
              <p className="text-blue-200/70">
                Pelna integracja z Krajowym Systemem e-Faktur. Wysylaj faktury bezposrednio do KSeF.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                <Download className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Eksport PDF</h3>
              <p className="text-blue-200/70">
                Eksportuj faktury do profesjonalnych plikow PDF gotowych do wyslania klientom.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Szablony faktur</h3>
              <p className="text-blue-200/70">
                Zapisuj szablony dla stalych klientow i wystawiaj kolejne faktury jednym kliknieciem.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Bezpieczenstwo danych</h3>
              <p className="text-blue-200/70">
                Twoje dane sa bezpieczne. Szyfrowanie SSL i zgodnosc z RODO zapewniaja ochronę.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Baza kontrahentow</h3>
              <p className="text-blue-200/70">
                Zarzadzaj kontrahentami i automatycznie uzupelniaj dane na fakturach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Free Section */}
      <section className="py-20 sm:py-32 relative bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full mb-6">
                <CreditCard className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-300">Zawsze bezplatnie</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Dlaczego VAT Faktura jest darmowy?
              </h2>
              <p className="text-lg text-blue-200/80 mb-8 leading-relaxed">
                Wierzymy, że kazdy przedsiebiorca powinien miec dostep do profesjonalnych narzedzi bez oplat. Nasz model biznesowy opiera sie na partnerstwach z zaufanymi firmami.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-100">Bez karty kredytowej - nigdy nie poprosimy o dane platnicze</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-100">Bez limitow - nieograniczona liczba faktur i kontrahentow</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-100">Bez ukrytych oplat - wszystkie funkcje dostepne od razu</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-100">Bez reklam - czysta i przejrzysta aplikacja</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-white mb-6">Porownanie z konkurencja</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <span className="text-blue-200/80">Liczba faktur</span>
                  <span className="text-green-400 font-semibold">Bez limitow</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <span className="text-blue-200/80">Integracja KSeF</span>
                  <span className="text-green-400 font-semibold">Tak</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <span className="text-blue-200/80">Eksport PDF</span>
                  <span className="text-green-400 font-semibold">Tak</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <span className="text-blue-200/80">Szablony faktur</span>
                  <span className="text-green-400 font-semibold">Tak</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-blue-200/80">Cena miesieczna</span>
                  <span className="text-green-400 font-bold text-xl">0 PLN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Stats */}
      <section className="py-20 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Zaufali nam
            </h2>
            <p className="text-lg text-blue-200/70">
              Dolacz do tysiecy przedsiebiorcow korzystajacych z VAT Faktura
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-16">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">10K+</div>
              <p className="text-blue-200/70 text-sm">Uzytkownikow</p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">50K+</div>
              <p className="text-blue-200/70 text-sm">Wystawionych faktur</p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">4.9</div>
              <p className="text-blue-200/70 text-sm">Srednia ocena</p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">99.9%</div>
              <p className="text-blue-200/70 text-sm">Uptime</p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8 sm:p-10 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <blockquote className="text-lg sm:text-xl text-blue-100 mb-6 italic">
              &quot;VAT Faktura to najlepsze darmowe narzedzie do fakturowania jakie znalem. Prostota i szybkosc dzialania sa niesamowite!&quot;
            </blockquote>
            <div className="text-blue-200/70">
              <span className="font-semibold text-white">Jan Kowalski</span>
              <span className="mx-2">-</span>
              <span>Freelancer</span>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 sm:py-32 relative bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Nasi Partnerzy
            </h2>
            <p className="text-blue-200/70 max-w-2xl mx-auto">
              Dzieki partnerstwom z zaufanymi firmami mozemy oferowac VAT Faktura calkowicie bezplatnie
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-slate-800/40 border border-blue-500/20 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Wise</h3>
              <p className="text-blue-200/70 text-sm">Przelewy miedzynarodowe</p>
            </div>
            <div className="bg-slate-800/40 border border-blue-500/20 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Stripe</h3>
              <p className="text-blue-200/70 text-sm">Platnosci online</p>
            </div>
            <div className="bg-slate-800/40 border border-blue-500/20 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Google Workspace</h3>
              <p className="text-blue-200/70 text-sm">Narzedzia biznesowe</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Gotowy do rozpoczecia?
          </h2>
          <p className="text-lg sm:text-xl text-blue-200/80 mb-10 max-w-2xl mx-auto">
            Dolacz do tysiecy przedsiebiorcow i zacznij wystawiac faktury juz dzis - calkowicie za darmo!
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 shadow-xl shadow-green-500/30 text-lg px-10 py-7 font-bold">
              Zaloz darmowe konto
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-6 text-sm text-blue-300/60">
            Bez karty kredytowej - Bez limitow - Bez ukrytych oplat
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-white mb-4">Produkt</h4>
              <ul className="space-y-2">
                <li><Link href="/pricing" className="text-blue-200/70 hover:text-white text-sm transition-colors">Cennik</Link></li>
                <li><Link href="/about" className="text-blue-200/70 hover:text-white text-sm transition-colors">O nas</Link></li>
                <li><Link href="/faq" className="text-blue-200/70 hover:text-white text-sm transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Zasoby</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-blue-200/70 hover:text-white text-sm transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-blue-200/70 hover:text-white text-sm transition-colors">Kontakt</Link></li>
                <li><Link href="/partners" className="text-blue-200/70 hover:text-white text-sm transition-colors">Partnerzy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Prawne</h4>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-blue-200/70 hover:text-white text-sm transition-colors">Regulamin</Link></li>
                <li><Link href="/privacy" className="text-blue-200/70 hover:text-white text-sm transition-colors">Polityka prywatnosci</Link></li>
                <li><Link href="/disclaimer" className="text-blue-200/70 hover:text-white text-sm transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Kontakt</h4>
              <ul className="space-y-2">
                <li><a href="mailto:fredbogus504@gmail.com" className="text-blue-200/70 hover:text-white text-sm transition-colors">fredbogus504@gmail.com</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">VAT Faktura</span>
            </div>
            <p className="text-sm text-blue-200/50">
              &copy; {new Date().getFullYear()} VAT Faktura. Wszystkie prawa zastrzezone.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
