import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './auth-context'
import { InvoiceProvider } from './invoice-context'
import { CookieConsent } from './cookie-consent'
import { InitDemo } from './init-demo'

const geistSans = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VAT Faktura - Darmowy Program do Fakturowania z KSeF',
  description: 'Bezpłatny program do wystawiania faktur VAT z integracją KSeF. Twórz profesjonalne faktury w 30 sekund. Bez limitów, bez ukrytych opłat.',
  keywords: 'faktura VAT, program do faktur, KSeF, darmowe fakturowanie, faktury online',
  authors: [{ name: 'VAT Faktura' }],
  openGraph: {
    title: 'VAT Faktura - Darmowy Program do Fakturowania',
    description: 'Bezpłatny program do wystawiania faktur VAT z integracją KSeF',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <AuthProvider>
          <InvoiceProvider>
            <InitDemo />
            {children}
            <CookieConsent />
          </InvoiceProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
