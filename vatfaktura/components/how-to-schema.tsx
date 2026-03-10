export interface HowToStep {
  name: string
  description: string
  image?: string
}

interface HowToSchemaProps {
  title: string
  description: string
  image: string
  author: string
  datePublished: string
  steps: HowToStep[]
}

export function HowToSchema({
  title,
  description,
  image,
  author,
  datePublished,
  steps,
}: HowToSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    image,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.description,
      image: step.image,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  )
}
