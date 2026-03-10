import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Warunki Użytkowania - VAT Faktura',
  description: 'Warunki użytkowania VAT Faktura. Przeczytaj zasady korzystania z naszej aplikacji.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Warunki Użytkowania</h1>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 space-y-8 text-blue-100">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Akceptacja Warunków</h2>
            <p>Korzystając z VAT Faktura, zgadzasz się z niniejszymi Warunkami Użytkowania. Jeśli nie zgadzasz się z którymś z warunków, nie korzystaj z aplikacji.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Licencja Użytkowania</h2>
            <p>Udzielamy Ci ograniczonej, niewyłącznej, niezbywalnej licencji do korzystania z VAT Faktura do celów osobistych i biznesowych zgodnie z niniejszymi warunkami.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Ograniczenia Użytkowania</h2>
            <p>Nie wolno Ci:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Naruszać praw własności intelektualnej</li>
              <li>Wysyłać wirusów lub złośliwego oprogramowania</li>
              <li>Harować lub crawlować naszą aplikację</li>
              <li>Używać aplikacji do niedozwolonych celów</li>
              <li>Wystawiać fałszywe faktury</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Odpowiedzialność Użytkownika</h2>
            <p>Jesteś odpowiedzialny za wszystkie faktury które wystawiasz przy użyciu VAT Faktura. Musisz zapewnić że faktury są legalne i zgodne z polskim prawem podatkowym.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. KSEF i Integracje</h2>
            <p>VAT Faktura integruje się z KSEF. Jesteś odpowiedzialny za konfigurację integracji i zgodność z wymogami KSEF.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Ograniczenie Odpowiedzialności</h2>
            <p>VAT Faktura jest świadczona "w stanie istniejącym". Nie gwarantujemy że aplikacja będzie bez błędów. Do maksymalnego zakresu dozwolonego prawem, nie ponosimy odpowiedzialności za straty wynikające z użytkowania aplikacji.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Rozwiązywanie Spraw</h2>
            <p>Wszelkie spory będą rozwiązywane zgodnie z prawem Polski i będą rozpatrywane przez właściwe sądy w Polsce.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Zmiany Warunków</h2>
            <p>Zastrzegamy sobie prawo do zmiany tych warunków. Kontynuowanie korzystania z aplikacji oznacza akceptację nowych warunków.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">9. Kontakt</h2>
            <p>W przypadku pytań dotyczących Warunków Użytkowania, skontaktuj się z nami:</p>
            <p className="text-blue-300">Email: <a href="mailto:fredbogus504@gmail.com" className="hover:text-cyan-300 underline">fredbogus504@gmail.com</a></p>
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
