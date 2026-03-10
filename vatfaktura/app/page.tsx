'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { CheckCircle, Zap, Shield, TrendingUp, FileText } from 'lucide-react'
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
      {/* Animated background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">VAT Faktura</h1>
            </div>
            <div className="flex gap-4">
              <Link href="/login" className="px-4 py-2 text-blue-300 hover:text-white transition">Logowanie</Link>
              <Link href="/register" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">Rejestracja</Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Faktury VAT
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"> Made Simple</span>
          </h2>
          <p className="text-xl text-blue-300 mb-8 max-w-2xl mx-auto">
            Szybko twórz faktury VAT, zarządzaj kosztami i rozliczaj się z podatkami. Wszystko w jednej aplikacji.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition">
              Zacznij za darmo
            </Link>
            <Link href="/faq" className="px-8 py-3 border border-blue-500/30 text-blue-300 hover:bg-blue-500/10 rounded-lg font-semibold transition">
              Dowiedz się więcej
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">Funkcjonalności</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/50 transition">
              <Zap className="w-10 h-10 text-blue-400 mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">Szybkie faktury</h4>
              <p className="text-blue-300/70">Twórz faktury VAT w kilka sekund</p>
            </div>
            <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/50 transition">
              <Shield className="w-10 h-10 text-blue-400 mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">Bezpieczeństwo</h4>
              <p className="text-blue-300/70">Twoje dane są szyfrowane i bezpieczne</p>
            </div>
            <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/50 transition">
              <TrendingUp className="w-10 h-10 text-blue-400 mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">Raporty</h4>
              <p className="text-blue-300/70">Analizuj swoje przychody i wydatki</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">Plany cenowe</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-8">
              <h4 className="text-2xl font-bold text-white mb-2">Bezpłatny</h4>
              <p className="text-4xl font-bold text-blue-400 mb-6">0 zł/miesiąc</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-blue-300">
                  <CheckCircle className="w-5 h-5" />
                  Do 10 faktur/miesiąc
                </li>
                <li className="flex items-center gap-2 text-blue-300">
                  <CheckCircle className="w-5 h-5" />
                  Edytor szablonów
                </li>
              </ul>
              <Link href="/register" className="block w-full py-2 text-center border border-blue-500/30 text-blue-300 rounded transition hover:bg-blue-500/10">
                Zacznij
              </Link>
            </div>
            <div className="bg-slate-800/50 border border-blue-400 rounded-lg p-8">
              <h4 className="text-2xl font-bold text-white mb-2">Pro</h4>
              <p className="text-4xl font-bold text-cyan-400 mb-6">49 zł/miesiąc</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-blue-300">
                  <CheckCircle className="w-5 h-5" />
                  Nieograniczone faktury
                </li>
                <li className="flex items-center gap-2 text-blue-300">
                  <CheckCircle className="w-5 h-5" />
                  Wsparcie priorytetowe
                </li>
              </ul>
              <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded transition hover:from-blue-700 hover:to-cyan-700">
                Przejdź na Pro
              </button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Gotowy do rozpoczęcia?</h3>
          <Link href="/register" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition">
            Utwórz bezpłatne konto
          </Link>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900/80 border-t border-white/10 mt-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 text-center text-blue-300/70">
            <p>&copy; 2024 VAT Faktura. Wszystkie prawa zastrzeżone.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
