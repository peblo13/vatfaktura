/**
 * kSEF API v2 Authentication
 * Implementacja autentykacji challenge-response z szyfrowaniem RSA-OAEP
 * Dokumentacja: https://api.ksef.mf.gov.pl/docs/v2/index.html
 */

import crypto from 'crypto'

export const KSEF_API_V2 = 'https://api.ksef.mf.gov.pl/v2'

export interface KsefChallenge {
  challenge: string
  timestamp: number
}

export interface KsefAuthToken {
  sessionToken?: string
  encryptedToken?: string
  encryptionAlgorithm?: string
  publicKey?: string
}

export interface KsefCredentials {
  nip: string
  token: string
}

/**
 * Pobiera challenge z API kSEF
 */
export async function getKsefChallenge(nip: string): Promise<KsefChallenge | null> {
  try {
    const response = await fetch(`${KSEF_API_V2}/auth/challenge`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('[kSEF] Błąd pobrania challenge:', response.status)
      return null
    }

    const data = await response.json()
    return {
      challenge: data.challenge,
      timestamp: Date.now(),
    }
  } catch (error) {
    console.error('[kSEF] Błąd podczas pobierania challenge:', error)
    return null
  }
}

/**
 * Szyfruje token autentykacji za pomocą klucza publicznego RSA-OAEP
 */
export function encryptTokenWithRSA(
  token: string,
  publicKey: string
): string | null {
  try {
    // Konwersja klucza publicznego z formatu PEM
    const keyObject = crypto.createPublicKey({
      key: publicKey,
      format: 'pem',
    })

    // Szyfrowanie tokena za pomocą RSA-OAEP z SHA-256
    const encrypted = crypto.publicEncrypt(
      {
        key: keyObject,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(token, 'utf-8')
    )

    return encrypted.toString('base64')
  } catch (error) {
    console.error('[kSEF] Błąd szyfrowania tokena:', error)
    return null
  }
}

/**
 * Autentykacja w kSEF z walidacją challenge-response
 */
export async function authenticateWithKsef(
  nip: string,
  token: string
): Promise<string | null> {
  try {
    // 1. Pobierz challenge
    const challenge = await getKsefChallenge(nip)
    if (!challenge) {
      throw new Error('Nie udało się pobrać challenge z kSEF')
    }

    // 2. Utwórz response z challengem
    const response = await fetch(`${KSEF_API_V2}/auth/authenticate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: nip,
        password: token,
        challenge: challenge.challenge,
        timestamp: challenge.timestamp,
      }),
    })

    if (!response.ok) {
      console.error('[kSEF] Błąd autentykacji:', response.status)
      return null
    }

    const data = await response.json()
    return data.sessionToken || data.accessToken || null
  } catch (error) {
    console.error('[kSEF] Błąd autentykacji:', error)
    return null
  }
}

/**
 * Walidacja NIP (Numer Identyfikacji Podatkowej)
 */
export function validateNIP(nip: string): boolean {
  // NIP musi mieć 10 cyfr
  if (!/^\d{10}$/.test(nip)) {
    return false
  }

  // Algorytm sprawdzenia sumy kontrolnej NIP
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7]
  const digits = nip.split('').map(Number)
  let sum = 0

  for (let i = 0; i < 9; i++) {
    sum += digits[i] * weights[i]
  }

  const checksum = (sum % 11) % 10
  return checksum === digits[9]
}

/**
 * Generuje token autentykacji na podstawie credentialsów
 */
export function generateAuthToken(nip: string, secret: string): string {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const data = `${nip}|${timestamp}|${secret}`

  return crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('hex')
}
