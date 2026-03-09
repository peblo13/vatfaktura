/**
 * kSEF Status Display Component
 * Wyświetla status wysłania faktury do kSEF
 */

'use client'

import { CheckCircle, AlertCircle, Loader2, FileText, Trophy } from 'lucide-react'

export interface KsefStatusProps {
  status: 'pending' | 'sent' | 'accepted' | 'rejected' | 'error' | 'not_configured'
  referenceNumber?: string
  upo?: string
  errorMessage?: string
  submittedAt?: Date
  onSubmit?: () => void
  isLoading?: boolean
}

export function KsefStatus({
  status,
  referenceNumber,
  upo,
  errorMessage,
  submittedAt,
  onSubmit,
  isLoading,
}: KsefStatusProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'accepted':
        return 'bg-green-500/10 border-green-500/30 text-green-300'
      case 'sent':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-300'
      case 'pending':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
      case 'error':
      case 'rejected':
        return 'bg-red-500/10 border-red-500/30 text-red-300'
      case 'not_configured':
        return 'bg-slate-700/10 border-slate-700/30 text-slate-300'
      default:
        return 'bg-slate-700/10 border-slate-700/30 text-slate-300'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'accepted':
        return <Trophy className="w-5 h-5 text-green-400" />
      case 'sent':
        return <FileText className="w-5 h-5 text-blue-400" />
      case 'pending':
        return <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
      case 'error':
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-slate-400" />
    }
  }

  const getStatusLabel = () => {
    switch (status) {
      case 'accepted':
        return 'Zaakceptowana w kSEF'
      case 'sent':
        return 'Wysłana do kSEF'
      case 'pending':
        return 'Oczekuje na wysłanie'
      case 'error':
        return 'Błąd wysłania'
      case 'rejected':
        return 'Odrzucona przez kSEF'
      case 'not_configured':
        return 'kSEF nie skonfigurowana'
      default:
        return 'Nieznany status'
    }
  }

  return (
    <div className={`border rounded-lg p-4 ${getStatusColor()}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="mt-0.5">{getStatusIcon()}</div>
          <div>
            <p className="font-semibold text-sm">{getStatusLabel()}</p>

            {referenceNumber && (
              <p className="text-xs mt-1 opacity-80">
                Referencja: <code className="bg-black/20 px-1 rounded">{referenceNumber}</code>
              </p>
            )}

            {upo && (
              <p className="text-xs mt-1 opacity-80">
                UPO: <code className="bg-black/20 px-1 rounded">{upo}</code>
              </p>
            )}

            {errorMessage && (
              <p className="text-xs mt-1 opacity-80">
                Błąd: {errorMessage}
              </p>
            )}

            {submittedAt && (
              <p className="text-xs mt-1 opacity-70">
                {new Date(submittedAt).toLocaleDateString('pl-PL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}
          </div>
        </div>

        {status === 'pending' && onSubmit && (
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="px-3 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors whitespace-nowrap"
          >
            {isLoading ? 'Wysyłam...' : 'Wyślij'}
          </button>
        )}

        {status === 'error' && onSubmit && (
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="px-3 py-1 text-xs font-semibold bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors whitespace-nowrap"
          >
            {isLoading ? 'Ponawiam...' : 'Ponów'}
          </button>
        )}
      </div>
    </div>
  )
}
