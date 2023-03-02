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
        'px-2 py-[0.15rem] hover:bg-gray-200 text-sm flex gap-1 items-center',
        additionalClassName
      )}
    >
      <Icon className="w-4 h-4" />
      {text}
    </button>
  )
}
