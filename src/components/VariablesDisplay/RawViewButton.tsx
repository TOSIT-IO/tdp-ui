import React from 'react'
import { classNames } from 'src/utils'

interface RawViewButtonType {
  isRaw: boolean
  setIsRaw: React.Dispatch<React.SetStateAction<boolean>>
}

export function RawViewButton({ isRaw, setIsRaw }: RawViewButtonType) {
  return (
    <div>
      <div className="isolate inline-flex rounded-md shadow-sm">
        <p className="relative inline-flex items-center pr-2">Presentation :</p>
        <button
          type="button"
          onClick={() => setIsRaw(true)}
          className={classNames(
            isRaw ? 'bg-gray-400/60' : 'bg-gray-50',
            'relative inline-flex items-center rounded-l-md border border-gray-300 px-4 py- text-sm font-medium text-gray-700 hover:bg-gray-400/40 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          )}
        >
          Raw
        </button>
        <button
          type="button"
          onClick={() => setIsRaw(false)}
          className={classNames(
            !isRaw ? 'bg-gray-400/60' : 'bg-gray-50',
            'relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400/40 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          )}
        >
          View
        </button>
      </div>
    </div>
  )
}
