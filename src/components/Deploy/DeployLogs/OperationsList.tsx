import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon'
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { OperationLog } from 'src/clients/tdpClient'
import { useDeploymentOperation } from 'src/hooks'
import {
  classNames,
  dateAndTime,
  getFirstElementIfArray,
  onlyTime,
} from 'src/utils'

function DetailOperationLog({ operation }: { operation: OperationLog }) {
  const {
    operation: operationName,
    startTime,
    endTime,
    logs,
    state,
  } = operation
  const [isOpen, setIsOpen] = useState(false)

  const {
    query: { deployLogId: tempDeployLogId },
  } = useRouter()
  const deployLogId = getFirstElementIfArray(tempDeployLogId)

  async function fetchLogsViewText(log: Blob) {
    const res = log.toString()
    return res
  }
  const logviewtext = fetchLogsViewText(logs)

  const operationlogview = useDeploymentOperation(
    Number(deployLogId),
    operationName,
    isOpen
  )

  const logview =
    (operationlogview &&
      operationlogview.logs &&
      operationlogview.logs.toString()) ||
    '- no logs -'

  if (!logview) return <p>Loading</p>

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
          <button
            type="button"
            className={classNames(
              'flex w-full items-center justify-between py-2 pl-4 text-right font-medium text-indigo-600 hover:text-indigo-900'
            )}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="overflow-x-hidden">{'View'}</span>
            {isOpen ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <pre
        className={classNames(
          !isOpen && 'hidden',
          'm-2 border px-2 py-2 text-xs',
          ' overflow-x-auto border-gray-300 font-mono'
        )}
      >
        {logview.toString()}
      </pre>
    </div>
  )
}

export function OperationsList({ operations }: { operations: OperationLog[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div>
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
                  <DetailOperationLog key={op.operation} operation={op} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
