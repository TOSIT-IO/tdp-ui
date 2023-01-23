import { OperationLog } from 'src/clients/tdpClient'
import { dateAndTime } from 'src/utils'

export function OperationsList({ operations }: { operations: OperationLog[] }) {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Operation name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Start time
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    End time
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    State
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Logs
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {operations.map((op) => (
                  <tr key={op.operation} className="whitespace-nowrap ">
                    <td className="px-3 py-2 text-sm font-medium text-gray-900">
                      {op.operation}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-500">
                      {dateAndTime(op.startTime)}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-500">
                      {dateAndTime(op.endTime)}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-500">
                      {op.state}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-500">
                      {/* todo : get logs details */}
                      {'View'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
