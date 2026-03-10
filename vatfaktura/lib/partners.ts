export interface Partner {
  name: string
  description: string
  icon: string
  color: string
  borderColor: string
  link: string
  category: 'payments' | 'workspace' | 'design' | 'hosting' | 'accounting' | 'security' | 'tools'
}

export const PARTNERS: Partner[] = [
  {
    name: 'Wise',
    description: 'Przelewy międzynarodowe tanio i szybko',
    icon: '💳',
    color: 'from-blue-600/20 to-cyan-600/20',
    borderColor: 'border-blue-500/30 hover:border-blue-500/60',
    link: 'https://wise.com',
    category: 'payments',
  },
  {
    name: 'Revolut',
    description: 'Konto biznesowe z płatnikami dla firm',
    icon: '💎',
    color: 'from-indigo-600/20 to-blue-600/20',
    borderColor: 'border-indigo-500/30 hover:border-indigo-500/60',
    link: 'https://revolut.com/business',
    category: 'payments',
  },
  {
    name: 'Stripe',
    description: 'Płatności online dla Twojej firmy',
    icon: '💰',
    color: 'from-purple-600/20 to-pink-600/20',
    borderColor: 'border-purple-500/30 hover:border-purple-500/60',
    link: 'https://stripe.com',
    category: 'payments',
  },
  {
    name: 'PayPal',
    description: 'Płatności i przelewu dla biznesu',
    icon: '🅿️',
    color: 'from-blue-700/20 to-sky-600/20',
    borderColor: 'border-blue-600/30 hover:border-blue-600/60',
    link: 'https://paypal.com/business',
    category: 'payments',
  },
  {
    name: 'Comarch',
    description: 'Zaawansowane rozwiązania księgowe',
    icon: '📊',
    color: 'from-green-600/20 to-emerald-600/20',
    borderColor: 'border-green-500/30 hover:border-green-500/60',
    link: 'https://comarch.com',
    category: 'accounting',
  },
  {
    name: 'Namecheap',
    description: 'Domeny i hosting dla Twojej firmy',
    icon: '🌐',
    color: 'from-orange-600/20 to-red-600/20',
    borderColor: 'border-orange-500/30 hover:border-orange-500/60',
    link: 'https://namecheap.com',
    category: 'hosting',
  },
  {
    name: 'Google Workspace',
    description: 'Email i narzędzia dla zespołu',
    icon: '📧',
    color: 'from-red-600/20 to-rose-600/20',
    borderColor: 'border-red-500/30 hover:border-red-500/60',
    link: 'https://workspace.google.com',
    category: 'workspace',
  },
  {
    name: 'Slack',
    description: 'Komunikacja dla zespołu w jednym miejscu',
    icon: '💬',
    color: 'from-pink-600/20 to-rose-600/20',
    borderColor: 'border-pink-500/30 hover:border-pink-500/60',
    link: 'https://slack.com',
    category: 'workspace',
  },
  {
    name: 'Canva',
    description: 'Twórz materiały marketingowe',
    icon: '🎨',
    color: 'from-indigo-600/20 to-purple-600/20',
    borderColor: 'border-indigo-500/30 hover:border-indigo-500/60',
    link: 'https://canva.com',
    category: 'design',
  },
  {
    name: 'IDrive',
    description: 'Cloud backup i bezpieczeństwo danych',
    icon: '🔒',
    color: 'from-cyan-600/20 to-teal-600/20',
    borderColor: 'border-cyan-500/30 hover:border-cyan-500/60',
    link: 'https://idrive.com',
    category: 'security',
  },
  {
    name: 'LastPass',
    description: 'Manager haseł dla zespołu',
    icon: '🔐',
    color: 'from-red-700/20 to-red-600/20',
    borderColor: 'border-red-600/30 hover:border-red-600/60',
    link: 'https://lastpass.com',
    category: 'security',
  },
  {
    name: 'Zapier',
    description: 'Automatyzacja zadań bez kodowania',
    icon: '⚡',
    color: 'from-yellow-600/20 to-orange-600/20',
    borderColor: 'border-yellow-500/30 hover:border-yellow-500/60',
    link: 'https://zapier.com',
    category: 'tools',
  },
]

export const getPartnersByCategory = (category: Partner['category']): Partner[] => {
  return PARTNERS.filter(partner => partner.category === category)
}

export const getPartnerLink = (partnerName: string): string | null => {
  const partner = PARTNERS.find(p => p.name === partnerName)
  return partner?.link || null
}

export const FEATURED_PARTNERS = PARTNERS.slice(0, 6) // Top 6 dla strony głównej
export const ALL_PARTNERS = PARTNERS // Wszystkie dla dedicated strony
