import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="bg-slate-900/50 border-b border-blue-500/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition">
              <Home className="w-4 h-4" />
              <span className="sr-only">Strona główna</span>
            </Link>
          </li>

          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-blue-600" />
              {item.href ? (
                <Link href={item.href} className="text-blue-400 hover:text-blue-300 transition text-sm">
                  {item.label}
                </Link>
              ) : (
                <span className="text-blue-200 text-sm">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[], baseUrl = 'https://www.vatfaktura.pl') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Strona główna',
        item: baseUrl,
      },
      ...items
        .filter(item => item.href)
        .map((item, idx) => ({
          '@type': 'ListItem',
          position: idx + 2,
          name: item.label,
          item: `${baseUrl}${item.href}`,
        })),
    ],
  }
}
