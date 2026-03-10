/**
 * Simple authentication utility using localStorage
 * In production, use proper session management with HTTP-only cookies
 */

export interface UserSubscription {
  plan: 'free' | 'pro' | 'enterprise'
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  currentPeriodStart?: Date
  currentPeriodEnd?: Date
  invoicesUsedThisMonth: number
}

export interface User {
  id: string
  email: string
  company: string
  nip: string
  address?: string
  city?: string
  postalCode?: string
  subscription?: UserSubscription
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('authToken')
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export function setAuth(token: string, user: User) {
  if (typeof window === 'undefined') return
  localStorage.setItem('authToken', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export function logout() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
}

export function isAuthenticated(): boolean {
  return !!getAuthToken()
}
