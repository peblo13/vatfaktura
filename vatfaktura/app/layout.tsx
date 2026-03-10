import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'

const geistSans = Geist({ subsets: ['latin'] })

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body, #__next {
            width: 100%;
            height: 100%;
          }
          body {
            background-color: #0f172a;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            font-size: 16px;
          }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
