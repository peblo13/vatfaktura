import { NextRequest, NextResponse } from 'next/server'

/**
 * GUS API Integration - Pobiera rzeczywiste dane firmy po NIP
 * API: https://wyszukiwarkaregon.stat.gov.pl/
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const nip = searchParams.get('nip')

  if (!nip || nip.length !== 10) {
    return NextResponse.json({
      success: false,
      error: 'NIP musi mieć 10 cyfr',
    })
  }

  try {
    // GUS REGON Search API with authentication - using POST
    const gusUrl = 'https://wyszukiwarkaregon.stat.gov.pl/api/search'
    const apiKey = process.env.GUS_API_KEY || ''

    const response = await fetch(gusUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: nip,
        apiKey: apiKey,
      }),
    })

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `GUS API error: ${response.status}`,
      })
    }

    let data
    try {
      const text = await response.text()
      data = JSON.parse(text)
    } catch (e) {
      return NextResponse.json({
        success: false,
        error: 'Invalid response format from GUS',
      })
    }

    // Extract company data from GUS response
    if (data && data.result && data.result.length > 0) {
      const company = data.result[0]
      
      return NextResponse.json({
        success: true,
        company: {
          name: company.name || company.nazwa || 'Brak danych',
          nip: company.nip || nip,
          regon: company.regon || '',
          street: company.street || company.ulica || '',
          streetNumber: company.streetNumber || company.numerDomu || '',
          city: company.city || company.miasto || '',
          postalCode: company.postalCode || company.kodPocztowy || '',
        },
      })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Firma nie znaleziona w bazie GUS. Sprawdź NIP i uzupełnij dane ręcznie.',
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Błąd połączenia z bazą GUS. Uzupełnij dane ręcznie.',
    })
  }
}
