import { classNames } from 'src/utils'
import { useDeployContext } from 'src/contexts'
import { DeployMethodsEnum } from 'src/types/deployTypes'
import { useFocus } from './hooks'
import { MainInput } from './MainInput'
import { Operation } from './Operation'

export function OperationsField() {
  const { mainRef, setSecondaryRef, setFocus } = useFocus()
  const {
    state: { operations, selectedDeployMode: deployMethod },
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
          <Operation
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
