import { ArrowLeftOnRectangleIcon, UserIcon } from '@heroicons/react/24/solid'
import { useAuth } from 'react-oidc-context'

export const UserInfos = () => {
  const auth = useAuth()

  if (!auth.user) return null

  const {
    user: {
      profile: { email, preferred_username: username },
    },
    signoutRedirect,
  } = auth

  return (
    <div className="flex items-center text-white">
      <UserIcon className="h-6 w-6 text-gray-200" />
      <div className="ml-2 flex flex-col overflow-x-hidden">
        <span className="text-sm font-bold leading-4">{username}</span>
        <span className="text-xs italic leading-4 text-gray-400">{email}</span>
      </div>
      <button
        onClick={() => signoutRedirect()}
        className="ml-auto self-stretch px-2 text-sm text-gray-200 hover:text-red-400"
      >
        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
