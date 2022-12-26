import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Operation } from '@/client-sdk'
import { Button } from 'src/components/commons'
import { NavigationBar } from 'src/components/Layout/primitives'
import { classNames } from 'src/utils'
import { useDagDeploy, useDeployDagRequest, useDagDeployPreview } from './hooks'

type PreviewDagDeployProps = {
  setDisplayPreview: (display: boolean) => void
}

export function PreviewDagDeploy({ setDisplayPreview }: PreviewDagDeployProps) {
  const deployDagReq = useDeployDagRequest()
  const { preview, loading } = useDagDeployPreview(deployDagReq)
  const deployDag = useDagDeploy()

  function handleOnClickDeploy() {
    deployDag(deployDagReq)
  }

  if (loading) return <p>Loading</p>

  return (
    <div>
      <OperationsTable operations={preview} />
      <NavigationBar className="sticky bottom-0 bg-white py-2">
        <Button
          onClick={() => setDisplayPreview(false)}
          className="flex items-center gap-1"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          Back
        </Button>
        <Button variant="filled" onClick={handleOnClickDeploy}>
          Deploy
        </Button>
      </NavigationBar>
    </div>
  )
}

function OperationsTable({ operations }: { operations: Operation[] }) {
  return (
    <table className="table-auto border border-gray-200 mx-auto">
      <thead className="border-b px-4 text-gray-800">
        <tr>
          <th className="px-4">Order</th>
          <th className="px-4">Operation</th>
          <th className="px-4">Collection</th>
          <th className="px-4">Noop</th>
        </tr>
      </thead>
      <tbody className="text-gray-600">
        {operations.map((op, index) => (
          <OperationRow key={op.name} operation={op} index={index} />
        ))}
      </tbody>
    </table>
  )
}

function OperationRow({
  operation,
  index,
}: {
  operation: Operation
  index: number
}) {
  const { name, collection_name, noop } = operation
  return (
    <tr
      key={index}
      className={classNames(
        'border-b',
        index % 2 === 0 ? undefined : 'bg-gray-100'
      )}
    >
      <td className="text-center px-4">{index + 1}</td>
      <td className="px-4">{name}</td>
      <td className="text-center px-4">{collection_name}</td>
      <td className="text-center px-4">{noop ? 'Yes' : 'No'}</td>
    </tr>
  )
}
