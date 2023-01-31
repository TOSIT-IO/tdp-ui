import { useState } from 'react'
import { classNames } from 'src/utils'
import { useVariablesContext } from '../VariablesContext'

export function StringNumberField({
  prop,
  value,
  parent,
}: {
  prop: string
  value: string | number
  parent?: string
}) {
  const { setNewVariables } = useVariablesContext()
  const [error, setError] = useState(false)
  const inputName = parent ? [parent, prop].join('.') : prop

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const newVariable = JSON.parse(event.target.value)
      setError(false)
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
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div className="flex">
      <input
        name={inputName}
        className={classNames(
          'flex-grow bg-gray-100',
          error && 'bg-red-200',
          typeof value === 'number' ? 'text-teal-600' : 'text-slate-600'
        )}
        defaultValue={JSON.stringify(value)}
        onChange={handleChange}
      />
    </div>
  )
}
