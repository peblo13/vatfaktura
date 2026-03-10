import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface InternalLink {
  text: string
  href: string
  relevance: 'high' | 'medium' | 'low'
}

interface SmartInternalLinksProps {
  currentSlug: string
  relatedLinks: InternalLink[]
}

export function SmartInternalLinks({
  relatedLinks,
}: SmartInternalLinksProps) {
  const highRelevance = relatedLinks.filter(l => l.relevance === 'high')
  const mediumRelevance = relatedLinks.filter(l => l.relevance === 'medium')

  return (
    <div className="my-8 space-y-6">
      {highRelevance.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Powiązane artykuły</h3>
          <ul className="space-y-3">
            {highRelevance.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <span className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                    {link.text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {mediumRelevance.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Więcej na ten temat</h3>
          <ul className="space-y-2">
            {mediumRelevance.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <span className="text-gray-600 hover:text-gray-800 hover:underline">
                    {link.text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
