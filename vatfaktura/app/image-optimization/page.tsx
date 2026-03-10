import { Metadata } from 'next'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Image Optimization - Best Practices dla SEO',
  description: 'Przewodnik po optymalizacji obrazów dla SEO. Alt text, WebP, lazy loading i responsive images dla lepszych rankingów.',
}

export default function ImageOptimizationGuide() {
  const tips = [
    {
      title: 'Descriptive Alt Text',
      description: 'Każdy obraz powinien mieć opisowy alt text. Musi być konkretny, a nie "image" czy "foto".',
      example: '❌ alt="faktura"\n✅ alt="Przykład faktury VAT wystawionej w programie VAT Faktura"',
    },
    {
      title: 'WebP Format',
      description: 'Konwertuj obrazy do formatu WebP aby zmniejszyć rozmiar o 25-35% bez utraty jakości.',
      example: 'original: 500KB → WebP: 150KB (70% mniejszy)',
    },
    {
      title: 'Lazy Loading',
      description: 'Opóźnij załadowanie obrazów poza viewport. Zwiększa Core Web Vitals i szybkość strony.',
      example: 'loading="lazy" decoding="async"',
    },
    {
      title: 'Responsive Images',
      description: 'Użyj srcset aby dostarczać różne rozmiary na różnych urządzeniach.',
      example: 'srcSet="mobile.webp 480w, tablet.webp 768w, desktop.webp 1920w"',
    },
    {
      title: 'Image Dimensions',
      description: 'Zawsze określ szerokość i wysokość aby uniknąć layout shift.',
      example: 'width={1200} height={630}',
    },
    {
      title: 'File Names',
      description: 'Używaj deskryptywnych nazw plików. Pomagają w SEO i są bardziej user-friendly.',
      example: '❌ img_12345.jpg\n✅ faktury-vat-program-screenshot.jpg',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Image Optimization for SEO
          </h1>
          <p className="text-base sm:text-lg text-blue-200/80 max-w-3xl mx-auto leading-relaxed">
            Jak optymalizować obrazy dla lepszych rankingów w Google. Praktyczne wskazówki i best practices.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, idx) => (
              <Card key={idx} className="bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 p-6 hover:border-blue-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">{tip.title}</h3>
                <p className="text-blue-200/80 text-sm mb-4">{tip.description}</p>
                <div className="bg-slate-900/50 rounded p-3 font-mono text-xs text-cyan-300 whitespace-pre-wrap break-words">
                  {tip.example}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-cyan-600/20 border border-cyan-500/50 rounded-2xl p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              VAT Faktura już używa najlepszych praktyk
            </h2>
            <p className="text-blue-200/80 mb-8 max-w-2xl mx-auto">
              Nasza aplikacja jest zoptymalizowana pod względem SEO i performance. Szybkie ładowanie, responsywne obrazy i prawidłowy alt text.
            </p>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 shadow-lg shadow-green-500/50 font-bold text-lg px-8">
                Zacznij Teraz
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
