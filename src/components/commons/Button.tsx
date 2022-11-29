import { classNames } from 'src/utils'

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  className?: string
  type?: 'button' | 'submit'
  [x: string]: any
}

export function Button({
  children,
  className,
  type = 'button',
  ...props
}: ButtonType) {
  return (
    <button
      type={type}
      className={classNames(
        'rounded border border-transparent bg-green-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
