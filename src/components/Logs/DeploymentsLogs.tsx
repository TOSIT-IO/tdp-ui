import { useState } from 'react'
import Link from 'next/link'

import { dateAndTime } from 'src/utils/dateAndTime'
import { Button } from 'src/components/commons'
import {
  useGetDeploymentsApiV1DeployGetQuery,
  DeploymentLog,
} from 'src/features/api/tdpApi'

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
    <div className="mt-10 flex items-center justify-center gap-2">
      <Button
        as="button"
        variant="text"
        disabled={currentPage <= 0}
        onClick={togglePreviousPage}
      >
        Previous
      </Button>
      <p className="text-gray-700">{currentPage + 1}</p>
      <Button
        as="button"
        variant="text"
        disabled={currentPage >= totalPages}
        onClick={toggleNextPage}
      >
        Next
      </Button>
    </div>
  )
}

const DeploymentItem = ({ deploylog }: { deploylog: DeploymentLog }) => {
  const { id, start_time, end_time, state } = deploylog
  return (
    <tr key={id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {id}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {dateAndTime(new Date(start_time))}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {end_time && dateAndTime(new Date(end_time))}
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
  const pageSize = 3
  const [currentPage, setCurrentPage] = useState(0)

  const toggleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1)
  }
  const togglePreviousPage = () =>
    currentPage > 0 && setCurrentPage((currentPage) => currentPage - 1)

  const { isLoading, data } = useGetDeploymentsApiV1DeployGetQuery({
    limit: pageSize,
    offset: currentPage * pageSize,
  })

  if (isLoading) return <p>Loading...</p>

  if (data)
    return (
      <>
        {data.length === 0 ? (
          <div className="mt-2 text-center text-sm text-gray-700">
            - No past deployments to show -
          </div>
        ) : (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            ID
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
                            className="px-3 py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6"
                          >
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {data.map((d) => (
                          <DeploymentItem key={d.id} deploylog={d} />
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
                data.length < pageSize ? currentPage : currentPage + 1
              }
              currentPage={currentPage}
              toggleNextPage={toggleNextPage}
              togglePreviousPage={togglePreviousPage}
            />
          </div>
        )}
      </>
    )
}

export default DeploymentsLogs
