import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Copy, Check } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Artykuły o VAT Faktura - Linki dla Blogów i Katalogów',
  description: 'Artykuły i zasoby o VAT Faktura do linków. Dla blogerów, katalogów, i stron informacyjnych.',
  keywords: 'artykuły VAT Faktura, backlinki, linki wychodzące',
}

export default function LinkBuildingPage() {
  const linkCategories = [
    {
      title: 'Katalogi Oprogramowania',
      description: 'Katalogi z oprogramowaniem, narzędziami i usługami dla biznesu',
      links: [
        { name: 'GetApp', url: 'https://www.getapp.com' },
        { name: 'Capterra', url: 'https://www.capterra.com' },
        { name: 'G2', url: 'https://www.g2.com' },
        { name: 'Software.com', url: 'https://www.software.com' },
        { name: 'Trustpilot', url: 'https://www.trustpilot.com' },
      ],
    },
    {
      title: 'Strony o Przedsiębiorczości',
      description: 'Polskie strony o prowadzeniu biznesu i freelancingu',
      links: [
        { name: 'Wirtualna Polska Biznes', url: 'https://biznes.wp.pl' },
        { name: 'Business.com', url: 'https://www.business.com' },
        { name: 'Entrepreneur.com', url: 'https://www.entrepreneur.com' },
        { name: 'Forbes', url: 'https://www.forbes.pl' },
        { name: 'PulsHR', url: 'https://pulshr.pl' },
      ],
    },
    {
      title: 'Blogi Freelancerów',
      description: 'Blogi i zasoby dla niezależnych pracowników',
      links: [
        { name: 'Freelancer.pl', url: 'https://freelancer.pl' },
        { name: 'Blogi.pl - Kategoria Biznes', url: 'https://blogi.pl' },
        { name: 'Medium - Business', url: 'https://medium.com' },
        { name: 'Dev.to', url: 'https://dev.to' },
        { name: 'Hacker News', url: 'https://news.ycombinator.com' },
      ],
    },
    {
      title: 'Narzędzia SEO',
      description: 'Katalogi narzędzi biznesowych gdzie VAT Faktura może być recenzowana',
      links: [
        { name: 'AlternativeTo', url: 'https://alternativeto.net' },
        { name: 'Product Hunt', url: 'https://www.producthunt.com' },
        { name: 'BetaList', url: 'https://betalist.com' },
        { name: 'Launch.co', url: 'https://launch.co' },
        { name: 'Indie Hackers', url: 'https://www.indiehackers.com' },
      ],
    },
  ]

  const pressKits = [
    {
      title: 'VAT Faktura - Bezpłatny Program do Fakturowania',
      description: 'Podstawowy artykuł informacyjny',
      tags: ['Press Release', 'Informacja prasowa'],
    },
    {
      title: 'VAT Faktura wprowadza integrację z KSEF',
      description: 'Artykuł o nowej funkcji',
      tags: ['Nowa funkcja', 'Update'],
    },
    {
      title: 'Jak wybrać program do fakturowania',
      description: 'Poradnik dla biznesu',
      tags: ['Poradnik', 'Tutorial'],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent mb-6">
              Artykuły o VAT Faktura
            </h1>
            <p className="text-lg text-blue-200/80 max-w-3xl mx-auto mb-4">
              Dla blogerów, katalogów, i stron informacyjnych - gotowe artykuły do linków
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 border-2 border-indigo-500/50 rounded-lg p-8 sm:p-12 mb-16">
            <h2 className="text-2xl font-bold text-white mb-4">Informacje Prasowe</h2>
            <p className="text-blue-200/80 mb-6">
              Gotowe artykuły i informacje prasowe do publikacji na Waszych stronach i blogach. Wszystkie artykuły zawierają link do VAT Faktura.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pressKits.map((kit, idx) => (
                <Card key={idx} className="bg-slate-800/40 border border-blue-500/20 p-6">
                  <h3 className="font-bold text-white mb-2">{kit.title}</h3>
                  <p className="text-sm text-blue-200/70 mb-4">{kit.description}</p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {kit.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button className="w-full bg-indigo-600/20 border border-indigo-400/50 text-indigo-300 hover:bg-indigo-600/30">
                    Pobierz artykuł
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8">Gdzie mogą pochodzić backlinki</h2>

          <div className="space-y-8">
            {linkCategories.map((category, idx) => (
              <div key={idx}>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-blue-200/70">{category.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="bg-slate-800/40 border border-blue-500/20 p-4 hover:border-blue-500/50 transition-all h-full cursor-pointer hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold group-hover:text-cyan-300 transition-colors">
                            {link.name}
                          </span>
                          <ExternalLink className="w-4 h-4 text-blue-300 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <p className="text-xs text-blue-200/60 mt-2">Odwiedź katalog</p>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Card className="mt-16 bg-gradient-to-r from-green-600/20 to-cyan-600/20 border-2 border-green-500/50 p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">Chcesz linku do VAT Faktura?</h2>
            <p className="text-blue-200/80 mb-6">
              Jeśli prowadzisz bloga, katalog, lub stronę informacyjną, poprosimy o link do VAT Faktura. Gotowe teksty znajdziesz powyżej.
            </p>
            <a href="mailto:contact@vatfaktura.pl">
              <Button className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700">
                Napisz do nas
              </Button>
            </a>
          </Card>
        </div>
      </div>
    </div>
  )
}
