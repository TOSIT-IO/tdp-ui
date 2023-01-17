import { Operation } from 'src/clients/tdpClient'
import { classNames } from 'src/utils'

export function DeployPreview({ operations }: { operations: Operation[] }) {
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
  const { name, collectionName, noop } = operation
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
      <td className="text-center px-4">{collectionName}</td>
      <td className="text-center px-4">{noop ? 'Yes' : 'No'}</td>
    </tr>
  )
}
