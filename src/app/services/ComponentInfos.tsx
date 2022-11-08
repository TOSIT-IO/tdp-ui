import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useComponentInfos } from 'src/hooks'
import { classNames } from 'src/utils'
import Tableau from './Tableau'

type ComponentInfosType = {
  serviceId: string
  componentId: string
}

export default function ComponentInfos({
  serviceId,
  componentId,
}: ComponentInfosType) {
  const [isOpen, setIsOpen] = useState(false)
  const componentInfos = useComponentInfos(serviceId, componentId)

  return (
    <>
      <button
        className="flex w-full justify-between rounded-md bg-slate-100 px-4 py-2 text-left text-sm font-medium text-slate-900"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{componentId}</span>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5" />
        ) : (
          <ChevronDownIcon className="h-5 w-5" />
        )}
      </button>
      <div
        className={classNames(
          !isOpen && 'hidden',
          'px-4 py-2 text-sm text-gray-500'
        )}
      >
        {componentInfos?.variables[0] ? (
          <Tableau variables={Object.entries(componentInfos.variables)} />
        ) : (
          'no values'
        )}
      </div>
    </>
  )
}
