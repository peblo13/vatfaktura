import crypto from 'crypto'

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
  password: string
  company: string
  nip: string
  createdAt: Date
  subscription: UserSubscription
  ksefToken?: string
  ksefSessionId?: string
}

// Use globalThis to persist across requests in Node.js
let users: Map<string, any> = (globalThis as any).usersStore || new Map()
;(globalThis as any).usersStore = users

// Helper functions
export function registerUser(email: string, password: string, company: string, nip: string) {
  if (users.has(email)) {
    throw new Error('Ten email jest już zarejestrowany')
  }

  const hashedPassword = crypto
    .createHash('sha256')
    .update(password + (process.env.NEXT_PUBLIC_SECRET || 'secret'))
    .digest('hex')

  const userId = crypto.randomUUID()
  users.set(email, {
    id: userId,
    email,
    password: hashedPassword,
    company,
    nip,
    createdAt: new Date(),
    subscription: {
      plan: 'free',
      invoicesUsedThisMonth: 0,
    } as UserSubscription,
  })

  return { userId, email, company, nip }
}

export function loginUser(email: string, password: string) {
  const user = users.get(email)
  if (!user) {
    throw new Error('Nieprawidłowy email lub hasło')
  }

  const hashedPassword = crypto
    .createHash('sha256')
    .update(password + (process.env.NEXT_PUBLIC_SECRET || 'secret'))
    .digest('hex')

  if (user.password !== hashedPassword) {
    throw new Error('Nieprawidłowy email lub hasło')
  }

  return user
}

export function getUsers() {
  return users
}

export function getUserById(userId: string) {
  for (const [_, user] of users.entries()) {
    if (user.id === userId) {
      return user
    }
  }
  return null
}

export function updateUserSubscription(userId: string, subscription: Partial<UserSubscription>) {
  for (const [email, user] of users.entries()) {
    if (user.id === userId) {
      user.subscription = { ...user.subscription, ...subscription }
      users.set(email, user)
      return user
    }
  }
  return null
}
