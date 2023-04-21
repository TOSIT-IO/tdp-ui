import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import {
  useLazyGetDeploymentOperationApiV1DeployDeploymentIdOperationOperationGetQuery,
  OperationLog,
} from 'src/store/features/api/tdpApi'
import {
  dateAndTime,
  onlyTime,
  classNames,
  getFirstElementIfArray,
} from 'src/utils'
import { Button } from '../commons'

const ShowFullTextLogsButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <Button
      as="button"
      variant="text"
      className="text-right text-indigo-600"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className="text-right">{isOpen ? 'Hide' : 'Show'}</span>
    </Button>
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

  const [getOperationLogView, { data, isLoading }] =
    useLazyGetDeploymentOperationApiV1DeployDeploymentIdOperationOperationGetQuery()
  useEffect(() => {
    if (isOpen)
      getOperationLogView({
        deploymentId: Number(deployLogId),
        operation: operationName,
      })
  }, [isOpen])

  if (isLoading) return <p>Loading...</p>

  if (data) {
    const logs =
      data.logs.toString() !== '' ? data.logs.toString() : '- no logs -'
    return (
      <pre
        className={classNames(
          !isOpen && 'hidden',
          'm-2 border px-2 py-2 text-xs',
          ' overflow-x-auto border-gray-300 font-mono'
        )}
      >
        {logs}
      </pre>
    )
  }
}

const OperationItem = ({ operation }: { operation: OperationLog }) => {
  const { operation: operationName, start_time, end_time, state } = operation
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col">
      <div className="flex items-center px-3 py-3 text-sm text-gray-500">
        <div className="w-5/12">{operationName}</div>
        <div title={dateAndTime(new Date(start_time))} className="w-3/12">
          {onlyTime(new Date(start_time))}
        </div>
        <div
          title={end_time && dateAndTime(new Date(end_time))}
          className="w-3/12"
        >
          {end_time && onlyTime(new Date(end_time))}
        </div>
        <div className="w-1/12">{state}</div>
        <div className="w-1/12 text-right">
          <ShowFullTextLogsButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <OperationFullTextLogs isOpen={isOpen} operationName={operationName} />
    </div>
  )
}

const OperationsLogs = ({ operations }: { operations: OperationLog[] }) => {
  return (
    <div className="mt-8">
      <div className="py-2 md:px-6 lg:px-8">
        <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <div className="divide-y divide-gray-300">
            <div className="flex bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-900">
              <div className="w-5/12">Operation name</div>
              <div className="w-3/12">Start Time</div>
              <div className="w-3/12">End Time</div>
              <div className="w-1/12">State</div>
              <div className="w-1/12 text-right">Logs</div>
            </div>
            {operations.map((op) => (
              <OperationItem key={op.operation} operation={op} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OperationsLogs
