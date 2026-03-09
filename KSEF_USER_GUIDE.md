# 🔐 Jak Skonfigurować kSEF w VAT Faktura

## Krok 1: Rejestracja w Portalu kSEF

1. Wejdź na oficjalną stronę: https://www.podatki.gov.pl/ks-ief-krajowy-system-e-faktur/
2. Zaloguj się swoim **PeSelM** (e-Podatki)
3. Jeśli nie masz konta, zarejestruj się na https://uslugi.podatki.gov.pl/

## Krok 2: Generowanie Token dostępu API

1. W portalu podatki.gov.pl przejdź do **"Ustawienia" → "Integracje" lub "API"**
2. Znajdź sekcję **"Wygeneruj token dostępu"**
3. Skopiuj wygenerowany token (będzie to długi ciąg znaków)
4. **Ważne**: Token działać będzie przez określony czas (zwykle 6 miesięcy)

## Krok 3: Konfiguracja w VAT Faktura

1. Zaloguj się do VAT Faktury
2. Przejdź do **"Ustawienia" → "Integracja z kSEF"**
3. Wklej token, który skopiowałeś z portalu
4. Kliknij **"Zapisz konfigurację"**

✅ Gotowe! Teraz możesz wysyłać faktury do kSEF.

## Krok 4: Wysyłanie Faktury do kSEF

1. Otwórz fakturę, którą chcesz wysłać
2. Kliknij przycisk **"Wyślij do kSEF"** (zielony przycisk)
3. Czekaj na potwierdzenie wysłania
4. Zobaczysz:
   - ✅ **Status**: "Wysłana do kSEF"
   - **Referencję**: Unikalny identyfikator faktury
   - **UPO**: Universal Processing Proof (dowód wysłania)

## Co to UPO?

**UPO** (Universal Processing Proof) to szyfrowany dowód, że faktura:
- Została prawidłowo wysłana do kSEF
- Jest podpisana i zweryfikowana
- Została zarejestrowana w systemie

Przechowuj UPO - to dowód wysłania faktury dla audytu!

## Możliwe Błędy

### ❌ "NIP jest nieprawidłowy"
- Sprawdź czy NIP w ustawieniach profilu jest poprawny
- NIP musi mieć dokładnie 10 cyfr

### ❌ "Błąd autoryzacji w kSEF"
- Token może być nieprawidłowy lub wygasły
- Wygeneruj nowy token na portalu podatki.gov.pl
- Wklej nowy token w ustawieniach VAT Faktury

### ❌ "Faktura o tym numerze już została wysłana"
- Każdy numer faktury można wysłać tylko raz
- Jeśli potrzebujesz wysłać ponownie, utwórz nową fakturę z innym numerem
- Możesz też wysłać korektę

### ❌ "Serwer kSEF jest niedostępny"
- To błąd tymczasowy - kSEF może być w konserwacji
- Spróbuj za kilka minut
- Historia wysłania zostanie zapisana i możesz spróbować ponownie

## Testowanie (Sandbox)

Aby testować bez wysyłania prawdziwych faktur:

1. Zaloguj się do https://uslugi-test.podatki.gov.pl (testowe środowisko)
2. Wygeneruj testowy token
3. W ustawieniach VAT Faktury włącz "Tryb testowy kSEF"
4. Testuj wysyłanie - faktury go nie dotrą do MF

## FAQ

**P: Czy wysyłanie do kSEF kosztuje?**  
O: Nie, wysyłanie faktur do kSEF jest całkowicie bezpłatne.

**P: Czy moja faktura musi mieć konkretny format?**  
O: VAT Faktura automatycznie konwertuje faktury do formatu UBL 2.1 wymaganego przez kSEF.

**P: Co jeśli wysłanie się nie powiedzie?**  
O: Będziesz mieć możliwość ponownego wysłania. Historia jest zapisywana.

**P: Czy mogę wysyłać faktury z przeszłości?**  
O: Tak, możesz wysłać fakturę z każdą datą, o ile nie będzie wcześniejsza niż limit ustawiony przez MF.

**P: Jak długo żyje token?**  
O: Zwykle 6 miesięcy. Jeśli token wygaśnie, wygeneruj nowy na portalu podatki.gov.pl.

## Wsparcie

Jeśli masz problemy:
1. Sprawdź wymagania na: https://api.ksef.mf.gov.pl/docs/v2/index.html
2. Skontaktuj się z supportem MF: https://www.podatki.gov.pl/kontakt/
3. Zgłoś błąd w VAT Faktura: support@vatfaktura.pl

---

**Ważne**: Faktura wysłana do kSEF jest oficjalnym dokumentem podatkowym. Przechowuj UPO dla dowodu!
