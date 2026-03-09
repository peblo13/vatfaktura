import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    invoicesPerMonth: 10,
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    invoicesPerMonth: 100,
  },
  enterprise: {
    name: 'Enterprise',
    price: 29.99,
    invoicesPerMonth: -1,
  },
};
