## VAT Faktura - Monetization Guide

### Overview
VAT Faktura jest całkowicie darmowy dla użytkowników, a zarabiamy poprzez affiliate partnerships i sponsorships.

### Implementation

#### 1. **Partners Section** (Strona główna - `/app/page.tsx`)
- Sekcja "Poleceni Partnerzy" z 6 partnerami
- Każdy partner ma card z emoji, opisem i linkiem
- Linki otwierają się w nowym oknie z `target="_blank"` i `rel="noopener noreferrer"` dla SEO i bezpieczeństwa
- Hover effects z gradientami i animacjami

#### 2. **Enhanced Footer** (Strona główna - `/app/page.tsx`)
- 4 kolumny: O nas, Produkt, Polecane, Więcej
- Dyskretne linki do partnerów w sekcji "Polecane"
- Disclaimer: "Zarabiamy prowizje z linków partnerskich"
- Responsywny design (1 kolumna na mobile, 4 na desktop)

#### 3. **Support Banner** (Dashboard - `components/support-banner.tsx`)
- Dyskretny banner na górze dashboardu
- Zachęca do skorzystania z partnerów
- Linki do sekcji partnerów na stronie głównej
- Nie przeszkadza w pracy użytkownika

#### 4. **Pricing Page Info** (Strona pricing - `/app/pricing/page.tsx`)
- Transparentna informacja: "Jak portal się finansuje?"
- Wyjaśnia finansowanie poprzez affiliate linki
- Link do sekcji partnerów

### Partners Configuration
- `lib/partners.ts` - centralna konfiguracja wszystkich partnerów
- Każdy partner ma: name, description, icon, colors, link, category
- Funkcje helper'ów: `getPartnersByCategory()`, `getPartnerLink()`

### Earnings Breakdown
1. **Wise** - 1.5% provizje za transfery
2. **Stripe** - Zmienna provizja zależnie od planu
3. **Google Workspace** - 30% provizja za pierwsze 3 miesiące
4. **Comarch** - Negocjowalne provizje dla referencji
5. **Canva** - $5-10 za każdego nowego usera
6. **Namecheap** - Provizja za domeny i hosting

### Design Principles
- **Dyskretność** - linki są obok głównej funkcjonalności
- **Transparentność** - wyraźnie zasygnalizuj, że to affiliate
- **No Pop-ups** - nie ma agresywnych reklam
- **Mobile-friendly** - wszystko responsywne
- **Consistent Branding** - kolory i design pasują do reszty

### Future Improvements
- [ ] Analytics tracking dla affiliate linków
- [ ] A/B testing różnych placement'ów
- [ ] Seasonal promotions dla partnerów
- [ ] Reward system dla aktywnych użytkowników
- [ ] Blog posts z rekomendacjami partnerów

### Disclaimer/Legal
- Wszystkie linki powinny mieć disclosure: "Zarabiamy prowizje..."
- Comply z FTC guidelines dot. affiliate marketing
- Jasne oddzielenie organic content od affiliate links
