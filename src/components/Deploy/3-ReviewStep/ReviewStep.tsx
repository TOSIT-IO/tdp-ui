import { Button } from 'src/components/commons'
import { useDeployContext } from 'src/contexts'

export default function ReviewStep() {
  return <DeployButton label="Deploy" />
}

function DeployButton({ label }: { label: string }) {
  const { deploy } = useDeployContext()
  function handleDeploy(e: React.SyntheticEvent) {
    e.preventDefault()
    deploy()
  }
  return (
    <div>
      <Button
        type="button"
        onClick={handleDeploy}
        className="font-bold text-xl"
      >
        {label}
      </Button>
    </div>
  )
}
