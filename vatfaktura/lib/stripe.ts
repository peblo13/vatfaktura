import Stripe from 'stripe'

// Initialize Stripe with server-side secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-15',
})

// Subscription plans - ALL FREE FOREVER
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    monthlyInvoices: Infinity, // Unlimited invoices
    features: [
      'Nieograniczone faktury',
      'Zaawansowane szablony',
      'Eksport PDF/CSV',
      'Integracja kSEF',
      'Historia faktur',
      'Wiele walut',
    ],
    stripePriceId: undefined, // No Stripe pricing needed
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 0, // Free
    monthlyInvoices: Infinity,
    features: [
      'Nieograniczone faktury',
      'Zaawansowane szablony',
      'Eksport PDF/CSV',
      'Integracja kSEF',
      'Historia faktur',
      'Wiele walut',
    ],
    stripePriceId: undefined,
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0, // Free
    monthlyInvoices: Infinity,
    features: [
      'Nieograniczone faktury',
      'Wszystkie szablony',
      'Wszystkie eksporty',
      'Integracja kSEF',
      'API dostęp',
      'Wsparcie priorytetowe',
      'White label',
    ],
    stripePriceId: undefined,
  },
}

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS
export type PlanDetails = (typeof SUBSCRIPTION_PLANS)[SubscriptionPlan]

export function getPlanDetails(planId: string): PlanDetails | null {
  return SUBSCRIPTION_PLANS[planId as SubscriptionPlan] || null
}

export function getMonthlyInvoiceLimit(planId: string): number {
  const plan = getPlanDetails(planId)
  return plan?.monthlyInvoices || 5
}
