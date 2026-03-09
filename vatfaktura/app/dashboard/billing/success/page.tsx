'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle, Loader } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [planName, setPlanName] = useState('')

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      return
    }

    // Verify session with server
    const verifySession = async () => {
      try {
        const response = await fetch(`/api/stripe/verify-session?sessionId=${sessionId}`)
        const data = await response.json()

        if (data.success) {
          setStatus('success')
          setPlanName(data.planName || 'Plan')
        } else {
          setStatus('error')
        }
      } catch (error) {
        setStatus('error')
      }
    }

    verifySession()
  }, [sessionId])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Weryfikacja płatności...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-white mb-4">Coś poszło nie tak</h1>
          <p className="text-slate-300 mb-8">
            Nie udało się zweryfikować Twojej płatności. Spróbuj ponownie lub skontaktuj się z nami.
          </p>
          <Link href="/pricing">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Wróć do cennika
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800 border border-blue-500/30 rounded-lg p-8 text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">Płatność potwierdzona!</h1>
          <p className="text-slate-300 mb-8">
            Dziękujemy za upgrade do planu <span className="font-semibold text-blue-400">{planName}</span>
          </p>

          <div className="bg-slate-700/50 rounded p-4 mb-8">
            <p className="text-sm text-slate-300 mb-2">Twoje nowe limity:</p>
            <p className="text-2xl font-bold text-blue-400">Dostęp pełny</p>
          </div>

          <div className="space-y-3">
            <Link href="/dashboard/billing" className="block">
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white h-11">
                Moje faktury
              </Button>
            </Link>
            <Link href="/dashboard" className="block">
              <Button variant="outline" className="w-full border-blue-500/30 hover:bg-blue-500/10 text-blue-300 h-11">
                Dashboard
              </Button>
            </Link>
          </div>

          <p className="text-xs text-slate-400 mt-6">
            Rachunek wysłany na Twoją pocztę. Możesz zmienić plan w ustawieniach.
          </p>
        </div>
      </div>
    </div>
  )
}
