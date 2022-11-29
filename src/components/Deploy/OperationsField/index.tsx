import { classNames } from 'src/utils'
import { useFocus } from './hooks'
import { handleOperations } from './handlers'
import { MainInput } from './MainInput'
import { OperationsList } from './OperationsList'

interface OperationsSelectionProps {
  isFieldDisabled: boolean
  operations: string[]
  setOperations: React.Dispatch<React.SetStateAction<string[]>>
}

export function OperationsField({
  isFieldDisabled,
  operations,
  setOperations,
}: OperationsSelectionProps): JSX.Element {
  const {
    isOperationAlreadyExisting,
    isOperationAlreadyExistingAt,
    modifyOperation,
    removeLastOperation,
    removeOperation,
    addOperation,
  } = handleOperations(operations, setOperations)
  const { mainRef, setSecondaryRef, setFocus } = useFocus()

  return (
    <>
      <div onClick={() => setFocus()}>
        <div
          className={classNames(
            'flex flex-wrap gap-1 border border-gray-300 rounded-md cursor-text px-2 py-1',
            isFieldDisabled && 'bg-gray-200'
          )}
        >
          {operations.map((v, i) => (
            <OperationsList
              key={v}
              operation={v}
              index={i}
              {...{
                setSecondaryRef,
                isOperationAlreadyExisting,
                isOperationAlreadyExistingAt,
                modifyOperation,
                isFieldDisabled,
                removeOperation,
              }}
            />
          ))}
          <MainInput
            placeholder={!operations.length && 'operation_name'}
            {...{
              mainRef,
              isOperationAlreadyExisting,
              addOperation,
              removeLastOperation,
              isFieldDisabled,
            }}
          />
        </div>
      </div>
    </>
  )
}
