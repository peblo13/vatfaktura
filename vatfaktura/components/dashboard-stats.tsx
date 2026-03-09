'use client'

import { Card } from '@/components/ui/card'
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="group relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300`}></div>
          <Card className="relative p-6 bg-slate-800/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/50 transition-all shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200/70 text-sm font-medium">{stat.label}</p>
                <p className="text-4xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
