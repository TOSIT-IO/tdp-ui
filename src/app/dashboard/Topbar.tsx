'use client'

import { useAuth } from 'react-oidc-context'
import { PowerIcon, BellAlertIcon, UserIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

import { Identity } from 'src/components'

export default function Topbar({ className }) {
  const [isOpen, setIsOpen] = useState(false)
  const auth = useAuth()

  return (
    <>
      <nav className="static bg-slate-500 px-2 sm:px-4 py-2.5">
        <div className="container display flex justify-end">
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <UserIcon className="block mx-3 h-8 w-8" />
          </button>
          <button>
            <BellAlertIcon className="block mx-3 h-8 w-8" />
          </button>
          <button onClick={() => auth.signoutRedirect()}>
            <PowerIcon className="block mx-3 h-8 w-8" />
          </button>
        </div>
        <Identity
          username={auth.user.profile.preferred_username}
          firstName={auth.user.profile.given_name}
          lastName={auth.user.profile.family_name}
          email={auth.user.profile.email}
          visibility={isOpen}
        />
      </nav>
    </>
  )
}
