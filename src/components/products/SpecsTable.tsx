type SpecsTableProps = {
  specs: Record<string, string>
}

export default function SpecsTable({ specs }: SpecsTableProps) {
  const entries = Object.entries(specs)

  if (entries.length === 0) return null

  return (
    <section>
      <h2 className="text-xl font-bold tracking-tight text-gray-900">Specifications</h2>
      <dl className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {entries.map(([key, value], index) => (
          <div
            key={key}
            className={[
              'grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[220px_1fr] sm:gap-4',
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
            ].join(' ')}
          >
            <dt className="text-sm font-medium text-gray-700">{key}</dt>
            <dd className="text-sm text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
