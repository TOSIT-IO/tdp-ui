import Link, { LinkProps } from 'next/link'
import { classNames } from 'src/utils'

const variantStyles = {
  filled: 'bg-green-600 text-white hover:bg-green-700',
  outlined: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  text: 'text-gray-700 hover:bg-gray-50',
}

type BaseProps = {
  children: any
  className?: string
  variant?: 'filled' | 'outlined' | 'text'
  disabled?: boolean
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: 'button'
  }

type ButtonAsLink = BaseProps &
  Omit<LinkProps, keyof BaseProps> & {
    as: 'Link'
  }

type ButtonAsAnchor = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: 'a'
  }

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink

export const Button = ({
  variant = 'outlined',
  children,
  ...props
}: ButtonProps) => {
  props.className = classNames(
    variantStyles[variant ?? 'filled'],
    props.disabled && 'opacity-50 pointer-events-none',
    'rounded px-2.5 py-1.5',
    props.className
  )

  switch (props.as) {
    case 'Link':
      const { as, ...linkProps } = props
      return <Link {...linkProps}>{children}</Link>
    case 'a':
      return <a {...props}>{children}</a>
    case 'button':
    default:
      return (
        <button type={props.type ?? 'button'} {...props}>
          {children}
        </button>
      )
  }
}
