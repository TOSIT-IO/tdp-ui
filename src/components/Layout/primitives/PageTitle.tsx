import { classNames } from 'src/utils'

export function PageTitle({
  children,
  className: additionalClassName,
  as: ComponentType = 'h1',
}: {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}) {
  return (
    <ComponentType
      className={classNames(
        'mb-5 mt-2 border-b border-gray-200 pb-5 text-3xl font-medium text-gray-900',
        additionalClassName
      )}
    >
      {children}
    </ComponentType>
  )
}
