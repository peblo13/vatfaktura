import { NextRequest, NextResponse } from 'next/server'
import { stripe, SUBSCRIPTION_PLANS } from '@/lib/stripe'
import { getUserById } from '@/lib/users-store'
import type Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    const { planId, userId, email } = await request.json()

    if (!planId || !userId || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get plan details
    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]
    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      )
    }

    // Free plan doesn't need Stripe checkout
    if (planId === 'free') {
      return NextResponse.json({
        success: true,
        message: 'Free plan selected',
        planId: 'free',
      })
    }

    // Validate that the plan has a Stripe price ID
    if (!plan.stripePriceId) {
      return NextResponse.json(
        { error: 'Stripe price ID not configured for this plan' },
        { status: 500 }
      )
    }

    // Create or get Stripe customer
    const user = getUserById(userId)
    const stripeCustomerId = user?.subscription?.stripeCustomerId

    // Create checkout session with proper types
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/billing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing`,
      metadata: {
        userId,
        planId,
      },
      customer_email: email,
    }

    // Add customer ID if exists
    if (stripeCustomerId) {
      sessionParams.customer = stripeCustomerId
      delete sessionParams.customer_email
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
