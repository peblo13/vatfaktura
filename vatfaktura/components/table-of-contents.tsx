interface TableOfContentsProps {
  sections: Array<{
    id: string
    title: string
    level: number
  }>
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  return (
    <div className="bg-slate-800/40 border border-blue-500/20 rounded-lg p-6 my-8 sticky top-24">
      <h3 className="text-lg font-bold text-white mb-4">Spis treści</h3>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id} style={{ marginLeft: `${(section.level - 2) * 16}px` }}>
            <a
              href={`#${section.id}`}
              className="text-blue-300 hover:text-cyan-300 transition-colors text-sm block py-1"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
