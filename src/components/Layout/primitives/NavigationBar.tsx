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
      <div className={classNames('flex mt-6', additionalClassNames)}>
        {leftItem}
        <div className="ml-auto">{rightItem}</div>
      </div>
    )
  }

  return <div className="flex mt-6">{children}</div>
}
