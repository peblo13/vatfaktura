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
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        {/* Trust Signals Above Card */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
          <div className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
            <span className="text-xs font-semibold text-green-300">100% BEZPŁATNIE • BRAK LIMITÓW</span>
          </div>
        </div>

        <Card className="w-full max-w-md bg-slate-800/80 backdrop-blur-xl border-blue-500/20 shadow-2xl">
          <CardHeader>
            <div className="mb-4 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-4 shadow-lg shadow-blue-500/50">
                <FileText className="w-7 h-7" />
              </div>
            </div>
            <CardTitle className="text-white text-center">Logowanie</CardTitle>
            <CardDescription className="text-center text-blue-200/60">Zaloguj się do swojego konta</CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/20 border border-rose-500/30 mb-4">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span className="text-sm text-rose-300">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">Email</label>
                <Input
                  type="email"
                  placeholder="twoj@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">Hasło</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="min-h-[44px] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-100 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/50 min-h-[44px]"
              >
                {isLoading ? 'Logowanie...' : 'Zaloguj się'}
              </Button>
            </form>

            <p className="text-center text-blue-200/70 text-sm mt-4">
              Nie masz konta?{' '}
              <Link href="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                Zarejestruj się
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
