import { cloneElement } from 'react'
import { classNames } from 'src/utils'

//TODO: use classNames and Tailwind types instead of inline styles
export const Sidebar = ({
  side = 'left',
  sideWidth = '20rem',
  contentMin = '50%',
  space = '1rem',
  noStretch = false,
  className: additionalClassName,
  children,
}: {
  side?: 'left' | 'right'
  sideWidth?: string
  contentMin?: string
  space?: string
  noStretch?: boolean
  className?: string
  children: [React.ReactElement, React.ReactElement]
}) => {
  if (!contentMin.includes('%')) {
    console.warn(
      'The value for `contentMin` property should be a percentage. Otherwise overflow is likely to occur'
    )
  }

  const getSideContent = (children: React.ReactElement) => {
    return cloneElement(children, {
      className: [children.props.className, 'flex-grow-0'].join(' '),
      style: {
        ...children.props.style,
        flexBasis: sideWidth,
      },
    })
  }

  const getMainContent = (children: React.ReactElement) => {
    return cloneElement(children, {
      className: [children.props.className, 'basis-0 flex-grow-[999]'].join(
        ' '
      ),
      style: {
        ...children.props.style,
        minInlineSize: contentMin,
      },
    })
  }

  return (
    <div
      className={classNames('flex flex-wrap', additionalClassName)}
      style={{
        gap: space,
        alignItems: noStretch ? 'flex-start' : 'stretch',
      }}
    >
      {side === 'left'
        ? getSideContent(children[0])
        : getMainContent(children[0])}
      {side === 'left'
        ? getMainContent(children[1])
        : getSideContent(children[1])}
    </div>
  )
}
