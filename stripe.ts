import Stripe from 'stripe';

// Initialize Stripe with server-side secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    invoicesPerMonth: 10,
    stripePriceId: 'price_free',
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    invoicesPerMonth: 100,
    stripePriceId: 'price_pro',
  },
  enterprise: {
    name: 'Enterprise',
    price: 29.99,
    invoicesPerMonth: -1, // Unlimited
    stripePriceId: 'price_enterprise',
  },
};
