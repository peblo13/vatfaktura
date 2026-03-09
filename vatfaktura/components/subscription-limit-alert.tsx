import { AlertCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface SubscriptionLimitAlertProps {
  canCreateInvoice: boolean
  currentCount: number
  limit: number
  message?: string
  planId: string
}

export function SubscriptionLimitAlert({
  canCreateInvoice,
  currentCount,
  limit,
  message,
  planId,
}: SubscriptionLimitAlertProps) {
  if (canCreateInvoice && currentCount < limit - 2) {
    return null
  }

  const isAtLimit = !canCreateInvoice
  const isNearLimit = !isAtLimit && currentCount >= limit - 2

  return (
    <div
      className={`rounded-lg p-4 mb-6 flex items-start gap-4 ${
        isAtLimit
          ? 'bg-red-500/10 border border-red-500/30'
          : 'bg-yellow-500/10 border border-yellow-500/30'
      }`}
    >
      <AlertCircle
        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
          isAtLimit ? 'text-red-400' : 'text-yellow-400'
        }`}
      />
      <div className="flex-1">
        <p
          className={`font-semibold mb-2 ${
            isAtLimit ? 'text-red-300' : 'text-yellow-300'
          }`}
        >
          {isAtLimit
            ? 'Osiągnąłeś limit faktur'
            : `Bliski limitowi (${currentCount}/${limit})`}
        </p>
        <p className={isAtLimit ? 'text-red-200/80' : 'text-yellow-200/80'}>
          {message ||
            `Jesteś ${isAtLimit ? 'na' : 'blisko'} limitu ${limit} faktur na ten miesiąc.`}
        </p>
      </div>
      {planId !== 'enterprise' && (
        <Link href="/pricing" className="flex-shrink-0">
          <Button
            size="sm"
            className={
              isAtLimit
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-yellow-500 hover:bg-yellow-600 text-black'
            }
          >
            Upgrade
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      )}
    </div>
  )
}
