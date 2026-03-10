import Link from 'next/link'
import { FileText, BarChart3, CheckCircle, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">VAT Faktura</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition">
              Logowanie
            </Link>
            <Link href="/register" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition">
              Rejestracja
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-secondary/20 border border-secondary/40 rounded-full text-sm text-secondary">
            ✨ Program do fakturowania 100% za darmo
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Faktury VAT i PIT
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"> w jednym miejscu</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Bezpłatna aplikacja do tworzenia faktur VAT, zarządzania PIT-37, PIT-36 i eksportu do kSEF. Idealna dla freelancerów i małych firm.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/register" className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition flex items-center justify-center gap-2">
              Zacznij za darmo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="px-8 py-3 border border-border/40 text-foreground rounded-lg font-semibold hover:bg-card transition">
              Zaloguj się
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-32 px-4 border-t border-border/40">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Kompletny system do zarządzania biznesem</h2>
            <p className="text-lg text-muted-foreground">Wszystko czego potrzebujesz w jednym miejscu</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border border-border/40 bg-card/50 hover:border-primary/40 transition">
              <FileText className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Faktury VAT</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  Szybkie tworzenie faktur
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  Automatyczne numerowanie
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  Export do PDF i XML
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  Integracja kSEF
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border/40 bg-card/50 hover:border-primary/40 transition">
              <BarChart3 className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-2">System PIT</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  Deklaracje PIT-37 i PIT-36
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  Kalkulator podatku w czasie rzeczywistym
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  Zarządzanie kosztami i amortyzacją
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  Export JPK-V7 do e-podatki
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-4 border-t border-border/40 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Gotowy do rozpoczęcia?</h2>
          <p className="text-lg text-muted-foreground">Utwórz konto za darmo i zacznij wystawiać faktury i zarządzać podatkami dzisiaj</p>
          
          <Link href="/register" className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition">
            Zacznij za darmo
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 VAT Faktura. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  )
}
