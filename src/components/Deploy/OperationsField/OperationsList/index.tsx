import { useEffect, useRef, useState } from 'react'
import { DeployActionEnum } from 'src/pages/deploy'
import { DisplayOperation } from './DisplayOperation'
import { EditOperation } from './EditOperation'

interface OperationsListProps {
  operation: string
  index: number
  setSecondaryRef: React.Dispatch<
    React.SetStateAction<React.MutableRefObject<HTMLInputElement>>
  >
  isFieldDisabled: boolean
  dispatch
  state
}

export function OperationsList({
  operation,
  index,
  setSecondaryRef,
  isFieldDisabled,
  dispatch,
  state,
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
            setIsEditable,
            index,
            secondaryInputRef,
            dispatch,
            state,
          }}
        />
      ) : (
        <DisplayOperation
          {...{
            operation,
            isFieldDisabled,
            setIsEditable,
            dispatch,
            state,
            handleRemoveOperation: () =>
              dispatch({
                type: DeployActionEnum.REMOVE_OPERATION_AT,
                payload: { index },
              }),
          }}
        />
      )}
    </div>
  )
}
