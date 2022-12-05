import { classNames } from 'src/utils'
import { useFocus } from './hooks'
import { MainInput } from './MainInput'
import { OperationsList } from './OperationsList'

interface OperationsSelectionProps {
  isFieldDisabled: boolean
  dispatch
  state
}

export function OperationsField({
  isFieldDisabled,
  dispatch,
  state,
}: OperationsSelectionProps): JSX.Element {
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
          {state.operations.map((v, i) => (
            <OperationsList
              key={v}
              operation={v}
              index={i}
              dispatch={dispatch}
              state={state}
              {...{
                setSecondaryRef,
                isFieldDisabled,
              }}
            />
          ))}
          <MainInput
            placeholder={!state.operations.length && 'operation_name'}
            dispatch={dispatch}
            state={state}
            {...{
              mainRef,
              isFieldDisabled,
            }}
          />
        </div>
      </div>
    </>
  )
}
