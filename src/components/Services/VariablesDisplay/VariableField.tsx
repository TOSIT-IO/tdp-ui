import { useState } from 'react'
import { classNames } from 'src/utils'
import { Toggle } from '../Toggle'
import { useVariablesContext } from './VariablesContext'

type VariableFieldType = {
  prop: string
  value: string | number | boolean | any[]
  parent?: string
}

export function VariableField({ prop, value, parent }: VariableFieldType) {
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
          // console.log(newVariable)
          return data
        })
      }
    } catch (err) {
      setError(true)
    }
  }

  function handleChecked(event: React.ChangeEvent<HTMLInputElement>) {
    const newVariable = event.target.checked
    if (!parent) {
      setNewVariables((prev: any) => ({ ...prev, [prop]: newVariable }))
    } else {
      setNewVariables((prev: any) => {
        const data = { ...prev }
        // Initialization of parent obj
        data[parent] = prev[parent] || {}
        data[parent][prop] = newVariable
        return data
      })
    }
  }

  function getType(v: any): String {
    var typevar = 'undefined'
    if (v === undefined) {
      typevar = 'undefined'
    } else if (v === null) {
      typevar = 'null'
    } else if (Array.isArray(v)) {
      typevar = 'array'
    } else if (typeof v === 'string') {
      typevar = 'string'
    } else if (typeof v === 'number') {
      typevar = 'number'
    } else if (typeof v === 'boolean') {
      typevar = 'boolean'
    }
    return typevar.toString()
  }

  function ArrayList() {
    if (Array.isArray(value)) {
      return (
        <ol className="flex flex-grow flex-col  gap-2">
          {value.map((v) => (
            <li key={inputName} className="flex grow">
              <input
                key={inputName}
                name={inputName}
                className={classNames(
                  'grow',
                  error && 'bg-red-200',
                  typeof value === 'number'
                    ? 'text-teal-600'
                    : 'text-slate-700',
                  'hover:opacity-60 hover:bg-sky-300 transition duration-300 ease-in-out'
                )}
                defaultValue={JSON.stringify(v)}
                onChange={handleChange}
              />
            </li>
          ))}
        </ol>
      )
    }
  }

  function BooleanField() {
    if (typeof value === 'boolean') {
      return (
        <div className="flex flex-grow flex-col">
          <Toggle handleChecked={handleChecked} defaultValue={value} />
        </div>
      )
    }
  }

  function StringNumberField() {
    if (typeof value === 'string' || typeof value === 'number') {
      return (
        <input
          key={inputName}
          name={inputName}
          className={classNames(
            'grow',
            error && 'bg-red-200',
            typeof value === 'number' ? 'text-teal-600' : 'text-slate-700',
            'hover:opacity-60 hover:bg-sky-300 transition duration-300 ease-in-out'
          )}
          defaultValue={JSON.stringify(value)}
          onChange={handleChange}
        />
      )
    }
  }

  return (
    <div className="flex text-slate-600">
      <label htmlFor={inputName} className="font-bold mr-2">
        {prop}:
      </label>
      {getType(value) === 'array'
        ? ArrayList()
        : getType(value) === 'boolean'
        ? BooleanField()
        : (getType(value) === 'string' || getType(value) === 'number') &&
          StringNumberField()}
    </div>
  )
}
