import { XMarkIcon } from '@heroicons/react/24/solid'
import { classNames } from 'src/utils'

interface DisplayOperationProps {
  operation: string
  isFieldDisabled: boolean
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
  handleRemoveOperation: () => void
}

export function DisplayOperation({
  operation,
  isFieldDisabled,
  setIsEditable,
  handleRemoveOperation,
}: DisplayOperationProps): JSX.Element {
  return (
    <>
      <span
        className="px-1 font-mono"
        onDoubleClick={() => {
          if (!isFieldDisabled) {
            setIsEditable(true)
          }
        }}
      >
        {operation}
      </span>
      <button
        type="button"
        className={classNames(
          'h-full px-1 border-l border-gray-500 -ml-px',
          !isFieldDisabled && 'bg-pink-700'
        )}
        disabled={isFieldDisabled}
        onClick={handleRemoveOperation}
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </>
  )
}
