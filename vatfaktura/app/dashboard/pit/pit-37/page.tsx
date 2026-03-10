'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, FileText } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@/hooks/useUser'
import { useEffect, useState } from 'react'
import { getPitDeclarationsByUser } from '@/lib/pit/pit-store'
import { PitDeclaration } from '@/lib/types/pit-types'

export default function Pit37ListPage() {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const [mounted, setMounted] = useState(false)
  const [declarations, setDeclarations] = useState<PitDeclaration[]>([])

  useEffect(() => {
    setMounted(true)
    if (!isLoading && !user) {
      router.push('/login')
    } else if (user) {
      const userDeclarations = getPitDeclarationsByUser(user.id).filter(d => d.type === 'PIT-37')
      setDeclarations(userDeclarations)
    }
  }, [user, isLoading, router])

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
              <FileText className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">PIT-37</h1>
            </div>
          </div>
          <Link href="/dashboard/pit/pit-37/create">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
              <Plus className="w-4 h-4" />
              Nowa deklaracja
            </button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border border-border/40 bg-card/30 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-6">Wszystkie Deklaracje PIT-37</h2>

          {declarations.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Brak deklaracji PIT-37</p>
              <Link href="/dashboard/pit/pit-37/create" className="text-primary hover:underline">
                Utwórz nową deklarację
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {declarations.map((decl) => (
                <div key={decl.id} className="p-4 rounded-lg border border-border/40 hover:bg-card/50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">Rok {decl.year}</p>
                      <p className="text-sm text-muted-foreground">
                        Utworzona: {new Date(decl.createdAt).toLocaleDateString('pl-PL')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 inline-block">
                        {decl.status}
                      </p>
                      <p className="font-semibold mt-2">{decl.taxToPay?.toFixed(2)} PLN</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
