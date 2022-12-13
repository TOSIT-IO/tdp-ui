import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button } from 'src/components/commons'
import { useDeployContext } from 'src/contexts'
import { useDeploy } from 'src/hooks/useDeploy'
import { PageHeader } from '../PageHeader'

//TODO: #73 Preview operations execution plan before deploy
export function ReviewStep({ togglePreviousStep, toggleNextStep }) {
  const deploy = useDeploy()
  const { state } = useDeployContext()

  function handleOnClickNext() {
    deploy(state)
  }
  return (
    <div>
      <PageHeader title="Preview" />
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