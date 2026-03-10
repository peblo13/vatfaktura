import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'
import { AdSenseDisplayAuto, AdSenseDisplay300x250 } from '@/components/adsense-banner'

export const metadata: Metadata = {
  title: 'FAQ - VAT Faktura | Pytania o Fakturach, KSEF, PIT, Rozliczeniach',
  description: 'Kompletne FAQ VAT Faktura. Odpowiedzi na pytania o fakturach VAT, KSEF, systemie rozliczeń PIT, e-podatki, bezpieczeństwie i integracji.',
  keywords: 'FAQ fakturowanie, pytania o PIT, KSEF, VAT Faktura, e-faktury, rozliczenia podatkowe',
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
      question: 'Czy mogę mam system do rozliczania PIT w VAT Faktura?',
      answer: 'Tak! VAT Faktura ma pełny system rozliczeń PIT. Możesz tworzyć deklaracje PIT-37 i PIT-36, zarządzać kosztami UPZ, generować raporty JPK-V7 i wysyłać deklaracje do e-podatki bezpośrednio z aplikacji.'
    },
    {
      question: 'Jak prawidłowo wypełnić deklarację PIT-37?',
      answer: 'PIT-37 musisz wypełnić ze wszystkimi przychody i kosztami. W VAT Faktura wystarczy wpisać przychody i koszty, a system automatycznie oblicza podatek. Zapoznaj się z artykułem "Jak Rozliczyć się z PIT-37" w naszym blogu.'
    },
    {
      question: 'Kiedy muszę wysłać PIT-37 lub PIT-36?',
      answer: 'PIT-37 (przedsiębiorcy): do 30 kwietnia elektronicznie lub 31 maja papierowo. PIT-36 (osoby fizyczne): do 30 kwietnia. Po terminie grozi kara 200 PLN za każdy miesiąc zwłoki.'
    },
    {
      question: 'Jakie koszty mogę odliczać w PIT?',
      answer: 'Możesz odliczać koszty bezpośrednio związane z zarobkowaniem: artykuły biurowe, czynsz, oprogramowanie, szkolenia, amortyzę majątku. Każdy koszt wymaga faktury VAT. VAT Faktura pomaga dokumentować wszystkie koszty.'
    },
    {
      question: 'Czy mogę wysłać PIT przez e-podatki z VAT Faktura?',
      answer: 'Tak, VAT Faktura automatycznie wysyła Twoją deklarację do e-podatki. Wystarczy kliknąć przycisk "Wyślij do e-podatki" a system obsługuje całą procedurę. Otrzymasz potwierdzenie wysyłki.'
    },
    {
      question: 'Co to jest JPK-V7 i czy muszę to wysyłać?',
      answer: 'JPK-V7 to zintegrowany raport VAT i PIT obowiązkowy od 2026. VAT Faktura automatycznie tworzy i wysyła JPK-V7. Zawiera wszystkie faktury VAT i dane dotyczące podatku dochodowego.'
    },
    {
      question: 'Czy mogę zmienić wysłaną deklarację PIT?',
      answer: 'Tak, możesz wysłać korektę deklaracji w dowolnym momencie. VAT Faktura obsługuje zmianę deklaracji - wysyłasz ją ponownie ze zmienionymi danymi, a system automatycznie zastępuje starą wersję.'
    },
    {
      question: 'Jak często muszę raportować do e-podatki?',
      answer: 'PIT-37/PIT-36 raz w roku (do końca kwietnia). JPK-V7 co miesiąc (do 25 dnia następnego miesiąca). VAT (dla płatników VAT) co miesiąc.'
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

          {/* AdSense Banner - After FAQ items */}
          <div className="my-12">
            <AdSenseDisplayAuto />
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
