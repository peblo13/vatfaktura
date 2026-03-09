import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { updateUserSubscription } from '@/lib/users-store'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

async function handleCustomerSubscriptionUpdated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription

  if (!subscription.metadata?.userId) {
    return
  }

  const userId = subscription.metadata.userId
  const planId = subscription.metadata.planId || 'pro'

  // Update user subscription
  updateUserSubscription(userId, {
    plan: planId as 'free' | 'pro' | 'enterprise',
    stripeCustomerId: subscription.customer as string,
    stripeSubscriptionId: subscription.id,
    currentPeriodStart: new Date(subscription.current_period_start * 1000),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
  })
}

async function handleInvoicePaid(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice

  if (!invoice.subscription) {
    return
  }

  // Subscription payment successful - subscription stays active
  // The updateUserSubscription was already called in handleCustomerSubscriptionUpdated
}

async function handleCustomerSubscriptionDeleted(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription

  if (!subscription.metadata?.userId) {
    return
  }

  const userId = subscription.metadata.userId

  // Downgrade user to free plan
  updateUserSubscription(userId, {
    plan: 'free',
    stripeCustomerId: undefined,
    stripeSubscriptionId: undefined,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const sig = request.headers.get('stripe-signature')

    if (!sig || !webhookSecret) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err) {
      return NextResponse.json(
        { error: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}` },
        { status: 400 }
      )
    }

    // Handle different event types
    switch (event.type) {
      case 'customer.subscription.updated':
        await handleCustomerSubscriptionUpdated(event)
        break
      case 'invoice.paid':
        await handleInvoicePaid(event)
        break
      case 'customer.subscription.deleted':
        await handleCustomerSubscriptionDeleted(event)
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
