import { useAuth } from 'react-oidc-context'
import { PowerIcon, UserIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { UserProfile } from 'src/components/UserProfile'
import { classNames } from 'src/utils'

export function Topbar({
  className: additionalClassName,
}: {
  className?: string
}) {
  const [isVisible, setisVisible] = useState(false)
  const auth = useAuth()
  const profile = {
    username: auth.user.profile.preferred_username,
    firstName: auth.user.profile.given_name,
    lastName: auth.user.profile.family_name,
    email: auth.user.profile.email,
  }

  return (
    <nav className={classNames('px-2 py-2.5', additionalClassName)}>
      <div className="container flex justify-end gap-3">
        <button onClick={() => setisVisible((prev) => !prev)}>
          <UserIcon className="h-8 w-8 text-white" />
        </button>
        <button onClick={() => auth.signoutRedirect()}>
          <PowerIcon className="h-8 w-8 text-white" />
        </button>
      </div>
      {isVisible && <UserProfile profile={profile} />}
    </nav>
  )
}
