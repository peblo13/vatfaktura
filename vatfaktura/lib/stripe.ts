import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    invoicesPerMonth: 10,
    stripePriceId: 'price_free',
    features: [
      'Nieograniczone faktury',
      'Eksport do PDF',
      'Zarządzanie kontrahentami',
      'Raporty VAT',
      'Integracja z kSEF',
      'Historia i archiwum',
    ],
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    invoicesPerMonth: 100,
    stripePriceId: 'price_pro',
    features: [
      'Wszystkie funkcje z Free',
      'Zaawansowane szablony',
      'Opóźnione fakturowanie',
      'Automatyczne przypomnienia',
      'Priorytetowe wsparcie',
      'Zaawansowana analityka',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    price: 29.99,
    invoicesPerMonth: -1,
    stripePriceId: 'price_enterprise',
    features: [
      'Wszystkie funkcje z Pro',
      'Dedykowany wspierający',
      'API dostęp',
      'Integracje niestandardowe',
      'SLA gwarancji',
      'Wielopoziomowe konta',
    ],
  },
};
