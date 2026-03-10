'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/hooks/useUser'
import { ALL_PARTNERS } from '@/lib/partners'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Copy, Check } from 'lucide-react'

export default function PartnersPage() {
  const { user } = useUser()
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [copiedRefCode, setCopiedRefCode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [referralLink, setReferralLink] = useState('')

  useEffect(() => {
    if (user?.id) {
      setReferralLink(`https://www.vatfaktura.pl?ref=${user.id}`)
    }
  }, [user])

  const categories = ['all', 'payments', 'workspace', 'design', 'hosting', 'accounting', 'security', 'tools']
  const filteredPartners = selectedCategory === 'all' 
    ? ALL_PARTNERS 
    : ALL_PARTNERS.filter(p => p.category === selectedCategory)

  const copyLink = (link: string, index: number) => {
    navigator.clipboard.writeText(link)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const copyReferralLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink)
      setCopiedRefCode(true)
      setTimeout(() => setCopiedRefCode(false), 2000)
    }
  }

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      'all': 'Wszystko',
      'payments': 'Płatności',
      'workspace': 'Zespół',
      'security': 'Bezpieczeństwo',
      'design': 'Dizajn',
      'hosting': 'Hosting',
      'accounting': 'Księgowość',
      'tools': 'Narzędzia',
    }
    return labels[cat] || cat
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 sm:mb-6">
            Wszystkie Partnerzy
          </h1>
          <p className="text-base sm:text-lg text-blue-200/80 max-w-2xl mx-auto mb-4">
            Zarabiamy prowizje z tych partnerów - to pozwala nam utrzymywać VAT Faktura w 100% bezpłatnie
          </p>
          <div className="inline-block px-4 py-2 bg-green-600/20 border border-green-500/50 rounded-full text-sm text-green-300 font-medium">
            {ALL_PARTNERS.length} dostępnych partnerów
          </div>
        </div>

        {/* Referral System */}
        {user ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <Card className="bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20 border-2 border-amber-500/50 p-8 sm:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Polecaj VAT Faktura</h2>
                  <p className="text-amber-100 mb-6">
                    Zarobi razem z nami! Każdy użytkownik, którego polecisz, wspiera naszą monetyzację. Skopiuj link i udostępnij znajomym.
                  </p>
                  <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg border border-amber-500/30">
                    <code className="flex-1 text-xs sm:text-sm text-amber-200 font-mono truncate">
                      {referralLink}
                    </code>
                    <button
                      onClick={copyReferralLink}
                      className="flex-shrink-0 p-2 hover:bg-amber-500/20 rounded transition"
                    >
                      {copiedRefCode ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5 text-amber-300" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-8 border border-amber-500/20">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-200">Jeden nowy user</span>
                      <span className="font-bold text-amber-400">~$0.50-2</span>
                    </div>
                    <div className="h-px bg-amber-500/20"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-200">10 nowych users</span>
                      <span className="font-bold text-amber-400">~$5-20</span>
                    </div>
                    <div className="h-px bg-amber-500/20"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-200">100 nowych users</span>
                      <span className="font-bold text-amber-400">~$50-200</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <Card className="bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 border-2 border-blue-500/50 p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Chcesz zarabiać na poleceniach?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Zaloguj się aby uzyskać swój unikalny referral link i zacznij zarabiać na poleceniach VAT Faktura.
              </p>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/50 font-bold text-lg px-8 py-3">
                  Zaloguj się
                </Button>
              </Link>
            </Card>
          </div>
        )}

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? 'px-4 py-2 rounded-full text-sm font-medium transition-all bg-blue-600 text-white border border-blue-400' : 'px-4 py-2 rounded-full text-sm font-medium transition-all bg-slate-700/50 text-blue-200 border border-blue-500/30 hover:border-blue-500/50'}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Partners Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner, index) => (
              <a
                key={partner.name}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110`}></div>
                <Card className={`relative h-full bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border-2 ${partner.borderColor} transition-all duration-500 group-hover:bg-slate-800/80 group-hover:shadow-2xl group-hover:shadow-blue-500/30 transform group-hover:-translate-y-3 flex flex-col gap-6`}>
                  <div className="flex items-start justify-between">
                    <div className="text-5xl">{partner.icon}</div>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full">
                      {partner.category}
                    </span>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-blue-200/70 group-hover:text-blue-100/90 transition-colors">
                      {partner.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-blue-500/20 flex items-center justify-between">
                    <span className="text-sm text-cyan-300 font-semibold">Odwiedź stronę</span>
                    <ArrowRight className="w-5 h-5 text-cyan-300 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      copyLink(partner.link, index)
                    }}
                    className="w-full px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-400/50 rounded-lg text-blue-300 hover:text-blue-200 text-sm font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4" />
                        Skopiowano!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Kopiuj link
                      </>
                    )}
                  </button>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
