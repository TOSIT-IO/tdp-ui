import { useGetDeploymentsApiV1DeployGetQuery } from 'src/store/features/api/tdpApi'
import { Button } from 'src/components/commons'
import DeploymentsLogs from 'src/components/Logs/DeploymentsLogs'

export default function PastDeployLogsPage() {
  // TODO: add pagination
  const { isLoading, data } = useGetDeploymentsApiV1DeployGetQuery({
    limit: 100,
    offset: 0,
  })

  if (isLoading) return <p>Loading</p>

  if (data)
    return (
      <>
        <div className="mb-5 mt-2 border-b border-gray-200 pb-5">
          <div className="flex justify-between">
            <h1 className="text-3xl font-medium text-gray-900">Deployments</h1>
            <Button
              as="Link"
              href="/deploy/new/"
              variant="filled"
              className="mt-2"
            >
              New deployment
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the past deployed logs including their id deploy,
            start deploy, end deploy and state.
          </p>
        </div>
        <DeploymentsLogs />
      </>
    )
}
