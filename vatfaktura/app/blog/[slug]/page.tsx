import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getBlogPost, getAllBlogPosts } from '@/lib/blog-posts'
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react'
import { notFound } from 'next/navigation'
import { AdSenseDisplay300x250, AdSenseDisplayAuto } from '@/components/adsense-banner'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Artykuł nie znaleziony',
    }
  }

  return {
    title: `${post.title} | VAT Faktura Blog`,
    description: post.excerpt,
    keywords: post.keywords.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://www.vatfaktura.pl/blog/${post.slug}`,
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getAllBlogPosts()
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/blog">
          <Button variant="outline" className="mb-8 border-blue-500/30 hover:bg-blue-500/10 text-blue-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Wróć do bloga
          </Button>
        </Link>

        <article className="prose prose-invert max-w-none">
          <header className="mb-8 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-blue-200/70 text-sm pt-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('pl-PL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {post.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-2 py-1 bg-slate-800/50 border border-blue-400/20 text-blue-300 text-xs rounded"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </header>

          <div className="bg-slate-800/30 border border-blue-500/20 rounded-lg p-8 mt-12 prose prose-invert prose-lg max-w-none space-y-6">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('#')) {
                const level = paragraph.match(/^#+/)?.[0].length || 1
                const text = paragraph.replace(/^#+\s/, '')
                if (level === 1) return <h1 key={idx} className="text-3xl font-bold text-white mt-8 mb-4">{text}</h1>
                if (level === 2) return <h2 key={idx} className="text-2xl font-bold text-blue-300 mt-6 mb-3">{text}</h2>
                if (level === 3) return <h3 key={idx} className="text-xl font-semibold text-blue-200 mt-4 mb-2">{text}</h3>
              }
              
              if (paragraph.startsWith('-')) {
                const items = paragraph.split('\n').map(item => item.replace(/^-\s/, ''))
                return (
                  <ul key={idx} className="space-y-2 list-disc list-inside text-blue-100">
                    {items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )
              }

              if (paragraph.match(/^\d+\./)) {
                const items = paragraph.split('\n').map(item => item.replace(/^\d+\.\s/, ''))
                return (
                  <ol key={idx} className="space-y-2 list-decimal list-inside text-blue-100">
                    {items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                )
              }

              return (
                <p key={idx} className="text-blue-100 leading-relaxed">
                  {paragraph}
                </p>
              )
            })}
          </div>

          {/* AdSense Banner - After content, before CTA */}
          <div className="my-12">
            <AdSenseDisplay300x250 />
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-r from-green-600/20 to-cyan-600/20 border border-green-500/30 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Spróbuj VAT Faktura za darmo
            </h3>
            <p className="text-blue-200 mb-6">
              Zacznij fakturować profesjonalnie w 30 sekund. Bez limitów, bez opłat.
            </p>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 shadow-lg shadow-green-500/50">
                Załóż konto
              </Button>
            </Link>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-8">Podobne artykuły</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <Card className="bg-slate-800/40 border border-blue-500/20 p-6 hover:border-blue-500/50 transition-all h-full cursor-pointer group">
                    <span className="text-xs font-semibold text-blue-400 mb-2 block">
                      {relatedPost.category}
                    </span>
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-blue-200/70 mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-blue-200/50">
                      <span>{relatedPost.readTime}</span>
                      <span>→</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
