export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        'url': 'https://www.vatfaktura.pl',
        'name': 'VAT Faktura',
        'description': 'Bezpłatny program do fakturowania z integracją kSEF. Twórz faktury w 30 sekund. 100% za darmo zawsze.',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': 'https://www.vatfaktura.pl/search?q={search_term_string}'
          }
        }
      },
      {
        '@type': 'SoftwareApplication',
        'name': 'VAT Faktura',
        'description': 'Program do fakturowania dla firm i freelancerów',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'Web-based',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'PLN',
          'availability': 'https://schema.org/InStock',
          'description': '100% bezpłatnie na zawsze, bez limitów, bez karty kredytowej'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'ratingCount': '250'
        },
        'review': [
          {
            '@type': 'Review',
            'author': {
              '@type': 'Person',
              'name': 'Piotr M.'
            },
            'datePublished': '2026-03-05',
            'description': 'Świetny program! Intuicyjny interfejs i pełna integracja KSEF. Polecam.',
            'name': 'Najlepszy darmowy program do fakturowania',
            'reviewRating': {
              '@type': 'Rating',
              'ratingValue': '5'
            }
          },
          {
            '@type': 'Review',
            'author': {
              '@type': 'Person',
              'name': 'Anna K.'
            },
            'datePublished': '2026-03-04',
            'description': 'Używam 3 miesiące, bezpłatnie, bez żadnych limitów. Bardzo solidne rozwiązanie dla freelancerów.',
            'name': 'Bardzo polecam dla freelancerów',
            'reviewRating': {
              '@type': 'Rating',
              'ratingValue': '5'
            }
          },
          {
            '@type': 'Review',
            'author': {
              '@type': 'Person',
              'name': 'Marek T.'
            },
            'datePublished': '2026-03-03',
            'description': 'Wygodny program, brak problemów z KSEF, szybko wysyła faktury elektronicznie.',
            'name': 'Wygodny i bezpłatny',
            'reviewRating': {
              '@type': 'Rating',
              'ratingValue': '5'
            }
          }
        ]
      },
      {
        '@type': 'Organization',
        'name': 'VAT Faktura',
        'url': 'https://www.vatfaktura.pl',
        'sameAs': [
          'https://www.facebook.com/vatfaktura',
          'https://www.twitter.com/vatfaktura'
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'contactType': 'Customer Support',
          'email': 'support@vatfaktura.pl'
        }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Czy VAT Faktura jest naprawdę 100% bezpłatna?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Tak, VAT Faktura jest w pełni bezpłatna. Nie trzeba podawać karty kredytowej, nie ma ukrytych opłat, a wszystkie funkcje są dostępne dla wszystkich użytkowników.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Co to jest KSEF i czy VAT Faktura go wspiera?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'KSEF (Krajowy System e-Faktur) to obowiązkowy system do przesyłania faktur. VAT Faktura ma pełną integrację z KSEF, dzięki czemu możesz wysyłać faktury bezpośrednio z aplikacji.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Czy moje dane są bezpieczne?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Tak, VAT Faktura przechowuje dane bezpośrednio w twojej przeglądarce. Twoje faktury i dane nigdy nie trafiają na serwery. Dodatkowo wszystkie dane są szyfrowane.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Czy mogę eksportować faktury do PDF?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Tak, każdą fakturę możesz wysportować do pliku PDF i wydrukować. Faktury można również wysyłać jako e-faktury poprzez system KSEF.'
            }
          }
        ]
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Strona główna',
            'item': 'https://www.vatfaktura.pl'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'FAQ',
            'item': 'https://www.vatfaktura.pl/faq'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Blog',
            'item': 'https://www.vatfaktura.pl/blog'
          },
          {
            '@type': 'ListItem',
            'position': 4,
            'name': 'Partnerzy',
            'item': 'https://www.vatfaktura.pl/partners'
          }
        ]
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  )
}
