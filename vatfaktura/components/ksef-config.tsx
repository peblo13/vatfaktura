/**
 * kSEF Configuration Component
 * Komponent do konfiguracji dostępu do kSEF
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

interface KsefConfigProps {
  userId: string
  currentNip: string
  isConfigured: boolean
  onConfigured?: () => void
}

export function KsefConfig({ userId, currentNip, isConfigured, onConfigured }: KsefConfigProps) {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      const response = await fetch('/api/ksef/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          nip: currentNip,
          token,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.details || 'Błąd konfiguracji')
      }

      setSuccess(true)
      setToken('')
      onConfigured?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nieznany błąd')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Integracja z kSEF
          </h3>
          <p className="text-sm text-slate-400">
            Skonfiguruj dostęp do Krajowego Systemu e-Faktur aby wysyłać faktury automatycznie.
          </p>
        </div>

        {isConfigured && (
          <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-sm text-green-300">
              Dostęp do kSEF jest skonfigurowany dla NIP: <code className="bg-black/30 px-1 rounded">{currentNip}</code>
            </p>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-sm text-green-300">Konfiguracja została zapisana!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Token dostępu kSEF
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Wklej token z kSEF"
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-slate-400 mt-1">
              Token otrzymasz rejestrując się w kSEF na stronie:{' '}
              <a
                href="https://www.podatki.gov.pl/ks-ief-krajowy-system-e-faktur/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                podatki.gov.pl
              </a>
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading || !token}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Zapisywanie...
              </>
            ) : (
              'Zapisz konfigurację'
            )}
          </Button>
        </form>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mt-4">
          <h4 className="text-sm font-semibold text-blue-300 mb-2">Jak skonfigurować?</h4>
          <ol className="text-xs text-blue-200/80 space-y-1 list-decimal list-inside">
            <li>Przejdź na <a href="https://www.podatki.gov.pl/ks-ief-krajowy-system-e-faktur/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">portal kSEF</a></li>
            <li>Zaloguj się do konta podatnika</li>
            <li>Wygeneruj token dostępu API</li>
            <li>Wklej token powyżej i zapisz konfigurację</li>
            <li>Teraz możesz wysyłać faktury do kSEF automatycznie</li>
          </ol>
        </div>
      </div>
    </Card>
  )
}
