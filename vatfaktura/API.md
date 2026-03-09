# VAT Faktura - API Documentation

## Authentication

### Register
**POST** `/api/auth/register`

```json
{
  "email": "user@example.com",
  "password": "password123",
  "company": "Firma Sp. z o.o.",
  "nip": "1234567890"
}
```

Response:
```json
{
  "message": "Rejestracja udana",
  "token": "base64_encoded_token",
  "userId": "uuid",
  "email": "user@example.com"
}
```

### Login
**POST** `/api/auth/login`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Logowanie udane",
  "token": "base64_encoded_token",
  "userId": "uuid",
  "email": "user@example.com",
  "company": "Firma Sp. z o.o.",
  "nip": "1234567890"
}
```

## GUS API Integration

### Search Company by NIP
**GET** `/api/gus/search?nip=1234567890`

Response:
```json
{
  "success": true,
  "company": {
    "name": "Przykładowa Firma Sp. z o.o.",
    "nip": "1234567890",
    "regon": "000000000000",
    "address": "ul. Demo 1, 00-000 Warszawa",
    "city": "Warszawa",
    "postalCode": "00-000",
    "street": "ul. Demo",
    "streetNumber": "1"
  }
}
```

**Features:**
- Automatic company data autofill during registration
- Uses GUS REGON public API
- Fallback to demo data if API unavailable

## kSEF Integration (Krajowy System e-Faktur)

### Submit Invoice to kSEF
**POST** `/api/ksef/submit`

```json
{
  "invoiceNumber": "FV/2024/0001",
  "invoiceData": {
    "issuer": { ... },
    "buyer": { ... },
    "items": [ ... ]
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Faktura gotowa do wysłania do kSEF",
  "invoiceNumber": "FV/2024/0001",
  "status": "ready_for_ksef"
}
```

### Check Invoice Status in kSEF
**GET** `/api/ksef/submit?invoiceNumber=FV/2024/0001`

Response:
```json
{
  "invoiceNumber": "FV/2024/0001",
  "status": "not_submitted",
  "message": "Funkcja kSEF w przygotowaniu"
}
```

## Real Implementation Notes

### For Production:

1. **Database Setup**
   - Replace in-memory user storage with Supabase, PostgreSQL, or MongoDB
   - Store hashed passwords using bcrypt
   - Implement proper session management

2. **Authentication**
   - Use HTTP-only cookies instead of localStorage
   - Implement JWT with proper expiration
   - Add refresh token mechanism

3. **GUS Integration**
   - Register for GUS REGON API access
   - Implement proper error handling
   - Cache company data

4. **kSEF Integration**
   - Register application in kSEF system
   - Implement OAuth2 authentication
   - Convert invoices to UBL/XML format
   - Handle kSEF response and status tracking

### Environment Variables

```env
NEXT_PUBLIC_SECRET=your_secret_key
GUS_API_KEY=optional_api_key
KSEF_CLIENT_ID=ksef_client_id
KSEF_CLIENT_SECRET=ksef_client_secret
KSEF_API_URL=https://ksef-api.mf.gov.pl
```

## Testing

Demo credentials for testing:
- Email: `demo@test.com`
- Password: `demo123`

Demo NIP for GUS API testing:
- NIP: `1234567890` (returns mock data)
