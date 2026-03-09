'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [nip, setNip] = useState('')
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Hasła się nie zgadzają')
      return
    }

    if (password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nip, company, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Błąd rejestracji')
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Trust Signals */}
        <div className="mb-6 space-y-2 text-center">
          <div className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
            <span className="text-xs font-semibold text-green-300">100% BEZPŁATNIE</span>
          </div>
          <p className="text-sm text-slate-300">Bez karty kredytowej • Bez limitów • Zawsze darmowe</p>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Rejestracja</CardTitle>
            <CardDescription>Utwórz nowe konto</CardDescription>
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
                <label className="block text-sm font-medium text-blue-300 mb-2">Email</label>
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
                <label className="block text-sm font-medium text-blue-300 mb-2">NIP</label>
                <Input
                  type="text"
                  placeholder="1234567890"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  required
                  className="min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">Nazwa firmy</label>
                <Input
                  type="text"
                  placeholder="Twoja firma"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">Hasło</label>
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-100"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">Potwierdź hasło</label>
                <div className="relative">
                  <Input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="min-h-[44px] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-100"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/50 min-h-[44px]"
              >
                {isLoading ? 'Rejestracja...' : 'Zarejestruj się'}
              </Button>
            </form>

            <p className="text-center text-blue-200/70 text-sm mt-4">
              Masz już konto?{' '}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Zaloguj się
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
