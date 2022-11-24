import { useState } from 'react'
import { useOperationsContext } from './OperationsContext'
import { PlusIcon } from '@heroicons/react/24/solid'

export default function InputField() {
  const [inputValue, setInputValue] = useState('')
  const { addOperation } = useOperationsContext()
  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedInput = inputValue.trim()
    addOperation(trimmedInput)
    setInputValue('')
  }
  return (
    <form onSubmit={handleOnSubmit}>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Add new operation
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="block w-full rounded-none rounded-l-md border border-gray-300 pl-2"
            placeholder="Operation"
          />
        </div>
        <button
          type="submit"
          className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span>Add</span>
        </button>
      </div>
    </form>
  )
}
