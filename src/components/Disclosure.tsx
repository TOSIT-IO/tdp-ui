import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { classNames } from 'src/utils'

type DisclosureType = {
  title: string
  children: JSX.Element
}

export function Disclosure({ title, children }: DisclosureType) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="flex w-full justify-between rounded-md bg-slate-100 px-4 py-2 text-left font-medium text-slate-900"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5" />
        ) : (
          <ChevronDownIcon className="h-5 w-5" />
        )}
      </button>
      <div className={classNames(!isOpen && 'hidden', 'py-2 text-gray-500')}>
        {children}
      </div>
    </>
  )
}
