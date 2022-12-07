import { useState } from 'react'
import { classNames } from 'src/utils'
import { useVariablesContext } from '../../contexts/VariablesContext'

type VariableFieldType = {
  prop: string
  value: string | number | boolean | any[]
  parent?: string
}

export function Raw({ prop, value, parent }: VariableFieldType) {
  const { setNewVariables } = useVariablesContext()
  const [error, setError] = useState(false)
  const inputName = parent ? [parent, prop].join('.') : prop

  function handleVariableChange(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const newVariable = JSON.parse(event.target.value)
      setError(false)
      if (!parent) {
        setNewVariables((prev: any) => ({ ...prev, [prop]: newVariable }))
        return
      }
      setNewVariables((prev: any) => {
        const data = { ...prev }
        data[parent] = prev[parent] || {}
        data[parent][prop] = newVariable
        return data
      })
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div className="flex text-slate-600">
      <label htmlFor={inputName} className="font-bold mr-2">
        {prop}:
      </label>
      <input
        name={inputName}
        className={classNames('grow', error && 'bg-red-200')}
        defaultValue={JSON.stringify(value)}
        onChange={handleVariableChange}
      />
    </div>
  )
}
