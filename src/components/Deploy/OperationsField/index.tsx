import { classNames } from 'src/utils'
import { useDeployContext } from 'src/contexts/deployContext'
import { DeployMethodsEnum } from 'src/types/deployTypes'
import { useFocus } from './hooks'
import { MainInput } from './MainInput'
import { OperationsList } from './OperationsList'

export function OperationsField() {
  const { mainRef, setSecondaryRef, setFocus } = useFocus()
  const {
    state: { operations, deployMethod },
  } = useDeployContext()

  const isFieldDisabled = deployMethod === DeployMethodsEnum.ALL

  return (
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
            setSecondaryRef={setSecondaryRef}
            isFieldDisabled={isFieldDisabled}
          />
        ))}
        <MainInput mainRef={mainRef} isFieldDisabled={isFieldDisabled} />
      </div>
    </div>
  )
}
