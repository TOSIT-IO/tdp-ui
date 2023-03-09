import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { classNames, getFirstElementIfArray } from 'src/utils'
import { useDeploymentOperation } from 'src/hooks'
import { useRouter } from 'next/router'

interface LogViewButtonType {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function LogViewButton({ isOpen, setIsOpen }: LogViewButtonType) {
  return (
    <button
      type="button"
      className={classNames(
        'flex w-full items-center justify-between py-2 pl-4 text-right font-medium text-indigo-600 hover:text-indigo-900'
      )}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className="overflow-x-hidden">View</span>
      {isOpen ? (
        <ChevronUpIcon className="h-5 w-5" />
      ) : (
        <ChevronDownIcon className="h-5 w-5" />
      )}
    </button>
  )
}

export function DetailLogView({
  isOpen,
  operationName,
}: {
  isOpen: boolean
  operationName: string
}) {
  const {
    query: { deployLogId: tempDeployLogId },
  } = useRouter()
  const deployLogId = getFirstElementIfArray(tempDeployLogId)

  const operationlogview = useDeploymentOperation(
    Number(deployLogId),
    operationName,
    isOpen
  )

  const logview = operationlogview?.logs?.toString() ?? '- no logs -'

  if (!logview) return <p>Loading</p>

  return (
    <pre
      className={classNames(
        !isOpen && 'hidden',
        'm-2 border px-2 py-2 text-xs',
        ' overflow-x-auto border-gray-300 font-mono'
      )}
    >
      {logview}
    </pre>
  )
}
