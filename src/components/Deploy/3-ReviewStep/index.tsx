import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button } from 'src/components/commons'
import { useDeployContext } from 'src/contexts'
import { PageHeader } from '../PageHeader'

export function ReviewStep({ togglePreviousStep, toggleNextStep }) {
  const { deploy } = useDeployContext()

  function handleOnClickNext() {
    deploy()
  }
  return (
    <div>
      <PageHeader title="Review" />
      <p>TODO</p>
      <div className="flex justify-between mt-6">
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
