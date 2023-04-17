import { DeploymentLogWithOperations } from 'src/features/api/tdpApi'
import { dateAndTime } from 'src/utils/dateAndTime'

const DeploymentInfos = ({
  deployInfos,
}: {
  deployInfos: Omit<DeploymentLogWithOperations, 'operations'>
}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <header className="border-b border-gray-200 pb-5">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Deploy Log Details
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the deploy log details including their id deploy,
              and operations list
            </p>
          </header>
        </div>
      </div>
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
                      variable
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {Object.entries(deployInfos).map(([k, v]) => (
                    <tr key={k}>
                      <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {k}
                      </td>
                      <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                        {v instanceof Date ? dateAndTime(v) : v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeploymentInfos
