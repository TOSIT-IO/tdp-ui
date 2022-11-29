import { useState } from 'react'

export function MainInput({
  isOperationAlreadyExisting,
  addOperation,
  removeLastOperation,
  isFieldDisabled,
  mainRef,
  placeholder,
}) {
  const [input, setInput] = useState('')

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case ',':
      case ' ':
      case 'Enter':
      case 'Escape':
        e.preventDefault()
        if (input.trim()) {
          if (isOperationAlreadyExisting(input)) return
          addOperation(input)
          setInput('')
        }
        break
      case 'Backspace':
        if (!input.length) {
          e.preventDefault()
          removeLastOperation()
        }
        break
      default:
        break
    }
  }

  return (
    <input
      type="text"
      disabled={isFieldDisabled}
      ref={mainRef}
      style={{ width: input ? `${input.length}ch` : `${placeholder.length}ch` }}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleOnKeyDown}
      className="bg-transparent outline-none font-mono"
      placeholder={placeholder}
    />
  )
}
