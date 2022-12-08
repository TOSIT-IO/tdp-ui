export function PageHeader({ title }) {
  return (
    <header className="border-b border-gray-200 pb-5 mb-5">
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
        {title}
      </h1>
    </header>
  )
}
