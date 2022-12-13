'use client'

import { useState } from 'react'
import { useAuth } from 'react-oidc-context'
import { Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from 'src/utils'
import Menu from './Menu'

export default function Sidebar({ className }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const auth = useAuth()

  return (
    <>
      <div
        className={classNames(
          !isSidebarOpen && 'hidden',
          'bg-slate-700 h-full overflow-y-auto',
          className
        )}
      >
        <div className="flex justify-between pt-2 px-2">
          <button type="button" onClick={() => setIsSidebarOpen(false)}>
            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
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
