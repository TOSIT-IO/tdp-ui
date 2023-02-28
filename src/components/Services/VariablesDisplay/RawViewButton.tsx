import { Bars3CenterLeftIcon, EyeIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { HeroIcon } from 'src/types'
import { classNames } from 'src/utils'

interface RawViewButtonType {
  isRaw: boolean
  setIsRaw: React.Dispatch<React.SetStateAction<boolean>>
}

export function RawViewButton({ isRaw, setIsRaw }: RawViewButtonType) {
  return (
    <div className="inline-flex overflow-hidden rounded-md border border-gray-400">
      <IconButon
        onClick={() => setIsRaw(true)}
        isActive={isRaw}
        icon={Bars3CenterLeftIcon}
        text="Raw"
      />
      <IconButon
        onClick={() => setIsRaw(false)}
        isActive={!isRaw}
        className="-ml-px border-l border-l-gray-400"
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
        'flex items-center gap-1 px-2 py-[0.15rem] text-sm hover:bg-gray-200',
        additionalClassName
      )}
    >
      <Icon className="h-4 w-4" />
      {text}
    </button>
  )
}
