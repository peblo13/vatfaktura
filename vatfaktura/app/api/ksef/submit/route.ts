import { NextRequest, NextResponse } from 'next/server'

/**
 * kSEF Invoice Submission API v2
 * Wysyłanie faktur do Krajowego Systemu e-Faktur
 * 
 * Dokumentacja: https://api.ksef.mf.gov.pl/docs/v2/index.html
 * Specyfikacja: UBL 2.1 + kSEF
 * 
 * Funkcjonalności:
 * - Autentykacja challenge-response
 * - Generowanie UBL 2.1 XML
 * - Wysyłanie do kSEF API v2
 * - Śledzenie statusu UPO
 * - Obsługa błędów i logowanie
 */

import { getUserById } from '@/lib/users-store'
import { getActiveKsefSession, createKsefSubmission, updateKsefSubmissionStatus, getKsefSubmissionByInvoiceId } from '@/lib/ksef-session'
import { generateUBL21Invoice, UBLInvoiceData } from '@/lib/ksef-ubl'
import { authenticateWithKsef, validateNIP, KSEF_API_V2 } from '@/lib/ksef-auth'
import { createErrorResponse, createSuccessResponse, mapHttpErrorToKsef, logKsefError, logKsefSuccess, extractInvoiceReference, extractUPO, isKsefResponseSuccess } from '@/lib/ksef-errors'

interface SubmitInvoiceRequest {
  userId: string
  invoiceId: string
  invoiceData: {
    number: string
    issueDate: string
    dueDate: string
    currency: string
    seller: {
      name: string
      nip: string
      address?: string
      city?: string
      postalCode?: string
    }
    buyer: {
      name: string
      nip?: string
      address?: string
      city?: string
      postalCode?: string
    }
    items: Array<{
      id: string
      name: string
      description: string
      quantity: number
      unitCode: string
      unitPrice: number
      taxPercent: number
    }>
    notes?: string
  }
}

/**
 * POST /api/ksef/submit
 * Wysyła fakturę do kSEF
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SubmitInvoiceRequest
    const { userId, invoiceId, invoiceData } = body

    // 1. Walidacja użytkownika
    const user = getUserById(userId)
    if (!user) {
      return NextResponse.json(
        createErrorResponse('AUTH_FAILED', 401, 'Użytkownik nie znaleziony'),
        { status: 401 }
      )
    }

    const userNIP = user.nip || ''
    if (!validateNIP(userNIP)) {
      return NextResponse.json(
        createErrorResponse('INVALID_NIP', 400, 'NIP użytkownika jest nieprawidłowy'),
        { status: 400 }
      )
    }

    logKsefSuccess('SUBMIT_START', `Wysyłanie faktury ${invoiceData.number}`, userId, userNIP)

    // 2. Sprawdzenie czy faktura już nie została wysłana
    const existingSubmission = getKsefSubmissionByInvoiceId(invoiceId)
    if (existingSubmission && existingSubmission.status !== 'error') {
      return NextResponse.json(
        createErrorResponse('DUPLICATE_INVOICE', 400, `Faktura już została wysłana: ${existingSubmission.referenceNumber}`),
        { status: 400 }
      )
    }

    // 3. Pobranie lub utworzenie sesji kSEF
    let session = getActiveKsefSession(userId)
    
    if (!session) {
      // Autentykacja w kSEF
      const sessionToken = await authenticateWithKsef(userNIP, user.ksefToken || '')
      
      if (!sessionToken) {
        logKsefError('AUTH_FAILED', 'Błąd autentykacji w kSEF', userId, userNIP)
        return NextResponse.json(
          createErrorResponse('AUTH_FAILED', 401, 'Nie udało się zalogować do kSEF. Sprawdź NIP i token.'),
          { status: 401 }
        )
      }

      // Utworzenie nowej sesji
      const { createKsefSession } = await import('@/lib/ksef-session')
      session = createKsefSession(userId, userNIP, sessionToken)
    }

    // 4. Przygotowanie danych UBL
    const lineItems = invoiceData.items.map((item, idx) => ({
      id: item.id || String(idx + 1),
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      unitCode: item.unitCode || 'EA',
      unitPrice: item.unitPrice,
      lineExtensionAmount: item.quantity * item.unitPrice,
      taxPercent: item.taxPercent,
      taxAmount: (item.quantity * item.unitPrice * item.taxPercent) / 100,
    }))

    const totalNet = lineItems.reduce((sum, item) => sum + item.lineExtensionAmount, 0)
    const totalTax = lineItems.reduce((sum, item) => sum + item.taxAmount, 0)

    const ublData: UBLInvoiceData = {
      invoiceNumber: invoiceData.number,
      issueDate: invoiceData.issueDate,
      dueDate: invoiceData.dueDate,
      currency: invoiceData.currency,
      seller: invoiceData.seller,
      buyer: invoiceData.buyer,
      items: lineItems,
      totals: {
        lineExtensionAmount: totalNet,
        taxAmount: totalTax,
        payableAmount: totalNet + totalTax,
      },
      notes: invoiceData.notes,
    }

    // 5. Generowanie XML
    const ublXml = generateUBL21Invoice(ublData)

    // 6. Utworzenie rekordu submisji
    const submission = createKsefSubmission(userId, invoiceId, userNIP)

    // 7. Wysłanie do kSEF
    const ksefResponse = await sendInvoiceToKsef(
      ublXml,
      session.sessionToken,
      userNIP
    )

    if (!ksefResponse.success) {
      logKsefError('SUBMIT_FAILED', ksefResponse.error || 'Nieznany błąd', userId, userNIP)
      
      updateKsefSubmissionStatus(
        submission.id,
        'error',
        undefined,
        ksefResponse.error
      )

      return NextResponse.json(
        createErrorResponse(
          mapHttpErrorToKsef(ksefResponse.statusCode || 500),
          ksefResponse.statusCode || 500,
          ksefResponse.error
        ),
        { status: ksefResponse.statusCode || 500 }
      )
    }

    // 8. Zaktualizowanie statusu
    const referenceNumber = extractInvoiceReference(ksefResponse.data)
    const upo = extractUPO(ksefResponse.data)

    updateKsefSubmissionStatus(
      submission.id,
      'sent',
      referenceNumber || undefined,
      undefined,
      upo || undefined
    )

    logKsefSuccess(
      'SUBMIT_SUCCESS',
      `Faktura wysłana: ${referenceNumber}`,
      userId,
      userNIP
    )

    return NextResponse.json(
      createSuccessResponse({
        submissionId: submission.id,
        invoiceNumber: invoiceData.number,
        referenceNumber,
        upo,
        status: 'sent',
        message: 'Faktura wysłana do kSEF',
      }),
      { status: 200 }
    )
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[kSEF] POST /api/ksef/submit:', error)

    return NextResponse.json(
      createErrorResponse('UNKNOWN', 500, errorMsg),
      { status: 500 }
    )
  }
}

/**
 * GET /api/ksef/submit?submissionId=XXX
 * Pobiera status submisji
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const submissionId = searchParams.get('submissionId')
    const invoiceNumber = searchParams.get('invoiceNumber')
    const userId = searchParams.get('userId')

    if (!submissionId && !invoiceNumber) {
      return NextResponse.json(
        createErrorResponse('INVALID_INVOICE', 400, 'Podaj submissionId lub invoiceNumber'),
        { status: 400 }
      )
    }

    const { getKsefSubmission, getKsefSubmissionByInvoiceId } = await import('@/lib/ksef-session')

    let submission
    if (submissionId) {
      submission = getKsefSubmission(submissionId)
    } else if (invoiceNumber && userId) {
      // Wyszukanie po numerze faktury
      const allSubmissions = (await import('@/lib/ksef-session')).getUserKsefSubmissions(userId)
      submission = allSubmissions.find(s => s.invoiceId === invoiceNumber) || null
    }

    if (!submission) {
      return NextResponse.json(
        createErrorResponse('INVALID_INVOICE', 404, 'Submisja nie znaleziona'),
        { status: 404 }
      )
    }

    return NextResponse.json(
      createSuccessResponse({
        submissionId: submission.id,
        invoiceId: submission.invoiceId,
        status: submission.status,
        referenceNumber: submission.referenceNumber,
        upo: submission.upo,
        submittedAt: submission.submittedAt,
        acknowledgedAt: submission.acknowledgedAt,
        errorMessage: submission.errorMessage,
      }),
      { status: 200 }
    )
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[kSEF] GET /api/ksef/submit:', error)

    return NextResponse.json(
      createErrorResponse('UNKNOWN', 500, errorMsg),
      { status: 500 }
    )
  }
}

/**
 * Wysyła rzeczywistą fakturę do kSEF API v2
 */
async function sendInvoiceToKsef(
  ublXml: string,
  sessionToken: string,
  nip: string
): Promise<{
  success: boolean
  statusCode: number
  data?: any
  error?: string
}> {
  try {
    const response = await fetch(`${KSEF_API_V2}/invoices/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/xml',
        'Accept': 'application/json',
      },
      body: ublXml,
    })

    const responseData = await response.json()

    if (!response.ok) {
      return {
        success: false,
        statusCode: response.status,
        error: responseData.message || responseData.error || `HTTP ${response.status}`,
      }
    }

    // Sprawdzenie czy odpowiedź wskazuje na sukces
    if (!isKsefResponseSuccess(responseData)) {
      return {
        success: false,
        statusCode: 400,
        error: 'kSEF zwrócił błąd: ' + (responseData.message || responseData.error || 'Unknown'),
      }
    }

    return {
      success: true,
      statusCode: 200,
      data: responseData,
    }
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}


