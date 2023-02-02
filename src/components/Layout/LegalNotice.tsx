import Link from 'next/link'
import { classNames } from 'src/utils'

export function LegalNotice() {
  return (
    <div className="p-5 mt-auto mb-3 space-x-1 flex items-center justify-center text-gray-700">
      {/* <UserInfos /> */}
      <p>&copy; {new Date().getFullYear()} </p>
      <Link
        className={classNames(
          'underline underline-offset-1',
          'text-gray-500 hover:bg-gray-800 hover:text-white'
        )}
        href={'https://github.com/TOSIT-IO'}
      >
        {'TOSIT'}
      </Link>
      <p>| License</p>
      <Link
        className={classNames(
          'underline underline-offset-1',
          'text-gray-500 hover:bg-gray-800 hover:text-white'
        )}
        href={'https://www.apache.org/licenses/LICENSE-2.0'}
      >
        {'Apache-2.0.'}
      </Link>
    </div>
  )
}
