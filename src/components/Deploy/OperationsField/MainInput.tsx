import { useState } from 'react'
import { DeployActionEnum } from 'src/pages/deploy'

export function MainInput({
  isFieldDisabled,
  mainRef,
  placeholder,
  dispatch,
  state,
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
          if (state.operations.includes(input.trim())) return
          dispatch({
            type: DeployActionEnum.ADD_OPERATION,
            payload: { newOperation: input.trim() },
          })
          setInput('')
        }
        break
      case 'Backspace':
        if (!input.length) {
          e.preventDefault()
          dispatch({
            type: DeployActionEnum.REMOVE_LAST_OPERATION,
          })
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
      style={{
        width: input ? `${input.length}ch` : `${placeholder.length}ch`,
      }}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleOnKeyDown}
      className="bg-transparent outline-none font-mono"
      placeholder={placeholder}
    />
  )
}
