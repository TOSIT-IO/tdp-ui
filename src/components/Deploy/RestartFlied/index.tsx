import { useDeployContext } from 'src/contexts/deployContext'
import { FieldHeader } from '../FieldHeader'
import { DeployActionEnum } from 'src/types/deployTypes'

export function RestartField() {
  const {
    state: { restart },
    dispatch,
  } = useDeployContext()

  function handleOnCheck() {
    dispatch({ type: DeployActionEnum.TOGGLE_RESTART })
  }

  return (
    <fieldset>
      <FieldHeader
        as="legend"
        title="Restart"
        description="Controls whether or not start operations will be replaced by a restart
        operation."
      />
      <input
        id="default-checkbox"
        type="checkbox"
        checked={restart}
        onChange={handleOnCheck}
        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
      />
      <label
        htmlFor="default-checkbox"
        className="ml-2 text-sm font-medium text-gray-900"
      >
        Restart operations
      </label>
    </fieldset>
  )
}
