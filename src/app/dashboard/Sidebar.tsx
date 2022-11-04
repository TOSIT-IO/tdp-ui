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
          !isSidebarOpen ? 'hidden' : 'relative bg-slate-700',
          className
        )}
      >
        <button
          className="absolute right-1 top-1"
          type="button"
          onClick={() => setIsSidebarOpen(false)}
        >
          <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
        </button>
        <Menu className="mt-8" />
      </div>
      <button
        className={isSidebarOpen ? 'hidden' : 'items-start bg-slate-700'}
        type="button"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Bars3CenterLeftIcon
          className="h-6 w-6 text-white"
          aria-hidden="true"
        />
      </button>
    </>
  )
}
