import { DeployOperations } from 'src/components/Deploy'

export default function DeployOperationsPage() {
  return (
    <>
      <div className="mt-2 border-b border-gray-200 pb-5 mb-5">
        <h1 className="text-3xl font-medium text-gray-900">
          Deploy operations
        </h1>
      </div>
      <DeployOperations />
    </>
  )
}
