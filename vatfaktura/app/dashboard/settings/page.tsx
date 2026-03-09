'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ChevronLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const router = useRouter()
  const { user, isLoading, logout } = useUser()
  const [saved, setSaved] = useState(false)
  const [formData, setFormData] = useState({
    company: user?.company || '',
    nip: user?.nip || '',
    email: user?.email || '',
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  const handleLogout = () => {
    logout()
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    router.push('/login')
  }

  const handleSave = () => {
    // Aktualizacja danych w localStorage
    if (user) {
      const updatedUser = {
        ...user,
        company: formData.company,
        nip: formData.nip,
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500/30 border-t-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <button className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-300 hover:text-blue-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Ustawienia</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {saved && (
          <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-300">Zmiany zapisane pomyślnie</span>
          </div>
        )}

        {/* Profile Settings */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 p-6 shadow-lg mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Dane konta</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">Email (nie można zmienić)</label>
              <Input type="email" value={formData.email} disabled className="min-h-[44px] bg-slate-700/50 border-blue-500/30 text-blue-100" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">Nazwa firmy</label>
              <Input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="min-h-[44px] bg-slate-700/50 border-blue-500/30 text-white placeholder:text-blue-300/50 focus:border-blue-500/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">NIP</label>
              <Input
                type="text"
                value={formData.nip}
                onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                className="min-h-[44px] bg-slate-700/50 border-blue-500/30 text-white placeholder:text-blue-300/50 focus:border-blue-500/50"
              />
            </div>
          </div>

          <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/50 min-h-[44px]">
            Zapisz zmiany
          </Button>
        </Card>

        {/* Invoice Settings */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 p-6 shadow-lg mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Ustawienia faktur</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">Domyślny kod VAT (%)</label>
              <select defaultValue="23" className="w-full px-4 py-2 bg-slate-700/50 border border-blue-500/30 text-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]">
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="8">8%</option>
                <option value="23">23% (najczęstszy)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">Domyślny termin płatności (dni)</label>
              <Input type="number" min="1" defaultValue="14" className="min-h-[44px] bg-slate-700/50 border-blue-500/30 text-blue-100" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">Notatki na wszystkich fakturach</label>
              <textarea
                placeholder="np. Dziękujemy za zakup!"
                className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 text-blue-100 placeholder:text-blue-300/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              />
            </div>
          </div>

          <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/50 min-h-[44px]">
            Zapisz ustawienia
          </Button>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-rose-500/10 backdrop-blur-sm border-rose-500/30 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Wylogowanie</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-blue-200/70 mb-4">Wyloguj się ze swojego konta na tym urządzeniu</p>
              <Button
                onClick={handleLogout}
                className="bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-500/50 min-h-[44px]"
              >
                Wyloguj się
              </Button>
            </div>
            
            <div className="pt-4 border-t border-red-200">
              <h3 className="text-sm font-semibold text-red-900 mb-1">Usuń konto</h3>
              <p className="text-sm text-red-700 mb-3">Trwale usuń swoje konto i wszystkie dane</p>
              <Button
                variant="outline"
                className="bg-white text-red-600 border-red-200 hover:bg-red-50 min-h-[44px]"
              >
                Usuń konto
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
