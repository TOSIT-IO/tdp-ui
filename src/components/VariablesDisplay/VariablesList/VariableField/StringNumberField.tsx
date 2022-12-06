import { useState } from 'react'
import { classNames } from 'src/utils'
import { useVariablesContext } from '../../contexts/VariablesContext'

interface VariableFieldType {
  prop: string
  value: string | number | boolean | any[]
  parent?: string
}

//TODO: Impose value as string
export function StringNumberField({ prop, value, parent }: VariableFieldType) {
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

  if (typeof value === 'string' || typeof value === 'number') {
    return (
      <input
        name={inputName}
        className={classNames(
          'w-full hover:opacity-100 hover:bg-slate-200 focus:text-xl transition duration-75 ease-in-out',
          error && 'bg-red-200',
          typeof value === 'number' ? 'text-teal-600' : 'text-slate-700'
        )}
        defaultValue={JSON.stringify(value)}
        onChange={handleChange}
      />
    )
  } else {
    return <></>
  }
}
