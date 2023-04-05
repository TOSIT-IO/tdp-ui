import { useState } from 'react'
import { useRouter } from 'next/router'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

import { OperationLog as TOperationLog } from 'src/clients/tdpClient'
import { useDeploymentOperation } from 'src/hooks'
import {
  dateAndTime,
  onlyTime,
  classNames,
  getFirstElementIfArray,
} from 'src/utils'

const LogViewButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
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

const OperationFullTextLogs = ({
  isOpen,
  operationName,
}: {
  isOpen: boolean
  operationName: string
}) => {
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

const OperationLog = ({ operation }: { operation: TOperationLog }) => {
  const { operation: operationName, startTime, endTime, state } = operation
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col">
      <div className="flex items-center py-3 px-3 text-sm text-gray-500">
        <div className="w-5/12">{operationName}</div>
        <div title={dateAndTime(startTime)} className="w-3/12">
          {onlyTime(startTime)}
        </div>
        <div title={endTime && dateAndTime(endTime)} className="w-3/12">
          {endTime && onlyTime(endTime)}
        </div>
        <div className="w-1/12">{state}</div>
        <div className="w-1/12 text-right">
          <LogViewButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <OperationFullTextLogs isOpen={isOpen} operationName={operationName} />
    </div>
  )
}

const OperationsLogs = ({ operations }: { operations: TOperationLog[] }) => {
  return (
    <div className="mt-8">
      <div className="py-2 md:px-6 lg:px-8">
        <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <div className="divide-y divide-gray-300">
            <div className="flex bg-gray-50 py-3 px-3 text-sm font-semibold text-gray-900">
              <div className="w-5/12">Operation name</div>
              <div className="w-3/12">Start Time</div>
              <div className="w-3/12">End Time</div>
              <div className="w-1/12">State</div>
              <div className="w-1/12 text-right">Logs</div>
            </div>
            {operations.map((op) => (
              <OperationLog key={op.operation} operation={op} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OperationsLogs
