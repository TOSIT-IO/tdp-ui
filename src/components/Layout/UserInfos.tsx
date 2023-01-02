import { ArrowLeftOnRectangleIcon, UserIcon } from '@heroicons/react/24/solid'
import { useAuth } from 'react-oidc-context'
export function UserInfos() {
  const {
    user: {
      profile: { email, preferred_username: username },
    },
    signoutRedirect,
  } = useAuth()

  return (
    <div className="flex items-center text-white">
      <UserIcon className="w-6 h-6 text-gray-200" />
      <div className="flex flex-col ml-2 overflow-x-hidden">
        <span className="text-sm leading-4 font-bold">{username}</span>
        <span className="text-xs italic leading-4 text-gray-400">{email}</span>
      </div>
      <button
        onClick={() => signoutRedirect()}
        className="ml-auto px-2 self-stretch text-sm text-gray-200 hover:text-red-400"
      >
        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
      </button>
    </div>
  )
}
