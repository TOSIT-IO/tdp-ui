import { useEffect, useRef, useState } from 'react'
import { DisplayOperation } from './DisplayOperation'
import { EditOperation } from './EditOperation'

interface OperationsListProps {
  operation: string
  index: number
  setSecondaryRef: React.Dispatch<
    React.SetStateAction<React.MutableRefObject<HTMLInputElement>>
  >
  isFieldDisabled: boolean
}

export function Operation({
  operation,
  index,
  setSecondaryRef,
  isFieldDisabled,
}: OperationsListProps) {
  const [isEditable, setIsEditable] = useState(false)
  const secondaryInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    isEditable ? setSecondaryRef(secondaryInputRef) : setSecondaryRef(null)
  }, [isEditable, setSecondaryRef])

  return (
    <div className="bg-gray-200 border border-gray-500 rounded-md overflow-hidden cursor-pointer">
      {isEditable ? (
        <EditOperation
          operation={operation}
          setIsEditable={setIsEditable}
          index={index}
          secondaryInputRef={secondaryInputRef}
        />
      ) : (
        <DisplayOperation
          operation={operation}
          isFieldDisabled={isFieldDisabled}
          setIsEditable={setIsEditable}
          index={index}
        />
      )}
    </div>
  )
}
