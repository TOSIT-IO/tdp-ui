import { useDeployContext } from 'src/contexts'
import { DeployActionEnum } from 'src/types/deployTypes'
import { classNames } from 'src/utils'
import { useScrollContext } from './context'

export function OperationSelection({
  className: additionalClassNames,
}: {
  className?: string
}) {
  const {
    dispatch,
    state: { operations },
  } = useDeployContext()
  const { setNeedScrollDown } = useScrollContext()

  function handleOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (['Enter', ' ', ','].includes(event.key)) {
      event.preventDefault()
      const input = event.currentTarget.value.trim()
      setNeedScrollDown(true)
      dispatch({
        type: DeployActionEnum.ADD_OPERATION,
        payload: { newOperation: input },
      })
      event.currentTarget.value = ''
    }
  }

  return (
    <div
      className={classNames(
        additionalClassNames,
        'p-2 flex flex-col bg-gray-100'
      )}
    >
      <input
        type="text"
        className="pl-1 border border-gray-300 font-mono"
        placeholder="operation_name"
        onKeyDown={handleOnKeyDown}
      />
    </div>
  )
}
