import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button } from 'src/components/commons'
import { useDeployContext } from 'src/contexts'
import { useDeploy } from 'src/hooks/useDeploy'
import { classNames } from 'src/utils'
import { PageHeader } from '../PageHeader'

export function ReviewStep({ togglePreviousStep }) {
  const { state } = useDeployContext()
  const { deploy, previewDeploy } = useDeploy(state)
  console.log('previewDeploy', previewDeploy)

  function handleOnClickNext() {
    deploy(state)
  }
  return (
    <div>
      <PageHeader title="Preview" />
      {previewDeploy.length ? (
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
            {previewDeploy.map((op, index) => (
              <tr
                key={index}
                className={classNames(
                  'border-b',
                  index % 2 === 0 ? undefined : 'bg-gray-100'
                )}
              >
                <td className="text-center px-4">{index + 1}</td>
                <td className="px-4">{op.name}</td>
                <td className="text-center px-4">{op.collection_name}</td>
                <td className="text-center px-4">{op.noop ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-600">
          No preview available for this mode.
        </div>
      )}
      <div className="flex sticky bottom-0 justify-between mt-6 bg-white py-5">
        <Button
          onClick={togglePreviousStep}
          variant="outlined"
          className="flex items-center gap-1"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          <span>Edit Configuration</span>
        </Button>
        <Button
          onClick={handleOnClickNext}
          variant="filled"
          className="flex items-center gap-1"
        >
          <span>Deploy</span>
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
