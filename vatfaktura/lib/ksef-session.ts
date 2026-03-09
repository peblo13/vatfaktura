/**
 * kSEF Session Management
 * Przechowywanie i zarządzanie sesjami z kSEF
 */

import crypto from 'crypto'

export interface KsefSession {
  sessionId: string
  userId: string
  nip: string
  sessionToken: string
  createdAt: Date
  expiresAt: Date
  active: boolean
}

export interface KsefSubmission {
  id: string
  userId: string
  invoiceId: string
  nip: string
  referenceNumber?: string
  status: 'pending' | 'sent' | 'accepted' | 'rejected' | 'error'
  errorMessage?: string
  submittedAt?: Date
  acknowledgedAt?: Date
  upo?: string // Universal Processing Proof
}

// In-memory session store (w produkcji -> baza danych!)
let sessions: Map<string, KsefSession> = (globalThis as any).ksefSessions || new Map()
;(globalThis as any).ksefSessions = sessions

let submissions: Map<string, KsefSubmission> = (globalThis as any).ksefSubmissions || new Map()
;(globalThis as any).ksefSubmissions = submissions

/**
 * Tworzy nową sesję kSEF
 */
export function createKsefSession(
  userId: string,
  nip: string,
  sessionToken: string,
  expiresInMinutes: number = 480 // domyślnie 8 godzin
): KsefSession {
  const sessionId = crypto.randomUUID()
  const now = new Date()
  const expiresAt = new Date(now.getTime() + expiresInMinutes * 60000)

  const session: KsefSession = {
    sessionId,
    userId,
    nip,
    sessionToken,
    createdAt: now,
    expiresAt,
    active: true,
  }

  sessions.set(sessionId, session)
  return session
}

/**
 * Pobiera aktywną sesję użytkownika
 */
export function getActiveKsefSession(userId: string): KsefSession | null {
  for (const [_, session] of sessions) {
    if (
      session.userId === userId &&
      session.active &&
      session.expiresAt > new Date()
    ) {
      return session
    }
  }
  return null
}

/**
 * Pobiera sesję po ID
 */
export function getKsefSessionById(sessionId: string): KsefSession | null {
  const session = sessions.get(sessionId)
  if (session && session.expiresAt > new Date()) {
    return session
  }
  if (session) {
    session.active = false
  }
  return null
}

/**
 * Zamyka sesję
 */
export function closeKsefSession(sessionId: string): boolean {
  const session = sessions.get(sessionId)
  if (session) {
    session.active = false
    return true
  }
  return false
}

/**
 * Tworzy nowy rekord submisji faktury
 */
export function createKsefSubmission(
  userId: string,
  invoiceId: string,
  nip: string
): KsefSubmission {
  const id = crypto.randomUUID()

  const submission: KsefSubmission = {
    id,
    userId,
    invoiceId,
    nip,
    status: 'pending',
    submittedAt: new Date(),
  }

  submissions.set(id, submission)
  return submission
}

/**
 * Aktualizuje status submisji
 */
export function updateKsefSubmissionStatus(
  submissionId: string,
  status: KsefSubmission['status'],
  referenceNumber?: string,
  errorMessage?: string,
  upo?: string
): KsefSubmission | null {
  const submission = submissions.get(submissionId)
  if (!submission) return null

  submission.status = status

  if (status === 'sent') {
    submission.acknowledgedAt = new Date()
  }

  if (referenceNumber) {
    submission.referenceNumber = referenceNumber
  }

  if (errorMessage) {
    submission.errorMessage = errorMessage
  }

  if (upo) {
    submission.upo = upo
  }

  submissions.set(submissionId, submission)
  return submission
}

/**
 * Pobiera submisję
 */
export function getKsefSubmission(submissionId: string): KsefSubmission | null {
  return submissions.get(submissionId) || null
}

/**
 * Pobiera wszystkie submisje użytkownika
 */
export function getUserKsefSubmissions(userId: string): KsefSubmission[] {
  return Array.from(submissions.values()).filter(s => s.userId === userId)
}

/**
 * Pobiera submisję po ID faktury
 */
export function getKsefSubmissionByInvoiceId(invoiceId: string): KsefSubmission | null {
  for (const [_, submission] of submissions) {
    if (submission.invoiceId === invoiceId) {
      return submission
    }
  }
  return null
}

/**
 * Czyści wygasłe sesje (powinno być uruchamiane periodycznie)
 */
export function cleanupExpiredSessions(): number {
  let cleaned = 0
  const now = new Date()

  for (const [sessionId, session] of sessions) {
    if (session.expiresAt < now) {
      sessions.delete(sessionId)
      cleaned++
    }
  }

  return cleaned
}
