import { PageHeader } from '../PageHeader'

// TODO: fieldList type
export function FormDisplay({
  title,
  fieldsList,
}: {
  title: string
  fieldsList: any[]
}) {
  return (
    <div>
      <PageHeader title={title} />
      <form className="flex flex-col gap-7">
        {fieldsList.map((Field, index) => (
          <Field key={index} />
        ))}
      </form>
    </div>
  )
}
