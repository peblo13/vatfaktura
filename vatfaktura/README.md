# VAT Faktura - Profesjonalna Platforma do Fakturowania Online

Nowoczesna aplikacja do łatwego i szybkiego tworzenia faktur online z integracją GUS (pobranie danych firmy po NIP) i przygotowaniem do kSEF (Krajowy System e-Faktur).

## Funkcjonalności

### Autentykacja
✅ **Rejestracja bez weryfikacji email** - Szybka rejestracja z API  
✅ **Logowanie z hasłem** - Bezpieczne logowanie  
✅ **Automatyczne pobranie danych firmy** - Po wpisaniu NIP dane są pobierane z GUS  
✅ **Bezpieczne przechowywanie** - Token w localStorage  

### Zarządzanie Fakturami
✅ **Tworzenie faktur** - Intuicyjny formularz  
✅ **Zarządzanie pozycjami** - Dynamiczne dodawanie/usuwanie  
✅ **Obliczanie VAT** - Automatyczne dla 0%, 5%, 8%, 23%  
✅ **Edytowanie** - Zmiana wysłanych faktur  
✅ **Usuwanie** - Z potwierdzeniem  
✅ **Historia** - Dostęp do wszystkich faktur  
✅ **Eksport PDF** - Drukowanie  

### Integracja GUS
✅ **Pobranie danych po NIP** - Zarówno wystawiającego jak i nabywcy  
✅ **Autofill w formularzach** - Automatyczne wypełnienie pól  
✅ **Dane firmy** - Nazwa, adres, REGON, miasto  
✅ **Fallback demo data** - Gdy API niedostępne  

### Przygotowanie do kSEF
✅ **API endpoint** - Wysyłanie faktur do kSEF  
✅ **Struktura danych** - Gotowa do UBL/XML  
✅ **Śledzenie statusu** - Odczyt statusu faktury  
✅ **Dokumentacja** - Pełna instrukcja integracji  

### Dashboard
✅ **Statystyki** - Liczba faktur, opłacone, oczekujące, zaległe  
✅ **Lista faktur** - Przejrzysty widok wszystkich faktur  
✅ **Szablony** - Gotowe szablony do użytku  
✅ **Ustawienia** - Konfiguracja konta

## Technologia

- **Frontend**: React 19, Next.js 16, TypeScript
- **Backend**: Next.js API Routes
- **Styling**: Tailwind CSS, Shadcn/UI components
- **Ikony**: Lucide React
- **State Management**: React Context API + localStorage
- **Integracje**: 
  - GUS REGON API (pobranie danych firmy po NIP)
  - kSEF API (wysyłanie faktur)
- **Autentykacja**: Token-based (localStorage)

## Instalacja i uruchomienie

### 1. Zainstaluj zależności
```bash
pnpm install
```

### 2. Uruchom serwer deweloperski
```bash
pnpm run dev
```

### 3. Otwórz aplikację
Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## Demo Login

Możesz się zarejestrować z dowolnym emailem lub użyć demo konta:

**Email**: `demo@test.com`  
**Hasło**: `demo123`

### Test GUS API
Podczas rejestracji lub tworzenia faktury użyj NIP:
**`1234567890`** - zwraca dane demo z GUS

## Struktura projektu

```
app/
├── page.tsx                      # Landing page
├── login/page.tsx               # Logowanie
├── register/page.tsx            # Rejestracja
├── auth-context.tsx             # Kontekst autentykacji (legacy)
├── invoice-context.tsx          # Kontekst faktur
├── api/
│   ├── auth/
│   │   ├── register/route.ts    # API rejestracji
│   │   └── login/route.ts       # API logowania
│   ├── gus/
│   │   └── search/route.ts      # GUS API - pobranie danych po NIP
│   └── ksef/
│       └── submit/route.ts      # kSEF API - wysyłanie faktur
└── dashboard/
    ├── page.tsx                  # Dashboard główny
    ├── create-invoice/page.tsx   # Tworzenie faktury
    ├── templates/page.tsx        # Szablony
    ├── settings/page.tsx         # Ustawienia
    └── invoices/
        └── [id]/
            ├── page.tsx          # Widok faktury
            └── edit/page.tsx     # Edytowanie

components/
├── dashboard-stats.tsx           # Statystyki
├── invoices-list.tsx            # Lista faktur
└── delete-invoice-button.tsx    # Usuwanie

lib/
├── auth.ts                       # Utilities autentykacji

hooks/
└── useUser.ts                    # Hook do zarządzania użytkownikiem
```

## Jak korzystać

### 1. Rejestracja
1. Kliknij "Zarejestruj się" na landing page
2. Wpisz email i hasło
3. Wpisz nazwę firmy
4. **Wpisz NIP** - dane firmy zostaną pobrane automatycznie z GUS
5. Zatwierdź rejestrację

Dane zostaną ponieważ pobrane z API GUS:
- Nazwa firmy
- Adres
- REGON
- Miasto i kod pocztowy

### 2. Logowanie
1. Przejdź na `/login`
2. Wpisz email i hasło
3. Zostaniesz przekierowany na dashboard

### 3. Tworzenie faktury
1. Z dashboardu kliknij "Nowa faktura"
2. Wpisz **NIP kupującego** - dane będą pobrane z GUS
3. Dodaj pozycje faktury:
   - Opis
   - Ilość
   - Cena netto
   - Stawka VAT (0%, 5%, 8%, 23%)
4. VAT będzie obliczony automatycznie
5. Kliknij "Utwórz fakturę"

### 4. Zarządzanie fakturami
- **Widok**: Kliknij na fakturę by ją wyświetlić
- **Edycja**: Kliknij ikonę ołówka
- **Usuwanie**: Kliknij ikonę kosza (z potwierdzeniem)
- **Druk**: Kliknij "Pobierz PDF"

### 5. Wysłanie do kSEF
1. Z listy lub widoku faktury kliknij "Wyślij do kSEF"
2. Faktura będzie przygotowana
3. Po wdrożeniu rzeczywistej integracji będzie wysłana do kSEF

### 6. Szablony
- Przejdź na "Szablony"
- Wybierz szablon do użytku
- Lub stwórz własny szablon

## Cechy specjalne

🎨 **Nowoczesny dark mode design** - Gradientuuu niebieski/cyjanowy, przezroczyste karty  
📱 **Mobile-first** - Responsywny design dla wszystkich urządzeń  
🔒 **Bezpieczne** - Token-based authentication  
⚡ **Szybkie** - API routes bez opóźnień  
🇵🇱 **100% Polska** - Język, VAT, formaty, GUS, kSEF  
🤖 **GUS Integration** - Automatyczne pobranie danych firmy po NIP  
💼 **kSEF Ready** - Przygotowanie do wysyłania do Krajowego Systemu e-Faktur  

## Integracje

### GUS REGON API
- ✅ Publiczne API bez klucza
- ✅ Automatyczne pobieranie danych po NIP
- ✅ Fallback na demo data
- ✅ Obsługa zarówno wystawiającego jak i nabywcy

### kSEF (Krajowy System e-Faktur)
- ✅ API endpoint do wysyłania
- ✅ Struktura danych UBL/XML-ready
- ✅ Dokumentacja implementacji
- 🔲 Pełna integracja (wymaga rejestracji w kSEF)

## Roadmap

- [x] Autentykacja bez weryfikacji email
- [x] GUS API integration
- [x] kSEF API placeholder
- [ ] Rzeczywista integracja z kSEF
- [ ] Baza danych (Supabase/PostgreSQL)
- [ ] Export do Excel
- [ ] Email notifications
- [ ] Sync z chmurą
- [ ] Mobilna aplikacja
- [ ] REST API dla integracji trzecich

## API Endpoints

### Autentykacja
- `POST /api/auth/register` - Rejestracja
- `POST /api/auth/login` - Logowanie

### GUS
- `GET /api/gus/search?nip=1234567890` - Pobranie danych firmy

### kSEF
- `POST /api/ksef/submit` - Wysłanie faktury
- `GET /api/ksef/submit?invoiceNumber=FV/2024/0001` - Status faktury

Pełna dokumentacja API w pliku [API.md](./API.md)

## Wdrażanie

### Lokalnie
```bash
pnpm install
pnpm run dev
# http://localhost:3000
```

### Vercel (Rekomendowane)
```bash
vercel deploy
```

### Docker
```bash
docker build -t vatfaktura .
docker run -p 3000:3000 vatfaktura
```

## Bezpieczeństwo

⚠️ **WAŻNE**: Obecna wersja korzysta z localStorage. Do produkcji:

1. ✅ Zamień localStorage na HTTP-only cookies
2. ✅ Wdróż bazę danych (Supabase, PostgreSQL)
3. ✅ Haszuj hasła (bcrypt)
4. ✅ Dodaj CSRF protection
5. ✅ Zarejestruj się w kSEF
6. ✅ Szyfruj dane wrażliwe

## Wsparcie

Dokumentacja: [API.md](./API.md)  
Issues: GitHub issues tracker

## Licencja

MIT License - Wolne do użytku komercyjnego

## Kontakt

Email: contact@vatfaktura.pl  
GitHub: https://github.com/your-repo

---

**VAT Faktura** - Profesjonalne fakturowanie dla polskich firm
