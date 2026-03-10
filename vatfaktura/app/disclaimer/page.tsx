import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer - VAT Faktura | Warunki Affiliate i Odpowiedzialności',
  description: 'Disclaimer VAT Faktura - informacje o linkach partnerskich, braku gwarancji i odpowiedzialności za treść.',
}

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-12">
          Disclaimer
        </h1>

        <div className="prose prose-invert max-w-none space-y-8">
          {/* Affiliate Links */}
          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Linki Partnerskie (Affiliate)</h2>
            <p className="text-blue-200/80 leading-relaxed">
              VAT Faktura zawiera linki partnerskie do produktów i usług takich jak Wise, Stripe, PayPal, Google Workspace i innych. Jeśli klikniesz na te linki i dokończysz rejestrację, możemy otrzymać prowizję bez dodatkowych kosztów dla Ciebie.
            </p>
            <p className="text-blue-200/80 leading-relaxed mt-3">
              Zawsze ujawniamy linki partnerskie, a nasze rekomendacje są oparte na rzeczywistej wartości dla użytkownika. Nigdy nie polecamy produktów które nie byśmy sami nie używali.
            </p>
          </section>

          {/* No Warranty */}
          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Brak Gwarancji</h2>
            <p className="text-blue-200/80 leading-relaxed">
              VAT Faktura jest dostarczany w stanie jakości &quot;jak jest&quot; bez żadnych gwarancji. Nie gwarantujemy że aplikacja będzie:
            </p>
            <ul className="list-disc list-inside text-blue-200/80 space-y-2 mt-3">
              <li>Wolna od błędów i problemów technicznych</li>
              <li>Zawsze dostępna i bez przeszkód</li>
              <li>Odpowiednia do Twoich konkretnych celów biznesowych</li>
              <li>Zgodna ze wszystkimi przepisami w Twojej jurysdykcji</li>
            </ul>
          </section>

          {/* No Liability */}
          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Brak Odpowiedzialności</h2>
            <p className="text-blue-200/80 leading-relaxed">
              VAT Faktura nie ponosi odpowiedzialności za:
            </p>
            <ul className="list-disc list-inside text-blue-200/80 space-y-2 mt-3">
              <li>Uratę danych spowodowaną usunięciem localStorage w przeglądarce</li>
              <li>Błędy w obliczeniach VAT lub podatków</li>
              <li>Niezgodność faktur z przepisami prawnymi</li>
              <li>Straty finansowe wynikające z używania aplikacji</li>
              <li>Przerwy w działaniu serwisu lub niemożliwość dostępu</li>
            </ul>
          </section>

          {/* Tax Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Zgodność Podatkowa</h2>
            <p className="text-blue-200/80 leading-relaxed">
              Chociaż VAT Faktura pomaga w tworzeniu faktur, to Ty jesteś odpowiedzialny za:
            </p>
            <ul className="list-disc list-inside text-blue-200/80 space-y-2 mt-3">
              <li>Sprawdzenie poprawności wszystkich danych na fakturach</li>
              <li>Zapewnienie zgodności faktur z przepisami podatkowymi</li>
              <li>Prawidłowe wypełnienie numeracji i danych VAT</li>
              <li>Archiwizowanie faktur zgodnie z wymogami prawa</li>
            </ul>
            <p className="text-blue-200/80 leading-relaxed mt-3">
              W razie wątpliwości skonsultuj się z księgowym lub doradcą podatkowym.
            </p>
          </section>

          {/* Data Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Prywatność Danych</h2>
            <p className="text-blue-200/80 leading-relaxed">
              Wszystkie Twoje faktury i dane są przechowywane lokalnie w Twojej przeglądarce (localStorage). My nie mamy dostępu do Twoich danych. Jednak:
            </p>
            <ul className="list-disc list-inside text-blue-200/80 space-y-2 mt-3">
              <li>Jeśli oczyścisz cache przeglądarki - dane mogą zostać usunięte</li>
              <li>Nie robimy kopii zapasowych Twoich danych</li>
              <li>Jeśli zapomnisz hasła - nie będziemy w stanie go odzyskać</li>
            </ul>
          </section>

          {/* Third Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Linki Stron Trzecich</h2>
            <p className="text-blue-200/80 leading-relaxed">
              VAT Faktura zawiera linki do stron trzecich (Wise, Stripe, PayPal, itp.). Nie jesteśmy odpowiedzialni za zawartość tych stron ani za ich politykę prywatności. Zalecaną praktyka jest przeczytanie disclaimer i polityki prywatności każdej stron przed wstawieniem swoich danych.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Zmiany w Disclaimer</h2>
            <p className="text-blue-200/80 leading-relaxed">
              Możemy zmienić ten disclaimer w dowolnym momencie bez powiadomienia. Regularne sprawdzanie tej strony zapewni że jesteś na bieżąco.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Pytania?</h2>
            <p className="text-blue-200/80 leading-relaxed">
              Jeśli masz pytania dotyczące tego disclaimer, skontaktuj się z nami na adres: <a href="mailto:fredbogus504@gmail.com" className="text-cyan-400 hover:text-cyan-300 underline">fredbogus504@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
