import { useCallback, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startCheckout = useCallback(
    async (planId: string, userId: string, email: string) => {
      try {
        setLoading(true)
        setError(null)

        // Call checkout endpoint
        const response = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planId, userId, email }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session')
        }

        // Free plan doesn't redirect
        if (planId === 'free') {
          return { success: true, planId: 'free' }
        }

        // Redirect to Stripe checkout
        if (data.url) {
          window.location.href = data.url
        } else if (data.sessionId) {
          const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
          )
          if (!stripe) {
            throw new Error('Failed to load Stripe')
          }

          const result = await stripe.redirectToCheckout({
            sessionId: data.sessionId,
          })

          if (result.error) {
            throw new Error(result.error.message)
          }
        }

        return { success: true, sessionId: data.sessionId }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        setError(message)
        return { success: false, error: message }
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { startCheckout, loading, error }
}
