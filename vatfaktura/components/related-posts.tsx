import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ArrowRight, Clock } from 'lucide-react'

interface RelatedPost {
  id: string
  title: string
  slug: string
  excerpt: string
  readTime: string
  category: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
  currentPostId: string
}

export function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  const related = posts.filter((post) => post.id !== currentPostId).slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t border-blue-500/20">
      <h2 className="text-3xl font-bold text-white mb-8">Powiązane artykuły</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="bg-slate-800/40 border border-blue-500/20 p-6 hover:border-blue-500/50 transition-all h-full cursor-pointer group hover:-translate-y-2">
              <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full mb-3">
                {post.category}
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-3 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-blue-200/70 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-blue-200/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
