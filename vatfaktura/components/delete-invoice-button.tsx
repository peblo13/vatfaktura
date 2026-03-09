'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useInvoices } from '@/app/invoice-context'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface DeleteInvoiceButtonProps {
  invoiceId: string
  invoiceNumber: string
}

export default function DeleteInvoiceButton({ invoiceId, invoiceNumber }: DeleteInvoiceButtonProps) {
  const router = useRouter()
  const { deleteInvoice } = useInvoices()
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    deleteInvoice(invoiceId)
    router.push('/dashboard')
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 flex items-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 rounded-lg text-rose-300 hover:text-rose-200 transition-all border border-rose-500/30 hover:border-rose-500/50 text-sm font-medium min-h-[36px]"
      >
        <Trash2 className="w-4 h-4" />
        Usuń
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800/90 backdrop-blur-xl rounded-lg p-6 max-w-sm mx-4 shadow-2xl border border-blue-500/20">
            <h2 className="text-lg font-semibold text-white mb-2">Usunąć fakturę?</h2>
            <p className="text-blue-200/70 mb-6">
              Czy na pewno chcesz usunąć fakturę <span className="font-semibold">{invoiceNumber}</span>? Tej czynności nie można cofnąć.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/10 transition-colors min-h-[44px] font-medium"
              >
                Anuluj
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors min-h-[44px] font-medium shadow-lg shadow-rose-500/50"
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
