import { Bars3CenterLeftIcon, EyeIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { HeroIcon } from 'src/types'
import { classNames } from 'src/utils'

interface ToggleViewModeButton {
  isRaw: boolean
  setIsRaw: React.Dispatch<React.SetStateAction<boolean>>
}

export function ToggleViewModeButton({
  isRaw,
  setIsRaw,
}: ToggleViewModeButton) {
  return (
    <div className="rounded-md inline-flex border border-gray-400 overflow-hidden">
      <IconButon
        onClick={() => setIsRaw(true)}
        isActive={isRaw}
        icon={Bars3CenterLeftIcon}
        text="Raw"
      />
      <IconButon
        onClick={() => setIsRaw(false)}
        isActive={!isRaw}
        className="-ml-px border-l-gray-400 border-l"
        icon={EyeIcon}
        text="View"
      />
    </div>
  )
}

function IconButon({
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
