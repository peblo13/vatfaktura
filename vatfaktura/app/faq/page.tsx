import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ - VAT Faktura | 20 Odpowiedzi na Pytania o Fakturach, KSEF, Programie',
  description: 'Kompletne FAQ VAT Faktura. 20 najczęściej zadawanych pytań dotyczących bezpłatnego programu do fakturowania, KSEF, bezpieczeństwa danych i integracji.',
  keywords: 'FAQ fakturowanie, pytania i odpowiedzi, KSEF, VAT Faktura, e-faktury, bezpieczeństwo',
}

export default function FAQPage() {
  const faqs = [
    {
      question: 'Czy VAT Faktura jest naprawdę 100% bezpłatna?',
      answer: 'Tak, VAT Faktura jest w pełni bezpłatna. Nie trzeba podawać karty kredytowej, nie ma ukrytych opłat, a wszystkie funkcje są dostępne dla wszystkich użytkowników.'
    },
    {
      question: 'Czy mogę eksportować faktury do PDF?',
      answer: 'Tak, każdą fakturę możesz wysportować do pliku PDF i wydrukować. Faktury można również wysyłać jako e-faktury poprzez system KSEF.'
    },
    {
      question: 'Co to jest KSEF i czy VAT Faktura go wspiera?',
      answer: 'KSEF (Krajowy System e-Faktur) to obowiązkowy system do przesyłania faktur. VAT Faktura ma pełną integrację z KSEF, dzięki czemu możesz wysyłać faktury bezpośrednio z aplikacji.'
    },
    {
      question: 'Czy moje dane są bezpieczne?',
      answer: 'Tak, VAT Faktura przechowuje dane bezpośrednio w twojej przeglądarce. Twoje faktury i dane nigdy nie trafiają na serwery. Dodatkowo wszystkie dane są szyfrowane.'
    },
    {
      question: 'Czy mogę używać VAT Faktura na telefonie?',
      answer: 'Tak, aplikacja jest w pełni responsywna i działa na wszystkich urządzeniach - smartfonach, tabletach i komputerach.'
    },
    {
      question: 'Czy VAT Faktura wspiera wiele użytkowników/zespołów?',
      answer: 'Aktualnie każdy użytkownik ma swoje konto. Jeśli potrzebujesz zespołowego fakturowania, polecamy kontakt przez formularz kontaktowy.'
    },
    {
      question: 'Czy mogę importować dane z innego programu?',
      answer: 'Tak, VAT Faktura wspiera import danych z popularnych formatów. W sekcji ustawień znajdziesz opcje importu.'
    },
    {
      question: 'Czy faktury są archiwizowane?',
      answer: 'Tak, wszystkie faktury są automatycznie archiwizowane. Możesz do nich wracać i je edytować w każdej chwili.'
    },
    {
      question: 'Jakie są wymagania techniczne do używania aplikacji?',
      answer: 'VAT Faktura działa w każdej nowoczesnej przeglądarce (Chrome, Firefox, Safari, Edge). Nie trzeba instalować nic dodatkowego.'
    },
    {
      question: 'Czy VAT Faktura zmienia się w przyszłości?',
      answer: 'Tak, stale dodajemy nowe funkcje. Wszystkie aktualizacje są bezpłatne dla wszystkich użytkowników.'
    },
    {
      question: 'Czy wystawienie faktury w VAT Faktura jest legalne?',
      answer: 'Tak, VAT Faktura w pełni zgodna z ustawą o podatku VAT i wymogami KSEF. Faktury wystawiane są zgodnie z polskim prawem.'
    },
    {
      question: 'Czy mogę mieć nieograniczoną ilość kontrahentów?',
      answer: 'Tak, nie ma żadnych limitów na ilość kontrahentów. Możesz dodać każdy kontrahent, któremu wystawiasz faktury.'
    },
    {
      question: 'Czy VAT Faktura wspiera faktury korygujące?',
      answer: 'Tak, aplikacja w pełni wspiera faktury korygujące. Możesz łatwo korygować błędy na poprzednich fakturach.'
    },
    {
      question: 'Czy mogę eksportować wszystkie faktury na raz?',
      answer: 'Tak, możesz exportować wiele faktur jednocześnie w formacie CSV lub PDF. Funkcja masowego exportu znajduje się w ustawieniach.'
    },
    {
      question: 'Czy VAT Faktura ma kopie zapasowe moich danych?',
      answer: 'Tak, wszystkie dane są automatycznie szyfrowane i kopiowane. Twoje faktury są bezpieczne nawet jeśli stracisz dostęp do urządzenia.'
    },
    {
      question: 'Jak długo mogę przechowywać faktury w VAT Faktura?',
      answer: 'Bez ograniczeń. Możesz przechowywać faktury na zawsze. Po wystawieniu faktury nigdy nie zostaną usunięte.'
    },
    {
      question: 'Czy VAT Faktura wspiera faktury proforma?',
      answer: 'Tak, możesz wystawiać faktury proforma. Są to faktury informacyjne, które nie mają odpisu VAT.'
    },
    {
      question: 'Czy mogę importować faktury z poprzednich lat?',
      answer: 'Tak, możesz zaimportować faktury z poprzednich lat w formacie CSV. Przydatne przy przechodzeniu z innego programu.'
    },
    {
      question: 'Czy VAT Faktura wspiera faktury zaliczki?',
      answer: 'Tak, możesz wystawiać faktury zaliczki i faktury końcowe. System automatycznie śledzi zaliczki na kontach.'
    },
    {
      question: 'Jakie języki wspiera VAT Faktura?',
      answer: 'Aplikacja wspiera polski i angielski. Faktury mogą być wysyłane w dowolnym języku poprzez KSEF.'
    },
    {
      question: 'Czy VAT Faktura ma API dla integracji z innymi systemami?',
      answer: 'Tak, API jest dostępne dla zaawansowanych użytkowników. Skontaktuj się z nami aby otrzymać dokumentację API.'
    },
    {
      question: 'Czy mogę zmienić dane firmy w VAT Faktura?',
      answer: 'Tak, dane firmy można edytować w ustawieniach konta. Zmiany dotyczą wszystkich przyszłych faktur.'
    },
    {
      question: 'Czy VAT Faktura ma sms/email przypomnienia o terminie zapłaty?',
      answer: 'Funkcja powiadomień jest dostępna w ustawieniach. Możesz otrzymywać przypomnienia o zbliżających się terminach.'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
            FAQ - Najczęściej Zadawane Pytania
          </h1>
          <p className="text-lg text-blue-200/80 mb-8">
            Wszystkie odpowiedzi na pytania dotyczące VAT Faktura, KSEF, bezpieczeństwa i funkcji
          </p>
          <div className="inline-block px-4 py-2 bg-green-600/20 border border-green-500/50 rounded-full text-sm text-green-300 font-medium">
            {faqs.length} najczęściej zadawanych pytań
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 p-6 hover:border-blue-500/50 transition-all group">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4 cursor-pointer">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex-1">
                      {faq.question}
                    </h3>
                    <ChevronDown className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1 group-hover:rotate-180 transition-transform" />
                  </div>
                  <p className="text-blue-200/80 text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 sm:p-12 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 border border-blue-500/50 rounded-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Nie znalazłeś odpowiedzi?
            </h2>
            <p className="text-blue-200/80 mb-6">
              Skontaktuj się z nami lub zacznij korzystać z aplikacji i odkryj wszystkie możliwości
            </p>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 font-bold">
                Zaznij Za Darmo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
