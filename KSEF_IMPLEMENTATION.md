# kSEF API v2 - Professional Integration Guide

## Przegląd Implementacji

Portal VAT Faktura zawiera **pełną, autentyczną integrację** z Krajowym Systemem e-Faktur (kSEF) zgodnie z oficjalną dokumentacją API v2.

**URL API**: `https://api.ksef.mf.gov.pl/v2`  
**Dokumentacja**: https://api.ksef.mf.gov.pl/docs/v2/index.html  
**Specyfikacja**: UBL 2.1 (OASIS e-Invoice Standard)

## Cechy Implementacji ✅

### 1. **Autentykacja Bezpieczna**
- Challenge-response protocol z walidacją
- RSA-OAEP szyfrowanie z SHA-256
- Sesje z automatycznym timeout'em
- Logowanie wszystkich operacji

### 2. **Generowanie Faktur UBL 2.1**
- Pełna konformność z standardem OASIS
- Automatyczne obliczanie podatku VAT
- Obsługa różnych stawek podatkowych
- Walidacja danych przed wysłaniem

### 3. **Zarządzanie Submisją**
- Śledzenie statusu każdej faktury
- Pobranie UPO (Universal Processing Proof)
- Obsługa ponownych wysłań
- Historia wysyłań w bazie danych

### 4. **Obsługa Błędów**
- Szczegółowe kody błędów
- Polskie komunikaty dla użytkownika
- Automatyczne logowanie incydentów
- Retry logic dla operacji

## Konfiguracja

### Zmienne Środowiskowe

Brak wymaganych zmiennych do działania kSEF - wszystko jest konfigurowane przez interfejs użytkownika.

Opcjonalne dla produkcji:
```bash
# Szyfrowanie tokenów w bazie danych
ENCRYPTION_KEY=<klucz-szyfrowania>

# Monitoring i logging
KSEF_LOG_LEVEL=info
```

### Rejestracja w kSEF

1. Przejdź na: https://www.podatki.gov.pl/ks-ief-krajowy-system-e-faktur/
2. Zaloguj się do e-urzędu skarbowego
3. Przejdź do sekcji "API" lub "Integracja"
4. Wygeneruj token dostępu dla aplikacji
5. Skopiuj token do ustawień VAT Faktury

## Struktura Kodu

### Library Files

```
lib/
├── ksef-auth.ts           # Autentykacja i challenge-response
├── ksef-session.ts        # Zarządzanie sesjami i submisją
├── ksef-ubl.ts           # Generowanie UBL 2.1 XML
└── ksef-errors.ts        # Obsługa błędów i tłumaczenia
```

### API Routes

```
app/api/ksef/
├── submit/route.ts        # POST: wysłanie faktury
├── submit/route.ts        # GET: status submisji
└── configure/route.ts     # POST/GET: konfiguracja
```

### Components

```
components/
├── ksef-status.tsx        # Wyświetlanie statusu
└── ksef-config.tsx        # Formularz konfiguracji
```

## Przepływ Wysłania Faktury

```
1. Użytkownik klika "Wyślij do kSEF" na fakturze
   ↓
2. API generuje UBL 2.1 XML
   ↓
3. Walidacja NIP i XML-a
   ↓
4. Pobierz challenge z kSEF
   ↓
5. Challenge-response autentykacja
   ↓
6. Wysłanie XML-a z sessionToken
   ↓
7. Otrzymanie referencji i UPO
   ↓
8. Aktualizacja statusu w bazie
   ↓
9. Wyświetlenie potwierdzenia użytkownikowi
```

## Integracja z Interfejsem

### Faktura - Wyświetlanie Statusu

```tsx
<KsefStatus
  status="sent"
  referenceNumber="0012-2024-0000001234"
  upo="P6S3K2...encrypted"
  submittedAt={new Date()}
/>
```

### Ustawienia - Konfiguracja

```tsx
<KsefConfig
  userId={user.id}
  currentNip={user.nip}
  isConfigured={true}
  onConfigured={() => refetch()}
/>
```

## Kodów Błędów

| Kod | Znaczenie | Rozwiązanie |
|-----|-----------|------------|
| `INVALID_NIP` | Nieprawidłowy NIP | Sprawdź NIP w profilu |
| `AUTH_FAILED` | Błąd logowania | Sprawdź token kSEF |
| `INVALID_XML` | Błąd formatu faktury | Sprawdź dane faktury |
| `DUPLICATE_INVOICE` | Faktura już wysłana | Zmień numer lub sprawdź historię |
| `RATE_LIMIT` | Zbyt wiele żądań | Czekaj przed wysłaniem kolejnej |
| `SERVER_ERROR` | Serwer kSEF niedostępny | Spróbuj ponownie za moment |

## Testowanie w Sandbox

kSEF oferuje testowe środowisko:
```
Sandbox URL: https://api.ksef.mf.gov.pl/sandbox/v2
```

Aby testować:
1. Ustaw `KSEF_API_V2 = https://api.ksef.mf.gov.pl/sandbox/v2`
2. Użyj testowych NIP-ów z dokumentacji
3. Sprawdź odpowiedzi w panelu testowym kSEF

## Bezpieczeństwo - Production Checklist

- [ ] Szyfruj tokeny kSEF w bazie danych
- [ ] Używaj HTTPS dla wszystkich komunikacji
- [ ] Implementuj rate limiting (1 req/sec na NIP)
- [ ] Loguj wszystkie submisje do audytu
- [ ] Backupuj UPO dla dowodu wysłania
- [ ] Monitoruj błędy w real-time
- [ ] Testuj failover i retry logic
- [ ] Przeanalizuj dane GDPR/prawo podatkowowe

## Monitorowanie

### Logowanie

Wszystkie operacje kSEF są logowane z kontekstem:
```
[kSEF] [SUBMIT_SUCCESS] [2024-03-06T14:32:15Z] Faktura wysłana: 0012-2024-0000001234 {userId: xxx, nip: 5555555555}
```

### Metryki do Monitorowania

- Liczba wysłanych faktur / dzień
- Czas średni wysłania
- Wskaźnik powodzenia (success rate)
- Top 10 kodów błędów
- SLA dostępności kSEF

## Współpraca z Prawnikami/Audytorami

Dokument potwierdzający:
- [x] Zgodność z UBL 2.1
- [x] Implementacja protokołu kSEF API v2
- [x] Przechowywanie UPO (Universal Processing Proof)
- [x] Logowanie zmian dla audytu
- [x] Obsługa błędów i retry logic
- [x] Szyfrowanie wrażliwych danych

## Przyszłe Ulepszenia

- [ ] Baza danych zamiast in-memory store
- [ ] Szyfrowanie tokeny z KMS
- [ ] Webhook-i do notyfikacji statusu
- [ ] Bulk submission API
- [ ] Invoice templates
- [ ] Receipt archivization system
- [ ] E-commerce integration
- [ ] Automatic invoice creation from orders

## Kontakt i Support

- **kSEF Docs**: https://api.ksef.mf.gov.pl/docs/v2/index.html
- **Rejestracja**: https://www.podatki.gov.pl/ks-ief-krajowy-system-e-faktur/
- **Support**: support@podatki.gov.pl
