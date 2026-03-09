import { getMonthlyInvoiceLimit } from './stripe'

export interface SubscriptionLimitCheck {
  canCreateInvoice: boolean
  currentCount: number
  limit: number
  message?: string
}

export function checkSubscriptionLimit(
  planId: string,
  currentInvoiceCount: number
): SubscriptionLimitCheck {
  // All plans are unlimited now - no limits enforced
  return {
    canCreateInvoice: true,
    currentCount: currentInvoiceCount,
    limit: Infinity,
  }
}

export function getInvoiceCountThisMonth(invoices: any[]): number {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return invoices.filter(invoice => {
    const invoiceDate = new Date(invoice.issueDate)
    return invoiceDate.getMonth() === currentMonth && invoiceDate.getFullYear() === currentYear
  }).length
}

export function getUpgradeMessage(planId: string): string {
  // No upgrades needed - everything is free
  return 'Wszystkie plany są teraz bezpłatne - korzystaj bez limitów!'
}
