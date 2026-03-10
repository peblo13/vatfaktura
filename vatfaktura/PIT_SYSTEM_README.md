# VAT Faktura - System Zarządzania Fakturami i PIT

Profesjonalna, bezpłatna aplikacja do zarządzania fakturami VAT i deklaracjami podatkowymi (PIT-37, PIT-36).

## 🎯 Główne Funkcje

### System Faktur VAT
- ✅ Tworzenie i zarządzanie fakturami VAT
- ✅ Automatyczne numerowanie
- ✅ Export do PDF i XML
- ✅ Integracja z kSEF
- ✅ Zarządzanie kontrahentami

### System PIT
- 🔧 **Kalkulator PIT** - Obliczaj podatek w czasie rzeczywistym
  - Wsparcie dla PIT-37 (przedsiębiorcy)
  - Wsparcie dla PIT-36 (osoby fizyczne)
  - Obliczanie z uwzględnieniem:
    - Dwóch progów podatkowych (12% i 32%)
    - Kwoty wolnej od podatku (3600 PLN)
    - Ulg prorodzinnych
    - Kosztów biznesowych (20% lub kwota rzeczywista)
    - Zysków kapitałowych (19%)
    - Dochodów z wynajmu
    - Składek ZUS i ubezpieczenia zdrowotnego

- 📋 **Deklaracje PIT-37** - Dla przedsiębiorców
  - Zarządzanie źródłami dochodów
  - Zarządzanie kosztami biznesowymi
  - Deprecjacja majątku
  - Export do e-podatki

- 📋 **Deklaracje PIT-36** - Dla osób fizycznych
  - Wieloźródłowe dochody
  - Ulgi podatkowe
  - Odliczenia
  - Export do e-podatki

- 📊 **Raporty JPK-V7**
  - Zintegrowane raporty VAT + PIT
  - Export do XML
  - Wysyłanie do e-podatki

## 🏗️ Architektura Projektu

```
vatfaktura/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── dashboard/
│   │   ├── page.tsx               # Main dashboard
│   │   └── pit/
│   │       ├── page.tsx           # PIT dashboard
│   │       ├── calculator/        # Kalkulator PIT
│   │       ├── pit-37/            # Deklaracje PIT-37
│   │       ├── pit-36/            # Deklaracje PIT-36
│   │       └── jpk-v7/            # Raporty JPK-V7
│   └── invoice-context.tsx        # Context dla faktur
│
├── lib/
│   ├── types/
│   │   └── pit-types.ts          # TypeScript types dla PIT
│   └── pit/
│       ├── pit-store.ts          # localStorage management
│       ├── pit-calculator.ts     # Logika obliczeń PIT
│       ├── tax-rates.ts          # Stawki podatkowe 2024
│       ├── pit-37-generator.ts   # Generator PIT-37
│       ├── pit-36-generator.ts   # Generator PIT-36
│       └── jpk-v7-generator.ts   # Generator JPK-V7 XML
│
└── components/                    # React components
```

## 🚀 Technologia

- **Frontend**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Storage**: localStorage (lub baza danych w przyszłości)
- **Icons**: Lucide Icons
- **Language**: TypeScript

## 📦 Instalacja

```bash
# Clone repository
git clone <repo-url>
cd vatfaktura

# Zainstaluj dependencies
npm install
# lub
pnpm install

# Uruchom dev server
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## 🔐 Autentykacja

System wykorzystuje istniejący hook `useUser()` do zarządzania autentykacją:
- Logowanie: `/login`
- Rejestracja: `/register`
- Dashboard: `/dashboard`

## 💾 Przechowywanie Danych

Aktualnie dane są przechowywane w `localStorage` przeglądarki. W przyszłości planowana jest migracja na:
- Supabase
- Neon PostgreSQL
- Amazon Aurora

## 📊 Stawki Podatkowe (2024)

- **Próg 1**: 12% na dochody do 123,000 PLN
- **Próg 2**: 32% na dochody powyżej 123,000 PLN
- **Kwota wolna**: 3,600 PLN
- **Ulgę prorodzinna**: 1,188 PLN/dziecko
- **Podatek od zysków kapitałowych**: 19%

## 🛣️ Roadmap

### Faza 1 - Fundament (Ukończono)
- ✅ Struktura TypeScript typów
- ✅ localStorage management
- ✅ Stawki podatkowe
- ✅ Kalkulator PIT
- ✅ Dashboard PIT

### Faza 2 - Deklaracje (W trakcie)
- 🔧 Formularze PIT-37
- 🔧 Formularze PIT-36
- ⏳ Zarządzanie kosztami
- ⏳ Export do e-podatki

### Faza 3 - Raporty (Planowane)
- ⏳ Generator JPK-V7
- ⏳ Wysyłanie do e-podatki
- ⏳ Śledzenie statusu

### Faza 4 - Optymalizacje (Planowane)
- ⏳ Baza danych
- ⏳ Offline mode
- ⏳ Aplikacja mobilna
- ⏳ Dark mode

## 📝 Licencja

MIT

## 🤝 Wsparcie

Masz pytania? Skontaktuj się z zespołem na support@vatfaktura.pl
