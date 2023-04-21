import { Operation } from 'src/store/features/api/tdpApi'
import { classNames } from 'src/utils'

export function DeployPreview({ operations }: { operations: Operation[] }) {
  return (
    <table className="mx-auto table-auto border border-gray-200">
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
      <td className="px-4 text-center">{index + 1}</td>
      <td className="px-4">{name}</td>
      <td className="px-4 text-center">{collection_name}</td>
      <td className="px-4 text-center">{noop ? 'Yes' : 'No'}</td>
    </tr>
  )
}
