import { PencilIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useDeployContext } from 'src/contexts/deployContext'
import { DeployActionEnum } from 'src/types/deployTypes'

interface EditOperationProps {
  operation: string
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
  index: number
  secondaryInputRef: React.MutableRefObject<HTMLInputElement>
}

// TODO: handle case where user click away (abort)
export function EditOperation({
  operation,
  setIsEditable,
  index,
  secondaryInputRef,
}: EditOperationProps): JSX.Element {
  const [input, setInput] = useState(operation)
  const {
    state: { operations },
    dispatch,
  } = useDeployContext()

  const isValueChanged = input.trim() === operations[index]
  const isOperationAlreadyDefined = operations.includes(input.trim())

  function handleEditOperation() {
    const trimmedInput = input.trim()
    if (!trimmedInput) return
    if (!isValueChanged) {
      setIsEditable(false)
      return
    }
    if (isOperationAlreadyDefined) return
    dispatch({
      type: DeployActionEnum.EDIT_OPERATION_AT,
      payload: { index, newOperation: trimmedInput },
    })
    setIsEditable(false)
  }

  function handleRemoveOperation() {
    dispatch({ type: DeployActionEnum.REMOVE_OPERATION_AT, payload: { index } })
  }

  function handleAbortOngoingChange() {
    setIsEditable(false)
  }

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case ',':
      case ' ':
      case 'Enter':
        e.preventDefault()
        handleEditOperation()
        break
      case 'Escape':
        e.preventDefault()
        handleAbortOngoingChange()
        break
      case 'Backspace':
        if (input.length !== 0) return
        e.preventDefault()
        handleRemoveOperation()
        break
      default:
        break
    }
  }

  return (
    <div>
      <input
        value={input}
        style={{ width: `calc(${input.length}ch + 0.5rem)` }}
        onChange={(e) => setInput(e.target.value)}
        ref={secondaryInputRef}
        onKeyDown={handleOnKeyDown}
        className="px-1 bg-white outline-none font-mono"
      />
      <button
        type="button"
        className={'h-full px-1 border-l border-gray-500 -ml-px'}
        onClick={handleEditOperation}
      >
        <PencilIcon className="w-4 h-4" />
      </button>
    </div>
  )
}
