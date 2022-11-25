import { CheckCircleIcon } from '@heroicons/react/24/solid'
import React, { createContext, useContext } from 'react'
import { classNames } from 'src/utils'

const RadioContext = createContext<{
  radioName: string
  selectedId: number
  setSelectedId: React.Dispatch<React.SetStateAction<number>>
}>(null)

interface Option {
  value: string
  title: string
  description: string
}

export function RadioList({
  label,
  name,
  options,
  selectedId,
  setSelectedId,
}: {
  label: string
  name: string
  options: Option[]
  selectedId: number
  setSelectedId: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <RadioContext.Provider
      value={{ radioName: name, selectedId, setSelectedId }}
    >
      <fieldset>
        <legend className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
          {label}
        </legend>
        <ul className="grid gap-6 w-full md:grid-cols-3 auto-rows-max">
          {options.map((option, index) => (
            <RadioInput key={option.value} option={option} index={index} />
          ))}
        </ul>
      </fieldset>
    </RadioContext.Provider>
  )
}

export function RadioInput({
  option,
  index,
}: {
  option: Option
  index: number
}) {
  const { radioName, selectedId, setSelectedId } = useContext(RadioContext)
  const { value, title, description } = option
  return (
    <li
      onClick={() => setSelectedId(index)}
      className={classNames(
        'cursor-pointer text-gray-500 border border-gray-200 rounded-lg p-5',
        index === selectedId
          ? 'border-blue-600 text-blue-600'
          : 'hover:text-gray-600 hover:bg-gray-100'
      )}
    >
      <input
        type="radio"
        id={value}
        name={radioName}
        value={value}
        className="hidden"
        required
      />
      <label htmlFor={value} className="cursor-pointer">
        <div className="flex justify-between">
          <div className="text-lg font-semibold">{title}</div>
          {index === selectedId && (
            <CheckCircleIcon className="ml-3 w-6 h-6" aria-hidden="true" />
          )}
        </div>
        <p>{description}</p>
      </label>
    </li>
  )
}
