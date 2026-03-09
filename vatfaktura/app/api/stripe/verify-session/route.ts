import { NextRequest, NextResponse } from 'next/server'
import { stripe, SUBSCRIPTION_PLANS } from '@/lib/stripe'
import { updateUserSubscription } from '@/lib/users-store'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session ID' },
        { status: 400 }
      )
    }

    // Get session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Get subscription if session is complete
    let subscription = null
    if (session.subscription) {
      subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      )
    }

    const planId = session.metadata?.planId || 'pro'
    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]

    // Update user subscription in our database
    if (session.metadata?.userId) {
      updateUserSubscription(session.metadata.userId, {
        plan: planId as 'free' | 'pro' | 'enterprise',
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: subscription?.id,
        currentPeriodStart: subscription?.current_period_start ? new Date(subscription.current_period_start * 1000) : undefined,
        currentPeriodEnd: subscription?.current_period_end ? new Date(subscription.current_period_end * 1000) : undefined,
      })
    }

    return NextResponse.json({
      success: true,
      status: session.payment_status,
      planName: plan?.name || 'Unknown',
      customerId: session.customer,
    })
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to verify session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
