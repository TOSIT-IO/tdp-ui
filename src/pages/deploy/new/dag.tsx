import { DeployDag } from 'src/components/Deploy'

export default function DeployDagPage() {
  return (
    <>
      <div className="mb-5 mt-2 border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-medium text-gray-900">
          New deployment from DAG
        </h1>
      </div>
      <DeployDag />
    </>
  )
}
