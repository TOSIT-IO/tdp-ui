import { useState } from 'react'
import { classNames } from 'src/utils'
import { useVariablesContext } from '../VariablesContext'

export function RawField({
  property,
  value,
  dict,
}: {
  property: string
  value: string | number | boolean | any[]
  dict?: string
}) {
  const { setNewVariables } = useVariablesContext()
  const [error, setError] = useState(false)
  const inputName = dict ? [dict, property].join('.') : property

  function handleVariableChange(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const newVariable = JSON.parse(event.target.value)
      setError(false)
      if (!dict) {
        setNewVariables((prev: any) => ({ ...prev, [property]: newVariable }))
        return
      }
      setNewVariables((prev: any) => {
        const data = { ...prev }
        data[dict] = prev[dict] || {}
        data[dict][property] = newVariable
        return data
      })
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div className="text-gray-600 text-sm flex">
      <label htmlFor={inputName} className="font-bold mr-2">
        {property}:
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
