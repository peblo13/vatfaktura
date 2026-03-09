import { NextRequest, NextResponse } from 'next/server'
import { Invoice } from '@/app/invoice-context'

interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
}

export async function POST(request: NextRequest) {
  try {
    const { invoice, user, items } = await request.json()

    // Generowanie HTML
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #0066cc; padding-bottom: 20px; }
            .invoice-title { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .invoice-number { color: #666; font-size: 14px; }
            .content { margin-bottom: 30px; }
            .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
            .party { padding: 15px; background: #f5f5f5; border-radius: 5px; }
            .party-title { font-weight: bold; font-size: 12px; color: #0066cc; margin-bottom: 10px; text-transform: uppercase; }
            .party-text { font-size: 13px; line-height: 1.6; }
            .dates { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
            .date-item { padding: 10px; background: #f9f9f9; border-left: 3px solid #0066cc; }
            .date-label { font-weight: bold; font-size: 12px; color: #666; }
            .date-value { font-size: 14px; margin-top: 5px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { background: #0066cc; color: white; padding: 12px; text-align: left; font-size: 13px; }
            td { padding: 12px; border-bottom: 1px solid #eee; font-size: 13px; }
            tr:nth-child(even) { background: #f9f9f9; }
            .totals { display: flex; justify-content: flex-end; margin: 30px 0; }
            .totals-table { width: 300px; }
            .totals-table tr td { padding: 8px 15px; }
            .totals-label { font-weight: bold; color: #666; }
            .totals-value { text-align: right; font-weight: bold; }
            .total-row { background: #0066cc; color: white; font-size: 16px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; text-align: center; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="invoice-title">FAKTURA</div>
            <div class="invoice-number">Nr ${invoice.number}</div>
          </div>

          <div class="parties">
            <div class="party">
              <div class="party-title">Sprzedawca</div>
              <div class="party-text">
                <strong>${user.company}</strong><br>
                NIP: ${user.nip}<br>
              </div>
            </div>
            <div class="party">
              <div class="party-title">Nabywca</div>
              <div class="party-text">
                <strong>${invoice.client.name}</strong><br>
                ${invoice.client.address}<br>
                NIP: ${invoice.client.nip}
              </div>
            </div>
          </div>

          <div class="dates">
            <div class="date-item">
              <div class="date-label">Data wystawienia</div>
              <div class="date-value">${new Date(invoice.issueDate).toLocaleDateString('pl-PL')}</div>
            </div>
            <div class="date-item">
              <div class="date-label">Termin płatności</div>
              <div class="date-value">${new Date(invoice.dueDate).toLocaleDateString('pl-PL')}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Lp.</th>
                <th>Opis usługi/towaru</th>
                <th style="text-align: right;">Ilość</th>
                <th style="text-align: right;">Cena jedn.</th>
                <th style="text-align: right;">Netto</th>
                <th style="text-align: right;">VAT 23%</th>
                <th style="text-align: right;">Brutto</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item: InvoiceItem, index: number) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.description}</td>
                  <td style="text-align: right;">${item.quantity}</td>
                  <td style="text-align: right;">${item.unitPrice.toFixed(2)} PLN</td>
                  <td style="text-align: right;">${(item.quantity * item.unitPrice).toFixed(2)} PLN</td>
                  <td style="text-align: right;">${((item.quantity * item.unitPrice) * 0.23).toFixed(2)} PLN</td>
                  <td style="text-align: right;">${((item.quantity * item.unitPrice) * 1.23).toFixed(2)} PLN</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>

          <div class="totals">
            <table class="totals-table">
              <tr>
                <td class="totals-label">Razem netto:</td>
                <td class="totals-value">${items.reduce((sum: number, item: InvoiceItem) => sum + item.quantity * item.unitPrice, 0).toFixed(2)} PLN</td>
              </tr>
              <tr>
                <td class="totals-label">VAT 23%:</td>
                <td class="totals-value">${(items.reduce((sum: number, item: InvoiceItem) => sum + item.quantity * item.unitPrice, 0) * 0.23).toFixed(2)} PLN</td>
              </tr>
              <tr class="total-row">
                <td class="totals-label">RAZEM DO ZAPŁATY:</td>
                <td class="totals-value">${(items.reduce((sum: number, item: InvoiceItem) => sum + item.quantity * item.unitPrice * 1.23, 0)).toFixed(2)} PLN</td>
              </tr>
            </table>
          </div>

          ${
            invoice.notes
              ? `<div style="margin-top: 30px; padding: 15px; background: #f9f9f9; border-left: 3px solid #0066cc;">
                  <strong>Uwagi:</strong><br>
                  ${invoice.notes}
                </div>`
              : ''
          }

          <div class="footer">
            <p>Faktura wygenerowana przez system vatfaktura.pl</p>
            <p>Data wygenerowania: ${new Date().toLocaleDateString('pl-PL')}</p>
          </div>
        </body>
      </html>
    `

    // Zwracamy HTML jako response
    return NextResponse.json({
      success: true,
      html: html,
      fileName: `faktura_${invoice.number}.html`,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Błąd przy generowaniu PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
