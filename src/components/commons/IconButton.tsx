import { HeroIcon } from 'src/types'
import { classNames } from 'src/utils'

export function IconButon({
  icon: Icon,
  text,
  onClick,
  className: additionalClassName,
  isActive,
}: {
  icon: HeroIcon
  text?: string
  onClick: () => void
  className?: string
  isActive: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        isActive ? 'bg-gray-200 text-gray-700' : 'text-gray-500',
        'flex items-center gap-1 px-2 py-[0.15rem] text-sm hover:bg-gray-200',
        additionalClassName
      )}
    >
      <Icon className="h-4 w-4" />
      {text}
    </button>
  )
}
