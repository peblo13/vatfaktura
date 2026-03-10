'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { Button } from '@/components/ui/button'
import { CheckCircle, Zap, Shield, TrendingUp, Clock, FileText } from 'lucide-react'
import Link from 'next/link'
import { MobileNav } from '@/components/mobile-nav'
import { PartnerPopup } from '@/components/partner-popup'
import { SupportBanner } from '@/components/support-banner'

export default function Home() {
  const router = useRouter()
  const { user, isLoading } = useUser()

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard')
    }
  }, [user, isLoading, router])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Support Banner */}
      <SupportBanner />

      {/* Partner Popup */}
      <PartnerPopup />

      {/* Animated background elements - optimized for mobile */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-0"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="hidden sm:block absolute -bottom-8 left-1/2 w-32 h-32 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 flex items-center justify-between min-h-[56px] sm:min-h-[64px]">
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50 flex-shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent truncate">VAT Faktura</h1>
            </div>
            <div className="hidden sm:flex items-center gap-2 md:gap-4">
              <Link href="/faq">
                <Button variant="outline" className="min-h-[44px] text-sm md:text-base border-purple-500/30 hover:bg-purple-500/10 text-purple-300">
                  ❓ FAQ
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" className="min-h-[44px] text-sm md:text-base border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-300">
                  📝 Blog
                </Button>
              </Link>
              <Link href="/#partners">
                <Button variant="outline" className="min-h-[44px] text-sm md:text-base border-amber-500/30 hover:bg-amber-500/10 text-amber-300">
                  💰 Partnerzy
                </Button>
              </Link>
              <Link href="/partners">
                <Button variant="outline" className="min-h-[44px] text-sm md:text-base border-orange-500/30 hover:bg-orange-500/10 text-orange-300">
                  🎯 Wszystkie
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" className="min-h-[44px] text-sm md:text-base border-green-500/30 hover:bg-green-500/10 text-green-300">
                  100% Bezpłatnie
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="min-h-[44px] text-sm md:text-base border-blue-500/30 hover:bg-blue-500/10 text-blue-300">
                  Zaloguj się
                </Button>
              </Link>
              <Link href="/register">
                <Button className="min-h-[44px] text-sm md:text-base bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 shadow-lg shadow-green-500/50">
                  Załóż konto
                </Button>
              </Link>
            </div>
            <MobileNav />
          </div>
        </header>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-16 sm:py-24 md:py-32 lg:py-40 relative">
          <div className="text-center space-y-8 sm:space-y-10 md:space-y-12">
            {/* Free Badge */}
            <div className="inline-block px-4 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-green-500/30 to-cyan-500/30 border border-green-400/60 rounded-full backdrop-blur-sm hover:border-green-300/80 transition-all duration-300">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-green-300 uppercase">100% Bezpłatnie na zawsze</span>
            </div>
            
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight px-2 tracking-tight">
                <span className="bg-gradient-to-r from-green-400 via-cyan-300 to-green-300 bg-clip-text text-transparent drop-shadow-lg">
                  Fakturowanie
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
                  bez limitów
                </span>
                <br />
                <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/80 font-bold">bez dodatkowych kosztów</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-200/80 max-w-3xl mx-auto leading-relaxed px-4 font-light">
                Profesjonalna, nowoczesna platforma do tworzenia faktur z pełnymi funkcjami. Żadnych limitów, żadnej karty kredytowej, żadnych ukrytych opłat.
              </p>
            </div>
            
            {/* Trust Signals */}
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-2xl mx-auto py-4 sm:py-6">
              {[
                { text: 'Bezpłatnie zawsze', icon: '∞' },
                { text: 'Bez limitów', icon: '∞' },
                { text: 'Brak karty', icon: '💳' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 p-2 sm:p-3 rounded-lg bg-blue-500/10 border border-blue-400/30 hover:bg-blue-500/15 hover:border-blue-300/50 transition-all duration-300">
                  <span className="text-lg sm:text-2xl">{item.icon}</span>
                  <span className="text-xs sm:text-sm text-blue-200 font-medium text-center">{item.text}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center pt-4 sm:pt-8 px-3">
              <Link href="/register">
                <Button className="min-h-[50px] sm:min-h-[52px] px-8 sm:px-10 md:px-12 lg:px-14 py-3 text-base sm:text-lg font-bold bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 shadow-xl shadow-green-500/50 hover:shadow-green-500/80 transition-all duration-300 transform hover:scale-110 active:scale-95 text-white">
                  Rozpocznij za darmo
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="min-h-[50px] sm:min-h-[52px] px-8 sm:px-10 md:px-12 lg:px-14 py-3 text-base sm:text-lg font-bold border-2 border-blue-400/60 hover:border-blue-300 hover:bg-blue-500/20 text-blue-100 hover:text-blue-50 transition-all duration-300 transform hover:scale-110 active:scale-95 backdrop-blur-sm">
                  Zaloguj się
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-20 sm:py-28 md:py-32 relative">
          <div className="relative z-10">
            <div className="text-center mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent px-4">
                Dlaczego VAT Faktura?
              </h2>
              <p className="text-blue-200/70 text-center text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4">
                Zaawansowane narzędzia zaprojektowane do maksymalnej wydajności. Wszystko czego potrzebujesz do profesjonalnego fakturowania.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10">
              {[
                {
                  icon: Zap,
                  title: 'Szybkie tworzenie',
                  description: 'Utwórz profesjonalną fakturę w kilka sekund dzięki intuicyjnemu interfejsowi',
                  gradient: 'from-amber-600/20 to-orange-600/20',
                  borderColor: 'border-amber-500/30 hover:border-amber-500/60'
                },
                {
                  icon: Shield,
                  title: 'Bezpieczne',
                  description: 'Twoje dane są chronione i przechowywane bezpiecznie w przeglądarce',
                  gradient: 'from-purple-600/20 to-pink-600/20',
                  borderColor: 'border-purple-500/30 hover:border-purple-500/60'
                },
                {
                  icon: FileText,
                  title: 'Export do PDF',
                  description: 'Pobierz i wyślij faktury w formacie PDF gotowym do druku',
                  gradient: 'from-green-600/20 to-emerald-600/20',
                  borderColor: 'border-green-500/30 hover:border-green-500/60'
                },
                {
                  icon: TrendingUp,
                  title: 'Szablony',
                  description: 'Korzystaj z gotowych szablonów i stwórz własne dla swojej firmy',
                  gradient: 'from-blue-600/20 to-cyan-600/20',
                  borderColor: 'border-blue-500/30 hover:border-blue-500/60'
                },
                {
                  icon: Clock,
                  title: 'Historia',
                  description: 'Dostęp do wszystkich poprzednich faktur w jednym miejscu',
                  gradient: 'from-rose-600/20 to-red-600/20',
                  borderColor: 'border-rose-500/30 hover:border-rose-500/60'
                },
                {
                  icon: CheckCircle,
                  title: 'Prawidłowe podatki',
                  description: 'Automatyczne obliczanie VAT na poziomach 0%, 5%, 8% i 23%',
                  gradient: 'from-indigo-600/20 to-purple-600/20',
                  borderColor: 'border-indigo-500/30 hover:border-indigo-500/60'
                },
              ].map((feature, index) => (
                <div key={index} className="group relative h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                  <div className={`relative h-full bg-slate-800/40 backdrop-blur-xl rounded-xl p-6 sm:p-7 md:p-8 border ${feature.borderColor} transition-all duration-500 group-hover:bg-slate-800/60 group-hover:shadow-2xl group-hover:shadow-blue-500/20 transform group-hover:-translate-y-2`}>
                    <div className="flex flex-col h-full gap-4">
                      <div className="relative">
                        <feature.icon className="w-12 h-12 sm:w-14 sm:h-14 text-blue-300 group-hover:text-cyan-300 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" />
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">{feature.title}</h4>
                        <p className="text-sm sm:text-base text-blue-200/70 group-hover:text-blue-100/80 transition-colors duration-300 leading-relaxed">{feature.description}</p>
                      </div>
                      <div className="h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* kSEF Highlight */}
        <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-20 sm:py-28 md:py-32">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/30 via-cyan-600/20 to-green-600/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/40 bg-gradient-to-br from-green-900/30 via-cyan-900/20 to-green-900/30 backdrop-blur-xl p-8 sm:p-12 md:p-16 lg:p-20 group-hover:border-green-400/60 transition-all duration-500">
              {/* Animated background */}
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 sm:w-48 sm:h-48 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute top-1/2 left-0 -ml-20 w-40 h-40 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-8 bg-gradient-to-b from-green-400 to-cyan-400 rounded-full"></div>
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-green-300 uppercase">Integracja Premium</span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Pełna integracja z <span className="bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent">Krajowym Systemem e-Faktur</span>
                </h3>
                
                <p className="text-base sm:text-lg md:text-xl text-blue-100/90 mb-8 max-w-3xl leading-relaxed">
                  VAT Faktura jest w pełni zintegrowana z <span className="font-semibold text-green-300">kSEF (Krajowym Systemem e-Faktur)</span>. Wysyłaj faktury bezpośrednio do kSEF za jednym kliknięciem - dostępne dla wszystkich użytkowników bez dodatkowych opłat.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { icon: '✓', text: 'Integracja z kSEF', highlight: true },
                    { icon: '✓', text: 'Wysyłanie e-faktur', highlight: false },
                    { icon: '✓', text: 'Pełna zgodność prawna', highlight: false },
                  ].map((item, idx) => (
                    <div key={idx} className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-300 ${item.highlight ? 'bg-green-500/20 border border-green-400/50 group-hover:bg-green-500/30' : 'bg-blue-500/10 border border-blue-400/30 group-hover:bg-blue-500/20'}`}>
                      <span className={`text-xl font-bold ${item.highlight ? 'text-green-300' : 'text-cyan-300'}`}>{item.icon}</span>
                      <span className="text-sm sm:text-base text-blue-100">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Keywords Section */}
        <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-20 sm:py-28 md:py-32" id="keywords">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 sm:p-12 md:p-16 border border-blue-500/20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Program do Fakturowania 100% Za Darmo - Wszystko Czego Potrzebujesz
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Program do Fakturowania', desc: 'Profesjonalny program do fakturowania dla małych firm i freelancerów', link: '/blog/system-fakturowania-dla-malych-firm' },
                { title: 'Faktury Za Darmo', desc: 'Twórz nieograniczoną ilość faktur bez żadnych opłat', link: '/faq' },
                { title: 'Fakturowanie Online', desc: 'Szybkie i łatwe fakturowanie poprzez przeglądarkę', link: '/blog/darmowe-programy-do-fakturowania-porownanie' },
                { title: 'Generator Faktur', desc: 'Automatyczny generator profesjonalnych faktur w 30 sekund', link: '/faq' },
                { title: 'Integracja KSEF', desc: 'Pełna integracja z Krajowym Systemem e-Faktur', link: '/blog/kompletny-przewodnik-po-ksef' },
                { title: 'E-Faktury', desc: 'Wysyłaj faktury elektroniczne bezpośrednio do kSEF', link: '/blog/kompletny-przewodnik-po-ksef' },
                { title: 'Faktury VAT', desc: 'Kompleksowe zarządzanie fakturami VAT i podatkami', link: '/blog/jak-prawidlowo-wystawic-fakture-vat' },
                { title: 'Aplikacja do Faktur', desc: 'Mobilna aplikacja do zarządzania wszystkimi fakturami', link: '/faq' },
                { title: 'Faktury dla Firm', desc: 'Idealne rozwiązanie dla małych i średnich przedsiębiorstw', link: '/blog/system-fakturowania-dla-malych-firm' },
                { title: 'Najlepszy Program Faktura', desc: 'Najlepszy bezpłatny program do fakturowania na rynku', link: '/pricing' },
                { title: 'Fakturowanie dla Freelancerów', desc: 'Specjalne funkcje dla samozatrudnionych', link: '/blog/fakturowanie-dla-freelancerow-praktyczny-poradnik' },
                { title: 'System Fakturowania', desc: 'Zaawansowany system zarządzania fakturami i dokumentami', link: '/blog/system-fakturowania-dla-malych-firm' },
              ].map((item, idx) => (
                <Link key={idx} href={item.link}>
                  <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 hover:bg-blue-500/20 transition-all cursor-pointer group">
                    <h3 className="text-sm sm:text-base font-semibold text-blue-300 mb-2 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-blue-200/70">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-blue-500/20 text-center">
              <p className="text-blue-200/70 text-sm sm:text-base mb-6">
                VAT Faktura to kompleksowe rozwiązanie do fakturowania dostępne 100% za darmo, bez limitów i bez ukrytych opłat. Integracja z kSEF, szybkie tworzenie faktur, i wiele innych funkcji dla Twojej firmy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 shadow-lg shadow-green-500/50 font-bold">
                    Zacznij Fakturować Za Darmo Teraz
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button variant="outline" className="border-blue-500/50 hover:bg-blue-500/20 text-blue-300 font-bold">
                    Przeczytaj FAQ
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" className="border-blue-500/50 hover:bg-blue-500/20 text-blue-300 font-bold">
                    Czytaj Blog
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section - AGGRESSIVE */}
        <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-24 sm:py-32 md:py-40 relative" id="partners">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-600/5 via-orange-600/5 to-red-600/5 rounded-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="text-center mb-16 sm:mb-20 md:mb-28 space-y-4 sm:space-y-8">
              <div className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/50 rounded-full mb-4 animate-pulse">
                <p className="text-xs sm:text-sm font-bold text-amber-300">💰 ZARABIAJ Z NAMI</p>
              </div>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent leading-tight">
                Poleceni Partnerzy
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-blue-200/80 max-w-3xl mx-auto leading-relaxed">
                Narzędzia dla profesjonalistów. Zarabiamy prowizje, ty korzystasz 100% za darmo
              </p>
            </div>

            {/* Partners Grid - LARGER */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {[
                {
                  name: 'Wise',
                  description: 'Przelewy międzynarodowe tanio i szybko',
                  icon: '💳',
                  color: 'from-blue-600/20 to-cyan-600/20',
                  borderColor: 'border-blue-500/30 hover:border-blue-500/60',
                  link: 'https://wise.com',
                },
                {
                  name: 'Stripe',
                  description: 'Płatności online dla Twojej firmy',
                  icon: '💰',
                  color: 'from-purple-600/20 to-pink-600/20',
                  borderColor: 'border-purple-500/30 hover:border-purple-500/60',
                  link: 'https://stripe.com',
                },
                {
                  name: 'Comarch',
                  description: 'Zaawansowane rozwiązania księgowe',
                  icon: '📊',
                  color: 'from-green-600/20 to-emerald-600/20',
                  borderColor: 'border-green-500/30 hover:border-green-500/60',
                  link: 'https://comarch.com',
                },
                {
                  name: 'Namecheap',
                  description: 'Domeny i hosting dla Twojej firmy',
                  icon: '🌐',
                  color: 'from-orange-600/20 to-red-600/20',
                  borderColor: 'border-orange-500/30 hover:border-orange-500/60',
                  link: 'https://namecheap.com',
                },
                {
                  name: 'Google Workspace',
                  description: 'Email i narzędzia dla zespołu',
                  icon: '📧',
                  color: 'from-red-600/20 to-rose-600/20',
                  borderColor: 'border-red-500/30 hover:border-red-500/60',
                  link: 'https://workspace.google.com',
                },
                {
                  name: 'Canva',
                  description: 'Twórz materiały marketingowe',
                  icon: '🎨',
                  color: 'from-indigo-600/20 to-purple-600/20',
                  borderColor: 'border-indigo-500/30 hover:border-indigo-500/60',
                  link: 'https://canva.com',
                },
              ].map((partner, index) => (
                <a
                  key={index}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-full"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110`}></div>
                  <div className={`relative h-full bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border-2 ${partner.borderColor} transition-all duration-500 group-hover:bg-slate-800/80 group-hover:shadow-2xl group-hover:shadow-blue-500/30 transform group-hover:-translate-y-3 flex flex-col gap-6`}>
                    <div className="flex items-start justify-between">
                      <div className="text-5xl sm:text-6xl">{partner.icon}</div>
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300/50 group-hover:text-blue-300/100 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-2xl sm:text-3xl font-black text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">{partner.name}</h4>
                      <p className="text-base sm:text-lg text-blue-200/70 group-hover:text-blue-100/90 transition-colors duration-300 leading-relaxed">{partner.description}</p>
                    </div>
                    <div className="h-1.5 bg-gradient-to-r from-blue-500/0 via-blue-500/80 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full"></div>
                    <div className="pt-4 border-t border-blue-500/20">
                      <div className="text-sm font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                        Dowiedz się więcej →
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* CTA Banner */}
            <div className="bg-gradient-to-r from-amber-600/30 via-orange-600/30 to-red-600/30 border-2 border-amber-500/50 rounded-2xl p-8 sm:p-12 text-center backdrop-blur-xl">
              <p className="text-lg sm:text-2xl font-bold text-white mb-2">
                Każdy link wspiera VAT Faktura
              </p>
              <p className="text-sm sm:text-base text-amber-100 mb-6">
                Będąc użytkownikiem naszego portalu wspierasz jego dalszy rozwój. Dziękujemy!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
                <Link href="/partners">
                  <Button className="bg-white/20 hover:bg-white/30 border border-white/50 text-white font-bold">
                    Wszystkie Partnerzy (12+)
                  </Button>
                </Link>
                <p className="text-xs sm:text-sm text-amber-200/60">
                  Sprawdź co jeszcze polecamy
                </p>
              </div>
              <p className="text-xs sm:text-sm text-amber-200/60 italic">
                Zarabiamy prowizje z linków affiliate. To pozwala nam utrzymywać portal 100% bezpłatnym dla Ciebie.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-20 sm:py-28 md:py-32 relative">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-cyan-600 to-green-600 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-all duration-700 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-green-600 to-cyan-600 rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 text-center group-hover:shadow-2xl group-hover:shadow-green-500/50 transition-all duration-500 transform group-hover:scale-105">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Gotowy do rozpoczęcia?
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                    Załóż darmowe konto i zacznij fakturować dzisiaj. Bez limitów, bez karty kredytowej, zawsze bezpłatnie.
                  </p>
                </div>
                
                <Link href="/register">
                  <Button className="min-h-[48px] sm:min-h-[52px] px-8 sm:px-10 md:px-14 py-3 sm:py-4 text-base sm:text-lg font-bold bg-white text-green-600 hover:bg-blue-50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95">
                    Zarejestruj się za darmo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 backdrop-blur-sm mt-24 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-8">
              {/* About */}
              <div>
                <h4 className="text-white font-semibold mb-4">O nas</h4>
                <p className="text-sm text-blue-200/60 leading-relaxed">
                  Bezpłatne narzędzie do fakturowania z integracją kSEF. Stworzony dla małych firm i przedsiębiorców.
                </p>
              </div>

              {/* Product */}
              <div>
                <h4 className="text-white font-semibold mb-4">Produkt</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/#features" className="text-blue-300 hover:text-blue-100 transition">Funkcje</a></li>
                  <li><a href="/pricing" className="text-blue-300 hover:text-blue-100 transition">Cennik</a></li>
                  <li><a href="/#partners" className="text-blue-300 hover:text-blue-100 transition">Partnerzy</a></li>
                  <li><a href="/blog" className="text-blue-300 hover:text-blue-100 transition">Blog</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-white font-semibold mb-4">Zasoby</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/faq" className="text-blue-300 hover:text-blue-100 transition">FAQ</a></li>
                  <li><a href="/blog" className="text-blue-300 hover:text-blue-100 transition">Poradniki</a></li>
                  <li><a href="/reviews" className="text-blue-300 hover:text-blue-100 transition">Recenzje</a></li>
                  <li><a href="/keywords" className="text-blue-300 hover:text-blue-100 transition">Słowa kluczowe</a></li>
                  <li><a href="/image-optimization" className="text-blue-300 hover:text-blue-100 transition">Optymalizacja</a></li>
                </ul>
              </div>

              {/* Partners */}
              <div>
                <h4 className="text-white font-semibold mb-4">Polecane</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://wise.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100 transition">Wise - Przelewy</a></li>
                  <li><a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100 transition">Stripe - Płatności</a></li>
                  <li><a href="/partners" className="text-blue-300 hover:text-blue-100 transition">Wszystkie partnerzy</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-white font-semibold mb-4">SEO & Link Building</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/link-building" className="text-blue-300 hover:text-blue-100 transition">Artykuły</a></li>
                  <li><a href="/reviews" className="text-blue-300 hover:text-blue-100 transition">Opinie</a></li>
                  <li><a href="/porownanie" className="text-blue-300 hover:text-blue-100 transition">Porównanie</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 text-center text-sm text-blue-200/60">
              <p>&copy; 2026 VAT Faktura. Wszystkie prawa zastrzeżone.</p>
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
                <a href="/privacy" className="text-blue-300 hover:text-blue-100 transition">Polityka Prywatności</a>
                <span className="text-blue-500/30">•</span>
                <a href="/terms" className="text-blue-300 hover:text-blue-100 transition">Warunki Użytkowania</a>
                <span className="text-blue-500/30">•</span>
                <a href="/contact" className="text-blue-300 hover:text-blue-100 transition">Kontakt</a>
              </div>
              <p className="text-xs mt-4">
                Zarabiamy prowizje z linków partnerskich. Dzięki za wsparcie naszego projektu.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-0 {
          animation-delay: 0s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
