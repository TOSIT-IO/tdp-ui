import { classNames } from 'src/utils'

type NavigationProps = {
  children: [React.ReactElement, React.ReactElement] | React.ReactElement
  className?: string
}

export function NavigationBar({
  children,
  className: additionalClassNames,
}: NavigationProps) {
  if (Array.isArray(children)) {
    const [leftItem, rightItem] = children
    return (
      <div className={classNames('mt-6 flex', additionalClassNames)}>
        {leftItem}
        <div className="ml-auto">{rightItem}</div>
      </div>
    )
  }

  return <div className="mt-6 flex">{children}</div>
}
