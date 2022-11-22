import { useState } from 'react'
import { useOperationsContext } from './OperationsContext'

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
    <form onSubmit={handleOnSubmit} className="flex">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-grow"
      />
      <button type="submit">Add</button>
    </form>
  )
}
