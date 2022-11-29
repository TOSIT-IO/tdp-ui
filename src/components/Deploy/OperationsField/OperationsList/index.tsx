import { useEffect, useRef, useState } from 'react'
import { DisplayOperation } from './DisplayOperation'
import { EditOperation } from './EditOperation'

interface OperationsListProps {
  operation: string
  index: number
  setSecondaryRef: React.Dispatch<
    React.SetStateAction<React.MutableRefObject<HTMLInputElement>>
  >
  isOperationAlreadyExisting: (operation: string) => boolean
  isOperationAlreadyExistingAt: (index: number, input: string) => boolean
  modifyOperation: (index: number, newOperation: string) => void
  isFieldDisabled: boolean
  removeOperation: (index: number) => void
}

export function OperationsList({
  operation,
  index,
  setSecondaryRef,
  isOperationAlreadyExisting,
  isOperationAlreadyExistingAt,
  modifyOperation,
  isFieldDisabled,
  removeOperation,
}: OperationsListProps): JSX.Element {
  const [isEditable, setIsEditable] = useState(false)
  const secondaryInputRef = useRef<HTMLInputElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    isEditable ? setSecondaryRef(secondaryInputRef) : setSecondaryRef(null)
  }, [isEditable, setSecondaryRef])

  return (
    <div
      className="flex bg-gray-200 border border-gray-500 rounded-md overflow-hidden cursor-pointer"
      ref={componentRef}
    >
      {isEditable ? (
        <EditOperation
          {...{
            operation,
            isOperationAlreadyExistingAt,
            setIsEditable,
            index,
            isOperationAlreadyExisting,
            modifyOperation,
            secondaryInputRef,
          }}
        />
      ) : (
        <DisplayOperation
          {...{
            operation,
            isFieldDisabled,
            setIsEditable,
            handleRemoveOperation: () => removeOperation(index),
          }}
        />
      )}
    </div>
  )
}
