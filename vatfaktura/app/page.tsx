'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { Button } from '@/components/ui/button'
import { CheckCircle, Zap, Shield, TrendingUp, Clock, FileText } from 'lucide-react'
import Link from 'next/link'

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
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-0"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50">
                <FileText className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">VAT Faktura</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/pricing">
                <Button variant="outline" className="min-h-[44px] border-green-500/30 hover:bg-green-500/10 text-green-300">
                  100% Bezpłatnie
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="min-h-[44px] border-blue-500/30 hover:bg-blue-500/10 text-blue-300">
                  Zaloguj się
                </Button>
              </Link>
              <Link href="/register">
                <Button className="min-h-[44px] bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 shadow-lg shadow-green-500/50">
                  Załóż konto
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center space-y-8">
            {/* Free Badge */}
            <div className="inline-block px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full mb-2">
              <span className="text-sm font-semibold text-green-300">100% BEZPŁATNIE NA ZAWSZE</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-6xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-cyan-300 to-green-300 bg-clip-text text-transparent">
                  Fakturowanie bez limitów
                </span>
                <br />
                <span className="text-white/90">bez dodatkowych kosztów</span>
              </h2>
              <p className="text-xl text-blue-200/80 max-w-2xl mx-auto leading-relaxed">
                Profesjonalna platforma do tworzenia faktur z pełnymi funkcjami. Żadnych limitów, żadnej karty kredytowej, żadnych ukrytych opłat.
              </p>
            </div>
            
            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200 py-4">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Bezpłatnie na zawsze
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Nieograniczone faktury
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Brak karty kredytowej
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/register">
                <Button className="min-h-[44px] px-8 text-lg bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 shadow-lg shadow-green-500/50">
                  Rozpocznij za darmo
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="min-h-[44px] px-8 text-lg border-blue-500/50 hover:bg-blue-500/10 text-blue-200">
                  Zaloguj się
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h3 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Dlaczego VAT Faktura?</h3>
          <p className="text-blue-200/60 text-center mb-16 max-w-2xl mx-auto">Zaawansowane narzędzia zaprojektowane do maksymalnej wydajności</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Szybkie tworzenie',
                description: 'Utwórz profesjonalną fakturę w kilka sekund dzięki intuicyjnemu interfejsowi',
              },
              {
                icon: Shield,
                title: 'Bezpieczne',
                description: 'Twoje dane są chronione i przechowywane bezpiecznie w przeglądarce',
              },
              {
                icon: FileText,
                title: 'Export do PDF',
                description: 'Pobierz i wyślij faktury w formacie PDF gotowym do druku',
              },
              {
                icon: TrendingUp,
                title: 'Szablony',
                description: 'Korzystaj z gotowych szablonów i stwórz własne dla swojej firmy',
              },
              {
                icon: Clock,
                title: 'Historia',
                description: 'Dostęp do wszystkich poprzednich faktur w jednym miejscu',
              },
              {
                icon: CheckCircle,
                title: 'Prawidłowe podatki',
                description: 'Automatyczne obliczanie VAT na poziomach 0%, 5%, 8% i 23%',
              },
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                  <feature.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:text-cyan-400 transition-colors" />
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-blue-200/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* kSEF Highlight */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/30 bg-gradient-to-r from-green-600/10 via-cyan-600/10 to-green-600/10 p-8 md:p-12">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-green-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Pełna integracja z kSEF</h3>
              <p className="text-blue-200/90 text-lg mb-6 max-w-2xl">
                VAT Faktura jest w pełni zintegrowana z <span className="font-semibold text-green-300">Krajowym Systemem e-Faktur (kSEF)</span>. Wysyłaj faktury bezpośrednio do kSEF za jednym kliknięciem - dostępne dla wszystkich użytkowników.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-200">
                  <span className="text-green-400">✓</span>
                  <span>Integracja z kSEF</span>
                </div>
                <div className="flex items-center gap-2 text-blue-200">
                  <span className="text-green-400">✓</span>
                  <span>Wysyłanie e-faktur</span>
                </div>
                <div className="flex items-center gap-2 text-blue-200">
                  <span className="text-green-400">✓</span>
                  <span>Pełna zgodność</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-cyan-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-gradient-to-r from-green-600 to-cyan-600 rounded-2xl p-12 md:p-16 text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Gotowy do rozpoczęcia?</h3>
              <p className="text-blue-100 mb-8 text-lg">Załóż konto i zacznij fakturować dzisiaj - całkowicie bezpłatnie, bez limitów</p>
              <Link href="/register">
                <Button className="min-h-[44px] px-8 text-lg bg-white text-green-600 hover:bg-blue-50 font-semibold shadow-lg">
                  Zarejestruj się za darmo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 backdrop-blur-sm mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-blue-200/60">
            <p>&copy; 2026 VAT Faktura. Wszystkie prawa zastrzeżone.</p>
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
