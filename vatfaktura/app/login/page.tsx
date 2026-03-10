'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Eye, EyeOff, FileText } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Błąd logowania')
        return
      }

      if (data.token) {
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('user', JSON.stringify({
          id: data.userId,
          email: data.email,
          company: data.company,
          nip: data.nip,
        }))
      }

      router.push('/dashboard')
    } catch (err) {
      setError('Błąd sieci - spróbuj ponownie')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="hidden sm:block absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
        <div className="hidden sm:block absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-3 sm:px-4 py-6 sm:py-8">
        {/* Trust Signals Above Card */}
        <div className="absolute top-6 sm:top-12 left-1/2 transform -translate-x-1/2">
          <div className="inline-block px-2 sm:px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
            <span className="text-xs font-semibold text-green-300">100% BEZPŁATNIE • BRAK LIMITÓW</span>
          </div>
        </div>

        <Card className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-blue-500/20 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 mt-12 sm:mt-0">
          <CardHeader className="px-6 pt-6">
            <div className="mb-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-4 shadow-lg shadow-blue-500/50">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
            </div>
            <CardTitle className="text-white text-center text-2xl sm:text-3xl font-bold">Logowanie</CardTitle>
            <CardDescription className="text-center text-blue-200/60 text-sm mt-2">Zaloguj się do swojego konta VAT Faktura</CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/20 border border-rose-500/30 mb-4 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-rose-300">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-blue-300 mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="twoj@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="min-h-[44px] bg-blue-500/10 border-blue-500/30 text-white placeholder:text-blue-300/50 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-blue-300 mb-1">Hasło</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="min-h-[44px] pr-10 bg-blue-500/10 border-blue-500/30 text-white placeholder:text-blue-300/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 shadow-lg shadow-green-500/50 min-h-[44px] text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>
                    Logowanie...
                  </span>
                ) : (
                  'Zaloguj się'
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-500/20"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-slate-800/50 text-blue-300/70">Lub</span>
              </div>
            </div>

            <p className="text-center text-blue-200/70 text-sm">
              Nie masz konta?{' '}
              <Link href="/register" className="text-green-400 hover:text-green-300 font-semibold transition-colors underline hover:underline">
                Załóż je teraz
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
