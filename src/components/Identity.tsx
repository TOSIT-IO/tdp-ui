import { classNames } from 'src/utils'

import { UserIcon } from '@heroicons/react/24/solid'

type IdentityType = {
  username: string
  firstName: string
  lastName: string
  email: string
  visibility: boolean
}

export function Identity({
  username,
  firstName,
  lastName,
  email,
  visibility,
}: IdentityType) {
  return (
    <>
      <div
        className={classNames(
          !visibility && 'hidden',
          'absolute top-10 right-20 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'
        )}
      >
        <div className="flex flex-col items-center pb-10">
          <UserIcon className="block mx-3 h-8 w-8" />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {firstName} {lastName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {username}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {email}
          </span>
        </div>
      </div>
    </>
  )
}
