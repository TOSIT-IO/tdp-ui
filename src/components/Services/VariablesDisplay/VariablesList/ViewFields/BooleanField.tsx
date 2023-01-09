import { useVariablesContext } from '../../VariablesContext'
import { Toggle } from 'src/components/commons'

export function BooleanField({
  prop,
  value,
  parent,
}: {
  prop: string
  value: boolean
  parent?: string
}) {
  const { setNewVariables } = useVariablesContext()

  function handleChecked(event: React.ChangeEvent<HTMLInputElement>) {
    const newVariable = event.target.checked
    if (!parent) {
      setNewVariables((prev: any) => ({ ...prev, [prop]: newVariable }))
    } else {
      setNewVariables((prev: any) => {
        const data = { ...prev }
        data[parent] = prev[parent] || {}
        data[parent][prop] = newVariable
        return data
      })
    }
  }
  return (
    <div className="flex flex-grow flex-col">
      <Toggle handleChecked={handleChecked} defaultValue={value} />
    </div>
  )
}
