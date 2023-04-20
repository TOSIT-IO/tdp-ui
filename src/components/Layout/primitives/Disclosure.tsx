import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { classNames } from 'src/utils'

export function Disclosure({
  title,
  className: additionalClassName,
  children,
}: {
  title: string
  className?: string
  children: JSX.Element
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className={classNames(
          'flex w-full justify-between bg-gray-100 px-4 py-2 text-left font-medium text-slate-900',
          additionalClassName
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="overflow-x-hidden">{title}</span>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5" />
        ) : (
          <ChevronDownIcon className="h-5 w-5" />
        )}
      </button>
      <div className={classNames(!isOpen && 'hidden', 'px-2 py-1')}>
        {children}
      </div>
    </>
  )
}
