/**
 * kSEF UBL 2.1 Invoice Generation
 * Generowanie faktury w formacie UBL 2.1 zgodnie z wymogami kSEF
 * Dokumentacja: UBL 2.1 https://docs.oasis-open.org/ubl/os-UBL-2.1/
 */

export interface UBLInvoiceData {
  invoiceNumber: string
  issueDate: string // YYYY-MM-DD
  dueDate: string // YYYY-MM-DD
  currency: string // np. PLN
  
  seller: {
    name: string
    nip: string
    address?: string
    city?: string
    postalCode?: string
    country?: string
  }
  
  buyer: {
    name: string
    nip?: string
    address?: string
    city?: string
    postalCode?: string
    country?: string
  }
  
  items: Array<{
    id: string
    name: string
    description: string
    quantity: number
    unitCode: string // np. 'EA' dla szt., 'MTR' dla metrów
    unitPrice: number
    lineExtensionAmount: number // quantity * unitPrice
    taxPercent: number // np. 23 dla VAT 23%
    taxAmount: number // lineExtensionAmount * (taxPercent / 100)
  }>
  
  totals: {
    lineExtensionAmount: number // suma netto
    taxAmount: number // suma VAT
    payableAmount: number // netto + VAT
  }
  
  notes?: string
  reference?: string
}

/**
 * Generuje pełną fakturę w formacie UBL 2.1
 */
export function generateUBL21Invoice(data: UBLInvoiceData): string {
  const now = new Date()
  const timestamp = now.toISOString()

  return `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
  xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
  xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
  xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
  xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2 http://docs.oasis-open.org/ubl/os-UBL-2.1/xsd/maindoc/UBL-Invoice-2.1.xsd">

  <!-- Identyfikacja dokumentu -->
  <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
  <cbc:CustomizationID>urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:3.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
  <cbc:ID>${escapeXML(data.invoiceNumber)}</cbc:ID>
  <cbc:IssueDate>${data.issueDate}</cbc:IssueDate>
  <cbc:IssueTime>${timestamp}</cbc:IssueTime>
  <cbc:DueDate>${data.dueDate}</cbc:DueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>${data.currency}</cbc:DocumentCurrencyCode>
  ${data.reference ? `<cbc:OrderReference><cbc:ID>${escapeXML(data.reference)}</cbc:ID></cbc:OrderReference>` : ''}
  
  <!-- Poddatkowanie (VAT) -->
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="${data.currency}">${data.totals.taxAmount.toFixed(2)}</cbc:TaxAmount>
    ${generateTaxSubtotals(data.items, data.currency)}
  </cac:TaxTotal>
  
  <!-- Sumy dokumentu -->
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="${data.currency}">${data.totals.lineExtensionAmount.toFixed(2)}</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="${data.currency}">${data.totals.lineExtensionAmount.toFixed(2)}</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="${data.currency}">${data.totals.payableAmount.toFixed(2)}</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="${data.currency}">${data.totals.payableAmount.toFixed(2)}</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
  
  <!-- Sprzedawca (dostawca) -->
  <cac:SupplierParty>
    <cac:Party>
      ${generatePartyIdentification(data.seller, 'seller')}
      <cac:PartyName>
        <cbc:Name>${escapeXML(data.seller.name)}</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        ${data.seller.address ? `<cbc:StreetName>${escapeXML(data.seller.address)}</cbc:StreetName>` : ''}
        ${data.seller.city ? `<cbc:CityName>${escapeXML(data.seller.city)}</cbc:CityName>` : ''}
        ${data.seller.postalCode ? `<cbc:PostalZone>${escapeXML(data.seller.postalCode)}</cbc:PostalZone>` : ''}
        ${data.seller.country ? `<cac:Country><cbc:IdentificationCode>${escapeXML(data.seller.country)}</cbc:IdentificationCode></cac:Country>` : '<cac:Country><cbc:IdentificationCode>PL</cbc:IdentificationCode></cac:Country>'}
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>${escapeXML(data.seller.nip)}</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
    </cac:Party>
  </cac:SupplierParty>
  
  <!-- Nabywca (klient) -->
  <cac:CustomerParty>
    <cac:Party>
      ${generatePartyIdentification(data.buyer, 'buyer')}
      <cac:PartyName>
        <cbc:Name>${escapeXML(data.buyer.name)}</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        ${data.buyer.address ? `<cbc:StreetName>${escapeXML(data.buyer.address)}</cbc:StreetName>` : ''}
        ${data.buyer.city ? `<cbc:CityName>${escapeXML(data.buyer.city)}</cbc:CityName>` : ''}
        ${data.buyer.postalCode ? `<cbc:PostalZone>${escapeXML(data.buyer.postalCode)}</cbc:PostalZone>` : ''}
        ${data.buyer.country ? `<cac:Country><cbc:IdentificationCode>${escapeXML(data.buyer.country)}</cbc:IdentificationCode></cac:Country>` : '<cac:Country><cbc:IdentificationCode>PL</cbc:IdentificationCode></cac:Country>'}
      </cac:PostalAddress>
      ${data.buyer.nip ? `<cac:PartyTaxScheme>
        <cbc:CompanyID>${escapeXML(data.buyer.nip)}</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>` : ''}
    </cac:Party>
  </cac:CustomerParty>
  
  <!-- Pozycje faktury -->
  ${data.items.map((item, index) => generateInvoiceLine(item, index + 1, data.currency)).join('')}
  
  ${data.notes ? `<cbc:Note>${escapeXML(data.notes)}</cbc:Note>` : ''}

</Invoice>`
}

/**
 * Generuje linię faktury (pozycję)
 */
function generateInvoiceLine(item: UBLInvoiceData['items'][0], lineNumber: number, currency: string): string {
  return `
  <cac:InvoiceLine>
    <cbc:ID>${lineNumber}</cbc:ID>
    <cbc:Note>${escapeXML(item.description)}</cbc:Note>
    <cbc:InvoicedQuantity unitCode="${item.unitCode}">${item.quantity.toFixed(2)}</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="${currency}">${item.lineExtensionAmount.toFixed(2)}</cbc:LineExtensionAmount>
    <cac:TaxTotal>
      <cbc:TaxAmount currencyID="${currency}">${item.taxAmount.toFixed(2)}</cbc:TaxAmount>
    </cac:TaxTotal>
    <cac:Item>
      <cbc:Name>${escapeXML(item.name)}</cbc:Name>
      <cbc:Description>${escapeXML(item.description)}</cbc:Description>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="${currency}">${item.unitPrice.toFixed(2)}</cbc:PriceAmount>
      <cbc:BaseQuantity unitCode="${item.unitCode}">1</cbc:BaseQuantity>
    </cac:Price>
  </cac:InvoiceLine>`
}

/**
 * Generuje Tax Subtotals (podziały podatków)
 */
function generateTaxSubtotals(items: UBLInvoiceData['items'], currency: string): string {
  const taxGroups = new Map<number, { amount: number; base: number }>()

  items.forEach(item => {
    const taxPercent = item.taxPercent
    if (!taxGroups.has(taxPercent)) {
      taxGroups.set(taxPercent, { amount: 0, base: 0 })
    }
    const group = taxGroups.get(taxPercent)!
    group.amount += item.taxAmount
    group.base += item.lineExtensionAmount
  })

  return Array.from(taxGroups.entries())
    .map(
      ([taxPercent, { amount, base }]) => `
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="${currency}">${base.toFixed(2)}</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="${currency}">${amount.toFixed(2)}</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID>${taxPercent === 0 ? 'Z' : 'S'}</cbc:ID>
        <cbc:Percent>${taxPercent}</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>`
    )
    .join('')
}

/**
 * Generuje identyfikację podmiotu (NIP, ID)
 */
function generatePartyIdentification(party: any, type: 'seller' | 'buyer'): string {
  return `<cac:PartyIdentification>
    <cbc:ID schemeID="0151">${escapeXML(party.nip || '')}</cbc:ID>
  </cac:PartyIdentification>`
}

/**
 * Usuwa znaki XML
 */
function escapeXML(str: string): string {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
