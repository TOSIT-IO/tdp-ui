import Link from 'next/link'
import { title } from 'process'
// import { useDeployContext } from 'src/contexts/deployContext'
import type {
  deploymentType,
  deploymentTabType,
} from 'src/hooks/usePastDeploymentsList'
import { DeployActionEnum } from 'src/types/deployTypes'
import type { deployLogWithOpType } from './TableDeployLogs/PastDeployLogs'

//   const pastDeploymentsRichList: deploymentType[] = usePastDeploymentsRichList()

// export function ListPastDeployLogs({ title: String }): JSX.Element {
export function ListPastDeployLogs({
  deployTab,
}: deploymentTabType): JSX.Element {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <header className="border-b border-gray-200 pb-5">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              {/* Past Deploy Logs :{title} */}
              Past Deploy Logs
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the past deployed logs including their id deploy,
              start deploy, end deploy and state. Click on a deployment to view
              it
            </p>
          </header>
        </div>
      </div>
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
                    {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"> */}
                    <th
                      scope="col"
                      className="px-3 py-3.5 pl-3 pr-4 text-right text-sm font-semibold sm:pr-6 text-gray-900"
                    >
                      Deploy Detail
                      {/* <span className="sr-only">Edit</span> */}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {deployTab.map((d) => (
                    <tr key={d.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {d.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {d.start_time}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {d.end_time}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {d.state}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {/* <a href="#" className="text-indigo-600 hover:text-indigo-900"> */}
                        {/* Details <span className="sr-only">, {d.operations.toString()}</span> */}
                        {/* Details , {d.operations.map(o=><p key={o}>{o}</p>)} */}
                        {/* </a> */}
                        <Link
                          href={'/deploy/logs/' + d.id.toString()}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {/* Details <span className="sr-only">, {d.operations.toString()}</span> */}
                          Details{' '}
                          {/* {d.operations.map((o) => (
                              <p key={o}>{o}</p>
                            ))} */}
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
    </div>
  )
}
