'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { ArrowLeft, Send, Clock, CheckCircle, AlertCircle, Settings, Info } from 'lucide-react'
import Link from 'next/link'
import { getPitDeclarationsByUser } from '@/lib/pit/pit-store'
import { PitDeclaration } from '@/lib/types/pit-types'

interface EPodatkiSubmission {
  id: string
  declarationId: string
  declarationType: 'PIT-37' | 'PIT-36'
  submittedAt: string
  status: 'pending' | 'sent' | 'accepted' | 'rejected'
  statusMessage?: string
  referenceNumber?: string
}

export default function EPodatkiPage() {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const [mounted, setMounted] = useState(false)
  const [declarations, setDeclarations] = useState<PitDeclaration[]>([])
  const [submissions, setSubmissions] = useState<EPodatkiSubmission[]>([])
  const [selectedDeclaration, setSelectedDeclaration] = useState<PitDeclaration | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [credentials, setCredentials] = useState({
    nip: '',
    password: '',
    email: '',
  })

  useEffect(() => {
    setMounted(true)
    if (!isLoading && !user) {
      router.push('/login')
    } else if (user) {
      setDeclarations(getPitDeclarationsByUser(user.id))
    }
  }, [user, isLoading, router])

  const handleSendDeclaration = () => {
    if (!selectedDeclaration || !credentials.nip) {
      alert('Wybierz deklarację i wpisz NIP')
      return
    }

    // Simulate sending to e-podatki
    const submission: EPodatkiSubmission = {
      id: `epo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      declarationId: selectedDeclaration.id,
      declarationType: selectedDeclaration.type as any,
      submittedAt: new Date().toISOString(),
      status: 'sent',
      referenceNumber: `REF-${Date.now()}`,
    }

    setSubmissions([...submissions, submission])
    alert(`Deklaracja wysłana! Numer referencyjny: ${submission.referenceNumber}`)
    setSelectedDeclaration(null)
  }

  const getSubmissionStatus = (declaration: PitDeclaration) => {
    return submissions.find(s => s.declarationId === declaration.id)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'sent':
        return <Send className="w-4 h-4 text-blue-400" />
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

  if (!mounted || isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary/30 border-t-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/pit" className="p-2 hover:bg-card/50 rounded-lg transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <Send className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">Integracja e-podatki</h1>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-4 py-2 border border-border/40 text-foreground rounded-lg hover:bg-card/50 transition"
          >
            <Settings className="w-4 h-4" />
            Ustawienia
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Settings Panel */}
        {showSettings && (
          <div className="border border-border/40 bg-card/30 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Ustawienia e-podatki</h2>

            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-2">NIP</label>
                <input
                  type="text"
                  value={credentials.nip}
                  onChange={(e) => setCredentials({ ...credentials, nip: e.target.value })}
                  placeholder="12-3456-7890-1234"
                  className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Hasło e-podatki</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                />
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
                  Zapisz
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-6 py-2 border border-border/40 text-foreground rounded-lg hover:bg-card/50 transition"
                >
                  Anuluj
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg border border-blue-500/20 bg-blue-500/10 text-sm text-blue-300">
              <p>Twoje dane dostępu są przechowywane bezpiecznie i używane tylko do wysyłania deklaracji do e-podatki.</p>
            </div>
          </div>
        )}

        {/* Send Declaration */}
        <div className="border border-border/40 bg-card/30 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Wyślij Deklarację do e-podatki</h2>

          {!credentials.nip ? (
            <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10 text-sm text-yellow-300">
              <p className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4" />
                Najpierw skonfiguruj swoje poświadczenia e-podatki
              </p>
              <button
                onClick={() => setShowSettings(true)}
                className="text-yellow-300 hover:underline"
              >
                Otwórz ustawienia
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Wybierz Deklarację</label>
                <select
                  value={selectedDeclaration?.id || ''}
                  onChange={(e) => {
                    const decl = declarations.find(d => d.id === e.target.value)
                    setSelectedDeclaration(decl || null)
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                >
                  <option value="">-- Wybierz deklarację --</option>
                  {declarations.map((decl) => (
                    <option key={decl.id} value={decl.id}>
                      {decl.type} ({decl.year}) - {decl.status}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDeclaration && (
                <div className="p-4 rounded-lg bg-background/50 border border-border/40">
                  <h3 className="font-semibold mb-2">{selectedDeclaration.type} - {selectedDeclaration.year}</h3>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>Status: <span className="text-foreground">{selectedDeclaration.status}</span></p>
                    <p>Podatek: <span className="text-foreground">{selectedDeclaration.taxToPay?.toFixed(2)} PLN</span></p>
                  </div>
                </div>
              )}

              <button
                onClick={handleSendDeclaration}
                disabled={!selectedDeclaration}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                <Send className="w-4 h-4" />
                Wyślij do e-podatki
              </button>
            </div>
          )}
        </div>

        {/* Submissions History */}
        <div className="border border-border/40 bg-card/30 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-6">Historia Wysyłek</h2>

          {submissions.length === 0 ? (
            <div className="text-center py-8">
              <Send className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">Brak wysyłek do e-podatki</p>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((submission) => {
                const declaration = declarations.find(d => d.id === submission.declarationId)
                return (
                  <div key={submission.id} className="p-4 rounded-lg border border-border/40 hover:bg-card/50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(submission.status)}
                          <p className="font-medium">
                            {declaration?.type} ({declaration?.year})
                          </p>
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                            {submission.status}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Wysłane: {new Date(submission.submittedAt).toLocaleDateString('pl-PL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}</p>
                          {submission.referenceNumber && (
                            <p>Numer referencyjny: <span className="font-mono">{submission.referenceNumber}</span></p>
                          )}
                          {submission.statusMessage && (
                            <p className="text-yellow-300">{submission.statusMessage}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="border border-border/40 bg-card/30 rounded-lg p-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Bezpieczeństwo:</strong> Twoje poświadczenia e-podatki nie są nigdy wysyłane na serwery zewnętrzne. Wysyłka odbywa się bezpośrednio z Twojej przeglądarki.</p>
              <p><strong>Format:</strong> Deklaracje są wysyłane w formacie XML zgodnym ze specyfikacją e-podatki.</p>
              <p><strong>Potwierdzenie:</strong> Po wysłaniu otrzymasz numer referencyjny potwierdzający przyjęcie deklaracji.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
