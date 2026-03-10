import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Polityka Prywatności - VAT Faktura',
  description: 'Polityka prywatności i ochrony danych osobowych VAT Faktura.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Polityka Prywatności</h1>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 space-y-8 text-blue-100">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Wprowadzenie</h2>
            <p>VAT Faktura ("my", "nas", "nasze") prowadzi stronę internetową vatfaktura.pl. Niniejsza strona zawiera naszą Politykę Prywatności, która wyjaśnia, w jaki sposób zbieramy, wykorzystujemy, ujawniamy i chronimy Twoje informacje.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Zbieranie Informacji</h2>
            <p>Zbieramy informacje, które sam nam podajesz, takie jak:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Email</li>
              <li>Nazwa firmy</li>
              <li>NIP (numer identyfikacji podatkowej)</li>
              <li>Dane z faktur którą wystawiasz</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Wykorzystanie Informacji</h2>
            <p>Wykorzystujemy zebrane informacje do:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Świadczenia usług fakturowania</li>
              <li>Komunikacji z Tobą</li>
              <li>Poprawy naszych usług</li>
              <li>Zgodności z wymogami prawnymi</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Przechowywanie Danych</h2>
            <p>Wszystkie dane są przechowywane lokalnie w przeglądarce (localStorage). Twoje faktury nigdy nie trafiają na serwery zewnętrzne. Dane są szyfrowane i bezpieczne.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Bezpieczeństwo</h2>
            <p>Dbamy o bezpieczeństwo Twoich danych. Strona korzysta z HTTPS i implementuje najnowsze standardy bezpieczeństwa.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Prawa Użytkownika</h2>
            <p>Masz prawo dostępu do swoich danych osobowych. Możesz poprosić o usunięcie swoich danych kontaktując nas na adres poniżej.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Kontakt</h2>
            <p>Jeśli masz pytania dotyczące tej Polityki Prywatności, skontaktuj się z nami:</p>
            <p className="text-blue-300">Email: <a href="mailto:fredbogus504@gmail.com" className="hover:text-cyan-300 underline">fredbogus504@gmail.com</a></p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Zmiany Polityki</h2>
            <p>Zastrzegamy sobie prawo do zmiany tej Polityki Prywatności. Zmiany będą opublikowane na tej stronie.</p>
          </section>

          <div className="pt-8 border-t border-blue-500/20">
            <p className="text-sm text-blue-200/60">Ostatnia aktualizacja: 2026-03-10</p>
          </div>
        </div>

        <Link href="/">
          <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
            Wróć na stronę główną
          </button>
        </Link>
      </div>
    </div>
  )
}
