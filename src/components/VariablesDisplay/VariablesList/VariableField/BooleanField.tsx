import { useVariablesContext } from '../../contexts/VariablesContext'
import { Toggle } from 'src/components/Toggle'

type VariableFieldType = {
  prop: string
  value: string | number | boolean | any[]
  parent?: string
}

//TODO: Impose value as boolean
export function BooleanField({ prop, value, parent }: VariableFieldType) {
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

  if (typeof value === 'boolean') {
    return (
      <div className="flex flex-grow flex-col">
        <Toggle handleChecked={handleChecked} defaultValue={value} />
      </div>
    )
  } else {
    return <></>
  }
}
