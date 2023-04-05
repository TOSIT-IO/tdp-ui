import { useState } from 'react'
import Link from 'next/link'

import { DeploymentLog as TDeploymentLog } from 'src/clients/tdpClient'
import { dateAndTime } from 'src/utils/dateAndTime'
import { useFetchLogsPage } from 'src/hooks'
import { Button } from 'src/components/commons'

const Pagination = ({
  totalPages,
  currentPage,
  toggleNextPage,
  togglePreviousPage,
}: {
  totalPages: number
  currentPage: number
  toggleNextPage: () => void
  togglePreviousPage: () => void
}) => {
  return (
    <div className="mb-3 flex items-center justify-center gap-2 space-x-1 p-5 text-gray-700">
      <Button
        as="button"
        disabled={currentPage <= 0}
        onClick={togglePreviousPage}
        className={'hover:bg-gray-100 disabled:opacity-50'}
      >
        Previous
      </Button>
      <p>{currentPage + 1}</p>
      <Button
        as="button"
        disabled={currentPage >= totalPages}
        onClick={toggleNextPage}
        className={'hover:bg-gray-100 disabled:opacity-50'}
      >
        Next
      </Button>
    </div>
  )
}

const DeploymentLog = ({ deploylog }: { deploylog: TDeploymentLog }) => {
  const { id, startTime, endTime, state } = deploylog
  return (
    <tr key={id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {id}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {dateAndTime(startTime)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {endTime && dateAndTime(endTime)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {state}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link
          href={`/deploy/logs/${id}`}
          className="text-indigo-600 hover:text-indigo-900"
        >
          Details
        </Link>
      </td>
    </tr>
  )
}

const DeploymentsLogs = () => {
  const pageSize = 15
  const [currentPage, setCurrentPage] = useState(0)

  const toggleNextPage = () => {
    console.log(currentPage)
    setCurrentPage((currentPage) => currentPage + 1)
  }
  const togglePreviousPage = () =>
    currentPage > 0 && setCurrentPage((currentPage) => currentPage - 1)

  const currentDeployLogsPage: TDeploymentLog[] = useFetchLogsPage(
    pageSize,
    currentPage
  )

  return (
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
                      className="px-3 py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6"
                    >
                      Deploy Detail
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentDeployLogsPage.map((d) => (
                    <DeploymentLog key={d.id} deploylog={d} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        // TODO: Server should return the page size
        totalPages={
          currentDeployLogsPage.length < pageSize ? currentPage : 99999
        }
        currentPage={currentPage}
        toggleNextPage={toggleNextPage}
        togglePreviousPage={togglePreviousPage}
      />
    </div>
  )
}

export default DeploymentsLogs
