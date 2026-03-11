import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { InvoiceProvider } from './invoice-context'
import { AuthProvider } from './auth-context'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'VAT Faktura - Darmowy Program do Fakturowania z KSeF',
  description: 'Darmowy program do wystawiania faktur VAT z pelna integracja KSeF. Bez limitow, bez oplat, bez karty kredytowej. Wystawiaj faktury w 30 sekund!',
  keywords: 'faktury VAT, program do faktur, KSeF, darmowe fakturowanie, faktury online, e-faktury',
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
    <html lang="pl" className={geistSans.variable}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <InvoiceProvider>
            {children}
          </InvoiceProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
