/**
 * kSEF Configuration API
 * Pozwala użytkownikowi skonfigurować token dostępu do kSEF
 */

import { NextRequest, NextResponse } from 'next/server'
import { getUserById } from '@/lib/users-store'
import { validateNIP, generateAuthToken } from '@/lib/ksef-auth'
import { createErrorResponse, createSuccessResponse } from '@/lib/ksef-errors'

interface ConfigureKsefRequest {
  userId: string
  nip: string
  token: string
}

/**
 * POST /api/ksef/configure
 * Konfiguruje dostęp do kSEF dla użytkownika
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ConfigureKsefRequest
    const { userId, nip, token } = body

    // Walidacja
    if (!userId || !nip || !token) {
      return NextResponse.json(
        createErrorResponse('INVALID_INVOICE', 400, 'Podaj userId, nip i token'),
        { status: 400 }
      )
    }

    // Walidacja NIP
    if (!validateNIP(nip)) {
      return NextResponse.json(
        createErrorResponse('INVALID_NIP', 400, 'Podany NIP jest nieprawidłowy'),
        { status: 400 }
      )
    }

    // Pobranie użytkownika
    const user = getUserById(userId)
    if (!user) {
      return NextResponse.json(
        createErrorResponse('AUTH_FAILED', 401, 'Użytkownik nie znaleziony'),
        { status: 401 }
      )
    }

    // Aktualizacja tokena (w produkcji -> szyfrowanie i baza danych!)
    user.ksefToken = token

    console.log(`[kSEF] Skonfigurowano dostęp do kSEF dla ${nip}`)

    return NextResponse.json(
      createSuccessResponse({
        userId,
        nip,
        configured: true,
        message: 'Dostęp do kSEF został skonfigurowany',
      }),
      { status: 200 }
    )
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[kSEF] POST /api/ksef/configure:', error)

    return NextResponse.json(
      createErrorResponse('UNKNOWN', 500, errorMsg),
      { status: 500 }
    )
  }
}

/**
 * GET /api/ksef/configure?userId=XXX
 * Pobiera status konfiguracji kSEF
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        createErrorResponse('AUTH_FAILED', 400, 'Podaj userId'),
        { status: 400 }
      )
    }

    const user = getUserById(userId)
    if (!user) {
      return NextResponse.json(
        createErrorResponse('AUTH_FAILED', 401, 'Użytkownik nie znaleziony'),
        { status: 401 }
      )
    }

    const isConfigured = !!(user.ksefToken && validateNIP(user.nip))

    return NextResponse.json(
      createSuccessResponse({
        userId,
        nip: user.nip,
        configured: isConfigured,
        hasToken: !!user.ksefToken,
      }),
      { status: 200 }
    )
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[kSEF] GET /api/ksef/configure:', error)

    return NextResponse.json(
      createErrorResponse('UNKNOWN', 500, errorMsg),
      { status: 500 }
    )
  }
}
