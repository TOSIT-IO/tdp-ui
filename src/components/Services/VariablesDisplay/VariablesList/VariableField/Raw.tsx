import { useState } from 'react'
import { classNames } from 'src/utils'
import { useVariablesContext } from '../../contexts/VariablesContext'

type VariableFieldType = {
  propName: string
  value: string | number | boolean | any[]
  parent?: string
}

export function RawField({ propName, value, parent }: VariableFieldType) {
  const { setNewVariables } = useVariablesContext()
  const [error, setError] = useState(false)
  const inputName = parent ? [parent, propName].join('.') : propName

  function handleVariableChange(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const newVariable = JSON.parse(event.target.value)
      setError(false)
      if (!parent) {
        setNewVariables((prev: any) => ({ ...prev, [propName]: newVariable }))
        return
      }
      setNewVariables((prev: any) => {
        const data = { ...prev }
        data[parent] = prev[parent] || {}
        data[parent][propName] = newVariable
        return data
      })
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div className="text-gray-600 text-sm flex">
      <label htmlFor={inputName} className="font-bold mr-2">
        {propName}:
      </label>
      <input
        name={inputName}
        className={classNames(
          'grow outline-none bg-gray-100',
          error && 'bg-red-200'
        )}
        defaultValue={JSON.stringify(value)}
        onChange={handleVariableChange}
      />
    </div>
  )
}
