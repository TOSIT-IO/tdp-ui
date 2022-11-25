'use client'

import { useAuth } from 'react-oidc-context'
import { PowerIcon, BellAlertIcon, UserIcon } from '@heroicons/react/24/solid'

export default function Topbar({ className }) {
  const auth = useAuth()

  return (
    <>
      <nav className=" bg-slate-500 px-2 sm:px-4 py-2.5">
        <div className="container display flex justify-end">
          <button>
            <UserIcon className="block mx-3 h-8 w-8" />
          </button>
          <button>
            <BellAlertIcon className="block mx-3 h-8 w-8" />
          </button>
          <button onClick={() => auth.signoutRedirect()}>
            <PowerIcon className="block mx-3 h-8 w-8" />
          </button>
        </div>
      </nav>
    </>
  )
}
