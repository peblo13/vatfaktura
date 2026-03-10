import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from './auth-context'
import { InvoiceProvider } from './invoice-context'
import { InitDemo } from './init-demo'
import CookieConsent from './cookie-consent'
import { CursorTrail } from '@/components/cursor-trail'
import { FuturisticLoader } from '@/components/futuristic-loader'
import { JsonLd } from '@/components/json-ld'
import { PerformanceOptimizations } from '@/components/performance-optimizations'
import './globals.css'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'VAT Faktura - Program do Fakturowania 100% Za Darmo | KSEF | Faktury Online',
  description: 'Najlepszy bezpłatny program do fakturowania z integracją kSEF. Twórz faktury w 30 sekund. 100% za darmo zawsze. Nie wymaga karty kredytowej. Dla freelancerów i firm.',
  generator: 'v0.app',
  keywords: 'program do fakturowania, faktury za darmo, fakturowanie online, KSEF, generator faktur, faktury VAT, program faktura, aplikacja do faktur, fakturowanie dla firm, e-faktura, kSEF integracja, szybkie faktury, najlepszy program do fakturowania, darmowe fakturowanie',
  metadataBase: new URL('https://www.vatfaktura.pl'),
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://www.vatfaktura.pl',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'VAT Faktura - Program do Fakturowania 100% Za Darmo',
    description: 'Bezpłatny program do fakturowania z kSEF. Faktury w 30 sekund. 100% darmowy zawsze. Integracja z Krajowym Systemem e-Faktur.',
    url: 'https://www.vatfaktura.pl',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: 'https://www.vatfaktura.pl/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VAT Faktura - Program do Fakturowania',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VAT Faktura - Fakturowanie 100% Za Darmo',
    description: 'Program do fakturowania z integracją kSEF. Faktury w 30 sekund. Bez opłat.',
    creator: '@vatfaktura',
  },
  verification: {
    google: 'YOUR_GOOGLE_SITE_VERIFICATION',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  themeColor: '#0066cc',
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className="bg-gradient-to-br from-slate-50 to-blue-50" suppressHydrationWarning>
      <head>
        <PerformanceOptimizations />
        <JsonLd />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `,
        }} />
        
        {/* Google Search Console */}
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
        
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9110227480064306"
          crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <CursorTrail />
        <FuturisticLoader />
        <AuthProvider>
          <InvoiceProvider>
            <InitDemo />
            {children}
            <CookieConsent />
            <Analytics />
          </InvoiceProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
