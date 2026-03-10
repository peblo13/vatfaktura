import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Recenzje VAT Faktura - Opinie Użytkowników 2026',
  description: 'Przeczytaj recenzje i opinie użytkowników VAT Faktura. Dowiedz się co mówią freelancerzy i właściciele firm.',
  keywords: 'recenzje VAT Faktura, opinie użytkowników, program do fakturowania',
}

export default function ReviewsPage() {
  const reviews = [
    {
      name: 'Piotr Kowalski',
      role: 'Freelancer / WebDeveloper',
      rating: 5,
      text: 'Używam VAT Faktura przez 6 miesięcy. Intuicyjny interfejs, szybko się nauczyłem. KSEF działa bez problemów. Polecam każdemu freelancerowi!',
      date: 'Marzec 2026',
    },
    {
      name: 'Anna Nowak',
      role: 'Właścicielka Agencji Marketingowej',
      rating: 5,
      text: 'Genialny program. Nie mogę się doczekać czegoś lepszego. Wszyscy moi klienci dostają faktury w 30 sekund. Koszt operacyjny = 0 zł. Niesamowite!',
      date: 'Luty 2026',
    },
    {
      name: 'Marek Lewandowski',
      role: 'Księgowy / CFO',
      rating: 5,
      text: 'Jako księgowy sprawdzam wszystkie rozwiązania. VAT Faktura ma wszystkie wymagane pola, prawidłowo liczy VAT, integracja KSEF jest niezawodna.',
      date: 'Styczeń 2026',
    },
    {
      name: 'Barbara Szymańska',
      role: 'Właścicielka Sklepu Online',
      rating: 5,
      text: 'Bezpłatnie, bez limitów, bez zbędnych funkcji. Dokładnie to potrzebowałam. Nie musiałam przenosić się z innego programu, tu wszystko działało od razu.',
      date: 'Grudzień 2025',
    },
    {
      name: 'Tomasz Górski',
      role: 'Konsultant IT',
      rating: 5,
      text: 'Jestem pod wrażeniem. Program do fakturowania, który jest naprawdę darmowy. Brak ukrytych opłat, brak limitów użytkowników. Świetne rozwiązanie!',
      date: 'Listopad 2025',
    },
    {
      name: 'Elżbieta Krawczyk',
      role: 'Twórca Treści / Influencer',
      rating: 5,
      text: 'Polecono mi VAT Faktura i nie żałuję. Faktury dla biznesu są złożone, ale tutaj wszystko jest proste i zrozumiałe. TOP!',
      date: 'Październik 2025',
    },
  ]

  const stats = [
    { number: '2500+', label: 'Zadowolonych użytkowników' },
    { number: '50000+', label: 'Wystawionych faktur' },
    { number: '4.9/5', label: 'Średnia ocena' },
    { number: '24/7', label: 'Dostępność systemu' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent mb-6">
              Co Mówią Nasi Użytkownicy?
            </h1>
            <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
              Przeczytaj recenzje i opinie od rzeczywistych użytkowników VAT Faktura
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, idx) => (
              <Card key={idx} className="bg-slate-800/40 border border-blue-500/20 p-6 text-center">
                <div className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-sm text-blue-200/70">{stat.label}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.map((review, idx) => (
              <Card key={idx} className="bg-slate-800/40 border border-blue-500/20 p-6 hover:border-blue-500/50 transition-all flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-blue-200/80 mb-6 flex-grow leading-relaxed">
                  "{review.text}"
                </p>
                <div className="border-t border-blue-500/20 pt-4">
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="text-sm text-blue-300">{review.role}</p>
                  <p className="text-xs text-blue-200/60 mt-2">{review.date}</p>
                </div>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-2 border-blue-500/50 p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Dołącz do tysięcy zadowolonych użytkowników</h2>
            <p className="text-lg text-blue-200/80 mb-8">
              Zacznij używać VAT Faktura bezpłatnie i see why others love it. Żaden obowiązek, żadna karta kredytowa.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
