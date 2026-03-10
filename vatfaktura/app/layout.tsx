import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VAT Faktura',
  description: 'Program do tworzenia faktur VAT',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <head>
        <meta charSet="utf-8" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            width: 100%;
            height: 100%;
          }
          body {
            background-color: #0f172a;
            color: #ffffff;
            font-family: ${geistSans.style.fontFamily};
          }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
