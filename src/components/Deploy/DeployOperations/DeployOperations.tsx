import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Button } from 'src/components/commons'
import { NavigationBar } from 'src/components/Layout/primitives'
import { OperationsContextProvider, ScrollContextProvider } from './context'
import { useDeployOperations, useDeployOperationsRequest } from './hooks'
import { OperationInput } from './OperationInput'
import { OperationsList } from './OperationsList'

export function DeployOperations() {
  return (
    <OperationsContextProvider initialState={{ operations: [] }}>
      <ScrollContextProvider>
        <form className="flex gap-2">
          <OperationInput className="flex-[50%]" />
          <OperationsList className="flex-[50%]" />
        </form>
      </ScrollContextProvider>
      <Navigation />
    </OperationsContextProvider>
  )
}

function Navigation() {
  const deployOperationsRequest = useDeployOperationsRequest()
  const { deployOperations } = useDeployOperations()

  return (
    <NavigationBar>
      <Button as="Link" href="/deploy/new" className="flex items-center gap-1">
        <ChevronLeftIcon className="h-5 w-5" />
        Back
      </Button>
      <Button
        variant="filled"
        disabled={deployOperationsRequest.operations.length === 0}
        onClick={() => deployOperations(deployOperationsRequest)}
      >
        Deploy
      </Button>
    </NavigationBar>
  )
}
