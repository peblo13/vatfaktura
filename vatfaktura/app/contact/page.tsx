import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Kontakt - VAT Faktura | Paweł Śliwiński',
  description: 'Skontaktuj się z Pawłem Śliwińskim - twórcą VAT Faktura. Pytania? Jesteśmy tutaj aby Ci pomóc.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Skontaktuj się z Pawłem</h1>
        <p className="text-blue-200/70 text-center text-lg mb-12">Jestem Paweł Śliwiński, twórca VAT Faktura. Masz pytania? Chętnie Ci pomogę.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Email</h2>
            </div>
            
            <p className="text-blue-200/70 mb-6">Wyślij nam email i odpowiemy Ci w ciągu 24 godzin.</p>
            
            <a href="mailto:fredbogus504@gmail.com">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                Wyślij Email
              </Button>
            </a>
            
            <p className="text-blue-300 mt-4 font-semibold">fredbogus504@gmail.com</p>
          </div>

          {/* Response Time */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Czas Odpowiedzi</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-blue-300 font-semibold mb-2">Email</h3>
                <p className="text-blue-200/70">Zwykle odpowiadamy w ciągu 24 godzin roboczych</p>
              </div>
              
              <div>
                <h3 className="text-blue-300 font-semibold mb-2">Availability</h3>
                <p className="text-blue-200/70">Poniedziałek - Piątek, 9:00 - 18:00 CET</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Często Zadawane Pytania</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-blue-300 font-semibold mb-2">Czy VAT Faktura to darmowe?</h3>
              <p className="text-blue-200/70">Tak, 100% darmowe na zawsze. Żadnych opłat, żadnych limitów.</p>
            </div>
            
            <div>
              <h3 className="text-blue-300 font-semibold mb-2">Czy mogę wystawiać nieograniczone faktury?</h3>
              <p className="text-blue-200/70">Tak, możesz wystawiać nieograniczoną ilość faktur bez żadnych limitów.</p>
            </div>
            
            <div>
              <h3 className="text-blue-300 font-semibold mb-2">Czy moje dane są bezpieczne?</h3>
              <p className="text-blue-200/70">Tak, wszystkie dane są przechowywane lokalnie w Twojej przeglądarce. Twoje faktury nigdy nie trafiają na serwery zewnętrzne.</p>
            </div>
            
            <div>
              <h3 className="text-blue-300 font-semibold mb-2">Czy VAT Faktura wspiera KSEF?</h3>
              <p className="text-blue-200/70">Tak, pełna integracja z Krajowym Systemem e-Faktur.</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="outline" className="border-blue-500/50 hover:bg-blue-500/20 text-blue-300">
              Strona główna
            </Button>
          </Link>
          <Link href="/faq">
            <Button variant="outline" className="border-blue-500/50 hover:bg-blue-500/20 text-blue-300">
              Pełne FAQ
            </Button>
          </Link>
          <Link href="/privacy">
            <Button variant="outline" className="border-blue-500/50 hover:bg-blue-500/20 text-blue-300">
              Polityka Prywatności
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
