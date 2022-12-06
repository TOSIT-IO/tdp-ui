import { XMarkIcon } from '@heroicons/react/24/solid'
import { classNames } from 'src/utils'
import { useDeployContext } from 'src/contexts/deployContext'
import { DeployActionEnum } from 'src/types/deployTypes'

interface DisplayOperationProps {
  operation: string
  isFieldDisabled: boolean
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
  index: number
}

export function DisplayOperation({
  index,
  operation,
  isFieldDisabled,
  setIsEditable,
}: DisplayOperationProps) {
  const { dispatch } = useDeployContext()

  function handleRemoveOperation() {
    dispatch({
      type: DeployActionEnum.REMOVE_OPERATION_AT,
      payload: { index },
    })
  }

  function handleOnDoubleClick() {
    if (isFieldDisabled) return
    setIsEditable(true)
  }

  return (
    <div className="flex">
      <span className="px-1 font-mono" onDoubleClick={handleOnDoubleClick}>
        {operation}
      </span>
      <button
        type="button"
        className={classNames(
          'self-stretch px-1 border-l border-gray-500 -ml-px',
          !isFieldDisabled && 'bg-pink-700'
        )}
        disabled={isFieldDisabled}
        onClick={handleRemoveOperation}
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  )
}
