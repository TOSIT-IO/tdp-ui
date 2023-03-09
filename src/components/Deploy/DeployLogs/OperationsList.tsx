import { useState } from 'react'
import { OperationLog } from 'src/clients/tdpClient'
import { dateAndTime, onlyTime } from 'src/utils'
import { DetailLogView, LogViewButton } from './DetailLogView'

function DetailOperationLog({ operation }: { operation: OperationLog }) {
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
      <DetailLogView isOpen={isOpen} operationName={operationName} />
    </div>
  )
}

export function OperationsList({ operations }: { operations: OperationLog[] }) {
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
              <DetailOperationLog key={op.operation} operation={op} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
