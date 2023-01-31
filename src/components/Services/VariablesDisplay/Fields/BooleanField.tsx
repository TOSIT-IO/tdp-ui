import { useVariablesContext } from '../VariablesContext'
import { Toggle } from 'src/components/commons'

export function BooleanField({
  property,
  value,
  dict,
}: {
  property: string
  value: boolean
  dict?: string
}) {
  const { setNewVariables } = useVariablesContext()

  function handleChecked(event: React.ChangeEvent<HTMLInputElement>) {
    const newVariable = event.target.checked
    if (!dict) {
      setNewVariables((prev: any) => ({ ...prev, [property]: newVariable }))
    } else {
      setNewVariables((prev: any) => {
        const data = { ...prev }
        data[dict] = prev[dict] || {}
        data[dict][property] = newVariable
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
