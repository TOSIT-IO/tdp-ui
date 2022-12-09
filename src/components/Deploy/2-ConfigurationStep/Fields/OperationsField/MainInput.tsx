import { useState } from 'react'
import { useDeployContext } from 'src/contexts'
import { DeployActionEnum } from 'src/types/deployTypes'
import { useOnClickOutside } from './hooks'

export function MainInput({
  isFieldDisabled,
  mainRef,
}: {
  isFieldDisabled: boolean
  mainRef: React.MutableRefObject<HTMLInputElement>
}) {
  const [input, setInput] = useState('')
  const {
    state: { operations },
    dispatch,
  } = useDeployContext()
  useOnClickOutside(mainRef, addOperation)

  const placeholder = !operations.length ? 'operation' : undefined
  const isOperationAlreadyRegistered = operations.includes(input.trim())

  function addOperation() {
    const trimmedInput = input.trim()
    if (!trimmedInput) return
    if (isOperationAlreadyRegistered) return
    dispatch({
      type: DeployActionEnum.ADD_OPERATION,
      payload: { newOperation: trimmedInput },
    })
    setInput('')
  }

  function removeLastOperation() {
    dispatch({
      type: DeployActionEnum.REMOVE_LAST_OPERATION,
    })
  }

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case ',':
      case ' ':
      case 'Enter':
      case 'Escape':
        e.preventDefault()
        addOperation()
        break
      case 'Backspace':
        if (input.length) return
        e.preventDefault()
        removeLastOperation()
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
        width: input
          ? `${input.length}ch`
          : `max(${placeholder?.length}ch, 1ch)`,
      }}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleOnKeyDown}
      className="bg-transparent outline-none font-mono"
      placeholder={placeholder}
    />
  )
}
