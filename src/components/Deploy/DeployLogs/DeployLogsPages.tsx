import { DeploymentLog } from 'src/clients/tdpClient'
import Link from 'next/link'
import { dateAndTime } from 'src/utils/dateAndTime'
import { useState } from 'react'
import { useDeployListPage } from 'src/hooks'
import { classNames } from 'src/utils'

export function DeployLogsPages() {
  const DEPLOYLOGS_LIMIT = 15
  const DEPLOYLOGS_OFFSET = 0
  const [limit, setLimit] = useState(DEPLOYLOGS_LIMIT)
  const [offset, setOffset] = useState(DEPLOYLOGS_OFFSET)
  const [currentPage, setCurrentPage] = useState(1)

  // const [currentDeployLogsPage, setCurrentDeployLogsPage , limitDeployLogs, offsetDeployLogs] = useDeployListPage(limit,offset)
  const currentDeployLogsPage: DeploymentLog[] = useDeployListPage(
    limit,
    offset
  )

  // const pastDeploymentsRichList = usePastDeploymentsRichList()

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-6 lg:px-8">
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
                        Id Deploy
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Start Time Deploy
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        End Time Deploy
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        State Deploy
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 pl-3 pr-4 text-right text-sm font-semibold sm:pr-6 text-gray-900"
                      >
                        Deploy Detail
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {currentDeployLogsPage.map((d) => (
                      <tr key={d.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {d.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {dateAndTime(d.startTime)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {d.endTime && dateAndTime(d.endTime)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {d.state}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            href={`/deploy/logs/${d.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 mt-auto mb-3 space-x-1 flex items-center justify-center text-gray-700">
          <button
            type="button"
            onClick={() => {
              console.log(
                `AVANT SET Page courante : ${Math.floor(
                  offset / limit
                )} offset : ${offset} limit : ${limit}`
              )
              // ((a % n ) + n ) % n
              // if ((offset % limit) > 1) {
              if (Math.floor(offset / limit) > 0) {
                // setCurrentPage(currentPage - 1)
                setOffset(offset - limit)
              }
              console.log(
                `APRES SET Page courante : ${Math.floor(
                  offset / limit
                )} offset : ${offset} limit : ${limit}`
              )
            }}
            className={classNames(
              'bg-gray-200 text-gray-700',
              'text-gray-500',
              'px-2 py-[0.15rem] hover:bg-gray-200 text-sm flex gap-1 items-center'
            )}
          >
            {'< Page précédente'}
          </button>
          <p>
            Page courante : {Math.floor(offset / limit)} offset : {offset} limit
            : {limit}
          </p>
          <button
            type="button"
            // onClick={() => setOffset(offset>0?offset+1:offset)}
            onClick={() => {
              // setCurrentPage(currentPage + 1)
              setOffset(offset + limit)
            }}
            className={classNames(
              'bg-gray-200 text-gray-700',
              'text-gray-500',
              'px-2 py-[0.15rem] hover:bg-gray-200 text-sm flex gap-1 items-center'
            )}
          >
            {'Page suivante >'}
          </button>
        </div>
      </div>
    </div>
  )
}
