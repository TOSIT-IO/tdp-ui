import { classNames } from 'src/utils'

import { UserIcon } from '@heroicons/react/24/solid'

type UserProfileType = {
  profile: {
    username: string
    firstName: string
    lastName: string
    email: string
  }
}

export function UserProfile({ profile }: UserProfileType) {
  return (
    <>
      <div className="absolute top-10 right-20 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
          <UserIcon className="block mx-3 h-8 w-8" />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {profile.firstName} {profile.lastName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {profile.username}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {profile.email}
          </span>
        </div>
      </div>
    </>
  )
}
