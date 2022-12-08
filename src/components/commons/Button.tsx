import { classNames } from 'src/utils'

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: any
  className?: string
  variant?: 'filled' | 'outlined' | 'text'
  type?: 'button' | 'submit'
  [x: string]: any
}

export function Button({
  children,
  className,
  type = 'button',
  variant = 'filled',
  ...props
}: ButtonType) {
  function getVariantStyles() {
    switch (variant) {
      case 'filled':
        return 'bg-green-600 text-white hover:bg-green-700'
      case 'outlined':
        return 'border border-gray-300 text-gray-700 hover:bg-gray-50'
      case 'text':
        return 'text-gray-700 hover:bg-gray-50'
      default:
        return ''
    }
  }

  return (
    <button
      type={type}
      className={classNames(
        getVariantStyles(),
        'rounded px-2.5 py-1.5 outline-none',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
