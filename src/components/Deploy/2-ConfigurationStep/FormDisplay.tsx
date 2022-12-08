// TODO: fieldList type
export function FormDisplay({
  title,
  fieldsList,
}: {
  title: string
  fieldsList: any[]
}) {
  return (
    <form className="flex flex-col gap-7">
      <header className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          {title}
        </h1>
      </header>
      {fieldsList.map((Field, index) => (
        <Field key={index} />
      ))}
    </form>
  )
}
