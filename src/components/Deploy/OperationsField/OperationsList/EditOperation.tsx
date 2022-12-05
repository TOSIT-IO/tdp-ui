import { PencilIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { DeployActionEnum } from 'src/pages/deploy'

interface EditOperationProps {
  operation: string
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
  index: number
  secondaryInputRef: React.MutableRefObject<HTMLInputElement>
  state
  dispatch
}

// TODO: handle case where user click away (abort)
export function EditOperation({
  operation,
  setIsEditable,
  index,
  secondaryInputRef,
  state,
  dispatch,
}: EditOperationProps): JSX.Element {
  const [input, setInput] = useState(operation)

  function handleEditOperation() {
    if (input.trim()) {
      if (input.trim() === state.operations[index]) {
        setIsEditable(false)
        return
      }
      if (state.operations.includes(input.trim())) return
      dispatch({
        type: DeployActionEnum.MODIFY_OPERATION_AT,
        payload: { index, newOperation: input.trim() },
      })
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
          if (input.trim() === state.operations[index]) {
            setIsEditable(false)
            return
          }
          if (state.operations.includes(input.trim())) return
          dispatch({
            type: DeployActionEnum.MODIFY_OPERATION_AT,
            payload: { index, newOperation: input.trim() },
          })
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
    </>
  )
}
