'use client'

import { Invoice } from '@/app/invoice-context'
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface DashboardStatsProps {
  invoices: Invoice[]
}

export default function DashboardStats({ invoices }: DashboardStatsProps) {
  const total = invoices.length
  const paid = invoices.filter(i => i.status === 'paid').length
  const pending = invoices.filter(i => i.status === 'sent' || i.status === 'draft').length
  const overdue = invoices.filter(i => i.status === 'overdue').length

  const stats = [
    {
      label: 'Wszystkie faktury',
      value: total,
      icon: FileText,
      gradient: 'from-blue-500 to-cyan-500',
      color: 'text-cyan-400',
    },
    {
      label: 'Opłacone',
      value: paid,
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-500',
      color: 'text-emerald-400',
    },
    {
      label: 'Oczekujące',
      value: pending,
      icon: Clock,
      gradient: 'from-amber-500 to-orange-500',
      color: 'text-orange-400',
    },
    {
      label: 'Zaległe',
      value: overdue,
      icon: AlertCircle,
      gradient: 'from-red-500 to-rose-500',
      color: 'text-rose-400',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="group relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300`}></div>
          <div className="relative p-3 sm:p-4 md:p-6 bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/50 transition-all shadow-lg rounded-lg sm:rounded-xl">
            <div className="flex flex-col items-start gap-2 sm:gap-3">
              <p className="text-blue-200/70 text-xs sm:text-sm font-medium line-clamp-2">{stat.label}</p>
              <div className="flex items-end justify-between w-full">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                  <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
