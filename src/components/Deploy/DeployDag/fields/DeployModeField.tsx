import { FieldHeader } from 'src/components/commons'
import { classNames } from 'src/utils'
import { DeployModeEnum } from '../context'
import { useSelectedDeployMode } from '../hooks'

type DeployModes = {
  [K in DeployModeEnum]: string
}

const deployModes: DeployModes = {
  [DeployModeEnum.ALL]: 'All',
  [DeployModeEnum.SOURCES]: 'From sources',
  [DeployModeEnum.TARGETS]: 'To targets',
}

type CardProps = {
  children: React.ReactNode
  isSelected: boolean
  onClick: () => void
  className?: string
}

export function DeployModeField() {
  const [selectedDeployMode, setSelectedDeployMode] = useSelectedDeployMode()

  return (
    <fieldset>
      <FieldHeader
        as="legend"
        title="Deploy mode"
        description="Controls how the DAG will be deployed."
      />
      <div className="flex gap-2">
        {Object.entries(deployModes).map(([k, v]) => (
          <Card
            key={k}
            className="flex-1"
            onClick={() => setSelectedDeployMode(k as DeployModeEnum)}
            isSelected={k === selectedDeployMode}
          >
            {v}
          </Card>
        ))}
      </div>
    </fieldset>
  )
}

//TODO: use radio input instead of button
function Card({
  children,
  isSelected,
  onClick,
  className: additionalClassname,
}: CardProps) {
  return (
    <button
      type="button"
      className={classNames(
        'rounded-md border border-gray-200 p-4 font-medium text-gray-500',
        'hover:border-gray-400 hover:bg-gray-50 hover:text-gray-600',
        'focus:outline-none',
        isSelected && 'border-gray-400 bg-gray-50 text-gray-600',
        additionalClassname
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
