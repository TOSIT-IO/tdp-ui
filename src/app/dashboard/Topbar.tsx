'use client'

import { useAuth } from 'react-oidc-context'
import { PowerIcon, UserIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

import { UserProfile } from 'src/components/UserProfile'

export default function Topbar() {
  const [isVisible, setisVisible] = useState(false)
  const auth = useAuth()
  const profile = {
    username: auth.user.profile.preferred_username,
    firstName: auth.user.profile.given_name,
    lastName: auth.user.profile.family_name,
    email: auth.user.profile.email,
  }

  return (
    <nav className="static bg-slate-500 px-2 sm:px-4 py-2.5">
      <div className="container flex justify-end">
        <button onClick={() => setisVisible((prev) => !prev)}>
          <UserIcon className="block mx-3 h-8 w-8" />
        </button>
        <button onClick={() => auth.signoutRedirect()}>
          <PowerIcon className="block mx-3 h-8 w-8" />
        </button>
      </div>
      {isVisible && <UserProfile profile={profile} />}
    </nav>
  )
}
