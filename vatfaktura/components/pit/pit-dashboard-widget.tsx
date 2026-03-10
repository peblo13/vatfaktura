'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calculator, TrendingUp, FileCheck, AlertCircle } from 'lucide-react'
import { usePit } from '@/app/pit-context'

export default function PitDashboardWidget() {
  const { declarations, getTotalTaxLiability } = usePit()

  const totalLiability = getTotalTaxLiability()
  const declarationsCount = Object.keys(declarations).length
  
  // Get latest declaration status - handle both array and object declarations
  const declarationsArray = Array.isArray(declarations) ? declarations : Object.values(declarations)
  const latestDeclaration = declarationsArray.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0]

  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30 hover:border-purple-500/50 transition-all">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white">Rozliczenia PIT</h3>
              <p className="text-xs sm:text-sm text-purple-300/70">Zarządzaj swoimi podatkami</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-700/30 rounded-lg p-3">
            <p className="text-xs text-purple-300/70 mb-1">Deklaracje</p>
            <p className="text-lg sm:text-xl font-bold text-white">{declarationsCount}</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3">
            <p className="text-xs text-purple-300/70 mb-1">Zobowiązanie</p>
            <p className="text-lg sm:text-xl font-bold text-white">{totalLiability.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}</p>
          </div>
        </div>

        {/* Latest Status */}
        {latestDeclaration && (
          <div className="bg-slate-700/30 rounded-lg p-3 flex items-center gap-3">
            <div className={`p-1.5 rounded-full ${
              latestDeclaration.status === 'submitted' ? 'bg-green-500/20' : 'bg-yellow-500/20'
            }`}>
              {latestDeclaration.status === 'submitted' ? (
                <FileCheck className="w-4 h-4 text-green-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-purple-300/70">Ostatnia deklaracja</p>
              <p className="text-xs sm:text-sm font-semibold text-white truncate">
                {latestDeclaration.declarationType} - {latestDeclaration.year} ({latestDeclaration.status === 'submitted' ? 'Wysłana' : 'Oczekująca'})
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Link href="/dashboard/pit/calculator" className="flex-1">
            <Button className="w-full text-xs sm:text-sm bg-purple-600 hover:bg-purple-700 text-white">
              <Calculator className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Kalkulator
            </Button>
          </Link>
          <Link href="/dashboard/pit" className="flex-1">
            <Button variant="outline" className="w-full text-xs sm:text-sm border-purple-500/30 hover:bg-purple-500/10 text-purple-300">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Szczegóły
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
