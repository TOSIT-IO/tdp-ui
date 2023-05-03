import { classNames } from 'src/utils'

interface LabelProps {
  title: string
  description?: string
  ComponentType?: 'legend' | 'label'
  disabled?: boolean
  [x: string]: any
}

export const FieldHeader = ({
  title,
  description,
  disabled = false,
  as: ComponentType = 'label',
  ...props
}: LabelProps): JSX.Element => (
  <div className="mb-1">
    <ComponentType
      className={classNames(
        'text-lg font-medium',
        disabled ? 'text-gray-500' : 'text-gray-700'
      )}
      {...props}
    >
      {title}
    </ComponentType>
    {description && <p className="text-sm text-gray-500">{description}</p>}
  </div>
)
