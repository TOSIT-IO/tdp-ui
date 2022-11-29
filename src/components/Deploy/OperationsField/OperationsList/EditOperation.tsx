import { PencilIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

interface EditOperationProps {
  operation: string
  isOperationAlreadyExistingAt: (index: number, input: string) => boolean
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
  index: number
  isOperationAlreadyExisting: (operation: string) => boolean
  modifyOperation: (index: number, newOperation: string) => void
  secondaryInputRef: React.MutableRefObject<HTMLInputElement>
}

// TODO: handle case where user click away (abort)
export function EditOperation({
  operation,
  isOperationAlreadyExistingAt,
  setIsEditable,
  index,
  isOperationAlreadyExisting,
  modifyOperation,
  secondaryInputRef,
}: EditOperationProps): JSX.Element {
  const [input, setInput] = useState(operation)

  function handleEditOperation() {
    if (input.trim()) {
      if (isOperationAlreadyExistingAt(index, input)) {
        setIsEditable(false)
        return
      }
      if (isOperationAlreadyExisting(input)) return
      modifyOperation(index, input)
      setIsEditable(false)
    }
  }

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case ',':
      case ' ':
      case 'Enter':
        e.preventDefault()
        if (input.trim()) {
          if (isOperationAlreadyExistingAt(index, input)) {
            setIsEditable(false)
            return
          }
          if (isOperationAlreadyExisting(input)) return
          modifyOperation(index, input)
          setIsEditable(false)
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsEditable(false)
        break
      default:
        break
    }
  }

  return (
    <>
      <input
        defaultValue={operation}
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
    </>
  )
}
