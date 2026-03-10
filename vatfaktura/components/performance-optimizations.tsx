import type { ReactNode } from 'react'

export async function Preload({ href, as }: { href: string; as: string }) {
  return (
    <link rel="preload" href={href} as={as} />
  )
}

export function PerformanceOptimizations() {
  return (
    <>
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      
      {/* Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Prefetch important pages */}
      <link rel="prefetch" href="/pricing" />
      <link rel="prefetch" href="/faq" />
      <link rel="prefetch" href="/blog" />
      <link rel="prefetch" href="/partners" />
    </>
  )
}
