import { FieldHeader } from 'src/components/commons'
import { useRestart } from '../hooks'

export const RestartField = () => {
  const [restart, toggleRestart] = useRestart()

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
        onChange={() => toggleRestart()}
        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
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
