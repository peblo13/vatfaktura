/**
 * kSEF Error Handling
 * Obsługa błędów i kodów odpowiedzi API kSEF
 */

export type KsefErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'EXPIRED_SESSION'
  | 'INVALID_NIP'
  | 'INVALID_INVOICE'
  | 'DUPLICATE_INVOICE'
  | 'INVALID_XML'
  | 'AUTH_FAILED'
  | 'RATE_LIMIT'
  | 'SERVER_ERROR'
  | 'UNKNOWN'

export interface KsefErrorResponse {
  code: KsefErrorCode
  message: string
  details?: string
  statusCode: number
}

export interface KsefSuccessResponse<T = any> {
  success: true
  data: T
  timestamp: string
}

export type KsefResponse<T = any> = KsefSuccessResponse<T> | KsefErrorResponse

/**
 * Mapowanie kodów błędów HTTP na kody kSEF
 */
export function mapHttpErrorToKsef(statusCode: number, responseBody?: any): KsefErrorCode {
  if (statusCode === 401 || statusCode === 403) {
    return 'AUTH_FAILED'
  }
  if (statusCode === 400) {
    if (responseBody?.error?.includes('NIP')) {
      return 'INVALID_NIP'
    }
    if (responseBody?.error?.includes('XML')) {
      return 'INVALID_XML'
    }
    if (responseBody?.error?.includes('duplicate')) {
      return 'DUPLICATE_INVOICE'
    }
    return 'INVALID_INVOICE'
  }
  if (statusCode === 429) {
    return 'RATE_LIMIT'
  }
  if (statusCode >= 500) {
    return 'SERVER_ERROR'
  }
  return 'UNKNOWN'
}

/**
 * Tłumaczenia błędów na polski
 */
const ERROR_MESSAGES: Record<KsefErrorCode, string> = {
  INVALID_CREDENTIALS: 'Nieprawidłowe dane logowania do kSEF',
  EXPIRED_SESSION: 'Sesja z kSEF wygasła, zaloguj się ponownie',
  INVALID_NIP: 'Podano nieprawidłowy NIP',
  INVALID_INVOICE: 'Faktura zawiera błędy lub brakuje wymaganych pól',
  DUPLICATE_INVOICE: 'Faktura o tym numerze już została wysłana do kSEF',
  INVALID_XML: 'Format XML faktury jest nieprawidłowy',
  AUTH_FAILED: 'Błąd autoryzacji w kSEF',
  RATE_LIMIT: 'Zbyt wiele żądań do kSEF, spróbuj za chwilę',
  SERVER_ERROR: 'Serwer kSEF jest niedostępny, spróbuj ponownie',
  UNKNOWN: 'Nieznany błąd podczas komunikacji z kSEF',
}

/**
 * Pobiera opis błędu
 */
export function getErrorMessage(code: KsefErrorCode): string {
  return ERROR_MESSAGES[code] || 'Nieznany błąd'
}

/**
 * Tworzy odpowiedź błędu
 */
export function createErrorResponse(
  code: KsefErrorCode,
  statusCode: number,
  details?: string
): KsefErrorResponse {
  return {
    code,
    message: getErrorMessage(code),
    details,
    statusCode,
  }
}

/**
 * Tworzy odpowiedź sukcesu
 */
export function createSuccessResponse<T>(data: T): KsefSuccessResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  }
}

/**
 * Loguje błąd kSEF
 */
export function logKsefError(
  context: string,
  error: any,
  userId?: string,
  nip?: string
): void {
  const timestamp = new Date().toISOString()
  const errorMsg = error instanceof Error ? error.message : String(error)

  console.error(`[kSEF] [${context}] [${timestamp}] ${errorMsg}`, {
    userId,
    nip,
    stack: error instanceof Error ? error.stack : undefined,
  })
}

/**
 * Loguje sukceśną operację
 */
export function logKsefSuccess(
  context: string,
  message: string,
  userId?: string,
  nip?: string
): void {
  const timestamp = new Date().toISOString()
  console.log(`[kSEF] [${context}] [${timestamp}] ${message}`, { userId, nip })
}

/**
 * Validuje odpowiedź z kSEF
 */
export function validateKsefResponse(response: any): boolean {
  if (!response) return false
  if (!response.status && !response.statusCode) return false
  // Każda odpowiedź powinna mieć znacznik czasowy
  if (!response.timestamp && !response.date) return false
  return true
}

/**
 * Extrahuje referencję do faktury z odpowiedzi kSEF
 */
export function extractInvoiceReference(response: any): string | null {
  return (
    response?.referenceNumber ||
    response?.reference ||
    response?.invoiceNumber ||
    response?.id ||
    null
  )
}

/**
 * Extrahuje UPO (Universal Processing Proof) z odpowiedzi kSEF
 */
export function extractUPO(response: any): string | null {
  return response?.upo || response?.upoNumber || response?.processingProof || null
}

/**
 * Sprawdza czy odpowiedź wskazuje na powodzenie
 */
export function isKsefResponseSuccess(response: any): boolean {
  if (!response) return false

  const status = response.status || response.statusCode
  const statusStr = String(status).toLowerCase()

  // kSEF zwraca statusy: 0 (błąd), 1 (przetwarzanie), 2+ (różne kody)
  // HTTP 2xx = sukces
  return (
    statusStr.startsWith('2') ||
    statusStr === 'accepted' ||
    statusStr === 'submitted' ||
    response.success === true
  )
}
