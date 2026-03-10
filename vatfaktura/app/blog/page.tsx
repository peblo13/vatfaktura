import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getAllBlogPosts } from '@/lib/blog-posts'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - VAT Faktura | Poradniki Fakturowania, KSEF, Podatki 2026',
  description: 'Poradniki, artykuły i wskazówki dotyczące fakturowania, KSEF, VAT, podatków dla freelancerów i firm. Wszystko czego potrzebujesz wiedzieć o e-fakturach.',
  keywords: 'blog fakturowanie, KSEF poradnik, faktura VAT, podatki dla firm, e-faktury, poradniki',
}

export default function BlogPage() {
  const articles = getAllBlogPosts()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Blog VAT Faktura
          </h1>
          <p className="text-lg text-blue-200/80 max-w-2xl mx-auto mb-4">
            Poradniki, wskazówki i artykuły o fakturach, KSEF, podatach i zarządzaniu biznesem
          </p>
          <Link href="/register">
            <Button className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700">
              Zacznij Fakturować Za Darmo
            </Button>
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <Card className="bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 p-6 hover:border-blue-500/50 transition-all h-full cursor-pointer group hover:-translate-y-2">
                  <div className="space-y-4 h-full flex flex-col">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full mb-3">
                        {article.category}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                        {article.title}
                      </h3>
                    </div>

                    <p className="text-sm text-blue-200/70 flex-grow">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-blue-200/60 pt-4 border-t border-blue-500/20">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.date).toLocaleDateString('pl-PL', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-3">
                      {article.keywords.slice(0, 2).map((keyword) => (
                        <span key={keyword} className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                          #{keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
