'use client'

import Link from 'next/link'
import { Calculator, TrendingUp } from 'lucide-react'

export default function PitDashboardWidget() {
  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/30 hover:border-purple-500/50 transition-all rounded-lg">
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

        {/* Description */}
        <p className="text-xs sm:text-sm text-purple-200/80">
          Kalkulator PIT, deklaracje PIT-37/PIT-36, zarządzanie kosztami UPZ i wysyłka do e-podatki - wszystko w jednym miejscu.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Link href="/dashboard/pit/calculator" className="flex-1">
            <button className="w-full text-xs sm:text-sm bg-purple-600 hover:bg-purple-700 text-white rounded px-3 py-2 font-medium flex items-center justify-center gap-1">
              <Calculator className="w-3 h-3 sm:w-4 sm:h-4" />
              Kalkulator
            </button>
          </Link>
          <Link href="/dashboard/pit" className="flex-1">
            <button className="w-full text-xs sm:text-sm border border-purple-500/30 hover:bg-purple-500/10 text-purple-300 rounded px-3 py-2 font-medium flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              Rozliczenia
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
