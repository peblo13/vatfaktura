import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from './auth-context'
import { InvoiceProvider } from './invoice-context'
import { InitDemo } from './init-demo'
import CookieConsent from './cookie-consent'
import './globals.css'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'VAT Faktura - Łatwe Fakturowanie Online',
  description: 'Profesjonalna platforma do szybkiego i łatwego tworzenia faktur online z zaawansowanymi funkcjami',
  generator: 'v0.app',
  keywords: 'faktury, fakturowanie, VAT, invoicing, online',
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
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0066cc',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className="bg-gradient-to-br from-slate-50 to-blue-50">
      <body className="font-sans antialiased bg-background text-foreground">
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
