'use client'

import { useState } from 'react'
import { Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from 'src/utils'
import Menu from './Menu'

export default function Sidebar({ className }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <div
        className={classNames(
          'bg-slate-700 flex flex-col',
          !isSidebarOpen && 'hidden',
          className
        )}
      >
        <button
          className="absolute top-0 right-0 p-3"
          type="button"
          onClick={() => setIsSidebarOpen(false)}
        >
          <XMarkIcon className="h-6 w-6 text-red-700" aria-hidden="true" />
        </button>
        <Menu />
      </div>
      <button
        className={isSidebarOpen && 'hidden'}
        type="button"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Bars3CenterLeftIcon
          className="h-6 w-6 text-red-700"
          aria-hidden="true"
        />
      </button>
    </>
  )
}
